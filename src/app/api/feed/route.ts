import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { addFeedToDatabase } from '@/db/queries';
import { getSession } from '@/lib/auth/server';
import { v4 as uuidv4 } from 'uuid';

const parser = new Parser();

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const parsedFeed = await parser.parseURL(url);

    if (!parsedFeed.title) {
      return NextResponse.json(
        { error: 'Failed to parse feed title' },
        { status: 400 }
      );
    }

    const newDbFeed = await addFeedToDatabase({
      id: uuidv4(),
      url,
      userId,
    });

    const feedItems = parsedFeed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.content || item.contentSnippet || '',
    }));

    return NextResponse.json({
      id: newDbFeed.id,
      url,
      title: parsedFeed.title,
      items: feedItems,
    });
  } catch (error) {
    console.error('Error processing feed:', error);
    let errorMessage = 'Failed to process feed';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 