const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function api(path : string, options?: RequestInit) {

    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }, ...options,
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Erro na requisição')
    }

    return data;

}