import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { fetchItem, getStatusInfo } from '../../lib/api';
import { usePackingList } from '../../hooks/use-packing-list';
import { Item } from '../../types';
import { Colors } from '../../constants/colors';

export default function ItemDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, removeItem, hasItem, items } = usePackingList();

  const inList = hasItem(slug);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchItem(slug)
      .then((data) => {
        if (!data) setError('Item not found.');
        else {
          setItem(data);
          navigation.setOptions({ title: data.name });
        }
      })
      .catch(() => setError('Could not load item. Check your connection.'))
      .finally(() => setLoading(false));
  }, [slug]);

  function handlePackingToggle() {
    if (!item) return;
    if (inList) {
      const listItem = items.find((i) => i.slug === slug);
      if (listItem) removeItem(listItem.id);
    } else {
      addItem(item.name, item.slug, item.status);
    }
  }

  function openOnWeb() {
    Linking.openURL(`https://bringonplane.com/items/${slug}/`);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>❌</Text>
        <Text style={styles.errorText}>{error ?? 'Something went wrong.'}</Text>
      </View>
    );
  }

  const { label, emoji, colorKey } = getStatusInfo(item.status);
  const bgColor =
    colorKey === 'success'
      ? Colors.successLight
      : colorKey === 'danger'
      ? Colors.dangerLight
      : colorKey === 'warning'
      ? Colors.warningLight
      : Colors.greyLight;
  const textColor =
    colorKey === 'success'
      ? '#15803D'
      : colorKey === 'danger'
      ? '#B91C1C'
      : colorKey === 'warning'
      ? '#B45309'
      : Colors.grey;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Status Hero */}
      <View style={[styles.statusHero, { backgroundColor: bgColor }]}>
        <Text style={styles.heroEmoji}>{emoji}</Text>
        <Text style={[styles.heroLabel, { color: textColor }]}>{label}</Text>
        <Text style={styles.heroName}>{item.name}</Text>
      </View>

      {/* Category pill */}
      <View style={styles.categoryRow}>
        <Text style={styles.categoryPill}>{item.category}</Text>
      </View>

      {/* Summary */}
      {item.summary ? (
        <View style={styles.section}>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      ) : null}

      {/* Carry-on / Checked */}
      {(item.carryon || item.checked) && (
        <View style={styles.rulesGrid}>
          {item.carryon && (
            <View style={styles.ruleCard}>
              <Text style={styles.ruleTitle}>🎒 Carry-On</Text>
              <Text style={styles.ruleText}>{item.carryon}</Text>
            </View>
          )}
          {item.checked && (
            <View style={styles.ruleCard}>
              <Text style={styles.ruleTitle}>🧳 Checked Bag</Text>
              <Text style={styles.ruleText}>{item.checked}</Text>
            </View>
          )}
        </View>
      )}

      {/* Notes */}
      {item.notes && (
        <View style={styles.notesBox}>
          <Text style={styles.notesTitle}>📋 Important Notes</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      {/* Airline-specific rules */}
      {item.rules && item.rules.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Airline / Country Rules</Text>
          {item.rules.map((rule, i) => {
            const { emoji: rEmoji, colorKey: rKey } = getStatusInfo(rule.status);
            return (
              <View key={i} style={styles.ruleRow}>
                <Text style={styles.ruleRowEmoji}>{rEmoji}</Text>
                <View style={styles.ruleRowContent}>
                  <Text style={styles.ruleRowName}>{rule.airline ?? rule.country ?? 'General'}</Text>
                  {rule.note && <Text style={styles.ruleRowNote}>{rule.note}</Text>}
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, inList ? styles.actionBtnRemove : styles.actionBtnAdd]}
          onPress={handlePackingToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.actionBtnLabel}>
            {inList ? '✅ In Packing List' : '🧳 Add to Packing List'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.webBtn} onPress={openOnWeb} activeOpacity={0.8}>
          <Text style={styles.webBtnLabel}>🌐 Full Details on Web</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: Colors.textMuted },
  errorEmoji: { fontSize: 48, marginBottom: 12 },
  errorText: { color: Colors.danger, textAlign: 'center', fontSize: 15 },
  statusHero: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroLabel: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  heroName: { fontSize: 26, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  categoryRow: { paddingHorizontal: 16, paddingVertical: 10 },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    color: Colors.primaryDark,
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: { marginHorizontal: 16, marginVertical: 8 },
  summary: { fontSize: 15, color: Colors.text, lineHeight: 22 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 10 },
  rulesGrid: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  ruleCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  ruleTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  ruleText: { fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  notesBox: {
    backgroundColor: Colors.warningLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    padding: 14,
  },
  notesTitle: { fontSize: 14, fontWeight: '700', color: '#92400E', marginBottom: 6 },
  notesText: { fontSize: 13, color: '#78350F', lineHeight: 18 },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
  },
  ruleRowEmoji: { fontSize: 20, marginRight: 10, marginTop: 1 },
  ruleRowContent: { flex: 1 },
  ruleRowName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  ruleRowNote: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  actions: { marginHorizontal: 16, marginTop: 24, gap: 10 },
  actionBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBtnAdd: { backgroundColor: Colors.primary },
  actionBtnRemove: { backgroundColor: Colors.success },
  actionBtnLabel: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  webBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colors.greyLight,
  },
  webBtnLabel: { color: Colors.text, fontWeight: '600', fontSize: 14 },
});
