'use client';

/**
 * ReactQueryProvider
 * Wraps the app with TanStack React Query + IndexedDB-based persistence.
 * Cache is persisted for up to 90 days on the user's device.
 */

import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { get, set, del } from 'idb-keyval';

// ---- IndexedDB-backed async storage ----------------------------------------
const idbStorage = {
  getItem:    (key: string) => get(key).then(v => v ?? null),
  setItem:    (key: string, value: string) => set(key, value),
  removeItem: (key: string) => del(key),
};

const persister = createAsyncStoragePersister({
  storage: idbStorage,
  key: 'mcc-query-cache-v1',
});

// ---- QueryClient defaults ---------------------------------------------------
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Global defaults — specific hooks override these per-query.
        staleTime: 1000 * 60 * 30,         // 30 min (overridden per hook)
        gcTime:    1000 * 60 * 60 * 24 * 90, // 90 days in gc
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new client
    return makeQueryClient();
  }
  // Browser: share a single instance so the cache persists across page navigations
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

// ---- Provider ---------------------------------------------------------------
export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 * 90 }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
