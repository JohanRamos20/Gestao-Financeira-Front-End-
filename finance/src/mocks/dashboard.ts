import { Goal } from '@/types/goal';
import { Category, Transaction } from '@/types/transaction';
import { BarChartProps } from '@/components/dashboard/bar-chart';

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

export const mockTransactions: Transaction[] = [
  { id: '1', name: 'Supermarket', date: new Date('2026-07-01'), value: 120, category: Category.Groceries, type: 'debit' },
  { id: '2', name: 'Uber', date: new Date('2026-07-02'), value: 80, category: Category.Expenses, type: 'debit' },
  { id: '3', name: 'Salary', date: new Date('2026-07-05'), value: 5000, category: Category.Salary, type: 'credit' },
  { id: '4', name: 'Restaurant', date: new Date('2026-07-06'), value: 65, category: Category.Food, type: 'debit' },
  { id: '5', name: 'Cinema', date: new Date('2026-07-08'), value: 1500, category: Category.Leisure, type: 'debit' },
  { id: '6', name: 'Rent', date: new Date('2026-07-10'), value: 620, category: Category.Expenses, type: 'debit' },
  { id: '7', name: 'Taxi', date: new Date('2026-07-12'), value: 45, category: Category.Expenses, type: 'debit' },
  { id: '8', name: 'New Sneakers', date: new Date('2026-07-15'), value: 350, category: Category.Shopping, type: 'debit' },
  { id: '9', name: 'Freelance', date: new Date('2026-07-18'), value: 800, category: Category.Salary, type: 'credit' },
  { id: '10', name: 'Street Market', date: new Date('2026-07-20'), value: 200, category: Category.Groceries, type: 'debit' },
];

export const mockBarChartData: BarChartProps = [
  { value: 450, label: 'Alimentação' },
  { value: 280, label: 'Transporte' },
  { value: 620, label: 'Moradia' },
  { value: 150, label: 'Lazer' },
  { value: 90, label: 'Saúde' },
  { value: 200, label: 'Outros' },
];
