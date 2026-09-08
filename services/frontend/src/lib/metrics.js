import client from 'prom-client';

// keep one registry per process, next dev likes to re-import modules
const g = globalThis;

if (!g.__playerMetrics) {
  const register = new client.Registry();
  register.setDefaultLabels({ app: process.env.PLAYER_NAME || 'player' });
  client.collectDefaultMetrics({ register });

  const requests = new client.Counter({
    name: 'http_requests_total',
    help: 'HTTP requests by route and status.',
    labelNames: ['route', 'status'],
    registers: [register],
  });

  const latency = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request latency in seconds.',
    labelNames: ['route'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
    registers: [register],
  });

  g.__playerMetrics = { register, requests, latency };
}

export const { register, requests, latency } = g.__playerMetrics;

// count + time a route handler
export function instrument(route, handler) {
  return async (req) => {
    const end = latency.startTimer({ route });
    const res = await handler(req);
    end();
    requests.inc({ route, status: String(res.status) });
    return res;
  };
}
