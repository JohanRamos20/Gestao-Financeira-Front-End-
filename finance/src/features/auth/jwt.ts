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

export function getJwtExpirationTime(token: string) {
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

export function isJwtTokenValid(token: string) {
  const expirationTime = getJwtExpirationTime(token);

  return expirationTime !== null && expirationTime > Date.now();
}
