import { getInfo } from '../../../lib/info';
import { instrument } from '../../../lib/metrics';

export const dynamic = 'force-dynamic';

// the frontend polls this. ?delayMs=N fakes a slow dependency (capped at 10s)
export const GET = instrument('/api/status', async (req) => {
  const delay = Math.min(Number(new URL(req.url).searchParams.get('delayMs')) || 0, 10000);
  if (delay > 0) await new Promise((r) => setTimeout(r, delay));
  return Response.json(getInfo(), { headers: { 'Cache-Control': 'no-store' } });
});
