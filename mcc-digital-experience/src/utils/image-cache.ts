import { get, set } from 'idb-keyval';

export async function cacheImage(url: string, blob: Blob): Promise<void> {
  try {
    await set(`img-cache-${url}`, blob);
  } catch (error) {
    console.error('Failed to cache image in IndexedDB:', error);
  }
}

export async function getCachedImage(url: string): Promise<string | null> {
  try {
    const blob = await get<Blob>(`img-cache-${url}`);
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return null;
  } catch (error) {
    console.error('Failed to get cached image from IndexedDB:', error);
    return null;
  }
}
