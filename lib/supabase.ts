
import { createClient } from '@supabase/supabase-js';

// Local Supabase defaults (pnpm db:start). Override with VITE_SUPABASE_* in .env.local
// For a hosted client demo, create a free project at https://supabase.com/dashboard
// and paste its Project URL + anon key into .env.local.
const LOCAL_SUPABASE_URL = 'http://127.0.0.1:54321';
const LOCAL_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || LOCAL_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || LOCAL_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
