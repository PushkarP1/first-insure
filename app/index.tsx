import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Home, BrainCircuit, Zap } from 'lucide-react-native';
import { Colors, Spacing, FontSize, FontWeight, Radii, Shadow } from '../constants/theme';
import Button from '../components/Button';

const FEATURES = [
  {
    Icon: Home,
    title: 'Tailored to your home',
    body: 'Tell us about your rental and we match coverage to your actual situation.',
  },
  {
    Icon: BrainCircuit,
    title: 'AI-powered analysis',
    body: 'Our AI reviews your lifestyle, belongings, and preferences to find the right plan.',
  },
  {
    Icon: Zap,
    title: 'Results in 2 minutes',
    body: 'Five short steps. No jargon. Plain-English recommendation you can act on today.',
  },
];

export default function EntryScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo bar */}
        <View style={styles.logoBar}>
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>FI</Text>
          </View>
          <Text style={styles.brandName}>FIRST INSURE</Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>AI-ASSISTED COVERAGE</Text>
          <Text style={styles.heroTitle}>
            Let AI help you pick the right tenant coverage
          </Text>
          <Text style={styles.heroSub}>
            Answer a few prompts and our AI will suggest the right contents
            coverage, liability, and deductible for your first rental home.
          </Text>
        </View>

        {/* Feature cards */}
        <View style={styles.featureList}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureCard}>
              <View style={styles.featureIconWrap}>
                <f.Icon size={22} color={Colors.green800} strokeWidth={1.75} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureBody}>{f.body}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <Button
          label="Start My Coverage Check →"
          onPress={() => router.push('/wizard/step1')}
          style={styles.cta}
        />

        {/* Trust badge */}
        <View style={styles.trustBadge}>
          <Text style={styles.trustText}>
            ✓ Approx. 5 steps · No account needed · Results saveable later
          </Text>
        </View>

        <Text style={styles.finePrint}>
          No commitment. We help you understand options — you decide what's right for you.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.pageBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  logoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: Radii.sm,
    backgroundColor: Colors.green800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: Colors.white,
    fontWeight: FontWeight.extrabold,
    fontSize: FontSize.sm,
    letterSpacing: 1,
  },
  brandName: {
    fontWeight: FontWeight.extrabold,
    fontSize: FontSize.base,
    color: Colors.textDark,
    letterSpacing: 2,
  },
  hero: {
    gap: Spacing.sm,
  },
  heroEyebrow: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.green700,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: FontSize.xxl + 4,
    fontWeight: FontWeight.extrabold,
    color: Colors.textDark,
    lineHeight: 44,
  },
  heroSub: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginTop: Spacing.xs,
  },
  featureList: {
    gap: Spacing.sm,
  },
  featureCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.subtle,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radii.sm,
    backgroundColor: Colors.green50,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textDark,
  },
  featureBody: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  trustBadge: {
    backgroundColor: Colors.beige100,
    borderRadius: Radii.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.beige200,
    alignItems: 'center',
  },
  trustText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  cta: {
    marginTop: Spacing.xs,
  },
  finePrint: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
  },
});
