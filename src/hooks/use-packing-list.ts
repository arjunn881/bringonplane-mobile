import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PackingItem, ItemStatus } from '../types';

const STORAGE_KEY = '@bringonplane/packing-list';

export function usePackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load persisted list on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setItems(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Persist whenever items change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items, loaded]);

  const addItem = useCallback((name: string, slug: string, status: ItemStatus) => {
    setItems((prev) => {
      if (prev.some((i) => i.slug === slug)) return prev; // no duplicates
      return [
        ...prev,
        { id: slug + '-' + Date.now(), name, slug, status, checked: false, addedAt: Date.now() },
      ];
    });
  }, []);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const hasItem = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

  return { items, loaded, addItem, toggleItem, removeItem, clearAll, hasItem };
}
