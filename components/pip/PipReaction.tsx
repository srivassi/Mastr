import { useEffect, useState } from 'react';
import Pip from './Pip';
import type { PipMood } from '../../types';

const MOOD_DURATION: Partial<Record<PipMood, number>> = {
  correct:   1200,
  wrong:     900,
  celebrate: 2000,
  levelup:   1500,
};

interface PipReactionProps {
  level: number;
  trigger: PipMood;
  size?: number;
}

export default function PipReaction({ level, trigger, size }: PipReactionProps) {
  const [mood, setMood] = useState<PipMood>(trigger);

  useEffect(() => {
    setMood(trigger);
    const duration = MOOD_DURATION[trigger];
    if (duration) {
      const t = setTimeout(() => setMood('idle'), duration);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  return <Pip level={level} mood={mood} size={size} />;
}
