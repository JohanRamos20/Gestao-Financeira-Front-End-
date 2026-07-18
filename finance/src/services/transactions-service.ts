import { Category } from "@/types/transaction";
import { api } from "./api";
import { TransactionType } from "@/components/modal/type-selector";

type Filter = {
    category : Category,
    transactionType : TransactionType
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

export function findTransaction(filter: Filter) {
  const params = new URLSearchParams({
    category: categoryToApi[filter.category],
    transactionType: transactionTypeToApi[filter.transactionType],
  });

  return api(`/users/me/transactions?${params.toString()}`, {
    method: 'GET',
  });
}
