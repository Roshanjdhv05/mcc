import { useState, useEffect } from 'react';
import { cacheImage, getCachedImage } from '@/utils/image-cache';

export function useCachedImage(imageUrl: string | Blob | null | undefined) {
  // If a Blob was passed, convert to object URL; keep strings as-is
  const urlString: string | null | undefined =
    imageUrl instanceof Blob ? URL.createObjectURL(imageUrl) : imageUrl;
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      if (!urlString) {
        setSrc(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        // 1. Check IndexedDB cache first
        const cachedSrc = await getCachedImage(urlString);
        if (cachedSrc) {
          if (isMounted) {
            setSrc(cachedSrc);
            setLoading(false);
          }
          return;
        }

        // 2. Fetch the image over network if not in cache
        const response = await fetch(urlString);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();

        // 3. Cache it in IndexedDB
        await cacheImage(urlString, blob);

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
  }, [urlString]);

  return { src, loading, error };
}
