import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { login, register } from '@/services/auth-service'
import { setAuthToken } from '@/features/auth/auth-token';
import type { User } from '@/validators/auth-validator';
import { getJwtExpirationTime } from '@/features/auth/jwt';
import {
  clearPersistedAuthSession,
  persistAuthSession,
  readPersistedAuthSession,
  type AuthSession,
} from '@/features/auth/auth-session-storage';

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  name: string,
  email: string,
  password: string
}

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => {
    const session = readPersistedAuthSession();
    setAuthToken(session?.token ?? null);

    return session;
  });

  const user = authSession?.user ?? null;
  const token = authSession?.token ?? null;
  const isLoading = false;

  const signIn = useCallback(async (data: SignInData) => {
    const response = await login(data.email, data.password);

    setAuthSession({
      user: response.user,
      token: response.token,
    });
    setAuthToken(response.token);
    persistAuthSession(response.user, response.token);
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    await register(data.name, data.email, data.password)
  }, [])

  const signOut = useCallback(() => {
    setAuthSession(null);
    setAuthToken(null);
    clearPersistedAuthSession();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const expirationTime = getJwtExpirationTime(token);

    if (!expirationTime) {
      const timeout = setTimeout(signOut, 0);

      return () => clearTimeout(timeout);
    }

    const timeUntilExpiration = expirationTime - Date.now();

    if (timeUntilExpiration <= 0) {
      const timeout = setTimeout(signOut, 0);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(signOut, timeUntilExpiration);

    return () => clearTimeout(timeout);
  }, [token, signOut]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!token,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, token, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}

export function useAuthenticatedUser() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    throw new Error('useAuthenticatedUser deve ser usado apenas em rotas autenticadas.');
  }

  return user;
}
