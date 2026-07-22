import { api } from './api';
import { parseBalanceResponse } from '@/validators/wallet-validator';

export async function getBalance() {
    const data = await api('/users/me/wallet/balance',{
        method: 'GET',
    })

    return parseBalanceResponse(data);
}
