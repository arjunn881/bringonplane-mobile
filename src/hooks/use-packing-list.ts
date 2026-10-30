import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PackingItem, ItemStatus } from '../types';

const STORAGE_KEY = '@bringonplane/packing-list-v2';

const DEFAULT_PACKING_ITEMS: PackingItem[] = [
  { id: 'passport', name: 'Passport & Travel Documents', category: 'Documents', checked: false, addedAt: 1 },
  { id: 'boarding-pass', name: 'Boarding Pass & Booking Info', category: 'Documents', checked: false, addedAt: 2 },
  { id: 'phone-charger', name: 'Phone & Laptop Charger', category: 'Electronics', checked: false, addedAt: 3 },
  { id: 'power-bank', name: 'Power Bank (Carry-On Only)', slug: 'power-bank', category: 'Electronics', status: 'allowed', checked: false, addedAt: 4 },
  { id: 'airpods', name: 'AirPods / Headphones', slug: 'airpods', category: 'Electronics', status: 'allowed', checked: false, addedAt: 5 },
  { id: 'melatonin', name: 'Melatonin / Medications', slug: 'melatonin', category: 'Medicine', status: 'allowed', checked: false, addedAt: 6 },
  { id: 'toothpaste', name: 'Toothpaste (≤ 3.4 oz / 100ml)', slug: 'toothpaste', category: 'Liquids', status: 'conditional', checked: false, addedAt: 7 },
  { id: 'sunscreen', name: 'Sunscreen (Travel Size)', slug: 'sunscreen', category: 'Liquids', status: 'conditional', checked: false, addedAt: 8 },
];

export function usePackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          setItems(JSON.parse(raw));
        } else {
          setItems(DEFAULT_PACKING_ITEMS);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PACKING_ITEMS)).catch(() => {});
        }
      })
      .catch(() => {
        setItems(DEFAULT_PACKING_ITEMS);
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items, loaded]);

  const addItem = useCallback((name: string, slug?: string, category: string = 'General', status?: ItemStatus) => {
    setItems((prev) => {
      if (slug && prev.some((i) => i.slug === slug)) return prev;
      return [
        {
          id: (slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-')) + '-' + Date.now(),
          name,
          slug,
          category,
          status,
          checked: false,
          addedAt: Date.now(),
        },
        ...prev,
      ];
    });
  }, []);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const resetToDefault = useCallback(() => {
    setItems(DEFAULT_PACKING_ITEMS);
  }, []);

  const hasItem = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

  return { items, loaded, addItem, toggleItem, removeItem, clearAll, resetToDefault, hasItem };
}
