import { api } from './api';
import { parseAuthResponse } from '@/validators/auth-validator';

export async function login(email: string, password: string) {
    const data = await api('/sessions', {
        method: 'POST',
        body: JSON.stringify({email, password}),
    })

    return parseAuthResponse(data);
}

export function register(name : string, email : string, password : string){
    return api('/users', {
        method: 'POST',
        body: JSON.stringify({name, email, password})
    })
}
