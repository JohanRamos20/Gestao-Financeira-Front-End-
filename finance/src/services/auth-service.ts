import { api } from './api';

export function login(email: string, password: string) {
    return api('/sessions', {
        method: 'POST',
        body: JSON.stringify({email, password}),
    })
}

export function register(name : string, email : string, password : string){
    return api('/users', {
        method: 'POST',
        body: JSON.stringify({name, email, password})
    })
}