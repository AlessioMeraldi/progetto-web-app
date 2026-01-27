
// Supabase imports
import { createClient } from "@supabase/supabase-js";

// Create a supabase client object, requires to pass it the .env keys to authenticate
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
