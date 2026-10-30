import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { CATEGORIES, CATEGORY_META, ALL_ITEMS, ItemData } from '../../data/items';
import { getStatusConfig } from '../../lib/status';

export default function CategoriesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [catSearch, setCatSearch] = useState('');

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of ALL_ITEMS) {
      map[item.category] = (map[item.category] || 0) + 1;
    }
    return map;
  }, []);

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return [];
    let list = ALL_ITEMS.filter(
      (i) => i.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    if (catSearch.trim()) {
      const q = catSearch.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.aliases.some((a) => a.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, catSearch]);

  function handleSelectItem(slug: string) {
    router.push(`/item/${slug}`);
  }

  return (
    <View style={styles.container}>
      {selectedCategory ? (
        // Category Detail View
        <View style={{ flex: 1 }}>
          <View style={styles.catHeaderBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                setSelectedCategory(null);
                setCatSearch('');
              }}
            >
              <Text style={styles.backBtnText}>← All Categories</Text>
            </TouchableOpacity>

            <View style={styles.activeCatInfo}>
              <Text style={styles.activeCatEmoji}>
                {CATEGORY_META[selectedCategory]?.emoji || '📂'}
              </Text>
              <View>
                <Text style={styles.activeCatTitle}>{selectedCategory}</Text>
                <Text style={styles.activeCatSubtitle}>
                  {filteredItems.length} items listed
                </Text>
              </View>
            </View>

            {/* Filter Input inside category */}
            <View style={styles.catSearchBar}>
              <Text style={styles.catSearchIcon}>🔍</Text>
              <TextInput
                style={styles.catSearchInput}
                placeholder={`Search in ${selectedCategory}...`}
                placeholderTextColor={Colors.textMuted}
                value={catSearch}
                onChangeText={setCatSearch}
              />
              {catSearch.length > 0 && (
                <TouchableOpacity onPress={() => setCatSearch('')}>
                  <Text style={{ color: Colors.textMuted, fontWeight: '700' }}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.slug}
            contentContainerStyle={styles.itemList}
            renderItem={({ item }) => {
              const carryOnCfg = getStatusConfig(item.carryOn.status);
              const checkedCfg = getStatusConfig(item.checkedBag.status);

              return (
                <TouchableOpacity
                  style={styles.itemRow}
                  onPress={() => handleSelectItem(item.slug)}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.itemRowName}>{item.name}</Text>
                    {item.description ? (
                      <Text style={styles.itemRowDesc} numberOfLines={1}>
                        {item.description}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.statusPills}>
                    <View
                      style={[
                        styles.miniPill,
                        { backgroundColor: carryOnCfg.bg, borderColor: carryOnCfg.border },
                      ]}
                    >
                      <Text style={[styles.miniPillText, { color: carryOnCfg.text }]}>
                        Cabin {carryOnCfg.icon}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.miniPill,
                        { backgroundColor: checkedCfg.bg, borderColor: checkedCfg.border },
                      ]}
                    >
                      <Text style={[styles.miniPillText, { color: checkedCfg.text }]}>
                        Hold {checkedCfg.icon}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        // Categories Grid View
        <ScrollView contentContainerStyle={styles.gridScroll}>
          <View style={styles.titleSection}>
            <Text style={styles.pageHeading}>Explore by Category</Text>
            <Text style={styles.pageSubheading}>
              Find official regulations for carry-on luggage and checked baggage across all categories.
            </Text>
          </View>

          <View style={styles.grid}>
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat] || { emoji: '📂', description: 'Baggage items' };
              const count = categoryCounts[cat] || 0;

              return (
                <TouchableOpacity
                  key={cat}
                  style={styles.catCard}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.75}
                >
                  <View style={styles.catCardTop}>
                    <Text style={styles.catEmoji}>{meta.emoji}</Text>
                    <View style={styles.countBadge}>
                      <Text style={styles.countBadgeText}>{count}</Text>
                    </View>
                  </View>

                  <Text style={styles.catTitle}>{cat}</Text>
                  <Text style={styles.catDescription} numberOfLines={2}>
                    {meta.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  gridScroll: {
    padding: 16,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 16,
  },
  pageHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  pageSubheading: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  catCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  catCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  catEmoji: {
    fontSize: 28,
  },
  countBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  catTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  catDescription: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
  },
  catHeaderBar: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    marginBottom: 10,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  activeCatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  activeCatEmoji: {
    fontSize: 32,
  },
  activeCatTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
  },
  activeCatSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  catSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catSearchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  catSearchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
  },
  itemList: {
    padding: 16,
    paddingBottom: 40,
  },
  itemRow: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemRowName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  itemRowDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  statusPills: {
    flexDirection: 'row',
    gap: 6,
  },
  miniPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  miniPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
