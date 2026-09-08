import { getInfo } from '../lib/info';

export const dynamic = 'force-dynamic';

export default function Page() {
  const info = getInfo();
  return (
    <main>
      <h1 style={{ color: info.color }}>{info.name}</h1>
      <p>
        version <code>{info.version}</code> on pod <code>{info.hostname}</code>
      </p>
      <p>
        <a href="/api/status">/api/status</a> · <a href="/api/healthz">/api/healthz</a> ·{' '}
        <a href="/api/readyz">/api/readyz</a> · <a href="/api/metrics">/api/metrics</a>
      </p>
    </main>
  );
}
