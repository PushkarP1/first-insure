import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Colors, FontSize, FontWeight, Spacing } from '../constants/theme';

interface AILoadingOverlayProps {
  visible: boolean;
}

export default function AILoadingOverlay({ visible }: AILoadingOverlayProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible && (opacity as any)._value === 0) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents={visible ? 'auto' : 'none'}>
      <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.card}>
        <LottieView
          source={require('../assets/ai-loading.lottie')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.title}>Analysing your profile…</Text>
        <Text style={styles.subtitle}>Finding the right coverage for you</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.xl,
    shadowColor: Colors.green900,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 16,
  },
  lottie: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
