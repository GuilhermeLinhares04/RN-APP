import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Temporary mock implementation until Supabase credentials are set up
const mockSupabase = {
  auth: {
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
    updateUser: async () => ({ error: null }),
  },
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://example.com/image.jpg' } }),
    }),
  },
};

// Use mock implementation for now
export const supabase = mockSupabase as any;

export const uploadImage = async (uri: string, bucket: string, path: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = path.split('/').pop();
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, blob);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImageUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}; 