# First Insure — Setup Guide

AI-enabled tenant insurance app for young city renters. Built with Expo (React Native) + OpenAI.

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- iOS Simulator (macOS) or Android emulator — or [Expo Go](https://expo.dev/go) on your phone

## Quick Start

```bash
cd FirstInsureApp

# Install dependencies
npm install

# (Optional) Add your OpenAI API key for real AI recommendations
cp .env.example .env
# Edit .env and set EXPO_PUBLIC_OPENAI_API_KEY=sk-...

# Start the dev server
npx expo start
```

Then press:
- `i` — open iOS simulator
- `a` — open Android emulator
- Scan QR code with Expo Go on your phone

## Demo Mode

If no OpenAI API key is set, the app runs in **demo mode** — a smart mock engine generates realistic recommendations based on your answers. No API key needed to test the full flow.

## App Flow

| Screen | Description |
|--------|-------------|
| Entry  | Splash/welcome with feature overview |
| Step 1 | Home Basics — type, bedrooms, occupants, city |
| Step 2 | Belongings Estimate — items owned, rough value |
| Step 3 | Lifestyle Risks — WFH, pets, guests, claims, offsite valuables |
| Step 4 | Protection Preferences — priority, deductible, add-ons |
| Results | AI coverage recommendation with plan, explanation, risk score, add-ons |

## Color Design

| Token | Hex | Usage |
|-------|-----|-------|
| green800 | `#2D6A4F` | Primary buttons, headers |
| green700 | `#40916C` | Progress bar, section labels |
| beige50  | `#FAF7F0` | Page background |
| beige200 | `#E9D8C0` | Chips, secondary surfaces |
| beige400 | `#C9A97E` | Warm accents |

## Project Structure

```
app/
  index.tsx          — Entry/splash screen
  _layout.tsx        — Root navigation
  wizard/
    step1.tsx        — Home Basics
    step2.tsx        — Belongings Estimate
    step3.tsx        — Lifestyle Risks
    step4.tsx        — Protection Preferences
    results.tsx      — AI Recommendation Results
components/
  Button.tsx
  OptionChip.tsx
  OptionButton.tsx
  ProgressBar.tsx
  SmartNote.tsx
  WizardHeader.tsx
constants/
  theme.ts           — Colors, spacing, typography tokens
context/
  WizardContext.tsx  — Global wizard state
services/
  openai.ts          — OpenAI API + mock fallback
```
