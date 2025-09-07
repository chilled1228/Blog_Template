export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return new Response(JSON.stringify({
    supabaseUrl: supabaseUrl ? 'Loaded' : 'Not loaded',
    supabaseAnonKey: supabaseAnonKey ? 'Loaded' : 'Not loaded',
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}