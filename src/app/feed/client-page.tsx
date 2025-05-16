'use client';

import { memo } from 'react';
import Header from '@/components/header';
import AddFeedForm from '@/components/add-feed-form';
import FeedSelector from '@/components/feed-selector';
import { FeedProvider, Feed as FeedData } from '@/context/feed-context';

interface ClientPageProps {
  initialFeeds: FeedData[];
}

function ClientPage({ initialFeeds }: ClientPageProps) {
  return (
    <FeedProvider initialFeeds={initialFeeds}>
      <div className="space-y-10">
        <div className="relative isolate">
          <div className="mx-auto max-w-2xl">
            <Header />
            <AddFeedForm />
          </div>
        </div>
        <FeedSelector />
      </div>
    </FeedProvider>
  );
}

export default memo(ClientPage); 