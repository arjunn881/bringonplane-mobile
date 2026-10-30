import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePackingList } from '../../hooks/use-packing-list';
import { Colors } from '../../constants/colors';
import { PackingItem } from '../../types';
import { ALL_ITEMS } from '../../data/items';

export default function ChecklistScreen() {
  const router = useRouter();
  const { items, toggleItem, removeItem, clearAll, resetToDefault, addItem } = usePackingList();
  const [modalVisible, setModalVisible] = useState(false);
  const [customText, setCustomText] = useState('');
  const [pickerSearch, setPickerSearch] = useState('');

  const checkedCount = items.filter((i) => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  function handleClearAll() {
    Alert.alert('Reset Checklist', 'Are you sure you want to clear your packing list?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset to Defaults', onPress: resetToDefault },
      { text: 'Clear All', style: 'destructive', onPress: clearAll },
    ]);
  }

  function handleAddCustom() {
    if (!customText.trim()) return;
    addItem(customText.trim(), undefined, 'Custom');
    setCustomText('');
  }

  const pickerFiltered = ALL_ITEMS.filter((i) => {
    if (!pickerSearch.trim()) return true;
    const q = pickerSearch.toLowerCase();
    return i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
  }).slice(0, 30);

  function renderChecklistItem({ item }: { item: PackingItem }) {
    return (
      <View style={[styles.itemCard, item.checked && styles.itemCardChecked]}>
        <Pressable
          onPress={() => toggleItem(item.id)}
          style={[styles.checkbox, item.checked && styles.checkboxActive]}
          hitSlop={8}
        >
          {item.checked && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            if (item.slug) {
              router.push(`/item/${item.slug}`);
            } else {
              toggleItem(item.id);
            }
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.itemTitle, item.checked && styles.itemTitleChecked]}>
            {item.name}
          </Text>
          {item.category && <Text style={styles.itemCategory}>{item.category}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          hitSlop={10}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <View>
            <Text style={styles.progressTitle}>Packing Progress</Text>
            <Text style={styles.progressSubtitle}>
              {checkedCount} of {items.length} packed ({progressPercent}%)
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercentText}>{progressPercent}%</Text>
          </View>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progressPercent}%` }]} />
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionAddBtn}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionAddText}>+ Add from Database</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
            <Text style={styles.clearText}>Reset / Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Add Custom Item Field */}
      <View style={styles.customAddBar}>
        <TextInput
          style={styles.customInput}
          placeholder="Type an item name to pack..."
          placeholderTextColor={Colors.textMuted}
          value={customText}
          onChangeText={setCustomText}
          onSubmitEditing={handleAddCustom}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.customAddSubmit, !customText.trim() && { opacity: 0.5 }]}
          onPress={handleAddCustom}
          disabled={!customText.trim()}
        >
          <Text style={styles.customAddSubmitText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Checklist FlatList */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderChecklistItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🧳</Text>
            <Text style={styles.emptyTitle}>Your packing list is empty</Text>
            <Text style={styles.emptyDesc}>
              Tap "+ Add from Database" or type any item above to get ready for your flight.
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={resetToDefault}
              activeOpacity={0.8}
            >
              <Text style={styles.resetBtnText}>Load Travel Essentials</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Add from Database Modal */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add TSA-Verified Items</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalSearchBar}>
            <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Search 210 items..."
              placeholderTextColor={Colors.textMuted}
              value={pickerSearch}
              onChangeText={setPickerSearch}
            />
          </View>

          <FlatList
            data={pickerFiltered}
            keyExtractor={(i) => i.slug}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => {
              const alreadyIn = items.some((i) => i.slug === item.slug);
              return (
                <TouchableOpacity
                  style={styles.pickerRow}
                  onPress={() => {
                    if (!alreadyIn) {
                      addItem(item.name, item.slug, item.category, item.carryOn.status);
                    }
                  }}
                  disabled={alreadyIn}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pickerName}>{item.name}</Text>
                    <Text style={styles.pickerCat}>{item.category}</Text>
                  </View>
                  <View
                    style={[
                      styles.pickerAddBadge,
                      alreadyIn && { backgroundColor: Colors.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerAddBadgeText,
                        alreadyIn && { color: Colors.textMuted },
                      ]}
                    >
                      {alreadyIn ? 'Added ✓' : '+ Add'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  progressCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  progressSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.primary,
  },
  track: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionAddBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionAddText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  customAddBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
  },
  customInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    paddingVertical: 8,
  },
  customAddSubmit: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  customAddSubmitText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemCardChecked: {
    backgroundColor: '#F8FAFC',
    opacity: 0.65,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.allowed.solid,
    borderColor: Colors.allowed.solid,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  itemTitleChecked: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  itemCategory: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteBtnText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  resetBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
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
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  modalSearchBar: {
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
  modalSearchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  pickerRow: {
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
  pickerAddBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pickerAddBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
});
