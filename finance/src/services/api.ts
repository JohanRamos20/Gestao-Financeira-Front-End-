let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export async function api(path: string, options?: RequestInit) {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options?.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || `Erro na requisicao ${response.status} em ${path}`);
  }

  return data;
}
