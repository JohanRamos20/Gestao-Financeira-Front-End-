import { Transaction } from '../types/transaction';

export function mapTransactionsToTypeValue(type: Transaction['type'], transactions: Transaction[]){

    return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);
}
