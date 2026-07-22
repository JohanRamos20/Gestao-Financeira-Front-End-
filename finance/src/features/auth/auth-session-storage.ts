import { parseAuthResponse, type User } from '@/validators/auth-validator';
import { isJwtTokenValid } from './jwt';

const AUTH_STORAGE_KEY = '@finance:auth';

export type AuthSession = {
  user: User;
  token: string;
};

function getStorage() {
  if (typeof globalThis.localStorage === 'undefined') {
    return null;
  }

  return globalThis.localStorage;
}

export function persistAuthSession(user: User, token: string) {
  const storage = getStorage();

  if (!storage || !isJwtTokenValid(token)) {
    return;
  }

  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
}

export function clearPersistedAuthSession() {
  getStorage()?.removeItem(AUTH_STORAGE_KEY);
}

export function readPersistedAuthSession(): AuthSession | null {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  const storedAuth = storage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return null;
  }

  try {
    const response = parseAuthResponse(JSON.parse(storedAuth));

    if (!isJwtTokenValid(response.token)) {
      clearPersistedAuthSession();
      return null;
    }

    return {
      user: response.user,
      token: response.token,
    };
  } catch {
    clearPersistedAuthSession();
    return null;
  }
}
