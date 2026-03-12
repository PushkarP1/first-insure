import OpenAI from 'openai';
import { WizardState } from '../context/WizardContext';

// Replace with your OpenAI API key or load from env
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? '';

export interface InsuranceRecommendation {
  planName: string;
  contentsCoverage: string;
  liabilityCoverage: string;
  deductible: string;
  monthlyEstimate: string;
  explanation: string;
  riskScore: number;           // 0–100
  riskLabel: string;
  riskColor: 'low' | 'moderate' | 'high';
  addOns: string[];
  underinsuredWarning: string | null;
}

function buildPrompt(state: WizardState): string {
  return `You are an expert Canadian tenant insurance advisor. Based on the following profile, recommend the most suitable tenant insurance plan.

PROFILE:
- Home type: ${state.homeType ?? 'Not specified'}
- Bedrooms: ${state.bedrooms ?? 'Not specified'}
- Occupants: ${state.occupants ?? 'Not specified'}
- City: ${state.city || 'Not specified'}
- Owned items: ${state.ownedItems.length > 0 ? state.ownedItems.join(', ') : 'None specified'}
- Estimated belongings value: ${state.belongingsValue ?? 'Not specified'}
- Works from home: ${state.worksFromHome === null ? 'Unknown' : state.worksFromHome ? 'Yes' : 'No'}
- Has pet: ${state.hasPet === null ? 'Unknown' : state.hasPet ? 'Yes' : 'No'}
- Hosts guests: ${state.hostsGuests ?? 'Not specified'}
- Past insurance claims: ${state.pastClaims ?? 'Not specified'}
- Valuables stored offsite (car/storage): ${state.valuablesOffsite === null ? 'Unknown' : state.valuablesOffsite ? 'Yes' : 'No'}
- Priority: ${state.priority ?? 'Not specified'}
- Preferred deductible level: ${state.deductible ?? 'Not specified'}
- Wants add-on suggestions: ${state.showAddOns === null ? 'Unknown' : state.showAddOns ? 'Yes' : 'No'}

Respond ONLY with a valid JSON object (no markdown, no extra text) in this exact format:
{
  "planName": "string (e.g. Standard Plus, Essential, Premium)",
  "contentsCoverage": "string (e.g. $35,000)",
  "liabilityCoverage": "string (e.g. $1,000,000)",
  "deductible": "string (e.g. $1,000)",
  "monthlyEstimate": "string (e.g. $28–$34/mo)",
  "explanation": "string (2-3 sentences explaining why this plan fits the user profile)",
  "riskScore": number (0–100, where 100 = highest underinsurance risk),
  "riskLabel": "string (e.g. Low risk, Moderate risk, Higher risk)",
  "riskColor": "low" | "moderate" | "high",
  "addOns": ["array", "of", "suggested", "add-on", "strings"],
  "underinsuredWarning": "string or null (a specific warning if user may be underinsured, else null)"
}`;
}

export async function getInsuranceRecommendation(
  state: WizardState,
): Promise<InsuranceRecommendation> {
  if (!OPENAI_API_KEY) {
    // Return mock data when no API key is set (demo mode)
    return getMockRecommendation(state);
  }

  const client = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: buildPrompt(state) }],
    temperature: 0.3,
    max_tokens: 600,
  });

  const raw = response.choices[0]?.message?.content ?? '';

  try {
    return JSON.parse(raw) as InsuranceRecommendation;
  } catch {
    throw new Error('Failed to parse AI recommendation. Please try again.');
  }
}

function getMockRecommendation(state: WizardState): InsuranceRecommendation {
  const isHighValue = state.belongingsValue === '$50,000+' || state.belongingsValue === '$25,000–$50,000';
  const wfh = state.worksFromHome;

  const planName = isHighValue ? 'Premium Plus' : wfh ? 'Standard Plus' : 'Essential Cover';
  const contents = isHighValue ? '$45,000' : wfh ? '$32,000' : '$18,000';
  const monthly = isHighValue ? '$42–$52/mo' : wfh ? '$28–$36/mo' : '$18–$24/mo';
  const riskScore = isHighValue ? 28 : 55;

  const addOns: string[] = [];
  if (wfh) addOns.push('Home office equipment rider');
  if (state.hasPet) addOns.push('Pet liability endorsement');
  if (state.valuablesOffsite) addOns.push('Off-premises property coverage');
  if (state.ownedItems.includes('Jewelry')) addOns.push('Jewelry & valuables rider');
  if (state.ownedItems.includes('Bike')) addOns.push('Bicycle coverage');
  if (state.city.toLowerCase().includes('vancouver') || state.city.toLowerCase().includes('bc'))
    addOns.push('Earthquake endorsement');

  return {
    planName,
    contentsCoverage: contents,
    liabilityCoverage: '$1,000,000',
    deductible: state.deductible === 'Low' ? '$500' : state.deductible === 'High' ? '$2,000' : '$1,000',
    monthlyEstimate: monthly,
    explanation: `Based on your ${state.homeType ?? 'rental'} in ${state.city || 'your city'}, your belongings value, and your lifestyle, we recommend the ${planName} plan. This gives you solid contents protection and $1M liability coverage${wfh ? ', with room to add home-office coverage for your work equipment' : ''}. It aligns with your preference for ${(state.priority ?? 'balanced protection').toLowerCase()}.`,
    riskScore,
    riskLabel: riskScore < 35 ? 'Low risk' : riskScore < 65 ? 'Moderate risk' : 'Higher risk',
    riskColor: riskScore < 35 ? 'low' : riskScore < 65 ? 'moderate' : 'high',
    addOns: addOns.length > 0 ? addOns : ['Water damage endorsement', 'Identity theft protection'],
    underinsuredWarning:
      riskScore >= 55
        ? 'Your estimated belongings value suggests you may be underinsured on a basic plan. Consider upgrading coverage before finalising.'
        : null,
  };
}
