import type { EventDetails, VendorItem } from '../types/event';

export function generateVendorItems(details: EventDetails): VendorItem[] {
  const type = details.type;

  if (type === 'wedding') {
    return [
      {
        id: 'vendor-1',
        category: 'Venue',
        role: 'Ceremony & Reception Venue',
        vendorName: 'Whispering Pines Estate (Sample)',
        status: 'contract_signed',
        quotedPrice: Math.round(details.totalBudget * 0.22),
        checklistItems: [
          { text: 'Verify certificate of liability insurance requirements', done: true },
          { text: 'Confirm arrival and teardown window hours', done: true },
          { text: 'Check noise curfew cut-off and decibel limit', done: false },
          { text: 'Inspect rain contingency indoor pavilion', done: false },
        ],
        aiQuestionsToAsk: [
          'What is the exact load-in window for outside florists and rental equipment?',
          'Are open-flame candles permitted on dining tables?',
          'Is there an in-house bridal dressing suite and groom quarters available prior to ceremony?',
          'What is the corkage or outside vendor penalty fee if we supply our own wine?',
        ],
        redFlagsToWatch: [
          'Hidden cleaning or mandatory valet staffing fees not in initial quote.',
          'Strict requirement to use an exclusive high-markup vendor list without waivers.',
          'Vague weather backup plans that force guests into an unconditioned space.',
        ],
      },
      {
        id: 'vendor-2',
        category: 'Catering',
        role: 'Master Chef Catering & Bar',
        vendorName: 'Artisan Culinary Group',
        status: 'quoted',
        quotedPrice: Math.round(details.totalBudget * 0.28),
        checklistItems: [
          { text: 'Conduct complimentary menu tasting session', done: false },
          { text: 'Confirm dietary accommodations (vegan, celiac, halal/kosher)', done: true },
          { text: 'Finalize server-to-guest ratio (aim for 1 server per 10-12 guests for plated)', done: false },
          { text: 'Check if linens, flatware, and china are included or rental cost', done: false },
        ],
        aiQuestionsToAsk: [
          'Are vendor meals (for photographer, DJ, coordinator) included at a reduced rate?',
          'How do you manage dietary allergies during simultaneous plated service?',
          'What happens to leftover unserved food at the end of the reception?',
          'What is the overtime rate per staff member if speeches run late?',
        ],
        redFlagsToWatch: [
          'Automatic 25%+ administrative fee that is NOT paid as gratuity to waitstaff.',
          'Refusal to execute a written tasting guarantee prior to non-refundable deposit.',
        ],
      },
      {
        id: 'vendor-3',
        category: 'Photography',
        role: 'Principal Photographer & Second Shooter',
        vendorName: 'Golden Hour Visuals',
        status: 'contacted',
        quotedPrice: Math.round(details.totalBudget * 0.10),
        checklistItems: [
          { text: 'Review full unedited gallery of a complete wedding from start to finish', done: true },
          { text: 'Verify dual-card backup camera gear and off-site cloud storage', done: false },
          { text: 'Establish turnaround time for sneak peeks vs full gallery', done: false },
        ],
        aiQuestionsToAsk: [
          'What is your contingency backup plan if the primary photographer falls ill on the morning of?',
          'Do we get full digital personal print rights and high-resolution files without watermarks?',
          'Have you shot at our chosen venue before, and what are your favorite lighting angles there?',
        ],
        redFlagsToWatch: [
          'Overly long delivery times exceeding 12 weeks for digital photos.',
          'Contract retaining copyright restrictions preventing printing wedding albums with local printers.',
        ],
      },
      {
        id: 'vendor-4',
        category: 'Entertainment',
        role: 'Wedding DJ & Master of Ceremonies',
        vendorName: 'Rhythm & Beats Co.',
        status: 'researching',
        quotedPrice: Math.round(details.totalBudget * 0.06),
        checklistItems: [
          { text: 'Provide "Must-Play" and "Do-Not-Play" song lists', done: false },
          { text: 'Confirm wireless lapel mic for officiant during vows', done: false },
          { text: 'Verify dance floor lighting rig is included', done: false },
        ],
        aiQuestionsToAsk: [
          'How do you read the room and transition between music genres to keep older and younger guests dancing?',
          'Do you have backup sound mixers and wireless microphones on site?',
          'How will you coordinate with our photographer before announcing major milestones like the cake cutting?',
        ],
        redFlagsToWatch: [
          'DJs who treat your wedding like their own promotional club set or talk incessantly on the mic.',
          'Lack of backup equipment or requiring client to source power strips/extension cords.',
        ],
      },
    ];
  } else if (type === 'birthday') {
    return [
      {
        id: 'vendor-1',
        category: 'Venue & Decor',
        role: 'Party Space & Installation Stylist',
        vendorName: 'Skyline Terrace / DIY Studio',
        status: 'contacted',
        quotedPrice: Math.round(details.totalBudget * 0.25),
        checklistItems: [
          { text: 'Confirm sound system connection (Bluetooth / AUX compatibility)', done: true },
          { text: 'Confirm refrigerator space for birthday cake', done: false },
          { text: 'Check wall hanging restrictions for balloon installation', done: false },
        ],
        aiQuestionsToAsk: [
          'How much setup time do we get prior to the party start?',
          'Are outside food trucks or dessert tables permitted without extra surcharge?',
        ],
        redFlagsToWatch: [
          'Strict noise penalties that cut power at exactly 10:00 PM without advance warning.',
        ],
      },
      {
        id: 'vendor-2',
        category: 'Bakery',
        role: 'Custom Cake Designer',
        vendorName: 'SugarCraft Artisan Bakery',
        status: 'quoted',
        quotedPrice: Math.round(details.totalBudget * 0.07),
        checklistItems: [
          { text: 'Send reference moodboard photo of cake design', done: true },
          { text: 'Select flavor combo (e.g. Lemon Raspberry or Dark Chocolate Salted Caramel)', done: true },
          { text: 'Schedule refrigerated delivery 2 hours prior to guest arrival', done: false },
        ],
        aiQuestionsToAsk: [
          'Can you create gluten-free or dairy-free cupcakes for guests with sensitivities?',
          'Does the cake stand and acrylic topper need to be returned post-event?',
        ],
        redFlagsToWatch: [
          'Refusal to deliver on hot days or requiring client to transport delicate 3-tier cakes.',
        ],
      },
    ];
  } else {
    // Community Event
    return [
      {
        id: 'vendor-1',
        category: 'Municipal & Safety',
        role: 'City Parks Dept & Traffic Safety',
        vendorName: 'Metro Parks & Recreation',
        status: 'contacted',
        quotedPrice: Math.round(details.totalBudget * 0.18),
        checklistItems: [
          { text: 'Submit site map indicating emergency vehicle ingress/egress', done: true },
          { text: 'Submit certificate of \$1M additional insured endorsement', done: false },
          { text: 'Confirm off-duty police or volunteer crossing guards for crosswalks', done: false },
        ],
        aiQuestionsToAsk: [
          'What are the city decibel limits and cutoff times for live amplified music?',
          'Are temporary stakes permitted in the grass or must all pop-up tents use 40lb sandbags?',
        ],
        redFlagsToWatch: [
          'Permit applications delayed beyond the 30-day municipal committee approval window.',
        ],
      },
      {
        id: 'vendor-2',
        category: 'Sanitation & Logistics',
        role: 'Portable Sanitation & Clean Energy',
        vendorName: 'EcoSan Logistics',
        status: 'quoted',
        quotedPrice: Math.round(details.totalBudget * 0.14),
        checklistItems: [
          { text: 'Order 1 ADA-compliant unit per 100 estimated attendees', done: true },
          { text: 'Book dual hand-washing stations with soap and paper towels', done: false },
          { text: 'Coordinate morning delivery and same-night removal', done: false },
        ],
        aiQuestionsToAsk: [
          'Do your restrooms include solar-powered interior touch lights for evening events?',
          'What is your emergency on-call contact if a unit requires pump-out during the festival?',
        ],
        redFlagsToWatch: [
          'Vendors that do not offer ADA-accessible wheelchair ramps or hand sanitizers.',
        ],
      },
    ];
  }
}

/* -------------------------------------------------------------------------- */
/* PERSONALIZED THEME & CREATIVE IDEAS                                        */
