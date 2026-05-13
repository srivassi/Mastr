export const PIP_STAGES = {
  bear:     { min: 1,  max: 10, label: 'Baby Bear',   tint: '#8B6F47' },
  cubBull:  { min: 11, max: 25, label: 'Growing Cub', tint: '#A0895C' },
  halfBull: { min: 26, max: 40, label: 'Junior Bull', tint: '#C4952A' },
  bull:     { min: 41, max: 50, label: 'Golden Bull', tint: '#FFD700' },
} as const;

export type PipStage = keyof typeof PIP_STAGES;

export type PipMood =
  | 'idle'
  | 'correct'
  | 'wrong'
  | 'celebrate'
  | 'levelup'
  | 'sleeping'
  | 'thinking';

export function getPipStage(level: number): PipStage {
  if (level <= 10) return 'bear';
  if (level <= 25) return 'cubBull';
  if (level <= 40) return 'halfBull';
  return 'bull';
}
