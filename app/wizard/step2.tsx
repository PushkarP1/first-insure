import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { useWizard, BelongingsValue } from '../../context/WizardContext';
import WizardHeader from '../../components/WizardHeader';
import OptionChip from '../../components/OptionChip';
import OptionButton from '../../components/OptionButton';
import SmartNote from '../../components/SmartNote';
import Button from '../../components/Button';

const ITEMS = ['Electronics', 'Furniture', 'Jewelry', 'Work Setup', 'Bike', 'Instruments'];
const VALUES: { value: BelongingsValue; label: string; desc: string }[] = [
  { value: '<$10,000', label: 'Under $10,000', desc: 'Minimal furnishings, basic electronics' },
  { value: '$10,000–$25,000', label: '$10,000 – $25,000', desc: 'Average household contents' },
  { value: '$25,000–$50,000', label: '$25,000 – $50,000', desc: 'Work setup, quality furniture' },
  { value: '$50,000+', label: '$50,000+', desc: 'High-value items, art, or instruments' },
];

export default function Step2() {
  const { state, update } = useWizard();

  const toggleItem = (item: string) => {
    const current = state.ownedItems;
    const next = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    update({ ownedItems: next });
  };

  const canContinue = state.ownedItems.length > 0 && state.belongingsValue !== null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WizardHeader
          step={2}
          total={5}
          eyebrow="AI Inputs"
          title="Belongings Estimate"
          subtitle="AI uses these signals to estimate your contents replacement cost."
          onBack={() => router.back()}
        />

        {/* Q1: What do you own */}
        <View style={styles.section}>
          <Text style={styles.question}>Which of these do you own? (select all that apply)</Text>
          <View style={styles.chipGrid}>
            {ITEMS.map((item) => (
              <OptionChip
                key={item}
                label={item}
                selected={state.ownedItems.includes(item)}
                onPress={() => toggleItem(item)}
                style={styles.halfChip}
              />
            ))}
          </View>
        </View>

        {/* Q2: Rough value */}
        <View style={styles.section}>
          <Text style={styles.question}>Rough replacement value of all your belongings?</Text>
          <View style={styles.optionList}>
            {VALUES.map((v) => (
              <OptionButton
                key={v.value}
                label={v.label}
                description={v.desc}
                selected={state.belongingsValue === v.value}
                onPress={() => update({ belongingsValue: v.value })}
              />
            ))}
          </View>
        </View>

        {/* Smart note */}
        <SmartNote
          title="Smart tip"
          body="If you work from home with a laptop, monitor, desk setup and headphones — choose the higher range rather than estimating low. Tech replacement costs add up fast."
        />

        <View style={styles.nav}>
          <Button
            label="Continue →"
            onPress={() => router.push('/wizard/step3')}
            disabled={!canContinue}
          />
        </View>
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
  section: {
    gap: Spacing.md,
  },
  question: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textDark,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  halfChip: {
    width: '47%',
  },
  optionList: {
    gap: Spacing.sm,
  },
  nav: {
    marginTop: Spacing.xs,
  },
});
