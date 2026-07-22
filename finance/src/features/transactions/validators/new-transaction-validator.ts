import { z } from 'zod';
import { Category } from '@/types/transaction';

export const newTransactionSchema = z.object({
  name: z.string().trim().min(3, 'O nome deve possuir pelo menos 3 caracteres.'),
  value: z.number().positive('O valor deve ser maior que zero.'),
  category: z.nativeEnum(Category),
  type: z.enum(['debit', 'credit']),
});

export type NewTransactionData = z.infer<typeof newTransactionSchema>;
