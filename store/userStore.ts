import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, MarketId, LanguageId, TrackId } from '../types';
import { getPipStage } from '../constants/pip';

const HEART_REFILL_MS = 4 * 60 * 60 * 1000; // 4 hours

// Local date in YYYY-MM-DD — uses device timezone, not UTC
function localDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  pendingTrack: TrackId;
  pendingMarket: MarketId;
  pendingLanguage: LanguageId;
  completedLessons: string[];
  pendingSkipLessons: string[];
  perfectLessonsCount: number;

  setUser: (user: User) => void;
  clearUser: () => void;
  setTrack: (track: TrackId) => void;
  setMarket: (market: MarketId) => void;
  setLanguage: (language: LanguageId) => void;
  addXP: (amount: number) => void;
  useHeart: () => void;
  refillHearts: () => void;
  checkAndRefillHearts: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  markLessonComplete: (lessonId: string) => void;
  setCompletedLessons: (ids: string[]) => void;
  incrementPerfectLessons: () => void;
  syncFromServer: (xp: number, level: number, streakDays: number) => void;
  loadProgress: (userId: string) => Promise<void>;
  setPendingSkipLessons: (ids: string[]) => void;
  clearPendingSkipLessons: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  pendingTrack: 'tradr',
  pendingMarket: 'india',
  pendingLanguage: 'python',
  completedLessons: [],
  pendingSkipLessons: [],
  perfectLessonsCount: 0,

  setUser: (user) => set({ user, isAuthenticated: true }),

  clearUser: () => set({
    user: null,
    isAuthenticated: false,
    completedLessons: [],
    perfectLessonsCount: 0,
  }),

  setTrack: (track) =>
    set((state) => ({
      pendingTrack: track,
      user: state.user ? { ...state.user, track } : null,
    })),

  setMarket: (market) =>
    set((state) => ({
      pendingMarket: market,
      user: state.user ? { ...state.user, market } : null,
    })),

  setLanguage: (language) =>
    set((state) => ({
      pendingLanguage: language,
      user: state.user ? { ...state.user, language } : null,
    })),

  addXP: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newXP    = state.user.xp + amount;
      const newLevel = Math.min(Math.floor(newXP / 100) + 1, 50);
      return {
        user: {
          ...state.user,
          xp:       newXP,
          level:    newLevel,
          pipStage: getPipStage(newLevel),
        },
      };
    }),

  useHeart: () =>
    set((state) => {
      if (!state.user) return state;
      const newHearts = Math.max(0, state.user.hearts - 1);
      return {
        user: {
          ...state.user,
          hearts: newHearts,
          // Set refill timer the moment hearts hit 0
          heartsRefillAt: newHearts === 0 && state.user.heartsRefillAt === null
            ? new Date(Date.now() + HEART_REFILL_MS).toISOString()
            : state.user.heartsRefillAt,
        },
      };
    }),

  refillHearts: () =>
    set((state) => ({
      user: state.user
        ? { ...state.user, hearts: 5, heartsRefillAt: null }
        : null,
    })),

  checkAndRefillHearts: () => {
    const { user, refillHearts } = get();
    if (!user?.heartsRefillAt) return;
    if (new Date(user.heartsRefillAt) <= new Date()) {
      refillHearts();
      if (user.id) {
        void supabase
          .from('users')
          .update({ hearts: 5, hearts_refill_at: null })
          .eq('id', user.id);
      }
    }
  },

  incrementStreak: () =>
    set((state) => {
      if (!state.user) return state;
      const today = localDateString();
      if (state.user.lastActive === today) return state;
      return {
        user: {
          ...state.user,
          streakDays: state.user.streakDays + 1,
          lastActive: today,
        },
      };
    }),

  resetStreak: () =>
    set((state) => ({
      user: state.user ? { ...state.user, streakDays: 0 } : null,
    })),

  markLessonComplete: (lessonId) =>
    set((state) => ({
      completedLessons: state.completedLessons.includes(lessonId)
        ? state.completedLessons
        : [...state.completedLessons, lessonId],
    })),

  setCompletedLessons: (ids) => set({ completedLessons: ids }),

  incrementPerfectLessons: () =>
    set((state) => ({ perfectLessonsCount: state.perfectLessonsCount + 1 })),

  syncFromServer: (xp, level, streakDays) =>
    set((state) => {
      if (!state.user) return state;
      const clamped = Math.min(level, 50);
      return {
        user: {
          ...state.user,
          xp,
          level:      clamped,
          pipStage:   getPipStage(clamped),
          streakDays,
        },
      };
    }),

  setPendingSkipLessons: (ids) => set({ pendingSkipLessons: ids }),
  clearPendingSkipLessons: () => set({ pendingSkipLessons: [] }),

  loadProgress: async (userId) => {
    try {
      const { data } = await supabase
        .from('lesson_progress')
        .select('lesson_id, perfect')
        .eq('user_id', userId)
        .eq('completed', true);
      if (data) {
        const rows = data as { lesson_id: string; perfect: boolean }[];
        set({
          completedLessons:    rows.map((r) => r.lesson_id),
          perfectLessonsCount: rows.filter((r) => r.perfect).length,
        });
      }
    } catch {
      // Non-fatal — path map stays at empty state, user can still learn
    }
  },
}));
