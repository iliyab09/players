// PLAYERS="player1=http://player1:3000,player2=http://player2:3000"
// no env? assume the 4 in-cluster service names
export function parsePlayers(env = process.env.PLAYERS) {
  const raw = env || [1, 2, 3, 4].map((i) => `player${i}=http://player${i}:3000`).join(',');
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const [name, url] = pair.split('=');
      return { name: name.trim(), url: url.trim().replace(/\/$/, '') };
    });
}

// ask one player how it's doing, give up after timeoutMs
export async function checkPlayer({ name, url }, timeoutMs = 1000, fetchImpl = fetch) {
  const started = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetchImpl(`${url}/api/status`, { signal: ctrl.signal, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const info = await res.json();
    return { name, url, up: true, latencyMs: Date.now() - started, info };
  } catch (err) {
    return { name, url, up: false, latencyMs: Date.now() - started, error: String(err?.message || err) };
  } finally {
    clearTimeout(timer);
  }
}

export function checkAll(players = parsePlayers(), timeoutMs = 1000) {
  return Promise.all(players.map((p) => checkPlayer(p, timeoutMs)));
}
