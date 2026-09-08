import { checkAll } from '../../../lib/players';
import { instrument } from '../../../lib/metrics';

export const dynamic = 'force-dynamic';

// the page polls this, fan-out happens here over cluster DNS
export const GET = instrument('/api/players', async () => {
  const players = await checkAll();
  return Response.json({ players, time: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store' } });
});
