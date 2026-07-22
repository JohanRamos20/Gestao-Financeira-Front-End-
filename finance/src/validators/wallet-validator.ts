import { z } from 'zod';

const getBalanceResponseSchema = z
    .union([
        z.coerce.number(),
        z.object({
            balance: z.coerce.number(),
        }),
    ])
    .transform((data) => typeof data === 'number' ? data : data.balance);

export function parseBalanceResponse(data: unknown) {
    return getBalanceResponseSchema.parse(data);
}
