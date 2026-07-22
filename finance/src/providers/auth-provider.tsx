import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { login, register } from '@/services/auth-service'
import { setAuthToken } from '@/services/api';
import { parseAuthResponse, type User } from '@/validators/auth-validator';

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
const AUTH_STORAGE_KEY = '@finance:auth';

function getStorage() {
  if (typeof globalThis.localStorage === 'undefined') {
    return null;
  }

  return globalThis.localStorage;
}

function getJwtPayload(token: string): unknown {
  const payload = token.split('.')[1];

  if (!payload || typeof globalThis.atob !== 'function') {
    return null;
  }

  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

  try {
    return JSON.parse(globalThis.atob(paddedBase64));
  } catch {
    return null;
  }
}

function getJwtExpirationTime(token: string) {
  const payload = getJwtPayload(token);

  if (!payload || typeof payload !== 'object' || !('exp' in payload)) {
    return null;
  }

  const expirationInSeconds = payload.exp;

  if (typeof expirationInSeconds !== 'number') {
    return null;
  }

  return expirationInSeconds * 1000;
}

function isJwtTokenValid(token: string) {
  const expirationTime = getJwtExpirationTime(token);

  return expirationTime !== null && expirationTime > Date.now();
}

function persistAuthSession(user: User, token: string) {
  const storage = getStorage();

  if (!storage || !isJwtTokenValid(token)) {
    return;
  }

  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
}

function clearPersistedAuthSession() {
  getStorage()?.removeItem(AUTH_STORAGE_KEY);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      setIsLoading(false);
      return;
    }

    const storedAuth = storage.getItem(AUTH_STORAGE_KEY);

    if (!storedAuth) {
      setIsLoading(false);
      return;
    }

    try {
      const response = parseAuthResponse(JSON.parse(storedAuth));

      if (!isJwtTokenValid(response.token)) {
        clearPersistedAuthSession();
        return;
      }

      setToken(response.token);
      setUser(response.user);
      setAuthToken(response.token);
    } catch {
      clearPersistedAuthSession();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (data: SignInData) => {
  const response = await login(data.email, data.password);

  setToken(response.token);
  setUser(response.user)
  setAuthToken(response.token);
  persistAuthSession(response.user, response.token);
}, []);

  const signUp = useCallback(async(data: SignUpData) => {
    const response = await register(data.name, data.email, data.password)
  }, [])

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    clearPersistedAuthSession();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const expirationTime = getJwtExpirationTime(token);

    if (!expirationTime) {
      signOut();
      return;
    }

    const timeUntilExpiration = expirationTime - Date.now();

    if (timeUntilExpiration <= 0) {
      signOut();
      return;
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
