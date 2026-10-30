export type ItemStatus = 'allowed' | 'not_allowed' | 'conditional' | 'unknown';

export interface BagRule {
  status: ItemStatus;
  reason: string;
  conditions: string[];
}

export interface AirlineRule {
  name: string;
  status: ItemStatus;
  notes: string;
}

export interface CountryRule {
  status: ItemStatus;
  reason: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ItemData {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  aliases: string[];
  keywords: string[];
  carryOn: BagRule;
  checkedBag: BagRule;
  airlines: AirlineRule[];
  international: Record<string, CountryRule>;
  travelTips: string[];
  faq: FAQ[];
  relatedItems: string[];
  tsa: { officialUrl: string; lastVerified: string; pageTitle: string } | null;
  lastReviewed: string;
  seoTitle: string;
  seoDescription: string;
  restrictionType: string;
}

export interface PackingItem {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  status?: ItemStatus;
  checked: boolean;
  addedAt: number;
}
