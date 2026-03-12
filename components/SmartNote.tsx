import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize, FontWeight } from '../constants/theme';

interface SmartNoteProps {
  title?: string;
  body: string;
  variant?: 'info' | 'warning' | 'tip';
}

const variantStyle = {
  info: {
    bg: Colors.green50,
    border: Colors.green300,
    titleColor: Colors.green800,
    iconColor: Colors.green700,
    Icon: Info,
  },
  warning: {
    bg: Colors.warningBg,
    border: '#FCD34D',
    titleColor: Colors.warning,
    iconColor: Colors.warning,
    Icon: AlertTriangle,
  },
  tip: {
    bg: Colors.beige100,
    border: Colors.beige400,
    titleColor: Colors.beige600,
    iconColor: Colors.beige600,
    Icon: Lightbulb,
  },
};

export default function SmartNote({ title, body, variant = 'tip' }: SmartNoteProps) {
  const v = variantStyle[variant];
  const Icon = v.Icon;
  return (
    <View style={[styles.card, { backgroundColor: v.bg, borderColor: v.border }]}>
      <Icon size={18} color={v.iconColor} strokeWidth={2} style={styles.icon} />
      <View style={styles.content}>
        {title ? (
          <Text style={[styles.title, { color: v.titleColor }]}>{title}</Text>
        ) : null}
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  icon: {
    marginTop: 1,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  body: {
    fontSize: FontSize.sm,
    color: Colors.textBody,
    lineHeight: 20,
  },
});
