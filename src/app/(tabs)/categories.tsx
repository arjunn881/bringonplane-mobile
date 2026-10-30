import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

const CATEGORIES = [
  { slug: 'food-drinks', label: 'Food & Drinks', emoji: '🍎' },
  { slug: 'electronics', label: 'Electronics', emoji: '💻' },
  { slug: 'medicines', label: 'Medicines & Supplements', emoji: '💊' },
  { slug: 'liquids', label: 'Liquids & Gels', emoji: '🧴' },
  { slug: 'sports', label: 'Sports & Outdoors', emoji: '⚽' },
  { slug: 'tools', label: 'Tools & Hardware', emoji: '🔧' },
  { slug: 'clothing', label: 'Clothing & Accessories', emoji: '👟' },
  { slug: 'cosmetics', label: 'Cosmetics & Beauty', emoji: '💄' },
  { slug: 'dangerous', label: 'Dangerous Goods', emoji: '⚠️' },
  { slug: 'baby', label: 'Baby & Kids', emoji: '👶' },
  { slug: 'pets', label: 'Pets', emoji: '🐾' },
  { slug: 'documents', label: 'Documents & Money', emoji: '📄' },
];

export default function CategoriesScreen() {
  const router = useRouter();

  function handleCategory(slug: string) {
    router.push(`/?category=${slug}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Browse by Category</Text>
      <Text style={styles.subheading}>
        Find out what you can bring on your flight
      </Text>
      <View style={styles.grid}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.slug}
            style={styles.card}
            onPress={() => handleCategory(cat.slug)}
            activeOpacity={0.75}
          >
            <Text style={styles.emoji}>{cat.emoji}</Text>
            <Text style={styles.label}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>✈️ Not sure about an item?</Text>
        <Text style={styles.promoText}>
          Use the Search tab to instantly look up any item and get TSA, IATA, and airline-specific
          rules.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 40 },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
    marginTop: 4,
  },
  subheading: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  emoji: { fontSize: 36, marginBottom: 8 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  promoCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 14,
    padding: 18,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 6,
  },
  promoText: { fontSize: 13, color: Colors.text, lineHeight: 20 },
});
