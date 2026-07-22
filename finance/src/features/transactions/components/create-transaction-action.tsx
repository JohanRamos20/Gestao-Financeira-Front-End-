import { FloatingActionButton } from '@/components/floating-action-button';
import { NewTransactionModal } from '@/components/modal/new-transaction-modal';
import { emitTransactionsChanged } from '@/events/transaction-events';
import { createTransaction } from '@/services/transactions-service';
import type { NewTransactionData } from '@/features/transactions/validators/new-transaction-validator';
import { useState } from 'react';

export function CreateTransactionAction() {
  const [modalVisible, setModalVisible] = useState(false);

  async function handleCreateTransaction(transaction: NewTransactionData) {
    await createTransaction(
      transaction.name,
      transaction.value,
      transaction.category,
      transaction.type,
    );

    emitTransactionsChanged();
  }

  return (
    <>
      <FloatingActionButton onPress={() => setModalVisible(true)} />
      <NewTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateTransaction}
      />
    </>
  );
}
