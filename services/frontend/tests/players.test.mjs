import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePlayers, checkPlayer } from '../src/lib/players.js';

test('parsePlayers defaults to four in-cluster players', () => {
  const players = parsePlayers(undefined);
  assert.equal(players.length, 4);
  assert.deepEqual(players[0], { name: 'player1', url: 'http://player1:3000' });
});

test('parsePlayers reads name=url pairs', () => {
  const players = parsePlayers('a=http://a:1/, b=http://b:2');
  assert.deepEqual(players, [
    { name: 'a', url: 'http://a:1' },
    { name: 'b', url: 'http://b:2' },
  ]);
});

test('checkPlayer marks a failing player as down', async () => {
  const boom = async () => { throw new Error('connect ECONNREFUSED'); };
  const r = await checkPlayer({ name: 'x', url: 'http://x' }, 100, boom);
  assert.equal(r.up, false);
  assert.match(r.error, /ECONNREFUSED/);
});

test('checkPlayer marks a healthy player as up', async () => {
  const ok = async () => ({ ok: true, status: 200, json: async () => ({ name: 'x' }) });
  const r = await checkPlayer({ name: 'x', url: 'http://x' }, 100, ok);
  assert.equal(r.up, true);
  assert.equal(r.info.name, 'x');
});
