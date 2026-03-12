import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle, Animated } from 'react-native';
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
            styles.button,
            selected && styles.selected,
            pressed && (selected ? styles.selectedPressed : styles.unselectedPressed),
            { transform: [{ scale }] },
          ]}
        >
          <View style={[styles.dot, selected && styles.dotSelected]}>
            {selected && <View style={styles.dotInner} />}
          </View>
          <View style={styles.textWrap}>
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
            {description ? (
              <Text style={[styles.desc, selected && styles.descSelected]}>{description}</Text>
            ) : null}
          </View>
        </Animated.View>
      )}
    </Pressable>
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
  selectedPressed: {
    borderColor: Colors.green800,
    backgroundColor: Colors.green100,
  },
  unselectedPressed: {
    backgroundColor: Colors.beige50,
    borderColor: Colors.borderMedium,
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
  dotSelected: {
    borderColor: Colors.green700,
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
