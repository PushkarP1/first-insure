import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, FontWeight, Radii, Shadow } from '../../constants/theme';
import { useWizard, HomeType, Bedrooms, Occupants } from '../../context/WizardContext';
import WizardHeader from '../../components/WizardHeader';
import OptionChip from '../../components/OptionChip';
import OptionButton from '../../components/OptionButton';
import Button from '../../components/Button';

const HOME_TYPES: HomeType[] = ['Apartment', 'Condo Rental', 'Basement Suite', 'Shared House'];
const BEDROOMS: Bedrooms[] = ['1', '2', '3+'];
const OCCUPANTS: { value: Occupants; label: string }[] = [
  { value: 'Just me', label: 'Just me' },
  { value: 'Partner / family', label: 'Partner or family' },
  { value: 'Roommates', label: 'Roommates' },
];

export default function Step1() {
  const { state, update } = useWizard();
  const [city, setCity] = useState(state.city);

  const canContinue =
    state.homeType !== null &&
    state.bedrooms !== null &&
    state.occupants !== null &&
    city.trim().length > 0;

  const handleContinue = () => {
    update({ city: city.trim() });
    router.push('/wizard/step2');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <WizardHeader
          step={1}
          total={5}
          eyebrow="AI Inputs"
          title="Home Basics"
          subtitle="AI uses this to estimate local risk and base tenant coverage needs."
          onBack={() => router.back()}
        />

        {/* Q1: Home type */}
        <View style={styles.section}>
          <Text style={styles.question}>What type of home do you rent?</Text>
          <View style={styles.chipGrid}>
            {HOME_TYPES.map((t) => (
              <OptionChip
                key={t}
                label={t!}
                selected={state.homeType === t}
                onPress={() => update({ homeType: t })}
                style={styles.halfChip}
              />
            ))}
          </View>
        </View>

        {/* Q2: Bedrooms */}
        <View style={styles.section}>
          <Text style={styles.question}>How many bedrooms?</Text>
          <View style={styles.bedroomRow}>
            {BEDROOMS.map((b) => (
              <OptionChip
                key={b}
                label={b!}
                selected={state.bedrooms === b}
                onPress={() => update({ bedrooms: b })}
                style={styles.bedroomChip}
              />
            ))}
          </View>
        </View>

        {/* Q3: Occupants */}
        <View style={styles.section}>
          <Text style={styles.question}>Who lives with you?</Text>
          <View style={styles.optionList}>
            {OCCUPANTS.map((o) => (
              <OptionButton
                key={o.value}
                label={o.label}
                selected={state.occupants === o.value}
                onPress={() => update({ occupants: o.value })}
              />
            ))}
          </View>
        </View>

        {/* Q4: City */}
        <View style={styles.section}>
          <Text style={styles.question}>What city or postal code?</Text>
          <TextInput
            style={[styles.input, city.length > 0 && styles.inputFilled]}
            placeholder="e.g. Vancouver, BC or V6B 1G8"
            placeholderTextColor={Colors.textMuted}
            value={city}
            onChangeText={setCity}
            returnKeyType="done"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.nav}>
          <Button
            label="Continue →"
            onPress={handleContinue}
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
  bedroomRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  bedroomChip: {
    flex: 1,
  },
  optionList: {
    gap: Spacing.sm,
  },
  input: {
    minHeight: 52,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.base,
    color: Colors.textDark,
    ...Shadow.subtle,
  },
  inputFilled: {
    borderColor: Colors.green600,
  },
  nav: {
    marginTop: Spacing.xs,
  },
});
