import os from 'node:os';

const startedAt = Date.now();

// who am I? all from env, so one image works for every player
export function getInfo() {
  return {
    name: process.env.PLAYER_NAME || 'player',
    color: process.env.PLAYER_COLOR || '#22c55e',
    version: process.env.APP_VERSION || 'dev',
    hostname: os.hostname(),
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    time: new Date().toISOString(),
  };
}
