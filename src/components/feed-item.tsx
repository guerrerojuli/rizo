import { memo } from 'react';
import { CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { FeedItem as FeedItemProps } from '@/context/feed-context';

function FeedItem({ title, link, pubDate, content }: FeedItemProps) {
  // Provide default fallbacks for potentially undefined props
  const displayTitle = title || 'Untitled';
  const displayLink = link || '#';
  const displayDate = pubDate ? format(new Date(pubDate), 'MMM d, yyyy') : 'No date';
  const displayContent = content || '';

  return (
    <li className="px-4 py-5 sm:px-6 hover:bg-gray-50/50 transition-colors duration-200">
      <article className="space-y-3">
        <div className="flex items-center gap-x-3">
          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <time className="text-sm text-gray-500">
            {displayDate}
          </time>
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-medium leading-6 text-gray-900">
            <a
              href={displayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 inline-flex items-center gap-x-1.5 transition-colors duration-200"
            >
              {displayTitle}
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </h3>
          <div
            className="text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />
        </div>
      </article>
    </li>
  );
}

export default memo(FeedItem); 