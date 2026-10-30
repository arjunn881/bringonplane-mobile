import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import {
  TSA_RULES_HIGHLIGHTS,
  TSA_TABLE_ITEMS,
  TSA_FAQS,
  TSATableItem,
} from '../data/tsaRules';

export default function TSARulesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const filteredItems = TSA_TABLE_ITEMS.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase()) ||
    i.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>OFFICIAL TSA REGULATIONS 2026</Text>
        </View>
        <Text style={styles.headerTitle}>TSA Carry-On & Checked Baggage Rules</Text>
        <Text style={styles.headerSubtitle}>
          Transportation Security Administration (TSA) guidelines for airport security checkpoints and checked luggage in the United States and international flights.
        </Text>
      </View>

      {/* Core Rule Highlights Cards */}
      <View style={styles.highlightsList}>
        {TSA_RULES_HIGHLIGHTS.map((h, idx) => (
          <View key={idx} style={styles.highlightCard}>
            <View style={styles.highlightHeader}>
              <Text style={{ fontSize: 24, marginRight: 10 }}>{h.emoji}</Text>
              <Text style={styles.highlightTitle}>{h.title}</Text>
            </View>
            <Text style={styles.highlightSummary}>{h.summary}</Text>
            <Text style={styles.highlightDetails}>{h.details}</Text>
          </View>
        ))}
      </View>

      {/* Quick Reference Table Section */}
      <View style={styles.tableCard}>
        <Text style={styles.tableHeading}>📋 TSA Checkpoint Quick Reference</Text>
        <Text style={styles.tableSubheading}>
          Status overview for 35+ common travel items. Tap any item for complete airline rules.
        </Text>

        <View style={styles.searchBar}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items (e.g. power bank, scissors, melatonin)..."
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

        {filteredItems.map((item) => {
          const carryAllowed = item.carryOn === 'ALLOWED';
          const carryRestricted = item.carryOn === 'RESTRICTED';
          const checkedAllowed = item.checked === 'ALLOWED';
          const checkedRestricted = item.checked === 'RESTRICTED';

          return (
            <TouchableOpacity
              key={item.slug}
              style={styles.tableRow}
              onPress={() => router.push(`/item/${item.slug}`)}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.rowName}>{item.name}</Text>
                <Text style={styles.rowSummary}>{item.summary}</Text>
              </View>

              <View style={styles.badgeColumn}>
                <View
                  style={[
                    styles.miniBadge,
                    carryAllowed
                      ? { backgroundColor: Colors.allowed.badgeBg, borderColor: Colors.allowed.border }
                      : carryRestricted
                      ? { backgroundColor: Colors.restricted.badgeBg, borderColor: Colors.restricted.border }
                      : { backgroundColor: Colors.prohibited.badgeBg, borderColor: Colors.prohibited.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.miniBadgeText,
                      {
                        color: carryAllowed
                          ? Colors.allowed.badgeText
                          : carryRestricted
                          ? Colors.restricted.badgeText
                          : Colors.prohibited.badgeText,
                      },
                    ]}
                  >
                    Cabin {carryAllowed ? '✓' : carryRestricted ? '⚠' : '✕'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.miniBadge,
                    checkedAllowed
                      ? { backgroundColor: Colors.allowed.badgeBg, borderColor: Colors.allowed.border }
                      : checkedRestricted
                      ? { backgroundColor: Colors.restricted.badgeBg, borderColor: Colors.restricted.border }
                      : { backgroundColor: Colors.prohibited.badgeBg, borderColor: Colors.prohibited.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.miniBadgeText,
                      {
                        color: checkedAllowed
                          ? Colors.allowed.badgeText
                          : checkedRestricted
                          ? Colors.restricted.badgeText
                          : Colors.prohibited.badgeText,
                      },
                    ]}
                  >
                    Hold {checkedAllowed ? '✓' : checkedRestricted ? '⚠' : '✕'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* TSA FAQs */}
      <View style={styles.faqSection}>
        <Text style={styles.faqSectionTitle}>TSA Airport Security FAQs</Text>
        {TSA_FAQS.map((faq, idx) => {
          const isOpen = expandedFaq === idx;
          return (
            <View key={idx} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQBtn}
                onPress={() => setExpandedFaq(isOpen ? null : idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQText}>{faq.q}</Text>
                <Text style={styles.faqArrow}>{isOpen ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {isOpen && (
                <View style={styles.faqAnsBox}>
                  <Text style={styles.faqAnsText}>{faq.a}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
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
  highlightsList: {
    gap: 12,
    marginBottom: 18,
  },
  highlightCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  highlightTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  highlightSummary: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  highlightDetails: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  tableCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  tableHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  tableSubheading: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
  },
  tableRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  rowSummary: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  badgeColumn: {
    gap: 4,
    alignItems: 'flex-end',
  },
  miniBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  miniBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  faqSection: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 10,
  },
  faqQBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    paddingRight: 10,
  },
  faqArrow: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  faqAnsBox: {
    marginTop: 8,
  },
  faqAnsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
