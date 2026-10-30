import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { getItem, ALL_ITEMS } from '../../data/items';
import { getStatusConfig } from '../../lib/status';
import { usePackingList } from '../../hooks/use-packing-list';

export default function ItemDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { addItem, removeItem, hasItem } = usePackingList();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const item = getItem(slug as string);

  if (!item) {
    return (
      <View style={styles.notFoundCenter}>
        <Text style={{ fontSize: 48, marginBottom: 12 }}>❓</Text>
        <Text style={styles.notFoundTitle}>Item Not Found</Text>
        <Text style={styles.notFoundDesc}>
          The item "{slug}" could not be found in our database.
        </Text>
        <TouchableOpacity
          style={styles.backHomeBtn}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.backHomeBtnText}>Back to Search</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const inPackingList = hasItem(item.slug);
  const carryOnCfg = getStatusConfig(item.carryOn.status);
  const checkedCfg = getStatusConfig(item.checkedBag.status);

  function handleTogglePacking() {
    if (!item) return;
    if (inPackingList) {
      removeItem(item.slug);
    } else {
      addItem(item.name, item.slug, item.category, item.carryOn.status);
    }
  }

  async function handleShare() {
    if (!item) return;
    try {
      await Share.share({
        title: `Can I bring ${item.name} on a plane?`,
        message: `Can you bring ${item.name} on a plane? Carry-on: ${carryOnCfg.label}. Checked: ${checkedCfg.label}. Official TSA & airline rules: https://bringonplane.com/items/${item.slug}/`,
        url: `https://bringonplane.com/items/${item.slug}/`,
      });
    } catch (e) {}
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Breadcrumb row */}
      <View style={styles.breadcrumbRow}>
        <Text style={styles.crumbText}>Home</Text>
        <Text style={styles.crumbSep}>/</Text>
        <Text style={styles.crumbText}>{item.category}</Text>
        <Text style={styles.crumbSep}>/</Text>
        <Text style={[styles.crumbText, { color: Colors.primary, fontWeight: '700' }]}>
          {item.name}
        </Text>
      </View>

      {/* Main Title Section */}
      <View style={styles.titleCard}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryPillText}>{item.category.toUpperCase()}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.itemDescription}>{item.description}</Text>
        ) : null}
      </View>

      {/* Big Status Badges Comparison (Carry-on vs Checked) */}
      <View style={styles.statusGrid}>
        {/* Carry-On Card */}
        <View
          style={[
            styles.statusCard,
            { backgroundColor: carryOnCfg.bg, borderColor: carryOnCfg.border },
          ]}
        >
          <View style={styles.statusCardHeader}>
            <Text style={{ fontSize: 24 }}>🎒</Text>
            <View style={[styles.statusBadgePill, { backgroundColor: carryOnCfg.solid }]}>
              <Text style={styles.statusBadgePillText}>{carryOnCfg.label}</Text>
            </View>
          </View>
          <Text style={styles.statusBagType}>Carry-On Baggage</Text>
          <Text style={[styles.statusReason, { color: carryOnCfg.text }]}>
            {item.carryOn.reason || (item.carryOn.status === 'allowed' ? 'Permitted in cabin baggage.' : 'Restricted in cabin baggage.')}
          </Text>

          {item.carryOn.conditions && item.carryOn.conditions.length > 0 && (
            <View style={styles.conditionsBox}>
              {item.carryOn.conditions.map((cond, idx) => (
                <Text key={idx} style={styles.condItem}>
                  • {cond}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Checked Bag Card */}
        <View
          style={[
            styles.statusCard,
            { backgroundColor: checkedCfg.bg, borderColor: checkedCfg.border },
          ]}
        >
          <View style={styles.statusCardHeader}>
            <Text style={{ fontSize: 24 }}>🧳</Text>
            <View style={[styles.statusBadgePill, { backgroundColor: checkedCfg.solid }]}>
              <Text style={styles.statusBadgePillText}>{checkedCfg.label}</Text>
            </View>
          </View>
          <Text style={styles.statusBagType}>Checked Baggage</Text>
          <Text style={[styles.statusReason, { color: checkedCfg.text }]}>
            {item.checkedBag.reason || (item.checkedBag.status === 'allowed' ? 'Permitted in hold luggage.' : 'Restricted in checked luggage.')}
          </Text>

          {item.checkedBag.conditions && item.checkedBag.conditions.length > 0 && (
            <View style={styles.conditionsBox}>
              {item.checkedBag.conditions.map((cond, idx) => (
                <Text key={idx} style={styles.condItem}>
                  • {cond}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.packingBtn,
            inPackingList ? styles.packingBtnInList : styles.packingBtnAdd,
          ]}
          onPress={handleTogglePacking}
          activeOpacity={0.8}
        >
          <Text style={styles.packingBtnText}>
            {inPackingList ? '✓ In Packing List' : '+ Add to Packing List'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
          <Text style={styles.shareBtnText}>Share ↗</Text>
        </TouchableOpacity>
      </View>

      {/* Regulatory Official Verification */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionCardHeader}>
          <Text style={styles.sectionCardEmoji}>🛡️</Text>
          <Text style={styles.sectionCardTitle}>TSA & FAA Regulatory Status</Text>
        </View>
        <Text style={styles.regText}>
          Verified against official TSA regulations (Transportation Security Administration) and FAA PackSafe hazardous materials guidelines.
        </Text>
        {item.tsa && (
          <TouchableOpacity
            style={styles.officialLinkRow}
            onPress={() => item.tsa?.officialUrl && Linking.openURL(item.tsa.officialUrl)}
          >
            <Text style={styles.officialLinkText}>View Official TSA Source ↗</Text>
            <Text style={styles.officialDate}>Verified {item.tsa.lastVerified || item.lastReviewed}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Airline Specific Rules */}
      {item.airlines && item.airlines.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardEmoji}>✈️</Text>
            <Text style={styles.sectionCardTitle}>Airline Exceptions & Policies</Text>
          </View>
          {item.airlines.map((air, idx) => {
            const airCfg = getStatusConfig(air.status);
            return (
              <View key={idx} style={styles.airlineRow}>
                <View style={styles.airlineRowTop}>
                  <Text style={styles.airlineName}>{air.name}</Text>
                  <View
                    style={[
                      styles.airlinePill,
                      { backgroundColor: airCfg.bg, borderColor: airCfg.border },
                    ]}
                  >
                    <Text style={[styles.airlinePillText, { color: airCfg.text }]}>
                      {airCfg.label}
                    </Text>
                  </View>
                </View>
                {air.notes ? <Text style={styles.airlineNotes}>{air.notes}</Text> : null}
              </View>
            );
          })}
        </View>
      )}

      {/* International Country Rules */}
      {item.international && Object.keys(item.international).length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardEmoji}>🌍</Text>
            <Text style={styles.sectionCardTitle}>International Customs Considerations</Text>
          </View>
          {Object.entries(item.international).map(([country, rule], idx) => {
            const cCfg = getStatusConfig(rule.status);
            return (
              <View key={idx} style={styles.countryRow}>
                <View style={styles.countryRowTop}>
                  <Text style={styles.countryName}>{country}</Text>
                  <View
                    style={[
                      styles.airlinePill,
                      { backgroundColor: cCfg.bg, borderColor: cCfg.border },
                    ]}
                  >
                    <Text style={[styles.airlinePillText, { color: cCfg.text }]}>
                      {cCfg.label}
                    </Text>
                  </View>
                </View>
                {rule.reason ? (
                  <Text style={styles.countryReason}>{rule.reason}</Text>
                ) : null}
              </View>
            );
          })}
        </View>
      )}

      {/* Travel Tips */}
      {item.travelTips && item.travelTips.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardEmoji}>💡</Text>
            <Text style={styles.sectionCardTitle}>Expert Packing & Travel Tips</Text>
          </View>
          {item.travelTips.map((tip, idx) => (
            <View key={idx} style={styles.tipRow}>
              <Text style={styles.tipBullet}>✓</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      {/* FAQ Accordion */}
      {item.faq && item.faq.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardEmoji}>❓</Text>
            <Text style={styles.sectionCardTitle}>Frequently Asked Questions</Text>
          </View>
          {item.faq.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <View key={idx} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestionBtn}
                  onPress={() => setExpandedFaq(isOpen ? null : idx)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Text style={styles.faqArrow}>{isOpen ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {isOpen && (
                  <View style={styles.faqAnswerBox}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Related Items Section */}
      {item.relatedItems && item.relatedItems.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardEmoji}>🔗</Text>
            <Text style={styles.sectionCardTitle}>Related Flight Items</Text>
          </View>
          <View style={styles.relatedGrid}>
            {item.relatedItems.map((rSlug) => {
              const rel = ALL_ITEMS.find((i) => i.slug === rSlug);
              if (!rel) return null;
              const rCarry = getStatusConfig(rel.carryOn.status);
              return (
                <TouchableOpacity
                  key={rSlug}
                  style={styles.relatedCard}
                  onPress={() => router.push(`/item/${rSlug}`)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.relatedName}>{rel.name}</Text>
                  <View
                    style={[
                      styles.relatedBadge,
                      { backgroundColor: rCarry.bg, borderColor: rCarry.border },
                    ]}
                  >
                    <Text style={[styles.relatedBadgeText, { color: rCarry.text }]}>
                      Cabin {rCarry.icon}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* View on bringonplane.com Web */}
      <TouchableOpacity
        style={styles.webEditionBtn}
        onPress={() => Linking.openURL(`https://bringonplane.com/items/${item.slug}/`)}
        activeOpacity={0.8}
      >
        <Text style={styles.webEditionText}>🌐 View on bringonplane.com Web Edition ↗</Text>
      </TouchableOpacity>
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
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  crumbText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  crumbSep: {
    fontSize: 12,
    color: Colors.borderDark,
    marginHorizontal: 6,
  },
  titleCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  statusGrid: {
    gap: 12,
    marginBottom: 16,
  },
  statusCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
  },
  statusCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadgePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgePillText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  statusBagType: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  statusReason: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  conditionsBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
  },
  condItem: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  packingBtn: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packingBtnAdd: {
    backgroundColor: Colors.primary,
  },
  packingBtnInList: {
    backgroundColor: Colors.allowed.solid,
  },
  packingBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  shareBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionCardEmoji: {
    fontSize: 18,
  },
  sectionCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  regText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  officialLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 8,
  },
  officialLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  officialDate: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  airlineRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  airlineRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  airlineName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  airlinePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  airlinePillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  airlineNotes: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  countryRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  countryRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  countryReason: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  tipBullet: {
    color: Colors.primary,
    fontWeight: '900',
    fontSize: 13,
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 8,
  },
  faqQuestionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  faqQuestionText: {
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
  faqAnswerBox: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  faqAnswerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relatedCard: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  relatedName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  relatedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  relatedBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  webEditionBtn: {
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  webEditionText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  notFoundCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  notFoundDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  backHomeBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backHomeBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
});
