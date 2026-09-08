export const dynamic = 'force-dynamic';

// liveness. no dependencies on purpose, a slow DB should never get us restarted
export function GET() {
  return new Response('ok', { headers: { 'Cache-Control': 'no-store' } });
}
