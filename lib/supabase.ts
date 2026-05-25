
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CONNECTION INSTRUCTIONS ---
// 1. Go to your Supabase Dashboard: https://supabase.com/dashboard
// 2. Select your project -> Settings -> API
// 3. Copy the "Project URL" and paste it below.
// 4. Copy the "anon" / "public" key and paste it below.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mlxizcvubqwayegrcmpt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1seGl6Y3Z1YnF3YXllZ3JjbXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2OTUwMzUsImV4cCI6MjA5NTI3MTAzNX0.P-vXTdiIkBIfqclfw__5B-vkrD71kGwkUbLIDJbWbU8';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  // Fallback to hardcoded values if env vars aren't set (useful for the provided specific key)
  // console.log("Using provided Supabase credentials.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
