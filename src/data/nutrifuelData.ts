export type CityHub = 'Dehradun' | 'Gurgaon' | 'Noida' | 'Bangalore';
export type DietaryGoal =
  | 'Lean Muscle'
  | 'Balanced Maintenance'
  | 'Calorie Deficit'
  | 'Student Fuel';

export interface RecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  durationSeconds: number;
}

export interface IngredientPouch {
  name: string;
  measure: string;
  prepNote: string;
}

export interface MealKit {
  id: string;
  title: string;
  subtitle: string;
  category: 'High Protein Bowl' | 'Skillet & Stir-Fry' | 'Millet & Pasta' | 'Wrap & Chilla';
  priceInr: number;
  prepMinutes: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  fiberGrams: number;
  dietaryTag: '100% Vegetarian · Organic Farm Produce';
  accentHue: string;
  surfaceTint: string;
  illustrationKey: 'quinoa-bowl' | 'sesame-wok' | 'tandoori-wrap' | 'moong-chilla' | 'millet-pasta' | 'texmex-skillet';
  pouches: IngredientPouch[];
  steps: RecipeStep[];
}

export interface MealAddon {
  id: string;
  title: string;
  description: string;
  proteinBoost: string;
  priceInr: number;
}

export interface HubDetail {
  city: CityHub;
  corridors: string;
  samplePins: string[];
  cutoffTime: string;
  farmSource: string;
}

export const HUB_DETAILS: HubDetail[] = [
  {
    city: 'Dehradun',
    corridors: 'DBS Global University · Rajpur Road · IT Park Sahastradhara',
    samplePins: ['248001', '248007', '248013'],
    cutoffTime: 'Order by 2:00 PM for same-evening 5–7 PM delivery',
    farmSource: 'Doon Valley Hydroponic & Organic Collective (14 km radius)',
  },
  {
    city: 'Gurgaon',
    corridors: 'DLF Cyber City · Golf Course Road · Udyog Vihar',
    samplePins: ['122002', '122009', '122018'],
    cutoffTime: 'Order by 2:30 PM for same-evening 5–7 PM delivery',
    farmSource: 'Aravalli Foothill Organic Growers (22 km radius)',
  },
  {
    city: 'Noida',
    corridors: 'Sector 62 Tech Corridor · Sector 125 Campus Belt · Expressway',
    samplePins: ['201301', '201309', '201313'],
    cutoffTime: 'Order by 2:30 PM for same-evening 5–7 PM delivery',
    farmSource: 'Yamuna Floodplain Certified Fresh Farms (19 km radius)',
  },
  {
    city: 'Bangalore',
    corridors: 'Indiranagar · Koramangala · Outer Ring Road Tech Parks',
    samplePins: ['560038', '560034', '560103'],
    cutoffTime: 'Order by 2:00 PM for same-evening 5–7 PM delivery',
    farmSource: 'Chikkaballapur Organic Produce Network (28 km radius)',
  },
];

export const MEAL_KITS: MealKit[] = [
  {
    id: 'paneer-tikka-quinoa',
    title: 'Smoked Paneer Tikka Quinoa Bowl',
    subtitle: 'Pre-marinated organic malai paneer, washed tri-color quinoa & charred bell peppers',
    category: 'High Protein Bowl',
    priceInr: 220,
    prepMinutes: 14,
    calories: 540,
    proteinGrams: 42,
    carbsGrams: 44,
    fatsGrams: 19,
    fiberGrams: 8,
    dietaryTag: '100% Vegetarian · Organic Farm Produce',
    accentHue: '#14532D',
    surfaceTint: '#EFF5F0',
    illustrationKey: 'quinoa-bowl',
    pouches: [
      { name: 'Spiced Organic Paneer Cubes', measure: '160 g', prepNote: 'Pre-cubed & yogurt-tikka marinated' },
      { name: 'Par-Steamed Tri-Color Quinoa', measure: '140 g', prepNote: 'Rinsed & ready for 4-min fluff' },
      { name: 'Julienne Peppers & Red Onion', measure: '110 g', prepNote: 'Triple-washed, zero chopping' },
      { name: 'Mint-Hung Curd Dressing', measure: '45 g', prepNote: 'Cold-pressed & portion sealed' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sear paneer & peppers',
        instruction: 'Heat 1 tsp oil on a non-stick skillet over medium-high flame. Add Pouch 1 (paneer) and Pouch 3 (peppers) and sear undisturbed for 4 minutes until charred edges form.',
        durationSeconds: 240,
      },
      {
        stepNumber: 2,
        title: 'Warm the par-steamed quinoa',
        instruction: 'Add Pouch 2 (tri-color quinoa) with 2 tbsp water into a covered saucepan or pan corner. Steam for 3 minutes until warm and fluffy.',
        durationSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Toss with spice glaze',
        instruction: 'Lower flame, fold the seared paneer and peppers together with the warm quinoa for 2 minutes so smoky aromatics coat every grain.',
        durationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Plate & drizzle mint curd',
        instruction: 'Transfer into a deep bowl, drizzle Pouch 4 (mint-hung curd dressing), and serve hot.',
        durationSeconds: 60,
      },
    ],
  },
  {
    id: 'soya-edamame-stirfry',
    title: 'Soya & Edamame Sesame Stir-Fry',
    subtitle: 'High-protein pressed soya chunks, shelled edamame, bok choy & toasted sesame tamari glaze',
    category: 'Skillet & Stir-Fry',
    priceInr: 220,
    prepMinutes: 12,
    calories: 490,
    proteinGrams: 46,
    carbsGrams: 38,
    fatsGrams: 15,
    fiberGrams: 11,
    dietaryTag: '100% Vegetarian · Organic Farm Produce',
    accentHue: '#1E4D3B',
    surfaceTint: '#EDF4F2',
    illustrationKey: 'sesame-wok',
    pouches: [
      { name: 'Pressed Organic Soya & Edamame', measure: '180 g', prepNote: 'Hydrated, squeezed & shelled' },
      { name: 'Baby Bok Choy & Broccoli Florets', measure: '140 g', prepNote: 'Washed & bite-trimmed' },
      { name: 'Ginger-Tamari Sesame Glaze', measure: '55 g', prepNote: 'Low-sodium house reduction' },
      { name: 'Toasted White & Black Sesame', measure: '15 g', prepNote: 'Dry-roasted finishing crunch' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Blister the greens',
        instruction: 'Toss Pouch 2 (bok choy & broccoli) into a hot wok or wide pan with 1 tsp sesame oil for 3 minutes until bright emerald.',
        durationSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Crisp the soya & edamame',
        instruction: 'Add Pouch 1 (soya & edamame) to the pan and sear on high heat for 4 minutes for golden protein edges.',
        durationSeconds: 240,
      },
      {
        stepNumber: 3,
        title: 'Glaze & reduce',
        instruction: 'Pour Pouch 3 (ginger-tamari glaze) over the stir-fry and toss briskly for 2 minutes until glossy and evenly coated.',
        durationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Finish with toasted sesame',
        instruction: 'Plate immediately and scatter Pouch 4 (toasted sesame) over the top.',
        durationSeconds: 60,
      },
    ],
  },
  {
    id: 'tandoori-tofu-wrap',
    title: 'Tandoori Tofu & Chickpea Power Wrap',
    subtitle: 'Whole-wheat multigrain wraps, spiced organic tofu strips, roasted kabuli chana & slaw',
    category: 'Wrap & Chilla',
    priceInr: 220,
    prepMinutes: 11,
    calories: 510,
    proteinGrams: 38,
    carbsGrams: 52,
    fatsGrams: 16,
    fiberGrams: 10,
    dietaryTag: '100% Vegetarian · Organic Farm Produce',
    accentHue: '#3F4E29',
    surfaceTint: '#F2F4EC',
    illustrationKey: 'tandoori-wrap',
    pouches: [
      { name: 'Tandoori Marinated Organic Tofu', measure: '150 g', prepNote: 'Firm pressed & sliced into strips' },
      { name: 'Spiced Roasted Chickpeas', measure: '75 g', prepNote: 'Pre-cooked & cumin-dusted' },
      { name: 'Red Cabbage & Carrot Slaw', measure: '95 g', prepNote: 'Pre-shredded & crisp-packed' },
      { name: '2x Multigrain Protein Rotis + Tahini Dip', measure: '130 g', prepNote: 'Soft-sealed, ready to toast' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pan-sear tandoori tofu',
        instruction: 'Heat a flat tawa or skillet and sear Pouch 1 (tandoori tofu strips) for 4 minutes, turning once for charred grill marks.',
        durationSeconds: 240,
      },
      {
        stepNumber: 2,
        title: 'Warm chickpeas & toast rotis',
        instruction: 'Toss Pouch 2 (chickpeas) in the hot pan for 2 minutes; warm each multigrain roti from Pouch 4 on the tawa for 45 seconds per side.',
        durationSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Layer slaw & tahini',
        instruction: 'Spread tahini dip across the warm rotis, then layer crisp Pouch 3 slaw, roasted chickpeas, and seared tofu.',
        durationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Roll tight & slice',
        instruction: 'Fold ends inward, roll tightly, and halve diagonally for clean weeknight eating.',
        durationSeconds: 60,
      },
    ],
  },
  {
    id: 'moong-chilla-avocado',
    title: 'Moong Dal Chilla & Avocado Smash',
    subtitle: 'Stone-ground protein moong batter, stuffed cottage cheese crumble & seasoned guacamole',
    category: 'Wrap & Chilla',
    priceInr: 220,
    prepMinutes: 13,
    calories: 460,
    proteinGrams: 34,
    carbsGrams: 39,
    fatsGrams: 18,
    fiberGrams: 9,
    dietaryTag: '100% Vegetarian · Organic Farm Produce',
    accentHue: '#166534',
    surfaceTint: '#EDF5EF',
    illustrationKey: 'moong-chilla',
    pouches: [
      { name: 'Fermented Yellow Moong Batter', measure: '200 g', prepNote: 'Stone-ground with ginger & green chili' },
      { name: 'Crumbled Low-Fat Paneer Filling', measure: '90 g', prepNote: 'Mixed with fresh coriander & jeera' },
      { name: 'Cold-Pressed Avocado Lime Smash', measure: '85 g', prepNote: 'Vacuum-sealed to prevent browning' },
      { name: 'Microgreens & Sprouted Moong', measure: '40 g', prepNote: 'Triple-washed crunch garnish' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Spread golden chillas',
        instruction: 'Pour half of Pouch 1 onto a lightly oiled hot non-stick tawa and swirl into a thin crepe. Cook 2.5 minutes until crisp.',
        durationSeconds: 210,
      },
      {
        stepNumber: 2,
        title: 'Stuff with paneer crumble',
        instruction: 'Flip chilla, spoon half of Pouch 2 (paneer filling) down the center, and cook 90 seconds more before folding.',
        durationSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Repeat for second chilla',
        instruction: 'Cook the second chilla with remaining batter and paneer filling on the hot tawa.',
        durationSeconds: 210,
      },
      {
        stepNumber: 4,
        title: 'Plate with avocado smash',
        instruction: 'Top warm chillas with Pouch 3 (avocado lime smash) and fresh Pouch 4 microgreens.',
        durationSeconds: 60,
      },
    ],
  },
  {
    id: 'pesto-millet-pasta',
    title: 'Pesto Paneer & Zucchini Millet Pasta',
    subtitle: 'High-protein foxtail millet penne, basil-walnut pesto, roasted zucchini & herb paneer',
    category: 'Millet & Pasta',
    priceInr: 220,
    prepMinutes: 15,
    calories: 530,
    proteinGrams: 36,
    carbsGrams: 50,
    fatsGrams: 20,
    fiberGrams: 7,
    dietaryTag: '100% Vegetarian · Organic Farm Produce',
    accentHue: '#235347',
    surfaceTint: '#EEF4F1',
    illustrationKey: 'millet-pasta',
    pouches: [
      { name: 'Par-Cooked Foxtail Millet Penne', measure: '170 g', prepNote: 'Al dente pre-boiled, 3-min finish' },
      { name: 'Herb-Tossed Paneer & Zucchini', measure: '145 g', prepNote: 'Pre-sliced zucchini + cubed paneer' },
      { name: 'Fresh Basil & Walnut Pesto', measure: '60 g', prepNote: 'Cold-blended extra-virgin olive oil' },
      { name: 'Cherry Tomatoes & Chili Flakes', measure: '55 g', prepNote: 'Halved sweet vine tomatoes' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Blister zucchini & cherry tomatoes',
        instruction: 'Sauté Pouch 2 (paneer & zucchini) and Pouch 4 (cherry tomatoes) in a skillet for 5 minutes until lightly browned.',
        durationSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Simmer millet penne',
        instruction: 'Add Pouch 1 (par-cooked millet penne) and 4 tbsp water directly to the pan; cover for 3 minutes until tender.',
        durationSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Emulsify with basil pesto',
        instruction: 'Turn off heat completely, fold in Pouch 3 (basil walnut pesto) and toss until silky.',
        durationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Season & serve',
        instruction: 'Finish with chili flakes from Pouch 4 and plate immediately.',
        durationSeconds: 60,
      },
    ],
  },
  {
    id: 'rajma-texmex-skillet',
    title: 'Rajma & Black Bean Tex-Mex Skillet',
    subtitle: 'Slow-simmered Himalayan rajma, black beans, sweet corn, brown rice & smoky chipotle salsa',
    category: 'Skillet & Stir-Fry',
    priceInr: 220,
    prepMinutes: 14,
    calories: 520,
    proteinGrams: 35,
    carbsGrams: 61,
    fatsGrams: 13,
    fiberGrams: 14,
    dietaryTag: '100% Vegetarian · Organic Farm Produce',
    accentHue: '#2F4F3E',
    surfaceTint: '#F0F4F1',
    illustrationKey: 'texmex-skillet',
    pouches: [
      { name: 'Himalayan Rajma & Black Beans', measure: '175 g', prepNote: 'Pressure-cooked & cumin-seasoned' },
      { name: 'Par-Steamed Brown Rice & Sweet Corn', measure: '150 g', prepNote: 'Pre-portioned & washed' },
      { name: 'Smoky Tomato-Chipotle Salsa', measure: '75 g', prepNote: 'Freshly roasted base sauce' },
      { name: 'Greek Yogurt Crema & Coriander', measure: '45 g', prepNote: 'High-protein cooling finish' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Warm spiced beans & salsa',
        instruction: 'Combine Pouch 1 (rajma & black beans) with Pouch 3 (chipotle salsa) in a skillet over medium flame for 5 minutes.',
        durationSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Fold in brown rice & corn',
        instruction: 'Stir Pouch 2 (brown rice & sweet corn) with 2 tbsp water into the skillet and cover for 4 minutes.',
        durationSeconds: 240,
      },
      {
        stepNumber: 3,
        title: 'Toast skillet crust',
        instruction: 'Uncover and let the bottom sear undisturbed for 2 minutes for rich smoky flavor.',
        durationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Swirl yogurt crema',
        instruction: 'Remove from heat, top with Pouch 4 (Greek yogurt crema & fresh coriander), and enjoy straight from the bowl.',
        durationSeconds: 60,
      },
    ],
  },
];

export const MEAL_ADDONS: MealAddon[] = [
  {
    id: 'addon-hemp-seed',
    title: 'Roasted Himalayan Hemp Seed Boost',
    description: 'Single-serve 30g sachet adding complete plant omega-3s and crunch to any bowl.',
    proteinBoost: '+10g Protein',
    priceInr: 45,
  },
  {
    id: 'addon-almond-shake',
    title: 'Cold-Pressed Almond & Pea Protein Cold Brew',
    description: '250ml unsweetened post-workday recovery bottle, zero refined sugar.',
    proteinBoost: '+20g Protein',
    priceInr: 110,
  },
  {
    id: 'addon-sprout-salad',
    title: 'Organic Sprouted Lentil Crunch Side',
    description: 'Pre-washed lemon-pepper green moong & chickpea micro-salad cup.',
    proteinBoost: '+12g Protein',
    priceInr: 65,
  },
];

export const VENTURE_PLAN = {
  header: {
    program: 'DGU Venture Quest — Complete Venture Plan',
    institution: 'Entrepreneurship & Innovation · DBS Global University',
    founderEmail: 'vikalp.0251mba645@dgu.ac.in',
    ventureName: 'NutriFuel',
    generatedDate: '17 Nov 2026',
  },
  mission0: {
    initialCustomer:
      'Time-strapped urban professionals, health-conscious fitness enthusiasts, and busy students aged 22–40 who desire fresh, nutritious, home-cooked meals but lack time for planning, shopping, and prep.',
    ventureIdea:
      'NutriFuel is a subscription-based, fresh, pre-portioned meal-kit service delivering chef-designed, macro-balanced recipes directly to urban professionals and health-conscious consumers. Each kit includes pre-measured, locally sourced organic ingredients with 15-minute recipe cards.',
    geography:
      'Tier-1 and Tier-2 metropolitan cities and educational hubs across India (starting initially in Dehradun and expanded NCR regions), focusing on corporate parks, university campuses, and high-density residential apartments.',
    problemSolved:
      'Busy professionals and students struggle to maintain a healthy diet due to long work hours, limited cooking skills, and the hassle of meal planning and prep. Delivery apps are high in oil and calories, while traditional cooking wastes time and ingredients.',
  },
  mission1and2: {
    frictionId: 'f-1',
    evidenceSummary: '8 out of 10 interviewed target consumers reported ordering takeout due to weekday evening fatigue despite wanting healthy home meals.',
    emotionalJob: 'Feel in control of health, nutrition, and well-being while avoiding guilt, fatigue, and stress caused by unhealthy takeout.',
    functionalJob: 'Prepare and consume a healthy, balanced, and fresh home-cooked meal in 15 minutes or less without planning, shopping, or prepping.',
    socialJob: 'Be perceived by peers, colleagues, and family as health-conscious, self-disciplined, and productive despite a 9–10 hour workday.',
    primaryJtbd:
      'When I finish a long workday and need a nutritious meal without spending hours in the kitchen or grocery store, I want to quickly cook a fresh, macro-balanced dinner using pre-portioned ingredients and simple recipe guides, so that I can effortlessly maintain a healthy diet and save time for personal relaxation.',
  },
  mission3and4: {
    buyingBehaviour: 'Frequently uses quick-commerce (Blinkit, Zepto) and food delivery (Swiggy, Zomato); comfortable with app subscriptions and digital payments.',
    beachheadSegment:
      'Young IT and corporate professionals aged 23–32 working in regional tech parks and educational hubs (Dehradun, Gurgaon, Noida, Bangalore) who order online 4+ times/week and track fitness/nutrition.',
    willingnessToPay: '₹150–₹250 per meal (₹3,500–₹5,000 monthly for convenient, premium healthy meals).',
    cvpStatement:
      'For busy urban professionals who want to eat healthy without spending hours cooking, NutriFuel is a fresh meal-kit subscription that provides pre-portioned organic ingredients and 15-minute recipes, delivering fast, nutritious home-cooked meals without the hassle of grocery shopping or food prep.',
  },
  competitorMatrix: [
    {
      name: 'NutriFuel',
      type: 'Our Venture',
      axisX: 9,
      axisY: 8,
      price: '₹220 / meal kit',
      strength: 'Pre-portioned organic farm produce, exact macro control, verified <15 min prep, zero food waste.',
      weakness: 'Requires 15 minutes of active pan cooking on weeknights.',
    },
    {
      name: 'Food Delivery Apps (Swiggy / Zomato)',
      type: 'Direct Competitor',
      axisX: 3,
      axisY: 9,
      price: '₹250 – ₹450 / meal',
      strength: 'Extreme convenience, massive cuisine variety, instant delivery in 30–45 minutes.',
      weakness: 'Expensive platform fees, high calories/oil/sodium, inconsistent food quality.',
    },
    {
      name: 'Local Cook / Tiffin Service',
      type: 'Indirect Competitor',
      axisX: 5,
      axisY: 4,
      price: '₹3,000 – ₹6,000 / month',
      strength: 'Affordable daily option providing hot home-style meals.',
      weakness: 'Repetitive menus, unreliable cook attendance, variable hygiene, zero macro tracking.',
    },
    {
      name: 'Quick Commerce (Blinkit / Zepto)',
      type: 'Substitute',
      axisX: 7,
      axisY: 2,
      price: '₹100 – ₹200 / meal (raw)',
      strength: '10-minute raw ingredient availability and lower food cost.',
      weakness: 'Requires full manual effort: meal planning, washing, chopping, cooking, and cleanup.',
    },
  ],
  positioningStatement:
    'For busy, health-conscious urban professionals who struggle to maintain a nutritious diet, NutriFuel is a subscription-based fresh meal kit service that enables cooking fresh, macro-balanced meals in under 15 minutes. Unlike commercial food delivery apps or repetitive tiffin services, NutriFuel delivers pre-portioned organic ingredients with easy recipes, giving you total control over your health without the hassle of grocery shopping or meal prep.',
  unitEconomicsScenarios: [
    {
      id: 'conservative',
      label: 'Conservative',
      customers: 150,
      ordersPerCustomer: 10,
      sellingPrice: 220,
      variableCost: 110,
      fixedCost: 45000,
      monthlyRevenue: 330000,
      operatingSurplus: 120000,
      notes: 'Slower initial adoption, higher acquisition costs, 10 orders/month.',
    },
    {
      id: 'base',
      label: 'Base Case',
      customers: 300,
      ordersPerCustomer: 12,
      sellingPrice: 220,
      variableCost: 110,
      fixedCost: 45000,
      monthlyRevenue: 792000,
      operatingSurplus: 351000,
      notes: 'Steady adoption across corporate & student tech hubs (3 kits/week = 12 orders/month).',
    },
    {
      id: 'ambitious',
      label: 'Ambitious',
      customers: 600,
      ordersPerCustomer: 15,
      sellingPrice: 220,
      variableCost: 105,
      fixedCost: 55000,
      monthlyRevenue: 1980000,
      operatingSurplus: 980000,
      notes: 'Viral loop expansion, 15 orders/month, wholesale scale drops variable cost to ₹105.',
    },
  ],
  marketSize: {
    totalPotentialCustomers: 5000000,
    serviceableCustomers: 250000,
    obtainableCustomers: 3600,
    annualSpendPerCustomer: 31680,
    tamFormatted: '₹1,58,40,00,00,000',
    samFormatted: '₹7,92,00,00,000',
    somFormatted: '₹11,40,48,000',
    tamDetail: '50 Lakh urban professionals & university students (22–35) across Tier-1 & Tier-2 Indian hubs.',
    samDetail: '2.5 Lakh tech-savvy, health-conscious professionals & postgrads in Dehradun, Gurgaon, and Noida.',
    somDetail: '3,600 annual kit-purchase equivalents (300 active monthly subscribers × 12 orders/year in Year 1).',
  },
  gtm30Day: [
    {
      week: 'Week 1',
      channel: 'Instagram & Meta Paid Ads',
      action: 'Launch high-converting short video reels contrasting 15-min meal prep vs traditional cooking; open trial pre-order landing page.',
      metric: 'CTR & Landing Page Conversion Rate',
      owner: 'Marketing Lead',
      target: '500 Landing Page Clicks & 150 Signups (Budget: ₹15,000)',
    },
    {
      week: 'Week 2',
      channel: 'Direct Outreach & Corporate Kiosks',
      action: 'Distribute 50%-off trial box codes and host physical tasting/demo kiosks at regional corporate tech parks and student centers.',
      metric: 'Trial Order Conversion & CAC',
      owner: 'Sales & Operations Lead',
      target: '100 Trial Meal Kit Orders',
    },
    {
      week: 'Week 3',
      channel: 'Direct Delivery & WhatsApp Surveys',
      action: 'Fulfill first trial meal kits and capture structured feedback on prep time (<15 min), taste, freshness, and portion size.',
      metric: 'NPS & Average Reported Prep Time',
      owner: 'Product & Culinary Lead',
      target: '80% Feedback Response & >4.5/5 Satisfaction',
    },
    {
      week: 'Week 4',
      channel: 'In-App Email & Direct Follow-ups',
      action: 'Convert trial users into recurring monthly subscribers with a 15% discount on 4-week automated meal subscriptions.',
      metric: 'Trial-to-Subscription Retention (%)',
      owner: 'Customer Retention Lead',
      target: '30 Active Monthly Recurring Subscribers',
    },
  ],
  mvpScope: {
    included: [
      'Pre-portioned, pre-washed fresh organic vegetarian & protein-rich meal kits',
      'Printed & interactive step-by-step 15-minute recipe cards',
      '50%-off 3-meal trial box + 3-meal/week recurring subscription workflows',
      'Direct 24-hour local farm-to-hub cold-bag delivery in Dehradun & NCR',
    ],
    excluded: [
      'Custom native iOS/Android mobile application (Web-first MVP)',
      'Automated kitchen robotics or smart hardware appliances',
      '1-on-1 personal chef consultations or custom micro-diets',
      'Multi-region intercity cold-chain freight or non-veg kits in Phase 1',
    ],
  },
  assumptions: [
    {
      id: 'A1',
      assumption: 'Busy urban professionals will cook for 15 minutes on weeknights when all planning, washing, and chopping are eliminated.',
      test: '2-week pilot of 50 trial boxes across corporate employees measuring active cooking completion.',
      evidenceNeeded: '≥ 70% of trial participants complete meals in under 15 minutes with > 4.5/5 convenience score.',
    },
    {
      id: 'A2',
      assumption: 'Target customers are willing to pay ₹220 per meal kit on a recurring weekly/monthly subscription.',
      test: 'Offer paid 4-week recurring packages post-trial and measure 30-day renewal rates.',
      evidenceNeeded: '≥ 30% of trial users convert to paid recurring subscribers at ₹220 (50% contribution margin).',
    },
    {
      id: 'A3',
      assumption: 'Pre-portioned fresh organic produce can be sourced and delivered within 24 hours without spoilage.',
      test: 'Direct partnerships with local organic farm collectives and daily postal-code fulfillment trials.',
      evidenceNeeded: 'Ingredient spoilage rate < 3% and ≥ 95% on-time delivery across pilot shipments.',
    },
  ],
};
