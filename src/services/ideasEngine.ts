import type { EventDetails, PersonalizedIdea } from '../types/event';

export function generatePersonalizedIdeas(details: EventDetails): PersonalizedIdea[] {
  const type = details.type;
  const vibeLabel = details.vibe.replace(/-/g, ' ');

  if (type === 'wedding') {
    return [
      {
        id: 'idea-1',
        category: 'theme',
        title: 'Enchanted Botanical & Modern Gold',
        description: 'Earthy warmth meets elevated contemporary romance. Rich forest greenery paired with soft warm candlelight and brushed brass metallics.',
        tags: ['Elegant', 'Romantic', 'Timeless', vibeLabel],
        colorPalette: [
          { name: 'Emerald Forest', hex: '#1b4332' },
          { name: 'Sage Mist', hex: '#95d5b2' },
          { name: 'Warm Champagne', hex: '#f3e9dc' },
          { name: 'Brushed Brass', hex: '#d4af37' },
          { name: 'Soft Cream', hex: '#fdfbf7' },
        ],
        suggestedItems: [
          'Hanging eucalyptus chandelier over head table',
          'Taper candles in vintage brass holders',
          'Acrylic welcome sign flanked by potted monstera & ferns',
        ],
      },
      {
        id: 'idea-2',
        category: 'menu',
        title: 'Bespoke "His, Hers & Ours" Signature Cocktails',
        description: 'Delight guests with custom crafted drinks telling your story, paired with a vibrant mocktail option.',
        tags: ['Interactive Bar', 'Custom Drinks'],
        suggestedItems: [
          '"The Golden Hour": Bourbon, smoked rosemary, spiced blood orange & ginger beer',
          '"Blushing Petal": Elderflower liqueur, botanical gin, prosecco & edible viola flower',
          '"Zero-Proof Spark": Sparkling lavender lemonade with crushed blackberries & mint (Mocktail)',
        ],
        estimatedCostRange: '$5 - $8 per guest',
      },
      {
        id: 'idea-3',
        category: 'activity',
        title: 'Vintage Audio Guestbook & Polaroid Wall',
        description: 'Instead of a standard written guestbook, let friends pick up a retro rotary telephone to record voice messages, and peg candid snapshots to a string wall.',
        tags: ['Sentimental', 'Keepsake', 'Fun'],
        suggestedItems: [
          'Vintage rotary telephone audio recorder',
          'Fujifilm Instax cameras with 100 extra film packs',
          'Mini wooden pegs and custom neon "Leave a Memory" sign',
        ],
      },
      {
        id: 'idea-4',
        category: 'decor',
        title: 'Late Night Fuel: Mini Artisanal Sliders & Churro Station',
        description: 'Surprise guests around 10:00 PM with savory sliders and warm cinnamon churros with dipping chocolate to keep dancing energy soaring.',
        tags: ['Late Night Food', 'Crowd Pleaser'],
        suggestedItems: [
          'Truffle parmesan french fry paper cones',
          'Crispy chicken sliders and vegan halloumi bites',
          'Churro bites with warm dulce de leche and dark chocolate pots',
        ],
      },
    ];
  } else if (type === 'birthday') {
    return [
      {
        id: 'idea-1',
        category: 'theme',
        title: 'Retro Neon Glow & Sunset Disco',
        description: 'Vibrant 80s/90s modern revival with electric pastels, neon typography, mirrored disco balls, and high-energy nostalgia.',
        tags: ['Vibrant', 'High Energy', 'Instagrammable', vibeLabel],
        colorPalette: [
          { name: 'Electric Magenta', hex: '#f72585' },
          { name: 'Neon Violet', hex: '#7209b7' },
          { name: 'Cyber Blue', hex: '#4cc9f0' },
          { name: 'Sunset Tangerine', hex: '#f8961e' },
          { name: 'Midnight Charcoal', hex: '#1a1a24' },
        ],
        suggestedItems: [
          'Custom LED neon sign featuring the birthday celebrant’s favorite catchphrase',
          'Cluster of multi-sized disco balls on tables reflecting ambient violet uplighting',
          'Glitter & face gem station for guests',
        ],
      },
      {
        id: 'idea-2',
        category: 'activity',
        title: 'VIP Trivia Showdown & Guess the Year Photo Wall',
        description: 'A 15-minute hilarious trivia game played on guests’ phones (Kahoot style) with questions about the guest of honor, plus a photo timeline of childhood milestones.',
        tags: ['Icebreaker', 'Laughter', 'Personalized'],
        suggestedItems: [
          'Interactive phone quiz with prizes for 1st, 2nd, and 3rd place',
          'String clothesline displaying funny baby, awkward teenage, and present day photos',
        ],
      },
      {
        id: 'idea-3',
        category: 'menu',
        title: 'Artisanal Street Taco Bar & Custom Mocktail Tap',
        description: 'Interactive self-serve gourmet taco station featuring charred carne asada, blackened fish, and spiced grilled jackfruit with fresh guacamole.',
        tags: ['Interactive Dining', 'Crowd Pleaser'],
        suggestedItems: [
          'Fresh corn & flour tortillas kept warm in insulated warmers',
          'Trio of salsas (Mild Mango Habanero, Verde Tomatillo, Roasted Chipotle)',
          'Hibiscus Agua Fresca and Spiced Pineapple Margaritas',
        ],
      },
    ];
  } else {
    // Community Event
    return [
      {
        id: 'idea-1',
        category: 'theme',
        title: 'Green Roots Community Harmony & Eco-Festival',
        description: 'Focused on sustainability, community connection, local artisans, zero waste, and inclusive family fun under the open sky.',
        tags: ['Eco-Friendly', 'Inclusive', 'Community-Building', vibeLabel],
        colorPalette: [
          { name: 'Living Green', hex: '#2d6a4f' },
          { name: 'Sunburst Gold', hex: '#e9c46a' },
          { name: 'Terracotta Earth', hex: '#e76f51' },
          { name: 'Sky Azure', hex: '#a8dadc' },
          { name: 'Clean White', hex: '#f8f9fa' },
        ],
        suggestedItems: [
          'Recycled kraft paper signage with bold hand-lettered wayfinding',
          'Community mosaic art board where every attendee paints one tile',
          'Bicycle parking corral with free basic tune-up station',
        ],
      },
      {
        id: 'idea-2',
        category: 'activity',
        title: 'Community Passport & Scavenger Hunt',
        description: 'Attendees receive a printed or digital passport card. Visiting 5 volunteer stalls, the educational green booth, and the art station earns a stamp for the grand prize raffle.',
        tags: ['Engagement', 'Family Friendly', 'Educational'],
        suggestedItems: [
          'Stamped passport cards distributed at entrance registration',
          'Grand raffle prize featuring gift baskets donated by local mom-and-pop shops',
        ],
      },
      {
        id: 'idea-3',
        category: 'music',
        title: 'Acoustic Porch Stage & Cultural Heritage Hour',
        description: 'Spotlighting local school bands, cultural dance troupes, and acoustic singer-songwriters throughout the afternoon with comfortable shaded seating.',
        tags: ['Cultural Arts', 'Accessible', 'All Ages'],
        suggestedItems: [
          'Burlap hay bale seating with washable colorful picnic throws',
          'Open-caption screen for song lyrics and speeches',
        ],
      },
    ];
  }
}

/* -------------------------------------------------------------------------- */
/* ACCESSIBILITY & INCLUSIVITY CHECKLIST                                      */
