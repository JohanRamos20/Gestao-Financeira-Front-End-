import { Category, type TransactionType } from "@/types/transaction";
import { api } from "./api";
import { parseTransactionsResponse } from "@/validators/transaction-validator";

type Filter = {
    category? : Category,
    transactionType? : TransactionType
}

const categoryToApi = {
    [Category.Leisure]: 'LEISURE',
    [Category.Groceries]: 'GROCERIES',
    [Category.Expenses]: 'EXPENSES',
    [Category.Shopping]: 'SHOPPING',
    [Category.Food]: 'FOOD',
    [Category.Salary]: 'SALARY',
} satisfies Record<Category, string>

const transactionTypeToApi = {
    debit: 'DEBIT',
    credit: 'CREDIT',
} satisfies Record<TransactionType, string>

export function createTransaction(
    name: string,
    amount: number,
    category: Category,
    transactionType: TransactionType
){
    return api('/users/me/transactions', {
        method: 'POST',
        body: JSON.stringify({
            name,
            amount,
            category: categoryToApi[category],
            transactionType: transactionTypeToApi[transactionType],
        })
    })
}

export async function findTransaction(filter?: Filter) {
  const params = new URLSearchParams()
    if (filter?.category) {
    params.set('category', categoryToApi[filter.category]);
  }

  if (filter?.transactionType) {
    params.set('transactionType', transactionTypeToApi[filter.transactionType]);
  }

  const query = params.toString();
  const path = query
    ? `/users/me/transactions?${query}`
    : '/users/me/transactions';

  const data = await api(path, {
    method: 'GET',
  });

  return parseTransactionsResponse(data);
}
