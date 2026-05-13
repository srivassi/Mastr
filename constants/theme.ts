export const colors = {
  primary:       '#58CC02',
  primaryDark:   '#58A700',
  danger:        '#FF4B4B',
  gold:          '#FFD900',
  navy:          '#1CB0F6',

  bear:          '#8B6F47',
  cubBull:       '#A0895C',
  halfBull:      '#C4952A',
  bull:          '#FFD700',

  bullGreen:     '#00C853',
  bearRed:       '#FF3D00',

  background:    '#FFFFFF',
  surface:       '#F7F7F7',
  border:        '#E5E5E5',
  textPrimary:   '#3C3C3C',
  textSecondary: '#AFAFAF',
  disabled:      '#E5E5E5',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  xs:   12,
  sm:   14,
  base: 16,
  lg:   18,
  xl:   22,
  xxl:  28,
  hero: 36,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;
