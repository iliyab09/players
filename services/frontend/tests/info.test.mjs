import test from 'node:test';
import assert from 'node:assert/strict';
import { getInfo } from '../src/lib/info.js';

test('getInfo reads identity from env', () => {
  process.env.PLAYER_NAME = 'player-test';
  process.env.PLAYER_COLOR = '#ff0000';
  process.env.APP_VERSION = 'abc123';

  const info = getInfo();
  assert.equal(info.name, 'player-test');
  assert.equal(info.color, '#ff0000');
  assert.equal(info.version, 'abc123');
  assert.ok(info.hostname.length > 0);
  assert.ok(info.uptimeSeconds >= 0);
  assert.ok(!Number.isNaN(Date.parse(info.time)));
});
