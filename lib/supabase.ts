
import { createClient } from '@supabase/supabase-js';

// Local defaults only for `pnpm db:start` development.
// On Vercel you MUST set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
// (Project Settings → Environment Variables), then redeploy.
const LOCAL_SUPABASE_URL = 'http://127.0.0.1:54321';
const LOCAL_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = envUrl || (import.meta.env.DEV ? LOCAL_SUPABASE_URL : '');
const supabaseKey = envKey || (import.meta.env.DEV ? LOCAL_SUPABASE_ANON_KEY : '');

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
      'Add them in the Vercel project Environment Variables, then redeploy.'
  );
}

export const supabase = createClient(
  supabaseUrl || LOCAL_SUPABASE_URL,
  supabaseKey || LOCAL_SUPABASE_ANON_KEY
);

export const isSupabaseConfigured = Boolean(envUrl && envKey);
