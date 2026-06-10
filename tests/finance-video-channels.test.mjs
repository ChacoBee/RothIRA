import assert from 'node:assert/strict';
import {
  ACTIVE_FINANCE_VIDEO_CHANNEL_STORAGE_KEY,
  DEFAULT_FINANCE_VIDEO_CHANNELS,
  FINANCE_VIDEO_CHANNELS_STORAGE_KEY,
  buildYoutubeLiveEmbedUrl,
  createCustomFinanceVideoChannel,
  mergeFinanceVideoChannels,
  normalizeFinanceVideoChannel,
  readActiveFinanceVideoChannelId,
  readCustomFinanceVideoChannels,
  writeActiveFinanceVideoChannelId,
  writeCustomFinanceVideoChannels,
} from '../src/lib/financeVideoChannels.mjs';

function createStorage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

const customChannelId = 'UCaaaaaaaaaaaaaaaaaaaaaa';
const duplicateDefaultId = DEFAULT_FINANCE_VIDEO_CHANNELS[0].channelId;

{
  const channels = mergeFinanceVideoChannels();
  assert.equal(channels.length, 4);
  assert.equal(channels[0].source, 'default');
  assert.equal(channels[0].label, 'CNBC Television');
}

{
  const result = normalizeFinanceVideoChannel({
    label: 'Custom Market TV',
    channelId: customChannelId,
    handle: 'CustomMarketTV',
    description: 'A custom finance stream.',
  });

  assert.equal(result.ok, true);
  assert.equal(result.channel.provider, 'youtube');
  assert.equal(result.channel.handle, '@CustomMarketTV');
  assert.equal(result.channel.watchUrl, 'https://www.youtube.com/@CustomMarketTV/live');
}

{
  const result = normalizeFinanceVideoChannel({
    label: 'Bad channel',
    channelId: 'not-a-channel-id',
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /valid YouTube channel ID/);
}

{
  const result = createCustomFinanceVideoChannel(
    {
      label: 'Duplicate CNBC',
      channelId: duplicateDefaultId,
    },
    DEFAULT_FINANCE_VIDEO_CHANNELS
  );

  assert.equal(result.ok, false);
  assert.equal(result.error, 'This channel is already in the theater.');
}

{
  const merged = mergeFinanceVideoChannels([
    {
      label: 'Invalid',
      channelId: 'bad',
    },
    {
      label: 'Duplicate default',
      channelId: duplicateDefaultId,
    },
    {
      label: 'Custom Market TV',
      channelId: customChannelId,
      handle: '@CustomMarketTV',
    },
  ]);

  assert.equal(merged.length, 5);
  assert.equal(merged.at(-1).source, 'custom');
  assert.equal(merged.at(-1).channelId, customChannelId);
}

{
  const url = new URL(buildYoutubeLiveEmbedUrl(customChannelId, 'https://example.com'));
  assert.equal(url.origin, 'https://www.youtube.com');
  assert.equal(url.pathname, '/embed/live_stream');
  assert.equal(url.searchParams.get('channel'), customChannelId);
  assert.equal(url.searchParams.get('playsinline'), '1');
  assert.equal(url.searchParams.get('rel'), '0');
  assert.equal(url.searchParams.get('origin'), 'https://example.com');
}

{
  const storage = createStorage();
  const channel = createCustomFinanceVideoChannel({
    label: 'Custom Market TV',
    channelId: customChannelId,
  }).channel;

  writeCustomFinanceVideoChannels([channel], storage);
  const raw = JSON.parse(storage.getItem(FINANCE_VIDEO_CHANNELS_STORAGE_KEY));
  assert.equal(raw.length, 1);
  assert.equal(raw[0].channelId, customChannelId);

  const restored = readCustomFinanceVideoChannels(storage);
  assert.equal(restored.length, 1);
  assert.equal(restored[0].label, 'Custom Market TV');
}

{
  const storage = createStorage();
  writeActiveFinanceVideoChannelId('Custom Channel!', storage);
  assert.equal(storage.getItem(ACTIVE_FINANCE_VIDEO_CHANNEL_STORAGE_KEY), 'custom-channel');
  assert.equal(readActiveFinanceVideoChannelId(storage), 'custom-channel');
}

console.log('All finance video channel tests passed.');
