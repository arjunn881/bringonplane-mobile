import { useState, useMemo, useCallback } from 'react';
import { ALL_ITEMS, ItemData, searchItems } from '../data/items';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    let list: ItemData[] = ALL_ITEMS;
    if (selectedCategory) {
      list = list.filter(
        (i) => i.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (!query.trim()) {
      return list;
    }
    return searchItems(query).filter((item) => {
      if (!selectedCategory) return true;
      return item.category.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [query, selectedCategory]);

  const search = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const selectCategory = useCallback((cat: string | null) => {
    setSelectedCategory(cat);
  }, []);

  const reset = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
  }, []);

  return {
    results,
    query,
    selectedCategory,
    totalCount: ALL_ITEMS.length,
    search,
    selectCategory,
    reset,
  };
}
