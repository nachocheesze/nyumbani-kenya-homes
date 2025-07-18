import { supabase } from './client';

const BUCKET_NAME = 'keja-assets';

/**
 * Uploads a file to Supabase storage and returns the public URL.
 *
 * @param file The file to upload.
 * @param path The path in the bucket where the file should be stored.
 * @returns The public URL of the uploaded file.
 */
export const uploadFileAndGetPublicUrl = async (file: File, path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false, // To prevent overwriting existing files
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }

  if (!data) {
    throw new Error('Upload successful, but no data returned.');
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  if (!publicUrlData) {
    throw new Error('Could not get public URL for the uploaded file.');
  }

  return publicUrlData.publicUrl;
};
