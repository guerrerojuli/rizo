'use client';

import { memo, useState, useCallback } from 'react';
import { useFeed } from '@/context/feed-context';

function AddFeedForm() {
  const { isLoading, addFeed } = useFeed();
  const [newFeedUrl, setNewFeedUrl] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedUrl) return;
    
    await addFeed(newFeedUrl);
    setNewFeedUrl('');
  }, [newFeedUrl, addFeed]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeedUrl(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="url"
            value={newFeedUrl}
            onChange={handleUrlChange}
            placeholder="Enter RSS feed URL"
            className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/50 backdrop-blur-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-none rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Adding...' : 'Add Feed'}
        </button>
      </div>
    </form>
  );
}

export default memo(AddFeedForm); 