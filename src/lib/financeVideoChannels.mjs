export const FINANCE_VIDEO_CHANNELS_STORAGE_KEY = 'rothira.financeVideoChannels.v1';
export const ACTIVE_FINANCE_VIDEO_CHANNEL_STORAGE_KEY = 'rothira.activeFinanceVideoChannel.v1';

const YOUTUBE_CHANNEL_ID_PATTERN = /^UC[A-Za-z0-9_-]{20,}$/;

export const DEFAULT_FINANCE_VIDEO_CHANNELS = Object.freeze([
  {
    id: 'cnbc-television',
    label: 'CNBC Television',
    provider: 'youtube',
    channelId: 'UCrp_UI8XtuYfpiqluWLD7Lw',
    handle: '@CNBCTelevision',
    category: 'Markets',
    description: 'U.S. market coverage, earnings, and business news.',
    watchUrl: 'https://www.youtube.com/@CNBCTelevision/live',
  },
  {
    id: 'yahoo-finance',
    label: 'Yahoo Finance',
    provider: 'youtube',
    channelId: 'UCEAZeUIeJs0IjQiqTCdVSIg',
    handle: '@YahooFinance',
    category: 'Broad finance',
    description: 'Market analysis, interviews, macro news, and stock movers.',
    watchUrl: 'https://www.youtube.com/@YahooFinance/live',
  },
  {
    id: 'bloomberg-television',
    label: 'Bloomberg Television',
    provider: 'youtube',
    channelId: 'UCIALMKvObZNtJ6AmdCLP7Lg',
    handle: '@markets',
    category: 'Macro',
    description: 'Global business, markets, policy, and economy coverage.',
    watchUrl: 'https://www.youtube.com/@markets/live',
  },
  {
    id: 'schwab-network',
    label: 'Schwab Network',
    provider: 'youtube',
    channelId: 'UCqoSrYgusd8ZddtMoWhjHYA',
    handle: '@SchwabNetwork',
    category: 'Trading day',
    description: 'U.S. market day coverage, stock ideas, and trader commentary.',
    watchUrl: 'https://www.youtube.com/@SchwabNetwork/live',
  },
]);

function sanitizeText(value, maxLength = 120) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function slugify(value) {
  return sanitizeText(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeYouTubeChannelId(value) {
  const channelId = sanitizeText(value, 64);
  return YOUTUBE_CHANNEL_ID_PATTERN.test(channelId) ? channelId : '';
}

export function normalizeFinanceVideoChannel(input = {}) {
  const channelId = normalizeYouTubeChannelId(input.channelId);
  if (!channelId) {
    return {
      ok: false,
      error: 'Enter a valid YouTube channel ID beginning with UC.',
    };
  }

  const rawHandle = sanitizeText(input.handle, 80).replace(/^@+/, '');
  const handle = rawHandle ? `@${rawHandle}` : '';
  const label =
    sanitizeText(input.label, 80) ||
    (handle ? handle.slice(1) : '') ||
    `YouTube ${channelId.slice(0, 8)}`;
  const id = slugify(input.id) || `custom-${slugify(label) || channelId.toLowerCase()}`;
  const watchUrl =
    sanitizeText(input.watchUrl, 220) ||
    (handle
      ? `https://www.youtube.com/${handle}/live`
      : `https://www.youtube.com/channel/${channelId}/live`);

  return {
    ok: true,
    channel: {
      id,
      label,
      provider: 'youtube',
      channelId,
      handle,
      category: sanitizeText(input.category, 40) || 'Custom',
      description: sanitizeText(input.description, 160) || 'Custom finance live stream.',
      watchUrl,
    },
  };
}

export function mergeFinanceVideoChannels(customChannels = []) {
  const seenIds = new Set();
  const seenChannelIds = new Set();
  const merged = [];

  const addChannel = (channel, source) => {
    const normalized = normalizeFinanceVideoChannel(channel);
    if (!normalized.ok) return;

    const next = normalized.channel;
    if (seenIds.has(next.id) || seenChannelIds.has(next.channelId)) return;

    seenIds.add(next.id);
    seenChannelIds.add(next.channelId);
    merged.push({ ...next, source });
  };

  DEFAULT_FINANCE_VIDEO_CHANNELS.forEach((channel) => addChannel(channel, 'default'));
  (Array.isArray(customChannels) ? customChannels : []).forEach((channel) => addChannel(channel, 'custom'));

  return merged;
}

export function createCustomFinanceVideoChannel(input = {}, existingChannels = []) {
  const normalized = normalizeFinanceVideoChannel({
    ...input,
    id: input.id || `custom-${input.channelId || input.label || ''}`,
  });

  if (!normalized.ok) {
    return normalized;
  }

  const duplicate = mergeFinanceVideoChannels(existingChannels).some(
    (channel) =>
      channel.channelId === normalized.channel.channelId ||
      channel.id === normalized.channel.id
  );

  if (duplicate) {
    return {
      ok: false,
      error: 'This channel is already in the theater.',
    };
  }

  return normalized;
}

export function buildYoutubeLiveEmbedUrl(channelOrId, origin = '') {
  const channelId = normalizeYouTubeChannelId(
    typeof channelOrId === 'string' ? channelOrId : channelOrId?.channelId
  );

  if (!channelId) {
    return '';
  }

  const endpoint = new URL('https://www.youtube.com/embed/live_stream');
  endpoint.searchParams.set('channel', channelId);
  endpoint.searchParams.set('playsinline', '1');
  endpoint.searchParams.set('rel', '0');

  const safeOrigin = sanitizeText(origin, 220);
  if (/^https?:\/\//i.test(safeOrigin)) {
    endpoint.searchParams.set('origin', safeOrigin);
  }

  return endpoint.toString();
}

export function readCustomFinanceVideoChannels(storage = globalThis?.localStorage) {
  if (!storage || typeof storage.getItem !== 'function') {
    return [];
  }

  try {
    const raw = storage.getItem(FINANCE_VIDEO_CHANNELS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return mergeFinanceVideoChannels(parsed)
      .filter((channel) => channel.source === 'custom')
      .map(({ source, ...channel }) => channel);
  } catch {
    return [];
  }
}

export function writeCustomFinanceVideoChannels(channels = [], storage = globalThis?.localStorage) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }

  try {
    const sanitized = mergeFinanceVideoChannels(channels)
      .filter((channel) => channel.source === 'custom')
      .map(({ source, ...channel }) => channel);

    storage.setItem(FINANCE_VIDEO_CHANNELS_STORAGE_KEY, JSON.stringify(sanitized));
  } catch {
    // Storage failures should not break the live theater.
  }
}

export function readActiveFinanceVideoChannelId(storage = globalThis?.localStorage) {
  if (!storage || typeof storage.getItem !== 'function') {
    return '';
  }

  try {
    return slugify(storage.getItem(ACTIVE_FINANCE_VIDEO_CHANNEL_STORAGE_KEY) || '');
  } catch {
    return '';
  }
}

export function writeActiveFinanceVideoChannelId(channelId, storage = globalThis?.localStorage) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }

  try {
    const normalized = slugify(channelId);
    if (normalized) {
      storage.setItem(ACTIVE_FINANCE_VIDEO_CHANNEL_STORAGE_KEY, normalized);
    }
  } catch {
    // Storage failures should not break channel switching.
  }
}
