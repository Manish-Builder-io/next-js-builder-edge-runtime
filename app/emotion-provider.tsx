"use client";

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ReactNode, useMemo } from 'react';

interface EmotionProviderProps {
  children: ReactNode;
}

export default function EmotionProvider({ children }: EmotionProviderProps) {
  const cache = useMemo(() => {
    return createCache({ 
      key: 'css',
      prepend: true,
    });
  }, []);

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
}
