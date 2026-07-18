import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { login, register } from '@/services/auth-service'
type User = {
  id: string;
  name: string;
  email: string;
};

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  name: string,
  email: string,
  password: string
}

type AuthResponse = {
  token: string,
}

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null)

  const signIn = useCallback(async (data: SignInData) => {
    const response = await login(data.email, data.password) as AuthResponse
    setToken(response.token)
  }, []);

  const signUp = useCallback(async(data: SignUpData) => {
    const response = await register(data.name, data.email, data.password)
  }, [])

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null)
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!token,
      signIn,
      signUp,
      signOut,
    }),
    [token, signIn, signUp, signOut],
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
