export interface SpecialPolicy {
  topic: string;
  detail: string;
}

export interface AirlineData {
  slug: string;
  name: string;
  carryOnDim: string;
  carryOnWeight: string;
  checkedWeight: string;
  personalItem: string;
  batteryPolicy: string;
  liquidRule: string;
  specialPolicies: SpecialPolicy[];
}

export interface AirlineFAQ {
  q: string;
  a: string;
}

export const ALL_AIRLINES: AirlineData[] = [
  {
    slug: "singapore-airlines",
    name: "Singapore Airlines",
    carryOnDim: "Sum of dimensions ≤ 115 cm (45 in)",
    carryOnWeight: "7 kg (15 lbs)",
    checkedWeight: "30 kg (66 lbs) for standard Economy",
    personalItem: "40 x 30 x 10 cm (must fit under seat)",
    batteryPolicy: "Power banks & portable chargers must stay in carry-on (max 100Wh standard; 100Wh–160Wh requires airline approval). Strictly prohibited in checked luggage.",
    liquidRule: "International flights adhere to the 100ml / 3.4oz limit in a 1-liter transparent resealable bag.",
    specialPolicies: [
      { topic: "Cup Noodles & Instant Food", detail: "Dry cup noodles and instant food are permitted in cabin baggage. Flight attendants can provide hot water on long-haul flights during safe cruising." },
      { topic: "Bicycle Policy", detail: "Bicycles accepted as standard checked luggage within weight allowances if handlebars are turned, pedals removed, and packed in a protective bike box or bag." },
      { topic: "Stroller Policy", detail: "One fully collapsible stroller/pushchair and one car seat checked completely free of charge for infants." },
      { topic: "Headphones & Electronics", detail: "Complimentary headphones provided on all flights with KrisWorld entertainment. Personal Bluetooth headphones, AirPods, and AirTags fully allowed." }
    ]
  },
  {
    slug: "air-france",
    name: "Air France",
    carryOnDim: "55 x 35 x 25 cm (21.6 x 13.7 x 9.8 in)",
    carryOnWeight: "12 kg (26.4 lbs) combined with personal item",
    checkedWeight: "23 kg (50 lbs) per bag",
    personalItem: "40 x 30 x 15 cm (handbag, laptop bag)",
    batteryPolicy: "Power banks strictly carry-on only (max 100Wh standard, max 2 units between 100-160Wh with airline approval). Prohibited in checked luggage.",
    liquidRule: "The 3-1-1 / EU liquid rule applies: All liquids, gels, and aerosols must be in containers ≤ 100ml (3.4 oz) inside a single 1-liter clear plastic bag.",
    specialPolicies: [
      { topic: "AirTags & Smart Trackers", detail: "AirTags and Bluetooth trackers (CR2032 button cells) are officially permitted in checked suitcases and cabin baggage." },
      { topic: "Vaping Policy", detail: "E-cigarettes and vapes must be in carry-on bags only (max 2 spare batteries). Charging or use on board is strictly prohibited." },
      { topic: "Car Seats & Strollers", detail: "Small foldable stroller (under 55 x 35 x 15 cm) allowed in overhead bins; standard strollers gate-checked free of charge." },
      { topic: "In-Flight Cookies & Snacks", detail: "Complimentary sweet French biscuits/cookies and beverages provided on European and intercontinental routes." }
    ]
  },
  {
    slug: "emirates",
    name: "Emirates",
    carryOnDim: "55 x 38 x 20 cm (22 x 15 x 8 in)",
    carryOnWeight: "7 kg (15 lbs) for Economy",
    checkedWeight: "20–35 kg (44–77 lbs) depending on fare type",
    personalItem: "Must fit within single 7 kg cabin allowance for Economy",
    batteryPolicy: "Lithium power banks prohibited in checked hold luggage; allowed in cabin (under 100Wh).",
    liquidRule: "Standard 100ml liquid restriction per container in clear 1-liter bag for all international departures.",
    specialPolicies: [
      { topic: "Complimentary Headphones", detail: "Free high-quality headphones are distributed to all passengers for the ice entertainment system." },
      { topic: "Cigarettes & E-Cigarettes", detail: "E-cigarettes must stay in carry-on. Cigarette duty-free allowance into UAE is up to 400 cigarettes." },
      { topic: "Beard Trimmers & Shavers", detail: "Electric beard trimmers, hair clippers, and electric toothbrushes are 100% permitted in hand luggage." },
      { topic: "AirTags & Umbrellas", detail: "Luggage trackers (AirTags) and folding umbrellas permitted without restriction." }
    ]
  },
  {
    slug: "lufthansa",
    name: "Lufthansa",
    carryOnDim: "55 x 40 x 23 cm (21.6 x 15.7 x 9 in)",
    carryOnWeight: "8 kg (17.6 lbs)",
    checkedWeight: "23 kg (50 lbs) per bag",
    personalItem: "40 x 30 x 10 cm",
    batteryPolicy: "Max 2 portable chargers / power banks (under 100Wh) in carry-on luggage. Never in checked bags.",
    liquidRule: "EU 100ml liquid rule strictly enforced at Frankfurt and Munich hubs.",
    specialPolicies: [
      { topic: "Cigarette Allowance", detail: "Duty-free allowance for non-EU arrivals entering Germany is 200 cigarettes (or 50 cigars) per adult aged 17+." },
      { topic: "Baby Food in Hand Luggage", detail: "Baby milk, formula, and prepared food for infants during travel are exempt from the 100ml liquid limit." },
      { topic: "Golf Clubs & Sports Gear", detail: "Golf bags accepted as standard checked luggage up to 23 kg without extra fee if within ticket baggage allowance." },
      { topic: "Medications", detail: "Liquid prescription medicines and injectables permitted in hand luggage with doctor note / prescription." }
    ]
  },
  {
    slug: "ryanair",
    name: "Ryanair",
    carryOnDim: "40 x 20 x 25 cm (free personal bag); 55 x 40 x 20 cm (Priority 10kg)",
    carryOnWeight: "10 kg with Priority boarding",
    checkedWeight: "10 kg or 20 kg pre-booked fee",
    personalItem: "40 x 20 x 25 cm (must fit under seat in front)",
    batteryPolicy: "Camera batteries, vape batteries, and power banks must be in hand luggage. Smart bags must have battery removed.",
    liquidRule: "Strict 100ml container limits in 1 clear 20x20cm resealable bag.",
    specialPolicies: [
      { topic: "Lighters & Matches", detail: "One safety lighter or matchbox permitted ON YOUR PERSON through security. Prohibited in cabin bags and checked hold." },
      { topic: "Hair Straighteners & Curling Irons", detail: "Corded hair straighteners allowed in hand luggage and checked bags. Gas straighteners limited to 1 unit with safety cap." },
      { topic: "Skateboards & Sports", detail: "Small skateboards permitted in hand luggage if within size allowance, or checked under sports equipment." },
      { topic: "Tweezers & Disposable Razors", detail: "Eyebrow tweezers and fixed-cartridge disposable razors permitted in Ryanair cabin bags." },
      { topic: "Nicotine Pouches", detail: "ZYN and nicotine pouches fully permitted in hand luggage for flights within EU." }
    ]
  },
  {
    slug: "american",
    name: "American Airlines",
    carryOnDim: "22 x 14 x 9 in (56 x 35 x 23 cm)",
    carryOnWeight: "No weight limit (must lift unassisted)",
    checkedWeight: "50 lbs (23 kg)",
    personalItem: "18 x 14 x 8 in (45 x 35 x 20 cm)",
    batteryPolicy: "Power banks, spare lithium batteries, and e-cigarettes must stay in carry-on baggage.",
    liquidRule: "TSA 3-1-1 liquids rule applies (≤ 3.4 oz containers in 1-quart clear zip bag).",
    specialPolicies: [
      { topic: "Bluetooth Speakers & Audio", detail: "Portable Bluetooth speakers (JBL, Bose) allowed in carry-on. If checked, must be turned completely off." },
      { topic: "Perfumes & Colognes", detail: "Perfume bottles must be ≤ 3.4 oz (100ml) in carry-on; full-size bottles allowed in checked bags up to 70 oz per person." },
      { topic: "Gaming Consoles (Xbox / PS5)", detail: "Consoles permitted as carry-on luggage. Must remove for separate X-ray screening at TSA checkpoints." },
      { topic: "Bicycles", detail: "Bicycles accepted as standard checked bag up to 50 lbs / 126 in total dimensions in a bike box." },
      { topic: "Scissors & Electric Razors", detail: "Scissors with blades under 4 inches from pivot and all electric shavers permitted in carry-on." }
    ]
  },
  {
    slug: "delta",
    name: "Delta Air Lines",
    carryOnDim: "22 x 14 x 9 in (56 x 35 x 23 cm)",
    carryOnWeight: "No weight limit on most routes (except Singapore/Beijing: 7–10 kg)",
    checkedWeight: "50 lbs (23 kg)",
    personalItem: "1 personal item (purse, laptop backpack)",
    batteryPolicy: "Power banks, phone battery packs, and loose lithium batteries strictly prohibited in checked hold; must be under 100Wh in cabin.",
    liquidRule: "Follows standard TSA 3-1-1 rule for carry-on liquids and aerosols.",
    specialPolicies: [
      { topic: "Portable Chargers & Power Banks", detail: "Carry-on only. Delta permits up to two spare batteries between 101–160Wh with gate approval." }
    ]
  },
  {
    slug: "united",
    name: "United Airlines",
    carryOnDim: "22 x 14 x 9 in (56 x 35 x 23 cm)",
    carryOnWeight: "No weight limit for standard tickets",
    checkedWeight: "50 lbs (23 kg)",
    personalItem: "17 x 10 x 9 in (43 x 25 x 22 cm)",
    batteryPolicy: "Lithium power banks carry-on only. Basic Economy permits 1 personal item only on domestic US routes.",
    liquidRule: "Standard TSA 3-1-1 liquid limits apply.",
    specialPolicies: [
      { topic: "Deodorant Rules", detail: "Solid stick deodorants have no size limit in carry-on. Spray and gel deodorants must be ≤ 3.4 oz in carry-on." },
      { topic: "Fishing Rod Policy", detail: "Fishing rods and tackle accepted as standard baggage; rods in rigid tubes up to 115 inches accepted." },
      { topic: "Drones & Quadcopters", detail: "Drones permitted in carry-on or checked baggage; drone lithium batteries must stay in cabin luggage." },
      { topic: "Vape & E-Cigarettes", detail: "Permitted in carry-on baggage only; use or charging on aircraft is strictly prohibited." }
    ]
  },
  {
    slug: "british-airways",
    name: "British Airways",
    carryOnDim: "56 x 45 x 25 cm (22 x 18 x 10 in)",
    carryOnWeight: "Generous 23 kg (50 lbs) cabin allowance",
    checkedWeight: "23 kg (50 lbs) or 32 kg (Club/First)",
    personalItem: "40 x 30 x 15 cm",
    batteryPolicy: "Smart bags with non-removable lithium batteries prohibited. Power banks cabin-only.",
    liquidRule: "100ml liquid limits in 1-liter clear bag (Next-gen 3D scanners rolling out across UK hubs).",
    specialPolicies: [
      { topic: "Electric Toothbrushes & Grooming", detail: "Rechargeable electric toothbrushes, beard trimmers, and hair straighteners fully permitted in cabin bags." },
      { topic: "Umbrellas & Coats", detail: "Small folding umbrellas allowed in cabin bags in addition to personal item." }
    ]
  },
  {
    slug: "air-canada",
    name: "Air Canada",
    carryOnDim: "55 x 40 x 23 cm (21.5 x 15.5 x 9 in)",
    carryOnWeight: "No weight limit (must store unassisted)",
    checkedWeight: "23 kg (50 lbs)",
    personalItem: "43 x 33 x 16 cm",
    batteryPolicy: "Lithium battery packs strictly carry-on. Electric toothbrushes and shavers permitted in cabin and checked luggage.",
    liquidRule: "CATSA 3-1-1 liquid rules in effect.",
    specialPolicies: []
  }
];

export const AIRLINE_FAQS: AirlineFAQ[] = [
  {
    q: "What is the 3-1-1 rule on Air France and Singapore Airlines?",
    a: "Both Air France and Singapore Airlines follow international ICAO/TSA liquid rules: all liquids, aerosols, gels, creams, and pastes in cabin baggage must be in containers of 100ml (3.4 oz) or less, enclosed in a single 1-liter transparent resealable plastic bag."
  },
  {
    q: "Can you bring cup noodles on Singapore Airlines?",
    a: "Yes! Dry cup noodles and instant ramen are fully allowed in your carry-on luggage. Flight attendants on long-haul flights can provide hot water upon request when the seatbelt sign is off."
  },
  {
    q: "What are the power bank rules for Air France, Delta, and United?",
    a: "Power banks, external battery packs, and portable phone chargers must ALWAYS be carried in your carry-on baggage. They are strictly banned from checked luggage across all airlines. Standard limit is 100Wh (approx. 27,000mAh) per unit."
  },
  {
    q: "Can I bring AirPods or wireless headphones on flights?",
    a: "Yes, Apple AirPods, Bose noise-canceling headphones, and all wireless earbuds are fully permitted in carry-on bags on all airlines. Keep them in carry-on because their charging cases contain small lithium batteries."
  }
];

export function getAirline(slug: string): AirlineData | undefined {
  return ALL_AIRLINES.find(a => a.slug === slug);
}
