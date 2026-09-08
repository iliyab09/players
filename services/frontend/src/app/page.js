'use client';

import { useEffect, useState } from 'react';

const POLL_MS = 2000;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  // poll our own API, it talks to the players for us
  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch('/api/players', { cache: 'no-store' });
        if (alive) { setData(await res.json()); setErr(null); }
      } catch (e) {
        if (alive) setErr(String(e));
      }
    };
    tick();
    const id = setInterval(tick, POLL_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);

  return (
    <main>
      <style>{`
        @keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-18px) } }
        .card { border-radius: 16px; padding: 24px; background: #1e293b; text-align: center; }
        .ball { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px; }
        .up { animation: bounce 1s ease-in-out infinite; }
        .down { background: #ef4444 !important; box-shadow: 0 0 24px #ef4444; }
        small { color: #94a3b8; }
      `}</style>

      <h1>players</h1>
      <small>refreshes every {POLL_MS / 1000}s · {data?.time ?? 'loading…'} {err && `· ${err}`}</small>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
        {(data?.players ?? []).map((p) => (
          <div className="card" key={p.name}>
            <div className={`ball ${p.up ? 'up' : 'down'}`} style={{ background: p.info?.color ?? '#64748b' }} />
            <h2 style={{ margin: '0 0 8px' }}>{p.name}</h2>
            {p.up ? (
              <small>
                v{p.info.version}<br />{p.info.hostname}<br />{p.latencyMs} ms
              </small>
            ) : (
              <small style={{ color: '#fca5a5' }}>down · {p.error}</small>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
