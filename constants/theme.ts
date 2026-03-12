export const Colors = {
  // Primary greens
  green900: '#1B4332',
  green800: '#2D6A4F',  // Primary CTA — deep forest green
  green700: '#40916C',
  green600: '#52B788',
  green500: '#74C69D',
  green300: '#B7E4C7',
  green100: '#D8F3DC',
  green50:  '#F0FAF4',

  // Beige / warm neutrals
  beige600: '#A47B50',  // warm brown — borders, icons
  beige400: '#C9A97E',  // warm tan — secondary accent
  beige200: '#E9D8C0',  // soft beige — background tints
  beige100: '#F5EDE0',  // lighter beige
  beige50:  '#FAF7F0',  // page background (cream)

  // Text
  textDark:      '#1B2D20',
  textBody:      '#374B3E',
  textSecondary: '#5C7162',
  textMuted:     '#94A8A0',
  textInverse:   '#FFFFFF',

  // Surface
  white:        '#FFFFFF',
  cardBg:       '#FFFFFF',
  pageBg:       '#FAF7F0',
  surfaceAlt:   '#F5EDE0',

  // Borders
  borderLight:  '#D8E8DC',
  borderMedium: '#B2CFC0',

  // Status
  success:      '#2D6A4F',
  successBg:    '#D8F3DC',
  warning:      '#C17D0E',
  warningBg:    '#FEF3C7',
  error:        '#B91C1C',
  errorBg:      '#FEE2E2',

  // Overlay
  overlay:      'rgba(27, 45, 32, 0.55)',
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

export const Radii = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  full: 999,
};

export const FontSize = {
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  xxl:  32,
  hero: 40,
};

export const FontWeight: Record<string, '400' | '500' | '600' | '700' | '800'> = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
};

export const Shadow = {
  card: {
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  subtle: {
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
};
