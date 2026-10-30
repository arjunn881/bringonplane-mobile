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
import { ALL_AIRLINES, AIRLINE_FAQS, AirlineData } from '../data/airlines';

export default function AirlinesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filtered = ALL_AIRLINES.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2026 AIRLINE COMPARISON</Text>
        </View>
        <Text style={styles.headerTitle}>Airline Baggage Rules & Dimensions</Text>
        <Text style={styles.headerSubtitle}>
          Carry-on size limits, weight restrictions, lithium battery rules, and baggage policies across major international carriers.
        </Text>

        <View style={styles.searchBar}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search airline (e.g. Emirates, Ryanair, Delta)..."
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
      </View>

      {/* Airline Cards */}
      <View style={styles.airlineList}>
        {filtered.map((airline) => (
          <View key={airline.slug} style={styles.airlineCard}>
            <View style={styles.airlineCardTop}>
              <View style={styles.airlineIcon}>
                <Text style={{ fontSize: 20 }}>✈️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.airlineName}>{airline.name}</Text>
                <Text style={styles.airlineSub}>International Carrier Guidelines</Text>
              </View>
            </View>

            {/* Spec Matrix */}
            <View style={styles.specsGrid}>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>CARRY-ON DIMENSIONS</Text>
                <Text style={styles.specValue}>{airline.carryOnDim}</Text>
              </View>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>CARRY-ON WEIGHT</Text>
                <Text style={styles.specValue}>{airline.carryOnWeight}</Text>
              </View>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>CHECKED BAG LIMIT</Text>
                <Text style={styles.specValue}>{airline.checkedWeight}</Text>
              </View>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>PERSONAL ITEM</Text>
                <Text style={styles.specValue}>{airline.personalItem}</Text>
              </View>
            </View>

            {/* Battery Policy */}
            <View style={styles.policyHighlight}>
              <Text style={styles.policyLabel}>🔋 Lithium Battery & Power Bank Policy:</Text>
              <Text style={styles.policyText}>{airline.batteryPolicy}</Text>
            </View>

            {/* Liquid Policy */}
            <View style={[styles.policyHighlight, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
              <Text style={[styles.policyLabel, { color: Colors.sky }]}>🧴 Liquid Policy:</Text>
              <Text style={styles.policyText}>{airline.liquidRule}</Text>
            </View>

            {/* Special Airline Policies */}
            {airline.specialPolicies && airline.specialPolicies.length > 0 && (
              <View style={styles.specialPoliciesBox}>
                <Text style={styles.specialHeader}>Special Airline Exceptions:</Text>
                {airline.specialPolicies.map((sp, idx) => (
                  <View key={idx} style={styles.specialItem}>
                    <Text style={styles.specialTopic}>• {sp.topic}:</Text>
                    <Text style={styles.specialDetail}>{sp.detail}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Airline FAQs */}
      <View style={styles.faqSection}>
        <Text style={styles.faqSectionTitle}>Airline Regulations FAQs</Text>
        {AIRLINE_FAQS.map((faq, idx) => {
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
    marginBottom: 14,
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
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
  },
  airlineList: {
    gap: 14,
  },
  airlineCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  airlineCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
  },
  airlineIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  airlineSub: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  specBox: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  specValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  policyHighlight: {
    backgroundColor: Colors.amberLight,
    borderWidth: 1,
    borderColor: Colors.amberBorder,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  policyLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 3,
  },
  policyText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  specialPoliciesBox: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specialHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  specialItem: {
    marginBottom: 6,
  },
  specialTopic: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  specialDetail: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
  faqSection: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginTop: 18,
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
