import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
import { Colors, Radii, FontSize, FontWeight, Spacing } from '../constants/theme';

interface OptionChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function OptionChip({ label, selected, onPress, style }: OptionChipProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.chip,
            selected && styles.selected,
            pressed && (selected ? styles.selectedPressed : styles.unselectedPressed),
            { transform: [{ scale }] },
          ]}
        >
          <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.sm,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: Colors.green800,
    borderColor: Colors.green800,
  },
  selectedPressed: {
    backgroundColor: Colors.green900,
    borderColor: Colors.green900,
  },
  unselectedPressed: {
    backgroundColor: Colors.beige100,
    borderColor: Colors.borderMedium,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textBody,
  },
  labelSelected: {
    color: Colors.textInverse,
  },
});
