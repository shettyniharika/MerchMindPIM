/**
 * MerchMind PIM — Enterprise Fashion Catalog & Taxonomy Master Data
 * Real-world domain data tailored for Luxury Multi-Brand Retail (Brand One, Brand Two, Brand Three).
 */

const BRANDS = {
  ALL: { id: 'all', name: 'Luxury Portfolio', code: 'LXRY', color: '#9a7049' },
  BRAND1: {
    id: 'brand1',
    name: 'Brand One',
    code: 'BR1',
    color: '#9f7422',
    tagline: 'Modern Luxury & Authentic Craftsmanship',
    toneDescription: 'Heritage-rooted, elevated, tactile, timeless luxury sophistication. Emphasizes fine leather quality, artisan stitching, and heirloom durability.'
  },
  BRAND2: {
    id: 'brand2',
    name: 'Brand Two',
    code: 'BR2',
    color: '#be185d',
    tagline: 'Joyful, Expressive & Thoughtfully Detailed',
    toneDescription: 'Playful, vibrant, witty, and warmly conversational. Celebrates optimistic femininity, charming details, and smart functionality.'
  },
  BRAND3: {
    id: 'brand3',
    name: 'Brand Three',
    code: 'BR3',
    color: '#334155',
    tagline: 'Sculptural Elegance & High-Fashion Engineering',
    toneDescription: 'Sleek, architectural, modern silhouettes, and effortless glamour. Centers on precision fit, elevated materials, and statement luxury.'
  }
};


const CHANNEL_RULES = {
  shopify: {
    name: 'Direct-to-Consumer (Shopify Plus)',
    minTitleLength: 20,
    maxTitleLength: 90,
    requiresRomanceCopy: true,
    minBulletPoints: 4,
    requiresMaterialComposition: true,
    requiresDimensions: true,
    weight: 0.4
  },
  wholesale: {
    name: 'Luxury Wholesale (Saks Fifth Avenue & Nordstrom)',
    minTitleLength: 25,
    maxTitleLength: 100,
    requiresRomanceCopy: true,
    minBulletPoints: 5,
    requiresCountryOfOrigin: true,
    requiresCareInstructions: true,
    requiresTariffHarmonizedCode: true,
    weight: 0.35
  },
  marketplaces: {
    name: 'Global Marketplaces (Zalando / Farfetch)',
    minTitleLength: 30,
    maxTitleLength: 120,
    requiresAltText: true,
    requiresGTIN: true,
    requiresColorHex: true,
    requiresSeasonCode: true,
    weight: 0.25
  }
};

const INITIAL_CATALOG = [
  {
    id: 'SKU-BR1-73995',
    sku: 'BR1-73995-BK',
    brand: 'brand1',
    name: 'Cannage Quilted East-West Shoulder Bag',
    season: 'Fall/Winter 2026',
    category: 'Handbags',
    subCategory: 'Shoulder Bags & Hobos',
    taxonomyPath: 'Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags',
    image: 'assets/Brand1Item1.png',
    status: 'needs_review',
    completenessScore: 88,
    aiConfidence: 98,
    retailPriceUSD: 650.00,
    supplierRawData: {
      vendorCode: 'VND-IT-042',
      rawTitle: 'EAST WEST SHOULDER BAG CANNAGE QUILTED LEATHER NOIR W BOW',
      notes: 'Black cannage quilted lambskin east-west shoulder bag with gold grommet eyelets and center bow. Dual slender shoulder straps. Interior silk satin lining with zip pocket. Approx dimensions 11.25 x 5.5 x 3.25 in. Made in Italy.',
      receivedDate: '2026-10-24'
    },
    attributes: {
      silhouette: { value: 'East-West Baguette Shoulder Bag', confidence: 0.99, verified: true },
      primaryMaterial: { value: 'Supple Lambskin Cannage Quilted Leather', confidence: 0.98, verified: true },
      secondaryMaterial: { value: 'Smooth Nappa Leather Binding & Bow', confidence: 0.94, verified: false },
      lining: { value: 'Tonal Silk-Finish Satin Lining', confidence: 0.93, verified: true },
      hardwareFinish: { value: 'High-Polish Pale Gold Eyelets', confidence: 0.97, verified: true },
      closureType: { value: 'Concealed Magnetic Snap Closure', confidence: 0.98, verified: true },
      strapType: { value: 'Dual rolled leather shoulder handles (9.5" drop)', confidence: 0.96, verified: true },
      colorName: { value: 'Noir Black / Pale Gold', confidence: 0.99, verified: true },
      colorHex: { value: '#121212', confidence: 0.99, verified: true },
      dimensions: { value: '11.25" L x 5.5" H x 3.25" W', confidence: 0.95, verified: true },
      weight: { value: '1.35 lbs', confidence: 0.88, verified: false },
      countryOfOrigin: { value: 'Italy', confidence: 0.99, verified: true },
      hsTariffCode: { value: '4202.21.6000', confidence: 0.95, verified: true },
      careInstruction: { value: 'Specialist leather clean only. Store in provided dust bag.', confidence: 0.96, verified: true }
    },
    visualTokens: [
      { label: 'Pale Gold Eyelet Grommets', x: 29, y: 35, confidence: 99 },
      { label: 'Lambskin Bow Detail', x: 50, y: 37, confidence: 98 },
      { label: 'Cannage Quilted Pattern', x: 50, y: 56, confidence: 99 },
      { label: 'Dual Slender Handles', x: 48, y: 72, confidence: 96 },
      { label: 'Structured East-West Profile', x: 19, y: 32, confidence: 97 }
    ],
    copyByBrand: {
      brand1: {
        title: 'Cannage Quilted East-West Leather Shoulder Bag in Noir',
        headline: 'An architectural expression of Parisian couture and timeless geometric quilting.',
        romance: 'Crafted from exquisitely supple lambskin emblazoned with iconic cannage topstitching, this sleek east-west shoulder bag represents modern luxury at its most poised. Punctuated by luminous pale gold eyelets and a delicate leather bow accent, its elongated silhouette carries day-to-evening essentials with effortless distinction.',
        bullets: [
          'Supple Italian lambskin with artisan cannage quilting',
          'Polished pale gold eyelets and center bow ornament',
          'Concealed magnetic snap top closure for quick access',
          'Dual slim leather shoulder handles with comfortable 9.5" drop',
          'Satin-lined interior with dedicated card and zip compartment',
          '11.25" (L) x 5.5" (H) x 3.25" (W)'
        ],
        altText: 'Front studio view of Cannage Quilted East-West shoulder bag in black leather with gold eyelets and bow detail'
      },
      brand2: {
        title: 'The Chic Bow East-West Shoulder Bag in Black',
        headline: 'Because everyday elegance should always come tied with a ribbon.',
        romance: 'Meet the baguette bag of your dreams! Featuring sweet bow details and quilted charm, this compact wonder nestles snugly under your arm from breakfast meetings straight through midnight toast.',
        bullets: [
          'Geometric quilted leather with bow charm detail',
          'Dual shoulder straps designed for all-day comfort',
          'Magnetic closure that keeps valuables safe and secure',
          'Fits sunglasses, compact, smartphone, and lipstick',
          '11.25"w x 5.5"h x 3.25"d'
        ],
        altText: 'Chic black quilted east-west shoulder bag with bow detail'
      },
      brand3: {
        title: 'Architectural Cannage Leather Baguette Bag',
        headline: 'Precision proportions crafted for the modern metropolitan woman.',
        romance: 'Engineered with clean horizontal geometry and high-contrast pale gold eyelet accents, this structured shoulder bag balances statement craftsmanship with streamlined versatility.',
        bullets: [
          'Italian lambskin leather with geometric stitching',
          'Faceted pale gold eyelet architecture',
          'Dual modular shoulder straps',
          'Engineered for effortless day-to-night transitions',
          '11.25" L x 5.5" H x 3.25" W'
        ],
        altText: 'Structured black leather baguette bag with pale gold hardware'
      }
    }
  },
  {
    id: 'SKU-BR2-K8221',
    sku: 'BR2-K8221-BLK',
    brand: 'brand2',
    name: 'Sculpted Kitten Heel Pump with Draped Leather Bow',
    season: 'Spring/Summer 2026',
    category: 'Footwear',
    subCategory: 'Pumps & Slingbacks',
    taxonomyPath: 'Apparel & Accessories > Shoes > Pumps',
    image: 'assets/Brand2Item7.png',
    status: 'enriched',
    completenessScore: 98,
    aiConfidence: 97,
    retailPriceUSD: 495.00,
    supplierRawData: {
      vendorCode: 'VND-IT-019',
      rawTitle: 'POINTED TOE KITTEN HEEL PUMP BLACK NAPPA DRAPED BOW',
      notes: 'Black glove calfskin pointed toe pump with asymmetrical knotted bow across the vamp. Fluted sculptural 50mm kitten heel. Padded leather footbed, buffed leather outsole. Made in Italy.',
      receivedDate: '2026-10-25'
    },
    attributes: {
      silhouette: { value: 'Pointed-Toe Sculptural Kitten Heel', confidence: 0.99, verified: true },
      primaryMaterial: { value: 'Buttery Soft Glove Nappa Leather', confidence: 0.98, verified: true },
      secondaryMaterial: { value: 'Padded Italian Kidskin Footbed', confidence: 0.95, verified: true },
      lining: { value: 'Breathable Leather Lining', confidence: 0.94, verified: true },
      hardwareFinish: { value: 'Tonal Matte Hardware Finish', confidence: 0.95, verified: true },
      closureType: { value: 'Slip-On with Elasticated Inner Gusset', confidence: 0.97, verified: true },
      strapType: { value: 'None (Ergonomic slip-on silhouette)', confidence: 0.99, verified: true },
      colorName: { value: 'Midnight Onyx Black', confidence: 0.99, verified: true },
      colorHex: { value: '#111827', confidence: 0.99, verified: true },
      dimensions: { value: 'Heel Height: 1.95" (50mm) Fluted Heel', confidence: 0.96, verified: true },
      weight: { value: '0.85 lbs per shoe', confidence: 0.92, verified: true },
      countryOfOrigin: { value: 'Italy', confidence: 0.99, verified: true },
      hsTariffCode: { value: '6403.59.9000', confidence: 0.95, verified: true },
      careInstruction: { value: 'Wipe with soft cloth. Buff leather with neutral shoe cream.', confidence: 0.94, verified: true }
    },
    visualTokens: [
      { label: 'Pointed Toe Silhouette', x: 80, y: 76, confidence: 99 },
      { label: 'Draped Knotted Bow Vamp', x: 54, y: 70, confidence: 98 },
      { label: 'Fluted Sculptural Kitten Heel', x: 21, y: 78, confidence: 97 },
      { label: 'Glove Nappa Leather', x: 28, y: 64, confidence: 96 }
    ],
    copyByBrand: {
      brand2: {
        title: 'The Draped Bow Kitten Heel Pump in Midnight Onyx',
        headline: 'Sharp, sweet, and made for dancing down cobblestone boulevards.',
        romance: 'Who says kitten heels have to be quiet? We topped this razor-sharp pointed pump with a fluid, oversized draped bow that feels equal parts whimsical and modern. Perched on a sculptural fluted heel, it gives you that runway lift without missing a beat.',
        bullets: [
          'Plush Italian glove nappa leather with artisanal draped bow',
          'Feminine fluted sculptural heel (50mm / 1.95")',
          'Cushioned memory foam footbed for all-day comfort',
          'Pointed toe engineered to elongate legs effortlessly',
          'Handcrafted in Tuscany, Italy'
        ],
        altText: 'Black leather pointed toe kitten heel pump with draped bow accent'
      },
      brand1: {
        title: 'Artisan Draped Leather Kitten Heel in Onyx',
        headline: 'Tailored feminine elegance meets sculptural footwear engineering.',
        romance: 'Hand-pleated glove leather creates an artful bow over this tapered silhouette. Designed for polished comfort with a balanced sculptural kitten heel.',
        bullets: [
          'Italian glove nappa leather upper',
          'Sculptural fluted heel (50mm)',
          'Leather lining and padded footbed',
          'Buffed leather sole with TPU grip insert'
        ],
        altText: 'Pointed toe black leather kitten heel pump'
      },
      brand3: {
        title: 'The Sculptural Bow Pointed Pump',
        headline: 'Fluid drapery balanced by architectural pointed lines.',
        romance: 'A masterclass in modern footwear silhouette, combining tactile knotted leather with an architectural fluted heel.',
        bullets: [
          'Fine Italian leather craftsmanship',
          'Faceted sculptural kitten heel',
          'Ergonomic balance and stride stability',
          'Made in Italy'
        ],
        altText: 'Luxury black pointed kitten heel with bow detail'
      }
    }
  },
  {
    id: 'SKU-BR3-5050',
    sku: 'BR3-5050-JAC',
    brand: 'brand3',
    name: 'Heritage Monogram Jacquard Slouchy Hobo Carryall',
    season: 'Fall/Winter 2026',
    category: 'Handbags',
    subCategory: 'Shoulder Bags & Hobos',
    taxonomyPath: 'Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags',
    image: 'assets/Brand3Image13.png',
    status: 'enriched',
    completenessScore: 96,
    aiConfidence: 98,
    retailPriceUSD: 780.00,
    supplierRawData: {
      vendorCode: 'VND-IT-008',
      rawTitle: 'MONOGRAM JACQUARD SLOUCHY HOBO WEB STRIPE GG EMBLEM',
      notes: 'Beige and ebony monogram woven canvas slouchy hobo with black calf leather shoulder strap. Signature green and red central web stripe with polished gold emblem. Interior zip compartment and smartphone pocket. Made in Florence, Italy.',
      receivedDate: '2026-10-23'
    },
    attributes: {
      silhouette: { value: 'Slouchy Curved Hobo Carryall', confidence: 0.98, verified: true },
      primaryMaterial: { value: 'Custom Woven Monogram Jacquard Canvas', confidence: 0.99, verified: true },
      secondaryMaterial: { value: 'Smooth Italian Calfskin Trim', confidence: 0.95, verified: true },
      lining: { value: 'Natural Cotton-Linen Canvas Lining', confidence: 0.94, verified: true },
      hardwareFinish: { value: 'Polished Gold Monogram Hardware', confidence: 0.98, verified: true },
      closureType: { value: 'Center Magnetic Clasp with Web Stripe Tab', confidence: 0.97, verified: true },
      strapType: { value: 'Integrated rolled leather shoulder strap (9.0" drop)', confidence: 0.96, verified: true },
      colorName: { value: 'Beige Ebony / Green-Red Web', confidence: 0.99, verified: true },
      colorHex: { value: '#a38f78', confidence: 0.98, verified: true },
      dimensions: { value: '15.5" L x 11.5" H x 4.5" W', confidence: 0.95, verified: true },
      weight: { value: '1.75 lbs', confidence: 0.91, verified: true },
      countryOfOrigin: { value: 'Italy', confidence: 0.99, verified: true },
      hsTariffCode: { value: '4202.12.2900', confidence: 0.96, verified: true },
      careInstruction: { value: 'Spot clean canvas with soft cloth and cold water. Condition leather trim.', confidence: 0.95, verified: true }
    },
    visualTokens: [
      { label: 'Heritage Web Stripe', x: 50, y: 72, confidence: 99 },
      { label: 'Signature Monogram Jacquard', x: 30, y: 60, confidence: 98 },
      { label: 'Polished Gold Emblem', x: 50, y: 58, confidence: 99 },
      { label: 'Curved Leather Shoulder Strap', x: 50, y: 25, confidence: 97 }
    ],
    copyByBrand: {
      brand3: {
        title: 'Heritage Monogram Jacquard Slouchy Hobo Carryall',
        headline: 'An icon of equestrian heritage and timeless Italian craftsmanship.',
        romance: 'Distinguished by our archival monogram jacquard and bisected by the legendary green-and-red web ribbon, this oversized slouchy hobo carries generations of Italian luxury heritage. Sculpted with a curved ergonomic shoulder handle in burnished black calfskin and finished with a gleaming gold brand emblem, it offers generous capacity with quintessential jet-set panache.',
        bullets: [
          'Archival monogram woven canvas with genuine calfskin trim',
          'Signature green and red woven equestrian web stripe',
          'Polished gold emblem magnetic snap closure',
          'Ergonomic integrated leather shoulder strap with 9" drop',
          'Spacious cotton-linen lined interior fits laptop and daily essentials',
          '15.5" (L) x 11.5" (H) x 4.5" (W) | Handcrafted in Italy'
        ],
        altText: 'Monogram jacquard hobo bag with green and red web stripe and black leather handle'
      },
      brand1: {
        title: 'Equestrian Web Monogram Canvas Hobo',
        headline: 'Rich textile heritage meets effortless everyday carryall.',
        romance: 'Crafted from durable woven monogram jacquard framed in fine black calf leather, featuring signature stripe detailing and custom gold hardware.',
        bullets: [
          'Durable woven monogram jacquard',
          'Black calfskin trim and handle',
          'Signature center web ribbon',
          'Interior zip and slip storage compartments',
          '15.5" L x 11.5" H x 4.5" W'
        ],
        altText: 'Designer monogram slouchy hobo bag with web stripe'
      },
      brand2: {
        title: 'The Jet-Set Monogram Slouchy Hobo in Neutral Multi',
        headline: 'Spacious, spirited, and always ready for spontaneous weekend getaways.',
        romance: 'Pack everything you need and look fabulous doing it! This iconic monogram canvas carryall has all the room for books, cosmetics, and your favorite treats.',
        bullets: [
          'Woven monogram canvas with colorful ribbon detail',
          'Soft slouchy shape that molds comfortably to your side',
          'Secure magnetic closure for busy on-the-go days',
          '15.5"w x 11.5"h x 4.5"d'
        ],
        altText: 'Chic monogram canvas hobo shoulder bag with red and green stripe'
      }
    }
  }
];

// PIM Standard Taxonomy Tree for Fashion & Accessories
const PIM_TAXONOMY_TREE = [
  {
    category: 'Handbags & Small Leather Goods',
    nodes: [
      { id: 'satchels', label: 'Satchels & Top-Handles', gs1Code: '10000034' },
      { id: 'crossbody', label: 'Crossbody Bags & Mini Totes', gs1Code: '10000035' },
      { id: 'shoulder', label: 'Shoulder Bags & Hobos', gs1Code: '10000036' },
      { id: 'totes', label: 'Work & Carryall Totes', gs1Code: '10000037' },
      { id: 'clutches', label: 'Clutches & Evening Minaudières', gs1Code: '10000038' },
      { id: 'wallets', label: 'Wallets & Card Cases', gs1Code: '10000039' }
    ]
  },
  {
    category: 'Luxury Footwear',
    nodes: [
      { id: 'ankle_boots', label: 'Ankle Boots & Booties', gs1Code: '20000012' },
      { id: 'tall_boots', label: 'Tall & Over-The-Knee Boots', gs1Code: '20000013' },
      { id: 'pumps', label: 'Pumps & Slingbacks', gs1Code: '20000014' },
      { id: 'sandals', label: 'Strap Sandals & Wedges', gs1Code: '20000015' },
      { id: 'sneakers', label: 'Luxury Casual Sneakers', gs1Code: '20000016' }
    ]
  }
];

// Pre-packaged 18-SKU Luxury Brand Vendor Feed for Ingestion Testing
const RAW_VENDOR_FEED_ITEMS = [
  // --- BRAND ONE (Items 1 - 6) ---
  {
    sku: "BR1-73995-BK",
    brand: "brand1",
    name: "Cannage Quilted East-West Shoulder Bag",
    category: "Handbags",
    subCategory: "Shoulder Bags & Hobos",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags",
    image: "assets/Brand1Item1.png",
    retailPriceUSD: 650.00,
    season: "Fall 2026",
    vendorNotes: "Black cannage quilted lambskin east-west shoulder bag with gold grommet eyelets and center bow. Dual slender shoulder straps. Interior silk satin lining with zip pocket. Approx dimensions 11.25 x 5.5 x 3.25 in. Made in Italy.",
    attributes: {
      silhouette: { value: "East-West Baguette Shoulder Bag", confidence: 0.99, verified: true },
      primaryMaterial: { value: "Supple Lambskin Cannage Quilted Leather", confidence: 0.98, verified: true },
      secondaryMaterial: { value: "Smooth Nappa Leather Binding & Bow", confidence: 0.94, verified: false },
      lining: { value: "Tonal Silk-Finish Satin Lining", confidence: 0.93, verified: true },
      hardwareFinish: { value: "High-Polish Pale Gold Eyelets", confidence: 0.97, verified: true },
      closureType: { value: "Concealed Magnetic Snap Closure", confidence: 0.98, verified: true },
      strapType: { value: 'Dual rolled leather shoulder handles (9.5" drop)', confidence: 0.96, verified: true },
      colorName: { value: "Noir Black / Pale Gold", confidence: 0.99, verified: true },
      colorHex: { value: "#121212", confidence: 0.99, verified: true },
      dimensions: { value: '11.25" L x 5.5" H x 3.25" W', confidence: 0.95, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.21.6000", confidence: 0.95, verified: true },
      careInstruction: { value: "Specialist leather clean only. Store in provided dust bag.", confidence: 0.96, verified: true }
    }
  },
  {
    sku: "BR1-SADL-PNK",
    brand: "brand1",
    name: "Embroidered Lace Jacquard Saddle Bag",
    category: "Handbags",
    subCategory: "Crossbody Bags & Mini Totes",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Crossbody Bags",
    image: "assets/Brand1Item2.png",
    retailPriceUSD: 720.00,
    season: "Spring 2026",
    vendorNotes: "Blossom pink floral embroidered lace jacquard curved saddle bag with delicate white lace trim and gold charm stirrup accents. Smooth calf leather shoulder strap. Dimensions 10.0 x 7.5 x 2.5 in. Origin France.",
    attributes: {
      silhouette: { value: "Curved Equestrian Saddle Bag", confidence: 0.98, verified: true },
      primaryMaterial: { value: "Embroidered Floral Lace Jacquard", confidence: 0.97, verified: true },
      secondaryMaterial: { value: "Smooth Calfskin Leather Trim", confidence: 0.94, verified: true },
      hardwareFinish: { value: "Polished Antique Gold", confidence: 0.95, verified: true },
      closureType: { value: "Magnetic Flap with Stirrup Charm", confidence: 0.96, verified: true },
      colorName: { value: "Blossom Pink / Ivory Lace", confidence: 0.98, verified: true },
      colorHex: { value: "#e8a5b8", confidence: 0.99, verified: true },
      dimensions: { value: '10.0" L x 7.5" H x 2.5" W', confidence: 0.95, verified: true },
      countryOfOrigin: { value: "France", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.22.1500", confidence: 0.93, verified: true },
      careInstruction: { value: "Delicate textile clean. Protect from moisture and direct heat.", confidence: 0.92, verified: true }
    }
  },
  {
    sku: "BR1-FLAP-BLK",
    brand: "brand1",
    name: "Cannage Quilted Flap Bag with Chain Strap",
    category: "Handbags",
    subCategory: "Shoulder Bags & Hobos",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags",
    image: "assets/Brand1Item3.png",
    retailPriceUSD: 790.00,
    season: "Fall 2026",
    vendorNotes: "Black geometric cannage quilted lambskin flap bag with pale gold sliding chain and leather shoulder guard. Push-lock clasp and rear slip pocket. Dimensions 9.75 x 6.5 x 3.0 in. Made in Italy.",
    attributes: {
      silhouette: { value: "Structured Flap Shoulder Bag", confidence: 0.98, verified: true },
      primaryMaterial: { value: "Cannage Quilted Lambskin Leather", confidence: 0.98, verified: true },
      hardwareFinish: { value: "Pale Gold-Tone Chain", confidence: 0.96, verified: true },
      closureType: { value: "Turnlock Push-Clasp Flap", confidence: 0.97, verified: true },
      colorName: { value: "Classic Noir Black", confidence: 0.99, verified: true },
      colorHex: { value: "#18181b", confidence: 0.99, verified: true },
      dimensions: { value: '9.75" L x 6.5" H x 3.0" W', confidence: 0.95, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.21.6000", confidence: 0.96, verified: true },
      careInstruction: { value: "Specialist leather clean. Treat with Leather Moisturizer.", confidence: 0.95, verified: true }
    }
  },
  {
    sku: "BR1-TOTE-CAR",
    brand: "brand1",
    name: "Cannage Quilted Leather Shopping Tote",
    category: "Handbags",
    subCategory: "Work & Carryall Totes",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Totes",
    image: "assets/Brand1Item4.png",
    retailPriceUSD: 850.00,
    season: "Fall 2026",
    vendorNotes: "Caramel warm taupe quilted calfskin tote with double rolled handles. Open top with center clasp. Dimensions 14 x 11 x 5 in. Vendor missing HS tariff code and detailed care tags.",
    attributes: {
      silhouette: { value: "Vertical Quilted Shopper Tote", confidence: 0.92, verified: false },
      primaryMaterial: { value: "Cannage Quilted Calfskin Leather", confidence: 0.95, verified: true },
      secondaryMaterial: { value: "Smooth Nappa Leather Handles", confidence: 0.90, verified: false },
      hardwareFinish: { value: "Pale Gold Finish", confidence: 0.92, verified: false },
      closureType: { value: "Center Bridge Lobster Clasp", confidence: 0.94, verified: false },
      colorName: { value: "Caramel Taupe", confidence: 0.97, verified: true },
      colorHex: { value: "#9a7049", confidence: 0.98, verified: true },
      dimensions: { value: '14.0" L x 11.0" H x 5.0" W', confidence: 0.92, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.95, verified: true }
    }
  },
  {
    sku: "BR1-TWEED-PAS",
    brand: "brand1",
    name: "Pastel Woven Tweed Carryall Tote",
    category: "Handbags",
    subCategory: "Work & Carryall Totes",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Totes",
    image: "assets/Brand1Item5.png",
    retailPriceUSD: 680.00,
    season: "Spring 2026",
    vendorNotes: "Multicolor pastel woven bouclé tweed tote with baby pink leather handles and center bow charm. Sample unit. Missing dimension specs from mill.",
    attributes: {
      silhouette: { value: "Structured Everyday Tweed Tote", confidence: 0.88, verified: false },
      primaryMaterial: { value: "Pastel Woven Bouclé Tweed", confidence: 0.92, verified: false },
      secondaryMaterial: { value: "Smooth Rose Leather Handles", confidence: 0.85, verified: false },
      hardwareFinish: { value: "Polished Gold-Tone", confidence: 0.88, verified: false },
      colorName: { value: "Pastel Multi / Rose", confidence: 0.96, verified: true },
      colorHex: { value: "#f7d7dc", confidence: 0.98, verified: true },
      countryOfOrigin: { value: "France", confidence: 0.92, verified: false }
    }
  },
  {
    sku: "BR1-HOBO-BLK",
    brand: "brand1",
    name: "Cannage Quilted Crescent Hobo Bag",
    category: "Handbags",
    subCategory: "Shoulder Bags & Hobos",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags",
    image: "assets/Brand1Item6.png",
    retailPriceUSD: 695.00,
    season: "Spring 2026",
    vendorNotes: "Black cannage quilted leather crescent hobo bag with chunky gold chain handle. Raw prototype: only initial material and color logged.",
    attributes: {
      silhouette: { value: "Crescent Hobo Bag", confidence: 0.82, verified: false },
      primaryMaterial: { value: "Cannage Quilted Lambskin Leather", confidence: 0.85, verified: false },
      hardwareFinish: { value: "Chunky Gold Chain Links", confidence: 0.80, verified: false },
      colorName: { value: "Onyx Black", confidence: 0.92, verified: true },
      colorHex: { value: "#171717", confidence: 0.95, verified: true }
    }
  },

  // --- BRAND TWO (Items 7 - 12) ---
  {
    sku: "BR2-BOW-KTTN",
    brand: "brand2",
    name: "Knotted Bow Kitten Heel Pointed Pump",
    category: "Footwear",
    subCategory: "Pumps & Slingbacks",
    taxonomyPath: "Apparel & Accessories > Shoes > Pumps",
    image: "assets/Brand2Item7.png",
    retailPriceUSD: 425.00,
    season: "Spring 2026",
    vendorNotes: "Black glove calfskin pointed toe pump with asymmetrical knotted bow across the vamp. Fluted sculptural 50mm kitten heel. Padded leather footbed, buffed leather outsole. Made in Italy.",
    attributes: {
      silhouette: { value: "Pointed-Toe Sculptural Kitten Heel", confidence: 0.99, verified: true },
      primaryMaterial: { value: "Glove Nappa Calf Leather", confidence: 0.98, verified: true },
      secondaryMaterial: { value: "Padded Kidskin Insole", confidence: 0.95, verified: true },
      lining: { value: "Breathable Leather Lining", confidence: 0.94, verified: true },
      closureType: { value: "Slip-On with Ergonomic Gusset", confidence: 0.97, verified: true },
      colorName: { value: "Midnight Noir Black", confidence: 0.99, verified: true },
      colorHex: { value: "#141416", confidence: 0.99, verified: true },
      dimensions: { value: 'Heel Height: 1.95" (50mm) Fluted Heel', confidence: 0.96, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "6403.59.9000", confidence: 0.95, verified: true },
      careInstruction: { value: "Wipe with soft cloth. Buff leather with neutral shoe cream.", confidence: 0.94, verified: true }
    }
  },
  {
    sku: "BR2-DOT-FLAT",
    brand: "brand2",
    name: "Polka Dot Lizard-Embossed Pointed Flat",
    category: "Footwear",
    subCategory: "Flats & Loafers",
    taxonomyPath: "Apparel & Accessories > Shoes > Flats",
    image: "assets/Brand2Item8.png",
    retailPriceUSD: 350.00,
    season: "Spring 2026",
    vendorNotes: "Mustard yellow lizard-embossed leather pointed ballet flat with whimsical black polka dot print. Cushioned leather footbed and 0.5 in heel. Handcrafted in Spain. Missing tariff code.",
    attributes: {
      silhouette: { value: "Pointed Ballet Flat", confidence: 0.95, verified: true },
      primaryMaterial: { value: "Lizard-Embossed Calf Leather", confidence: 0.96, verified: true },
      secondaryMaterial: { value: "Cushioned Kidskin Footbed", confidence: 0.92, verified: false },
      closureType: { value: "Slip-On", confidence: 0.96, verified: true },
      colorName: { value: "Mustard Yellow / Black Dot", confidence: 0.98, verified: true },
      colorHex: { value: "#d49b29", confidence: 0.99, verified: true },
      dimensions: { value: 'Heel Height: 0.5" (15mm)', confidence: 0.94, verified: true },
      countryOfOrigin: { value: "Spain", confidence: 0.98, verified: true },
      careInstruction: { value: "Wipe clean with dry soft cloth. Avoid abrasive cleaners.", confidence: 0.90, verified: false }
    }
  },
  {
    sku: "BR2-PLAT-IVR",
    brand: "brand2",
    name: "Knotted Crossover Satin Platform Sandal",
    category: "Footwear",
    subCategory: "Strap Sandals & Wedges",
    taxonomyPath: "Apparel & Accessories > Shoes > Sandals",
    image: "assets/Brand2Item9.png",
    retailPriceUSD: 495.00,
    season: "Spring 2026",
    vendorNotes: "Bridal ivory duchess satin platform block-heel sandal with twisted knotted crossover straps and adjustable ankle buckle. 110mm heel with 30mm platform. Handcrafted in Italy.",
    attributes: {
      silhouette: { value: "Platform Block-Heel Sandal", confidence: 0.98, verified: true },
      primaryMaterial: { value: "Heavyweight Bridal Duchess Silk Satin", confidence: 0.97, verified: true },
      lining: { value: "Padded Leather Footbed", confidence: 0.92, verified: false },
      hardwareFinish: { value: "Polished Pale Gold Buckle", confidence: 0.96, verified: true },
      closureType: { value: "Adjustable Ankle Strap with Buckle", confidence: 0.98, verified: true },
      colorName: { value: "Ivory Pearl Satin", confidence: 0.99, verified: true },
      colorHex: { value: "#fdfbf7", confidence: 0.99, verified: true },
      dimensions: { value: 'Heel Height: 4.3" (110mm) | Platform: 1.2" (30mm)', confidence: 0.96, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "6404.19.9000", confidence: 0.95, verified: true },
      careInstruction: { value: "Professional textile spot clean only. Store in flannel bag.", confidence: 0.94, verified: true }
    }
  },
  {
    sku: "BR2-LACE-STIL",
    brand: "brand2",
    name: "Floral Guipure Lace Pointed Stiletto Pump",
    category: "Footwear",
    subCategory: "Pumps & Slingbacks",
    taxonomyPath: "Apparel & Accessories > Shoes > Pumps",
    image: "assets/Brand2Item10.png",
    retailPriceUSD: 475.00,
    season: "Spring 2026",
    vendorNotes: "Ivory delicate floral guipure lace pointed stiletto pump with scalloped topline and satin wrapped 85mm heel. Handcrafted in Italy. Missing HS tariff code.",
    attributes: {
      silhouette: { value: "Pointed-Toe Lace Stiletto Pump", confidence: 0.94, verified: true },
      primaryMaterial: { value: "Floral Guipure Lace Textile", confidence: 0.95, verified: true },
      secondaryMaterial: { value: "Silk Satin Wrapped Stiletto Heel", confidence: 0.92, verified: false },
      closureType: { value: "Slip-On", confidence: 0.95, verified: true },
      colorName: { value: "Bridal Ivory Lace", confidence: 0.97, verified: true },
      colorHex: { value: "#faf7f2", confidence: 0.99, verified: true },
      dimensions: { value: 'Heel Height: 3.35" (85mm) Stiletto', confidence: 0.94, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      careInstruction: { value: "Delicate lace care. Brush gently with soft horsehair.", confidence: 0.90, verified: false }
    }
  },
  {
    sku: "BR2-CHANT-BLK",
    brand: "brand2",
    name: "Sheer Chantilly Lace Cap-Toe Stiletto",
    category: "Footwear",
    subCategory: "Pumps & Slingbacks",
    taxonomyPath: "Apparel & Accessories > Shoes > Pumps",
    image: "assets/Brand2Item11.png",
    retailPriceUSD: 465.00,
    season: "Fall 2026",
    vendorNotes: "Black sheer floral chantilly lace pointed pump with black satin cap toe and 90mm stiletto heel. Incomplete factory sheet from Elda factory.",
    attributes: {
      silhouette: { value: "Pointed Stiletto Pump with Cap-Toe", confidence: 0.88, verified: false },
      primaryMaterial: { value: "Sheer Chantilly Lace & Silk Satin", confidence: 0.90, verified: false },
      colorName: { value: "Midnight Black Lace", confidence: 0.95, verified: true },
      colorHex: { value: "#111113", confidence: 0.98, verified: true },
      dimensions: { value: 'Heel Height: 3.5" (90mm)', confidence: 0.88, verified: false },
      countryOfOrigin: { value: "Spain", confidence: 0.92, verified: false }
    }
  },
  {
    sku: "BR2-PRL-MARY",
    brand: "brand2",
    name: "Embellished Pearl Strap Lace d'Orsay Pump",
    category: "Footwear",
    subCategory: "Pumps & Slingbacks",
    taxonomyPath: "Apparel & Accessories > Shoes > Pumps",
    image: "assets/Brand2Item12.png",
    retailPriceUSD: 525.00,
    season: "Spring 2026",
    vendorNotes: "Ivory floral lace d'Orsay pump with faux pearl and crystal embellished Mary Jane arch strap. Raw sample 03. Missing dimensions and origin.",
    attributes: {
      silhouette: { value: "d'Orsay Pointed Mary Jane Pump", confidence: 0.85, verified: false },
      primaryMaterial: { value: "Floral Openwork Lace & Satin", confidence: 0.88, verified: false },
      secondaryMaterial: { value: "Faux Pearl & Crystal Arch Strap", confidence: 0.82, verified: false },
      closureType: { value: "Snap Button on Embellished Strap", confidence: 0.86, verified: false },
      colorName: { value: "Ivory Pearl Embellished", confidence: 0.95, verified: true },
      colorHex: { value: "#fcf9f4", confidence: 0.98, verified: true }
    }
  },

  // --- BRAND THREE (Items 13 - 18) ---
  {
    sku: "BR3-MONO-HOBO",
    brand: "brand3",
    name: "Monogram Jacquard Slouchy Hobo Carryall",
    category: "Handbags",
    subCategory: "Shoulder Bags & Hobos",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags",
    image: "assets/Brand3Image13.png",
    retailPriceUSD: 780.00,
    season: "Fall 2026",
    vendorNotes: "Beige and ebony monogram woven canvas slouchy hobo with black calf leather shoulder strap. Signature green and red central web stripe with polished gold emblem. Interior zip compartment and smartphone pocket. Made in Florence, Italy.",
    attributes: {
      silhouette: { value: "Slouchy Curved Hobo Carryall", confidence: 0.98, verified: true },
      primaryMaterial: { value: "Custom Woven Monogram Jacquard Canvas", confidence: 0.99, verified: true },
      secondaryMaterial: { value: "Smooth Italian Calfskin Trim", confidence: 0.95, verified: true },
      lining: { value: "Natural Cotton-Linen Canvas Lining", confidence: 0.94, verified: true },
      hardwareFinish: { value: "Polished Gold Monogram Hardware", confidence: 0.98, verified: true },
      closureType: { value: "Center Magnetic Clasp with Web Stripe Tab", confidence: 0.97, verified: true },
      colorName: { value: "Beige Ebony / Green-Red Web", confidence: 0.99, verified: true },
      colorHex: { value: "#a38f78", confidence: 0.98, verified: true },
      dimensions: { value: '15.5" L x 11.5" H x 4.5" W', confidence: 0.95, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.12.2900", confidence: 0.96, verified: true },
      careInstruction: { value: "Spot clean canvas with soft cloth and cold water. Condition leather trim.", confidence: 0.95, verified: true }
    }
  },
  {
    sku: "BR3-CRES-SHO",
    brand: "brand3",
    name: "Monogram Crescent Medium Shoulder Bag",
    category: "Handbags",
    subCategory: "Shoulder Bags & Hobos",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Shoulder Bags",
    image: "assets/Brand3Image14.png",
    retailPriceUSD: 690.00,
    season: "Spring 2026",
    vendorNotes: "Beige monogram coated canvas medium crescent shoulder bag with detachable leather shoulder strap and zip top closure. Dimensions 11.5 x 8 x 2.75 in. Handcrafted in Italy.",
    attributes: {
      silhouette: { value: "Crescent Shoulder Bag", confidence: 0.96, verified: true },
      primaryMaterial: { value: "Structured Coated Monogram Canvas", confidence: 0.97, verified: true },
      secondaryMaterial: { value: "Smooth Saddle Leather Trim", confidence: 0.93, verified: false },
      hardwareFinish: { value: "Polished Light Gold", confidence: 0.94, verified: true },
      closureType: { value: "Top Zip Closure with Leather Pull", confidence: 0.96, verified: true },
      colorName: { value: "Canvas Beige Monogram", confidence: 0.98, verified: true },
      colorHex: { value: "#b59a74", confidence: 0.98, verified: true },
      dimensions: { value: '11.5" L x 8.0" H x 2.75" W', confidence: 0.95, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.22.1500", confidence: 0.95, verified: true },
      careInstruction: { value: "Wipe coated canvas with clean damp cloth.", confidence: 0.92, verified: false }
    }
  },
  {
    sku: "BR3-ENV-XBDY",
    brand: "brand3",
    name: "Structured Envelope Flap Crossbody",
    category: "Handbags",
    subCategory: "Crossbody Bags & Mini Totes",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Crossbody Bags",
    image: "assets/Brand3Image15.png",
    retailPriceUSD: 620.00,
    season: "Fall 2026",
    vendorNotes: "Monogram coated canvas envelope crossbody with web shoulder strap and magnetic clasp flap. Dimensions 9 x 6.5 x 2.5 in. Origin Italy. Missing tariff schedule.",
    attributes: {
      silhouette: { value: "Envelope Flap Crossbody", confidence: 0.95, verified: true },
      primaryMaterial: { value: "Coated Monogram Canvas", confidence: 0.96, verified: true },
      secondaryMaterial: { value: "Webbed Textile Shoulder Strap", confidence: 0.90, verified: false },
      hardwareFinish: { value: "Pale Gold Hardware", confidence: 0.94, verified: true },
      closureType: { value: "Magnetic Envelope Snap", confidence: 0.95, verified: true },
      colorName: { value: "Monogram Tan / Gold", confidence: 0.97, verified: true },
      colorHex: { value: "#9c774f", confidence: 0.99, verified: true },
      dimensions: { value: '9.0" L x 6.5" H x 2.5" W', confidence: 0.94, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      careInstruction: { value: "Store in dust bag. Clean with mild damp cloth.", confidence: 0.90, verified: false }
    }
  },
  {
    sku: "BR3-TOTE-WHT",
    brand: "brand3",
    name: "Chalk Monogram Medium Shopper Tote",
    category: "Handbags",
    subCategory: "Work & Carryall Totes",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Totes",
    image: "assets/Brand3Image16.png",
    retailPriceUSD: 740.00,
    season: "Spring 2026",
    vendorNotes: "Chalk white coated canvas shopper tote with subtle tonal monogram and white leather top handles. 13 x 10.5 x 4.5 in. Origin Italy. Care instructions not supplied.",
    attributes: {
      silhouette: { value: "Medium Shopper Tote", confidence: 0.94, verified: true },
      primaryMaterial: { value: "Chalk Coated Monogram Canvas", confidence: 0.95, verified: true },
      secondaryMaterial: { value: "White Boxcalf Leather Handles", confidence: 0.90, verified: false },
      closureType: { value: "Magnetic Bridge Snap", confidence: 0.94, verified: true },
      colorName: { value: "Chalk White / Tonal Monogram", confidence: 0.97, verified: true },
      colorHex: { value: "#f3f1ec", confidence: 0.99, verified: true },
      dimensions: { value: '13.0" L x 10.5" H x 4.5" W', confidence: 0.94, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.12.2900", confidence: 0.94, verified: true }
    }
  },
  {
    sku: "BR3-BSTN-BRN",
    brand: "brand3",
    name: "Horsebit Leather Boston Handbag in Cognac",
    category: "Handbags",
    subCategory: "Satchels & Top-Handles",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Satchels",
    image: "assets/Brand3Image17.png",
    retailPriceUSD: 890.00,
    season: "Fall 2026",
    vendorNotes: "Rich cognac brown smooth calf leather Boston bowler bag with gold horsebit hardware bridge. Two-way top zip. Made in Florence Italy.",
    attributes: {
      silhouette: { value: "Structured Boston Bowler Handbag", confidence: 0.98, verified: true },
      primaryMaterial: { value: "Vegetable-Tanned Smooth Boxcalf Leather", confidence: 0.98, verified: true },
      hardwareFinish: { value: "Equestrian Gold Horsebit", confidence: 0.98, verified: true },
      closureType: { value: "Two-Way Extended Top Zip", confidence: 0.98, verified: true },
      colorName: { value: "Rich Cognac Brown", confidence: 0.99, verified: true },
      colorHex: { value: "#6d381e", confidence: 0.99, verified: true },
      dimensions: { value: '11.0" L x 7.5" H x 5.0" W', confidence: 0.96, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.99, verified: true },
      hsTariffCode: { value: "4202.21.6000", confidence: 0.97, verified: true },
      careInstruction: { value: "Apply luxury leather conditioner every 6 months.", confidence: 0.95, verified: true }
    }
  },
  {
    sku: "BR3-BSTN-WHT",
    brand: "brand3",
    name: "Horsebit Leather Boston Handbag in Chalk",
    category: "Handbags",
    subCategory: "Satchels & Top-Handles",
    taxonomyPath: "Apparel & Accessories > Handbags, Wallets & Cases > Handbags > Satchels",
    image: "assets/Brand3Image18.png",
    retailPriceUSD: 890.00,
    season: "Spring 2026",
    vendorNotes: "Chalk white smooth leather Boston bag with gold horsebit hardware. Initial factory sample run. Missing dimensions and care details.",
    attributes: {
      silhouette: { value: "Structured Boston Bowler Handbag", confidence: 0.88, verified: false },
      primaryMaterial: { value: "Smooth Glazed Boxcalf Leather", confidence: 0.92, verified: false },
      hardwareFinish: { value: "Equestrian Gold Horsebit", confidence: 0.92, verified: false },
      closureType: { value: "Two-Way Extended Top Zip", confidence: 0.94, verified: false },
      colorName: { value: "Chalk White / Polished Gold", confidence: 0.96, verified: true },
      colorHex: { value: "#f8f6f0", confidence: 0.99, verified: true },
      countryOfOrigin: { value: "Italy", confidence: 0.95, verified: true }
    }
  }
];

