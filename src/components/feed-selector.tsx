'use client';

import { memo } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import FeedItem from './feed-item';
import { useFeed } from '@/context/feed-context';

function FeedSelector() {
  const { feeds, selectedFeedIndex, isDropdownOpen, toggleDropdown, selectFeed } = useFeed();
  const selectedFeed = feeds[selectedFeedIndex];

  if (!selectedFeed) return null;

  return (
    <div className="bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
      <button
        onClick={toggleDropdown}
        className={`w-full border-b border-gray-900/5 bg-white/50 px-4 py-5 sm:px-6 text-left ${
          feeds.length > 1 ? 'cursor-pointer hover:bg-gray-50/50' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{selectedFeed.title}</h2>
            <p className="mt-1 text-sm text-gray-500 truncate">{selectedFeed.url}</p>
          </div>
          {feeds.length > 1 && (
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </button>

      {isDropdownOpen ? (
        <ul className="divide-y divide-gray-900/5">
          {feeds.map(
            (feed, index) =>
              index !== selectedFeedIndex && (
                <li
                  key={feed.url}
                  onClick={() => selectFeed(index)}
                  className="px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50/50"
                >
                  <h3 className="text-lg font-medium text-gray-900">{feed.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 truncate">{feed.url}</p>
                </li>
              )
          )}
        </ul>
      ) : (
        <ul role="list" className="divide-y divide-gray-900/5">
          {selectedFeed.items.map((item, index) => (
            <FeedItem key={index} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(FeedSelector); 