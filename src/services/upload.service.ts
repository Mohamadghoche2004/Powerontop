import { supabase } from "../lib/supabase";

const BUCKET_NAME = "products";

export const uploadService = {
  /**
   * Upload an image file to Supabase Storage and return the public URL.
   */
  uploadImage: async (file: File): Promise<string> => {
    // Generate a unique file name to avoid collisions
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },

  /**
   * Delete an image from Supabase Storage by its public URL.
   */
  deleteImage: async (publicUrl: string): Promise<void> => {
    // Extract the file path from the public URL
    const bucketPath = `${BUCKET_NAME}/`;
    const pathIndex = publicUrl.indexOf(bucketPath);
    if (pathIndex === -1) return;

    const filePath = publicUrl.substring(pathIndex + bucketPath.length);

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("Failed to delete image:", error.message);
    }
  },
};
