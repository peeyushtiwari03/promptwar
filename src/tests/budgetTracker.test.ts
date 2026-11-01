import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { BudgetItem } from '../types/event';
import { BudgetTracker } from '../components/BudgetTracker';
import {
  calculateBudgetSummary,
  createBudgetItem,
  createEmptyBudgetDraft,
  cyclePaymentStatus,
  filterBudgetItems,
  MAX_BUDGET_ITEM_COST,
  removeBudgetItem,
  updateBudgetItem,
} from '../services/budgetTrackerEngine';

const sampleBudget: BudgetItem[] = [
  {
    id: 'venue-1',
    category: 'Venue & Rentals',
    name: 'Garden venue',
    estimatedCost: 2400,
    actualCost: 1200,
    status: 'deposit_paid',
    vendorName: 'Garden Hall',
  },
  {
    id: 'food-1',
    category: 'Catering & Beverages',
    name: 'Dinner service',
    estimatedCost: 1600,
    actualCost: 1800,
    status: 'planned',
  },
];

describe('budget tracker domain logic', () => {
  it('creates sanitized expenses with bounded finite costs and distinct IDs', () => {
    const draft = {
      ...createEmptyBudgetDraft(),
      name: '  <b>Venue</b>  ',
      estimatedCost: MAX_BUDGET_ITEM_COST + 50,
      actualCost: Number.POSITIVE_INFINITY,
      notes: '<script>unsafe()</script> contract',
    };

    const expense = createBudgetItem(draft);

    expect(expense).toMatchObject({
      category: 'Venue & Rentals',
      name: 'Venue',
      estimatedCost: MAX_BUDGET_ITEM_COST,
      actualCost: 0,
      status: 'planned',
      notes: 'unsafe() contract',
    });
    expect(expense?.id).toMatch(/^budget-/);
    expect(createBudgetItem({ ...draft, name: 'Second venue' })?.id).not.toBe(expense?.id);
  });

  it('rejects empty names and invalid category or payment status values', () => {
    const draft = createEmptyBudgetDraft();
    expect(createBudgetItem({ ...draft, name: '   ' })).toBeNull();
    expect(createBudgetItem({ ...draft, name: 'Valid', category: 'Unknown' as BudgetItem['category'] })).toBeNull();
    expect(createBudgetItem({ ...draft, name: 'Valid', status: 'unknown' as BudgetItem['status'] })).toBeNull();
  });

  it('updates only the requested item while preserving its stable and optional fields', () => {
    const draft = {
      ...createEmptyBudgetDraft(),
      category: 'Catering & Beverages' as const,
      name: 'Dinner',
      estimatedCost: 2100,
      actualCost: 0,
      notes: 'Updated estimate',
    };

    const updated = updateBudgetItem(sampleBudget, 'venue-1', draft);

    expect(updated[0]).toMatchObject({
      id: 'venue-1',
      vendorName: 'Garden Hall',
      category: 'Catering & Beverages',
      name: 'Dinner',
      estimatedCost: 2100,
    });
    expect(updated[1]).toBe(sampleBudget[1]);
    expect(updateBudgetItem(sampleBudget, 'venue-1', { ...draft, name: '   ' })).toBe(sampleBudget);
  });

  it('removes an item and cycles payment status without changing other items', () => {
    const firstCycle = cyclePaymentStatus(sampleBudget, 'venue-1');
    const secondCycle = cyclePaymentStatus(firstCycle, 'venue-1');
    const thirdCycle = cyclePaymentStatus(secondCycle, 'venue-1');

    expect(firstCycle[0].status).toBe('paid_in_full');
    expect(secondCycle[0].status).toBe('planned');
    expect(thirdCycle[0].status).toBe('deposit_paid');
    expect(thirdCycle[1]).toBe(sampleBudget[1]);
    expect(removeBudgetItem(sampleBudget, 'venue-1')).toEqual([sampleBudget[1]]);
  });

  it('filters by category and computes accurate budget totals', () => {
    expect(filterBudgetItems(sampleBudget, 'all')).toBe(sampleBudget);
    expect(filterBudgetItems(sampleBudget, 'Venue & Rentals')).toEqual([sampleBudget[0]]);
    expect(calculateBudgetSummary(sampleBudget, 3000)).toEqual({
      totalEstimated: 4000,
      totalActual: 3000,
      remaining: 0,
      isOverBudget: false,
    });
    expect(calculateBudgetSummary(sampleBudget, 2999).isOverBudget).toBe(true);
  });

  it('renders named table structure and accessible expense actions', () => {
    const html = renderToStaticMarkup(createElement(BudgetTracker, {
      budget: sampleBudget,
      totalBudget: 5000,
      currency: 'USD',
      eventTitle: 'Autumn wedding',
      onUpdateBudget: () => undefined,
    }));

    expect(html).toContain('<caption class="sr-only">Expenses for Autumn wedding</caption>');
    expect(html).toContain('scope="col"');
    expect(html).toContain('aria-label="Payment status for Garden venue: deposit paid. Activate to cycle status."');
    expect(html).toContain('aria-label="Edit expense: Garden venue"');
    expect(html).toContain('aria-label="Delete expense: Garden venue"');
  });
});
