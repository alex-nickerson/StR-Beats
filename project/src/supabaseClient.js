import { createClient } from '@supabase/supabase-js';


// Connect to Supabase using the environment variables
export const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);