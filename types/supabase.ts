export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          market: string;
          xp: number;
          level: number;
          pip_stage: string;
          streak_days: number;
          last_active: string | null;
          hearts: number;
          hearts_refill_at: string | null;
          league: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          username: string;
          market?: string;
          xp?: number;
          level?: number;
          pip_stage?: string;
          streak_days?: number;
          last_active?: string | null;
          hearts?: number;
          hearts_refill_at?: string | null;
          league?: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          username?: string;
          market?: string;
          xp?: number;
          level?: number;
          pip_stage?: string;
          streak_days?: number;
          last_active?: string | null;
          hearts?: number;
          hearts_refill_at?: string | null;
          league?: string;
        };
        Relationships: [];
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          market: string;
          completed: boolean;
          score: number | null;
          xp_earned: number | null;
          perfect: boolean;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          market: string;
          completed?: boolean;
          score?: number | null;
          xp_earned?: number | null;
          perfect?: boolean;
          completed_at?: string | null;
        };
        Update: {
          completed?: boolean;
          score?: number | null;
          xp_earned?: number | null;
          perfect?: boolean;
          completed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type UserRow = Database['public']['Tables']['users']['Row'];
export type LessonProgressRow = Database['public']['Tables']['lesson_progress']['Row'];
