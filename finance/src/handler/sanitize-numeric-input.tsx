export function SanitizeNumericInput(text: string) {
  const cleaned = text.replace(/[^0-9,]/g, '');
  const [integerPart, ...decimalParts] = cleaned.split(',');

  if (decimalParts.length === 0) {
    return integerPart;
  }

  return `${integerPart},${decimalParts.join('').slice(0, 2)}`;
}