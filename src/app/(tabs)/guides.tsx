import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { ALL_GUIDES, Guide } from '../../data/guides';

const GUIDE_TOPICS = ['All', 'Electronics', 'Liquids', 'TSA Rules', 'Food', 'Medication', 'Travel Tips'];

export default function GuidesScreen() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [search, setSearch] = useState('');

  const filteredGuides = useMemo(() => {
    return ALL_GUIDES.filter((g) => {
      const matchesTopic =
        selectedTopic === 'All' ||
        g.category.toLowerCase().includes(selectedTopic.toLowerCase()) ||
        g.title.toLowerCase().includes(selectedTopic.toLowerCase());

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q);

      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, search]);

  function handleSelectGuide(slug: string) {
    router.push(`/guide/${slug}`);
  }

  function renderGuideCard({ item }: { item: Guide }) {
    return (
      <TouchableOpacity
        style={styles.guideCard}
        onPress={() => handleSelectGuide(item.slug)}
        activeOpacity={0.75}
      >
        <View style={styles.cardTop}>
          <Text style={styles.categoryBadge}>{item.category || 'Travel Guide'}</Text>
          <Text style={styles.dateText}>{item.lastUpdated}</Text>
        </View>

        <Text style={styles.guideTitle}>{item.title}</Text>

        {item.description ? (
          <Text style={styles.guideDesc} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}

        <View style={styles.cardFooter}>
          <Text style={styles.readMoreText}>Read Guide →</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search guides (e.g. airtag, melatonin, liquids)..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: Colors.textMuted, fontWeight: '700' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicScroll}
        >
          {GUIDE_TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.topicPill,
                selectedTopic === topic && styles.topicPillActive,
              ]}
              onPress={() => setSelectedTopic(topic)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.topicPillText,
                  selectedTopic === topic && styles.topicPillTextActive,
                ]}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Guides List */}
      <FlatList
        data={filteredGuides}
        keyExtractor={(item) => item.slug}
        renderItem={renderGuideCard}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.countText}>
            Showing {filteredGuides.length} travel guides
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>📖</Text>
            <Text style={styles.emptyTitle}>No guides found</Text>
            <Text style={styles.emptyDesc}>Try a different search term or category filter.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchHeader: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
  },
  topicScroll: {
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 8,
  },
  topicPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  topicPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  topicPillTextActive: {
    color: Colors.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  guideCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
    lineHeight: 22,
    marginBottom: 6,
  },
  guideDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
