import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePackingList } from '../../hooks/use-packing-list';
import { getStatusInfo } from '../../lib/api';
import { PackingItem } from '../../types';
import { Colors } from '../../constants/colors';

export default function PackingListScreen() {
  const router = useRouter();
  const { items, toggleItem, removeItem, clearAll } = usePackingList();

  function handleClearAll() {
    Alert.alert('Clear Packing List', 'Remove all items from your packing list?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', style: 'destructive', onPress: clearAll },
    ]);
  }

  function renderItem({ item }: { item: PackingItem }) {
    const { emoji, colorKey } = getStatusInfo(item.status);
    return (
      <View style={[styles.card, item.checked && styles.cardChecked]}>
        <Pressable style={styles.checkbox} onPress={() => toggleItem(item.id)}>
          <Text style={styles.checkboxIcon}>{item.checked ? '☑️' : '⬜'}</Text>
        </Pressable>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => router.push(`/item/${item.slug}`)}
          activeOpacity={0.7}
        >
          <Text style={[styles.itemName, item.checked && styles.itemNameDone]}>
            {item.name}
          </Text>
          <Text style={[styles.statusText, styles[`text_${colorKey}`]]}>
            {emoji} {getStatusInfo(item.status).label}
          </Text>
        </TouchableOpacity>
        <Pressable onPress={() => removeItem(item.id)} hitSlop={8} style={styles.removeBtn}>
          <Text style={styles.removeIcon}>🗑️</Text>
        </Pressable>
      </View>
    );
  }

  const checked = items.filter((i) => i.checked).length;

  return (
    <View style={styles.container}>
      {/* Header stats */}
      {items.length > 0 && (
        <View style={styles.statsBar}>
          <Text style={styles.statsText}>
            {checked}/{items.length} packed
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${items.length ? (checked / items.length) * 100 : 0}%` },
              ]}
            />
          </View>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearLabel}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🧳</Text>
            <Text style={styles.emptyTitle}>Your packing list is empty</Text>
            <Text style={styles.emptyHint}>
              Search for items and tap "Add to Packing List" to save them here.
            </Text>
            <TouchableOpacity style={styles.searchBtn} onPress={() => router.push('/')}>
              <Text style={styles.searchBtnLabel}>Search Items</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  statsBar: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statsText: { fontSize: 13, fontWeight: '700', color: Colors.text, minWidth: 56 },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.greyBorder,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  clearLabel: { fontSize: 13, color: Colors.danger, fontWeight: '600' },
  list: { padding: 16, paddingBottom: 40 },
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
  cardChecked: { opacity: 0.6 },
  checkbox: { marginRight: 12 },
  checkboxIcon: { fontSize: 24 },
  cardContent: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 2 },
  itemNameDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  statusText: { fontSize: 12, fontWeight: '600' },
  removeBtn: { paddingLeft: 10 },
  removeIcon: { fontSize: 20 },
  // status text colors
  text_success: { color: '#15803D' },
  text_danger: { color: '#B91C1C' },
  text_warning: { color: '#B45309' },
  text_grey: { color: Colors.grey },
  // empty state
  empty: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 32 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  emptyHint: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 20 },
  searchBtn: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  searchBtnLabel: { color: Colors.white, fontWeight: '700', fontSize: 15 },
} as any);
