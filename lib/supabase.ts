import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// save to expose as using Row Level Security
const supabaseUrl = "https://fuhtfkplviyveeoswvtx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHRma3Bsdml5dmVlb3N3dnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2ODk3NDksImV4cCI6MjAzNTI2NTc0OX0.WygIO88F-fhykjyu979L8pB99Nid1hz0AwQe5iu02B4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
