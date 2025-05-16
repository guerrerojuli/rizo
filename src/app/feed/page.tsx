import Parser from 'rss-parser';
import ClientPage from './client-page';
import { Feed as FeedData, FeedItem as FeedItemData } from '@/context/feed-context'; // Import types
import { getSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { getFeedsByUserId } from '@/db/queries';
import { SelectFeed } from '@/db/types';

const parser = new Parser();

async function fetchFeedData(feed: SelectFeed): Promise<FeedData | null> {
  try {
    const feedData = await parser.parseURL(feed.url);
    return {
      id: feed.id,
      url: feed.url,
      title: feedData.title,
      items: feedData.items.map((item): FeedItemData => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        content: item.contentSnippet || item.content || '',
      })),
    };
  } catch (error) {
    console.error(`Failed to fetch feed ${feed.url}:`, error);
    return null; // Return null if a specific feed fails
  }
}

export default async function Page() {
  const session = await getSession();

  if (!session?.user?.id) redirect("/sign-in");

  const feeds = await getFeedsByUserId(session.user.id);

  const initialFeedsPromises = feeds.map(feed => fetchFeedData(feed));
  const results = await Promise.allSettled(initialFeedsPromises);
  
  const initialFeeds: FeedData[] = results
    .filter(result => result.status === 'fulfilled' && result.value)
    .map(result => (result as PromiseFulfilledResult<FeedData>).value);

  return <ClientPage initialFeeds={initialFeeds} />;
}
