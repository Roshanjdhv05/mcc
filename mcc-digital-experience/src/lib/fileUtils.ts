import imageCompression from 'browser-image-compression';

const MAX_PDF_SIZE_MB = 0.3; // 300KB
const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

/**
 * Processes a file before upload.
 * - If it's an image, compresses it to ~300KB.
 * - If it's a PDF, validates that it is <= 300KB.
 * - Otherwise, passes it through unchanged.
 * @param file The file to process
 * @returns A Promise that resolves to the processed File, or rejects with an Error if validation fails.
 */
export async function processFileForUpload(file: File): Promise<File> {
  const fileType = file.type;

  if (fileType.startsWith('image/')) {
    // Compress image
    const options = {
      maxSizeMB: 0.3, // 300KB
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    };
    
    try {
      const compressedBlob = await imageCompression(file, options);
      // Convert Blob back to File to preserve name and type
      return new File([compressedBlob], file.name, { type: file.type });
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Failed to compress image.');
    }
  } else if (fileType === 'application/pdf') {
    // Validate PDF size
    if (file.size > MAX_PDF_SIZE_BYTES) {
      throw new Error(`PDF is too large (${(file.size / 1024).toFixed(1)} KB). Please compress it to be under 300KB before uploading.`);
    }
    return file;
  }

  // Return unchanged for other file types
  return file;
}
