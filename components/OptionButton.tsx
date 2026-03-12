import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radii, FontSize, FontWeight, Spacing, Shadow } from '../constants/theme';

interface OptionButtonProps {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function OptionButton({
  label,
  description,
  selected,
  onPress,
  style,
}: OptionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={onPress}
      style={[styles.button, selected && styles.selected, style]}
    >
      <View style={styles.dot}>
        {selected && <View style={styles.dotInner} />}
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        {description ? (
          <Text style={[styles.desc, selected && styles.descSelected]}>{description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 4,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.white,
    ...Shadow.subtle,
  },
  selected: {
    borderColor: Colors.green700,
    backgroundColor: Colors.green50,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: Radii.full,
    borderWidth: 2,
    borderColor: Colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: Radii.full,
    backgroundColor: Colors.green800,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textBody,
  },
  labelSelected: {
    color: Colors.green900,
    fontWeight: FontWeight.bold,
  },
  desc: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  descSelected: {
    color: Colors.textSecondary,
  },
});
