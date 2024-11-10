// src/types/auth.ts
export interface UserSession {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
}

export interface AuthState {
  isLoading: boolean;
  session: UserSession | null;
  error: Error | null;
}