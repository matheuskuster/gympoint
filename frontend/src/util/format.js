export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatDuration(duration) {
  if (duration > 1) return `${duration} meses`;

  return '1 mês';
}
