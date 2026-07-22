type TransactionChangedListener = () => void;

const transactionChangedListeners = new Set<TransactionChangedListener>();

export function subscribeTransactionsChanged(listener: TransactionChangedListener) {
    transactionChangedListeners.add(listener);

    return () => {
        transactionChangedListeners.delete(listener);
    };
}

export function emitTransactionsChanged() {
    transactionChangedListeners.forEach((listener) => listener());
}
