import { Stack } from 'expo-router';
import { WizardProvider } from '../context/WizardContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <WizardProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="wizard/step1" />
        <Stack.Screen name="wizard/step2" />
        <Stack.Screen name="wizard/step3" />
        <Stack.Screen name="wizard/step4" />
        <Stack.Screen name="wizard/results" />
      </Stack>
    </WizardProvider>
  );
}
