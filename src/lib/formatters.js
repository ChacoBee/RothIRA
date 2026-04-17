const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const currencyPreciseFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatCurrency(value, precise = false) {
  if (!Number.isFinite(value)) {
    return '--';
  }
  return (precise ? currencyPreciseFormatter : currencyFormatter).format(value);
}

export function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return '--';
  }
  return `${percentFormatter.format(value)}%`;
}

export function formatRatio(value) {
  if (!Number.isFinite(value)) {
    return '--';
  }
  return value.toFixed(2);
}

export function formatDateLabel(value) {
  if (!value) {
    return '--';
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return '--';
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

