import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSearch } from '../../hooks/use-search';
import { getStatusInfo } from '../../lib/api';
import { Colors } from '../../constants/colors';
import { SearchResult } from '../../types';

export default function SearchScreen() {
  const router = useRouter();
  const { results, query, loading, error, search, reset } = useSearch();
  const inputRef = useRef<TextInput>(null);

  function handleSelect(item: SearchResult) {
    router.push(`/item/${item.slug}`);
  }

  function renderItem({ item }: { item: SearchResult }) {
    const { label, emoji, colorKey } = getStatusInfo(item.status);
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)} activeOpacity={0.7}>
        <View style={styles.cardLeft}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          {item.summary ? (
            <Text style={styles.itemSummary} numberOfLines={2}>
              {item.summary}
            </Text>
          ) : null}
        </View>
        <View style={[styles.statusBadge, styles[`badge_${colorKey}`]]}>
          <Text style={styles.statusEmoji}>{emoji}</Text>
          <Text style={[styles.statusLabel, styles[`text_${colorKey}`]]}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading items…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>📡</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => reset()}>
          <Text style={styles.retryLabel}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="e.g. melatonin, lighter, AirTag…"
          placeholderTextColor={Colors.grey}
          value={query}
          onChangeText={search}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
        {query.length > 0 && (
          <Pressable onPress={reset} hitSlop={8}>
            <Text style={styles.clearBtn}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Result count */}
      <Text style={styles.resultCount}>
        {query
          ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
          : `${results.length} items in database`}
      </Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🤷</Text>
            <Text style={styles.emptyText}>No items found for "{query}"</Text>
            <Text style={styles.emptyHint}>Try a different search term</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: Colors.text },
  clearBtn: { fontSize: 16, color: Colors.grey, paddingLeft: 8 },
  resultCount: {
    fontSize: 12,
    color: Colors.textMuted,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardLeft: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  itemCategory: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  itemSummary: { fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  statusBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
    minWidth: 76,
  },
  statusEmoji: { fontSize: 20, marginBottom: 2 },
  statusLabel: { fontSize: 11, fontWeight: '700' },
  // badge background colors
  badge_success: { backgroundColor: Colors.successLight },
  badge_danger: { backgroundColor: Colors.dangerLight },
  badge_warning: { backgroundColor: Colors.warningLight },
  badge_grey: { backgroundColor: Colors.greyLight },
  // badge text colors
  text_success: { color: '#15803D' },
  text_danger: { color: '#B91C1C' },
  text_warning: { color: '#B45309' },
  text_grey: { color: Colors.grey },
  // states
  loadingText: { marginTop: 12, color: Colors.textMuted, fontSize: 15 },
  errorEmoji: { fontSize: 48, marginBottom: 12 },
  errorText: { color: Colors.danger, textAlign: 'center', marginBottom: 16, fontSize: 15 },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryLabel: { color: Colors.white, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: Colors.text, fontWeight: '600' },
  emptyHint: { fontSize: 13, color: Colors.textMuted, marginTop: 6 },
} as any);
