import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Brand Hero Card */}
      <View style={styles.brandCard}>
        <View style={styles.brandIcon}>
          <Text style={{ fontSize: 24 }}>✈️</Text>
        </View>
        <Text style={styles.brandTitle}>BringOnPlane</Text>
        <Text style={styles.brandTagline}>
          Airport & Airline Baggage Allowance Intelligence
        </Text>
        <Text style={styles.brandDescription}>
          The authoritative cross-checked database for TSA, FAA, IATA, CATSA, and international flight regulations.
        </Text>
      </View>

      {/* Main Feature Sections */}
      <View style={styles.menuGroup}>
        <Text style={styles.groupHeader}>EXPLORE REGULATIONS</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/airlines')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#EFF6FF' }]}>
            <Text style={{ fontSize: 20 }}>✈️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Airline Baggage Policies</Text>
            <Text style={styles.menuSubtitle}>
              Dimensions, weight limits & battery rules for 10+ airlines
            </Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/countries')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#F0FDF4' }]}>
            <Text style={{ fontSize: 20 }}>🌍</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Country Customs Rules</Text>
            <Text style={styles.menuSubtitle}>
              Customs biosecurity, medicine laws, duty-free limits
            </Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/tsa-rules')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#FEF3C7' }]}>
            <Text style={{ fontSize: 20 }}>🛡️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Official TSA Rules 2026</Text>
            <Text style={styles.menuSubtitle}>
              3-1-1 liquids rule, powders, lithium batteries, security tips
            </Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomWidth: 0 }]}
          onPress={() => router.push('/compare')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#F5F3FF' }]}>
            <Text style={{ fontSize: 20 }}>⚖️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Compare Two Items</Text>
            <Text style={styles.menuSubtitle}>
              Side-by-side carry-on vs checked comparison
            </Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Website & Community Links */}
      <View style={styles.menuGroup}>
        <Text style={styles.groupHeader}>ONLINE & LEGAL</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Linking.openURL('https://bringonplane.com')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#F8FAFC' }]}>
            <Text style={{ fontSize: 20 }}>🌐</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Visit bringonplane.com</Text>
            <Text style={styles.menuSubtitle}>Open the full web edition</Text>
          </View>
          <Text style={styles.menuArrow}>↗</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Linking.openURL('https://bringonplane.com/tsa-rules/')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#F8FAFC' }]}>
            <Text style={{ fontSize: 20 }}>📋</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>TSA Checkpoint Checklist</Text>
            <Text style={styles.menuSubtitle}>Airport security tips and tricks</Text>
          </View>
          <Text style={styles.menuArrow}>↗</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomWidth: 0 }]}
          onPress={() => Linking.openURL('https://bringonplane.com/disclaimer/')}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBg, { backgroundColor: '#F8FAFC' }]}>
            <Text style={{ fontSize: 20 }}>⚖️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Disclaimer & Terms</Text>
            <Text style={styles.menuSubtitle}>Regulatory data sources & policies</Text>
          </View>
          <Text style={styles.menuArrow}>↗</Text>
        </TouchableOpacity>
      </View>

      {/* Version Note */}
      <View style={styles.footerNote}>
        <Text style={styles.footerVersion}>BringOnPlane v1.0.0 (Expo SDK 58)</Text>
        <Text style={styles.footerText}>
          Data source verified against TSA.gov, FAA PackSafe, and airline carriage standards.
        </Text>
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
  brandCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  brandIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  brandDescription: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
  },
  menuGroup: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  groupHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  menuIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 16,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  footerVersion: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 15,
  },
});
