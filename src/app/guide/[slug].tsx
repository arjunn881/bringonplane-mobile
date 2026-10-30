import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { getGuide } from '../../data/guides';

export default function GuideDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  const guide = getGuide(slug as string);

  if (!guide) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 44, marginBottom: 12 }}>❓</Text>
        <Text style={styles.notFoundTitle}>Guide Not Found</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace('/guides')}
        >
          <Text style={styles.backBtnText}>Back to Guides</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Format simple markdown paragraphs into clean view
  const paragraphs = guide.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Category Pill */}
      <View style={styles.categoryPill}>
        <Text style={styles.categoryPillText}>{guide.category.toUpperCase()}</Text>
      </View>

      {/* Guide Title */}
      <Text style={styles.guideTitle}>{guide.title}</Text>

      {/* Metadata Row */}
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Updated {guide.lastUpdated}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.metaText}>BringOnPlane Editorial</Text>
      </View>

      {/* Description Highlight */}
      {guide.description ? (
        <View style={styles.descBox}>
          <Text style={styles.descText}>{guide.description}</Text>
        </View>
      ) : null}

      {/* Article Body */}
      <View style={styles.bodyCard}>
        {paragraphs.map((p, idx) => {
          if (p.startsWith('#')) {
            const headingText = p.replace(/^#+\s*/, '');
            return (
              <Text key={idx} style={styles.bodyHeading}>
                {headingText}
              </Text>
            );
          }
          if (p.startsWith('- ') || p.startsWith('* ')) {
            const items = p.split(/\n/).map((line) => line.replace(/^[-*]\s*/, ''));
            return (
              <View key={idx} style={styles.bulletList}>
                {items.map((item, bIdx) => (
                  <View key={bIdx} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            );
          }
          return (
            <Text key={idx} style={styles.bodyParagraph}>
              {p.replace(/\*\*(.*?)\*\*/g, '$1')}
            </Text>
          );
        })}
      </View>

      {/* Web button */}
      <TouchableOpacity
        style={styles.webBtn}
        onPress={() => Linking.openURL(`https://bringonplane.com/guide/${guide.slug}/`)}
        activeOpacity={0.8}
      >
        <Text style={styles.webBtnText}>🌐 Read Full Article on bringonplane.com ↗</Text>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backBtnText: {
    color: Colors.white,
    fontWeight: '700',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.6,
  },
  guideTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.4,
    lineHeight: 28,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  metaDot: {
    fontSize: 12,
    color: Colors.textMuted,
    marginHorizontal: 6,
  },
  descBox: {
    backgroundColor: Colors.skyLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.sky,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  descText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    fontWeight: '500',
  },
  bodyCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  bodyHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 14,
    marginBottom: 8,
  },
  bodyParagraph: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletList: {
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  bulletPoint: {
    color: Colors.primary,
    fontWeight: '900',
    fontSize: 14,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  webBtn: {
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  webBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
});
