import React, { createContext, useContext, useState } from 'react';

export type HomeType = 'Apartment' | 'Basement Suite' | 'Condo Rental' | 'Shared House' | null;
export type Occupants = 'Just me' | 'Partner / family' | 'Roommates' | null;
export type Bedrooms = '1' | '2' | '3+' | null;
export type BelongingsValue = '<$10,000' | '$10,000–$25,000' | '$25,000–$50,000' | '$50,000+' | null;
export type Priority = 'Lower monthly cost' | 'Balanced protection' | 'Stronger protection' | null;
export type Deductible = 'Low' | 'Medium' | 'High' | null;

export interface WizardState {
  // Step 1 - Home Basics
  homeType: HomeType;
  bedrooms: Bedrooms;
  occupants: Occupants;
  city: string;

  // Step 2 - Belongings
  ownedItems: string[];
  belongingsValue: BelongingsValue;

  // Step 3 - Lifestyle
  worksFromHome: boolean | null;
  hasPet: boolean | null;
  hostsGuests: 'Often' | 'Sometimes' | 'Rarely' | null;
  pastClaims: '0' | '1+' | null;
  valuablesOffsite: boolean | null;

  // Step 4 - Preferences
  priority: Priority;
  deductible: Deductible;
  showAddOns: boolean | null;
}

const defaultState: WizardState = {
  homeType: null,
  bedrooms: null,
  occupants: null,
  city: '',
  ownedItems: [],
  belongingsValue: null,
  worksFromHome: null,
  hasPet: null,
  hostsGuests: null,
  pastClaims: null,
  valuablesOffsite: null,
  priority: null,
  deductible: null,
  showAddOns: null,
};

interface WizardContextType {
  state: WizardState;
  update: (patch: Partial<WizardState>) => void;
  reset: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WizardState>(defaultState);

  const update = (patch: Partial<WizardState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const reset = () => setState(defaultState);

  return (
    <WizardContext.Provider value={{ state, update, reset }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
}
