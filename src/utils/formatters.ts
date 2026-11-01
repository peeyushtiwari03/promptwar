import { CurrencyCode } from '../types/event';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  CAD: 'CA$',
  AUD: 'A$',
};

export function formatCurrency(amount: number, currency: CurrencyCode = 'USD'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  return `${symbol}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return 'Not set';
  try {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
      ? parseLocalCalendarDate(dateStr)
      : new Date(dateStr);
    if (!date) return dateStr;
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export interface CountdownResult {
  totalDays: number;
  months: number;
  days: number;
  isPast: boolean;
  statusText: string;
}

export function calculateCountdown(targetDateStr: string, now = new Date()): CountdownResult {
  if (!targetDateStr) {
    return { totalDays: 0, months: 0, days: 0, isPast: false, statusText: 'Date not set' };
  }

  const target = /^\d{4}-\d{2}-\d{2}$/.test(targetDateStr)
    ? parseLocalCalendarDate(targetDateStr)
    : new Date(targetDateStr);

  if (!target || isNaN(target.getTime())) {
    return { totalDays: 0, months: 0, days: 0, isPast: false, statusText: 'Invalid date' };
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (totalDays < 0) {
    return {
      totalDays: Math.abs(totalDays),
      months: 0,
      days: Math.abs(totalDays),
      isPast: true,
      statusText: `${Math.abs(totalDays)} days ago`,
    };
  }

  if (totalDays === 0) {
    return {
      totalDays: 0,
      months: 0,
      days: 0,
      isPast: false,
      statusText: 'Today is the big day!',
    };
  }

  const months = Math.floor(totalDays / 30);
  const remainingDays = totalDays % 30;

  let text = '';
  if (months > 0) {
    text = `${months} mo ${remainingDays} d left`;
  } else {
    text = `${totalDays} days left`;
  }

  return {
    totalDays,
    months,
    days: remainingDays,
    isPast: false,
    statusText: text,
  };
}

function parseLocalCalendarDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}
