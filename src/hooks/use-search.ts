import { useState, useEffect, useCallback } from 'react';
import { SearchResult } from '../types';
import { fetchSearchIndex, filterItems } from '../lib/api';

export function useSearch() {
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSearchIndex()
      .then((data) => {
        setIndex(data);
        setResults(data);
      })
      .catch(() => setError('Could not load items. Check your connection.'))
      .finally(() => setLoading(false));
  }, []);

  const search = useCallback(
    (q: string) => {
      setQuery(q);
      setResults(filterItems(index, q));
    },
    [index]
  );

  const reset = useCallback(() => {
    setQuery('');
    setResults(index);
  }, [index]);

  return { results, query, loading, error, search, reset };
}
