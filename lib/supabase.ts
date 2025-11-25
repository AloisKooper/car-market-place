
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CONNECTION INSTRUCTIONS ---
// 1. Go to your Supabase Dashboard: https://supabase.com/dashboard
// 2. Select your project -> Settings -> API
// 3. Copy the "Project URL" and paste it below.
// 4. Copy the "anon" / "public" key and paste it below.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ertitgtvgxbwjodinpst.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVydGl0Z3R2Z3hid2pvZGlucHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjgyNzEsImV4cCI6MjA3OTY0NDI3MX0.KKCgu3jANJOBZ7W-HzRydGN_m9F9rdI877uUl6JdCjY';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  // Fallback to hardcoded values if env vars aren't set (useful for the provided specific key)
  // console.log("Using provided Supabase credentials.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
