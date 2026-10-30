import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors } from '../constants/colors';
import { ALL_COUNTRIES, COUNTRY_FAQS, CountryData } from '../data/countries';

export default function CountriesScreen() {
  const [search, setSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filtered = ALL_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.agency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>INTERNATIONAL CUSTOMS 2026</Text>
        </View>
        <Text style={styles.headerTitle}>Country Customs & Border Rules</Text>
        <Text style={styles.headerSubtitle}>
          Biosecurity protocols, medication import permits, duty-free exemptions, and prohibited items across major international destinations.
        </Text>

        <View style={styles.searchBar}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search country (e.g. Singapore, Japan, UK)..."
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

      {/* Country Cards */}
      <View style={styles.countryList}>
        {filtered.map((country) => (
          <View key={country.slug} style={styles.countryCard}>
            <View style={styles.countryCardTop}>
              <Text style={styles.countryFlag}>{country.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.countryName}>{country.name}</Text>
                <Text style={styles.countryAgency}>{country.agency}</Text>
              </View>
            </View>

            {/* Rule Rows */}
            <View style={styles.ruleSection}>
              <Text style={styles.ruleLabel}>🧴 LIQUIDS PROTOCOL</Text>
              <Text style={styles.ruleText}>{country.liquidRule}</Text>
            </View>

            <View style={styles.ruleSection}>
              <Text style={styles.ruleLabel}>🌱 BIOSECURITY & FOOD RESTRICTIONS</Text>
              <Text style={styles.ruleText}>{country.biosecurity}</Text>
            </View>

            <View style={styles.ruleSection}>
              <Text style={styles.ruleLabel}>💊 MEDICINE & SUPPLEMENTS POLICY</Text>
              <Text style={styles.ruleText}>{country.medicineRule}</Text>
            </View>

            <View style={styles.ruleSection}>
              <Text style={styles.ruleLabel}>💰 DUTY-FREE ALLOWANCE</Text>
              <Text style={styles.ruleText}>{country.dutyFreeLimit}</Text>
            </View>

            {/* Special Regulations */}
            {country.specialRegulations && country.specialRegulations.length > 0 && (
              <View style={styles.specialBox}>
                <Text style={styles.specialHeader}>⚠️ Critical Destination Warnings:</Text>
                {country.specialRegulations.map((sr, idx) => (
                  <View key={idx} style={styles.specialItem}>
                    <Text style={styles.specialItemTitle}>• {sr.item}:</Text>
                    <Text style={styles.specialItemRule}>{sr.rule}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Country FAQs */}
      <View style={styles.faqSection}>
        <Text style={styles.faqSectionTitle}>International Travel FAQs</Text>
        {COUNTRY_FAQS.map((faq, idx) => {
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
  countryList: {
    gap: 14,
  },
  countryCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  countryCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
  },
  countryFlag: {
    fontSize: 32,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  countryAgency: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  ruleSection: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ruleLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  ruleText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  specialBox: {
    backgroundColor: Colors.amberLight,
    borderWidth: 1,
    borderColor: Colors.amberBorder,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  specialHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 6,
  },
  specialItem: {
    marginBottom: 6,
  },
  specialItemTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  specialItemRule: {
    fontSize: 11,
    color: '#78350F',
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
