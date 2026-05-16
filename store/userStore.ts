import { create } from 'zustand';
import type { User, MarketId } from '../types';
import { getPipStage } from '../constants/pip';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  pendingMarket: MarketId;

  setUser: (user: User) => void;
  clearUser: () => void;
  setMarket: (market: MarketId) => void;
  addXP: (amount: number) => void;
  useHeart: () => void;
  refillHearts: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  pendingMarket: 'india',

  setUser: (user) => set({ user, isAuthenticated: true }),

  clearUser: () => set({ user: null, isAuthenticated: false }),

  setMarket: (market) =>
    set((state) => ({
      pendingMarket: market,
      user: state.user ? { ...state.user, market } : null,
    })),

  addXP: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newXP = state.user.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        user: {
          ...state.user,
          xp: newXP,
          level: Math.min(newLevel, 50),
          pipStage: getPipStage(Math.min(newLevel, 50)),
        },
      };
    }),

  useHeart: () =>
    set((state) => ({
      user: state.user
        ? { ...state.user, hearts: Math.max(0, state.user.hearts - 1) }
        : null,
    })),

  refillHearts: () =>
    set((state) => ({
      user: state.user
        ? { ...state.user, hearts: 5, heartsRefillAt: null }
        : null,
    })),

  incrementStreak: () =>
    set((state) => ({
      user: state.user
        ? { ...state.user, streakDays: state.user.streakDays + 1 }
        : null,
    })),

  resetStreak: () =>
    set((state) => ({
      user: state.user ? { ...state.user, streakDays: 0 } : null,
    })),
}));
