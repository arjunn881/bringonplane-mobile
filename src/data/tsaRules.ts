export interface TSATableItem {
  slug: string;
  name: string;
  category: string;
  carryOn: 'ALLOWED' | 'RESTRICTED' | 'NOT_ALLOWED';
  checked: 'ALLOWED' | 'RESTRICTED' | 'NOT_ALLOWED';
  summary: string;
}

export interface TSAFAQ {
  q: string;
  a: string;
}

export const TSA_RULES_HIGHLIGHTS = [
  {
    title: "The 3-1-1 Liquids Rule",
    emoji: "🧴",
    summary: "Containers ≤ 3.4 oz (100ml) in 1 quart-sized clear zip-top bag, 1 bag per passenger.",
    details: "All liquids, gels, creams, pastes, and aerosols packed in carry-on bags must comply with 3-1-1. Full-size bottles are allowed in checked baggage without liquid quantity limits."
  },
  {
    title: "Lithium Batteries & Power Banks",
    emoji: "🔋",
    summary: "Power banks and loose spare lithium batteries MUST be in carry-on baggage. Strictly banned from checked luggage.",
    details: "Devices with installed batteries (laptops, phones, tablets, AirTags) can be in carry-on or checked bags. Spare power banks up to 100Wh require no approval; 101–160Wh require airline approval."
  },
  {
    title: "Powders & Granular Substances",
    emoji: "🧂",
    summary: "Powders > 12 oz (350ml) like protein powder or spices require separate security screening.",
    details: "Powder-like substances in carry-on baggage greater than 350ml must be removed from your bag and placed in a bin for separate X-ray screening and secondary inspection."
  },
  {
    title: "Medications & Infant Liquids Exemption",
    emoji: "👶",
    summary: "Medically necessary liquids and baby formula/milk are exempt from the 3.4 oz limit.",
    details: "You can bring larger amounts of prescription liquid medicine, breast milk, formula, and juice for infants through TSA checkpoints. Declare them to officers before screening begins."
  }
];

export const TSA_TABLE_ITEMS: TSATableItem[] = [
  { slug: "power-bank", name: "Power Bank / Portable Charger", category: "Electronics", carryOn: "ALLOWED", checked: "NOT_ALLOWED", summary: "Must be in carry-on bag. Banned in checked luggage." },
  { slug: "laptop-charger", name: "Laptop Charger & Cables", category: "Electronics", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in both carry-on and checked luggage." },
  { slug: "airtag", name: "Apple AirTag Tracker", category: "Electronics", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in checked and carry-on baggage with CR2032 battery." },
  { slug: "airpods", name: "AirPods & Wireless Earbuds", category: "Electronics", carryOn: "ALLOWED", checked: "RESTRICTED", summary: "Allowed in cabin. Keep case in carry-on due to lithium battery." },
  { slug: "ipad", name: "iPad & Tablets", category: "Electronics", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in carry-on (remove for screening) and checked bags." },
  { slug: "laptop", name: "Laptop Computers", category: "Electronics", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Carry-on strongly recommended. Power down if checking." },
  { slug: "vape", name: "Vape / E-Cigarette", category: "Electronics", carryOn: "ALLOWED", checked: "NOT_ALLOWED", summary: "Carry-on baggage only. Strictly banned in checked bags." },
  { slug: "melatonin", name: "Melatonin & Sleep Aids", category: "Medicine", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Fully allowed in carry-on and checked bags." },
  { slug: "epipen", name: "EpiPen Auto-Injector", category: "Medicine", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in carry-on with medical exemption. Declare at checkpoint." },
  { slug: "cbd-oil", name: "CBD Oil", category: "Medicine", carryOn: "RESTRICTED", checked: "RESTRICTED", summary: "Allowed if under 0.3% THC on dry weight basis." },
  { slug: "contact-lenses", name: "Contact Lenses & Solution", category: "Medicine", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "Saline solution over 3.4 oz is exempt as medical liquid." },
  { slug: "first-aid-kit", name: "First Aid Kit", category: "Health", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed. Ensure scissors have blades under 4 inches." },
  { slug: "razor", name: "Safety / Disposable Razor", category: "Personal Care", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "Disposable cartridge razors allowed. Safety razor blades must be checked." },
  { slug: "sunscreen", name: "Sunscreen Lotion / Spray", category: "Liquids", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "≤ 3.4 oz (100ml) in carry-on. Full size in checked luggage." },
  { slug: "perfume", name: "Perfume / Cologne", category: "Liquids", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "≤ 3.4 oz in carry-on bag. Up to 70 oz in checked luggage." },
  { slug: "toothpaste", name: "Toothpaste", category: "Personal Care", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "Travel size ≤ 3.4 oz in carry-on. Any size in checked bags." },
  { slug: "mascara", name: "Mascara & Liquid Makeup", category: "Beauty", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "Subject to 3-1-1 liquid rule in carry-on bags." },
  { slug: "shampoo", name: "Shampoo & Conditioner", category: "Liquids", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "≤ 3.4 oz in carry-on bag. Any size in checked luggage." },
  { slug: "deodorant", name: "Deodorant (Solid vs Spray)", category: "Personal Care", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Solid stick has no size limit. Spray/gel must be ≤ 3.4 oz." },
  { slug: "bug-spray", name: "Insect Repellent Spray", category: "Health", carryOn: "RESTRICTED", checked: "RESTRICTED", summary: "Aerosols must have protected caps and stay within FAA limits." },
  { slug: "creatine", name: "Creatine Monohydrate", category: "Health", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "Powders over 12 oz (350ml) require separate X-ray screening." },
  { slug: "protein-bar", name: "Protein Bars", category: "Food", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Solid food allowed without restriction in carry-on and checked." },
  { slug: "beef-jerky", name: "Beef Jerky", category: "Food", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed on domestic flights. Declare at international customs." },
  { slug: "instant-noodles", name: "Cup Noodles & Instant Ramen", category: "Food", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Dry noodles allowed. Ask cabin crew for hot water." },
  { slug: "shoes", name: "Shoes & High Heels", category: "Personal Care", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in carry-on and checked. Remove at standard TSA lines." },
  { slug: "extension-cord", name: "Extension Cord & Power Strip", category: "Electronics", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in carry-on and checked baggage." },
  { slug: "jump-rope", name: "Jump Rope / Skipping Rope", category: "Sports", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in cabin baggage and checked luggage." },
  { slug: "umbrella", name: "Umbrella (Folding / Golf)", category: "Personal Care", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Small folding umbrellas allowed in carry-on. Large ones checked." },
  { slug: "tweezers", name: "Tweezers", category: "Personal Care", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in both carry-on and checked baggage." },
  { slug: "scissors", name: "Scissors (Blades < 4 inches)", category: "Tools", carryOn: "RESTRICTED", checked: "ALLOWED", summary: "Allowed in carry-on if blade < 4 in from fulcrum. Any size checked." },
  { slug: "lighter", name: "Disposable / BIC Lighter", category: "Flammables", carryOn: "RESTRICTED", checked: "NOT_ALLOWED", summary: "One common lighter allowed on person. Banned in checked luggage." },
  { slug: "pepper-spray", name: "Pepper Spray / Mace", category: "Tools", carryOn: "NOT_ALLOWED", checked: "RESTRICTED", summary: "Strictly banned in carry-on. Max 4 fl oz in checked with safety cap." },
  { slug: "knife", name: "Pocket Knife / Blade", category: "Tools", carryOn: "NOT_ALLOWED", checked: "ALLOWED", summary: "Strictly prohibited in carry-on bags. Allowed in checked bags." },
  { slug: "tent-stakes", name: "Tent Stakes & Pegs", category: "Camping", carryOn: "NOT_ALLOWED", checked: "ALLOWED", summary: "Prohibited in carry-on luggage. Allowed in checked baggage." },
  { slug: "nicotine-pouches", name: "Nicotine Pouches (ZYN)", category: "Personal Care", carryOn: "ALLOWED", checked: "ALLOWED", summary: "Allowed in carry-on and checked on US flights. Banned in Singapore." }
];

export const TSA_FAQS: TSAFAQ[] = [
  {
    q: "What is the TSA 3-1-1 liquids rule?",
    a: "The TSA 3-1-1 rule states that each passenger may carry liquids, gels, and aerosols in travel-sized containers that are 3.4 ounces (100 milliliters) or less per item, packed in 1 quart-sized, clear plastic, zip-top bag."
  },
  {
    q: "Can I bring medications larger than 3.4 oz?",
    a: "Yes! Medically necessary liquids, gels, and aerosols are exempt from the 3-1-1 liquid limits. You must declare them to TSA officers at the checkpoint before screening."
  },
  {
    q: "Why are power banks banned from checked luggage?",
    a: "Lithium-ion batteries carry a risk of thermal runaway and fire. In the aircraft cabin, crew members have fire-suppression equipment to extinguish fires immediately, whereas cargo holds pose greater danger."
  },
  {
    q: "Do I have to remove electronics from my bag at TSA?",
    a: "In standard TSA lanes, all electronic devices larger than a cell phone (laptops, iPads, tablets, gaming consoles) must be removed and placed in a bin for separate X-ray screening. In TSA PreCheck lanes, electronics usually stay in your bag."
  },
  {
    q: "Are powders allowed through TSA checkpoints?",
    a: "Powder-like substances in quantities greater than 12 ounces (350 ml) — such as protein powders, baby powder, spices, and cosmetics — must undergo separate screening. Keeping powders under 12 oz speeds up security."
  }
];
