import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { AlertTriangle, Check, ArrowLeft, Download, FileText } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, FontWeight, Radii, Shadow } from '../../constants/theme';
import { useWizard } from '../../context/WizardContext';
import { getInsuranceRecommendation, InsuranceRecommendation } from '../../services/openai';
import SmartNote from '../../components/SmartNote';
import Button from '../../components/Button';

const RISK_COLORS = {
  low: { bar: Colors.green600, label: Colors.green800, bg: Colors.green50 },
  moderate: { bar: '#F59E0B', label: '#92400E', bg: '#FFFBEB' },
  high: { bar: Colors.error, label: Colors.error, bg: Colors.errorBg },
};

export default function ResultsScreen() {
  const { state, reset } = useWizard();
  const [result, setResult] = useState<InsuranceRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getInsuranceRecommendation(state)
      .then((rec) => { if (mounted) setResult(rec); })
      .catch((err: unknown) => {
        if (mounted) setError(err instanceof Error ? err.message : 'Something went wrong.');
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  const handleStartOver = () => {
    reset();
    router.replace('/');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={Colors.green800} />
            <Text style={styles.loadingTitle}>Analysing your profile…</Text>
            <Text style={styles.loadingBody}>
              Our AI is reviewing your home, belongings, and lifestyle to find your best coverage match.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !result) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCard}>
            <AlertTriangle size={40} color={Colors.warning} strokeWidth={1.5} />
            <Text style={styles.loadingTitle}>Something went wrong</Text>
            <Text style={styles.loadingBody}>{error}</Text>
            <Button label="Try again" onPress={() => router.replace('/wizard/results')} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const riskStyle = RISK_COLORS[result.riskColor];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>AI Results · Step 5 of 5</Text>
            <Text style={styles.title}>Your AI Coverage{'\n'}Recommendation</Text>
          </View>
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>FI</Text>
          </View>
        </View>

        {/* Recommended plan card */}
        <View style={styles.planCard}>
          <Text style={styles.planEyebrow}>AI RECOMMENDED PLAN</Text>
          <Text style={styles.planName}>{result.planName}</Text>
          <View style={styles.planDetails}>
            <View style={styles.planRow}>
              <Text style={styles.planDetailLabel}>Contents</Text>
              <Text style={styles.planDetailValue}>{result.contentsCoverage}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planRow}>
              <Text style={styles.planDetailLabel}>Liability</Text>
              <Text style={styles.planDetailValue}>{result.liabilityCoverage}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planRow}>
              <Text style={styles.planDetailLabel}>Deductible</Text>
              <Text style={styles.planDetailValue}>{result.deductible}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planRow}>
              <Text style={styles.planDetailLabel}>Est. monthly</Text>
              <Text style={[styles.planDetailValue, styles.planPrice]}>
                {result.monthlyEstimate}
              </Text>
            </View>
          </View>
        </View>

        {/* Why AI picked this */}
        <View style={styles.explanationCard}>
          <Text style={styles.sectionLabel}>WHY AI PICKED THIS</Text>
          <Text style={styles.explanationText}>{result.explanation}</Text>
        </View>

        {/* Underinsured warning */}
        {result.underinsuredWarning && (
          <SmartNote
            variant="warning"
            title="Underinsurance alert"
            body={result.underinsuredWarning}
          />
        )}

        {/* Risk score */}
        <View style={styles.riskCard}>
          <View style={styles.riskHeader}>
            <Text style={styles.sectionLabel}>UNDERINSURED RISK SCORE</Text>
            <Text style={[styles.riskBadge, { color: riskStyle.label, backgroundColor: riskStyle.bg }]}>
              {result.riskLabel}
            </Text>
          </View>
          <View style={styles.riskTrack}>
            <View style={[styles.riskFill, { width: `${result.riskScore}%`, backgroundColor: riskStyle.bar }]} />
          </View>
        </View>

        {/* Add-ons */}
        {state.showAddOns !== false && result.addOns.length > 0 && (
          <View style={styles.addOnsSection}>
            <Text style={styles.sectionLabel}>SUGGESTED ADD-ONS</Text>
            <View style={styles.addOnList}>
              {result.addOns.map((addon) => (
                <View key={addon} style={styles.addOnItem}>
                  <Check size={16} color={Colors.green700} strokeWidth={2.5} />
                  <Text style={styles.addOnText}>{addon}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CTA */}
        <Button
          label="Get My Quote →"
          onPress={() => {/* navigate to quote flow */}}
        />

        <Button
          label="Download Coverage Summary"
          variant="secondary"
          onPress={() => {/* export/share */}}
        />

        {/* Start over */}
        <TouchableOpacity onPress={handleStartOver} style={styles.startOver}>
          <ArrowLeft size={14} color={Colors.textSecondary} strokeWidth={2} />
          <Text style={styles.startOverText}>Start over with new details</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          This is an AI-generated recommendation for informational purposes only. Actual coverage,
          terms, and pricing are subject to insurer underwriting. Please consult a licensed broker
          before purchasing.
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
    gap: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadow.card,
  },
  loadingTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textDark,
    textAlign: 'center',
  },
  loadingBody: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eyebrow: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.green700,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textDark,
    lineHeight: 38,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: Radii.sm,
    backgroundColor: Colors.green800,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoLetter: {
    color: Colors.white,
    fontWeight: FontWeight.extrabold,
    fontSize: FontSize.sm,
    letterSpacing: 1,
  },
  planCard: {
    backgroundColor: Colors.green800,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  planEyebrow: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.green300,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  planName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
  },
  planDetails: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radii.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  planDetailLabel: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: FontWeight.medium,
  },
  planDetailValue: {
    fontSize: FontSize.base,
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  planPrice: {
    color: Colors.green300,
    fontWeight: FontWeight.bold,
  },
  explanationCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.subtle,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.green700,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  explanationText: {
    fontSize: FontSize.base,
    color: Colors.textBody,
    lineHeight: 22,
  },
  riskCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.subtle,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskBadge: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
    overflow: 'hidden',
  },
  riskTrack: {
    height: 10,
    borderRadius: Radii.full,
    backgroundColor: Colors.borderLight,
    overflow: 'hidden',
  },
  riskFill: {
    height: '100%',
    borderRadius: Radii.full,
  },
  addOnsSection: {
    gap: Spacing.sm,
  },
  addOnList: {
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
    ...Shadow.subtle,
  },
  addOnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  addOnText: {
    fontSize: FontSize.base,
    color: Colors.textBody,
    flex: 1,
  },
  startOver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  startOverText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  disclaimer: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: Spacing.sm,
  },
});
