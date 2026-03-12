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
import { useWizard } from '../../context/WizardContext';
import WizardHeader from '../../components/WizardHeader';
import OptionChip from '../../components/OptionChip';
import SmartNote from '../../components/SmartNote';
import Button from '../../components/Button';

export default function Step3() {
  const { state, update } = useWizard();

  const canContinue =
    state.worksFromHome !== null &&
    state.hasPet !== null &&
    state.hostsGuests !== null &&
    state.pastClaims !== null &&
    state.valuablesOffsite !== null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WizardHeader
          step={3}
          total={5}
          eyebrow="AI Inputs"
          title="Lifestyle Risks"
          subtitle="AI uses these answers to shape liability and add-on recommendations."
          onBack={() => router.back()}
        />

        {/* Q1: Work from home */}
        <View style={styles.section}>
          <Text style={styles.question}>Do you work from home?</Text>
          <View style={styles.row}>
            <OptionChip
              label="Yes"
              selected={state.worksFromHome === true}
              onPress={() => update({ worksFromHome: true })}
              style={styles.half}
            />
            <OptionChip
              label="No"
              selected={state.worksFromHome === false}
              onPress={() => update({ worksFromHome: false })}
              style={styles.half}
            />
          </View>
        </View>

        {/* Q2: Pet */}
        <View style={styles.section}>
          <Text style={styles.question}>Do you have a pet?</Text>
          <View style={styles.row}>
            <OptionChip
              label="Yes"
              selected={state.hasPet === true}
              onPress={() => update({ hasPet: true })}
              style={styles.half}
            />
            <OptionChip
              label="No"
              selected={state.hasPet === false}
              onPress={() => update({ hasPet: false })}
              style={styles.half}
            />
          </View>
        </View>

        {/* Q3: Guests */}
        <View style={styles.section}>
          <Text style={styles.question}>Do you host guests often?</Text>
          <View style={styles.row}>
            {(['Often', 'Sometimes', 'Rarely'] as const).map((opt) => (
              <OptionChip
                key={opt}
                label={opt}
                selected={state.hostsGuests === opt}
                onPress={() => update({ hostsGuests: opt })}
                style={styles.third}
              />
            ))}
          </View>
        </View>

        {/* Q4: Past claims */}
        <View style={styles.section}>
          <Text style={styles.question}>Any past insurance claims?</Text>
          <View style={styles.row}>
            <OptionChip
              label="None"
              selected={state.pastClaims === '0'}
              onPress={() => update({ pastClaims: '0' })}
              style={styles.half}
            />
            <OptionChip
              label="1 or more"
              selected={state.pastClaims === '1+'}
              onPress={() => update({ pastClaims: '1+' })}
              style={styles.half}
            />
          </View>
        </View>

        {/* Q5: Offsite valuables */}
        <View style={styles.section}>
          <Text style={styles.question}>Do you keep valuables in storage or your car?</Text>
          <View style={styles.row}>
            <OptionChip
              label="Yes"
              selected={state.valuablesOffsite === true}
              onPress={() => update({ valuablesOffsite: true })}
              style={styles.half}
            />
            <OptionChip
              label="No"
              selected={state.valuablesOffsite === false}
              onPress={() => update({ valuablesOffsite: false })}
              style={styles.half}
            />
          </View>
        </View>

        <SmartNote
          variant="info"
          body="These answers may increase liability coverage and suggest extra protection for electronics or valuables stored off-premises."
        />

        <View style={styles.nav}>
          <Button
            label="Continue →"
            onPress={() => router.push('/wizard/step4')}
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
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  half: {
    flex: 1,
  },
  third: {
    flex: 1,
  },
  nav: {
    marginTop: Spacing.xs,
  },
});
