import type { BudgetItem, BudgetCategory, PaymentStatus } from '../types/event';
import { sanitizeText } from '../utils/validation';

export const MAX_BUDGET_ITEM_COST = 100_000_000;

export interface BudgetItemDraft {
  category: BudgetCategory;
  name: string;
  estimatedCost: number;
  actualCost: number;
  status: PaymentStatus;
  notes: string;
}

export interface BudgetSummary {
  totalEstimated: number;
  totalActual: number;
  remaining: number;
  isOverBudget: boolean;
}

const PAYMENT_STATUSES: readonly PaymentStatus[] = ['planned', 'deposit_paid', 'paid_in_full'];
export const BUDGET_CATEGORIES: readonly BudgetCategory[] = [
  'Venue & Rentals',
  'Catering & Beverages',
  'Photography & Video',
  'Decor, Florals & Signage',
  'Music & Entertainment',
  'Attire & Beauty',
  'Permits, Insurance & Safety',
  'Stationery & Favors',
  'Logistics & Waste',
  'Contingency Fund',
];

export function createEmptyBudgetDraft(): BudgetItemDraft {
  return {
    category: 'Venue & Rentals',
    name: '',
    estimatedCost: 0,
    actualCost: 0,
    status: 'planned',
    notes: '',
  };
}

function normalizeCost(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), MAX_BUDGET_ITEM_COST);
}

function normalizeBudgetItemDraft(draft: BudgetItemDraft): Omit<BudgetItem, 'id'> | null {
  if (!BUDGET_CATEGORIES.includes(draft.category) || !PAYMENT_STATUSES.includes(draft.status)) {
    return null;
  }

  const name = sanitizeText(draft.name).trim().slice(0, 100);
  if (!name) return null;

  return {
    category: draft.category,
    name,
    estimatedCost: normalizeCost(draft.estimatedCost),
    actualCost: normalizeCost(draft.actualCost),
    status: draft.status,
    notes: sanitizeText(draft.notes).slice(0, 500),
  };
}

function createBudgetItemId(): string {
  const randomId = globalThis.crypto?.randomUUID?.();
  return `budget-${randomId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`}`;
}

export function createBudgetItem(draft: BudgetItemDraft): BudgetItem | null {
  const normalized = normalizeBudgetItemDraft(draft);
  return normalized ? { id: createBudgetItemId(), ...normalized } : null;
}

export function updateBudgetItem(
  budget: BudgetItem[],
  id: string,
  draft: BudgetItemDraft,
): BudgetItem[] {
  const normalized = normalizeBudgetItemDraft(draft);
  if (!normalized) return budget;

  return budget.map((item) => (item.id === id ? { ...item, ...normalized } : item));
}

export function removeBudgetItem(budget: BudgetItem[], id: string): BudgetItem[] {
  return budget.filter((item) => item.id !== id);
}

export function cyclePaymentStatus(budget: BudgetItem[], id: string): BudgetItem[] {
  const nextStatus: Record<PaymentStatus, PaymentStatus> = {
    planned: 'deposit_paid',
    deposit_paid: 'paid_in_full',
    paid_in_full: 'planned',
  };

  return budget.map((item) => (
    item.id === id ? { ...item, status: nextStatus[item.status] } : item
  ));
}

export function filterBudgetItems(
  budget: BudgetItem[],
  category: BudgetCategory | 'all',
): BudgetItem[] {
  return category === 'all' ? budget : budget.filter((item) => item.category === category);
}

export function calculateBudgetSummary(
  budget: BudgetItem[],
  totalBudget: number,
): BudgetSummary {
  const { totalEstimated, totalActual } = budget.reduce(
    (totals, item) => ({
      totalEstimated: totals.totalEstimated + finiteAmount(item.estimatedCost),
      totalActual: totals.totalActual + finiteAmount(item.actualCost),
    }),
    { totalEstimated: 0, totalActual: 0 },
  );
  const normalizedBudget = finiteAmount(totalBudget);

  return {
    totalEstimated,
    totalActual,
    remaining: normalizedBudget - totalActual,
    isOverBudget: totalActual > normalizedBudget,
  };
}

function finiteAmount(value: number): number {
  return Number.isFinite(value) ? value : 0;
}
