import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSearch } from '../../hooks/use-search';
import { getStatusConfig } from '../../lib/status';
import { Colors } from '../../constants/colors';
import { ItemData } from '../../types';
import { ALL_ITEMS } from '../../data/items';

const POPULAR_CHIPS = [
  { label: '🔋 Power Bank', slug: 'power-bank' },
  { label: '🔌 Laptop Charger', slug: 'laptop-charger' },
  { label: '🏷️ Apple AirTag', slug: 'airtag' },
  { label: '💊 Melatonin', slug: 'melatonin' },
  { label: '📦 Nicotine Pouches', slug: 'nicotine-pouches' },
  { label: '🎧 AirPods', slug: 'airpods' },
  { label: '💻 Laptop', slug: 'laptop' },
  { label: '🧴 Sunscreen', slug: 'sunscreen' },
  { label: '🍜 Cup Noodles', slug: 'instant-noodles' },
  { label: '👟 Shoes', slug: 'shoes' },
  { label: '🪒 Razor', slug: 'razor' },
  { label: '💨 Vape', slug: 'vape' },
  { label: '⛺ Tent Stakes', slug: 'tent-stakes' },
];

const MOST_SEARCHED_SLUGS = [
  'power-bank',
  'laptop-charger',
  'airtag',
  'melatonin',
  'airpods',
  'sunscreen',
  'laptop',
  'vape',
];

const QUICK_CATEGORIES = [
  { name: 'Electronics', emoji: '💻' },
  { name: 'Liquids', emoji: '🧴' },
  { name: 'Medicine', emoji: '💊' },
  { name: 'Food', emoji: '🍎' },
  { name: 'Personal Care', emoji: '🪥' },
  { name: 'Tools', emoji: '🔧' },
  { name: 'Sports', emoji: '⚽' },
  { name: 'Camping', emoji: '⛺' },
];

export default function SearchHomeScreen() {
  const router = useRouter();
  const { results, query, search, reset, totalCount } = useSearch();
  const inputRef = useRef<any>(null);

  const isSearching = query.trim().length > 0;

  function handleSelect(slug: string) {
    router.push(`/item/${slug}`);
  }

  function renderSearchResult({ item }: { item: ItemData }) {
    const carryOnCfg = getStatusConfig(item.carryOn.status);
    const checkedCfg = getStatusConfig(item.checkedBag.status);

    return (
      <TouchableOpacity
        style={styles.resultCard}
        onPress={() => handleSelect(item.slug)}
        activeOpacity={0.75}
      >
        <View style={styles.cardHeader}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </View>
        </View>

        {item.description ? (
          <Text style={styles.itemSummary} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}

        {/* Status badges row */}
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: carryOnCfg.bg, borderColor: carryOnCfg.border }]}>
            <Text style={[styles.badgeEmoji, { color: carryOnCfg.text }]}>{carryOnCfg.icon}</Text>
            <View>
              <Text style={[styles.badgeTitle, { color: carryOnCfg.text }]}>Carry-On</Text>
              <Text style={[styles.badgeSubtitle, { color: carryOnCfg.text }]}>{carryOnCfg.shortLabel}</Text>
            </View>
          </View>

          <View style={[styles.badge, { backgroundColor: checkedCfg.bg, borderColor: checkedCfg.border }]}>
            <Text style={[styles.badgeEmoji, { color: checkedCfg.text }]}>{checkedCfg.icon}</Text>
            <View>
              <Text style={[styles.badgeTitle, { color: checkedCfg.text }]}>Checked</Text>
              <Text style={[styles.badgeSubtitle, { color: checkedCfg.text }]}>{checkedCfg.shortLabel}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Header Banner */}
      <View style={styles.heroSection}>
        <View style={styles.pillTag}>
          <Text style={styles.pillTagText}>OFFICIAL TSA & AIRLINE DATABASE 2026</Text>
        </View>
        <Text style={styles.heroTitle}>Can I bring this on a plane?</Text>
        <Text style={styles.heroSubtitle}>
          Instant rules for {totalCount}+ items across TSA, FAA, ICAO & international airlines.
        </Text>

        {/* Live Search Input */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search e.g. melatonin, power bank, airpods..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={search}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <Pressable onPress={reset} hitSlop={10} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Main Content: Search Results OR Home Dashboard */}
      {isSearching ? (
        <View style={{ flex: 1 }}>
          <View style={styles.resultsBar}>
            <Text style={styles.resultsCount}>
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </Text>
            <TouchableOpacity onPress={reset}>
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={results}
            keyExtractor={(item) => item.slug}
            renderItem={renderSearchResult}
            contentContainerStyle={styles.resultsList}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={styles.emptyTitle}>No exact match found</Text>
                <Text style={styles.emptySubtitle}>
                  Try searching by generic category (e.g., "electronics", "liquid", "medicine") or check our TSA Rules guide.
                </Text>
                <TouchableOpacity
                  style={styles.viewAllBtn}
                  onPress={() => router.push('/tsa-rules')}
                >
                  <Text style={styles.viewAllBtnText}>View Official TSA Rules</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Popular Search Chips */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Popular Searches</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsScroll}
          >
            {POPULAR_CHIPS.map((chip) => (
              <TouchableOpacity
                key={chip.slug}
                style={styles.chip}
                onPress={() => handleSelect(chip.slug)}
                activeOpacity={0.7}
              >
                <Text style={styles.chipText}>{chip.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Hub Cards */}
          <View style={styles.hubGrid}>
            <TouchableOpacity
              style={styles.hubCard}
              onPress={() => router.push('/airlines')}
              activeOpacity={0.8}
            >
              <Text style={styles.hubEmoji}>✈️</Text>
              <Text style={styles.hubTitle}>Airlines</Text>
              <Text style={styles.hubDesc}>Limits & fees</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hubCard}
              onPress={() => router.push('/countries')}
              activeOpacity={0.8}
            >
              <Text style={styles.hubEmoji}>🌍</Text>
              <Text style={styles.hubTitle}>Countries</Text>
              <Text style={styles.hubDesc}>Customs rules</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hubCard}
              onPress={() => router.push('/tsa-rules')}
              activeOpacity={0.8}
            >
              <Text style={styles.hubEmoji}>🛡️</Text>
              <Text style={styles.hubTitle}>TSA Rules</Text>
              <Text style={styles.hubDesc}>Official 2026</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hubCard}
              onPress={() => router.push('/compare')}
              activeOpacity={0.8}
            >
              <Text style={styles.hubEmoji}>⚖️</Text>
              <Text style={styles.hubTitle}>Compare</Text>
              <Text style={styles.hubDesc}>Side-by-side</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Categories Bar */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📂 Browse by Category</Text>
            <TouchableOpacity onPress={() => router.push('/categories')}>
              <Text style={styles.seeAllText}>View All 15 →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.catGrid}>
            {QUICK_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={styles.catCard}
                onPress={() => {
                  search(cat.name);
                }}
                activeOpacity={0.75}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 3-1-1 Liquids Banner */}
          <TouchableOpacity
            style={styles.bannerCard}
            onPress={() => router.push('/tsa-rules')}
            activeOpacity={0.85}
          >
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerBadge}>TSA LIQUID RULE</Text>
              <Text style={styles.bannerHeading}>The 3-1-1 Liquids Rule</Text>
              <Text style={styles.bannerSubtext}>
                3.4 oz (100ml) containers • 1 quart clear plastic bag • 1 bag per passenger.
              </Text>
            </View>
            <Text style={styles.bannerEmoji}>🧴</Text>
          </TouchableOpacity>

          {/* Most Searched Items Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⭐ Most Searched Items</Text>
          </View>

          {MOST_SEARCHED_SLUGS.map((slug) => {
            const item = ALL_ITEMS.find((i) => i.slug === slug);
            if (!item) return null;
            const carryOnCfg = getStatusConfig(item.carryOn.status);
            const checkedCfg = getStatusConfig(item.checkedBag.status);

            return (
              <TouchableOpacity
                key={item.slug}
                style={styles.mostSearchedCard}
                onPress={() => handleSelect(item.slug)}
                activeOpacity={0.75}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.msName}>{item.name}</Text>
                  <Text style={styles.msCategory}>{item.category}</Text>
                </View>
                <View style={styles.msBadges}>
                  <View
                    style={[
                      styles.msBadge,
                      { backgroundColor: carryOnCfg.bg, borderColor: carryOnCfg.border },
                    ]}
                  >
                    <Text style={[styles.msBadgeText, { color: carryOnCfg.text }]}>
                      Carry-On {carryOnCfg.icon}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.msBadge,
                      { backgroundColor: checkedCfg.bg, borderColor: checkedCfg.border },
                    ]}
                  >
                    <Text style={[styles.msBadgeText, { color: checkedCfg.text }]}>
                      Checked {checkedCfg.icon}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Lithium Warning Banner */}
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>⚠️ Lithium Battery Safety Warning</Text>
            <Text style={styles.warningText}>
              Power banks and spare lithium-ion batteries are STRICTLY PROHIBITED in checked luggage by the FAA and all airlines. Always keep them in your carry-on luggage.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  pillTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  pillTagText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.cardSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  clearFilterText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  resultsList: {
    padding: 16,
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  itemCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  itemSummary: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
    marginVertical: 6,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeEmoji: {
    fontSize: 14,
    fontWeight: '900',
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badgeSubtitle: {
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  hubGrid: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  hubCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  hubEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  hubTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
  },
  hubDesc: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
  },
  catCard: {
    width: '23%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  catName: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  bannerCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Colors.skyLight,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  bannerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.sky,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  bannerHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  bannerSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  bannerEmoji: {
    fontSize: 32,
  },
  mostSearchedCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  msName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  msCategory: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  msBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  msBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  msBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  warningCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.amberLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.amber,
    borderRadius: 10,
    padding: 12,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 17,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
    marginTop: 20,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  viewAllBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  viewAllBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
});
