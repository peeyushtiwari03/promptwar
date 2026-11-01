import type { BudgetCategory, BudgetItem, EventDetails } from '../types/event';

export function generateBudgetItems(details: EventDetails): BudgetItem[] {
  const totalBudget = details.totalBudget;
  const guestCount = Math.max(1, details.guestCount);
  const eventType = details.type;

  let items: { cat: BudgetCategory; name: string; pct: number; notes: string }[] = [];

  if (eventType === 'wedding') {
    items = [
      {
        cat: 'Venue & Rentals',
        name: 'Ceremony & Reception Venue Rental',
        pct: 0.22,
        notes: 'Includes facility fee, tables, chairs, and security deposit.',
      },
      {
        cat: 'Catering & Beverages',
        name: `Catering (${guestCount} guests @ ~$${Math.round((totalBudget * 0.28) / guestCount)}/head)`,
        pct: 0.28,
        notes: 'Buffet or plated dinner, cocktail hour appetizers, and service staff.',
      },
      {
        cat: 'Catering & Beverages',
        name: 'Bar & Beverage Package (Wine, Beer, Mocktails)',
        pct: 0.08,
        notes: 'Signature drinks, non-alcoholic station, bartender fees, and corkage.',
      },
      {
        cat: 'Photography & Video',
        name: 'Lead Photographer & Assistant (8 Hours Coverage)',
        pct: 0.10,
        notes: 'Full day coverage, engagement session, high-res digital gallery.',
      },
      {
        cat: 'Decor, Florals & Signage',
        name: 'Bridal Bouquets, Centerpieces & Arch Florals',
        pct: 0.08,
        notes: 'Seasonal florals, ceremony arch draping, and table runners.',
      },
      {
        cat: 'Music & Entertainment',
        name: 'DJ / MC & Sound Equipment',
        pct: 0.06,
        notes: 'Wireless mics for vows/toasts, dance lighting, and sound system.',
      },
      {
        cat: 'Attire & Beauty',
        name: 'Wedding Attire, Alterations & Hair/Makeup',
        pct: 0.06,
        notes: 'Bridal gown/suit, accessories, hair styling, and trial runs.',
      },
      {
        cat: 'Stationery & Favors',
        name: 'Save-the-Dates, Invitations & Guest Favors',
        pct: 0.03,
        notes: 'Eco-friendly printed or digital suites and customized keepsakes.',
      },
      {
        cat: 'Contingency Fund',
        name: 'Emergency & Weather Contingency Buffer',
        pct: 0.09,
        notes: 'Reserved for unexpected guest additions, last-minute vendor tips, or weather tenting.',
      },
    ];
  } else if (eventType === 'birthday') {
    items = [
      {
        cat: 'Venue & Rentals',
        name: 'Private Room, Backyard Marquee or Lounge Space',
        pct: 0.25,
        notes: 'Space rental, lounge furniture, and cleanup fee.',
      },
      {
        cat: 'Catering & Beverages',
        name: `Food Spread & Finger Foods (${guestCount} guests)`,
        pct: 0.32,
        notes: 'Custom catering or gourmet sliders, grazing table, and appetizers.',
      },
      {
        cat: 'Catering & Beverages',
        name: 'Custom Theme Birthday Cake & Dessert Station',
        pct: 0.07,
        notes: 'Multi-tiered or artisan themed cake, macarons, and dessert display.',
      },
      {
        cat: 'Decor, Florals & Signage',
        name: 'Bespoke Balloon Installation, Photo Backdrop & Neon Sign',
        pct: 0.12,
        notes: 'Organic balloon arch, customized birthday signage, and table decor.',
      },
      {
        cat: 'Music & Entertainment',
        name: 'DJ, Performer or Interactive Activity / Games',
        pct: 0.10,
        notes: 'Live acoustic set, DJ, trivia host, or magician/activity coordinator.',
      },
      {
        cat: 'Photography & Video',
        name: 'Event Photographer / Interactive Photobooth',
        pct: 0.06,
        notes: '3-hour photobooth with instant digital prints & prop box.',
      },
      {
        cat: 'Contingency Fund',
        name: 'Party Supplies & Emergency Buffer',
        pct: 0.08,
        notes: 'Ice, extra mixers, emergency tape/lighting, and guest surprises.',
      },
    ];
  } else {
    // Community Event
    items = [
      {
        cat: 'Permits, Insurance & Safety',
        name: 'City Parks/Street Permit & Event Liability Insurance',
        pct: 0.18,
        notes: 'Municipal permit fees, road closure notice, and 1M event coverage.',
      },
      {
        cat: 'Venue & Rentals',
        name: 'Stage, Pop-Up Tents, Folding Chairs & Bleachers',
        pct: 0.22,
        notes: 'Community stage canopy, volunteer check-in tent, and shade pavilions.',
      },
      {
        cat: 'Music & Entertainment',
        name: 'PA Sound System, Microphones & Local Performers',
        pct: 0.16,
        notes: 'Stage audio system, technician, generator rental, and performer honorariums.',
      },
      {
        cat: 'Logistics & Waste',
        name: 'Portable Restrooms, ADA Toilets & Recycling/Trash Stations',
        pct: 0.14,
        notes: 'Sanitation stations, waste diversion bins, hand sanitizer stands.',
      },
      {
        cat: 'Catering & Beverages',
        name: 'Hydration Stations, Snacks & Volunteer Refreshments',
        pct: 0.12,
        notes: 'Filtered water refill points, healthy snacks for 40+ volunteers.',
      },
      {
        cat: 'Decor, Florals & Signage',
        name: 'Community Banners, Directional Wayfinding & Schedule Boards',
        pct: 0.08,
        notes: 'Weatherproof high-visibility signs, map boards, and registration flags.',
      },
      {
        cat: 'Contingency Fund',
        name: 'Public Safety, First Aid Supplies & Weather Buffer',
        pct: 0.10,
        notes: 'First aid tent supplies, rain contingencies, and unforeseen municipal fees.',
      },
    ];
  }

  return items.map((item, index) => {
    const estimated = Math.round(totalBudget * item.pct);
    return {
      id: `budget-${index + 1}`,
      category: item.cat,
      name: item.name,
      estimatedCost: estimated,
      actualCost: 0,
      status: 'planned',
      notes: item.notes,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* TIMELINE & RUN-OF-SHOW GENERATION LOGIC                                    */
