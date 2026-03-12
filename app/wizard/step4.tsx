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
import { useWizard, Priority, Deductible } from '../../context/WizardContext';
import WizardHeader from '../../components/WizardHeader';
import OptionButton from '../../components/OptionButton';
import OptionChip from '../../components/OptionChip';
import SmartNote from '../../components/SmartNote';
import Button from '../../components/Button';

const PRIORITIES: { value: Priority; label: string; desc: string }[] = [
  {
    value: 'Lower monthly cost',
    label: 'Lower monthly cost',
    desc: 'Minimise premium — ideal if budget is tight',
  },
  {
    value: 'Balanced protection',
    label: 'Balanced protection',
    desc: 'Good coverage without overpaying — most popular',
  },
  {
    value: 'Stronger protection',
    label: 'Stronger protection',
    desc: 'Maximum peace of mind for high-value belongings',
  },
];

const DEDUCTIBLES: { value: Deductible; label: string; desc: string }[] = [
  { value: 'Low', label: 'Low ($500)', desc: 'Higher premium, less out-of-pocket on claims' },
  { value: 'Medium', label: 'Medium ($1,000)', desc: 'Best balance — recommended for most renters' },
  { value: 'High', label: 'High ($2,000+)', desc: 'Lower premium, you absorb more on claims' },
];

export default function Step4() {
  const { state, update } = useWizard();

  const canContinue =
    state.priority !== null &&
    state.deductible !== null &&
    state.showAddOns !== null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WizardHeader
          step={4}
          total={5}
          eyebrow="AI Inputs"
          title="Protection Preferences"
          subtitle="Tell the AI whether to optimise for cost, balance, or stronger protection."
          onBack={() => router.back()}
        />

        {/* Q1: Priority */}
        <View style={styles.section}>
          <Text style={styles.question}>What matters most to you?</Text>
          <View style={styles.optionList}>
            {PRIORITIES.map((p) => (
              <OptionButton
                key={p.value!}
                label={p.label}
                description={p.desc}
                selected={state.priority === p.value}
                onPress={() => update({ priority: p.value })}
              />
            ))}
          </View>
        </View>

        {/* Q2: Deductible */}
        <View style={styles.section}>
          <Text style={styles.question}>Preferred deductible level?</Text>
          <View style={styles.optionList}>
            {DEDUCTIBLES.map((d) => (
              <OptionButton
                key={d.value!}
                label={d.label}
                description={d.desc}
                selected={state.deductible === d.value}
                onPress={() => update({ deductible: d.value })}
              />
            ))}
          </View>
        </View>

        {/* Q3: Show add-ons */}
        <View style={styles.section}>
          <Text style={styles.question}>Would you like to see optional add-ons?</Text>
          <View style={styles.row}>
            <OptionChip
              label="Yes, show add-ons"
              selected={state.showAddOns === true}
              onPress={() => update({ showAddOns: true })}
              style={styles.half}
            />
            <OptionChip
              label="No thanks"
              selected={state.showAddOns === false}
              onPress={() => update({ showAddOns: false })}
              style={styles.half}
            />
          </View>
        </View>

        <SmartNote
          variant="info"
          title="What happens next"
          body="The AI will calculate your recommended contents coverage, liability amount, deductible, and any add-ons based on your full profile."
        />

        <View style={styles.nav}>
          <Button
            label="See My Results →"
            onPress={() => router.push('/wizard/results')}
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
  optionList: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  half: {
    flex: 1,
  },
  nav: {
    marginTop: Spacing.xs,
  },
});
