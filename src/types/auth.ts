// src/types/auth.ts
import { User } from '@supabase/supabase-js';

export interface UserSession {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
}

export interface AuthState {
  isLoading: boolean;
  session: UserSession | null;
  error: Error | null;
}