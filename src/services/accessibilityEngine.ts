import type { AccessibilityCheckItem } from '../types/event';

export function generateAccessibilityItems(): AccessibilityCheckItem[] {
  return [
    {
      id: 'acc-1',
      category: 'physical',
      title: 'Step-Free Wheelchair Access & Ramps',
      description: 'Ensure smooth ramps exist for all ceremony, reception, stage, and restroom access points.',
      isChecked: true,
      priority: 'must-have',
    },
    {
      id: 'acc-2',
      category: 'physical',
      title: 'Reserved Accessible Parking & Drop-Off Zone',
      description: 'Clearly mark close-proximity parking spaces with direct paved pathways to the main entrance.',
      isChecked: true,
      priority: 'must-have',
    },
    {
      id: 'acc-3',
      category: 'dietary',
      title: 'Allergen, Vegan, Halal & Gluten-Free Food Labeling',
      description: 'Include clear printed ingredient cards at buffet stations indicating major allergens (nuts, dairy, gluten, soy).',
      isChecked: false,
      priority: 'must-have',
    },
    {
      id: 'acc-4',
      category: 'sensory',
      title: 'Quiet / Sensory Decompression Space',
      description: 'Designate a calm, low-lighting, low-volume area with comfortable seating for neurodivergent guests or crying infants.',
      isChecked: false,
      priority: 'recommended',
    },
    {
      id: 'acc-5',
      category: 'communication',
      title: 'High-Contrast Large-Print Signage & Audio Assist',
      description: 'Ensure directional signage uses bold, legible typography with high color contrast (WCAG AAA); test wireless microphones for hearing aids.',
      isChecked: false,
      priority: 'recommended',
    },
    {
      id: 'acc-6',
      category: 'safety',
      title: 'Hydration Station & First Aid Tent',
      description: 'Provide free, accessible cold drinking water throughout the venue and a clearly signposted emergency kit/ice pack station.',
      isChecked: true,
      priority: 'must-have',
    },
  ];
}
