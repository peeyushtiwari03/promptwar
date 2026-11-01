import type { EventDetails, FullEventPlan } from '../types/event';
import { generateAccessibilityItems } from './accessibilityEngine';
import { generateBudgetItems } from './budgetEngine';
import { generatePersonalizedIdeas } from './ideasEngine';
import { generateTimelineTasks } from './timelineEngine';
import { generateVendorItems } from './vendorEngine';

export { generateAccessibilityItems } from './accessibilityEngine';
export { generateBudgetItems } from './budgetEngine';
export { generatePersonalizedIdeas } from './ideasEngine';
export { generateTimelineTasks } from './timelineEngine';
export { generateVendorItems } from './vendorEngine';

export function generateEventPlan(details: EventDetails): FullEventPlan {
  return {
    details,
    budget: generateBudgetItems(details),
    timeline: generateTimelineTasks(details),
    vendors: generateVendorItems(details),
    ideas: generatePersonalizedIdeas(details),
    accessibility: generateAccessibilityItems(),
  };
}