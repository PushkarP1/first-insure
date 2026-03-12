import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  Animated,
} from 'react-native';
import { Colors, Radii, FontSize, FontWeight, Spacing } from '../constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

const PRESS_BG: Record<string, string> = {
  primary:   Colors.green900,
  secondary: Colors.green50,
  ghost:     Colors.beige200,
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;

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
      disabled={isDisabled}
    >
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.base,
            variant === 'primary' && styles.primary,
            variant === 'secondary' && styles.secondary,
            variant === 'ghost' && styles.ghost,
            fullWidth && styles.fullWidth,
            isDisabled && styles.disabled,
            pressed && { backgroundColor: PRESS_BG[variant] },
            variant === 'secondary' && pressed && styles.secondaryPressed,
            { transform: [{ scale }] },
            style,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.green800} />
          ) : (
            <Text
              style={[
                styles.label,
                variant === 'primary' && styles.labelPrimary,
                variant === 'secondary' && styles.labelSecondary,
                variant === 'ghost' && styles.labelGhost,
              ]}
            >
              {label}
            </Text>
          )}
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.green800,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.green800,
  },
  secondaryPressed: {
    borderColor: Colors.green900,
  },
  ghost: {
    backgroundColor: Colors.beige100,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.2,
  },
  labelPrimary: {
    color: Colors.textInverse,
  },
  labelSecondary: {
    color: Colors.green800,
  },
  labelGhost: {
    color: Colors.textBody,
  },
});
