export type Transaction = {
  id: string;
  name: string;
  date: Date;
  value: number;
  category: string;
  type: 'debit' | 'credit';
}