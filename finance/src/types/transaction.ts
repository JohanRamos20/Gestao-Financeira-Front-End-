export enum Category {
  Leisure = 'Leisure',
  Groceries = 'Groceries',
  Expenses = 'Expenses',
  Shopping = 'Shopping',
  Food = 'Food',
  Salary = 'Salary',
}

export type TransactionType = 'debit' | 'credit'

export const CATEGORIES = Object.values(Category) as Category[];

export type Transaction = {
  id: string;
  name: string;
  date: Date;
  value: number;
  category: Category;
  type: TransactionType
}
