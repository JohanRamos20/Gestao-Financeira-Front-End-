import { Goal } from '@/types/goal';
import { Transaction } from '@/types/transaction';

export const goalMock: Goal[] = [
  { id: '1', name: 'Viagem', savedAmount: 800, targetAmount: 2000 },
  { id: '2', name: 'Notebook novo', savedAmount: 1500, targetAmount: 4000 },
  { id: '3', name: 'Reserva de emergencia', savedAmount: 3000, targetAmount: 10000 },
  { id: '4', name: 'Notebook novo', savedAmount: 1500, targetAmount: 4000 },
  { id: '5', name: 'Reserva de emergencia', savedAmount: 3000, targetAmount: 10000 },
  { id: '6', name: 'Reserva de emergencia', savedAmount: 3000, targetAmount: 10000 },
  { id: '7', name: 'Notebook novo', savedAmount: 1500, targetAmount: 4000 },
  { id: '8', name: 'Reserva de emergencia', savedAmount: 3000, targetAmount: 10000 },
];

export const transacoesMock: Transaction[] = [
  { id: '1', name: 'Supermercado', date: new Date('2026-07-02'), category: 'Alimentacao', value: 320, type: 'debit' },
  { id: '2', name: 'Salario', date: new Date('2026-07-01'), category: 'Receita', value: 5200, type: 'credit' },
  { id: '3', name: 'Internet', date: new Date('2026-06-23'), category: 'Servicos', value: 120, type: 'debit' },
  { id: '4', name: 'Salario', date: new Date('2026-07-01'), category: 'Receita', value: 5200, type: 'credit' },
];
