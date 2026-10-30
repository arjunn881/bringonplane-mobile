import { ItemData, ItemStatus } from '../types';

const BASE_URL = 'https://bringonplane.com';

/**
 * Fetch item data from the bringonplane.com API / search-index.
 * Falls back to an empty array on network error.
 */
export async function fetchSearchIndex(): Promise<any[]> {
  try {
    const res = await fetch(`${BASE_URL}/search-index.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn('[api] fetchSearchIndex failed:', e);
    return [];
  }
}

/**
 * Fetch full item detail for a given slug.
 */
export async function fetchItem(slug: string): Promise<ItemData | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/items/${slug}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`[api] fetchItem(${slug}) failed:`, e);
    return null;
  }
}

/**
 * Return a friendly label and color key for an item status.
 */
export function getStatusInfo(status: ItemStatus): {
  label: string;
  emoji: string;
  colorKey: 'success' | 'danger' | 'warning' | 'grey';
} {
  switch (status) {
    case 'allowed':
      return { label: 'Allowed', emoji: '✅', colorKey: 'success' };
    case 'not_allowed':
      return { label: 'Not Allowed', emoji: '🚫', colorKey: 'danger' };
    case 'conditional':
      return { label: 'Conditional', emoji: '⚠️', colorKey: 'warning' };
    default:
      return { label: 'Check Rules', emoji: '❓', colorKey: 'grey' };
  }
}
