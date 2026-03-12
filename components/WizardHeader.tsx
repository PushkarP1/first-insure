import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, FontSize, FontWeight, Radii } from '../constants/theme';
import ProgressBar from './ProgressBar';

interface WizardHeaderProps {
  step: number;
  total: number;
  eyebrow: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function WizardHeader({
  step,
  total,
  eyebrow,
  title,
  subtitle,
  onBack,
}: WizardHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Top row: back + progress */}
      <View style={styles.topRow}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={12}>
            <ArrowLeft size={18} color={Colors.textBody} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <View style={styles.progressWrap}>
          <ProgressBar step={step} total={total} />
        </View>
      </View>

      {/* Text */}
      <View style={styles.textWrap}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.sm,
    backgroundColor: Colors.beige200,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  backPlaceholder: {
    width: 36,
  },
  progressWrap: {
    flex: 1,
  },
  textWrap: {
    gap: 6,
  },
  eyebrow: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.green700,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textDark,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: 2,
  },
});
