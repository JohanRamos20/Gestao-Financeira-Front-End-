import { getAuthToken } from '@/features/auth/auth-token';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function api(path: string, options?: RequestInit) {
  let response: Response;
  const authToken = getAuthToken();

  try {
    response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...options?.headers,
      },
    });
  } catch {
    throw new ApiError(
      'Nao foi possivel conectar a API. Verifique sua internet e tente novamente.',
    );
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(
      data?.message || `Erro na requisicao ${response.status} em ${path}`,
      response.status,
      data,
    );
  }

  return data;
}
