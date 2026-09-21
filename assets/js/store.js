// ==========================================================================
// AURELIA LUXE - CENTRAL DATA STORE & REACTIVE DATABASE ENGINE
// ==========================================================================

const STORAGE_KEY = 'aurelia_luxe_store_v1';

const INITIAL_CATEGORIES = [
  { id: 'jewelry', name: 'Handmade Jewelry', count: 48, icon: 'sparkles', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', description: 'Fine artisan gold, filigree, precious gems, and heirloom rings' },
  { id: 'home-decor', name: 'Home Decor', count: 36, icon: 'store', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', description: 'Sculptural centerpieces, handcrafted textiles, and minimalist accents' },
  { id: 'clothing', name: 'Handmade Clothing', count: 24, icon: 'layers', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80', description: 'Tailored pure linen, organic cotton, and handwoven luxury apparel' },
  { id: 'bags', name: 'Artisan Bags', count: 29, icon: 'shopping-bag', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80', description: 'Vegetable-tanned full-grain leather totes, weekenders, and clutches' },
  { id: 'accessories', name: 'Accessories', count: 42, icon: 'bookmark', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', description: 'Pure silk scarves, hand-stitched wallets, and bespoke cuff links' },
  { id: 'art', name: 'Art & Paintings', count: 31, icon: 'camera', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', description: 'Original gold leaf paintings, fine art canvas, and sculptural decor' },
  { id: 'candles', name: 'Candles & Scents', count: 53, icon: 'sparkles', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80', description: 'Hand-poured beeswax and organic coconut wax infused with rare botanicals' },
  { id: 'skincare', name: 'Soaps & Skincare', count: 27, icon: 'shield-check', image: 'https://images.unsplash.com/photo-1607006314144-88481ff23b3a?auto=format&fit=crop&w=600&q=80', description: 'Cold-pressed botanical elixirs, goats milk soaps, and organic balms' },
  { id: 'gifts', name: 'Handmade Gifts', count: 64, icon: 'award', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80', description: 'Personalized bespoke treasures created for milestone celebrations' },
  { id: 'woodcraft', name: 'Wooden Crafts', count: 38, icon: 'package', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80', description: 'Walnut charcuterie boards, keepsake jewelry boxes, and carved bowls' },
  { id: 'pottery', name: 'Pottery & Ceramics', count: 45, icon: 'globe', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80', description: 'Wheel-thrown wabi-sabi stoneware, matcha tea sets, and terracotta vessels' },
  { id: 'crochet', name: 'Crochet & Knitting', count: 19, icon: 'heart', image: 'https://images.unsplash.com/photo-1615887110697-0819ec23465f?auto=format&fit=crop&w=600&q=80', description: 'Chunky merino wool throws, delicate lace doilies, and knit warmth' },
  { id: 'custom', name: 'Custom Products', count: 50, icon: 'edit', image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80', description: 'Commissioned portraits, custom family crests, and engraved heirlooms' },
  { id: 'traditional', name: 'Traditional Crafts', count: 22, icon: 'award', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80', description: 'Indigenous brass work, block-printed textiles, and heritage folk art' }
];

const INITIAL_SHOPS = [
  {
    id: 'atelier-aurelia',
    name: 'Atelier Aurelia',
    slug: 'atelier-aurelia',
    owner: 'Marcus Aurelius',
    sellerEmail: 'marcus@atelier.com',
    status: 'approved',
    verified: true,
    featured: true,
    rating: 4.96,
    reviewCount: 248,
    productCount: 4,
    followerCount: 1840,
    location: 'Florence, Italy',
    established: '2018',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    bio: 'Heirloom jewelry studio dedicated to resurrecting centuries-old Etruscan and Renaissance gold filigree craftsmanship with ethical 24K and 18K solid gold.',
    policies: 'Each piece is hand-forged upon order. Insured worldwide express shipping with signature requirement. 30-day full refund guarantee.'
  },
  {
    id: 'terra-clay',
    name: 'Terra & Clay Studio',
    slug: 'terra-clay',
    owner: 'Elena Rostova',
    sellerEmail: 'elena.rostova@terraclay.com',
    status: 'approved',
    verified: true,
    featured: true,
    rating: 4.92,
    reviewCount: 172,
    productCount: 4,
    followerCount: 940,
    location: 'Kyoto, Japan',
    established: '2020',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    bio: 'Dedicated to the wabi-sabi philosophy of beauty in imperfection. All stoneware is wheel-thrown, wood-fired, and glazed with locally formulated mineral washes.',
    policies: 'Carefully cushioned double-walled packaging. Food-safe, dishwasher safe ceramic items. Replacements provided for in-transit damage.'
  },
  {
    id: 'sylvan-heritage',
    name: 'Sylvan Heritage Woodcraft',
    slug: 'sylvan-heritage',
    owner: 'Julian Thorne',
    sellerEmail: 'julian@sylvanheritage.com',
    status: 'approved',
    verified: true,
    featured: false,
    rating: 4.98,
    reviewCount: 195,
    productCount: 4,
    followerCount: 1250,
    location: 'Black Forest, Germany',
    established: '2016',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    bio: 'Hand-selecting fallen walnut, cherry, and white oak to craft lifelong heirlooms, bespoke valet boxes, and luxury joinery desk accessories.',
    policies: 'Finished with 100% organic beeswax and walnut oil. Lifetime warranty on joinery integrity.'
  },
  {
    id: 'lumina-botanica',
    name: 'Lumina Botanica',
    slug: 'lumina-botanica',
    owner: 'Chloe Vance',
    sellerEmail: 'chloe@luminabotanica.com',
    status: 'approved',
    verified: true,
    featured: true,
    rating: 4.89,
    reviewCount: 312,
    productCount: 4,
    followerCount: 1680,
    location: 'Grasse, France',
    established: '2019',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80',
    bio: 'Sensory perfumes and candles poured in hand-cut amber glass vessels with pure cotton wicks, infused with rare botanicals distilled in Grasse.',
    policies: 'Cruelty-free, vegan soy wax, phthalate-free fragrances. Hand-poured in small batches of 20 units.'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Imperial 24K Gold Filigree Blossom Earrings',
    slug: 'imperial-24k-gold-filigree-blossom-earrings',
    shopId: 'atelier-aurelia',
    shopName: 'Atelier Aurelia',
    category: 'jewelry',
    categoryName: 'Handmade Jewelry',
    price: 340,
    originalPrice: 420,
    discount: 19,
    rating: 4.98,
    reviewsCount: 64,
    stock: 7,
    sku: 'AUR-EAR-001',
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Each pair of Imperial Blossom Earrings is painstakingly hand-woven using micro-fine 24-karat pure gold wire. Inspired by Renaissance palace ornaments, the filigree petals capture light from every angle with breathtaking radiance.',
    materials: 'Solid 24K Gold Wire, 18K Solid Gold Earring Posts & Backings',
    dimensions: '38mm drop length, 18mm blossom diameter',
    weight: '6.4 grams pair',
    shippingInfo: 'Ships within 2 business days in velvet presentation box with certificate of authenticity.',
    returnPolicy: '30-day returns accepted in original unworn condition.',
    variants: [
      { name: 'Finish', options: ['Polished Gold', 'Satin Brushed', 'Antique Patina'] },
      { name: 'Backing', options: ['French Hook', 'Comfort Post & Screw', 'Lever Back'] }
    ]
  },
  {
    id: 'p2',
    name: 'Wabi-Sabi Charcoal Ceramic Matcha Tea Ceremony Set',
    slug: 'wabi-sabi-charcoal-ceramic-matcha-tea-set',
    shopId: 'terra-clay',
    shopName: 'Terra & Clay Studio',
    category: 'pottery',
    categoryName: 'Pottery & Ceramics',
    price: 185,
    originalPrice: 220,
    discount: 16,
    rating: 4.95,
    reviewsCount: 48,
    stock: 12,
    sku: 'TER-MAT-002',
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    customizable: false,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A complete artisanal matcha ceremony set comprising a wheel-thrown chawan (bowl), hand-carved bamboo chasen (whisk), and glazed ceramic whisk stand. The coarse volcanic clay is finished with an iron-rich charcoal tenmoku glaze.',
    materials: 'High-fire Stoneware Clay, Natural Iron Tenmoku Glaze, Golden Bamboo',
    dimensions: 'Chawan: 12.5cm diameter x 7.8cm height (450ml)',
    weight: '680 grams total set',
    shippingInfo: 'Custom styrofoam-free honeycomb pulp packaging. Ships within 1-3 business days.',
    returnPolicy: '14-day hassle-free return on unused teaware.',
    variants: [
      { name: 'Glaze Tone', options: ['Iron Charcoal', 'Olive Ash Glaze', 'Speckled Snow'] }
    ]
  },
  {
    id: 'p3',
    name: 'Hand-Carved Black Walnut Keepsake Box with Brass Inlay',
    slug: 'hand-carved-black-walnut-keepsake-box',
    shopId: 'sylvan-heritage',
    shopName: 'Sylvan Heritage Woodcraft',
    category: 'woodcraft',
    categoryName: 'Wooden Crafts',
    price: 245,
    originalPrice: 290,
    discount: 15,
    rating: 4.99,
    reviewsCount: 52,
    stock: 5,
    sku: 'SYL-BOX-003',
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Sculpted from a single block of sustainably harvested century-old American Black Walnut. Features hidden mortise-and-tenon mitered joinery, pure solid brass geometric inlays, and an Italian plush velvet lining.',
    materials: 'Fallen American Black Walnut, Solid Brass Strip, Black Silk Velvet',
    dimensions: '26cm length x 16cm depth x 9.5cm height',
    weight: '1.2 kg',
    shippingInfo: 'Carefully oiled and waxed before dispatch. Includes custom monogramming card.',
    returnPolicy: 'Lifetime structural craftsmanship warranty.',
    variants: [
      { name: 'Velvet Interior', options: ['Obsidian Black', 'Royal Emerald', 'Burgundy Wine'] },
      { name: 'Size', options: ['Classic (26x16cm)', 'Grand Heirloom (34x22cm)'] }
    ]
  },
  {
    id: 'p4',
    name: 'Oud Royale & Smoked Amber Artisan Soy Candle',
    slug: 'oud-royale-smoked-amber-artisan-soy-candle',
    shopId: 'lumina-botanica',
    shopName: 'Lumina Botanica',
    category: 'candles',
    categoryName: 'Candles & Scents',
    price: 68,
    originalPrice: 85,
    discount: 20,
    rating: 4.91,
    reviewsCount: 94,
    stock: 25,
    sku: 'LUM-CAN-004',
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    customizable: false,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An intoxicating evening candle blending rare Cambodian agarwood (oud), smoked golden amber, black cardamom, and French bourbon vanilla. Hand-poured into thick mouth-blown smoked obsidian glassware with an FSC-certified crackling wood wick.',
    materials: '100% Organic European Soy Wax, Natural Essential Oils, Crackling Wood Wick',
    dimensions: '350g / 12.3 oz. Burn time: 80+ hours',
    weight: '820 grams glass & wax',
    shippingInfo: 'Thermal insulated packaging to prevent heat damage during transit.',
    returnPolicy: '30-day exchange for unburned candles.',
    variants: [
      { name: 'Vessel Finish', options: ['Smoked Obsidian Glass', 'Matte Black Ceramic', 'Frosted Amber'] }
    ]
  },
  {
    id: 'p5',
    name: 'Hand-Stitched Vegetable Tanned Leather Weekender Bag',
    slug: 'hand-stitched-vegetable-tanned-leather-weekender',
    shopId: 'atelier-aurelia',
    shopName: 'Atelier Aurelia',
    category: 'bags',
    categoryName: 'Artisan Bags',
    price: 495,
    originalPrice: 620,
    discount: 20,
    rating: 4.97,
    reviewsCount: 38,
    stock: 4,
    sku: 'AUR-BAG-005',
    isTrending: false,
    isBestSeller: true,
    isNewArrival: true,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Crafted using Tuscan vegetable-tanned 5oz full-grain leather that matures with a legendary patina. Saddle-stitched entirely by hand with waxed linen thread for maximum durability that machine sewing cannot rival.',
    materials: 'Full-Grain Tuscan Cowhide, Solid Cast Brass Hardware, Heavy Waxed Thread',
    dimensions: '52cm x 28cm x 26cm (Carry-on approved)',
    weight: '2.1 kg',
    shippingInfo: 'Includes heavy canvas protective dust bag and leather conditioning balm.',
    returnPolicy: '30 days inspection return. 10-year repair pledge.',
    variants: [
      { name: 'Leather Shade', options: ['Heritage Cognac', 'Dark Chocolate', 'Jet Black'] }
    ]
  },
  {
    id: 'p6',
    name: 'Gilded 24K Gold Leaf Celestial Wall Sculpture',
    slug: 'gilded-24k-gold-leaf-celestial-wall-sculpture',
    shopId: 'atelier-aurelia',
    shopName: 'Atelier Aurelia',
    category: 'art',
    categoryName: 'Art & Paintings',
    price: 580,
    originalPrice: 720,
    discount: 19,
    rating: 5.0,
    reviewsCount: 22,
    stock: 3,
    sku: 'AUR-ART-006',
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A museum-grade round dimensional wall relief displaying the phases of the celestial moon. Gilded with genuine 24K Italian gold leaf over textured plaster and aged with subtle umber glazes.',
    materials: 'Textured Fine Plaster, Hand-applied 24K Gold Leaf, Hardwood Support Ring',
    dimensions: '60cm diameter x 4.5cm depth',
    weight: '3.8 kg',
    shippingInfo: 'Custom wooden crate shipping with reinforced corner blocks.',
    returnPolicy: 'Insured transit guarantee with immediate exchange if damaged.',
    variants: [
      { name: 'Background Shade', options: ['Obsidian Black', 'Midnight Navy', 'Raw Chalk White'] }
    ]
  },
  {
    id: 'p7',
    name: 'Raw Botanical Cold-Pressed Face Elixir & Rose Soap Bar',
    slug: 'raw-botanical-cold-pressed-face-elixir-soap',
    shopId: 'lumina-botanica',
    shopName: 'Lumina Botanica',
    category: 'skincare',
    categoryName: 'Soaps & Skincare',
    price: 74,
    originalPrice: 90,
    discount: 18,
    rating: 4.88,
    reviewsCount: 71,
    stock: 18,
    sku: 'LUM-SKI-007',
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    customizable: false,
    images: [
      'https://images.unsplash.com/photo-1607006314144-88481ff23b3a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608248597359-2169b1897d26?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An organic luxury ritual set featuring our wild cold-pressed Rosehip & Blue Tansy rejuvenating youth oil paired with a 6-week cured cold-process goats milk and French pink clay soap bar.',
    materials: 'Organic Rosehip Seed Oil, Blue Tansy, Jojoba, Goats Milk, French Rose Clay',
    dimensions: 'Elixir: 50ml dropper bottle. Soap: 140g bar',
    weight: '320 grams',
    shippingInfo: 'Eco-friendly compostable box with dried botanical petals.',
    returnPolicy: 'Eligible for return within 30 days if safety seals are intact.',
    variants: [
      { name: 'Formula', options: ['Dry / Sensitive Skin', 'Combination / Radiant Glow'] }
    ]
  },
  {
    id: 'p8',
    name: 'Sculptural Minimalist Terracotta Urn with Gold Trim',
    slug: 'sculptural-minimalist-terracotta-urn-gold-trim',
    shopId: 'terra-clay',
    shopName: 'Terra & Clay Studio',
    category: 'home-decor',
    categoryName: 'Home Decor',
    price: 195,
    originalPrice: 240,
    discount: 19,
    rating: 4.93,
    reviewsCount: 39,
    stock: 8,
    sku: 'TER-URN-008',
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    customizable: false,
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An architectural statement piece handcrafted on a traditional slow wheel. The matte rough terracotta texture provides dramatic contrast against the hand-painted 22K gold luster rim band.',
    materials: 'Tuscan Red Clay, 22K Liquid Gold Luster Finish',
    dimensions: '32cm height x 22cm widest diameter',
    weight: '2.4 kg',
    shippingInfo: 'Double-boxed with bio-degradable cushion suspension. Ships within 2 business days.',
    returnPolicy: '30-day money-back guarantee.',
    variants: [
      { name: 'Colorway', options: ['Earth Terracotta', 'Matte Sandstone', 'Charcoal Slate'] }
    ]
  },
  {
    id: 'p9',
    name: 'Hand-Loomed Pure Mulberry Silk & Cashmere Shawl',
    slug: 'hand-loomed-pure-mulberry-silk-cashmere-shawl',
    shopId: 'atelier-aurelia',
    shopName: 'Atelier Aurelia',
    category: 'clothing',
    categoryName: 'Handmade Clothing',
    price: 260,
    originalPrice: 320,
    discount: 19,
    rating: 4.96,
    reviewsCount: 44,
    stock: 9,
    sku: 'AUR-SHA-009',
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Spun from grade-6A pure mulberry silk and Mongolian highland cashmere on a historic 4-shaft wooden floor loom. Featherlight yet extraordinarily warm, finished with hand-knotted eyelash fringes.',
    materials: '70% Grade-6A Mulberry Silk, 30% Grade-A Mongolian Cashmere',
    dimensions: '200cm length x 75cm width',
    weight: '165 grams',
    shippingInfo: 'Packaged in gilded drawer gift box with cedar moth protection sachet.',
    returnPolicy: '30-day return policy.',
    variants: [
      { name: 'Hue', options: ['Gilded Champagne', 'Midnight Slate', 'Desert Ochre'] }
    ]
  },
  {
    id: 'p10',
    name: 'Artisan End-Grain Walnut & Maple Butcher Block',
    slug: 'artisan-end-grain-walnut-maple-butcher-block',
    shopId: 'sylvan-heritage',
    shopName: 'Sylvan Heritage Woodcraft',
    category: 'woodcraft',
    categoryName: 'Wooden Crafts',
    price: 210,
    originalPrice: 260,
    discount: 19,
    rating: 4.98,
    reviewsCount: 82,
    stock: 11,
    sku: 'SYL-BLO-010',
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An heirloom culinary board built from hundreds of individual end-grain blocks of sustainably logged Black Walnut and Rock Maple. End-grain construction preserves knife edges and self-heals cut marks.',
    materials: 'Black Walnut, Hard Rock Maple, Food-Safe Organic Beeswax & Mineral Oil',
    dimensions: '45cm x 35cm x 4.5cm thickness',
    weight: '4.8 kg',
    shippingInfo: 'Pre-seasoned and sealed. Includes complementary tin of Sylvan Wood Balm.',
    returnPolicy: 'Lifetime structural replacement guarantee.',
    variants: [
      { name: 'Juice Groove', options: ['With Deep Juice Groove', 'Smooth Flat Surface'] }
    ]
  },
  {
    id: 'p11',
    name: 'Handmade 18K Solid Gold Constellation Signet Ring',
    slug: 'handmade-18k-gold-constellation-signet-ring',
    shopId: 'atelier-aurelia',
    shopName: 'Atelier Aurelia',
    category: 'jewelry',
    categoryName: 'Handmade Jewelry',
    price: 420,
    originalPrice: 490,
    discount: 14,
    rating: 4.97,
    reviewsCount: 56,
    stock: 6,
    sku: 'AUR-RIN-011',
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Custom hand-carved in wax and lost-wax cast in solid 18-karat recycled yellow gold. Flush-set with three conflict-free brilliant lab-grown diamonds representing your chosen zodiac constellation.',
    materials: 'Solid 18K Yellow Gold (5.2g), VS1 Colorless Diamonds (0.06 tcw)',
    dimensions: 'Signet face: 11mm x 9mm oval',
    weight: '5.2 grams',
    shippingInfo: 'Custom ring sizing included free of charge. Ships in luxury leather box.',
    returnPolicy: '30-day exchange or resizing.',
    variants: [
      { name: 'Ring Size', options: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'] },
      { name: 'Constellation', options: ['Ursa Major', 'Cassiopeia', 'Orion', 'Pleiades'] }
    ]
  },
  {
    id: 'p12',
    name: 'Chunky Merino Wool Hand-Knitted Gilded Accent Blanket',
    slug: 'chunky-merino-wool-hand-knitted-blanket',
    shopId: 'sylvan-heritage',
    shopName: 'Sylvan Heritage Woodcraft',
    category: 'crochet',
    categoryName: 'Crochet & Knitting',
    price: 175,
    originalPrice: 220,
    discount: 20,
    rating: 4.89,
    reviewsCount: 33,
    stock: 8,
    sku: 'SYL-KNI-012',
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    customizable: false,
    images: [
      'https://images.unsplash.com/photo-1615887110697-0819ec23465f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Hand-arm knitted using 100% natural, unspun 21-micron Australian Merino wool. Immensely soft, hypoallergenic, and naturally temperature-regulating, with subtle gold metallic thread accents interwoven.',
    materials: '100% Pure Australian Merino Wool, Lurex Metallic Gold Thread',
    dimensions: '130cm x 170cm (Throw size)',
    weight: '3.2 kg',
    shippingInfo: 'Vacuum sealed for protection; naturally fluffs to full plushness within 1 hour.',
    returnPolicy: '14-day unworn return guarantee.',
    variants: [
      { name: 'Color', options: ['Oatmeal Cream', 'Charcoal Heather', 'Dusty Rose'] }
    ]
  }
];

const INITIAL_USERS = {
  customer: {
    id: 'usr-customer-1',
    role: 'CUSTOMER',
    name: 'Elena Vance',
    email: 'elena@aurelia.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    address: '742 Evergreen Terrace, Suite 400',
    city: 'Beverly Hills',
    state: 'California',
    country: 'United States',
    pincode: '90210',
    rewardPoints: 480,
    ordersCount: 4,
    wishlistCount: 3
  },
  seller: {
    id: 'usr-seller-1',
    role: 'SELLER',
    name: 'Marcus Aurelius',
    email: 'marcus@atelier.com',
    phone: '+39 055 987654',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    shopId: 'atelier-aurelia',
    shopName: 'Atelier Aurelia',
    address: 'Via de Tornabuoni 14',
    city: 'Florence',
    state: 'Tuscany',
    country: 'Italy',
    pincode: '50123'
  },
  admin: {
    id: 'usr-admin-1',
    role: 'ADMIN',
    name: 'Aurelia Supreme Admin',
    email: 'admin@aurelia.com',
    phone: '+1 (800) 888-AURELIA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  }
};

const INITIAL_ORDERS = [
  {
    id: 'AUR-89241',
    date: '2026-09-19',
    timestamp: 'September 19, 2026 - 14:32',
    customerId: 'usr-customer-1',
    customerName: 'Elena Vance',
    customerEmail: 'elena@aurelia.com',
    items: [
      {
        productId: 'p1',
        name: 'Imperial 24K Gold Filigree Blossom Earrings',
        shopId: 'atelier-aurelia',
        shopName: 'Atelier Aurelia',
        price: 340,
        quantity: 1,
        variant: 'Polished Gold / French Hook',
        customText: 'Initials: E.V.',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=200&q=80'
      },
      {
        productId: 'p4',
        name: 'Oud Royale & Smoked Amber Artisan Soy Candle',
        shopId: 'lumina-botanica',
        shopName: 'Lumina Botanica',
        price: 68,
        quantity: 2,
        variant: 'Smoked Obsidian Glass',
        customText: '',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=200&q=80'
      }
    ],
    subtotal: 476,
    discount: 50,
    tax: 21.30,
    shipping: 0,
    total: 447.30,
    commissionFee: 47.60,
    netSellerAmount: 428.40,
    status: 'Shipped',
    trackingNumber: 'AUR-EXP-889421',
    carrier: 'DHL Luxury Express Insured',
    estimatedDelivery: 'September 24, 2026',
    shippingAddress: {
      fullName: 'Elena Vance',
      address: '742 Evergreen Terrace, Suite 400',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'USA',
      pincode: '90210',
      phone: '+1 (555) 234-5678'
    },
    paymentMethod: 'Credit Card (•••• 4242)',
    timeline: [
      { stage: 'Order Placed', time: 'Sep 19, 02:32 PM', done: true, desc: 'Payment verified and order submitted to artisans' },
      { stage: 'Confirmed', time: 'Sep 19, 03:15 PM', done: true, desc: 'Artisans accepted commission & allocated stock' },
      { stage: 'Processing & Handcrafting', time: 'Sep 20, 10:00 AM', done: true, desc: 'Engraving applied, final luster polish & packaging' },
      { stage: 'Shipped', time: 'Sep 21, 08:30 AM', done: true, desc: 'Package scanned at Milan International Air Hub' },
      { stage: 'Out for Delivery', time: 'Estimated Sep 24', done: false, desc: 'Local courier dispatch with direct signature' },
      { stage: 'Delivered', time: 'Pending', done: false, desc: 'Delivered to recipient address' }
    ]
  },
  {
    id: 'AUR-87119',
    date: '2026-09-12',
    timestamp: 'September 12, 2026 - 11:18',
    customerId: 'usr-customer-1',
    customerName: 'Elena Vance',
    customerEmail: 'elena@aurelia.com',
    items: [
      {
        productId: 'p2',
        name: 'Wabi-Sabi Charcoal Ceramic Matcha Tea Ceremony Set',
        shopId: 'terra-clay',
        shopName: 'Terra & Clay Studio',
        price: 185,
        quantity: 1,
        variant: 'Iron Charcoal',
        customText: '',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80'
      }
    ],
    subtotal: 185,
    discount: 0,
    tax: 9.25,
    shipping: 15,
    total: 209.25,
    commissionFee: 18.50,
    netSellerAmount: 166.50,
    status: 'Delivered',
    trackingNumber: 'TER-KYOTO-4491',
    carrier: 'FedEx International Priority',
    estimatedDelivery: 'September 16, 2026',
    shippingAddress: {
      fullName: 'Elena Vance',
      address: '742 Evergreen Terrace, Suite 400',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'USA',
      pincode: '90210',
      phone: '+1 (555) 234-5678'
    },
    paymentMethod: 'UPI / Digital Wallet',
    timeline: [
      { stage: 'Order Placed', time: 'Sep 12, 11:18 AM', done: true, desc: 'Order verified' },
      { stage: 'Confirmed', time: 'Sep 12, 12:00 PM', done: true, desc: 'Studio confirmed order' },
      { stage: 'Processing & Handcrafting', time: 'Sep 13, 09:30 AM', done: true, desc: 'Item packaged in protective wood box' },
      { stage: 'Shipped', time: 'Sep 14, 08:00 AM', done: true, desc: 'In transit via Tokyo Narita' },
      { stage: 'Out for Delivery', time: 'Sep 16, 09:15 AM', done: true, desc: 'Out with local courier' },
      { stage: 'Delivered', time: 'Sep 16, 02:40 PM', done: true, desc: 'Signed by Elena Vance' }
    ]
  }
];

const INITIAL_COUPONS = [
  { code: 'AURELIA15', type: 'percentage', discount: 15, minOrder: 100, maxDiscount: 100, description: '15% Off Your Entire Luxury Order (Min $100)' },
  { code: 'GOLDEN10', type: 'percentage', discount: 10, minOrder: 50, maxDiscount: 50, description: '10% Welcome Discount for New Patrons' },
  { code: 'LUXE50', type: 'fixed', discount: 50, minOrder: 250, maxDiscount: 50, description: '$50 Instant Savings on Orders Above $250' }
];

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'p1',
    customerName: 'Claire D.',
    rating: 5,
    date: '3 days ago',
    comment: 'The filigree craftsmanship is beyond words. In sunlight, the 24K gold shines with an ethereal warmth you never see in mass jewelry. The presentation box was sublime.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80'],
    sellerReply: 'Thank you, Claire. It took over 14 hours of delicate wire weaving to shape those petals. Enjoy wearing them! — Marcus Aurelius'
  },
  {
    id: 'rev-2',
    productId: 'p2',
    customerName: 'David K.',
    rating: 5,
    date: '1 week ago',
    comment: 'The chawan bowl feels weighted and grounded in your palms. The charcoal iron glaze has subtle mineral speckles. A sacred addition to my morning tea practice.',
    images: [],
    sellerReply: 'Honored that our work brings serenity to your tea ritual, David. Arigato gozaimasu.'
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', targetRole: 'CUSTOMER', title: 'Order Dispatched', message: 'Your order #AUR-89241 has been dispatched with DHL Luxury Express.', time: '2 hours ago', unread: true },
  { id: 'notif-2', targetRole: 'CUSTOMER', title: 'Artisan Followed', message: 'Atelier Aurelia just added a new creation: Constellation Signet Ring.', time: '1 day ago', unread: false },
  { id: 'notif-3', targetRole: 'SELLER', title: 'New Order Received', message: 'New order #AUR-89241 for Imperial Earrings ($340.00). Please verify handcrafting schedule.', time: '2 days ago', unread: true },
  { id: 'notif-4', targetRole: 'SELLER', title: 'Payout Processed', message: 'Your weekly payout of $1,840.50 has been transferred to your connected IBAN.', time: '3 days ago', unread: false },
  { id: 'notif-5', targetRole: 'ADMIN', title: 'New Seller Verification', message: 'Sylvan Heritage submitted official Master Guild credentials for review.', time: '4 hours ago', unread: true },
  { id: 'notif-6', targetRole: 'ADMIN', title: 'Platform Commission Accrued', message: 'Total platform revenue reached $48,290.00 this month (+18.4%).', time: '1 day ago', unread: false }
];

const INITIAL_TICKETS = [
  { id: 'TCK-104', user: 'Elena Vance', role: 'CUSTOMER', subject: 'Custom Gold Inscription Inquiry', status: 'In Progress', priority: 'Medium', date: '2026-09-20', messages: [{ sender: 'Elena Vance', text: 'Can the signet ring have Roman numerals engraved inside the band?' }] },
  { id: 'TCK-102', user: 'Marcus Aurelius', role: 'SELLER', subject: 'Express Courier Integration In Florence', status: 'Resolved', priority: 'Low', date: '2026-09-17', messages: [{ sender: 'Marcus Aurelius', text: 'Thank you for updating our DHL account credentials.' }] }
];

// --------------------------------------------------------------------------
// STATE STORE CLASS
// --------------------------------------------------------------------------

class AureliaStore {
  constructor() {
    this.listeners = [];
    this.load();
  }

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.state = parsed;
        return;
      } catch (e) {
        console.error('Failed to load store, resetting to initial', e);
      }
    }

    this.state = {
      currentUser: INITIAL_USERS.customer,
      cart: [
        {
          productId: 'p1',
          quantity: 1,
          variant: 'Polished Gold / French Hook',
          customText: 'Initials: E.V.'
        },
        {
          productId: 'p4',
          quantity: 2,
          variant: 'Smoked Obsidian Glass',
          customText: ''
        }
      ],
      appliedCoupon: null,
      wishlist: ['p1', 'p2', 'p5'],
      categories: INITIAL_CATEGORIES,
      shops: INITIAL_SHOPS,
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      notifications: INITIAL_NOTIFICATIONS,
      tickets: INITIAL_TICKETS,
      settings: {
        platformCommission: 10, // 10% platform fee
        taxRate: 5,             // 5% tax
        shippingFlatRate: 15,
        freeShippingThreshold: 150,
        currency: '$'
      },
      auditLogs: [
        { time: '2026-09-21 04:30', action: 'Platform Initialization', user: 'System' },
        { time: '2026-09-20 18:22', action: 'Shop Approved: Atelier Aurelia', user: 'Admin' }
      ]
    };
    this.save();
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // --- AUTH METHODS ---
  getCurrentUser() {
    return this.state.currentUser;
  }

  switchRole(role) {
    if (role === 'CUSTOMER') {
      this.state.currentUser = INITIAL_USERS.customer;
    } else if (role === 'SELLER') {
      this.state.currentUser = INITIAL_USERS.seller;
    } else if (role === 'ADMIN') {
      this.state.currentUser = INITIAL_USERS.admin;
    }
    this.save();
  }

  login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.includes('admin')) {
      this.state.currentUser = INITIAL_USERS.admin;
    } else if (cleanEmail.includes('marcus') || cleanEmail.includes('atelier') || cleanEmail.includes('seller')) {
      this.state.currentUser = INITIAL_USERS.seller;
    } else {
      this.state.currentUser = {
        ...INITIAL_USERS.customer,
        email: cleanEmail
      };
    }
    this.save();
    return this.state.currentUser;
  }

  registerCustomer(data) {
    this.state.currentUser = {
      id: 'usr-cust-' + Date.now(),
      role: 'CUSTOMER',
      name: data.fullName,
      email: data.email,
      phone: data.phone || '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      country: data.country || 'United States',
      pincode: data.pincode || '',
      rewardPoints: 100,
      ordersCount: 0,
      wishlistCount: 0
    };
    this.save();
    return this.state.currentUser;
  }

  registerSeller(data) {
    const slug = data.shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newShop = {
      id: slug,
      slug: slug,
      name: data.shopName,
      owner: data.fullName,
      sellerEmail: data.email,
      status: 'approved', // auto-approved for instant demo experience
      verified: true,
      featured: false,
      rating: 5.0,
      reviewCount: 0,
      productCount: 0,
      followerCount: 1,
      location: `${data.city || 'Florence'}, ${data.country || 'Italy'}`,
      established: '2026',
      avatar: data.logo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      coverImage: data.cover || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      bio: data.shopDescription || 'Handmade luxury creations crafted with supreme patience and authentic materials.',
      policies: 'Handmade with care. Standard 30-day returns accepted.'
    };

    this.state.shops.unshift(newShop);

    this.state.currentUser = {
      id: 'usr-seller-' + Date.now(),
      role: 'SELLER',
      name: data.fullName,
      email: data.email,
      phone: data.phone || '',
      shopId: slug,
      shopName: data.shopName,
      avatar: newShop.avatar,
      city: data.city,
      country: data.country
    };

    this.state.auditLogs.unshift({
      time: new Date().toISOString().replace('T', ' ').slice(0, 16),
      action: `New Seller Registered: ${data.shopName}`,
      user: data.fullName
    });

    this.save();
    return this.state.currentUser;
  }

  logout() {
    this.state.currentUser = null;
    this.save();
  }

  // --- CART METHODS ---
  getCart() {
    return this.state.cart.map(item => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product
      };
    }).filter(item => item.product);
  }

  getCartTotals() {
    const items = this.getCart();
    let subtotal = 0;
    for (const it of items) {
      subtotal += (it.product.price * it.quantity);
    }

    let discount = 0;
    if (this.state.appliedCoupon) {
      const cp = this.state.appliedCoupon;
      if (cp.type === 'percentage') {
        discount = Math.min((subtotal * cp.discount) / 100, cp.maxDiscount);
      } else if (cp.type === 'fixed') {
        discount = Math.min(cp.discount, subtotal);
      }
    }

    const freeShipping = subtotal >= this.state.settings.freeShippingThreshold;
    const shipping = items.length === 0 ? 0 : (freeShipping ? 0 : this.state.settings.shippingFlatRate);
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * (this.state.settings.taxRate / 100) * 100) / 100;
    const total = Math.max(0, taxable + shipping + tax);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      shipping,
      freeShipping,
      tax,
      total: Math.round(total * 100) / 100,
      count: items.reduce((acc, curr) => acc + curr.quantity, 0)
    };
  }

  addToCart(productId, quantity = 1, variant = '', customText = '') {
    const existingIndex = this.state.cart.findIndex(
      it => it.productId === productId && it.variant === variant && it.customText === customText
    );
    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({ productId, quantity, variant, customText });
    }
    this.save();
  }

  updateCartQuantity(index, quantity) {
    if (quantity <= 0) {
      this.state.cart.splice(index, 1);
    } else {
      this.state.cart[index].quantity = quantity;
    }
    this.save();
  }

  removeFromCart(index) {
    this.state.cart.splice(index, 1);
    this.save();
  }

  clearCart() {
    this.state.cart = [];
    this.state.appliedCoupon = null;
    this.save();
  }

  applyCoupon(code) {
    const cleanCode = code.trim().toUpperCase();
    const coupon = this.state.coupons.find(c => c.code === cleanCode);
    if (!coupon) {
      return { success: false, message: 'Invalid or expired promotion code' };
    }
    const totals = this.getCartTotals();
    if (totals.subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order of $${coupon.minOrder} required for coupon ${cleanCode}` };
    }
    this.state.appliedCoupon = coupon;
    this.save();
    return { success: true, message: `Coupon ${cleanCode} successfully applied!` };
  }

  removeCoupon() {
    this.state.appliedCoupon = null;
    this.save();
  }

  // --- WISHLIST METHODS ---
  getWishlist() {
    return this.state.wishlist.map(id => this.getProductById(id)).filter(Boolean);
  }

  isWishlisted(productId) {
    return this.state.wishlist.includes(productId);
  }

  toggleWishlist(productId) {
    if (this.isWishlisted(productId)) {
      this.state.wishlist = this.state.wishlist.filter(id => id !== productId);
    } else {
      this.state.wishlist.push(productId);
    }
    this.save();
    return this.isWishlisted(productId);
  }

  // --- PRODUCT METHODS ---
  getProducts() {
    return this.state.products;
  }

  getProductById(id) {
    return this.state.products.find(p => p.id === id || p.slug === id);
  }

  getProductsByShop(shopId) {
    return this.state.products.filter(p => p.shopId === shopId);
  }

  getProductsByCategory(categorySlug) {
    return this.state.products.filter(p => p.category === categorySlug);
  }

  addProduct(productData) {
    const newId = 'p' + (this.state.products.length + 1);
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct = {
      id: newId,
      slug,
      name: productData.name,
      shopId: productData.shopId || (this.state.currentUser?.shopId || 'atelier-aurelia'),
      shopName: productData.shopName || (this.state.currentUser?.shopName || 'Atelier Aurelia'),
      category: productData.category || 'jewelry',
      categoryName: productData.categoryName || 'Handmade Jewelry',
      price: parseFloat(productData.price) || 100,
      originalPrice: parseFloat(productData.originalPrice) || parseFloat(productData.price) || 120,
      discount: productData.discount || 0,
      rating: 5.0,
      reviewsCount: 0,
      stock: parseInt(productData.stock) || 10,
      sku: productData.sku || `AUR-${Math.floor(1000 + Math.random() * 9000)}`,
      isTrending: false,
      isBestSeller: false,
      isNewArrival: true,
      customizable: !!productData.customizable,
      images: productData.images?.length ? productData.images : ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'],
      description: productData.description || 'Masterfully crafted handmade edition.',
      materials: productData.materials || 'Authentic artisan materials',
      dimensions: productData.dimensions || 'Bespoke standard size',
      weight: productData.weight || '500g',
      shippingInfo: productData.shippingInfo || 'Dispatched within 2-3 business days in gift presentation box.',
      returnPolicy: productData.returnPolicy || '30-day guarantee.',
      variants: productData.variants || []
    };

    this.state.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const index = this.state.products.findIndex(p => p.id === id);
    if (index > -1) {
      this.state.products[index] = {
        ...this.state.products[index],
        ...updatedFields
      };
      this.save();
      return this.state.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    this.state.products = this.state.products.filter(p => p.id !== id);
    this.save();
  }

  // --- SHOP METHODS ---
  getShops() {
    return this.state.shops;
  }

  getShopById(id) {
    return this.state.shops.find(s => s.id === id || s.slug === id);
  }

  updateShop(shopId, data) {
    const index = this.state.shops.findIndex(s => s.id === shopId || s.slug === shopId);
    if (index > -1) {
      this.state.shops[index] = { ...this.state.shops[index], ...data };
      this.save();
      return this.state.shops[index];
    }
    return null;
  }

  // --- ORDER METHODS ---
  getOrders() {
    return this.state.orders;
  }

  getOrderById(id) {
    return this.state.orders.find(o => o.id === id);
  }

  createOrder(shippingAddress, paymentMethod) {
    const cartTotals = this.getCartTotals();
    const cartItems = this.getCart();

    const orderId = 'AUR-' + Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const platformFee = Math.round((cartTotals.subtotal * (this.state.settings.platformCommission / 100)) * 100) / 100;
    const netSellerAmount = Math.round((cartTotals.subtotal - platformFee) * 100) / 100;

    const newOrder = {
      id: orderId,
      date: dateStr,
      timestamp: timeStr,
      customerId: this.state.currentUser?.id || 'guest',
      customerName: shippingAddress.fullName,
      customerEmail: shippingAddress.email || this.state.currentUser?.email || 'guest@aurelia.com',
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.product.name,
        shopId: item.product.shopId,
        shopName: item.product.shopName,
        price: item.product.price,
        quantity: item.quantity,
        variant: item.variant,
        customText: item.customText,
        image: item.product.images[0]
      })),
      subtotal: cartTotals.subtotal,
      discount: cartTotals.discount,
      tax: cartTotals.tax,
      shipping: cartTotals.shipping,
      total: cartTotals.total,
      commissionFee: platformFee,
      netSellerAmount: netSellerAmount,
      status: 'Confirmed',
      trackingNumber: 'AUR-EXP-' + Math.floor(100000 + Math.random() * 900000),
      carrier: 'DHL Luxury Express Insured',
      estimatedDelivery: 'In 3-5 business days',
      shippingAddress: { ...shippingAddress },
      paymentMethod: paymentMethod || 'Credit Card',
      timeline: [
        { stage: 'Order Placed', time: timeStr, done: true, desc: 'Payment verified and order submitted to artisans' },
        { stage: 'Confirmed', time: 'Just now', done: true, desc: 'Artisans acknowledged order' },
        { stage: 'Processing & Handcrafting', time: 'Pending', done: false, desc: 'Handcrafted with personalized details' },
        { stage: 'Shipped', time: 'Pending', done: false, desc: 'Dispatched via insured priority courier' },
        { stage: 'Out for Delivery', time: 'Pending', done: false, desc: 'Out for final delivery with direct signature' },
        { stage: 'Delivered', time: 'Pending', done: false, desc: 'Safely delivered to customer' }
      ]
    };

    this.state.orders.unshift(newOrder);

    // Add notifications
    this.state.notifications.unshift({
      id: 'notif-' + Date.now(),
      targetRole: 'CUSTOMER',
      title: 'Order Confirmed',
      message: `Your order #${orderId} for $${cartTotals.total.toFixed(2)} has been placed successfully!`,
      time: 'Just now',
      unread: true
    });

    this.state.notifications.unshift({
      id: 'notif-' + (Date.now() + 1),
      targetRole: 'SELLER',
      title: 'New Customer Order',
      message: `New order #${orderId} received for $${cartTotals.subtotal.toFixed(2)}.`,
      time: 'Just now',
      unread: true
    });

    this.clearCart();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      const stageMap = {
        'Confirmed': 1,
        'Processing': 2,
        'Shipped': 3,
        'Out for Delivery': 4,
        'Delivered': 5
      };
      const stageIndex = stageMap[newStatus] || 1;
      order.timeline.forEach((item, idx) => {
        if (idx <= stageIndex) {
          item.done = true;
          if (idx === stageIndex && item.time === 'Pending') {
            item.time = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
        }
      });

      this.state.notifications.unshift({
        id: 'notif-' + Date.now(),
        targetRole: 'CUSTOMER',
        title: `Order Status: ${newStatus}`,
        message: `Order #${order.id} is now ${newStatus.toLowerCase()}.`,
        time: 'Just now',
        unread: true
      });

      this.save();
    }
  }

  // --- REVIEWS METHODS ---
  getProductReviews(productId) {
    return this.state.reviews.filter(r => r.productId === productId);
  }

  addReview(data) {
    const newReview = {
      id: 'rev-' + Date.now(),
      productId: data.productId,
      customerName: this.state.currentUser?.name || 'Artisan Collector',
      rating: parseInt(data.rating) || 5,
      date: 'Just now',
      comment: data.comment,
      images: data.images || [],
      sellerReply: ''
    };
    this.state.reviews.unshift(newReview);
    this.save();
    return newReview;
  }

  replyToReview(reviewId, replyText) {
    const review = this.state.reviews.find(r => r.id === reviewId);
    if (review) {
      review.sellerReply = replyText;
      this.save();
    }
  }

  // --- TICKETS & SUPPORT ---
  getTickets() {
    return this.state.tickets;
  }

  createTicket(data) {
    const newTicket = {
      id: 'TCK-' + Math.floor(100 + Math.random() * 900),
      user: this.state.currentUser?.name || 'Customer',
      role: this.state.currentUser?.role || 'CUSTOMER',
      subject: data.subject,
      status: 'Open',
      priority: data.priority || 'Medium',
      date: new Date().toISOString().slice(0, 10),
      messages: [{ sender: this.state.currentUser?.name || 'Customer', text: data.message }]
    };
    this.state.tickets.unshift(newTicket);
    this.save();
    return newTicket;
  }

  // --- ADMIN GOVERNANCE ---
  approveSeller(shopId) {
    const shop = this.getShopById(shopId);
    if (shop) {
      shop.status = 'approved';
      shop.verified = true;
      this.state.auditLogs.unshift({
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        action: `Approved Shop: ${shop.name}`,
        user: this.state.currentUser?.name || 'Admin'
      });
      this.save();
    }
  }

  suspendSeller(shopId) {
    const shop = this.getShopById(shopId);
    if (shop) {
      shop.status = 'suspended';
      this.state.auditLogs.unshift({
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        action: `Suspended Shop: ${shop.name}`,
        user: this.state.currentUser?.name || 'Admin'
      });
      this.save();
    }
  }

  updatePlatformSettings(settings) {
    this.state.settings = { ...this.state.settings, ...settings };
    this.state.auditLogs.unshift({
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      action: `Updated platform settings (Commission: ${settings.platformCommission}%)`,
      user: this.state.currentUser?.name || 'Admin'
    });
    this.save();
  }

  addCoupon(coupon) {
    this.state.coupons.unshift(coupon);
    this.save();
  }
}

export const store = new AureliaStore();
