export function formatDate(date: Date): string {
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  if (sameDay(date, hoje)) return 'hoje';
  if (sameDay(date, ontem)) return 'ontem';

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}