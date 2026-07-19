#!/usr/bin/env node
/**
 * Seeds a demo admin user for client pitches.
 * Run after: pnpm db:start  (or pnpm db:reset)
 */
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const EMAIL = 'demo@autonations.na';
const PASSWORD = 'DemoClient2026!';

async function main() {
  const signup = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: EMAIL,
      password: PASSWORD,
      data: { full_name: 'Demo Client' },
    }),
  });

  const signupBody = await signup.json();
  if (!signup.ok && !String(signupBody?.msg || signupBody?.error_description || '').toLowerCase().includes('already')) {
    // User may already exist — continue to promote admin + verify login
    console.log('Signup note:', signupBody.msg || signupBody.error_description || signup.status);
  }

  const promote = await fetch(`${SUPABASE_URL}/rest/v1/rpc/promote_demo_admin`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ demo_email: EMAIL }),
  });

  // Fallback if RPC is unavailable: patch profiles via PostgREST after lookup
  if (!promote.ok) {
    const usersRes = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=50`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );
    const usersBody = await usersRes.json();
    const user = (usersBody.users || []).find((u) => u.email === EMAIL);
    if (!user) {
      throw new Error(`Could not find demo user ${EMAIL}`);
    }
    const patch = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          is_admin: true,
          username: 'democlient',
          full_name: 'Demo Client',
        }),
      }
    );
    if (!patch.ok) {
      throw new Error(`Failed to promote demo admin: ${await patch.text()}`);
    }
  }

  const login = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const loginBody = await login.json();
  if (!login.ok || !loginBody.access_token) {
    throw new Error(`Demo login failed: ${JSON.stringify(loginBody)}`);
  }

  console.log('Demo database user ready:');
  console.log(`  email:    ${EMAIL}`);
  console.log(`  password: ${PASSWORD}`);
  console.log('  role:     admin');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
