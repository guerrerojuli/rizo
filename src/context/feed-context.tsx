'use client';

import { createContext, useContext, useCallback, useMemo, useReducer, ReactNode } from 'react';

export interface FeedItem {
  title: string | undefined;
  link: string | undefined;
  pubDate: string | undefined;
  content: string | undefined;
}

export interface Feed {
  id: string;
  url: string;
  title: string | undefined;
  items: FeedItem[];
}

interface FeedState {
  feeds: Feed[];
  selectedFeedIndex: number;
  isDropdownOpen: boolean;
  isLoading: boolean;
}

type FeedAction =
  | { type: 'ADD_FEED'; payload: Feed }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_FEED'; payload: number }
  | { type: 'TOGGLE_DROPDOWN' };

const createInitialState = (initialFeeds: Feed[] = []): FeedState => ({
  feeds: initialFeeds,
  selectedFeedIndex: initialFeeds.length > 0 ? 0 : 0,
  isDropdownOpen: false,
  isLoading: false,
});

function feedReducer(state: FeedState, action: FeedAction): FeedState {
  switch (action.type) {
    case 'ADD_FEED':
      if (state.feeds.some(feed => feed.url === action.payload.url)) {
        return state;
      }
      return {
        ...state,
        feeds: [...state.feeds, action.payload],
        selectedFeedIndex: state.feeds.length === 0 ? 0 : state.selectedFeedIndex,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SELECTED_FEED':
      return { ...state, selectedFeedIndex: action.payload, isDropdownOpen: false };
    case 'TOGGLE_DROPDOWN':
      return { ...state, isDropdownOpen: state.feeds.length > 1 ? !state.isDropdownOpen : false };
    default:
      return state;
  }
}

interface FeedContextType extends FeedState {
  addFeed: (url: string) => Promise<void>;
  selectFeed: (index: number) => void;
  toggleDropdown: () => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

interface FeedProviderProps {
  children: ReactNode;
  initialFeeds?: Feed[];
}

export function FeedProvider({ children, initialFeeds = [] }: FeedProviderProps) {
  const [state, dispatch] = useReducer(feedReducer, createInitialState(initialFeeds));

  const addFeed = useCallback(async (url: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch feed');
      }

      const data = await response.json();
      dispatch({ type: 'ADD_FEED', payload: data as Feed });
    } catch (error) {
      console.error('Error adding feed:', error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred while adding the feed.');
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const selectFeed = useCallback((index: number) => {
    dispatch({ type: 'SET_SELECTED_FEED', payload: index });
  }, []);

  const toggleDropdown = useCallback(() => {
    dispatch({ type: 'TOGGLE_DROPDOWN' });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      addFeed,
      selectFeed,
      toggleDropdown,
    }),
    [state, addFeed, selectFeed, toggleDropdown]
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
} 