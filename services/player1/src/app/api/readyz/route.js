export const dynamic = 'force-dynamic';

// readiness. nothing downstream here, a real service would ping its DB pool
export function GET() {
  return new Response('ready', { headers: { 'Cache-Control': 'no-store' } });
}
