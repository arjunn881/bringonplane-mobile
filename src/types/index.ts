export type ItemStatus = 'allowed' | 'not_allowed' | 'conditional' | 'unknown';

export interface ItemRule {
  airline?: string;
  country?: string;
  status: ItemStatus;
  note?: string;
}

export interface Item {
  slug: string;
  name: string;
  category: string;
  status: ItemStatus;
  summary: string;
  carryon?: string;
  checked?: string;
  notes?: string;
  rules?: ItemRule[];
  keywords?: string[];
  aliases?: string[];
}

export interface SearchResult {
  slug: string;
  name: string;
  category: string;
  status: ItemStatus;
  summary: string;
}

export interface PackingItem {
  id: string;
  name: string;
  slug: string;
  status: ItemStatus;
  checked: boolean;
  addedAt: number;
}
