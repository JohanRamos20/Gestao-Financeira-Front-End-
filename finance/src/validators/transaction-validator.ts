import { z } from 'zod';
import { Category, Transaction } from '@/types/transaction';

const apiCategoryToApp = {
    LEISURE: Category.Leisure,
    GROCERIES: Category.Groceries,
    EXPENSES: Category.Expenses,
    SHOPPING: Category.Shopping,
    FOOD: Category.Food,
    SALARY: Category.Salary,
} as const;

const apiTransactionTypeToApp = {
    DEBIT: 'debit',
    CREDIT: 'credit',
} as const;

const apiCategorySchema = z
    .enum(['LEISURE', 'GROCERIES', 'EXPENSES', 'SHOPPING', 'FOOD', 'SALARY'])
    .transform((category) => apiCategoryToApp[category]);

const apiTransactionTypeSchema = z
    .enum(['DEBIT', 'CREDIT'])
    .transform((transactionType) => apiTransactionTypeToApp[transactionType]);

const apiTransactionSchema = z
    .object({
        id: z.string().optional(),
        name: z.string(),
        amount: z.coerce.number(),
        category: apiCategorySchema,
        transactionType: apiTransactionTypeSchema,
        createdAt: z.coerce.date(),
    })
    .transform((transaction): Transaction => {
        return {
            id: transaction.id ?? `${transaction.name}-${transaction.amount}-${transaction.transactionType}-${transaction.category}-${transaction.createdAt.getTime()}`,
            name: transaction.name,
            value: transaction.amount,
            category: transaction.category,
            type: transaction.transactionType,
            date: transaction.createdAt,
        };
    });

const transactionsResponseSchema = z.union([
    z.array(apiTransactionSchema),
    z.object({
        transactions: z.array(apiTransactionSchema),
    }).transform((data) => data.transactions),
]);

export function parseTransactionsResponse(data: unknown) {
    return transactionsResponseSchema.parse(data);
}
