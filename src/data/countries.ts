export interface SpecialRegulation {
  item: string;
  rule: string;
}

export interface CountryData {
  slug: string;
  name: string;
  flag: string;
  agency: string;
  liquidRule: string;
  biosecurity: string;
  medicineRule: string;
  dutyFreeLimit: string;
  specialRegulations: SpecialRegulation[];
}

export interface CountryFAQ {
  q: string;
  a: string;
}

export const ALL_COUNTRIES: CountryData[] = [
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    agency: "CAAS / ICA (Immigration & Checkpoints Authority) & HSA / SFA",
    liquidRule: "Standard 100ml cabin liquid rule for flights departing Changi Airport.",
    biosecurity: "Fresh produce and meat restricted. Packaged food for personal use permitted within SFA guidelines.",
    medicineRule: "Melatonin and standard vitamins are classified as health supplements and permitted for personal use (up to 3 months). Controlled narcotics/tranquilizers require prior HSA approval.",
    dutyFreeLimit: "SGD $500 for stays ≥ 48 hours; SGD $100 for shorter stays. Chewing gum is prohibited.",
    specialRegulations: [
      { item: "Nicotine Pouches & Vapes", rule: "STRICTLY BANNED. E-cigarettes, vaporizers, and tobacco-free nicotine pouches (like ZYN) are illegal to import, possess, or use under Singapore law. Fines up to SGD $2,000 apply at Changi Airport." },
      { item: "Cigarettes & Tobacco", rule: "ZERO duty-free allowance. You MUST declare even a single pack of cigarettes at the Red Channel at Changi Airport and pay excise duty." },
      { item: "Cooking Oil from Malaysia", rule: "Singapore Food Agency (SFA) permits travelers entering from Malaysia to bring up to 5 kg / 5 L of cooking oil for personal consumption without an import permit." },
      { item: "Melatonin & Vitamins", rule: "Melatonin is OTC and legal to bring into Singapore for personal use (up to 3 months supply)." }
    ]
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    agency: "DFT / UK Border Force & MHRA",
    liquidRule: "100ml container limits in 1-liter clear bag (Next-generation 3D CT scanners currently deploying across UK airports).",
    biosecurity: "Strict prohibitions on bringing meat, milk, and plant products from non-EU countries into the UK.",
    medicineRule: "Controlled medications require a personal doctor letter. Melatonin is prescription-only to purchase within the UK, but incoming travelers are permitted to bring up to 3 months personal supply.",
    dutyFreeLimit: "£390 general goods allowance per traveler (£270 if arriving by private boat/plane). Declare cash over £10,000.",
    specialRegulations: [
      { item: "Melatonin & Sleep Aids", rule: "Legal to bring up to a 3-month personal supply through UK customs. Keep in original packaging or with prescription." },
      { item: "Baby Milk & Formula (Stansted/Heathrow)", rule: "Baby milk, sterilised water, breast milk, and baby food are exempt from the 100ml liquid rule when traveling with an infant." },
      { item: "Perfume & Valuables", rule: "Duty-free perfume and engagement rings/jewelry are permitted within the £390 personal goods allowance." },
      { item: "AA Batteries & Electronics", rule: "Standard dry batteries (AA/AAA) and low-power Apple AirTags are fully allowed in cabin and hold baggage." }
    ]
  },
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    agency: "DGAC / French Customs (Douane)",
    liquidRule: "EU liquid rules in effect (≤ 100ml in 1-liter clear bag). Duty-free liquids in STEB bags allowed.",
    biosecurity: "Imports of meat, dairy, and plant products from outside the EU are restricted to prevent agricultural pests.",
    medicineRule: "Personal medications for up to 3 months are permitted. Doctor letter required for narcotics or psychotropics.",
    dutyFreeLimit: "€430 duty-free allowance for air travelers over 15 years old.",
    specialRegulations: [
      { item: "Melatonin Supplements", rule: "Melatonin up to 1.9mg per dose is sold over-the-counter in French pharmacies. Travelers can bring up to a 3-month personal supply." },
      { item: "Vaping & E-Cigarettes", rule: "Personal e-cigarettes and vape liquids (up to 20mg/ml nicotine) are legal in France. Must be carried in cabin baggage." }
    ]
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    agency: "Australian Border Force (ABF) & Department of Agriculture",
    liquidRule: "International flights strictly enforce 100ml liquid container limits in cabin bags.",
    biosecurity: "EXTREME BIOSECURITY. You MUST declare ALL food, nuts, seeds, wooden items, and animal products on your Incoming Passenger Card. Failure to declare results in on-the-spot fines up to AUD $6,260.",
    medicineRule: "Prescription medicines must be declared; max 3-month supply permitted with doctor certificate.",
    dutyFreeLimit: "AUD $900 general goods allowance per adult ($450 per child).",
    specialRegulations: [
      { item: "Cup Noodles & Instant Ramen", rule: "MUST BE DECLARED. Noodles with real meat, egg, or poultry ingredients may be confiscated; vegetarian/seafood broths usually pass." },
      { item: "Cashew Nuts & Almonds", rule: "MUST BE DECLARED. Commercially roasted, packaged nuts with shells removed will clear biosecurity inspection." },
      { item: "Canned Tuna & Seafood", rule: "MUST BE DECLARED. Commercially canned, shelf-stable tuna in hermetically sealed cans is permitted." },
      { item: "Wooden Photo Frames", rule: "MUST BE DECLARED. Manufactured and varnished wood photo frames free of bark and insect holes will clear inspection." },
      { item: "Nail Machines & Tools", rule: "Electric nail drill machines and beauty tools for personal use are permitted without restriction." }
    ]
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    agency: "JCAB / Japan Customs & MHLW",
    liquidRule: "Standard 100ml liquid rule for international arrivals and departures.",
    biosecurity: "Fresh fruits (including bananas and citrus) and meat products strictly prohibited without inspection certificates.",
    medicineRule: "Strict bans on stimulants and pseudoephedrine (Sudafed, Vicks inhalers). Personal prescription supplies up to 1 month permitted with prescription. Melatonin is classified as health food.",
    dutyFreeLimit: "200,000 JPY exemption for personal purchases.",
    specialRegulations: [
      { item: "EpiPen Auto-Injectors", rule: "One EpiPen auto-injector for emergency personal allergy treatment is permitted into Japan without prior Yakkan Shoumei import certificate. Carry doctor prescription." },
      { item: "Melatonin & Creatine", rule: "Melatonin and creatine are classified as food supplements and allowed up to personal amounts without special permits." }
    ]
  },
  {
    slug: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    agency: "Korea Customs Service & Ministry of Food and Drug Safety",
    liquidRule: "Standard 100ml liquid limit in cabin baggage for international departures.",
    biosecurity: "Fresh fruits, beef jerky, raw meat products strictly prohibited. Must declare on arrival.",
    medicineRule: "Melatonin, standard vitamins, and prescription drugs for personal use (up to 6 weeks supply) permitted without special import license.",
    dutyFreeLimit: "$800 USD duty-free allowance per traveler.",
    specialRegulations: [
      { item: "Laptops & iPads in Checked Luggage", rule: "Laptops and tablets are permitted in carry-on (recommended) and checked bags (must be powered completely off)." },
      { item: "Melatonin Sleep Aids", rule: "Permitted into South Korea for personal use up to reasonable supply (6 weeks) through Incheon Airport." }
    ]
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    agency: "TSA / U.S. Customs and Border Protection (CBP)",
    liquidRule: "Standard 3-1-1 Rule (containers ≤ 3.4 oz / 100ml in 1 quart clear bag).",
    biosecurity: "All agricultural items, fresh meats, plants, seeds, and fresh fruits must be declared on arrival.",
    medicineRule: "Prescription medications in original containers recommended. Up to 90-day personal supply permitted.",
    dutyFreeLimit: "$800 exemption per returning resident; currency over $10,000 must be declared on Form FinCEN 105.",
    specialRegulations: [
      { item: "Baby Formula & Food", rule: "Baby formula, breast milk, and baby food in reasonable quantities are exempt from the 3-1-1 liquid rule." },
      { item: "Chocolate & Packaged Snacks", rule: "Commercially packaged chocolates, cookies, and candy are permitted into the US through CBP." }
    ]
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    agency: "CATSA / Canada Border Services Agency (CBSA)",
    liquidRule: "3-1-1 liquids rule enforced at CATSA checkpoints.",
    biosecurity: "Strict biosecurity screening on incoming food, wood, and agricultural products.",
    medicineRule: "Prescription medications must be declared if carrying more than personal 90-day supply.",
    dutyFreeLimit: "CAN $800 exemption for stays over 48 hours. Cannabis is strictly illegal to transport across Canadian international borders.",
    specialRegulations: [
      { item: "Baby Formula Powder & Milk", rule: "Commercially packaged powdered infant formula up to 20 kg per person permitted for personal use." }
    ]
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    agency: "Federal Police (BPOL) / German Customs (Zoll)",
    liquidRule: "EU 100ml liquid rule strictly enforced.",
    biosecurity: "Food imports from non-EU nations restricted (meats, dairy banned).",
    medicineRule: "Medicines for personal travel permitted for up to 3 months' supply.",
    dutyFreeLimit: "€430 exemption for air travelers.",
    specialRegulations: [
      { item: "Cigarette Allowance", rule: "200 cigarettes duty-free allowance for non-EU arrivals over age 17." }
    ]
  }
];

export const COUNTRY_FAQS: CountryFAQ[] = [
  {
    q: "Can I bring melatonin on a plane into the UK?",
    a: "Yes. Even though melatonin requires a prescription to buy in UK pharmacies, UK Border Force and MHRA guidelines legally allow international visitors to bring up to a 3-month personal supply in their carry-on or checked baggage."
  },
  {
    q: "Can you bring nicotine pouches (ZYN) into Singapore through Changi Airport?",
    a: "No. Nicotine pouches, snus, and e-cigarettes are strictly banned under Singapore tobacco analogue laws. Possession or importation at Singapore Changi Airport carries heavy fines up to SGD $2,000."
  },
  {
    q: "Can I bring cup noodles and cashew nuts into Australia?",
    a: "Yes, but you MUST declare all food items on the Australian Incoming Passenger Card. Commercially roasted nuts without shells and vegetarian/seafood instant noodles will clear biosecurity, while noodles containing pork or poultry broths may be seized."
  },
  {
    q: "Can I bring an EpiPen to Japan?",
    a: "Yes! Japan Customs permits travelers to bring 1 personal EpiPen auto-injector for emergency allergy management without requiring advance Yakkan Shoumei paperwork. Keep it with your doctor prescription."
  },
  {
    q: "Is melatonin legal in France?",
    a: "Yes! Melatonin supplements up to 1.9mg are sold over-the-counter in French pharmacies, and travelers can bring up to a 3-month personal supply through customs."
  },
  {
    q: "Can I bring cooking oil from Malaysia to Singapore?",
    a: "Yes. Under Singapore Food Agency (SFA) rules, individuals entering Singapore from Malaysia may bring up to 5 kg / 5 L of cooking oil for personal consumption without a commercial import permit."
  }
];

export function getCountry(slug: string): CountryData | undefined {
  return ALL_COUNTRIES.find(c => c.slug === slug);
}
