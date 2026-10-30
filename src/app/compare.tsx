import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import { ALL_ITEMS, ItemData, getItem } from '../data/items';
import { getStatusConfig } from '../lib/status';

export default function CompareScreen() {
  const router = useRouter();
  const [slugA, setSlugA] = useState<string>('power-bank');
  const [slugB, setSlugB] = useState<string>('laptop');
  const [pickerTarget, setPickerTarget] = useState<'A' | 'B' | null>(null);
  const [search, setSearch] = useState('');

  const itemA = getItem(slugA);
  const itemB = getItem(slugB);

  const filteredPicker = ALL_ITEMS.filter((i) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
  });

  function selectItem(slug: string) {
    if (pickerTarget === 'A') setSlugA(slug);
    if (pickerTarget === 'B') setSlugB(slug);
    setPickerTarget(null);
    setSearch('');
  }

  const carryCfgA = itemA ? getStatusConfig(itemA.carryOn.status) : null;
  const carryCfgB = itemB ? getStatusConfig(itemB.carryOn.status) : null;
  const checkedCfgA = itemA ? getStatusConfig(itemA.checkedBag.status) : null;
  const checkedCfgB = itemB ? getStatusConfig(itemB.checkedBag.status) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SIDE-BY-SIDE COMPARISON</Text>
        </View>
        <Text style={styles.headerTitle}>Compare Flight Items</Text>
        <Text style={styles.headerSubtitle}>
          Select any two items to instantly compare their Carry-On vs Checked Baggage regulations side-by-side.
        </Text>
      </View>

      {/* Selectors Bar */}
      <View style={styles.selectorsRow}>
        <TouchableOpacity
          style={styles.selectorBtn}
          onPress={() => setPickerTarget('A')}
          activeOpacity={0.8}
        >
          <Text style={styles.selectorLabel}>ITEM 1</Text>
          <Text style={styles.selectorName} numberOfLines={1}>
            {itemA ? itemA.name : 'Select Item...'}
          </Text>
          <Text style={styles.changeText}>Change ▼</Text>
        </TouchableOpacity>

        <View style={styles.vsCircle}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <TouchableOpacity
          style={styles.selectorBtn}
          onPress={() => setPickerTarget('B')}
          activeOpacity={0.8}
        >
          <Text style={styles.selectorLabel}>ITEM 2</Text>
          <Text style={styles.selectorName} numberOfLines={1}>
            {itemB ? itemB.name : 'Select Item...'}
          </Text>
          <Text style={styles.changeText}>Change ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Comparison Tables */}
      {itemA && itemB && (
        <View style={styles.comparisonCards}>
          {/* Carry-On Allowance Row */}
          <View style={styles.compSection}>
            <Text style={styles.compSectionTitle}>🎒 Carry-On Baggage Allowance</Text>
            <View style={styles.compRow}>
              {/* Item A */}
              <View
                style={[
                  styles.compHalf,
                  { backgroundColor: carryCfgA?.bg, borderColor: carryCfgA?.border },
                ]}
              >
                <Text style={styles.compItemTitle}>{itemA.name}</Text>
                <View style={[styles.badgePill, { backgroundColor: carryCfgA?.solid }]}>
                  <Text style={styles.badgePillText}>{carryCfgA?.label}</Text>
                </View>
                <Text style={[styles.compReason, { color: carryCfgA?.text }]}>
                  {itemA.carryOn.reason || (itemA.carryOn.status === 'allowed' ? 'Allowed in cabin.' : 'Restricted in cabin.')}
                </Text>
              </View>

              {/* Item B */}
              <View
                style={[
                  styles.compHalf,
                  { backgroundColor: carryCfgB?.bg, borderColor: carryCfgB?.border },
                ]}
              >
                <Text style={styles.compItemTitle}>{itemB.name}</Text>
                <View style={[styles.badgePill, { backgroundColor: carryCfgB?.solid }]}>
                  <Text style={styles.badgePillText}>{carryCfgB?.label}</Text>
                </View>
                <Text style={[styles.compReason, { color: carryCfgB?.text }]}>
                  {itemB.carryOn.reason || (itemB.carryOn.status === 'allowed' ? 'Allowed in cabin.' : 'Restricted in cabin.')}
                </Text>
              </View>
            </View>
          </View>

          {/* Checked Baggage Allowance Row */}
          <View style={styles.compSection}>
            <Text style={styles.compSectionTitle}>🧳 Checked Baggage Allowance</Text>
            <View style={styles.compRow}>
              {/* Item A */}
              <View
                style={[
                  styles.compHalf,
                  { backgroundColor: checkedCfgA?.bg, borderColor: checkedCfgA?.border },
                ]}
              >
                <Text style={styles.compItemTitle}>{itemA.name}</Text>
                <View style={[styles.badgePill, { backgroundColor: checkedCfgA?.solid }]}>
                  <Text style={styles.badgePillText}>{checkedCfgA?.label}</Text>
                </View>
                <Text style={[styles.compReason, { color: checkedCfgA?.text }]}>
                  {itemA.checkedBag.reason || (itemA.checkedBag.status === 'allowed' ? 'Allowed in checked bags.' : 'Restricted in hold luggage.')}
                </Text>
              </View>

              {/* Item B */}
              <View
                style={[
                  styles.compHalf,
                  { backgroundColor: checkedCfgB?.bg, borderColor: checkedCfgB?.border },
                ]}
              >
                <Text style={styles.compItemTitle}>{itemB.name}</Text>
                <View style={[styles.badgePill, { backgroundColor: checkedCfgB?.solid }]}>
                  <Text style={styles.badgePillText}>{checkedCfgB?.label}</Text>
                </View>
                <Text style={[styles.compReason, { color: checkedCfgB?.text }]}>
                  {itemB.checkedBag.reason || (itemB.checkedBag.status === 'allowed' ? 'Allowed in checked bags.' : 'Restricted in hold luggage.')}
                </Text>
              </View>
            </View>
          </View>

          {/* View Full Item Details Links */}
          <View style={styles.linksRow}>
            <TouchableOpacity
              style={styles.detailLink}
              onPress={() => router.push(`/item/${itemA.slug}`)}
            >
              <Text style={styles.detailLinkText}>Full {itemA.name} Rules →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailLink}
              onPress={() => router.push(`/item/${itemB.slug}`)}
            >
              <Text style={styles.detailLinkText}>Full {itemB.name} Rules →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Item Picker Modal */}
      <Modal visible={pickerTarget !== null} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Select {pickerTarget === 'A' ? 'First' : 'Second'} Item to Compare
            </Text>
            <TouchableOpacity onPress={() => setPickerTarget(null)}>
              <Text style={styles.modalClose}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalSearch}>
            <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Search 210 items..."
              placeholderTextColor={Colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <FlatList
            data={filteredPicker}
            keyExtractor={(i) => i.slug}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pickerItem}
                onPress={() => selectItem(item.slug)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.pickerName}>{item.name}</Text>
                  <Text style={styles.pickerCat}>{item.category}</Text>
                </View>
                <Text style={styles.pickerSelectBtn}>Select →</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  headerBox: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  selectorBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  selectorLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  selectorName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  vsCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
  comparisonCards: {
    gap: 16,
  },
  compSection: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  compSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
  },
  compRow: {
    flexDirection: 'row',
    gap: 10,
  },
  compHalf: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1.5,
  },
  compItemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgePillText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  compReason: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
  },
  linksRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  detailLink: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  modalClose: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  modalSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 16,
    marginBottom: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  pickerItem: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pickerName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  pickerCat: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  pickerSelectBtn: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
});
