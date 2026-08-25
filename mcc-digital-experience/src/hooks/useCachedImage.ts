import { useState, useEffect } from 'react';
import { cacheImage, getCachedImage } from '@/utils/image-cache';

export function useCachedImage(imageUrl: string | null | undefined) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      if (!imageUrl) {
        setSrc(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        // 1. Check IndexedDB cache first
        const cachedSrc = await getCachedImage(imageUrl);
        if (cachedSrc) {
          if (isMounted) {
            setSrc(cachedSrc);
            setLoading(false);
          }
          return;
        }

        // 2. Fetch the image over network if not in cache
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();

        // 3. Cache it in IndexedDB
        await cacheImage(imageUrl, blob);

        // 4. Create an object URL from the fetched blob
        if (isMounted) {
          setSrc(URL.createObjectURL(blob));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching and caching image:', err);
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  return { src, loading, error };
}
