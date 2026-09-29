export type Category = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  subcategories: string[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  subcategory: string;
  emoji: string;
  unit: string;
  variants: string[];
  price: number;
  mrp: number;
  stock: number;
  isVeg: boolean;
  rating: number;
  eta: number;
  tags: string[];
  description: string;
  nutrition: { label: string; value: string }[];
};

export const categories: Category[] = [
  {
    id: "c1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    emoji: "🥦",
    subcategories: ["Fresh Vegetables", "Fresh Fruits", "Herbs & Seasonings"],
  },
  {
    id: "c2",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    emoji: "🥛",
    subcategories: ["Milk", "Curd & Paneer", "Eggs", "Butter & Cheese"],
  },
  {
    id: "c3",
    name: "Snacks",
    slug: "snacks",
    emoji: "🍿",
    subcategories: ["Chips & Namkeen", "Biscuits", "Chocolates"],
  },
  {
    id: "c4",
    name: "Beverages",
    slug: "beverages",
    emoji: "🥤",
    subcategories: ["Soft Drinks", "Juices", "Tea & Coffee"],
  },
  {
    id: "c5",
    name: "Atta & Rice",
    slug: "atta-rice",
    emoji: "🌾",
    subcategories: ["Atta & Flours", "Rice", "Dals & Pulses"],
  },
  {
    id: "c6",
    name: "Masala & Oils",
    slug: "masala-oils",
    emoji: "🧂",
    subcategories: ["Spices", "Cooking Oils", "Sauces"],
  },
  {
    id: "c7",
    name: "Bakery",
    slug: "bakery",
    emoji: "🍞",
    subcategories: ["Bread & Buns", "Cakes & Rusk"],
  },
  {
    id: "c8",
    name: "Cleaning",
    slug: "cleaning",
    emoji: "🧼",
    subcategories: ["Detergents", "Home Cleaners", "Tissues"],
  },
  {
    id: "c9",
    name: "Personal Care",
    slug: "personal-care",
    emoji: "🧴",
    subcategories: ["Hair Care", "Skin Care", "Oral Care"],
  },
  {
    id: "c10",
    name: "Baby Care",
    slug: "baby-care",
    emoji: "🍼",
    subcategories: ["Diapers", "Baby Food"],
  },
  {
    id: "c11",
    name: "Pet Care",
    slug: "pet-care",
    emoji: "🐾",
    subcategories: ["Dog Food", "Cat Food"],
  },
];

type Seed = [
  name: string,
  brand: string,
  cat: string,
  sub: string,
  emoji: string,
  unit: string,
  price: number,
  mrp: number,
  veg: boolean,
  tags: string,
];

const seeds: Seed[] = [
  ["Onion", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🧅", "1 kg", 38, 60, true, "staple,daily"],
  ["Tomato Hybrid", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🍅", "500 g", 24, 35, true, "staple,daily"],
  ["Potato", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🥔", "1 kg", 32, 45, true, "staple"],
  ["Green Capsicum", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🫑", "250 g", 26, 34, true, "curry"],
  ["Cauliflower", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🥬", "1 pc", 42, 55, true, "curry"],
  ["Brinjal Long", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🍆", "500 g", 29, 40, true, "curry"],
  ["Carrot Ooty", "Fresh Farm", "fruits-vegetables", "Fresh Vegetables", "🥕", "500 g", 34, 48, true, "salad"],
  ["Banana Robusta", "Fresh Farm", "fruits-vegetables", "Fresh Fruits", "🍌", "6 pcs", 46, 60, true, "breakfast,healthy"],
  ["Shimla Apple", "Fresh Farm", "fruits-vegetables", "Fresh Fruits", "🍎", "4 pcs", 148, 199, true, "healthy"],
  ["Nagpur Orange", "Fresh Farm", "fruits-vegetables", "Fresh Fruits", "🍊", "1 kg", 96, 130, true, "healthy"],
  ["Alphonso Mango", "Fresh Farm", "fruits-vegetables", "Fresh Fruits", "🥭", "1 kg", 249, 320, true, "premium"],
  ["Green Grapes", "Fresh Farm", "fruits-vegetables", "Fresh Fruits", "🍇", "500 g", 78, 99, true, "healthy"],
  ["Coriander Leaves", "Fresh Farm", "fruits-vegetables", "Herbs & Seasonings", "🌿", "100 g", 12, 20, true, "curry,garnish"],
  ["Green Chilli", "Fresh Farm", "fruits-vegetables", "Herbs & Seasonings", "🌶️", "100 g", 14, 22, true, "curry"],
  ["Ginger", "Fresh Farm", "fruits-vegetables", "Herbs & Seasonings", "🫚", "200 g", 36, 52, true, "curry,staple"],
  ["Garlic Peeled", "Fresh Farm", "fruits-vegetables", "Herbs & Seasonings", "🧄", "200 g", 58, 75, true, "curry,staple"],

  ["Toned Milk", "Amul", "dairy-eggs", "Milk", "🥛", "500 ml", 27, 29, true, "staple,daily,breakfast"],
  ["Full Cream Milk", "Mother Dairy", "dairy-eggs", "Milk", "🥛", "1 L", 71, 75, true, "staple,daily"],
  ["Fresh Paneer", "Amul", "dairy-eggs", "Curd & Paneer", "🧀", "200 g", 92, 110, true, "curry,protein"],
  ["Fresh Curd", "Nestle a+", "dairy-eggs", "Curd & Paneer", "🥣", "400 g", 44, 55, true, "daily"],
  ["Greek Yogurt", "Epigamia", "dairy-eggs", "Curd & Paneer", "🍧", "90 g", 55, 65, true, "healthy,protein"],
  ["Farm Eggs", "Eggoz", "dairy-eggs", "Eggs", "🥚", "6 pcs", 66, 84, false, "breakfast,protein"],
  ["Brown Eggs", "Eggoz", "dairy-eggs", "Eggs", "🥚", "10 pcs", 129, 160, false, "protein"],
  ["Salted Butter", "Amul", "dairy-eggs", "Butter & Cheese", "🧈", "100 g", 58, 62, true, "breakfast,curry"],
  ["Cheese Slices", "Amul", "dairy-eggs", "Butter & Cheese", "🧀", "200 g", 135, 155, true, "breakfast"],
  ["Fresh Cream", "Amul", "dairy-eggs", "Butter & Cheese", "🍶", "250 ml", 78, 90, true, "curry"],

  ["Classic Salted Chips", "Lay's", "snacks", "Chips & Namkeen", "🥔", "52 g", 20, 20, true, "party"],
  ["Magic Masala Chips", "Lay's", "snacks", "Chips & Namkeen", "🍟", "52 g", 20, 20, true, "party"],
  ["Aloo Bhujia", "Haldiram's", "snacks", "Chips & Namkeen", "🥨", "200 g", 55, 65, true, "tea-time"],
  ["Navratan Mixture", "Haldiram's", "snacks", "Chips & Namkeen", "🥜", "200 g", 58, 70, true, "tea-time"],
  ["Marie Gold Biscuits", "Britannia", "snacks", "Biscuits", "🍪", "250 g", 40, 45, true, "tea-time,breakfast"],
  ["Bourbon Cream", "Britannia", "snacks", "Biscuits", "🍫", "150 g", 35, 40, true, "tea-time"],
  ["Parle-G Gold", "Parle", "snacks", "Biscuits", "🍪", "200 g", 30, 35, true, "tea-time"],
  ["Dairy Milk Silk", "Cadbury", "snacks", "Chocolates", "🍫", "60 g", 85, 95, true, "gift"],
  ["KitKat 4 Finger", "Nestle", "snacks", "Chocolates", "🍫", "37 g", 40, 45, true, "gift"],
  ["Dark Chocolate 70%", "Amul", "snacks", "Chocolates", "🍫", "150 g", 145, 175, true, "premium"],

  ["Coca-Cola", "Coca-Cola", "beverages", "Soft Drinks", "🥤", "750 ml", 42, 45, true, "party"],
  ["Thums Up", "Coca-Cola", "beverages", "Soft Drinks", "🥤", "750 ml", 42, 45, true, "party"],
  ["Sprite Lime", "Coca-Cola", "beverages", "Soft Drinks", "🥤", "750 ml", 42, 45, true, "party"],
  ["Mixed Fruit Juice", "Real", "beverages", "Juices", "🧃", "1 L", 109, 130, true, "breakfast,healthy"],
  ["Orange Juice", "Tropicana", "beverages", "Juices", "🧃", "1 L", 115, 135, true, "breakfast,healthy"],
  ["Tea Gold", "Tata", "beverages", "Tea & Coffee", "🍵", "500 g", 265, 300, true, "staple,daily"],
  ["Instant Coffee", "Nescafe", "beverages", "Tea & Coffee", "☕", "50 g", 240, 270, true, "breakfast"],
  ["Green Tea Bags", "Lipton", "beverages", "Tea & Coffee", "🍵", "25 pcs", 165, 199, true, "healthy"],

  ["Chakki Atta", "Aashirvaad", "atta-rice", "Atta & Flours", "🌾", "5 kg", 285, 340, true, "staple,daily"],
  ["Besan", "Rajdhani", "atta-rice", "Atta & Flours", "🫓", "500 g", 62, 75, true, "staple"],
  ["Maida", "Aashirvaad", "atta-rice", "Atta & Flours", "🫓", "1 kg", 58, 70, true, "baking"],
  ["Basmati Rice", "India Gate", "atta-rice", "Rice", "🍚", "5 kg", 640, 780, true, "staple"],
  ["Sona Masoori Rice", "Daawat", "atta-rice", "Rice", "🍚", "5 kg", 420, 520, true, "staple"],
  ["Toor Dal", "Tata Sampann", "atta-rice", "Dals & Pulses", "🫘", "1 kg", 168, 195, true, "staple,protein"],
  ["Moong Dal", "Tata Sampann", "atta-rice", "Dals & Pulses", "🫘", "500 g", 88, 105, true, "protein,healthy"],
  ["Rajma Chitra", "Tata Sampann", "atta-rice", "Dals & Pulses", "🫘", "500 g", 98, 120, true, "protein"],

  ["Turmeric Powder", "Everest", "masala-oils", "Spices", "🧂", "200 g", 74, 90, true, "curry,staple"],
  ["Red Chilli Powder", "Everest", "masala-oils", "Spices", "🌶️", "200 g", 96, 115, true, "curry,staple"],
  ["Garam Masala", "MDH", "masala-oils", "Spices", "🧂", "100 g", 82, 95, true, "curry"],
  ["Kasuri Methi", "MDH", "masala-oils", "Spices", "🌿", "25 g", 45, 55, true, "curry"],
  ["Sunflower Oil", "Fortune", "masala-oils", "Cooking Oils", "🛢️", "1 L", 145, 175, true, "staple"],
  ["Mustard Oil", "Dhara", "masala-oils", "Cooking Oils", "🛢️", "1 L", 168, 195, true, "staple"],
  ["Tomato Ketchup", "Kissan", "masala-oils", "Sauces", "🥫", "950 g", 135, 160, true, "party"],

  ["Whole Wheat Bread", "Britannia", "bakery", "Bread & Buns", "🍞", "400 g", 45, 50, true, "breakfast,daily"],
  ["Pav Buns", "Modern", "bakery", "Bread & Buns", "🥐", "6 pcs", 35, 40, true, "breakfast"],
  ["Elaichi Rusk", "Britannia", "bakery", "Cakes & Rusk", "🥖", "300 g", 58, 68, true, "tea-time"],
  ["Choco Chip Muffin", "Britannia", "bakery", "Cakes & Rusk", "🧁", "2 pcs", 60, 70, true, "tea-time"],

  ["Detergent Powder", "Surf Excel", "cleaning", "Detergents", "🧺", "1 kg", 165, 195, true, "home"],
  ["Dishwash Gel", "Vim", "cleaning", "Home Cleaners", "🧽", "750 ml", 145, 170, true, "home"],
  ["Floor Cleaner", "Lizol", "cleaning", "Home Cleaners", "🧴", "975 ml", 210, 250, true, "home"],
  ["Tissue Roll Pack", "Origami", "cleaning", "Tissues", "🧻", "4 rolls", 118, 140, true, "home"],

  ["Anti-Hairfall Shampoo", "Dove", "personal-care", "Hair Care", "🧴", "340 ml", 345, 399, true, "self-care"],
  ["Coconut Hair Oil", "Parachute", "personal-care", "Hair Care", "🥥", "250 ml", 128, 150, true, "self-care"],
  ["Moisturising Soap", "Dove", "personal-care", "Skin Care", "🧼", "4 x 100 g", 265, 320, true, "self-care"],
  ["Face Wash Neem", "Himalaya", "personal-care", "Skin Care", "🧴", "150 ml", 175, 210, true, "self-care"],
  ["Toothpaste Advanced", "Colgate", "personal-care", "Oral Care", "🪥", "200 g", 118, 135, true, "daily"],

  ["Baby Pants Diapers M", "Pampers", "baby-care", "Diapers", "🍼", "32 pcs", 599, 749, true, "baby"],
  ["Baby Wipes", "Himalaya", "baby-care", "Diapers", "🧻", "72 pcs", 199, 240, true, "baby"],
  ["Cerelac Wheat Apple", "Nestle", "baby-care", "Baby Food", "🥣", "300 g", 285, 320, true, "baby"],

  ["Adult Dog Food Chicken", "Pedigree", "pet-care", "Dog Food", "🐶", "1.2 kg", 425, 499, false, "pet"],
  ["Dog Biscuits", "Pedigree", "pet-care", "Dog Food", "🦴", "500 g", 185, 220, false, "pet"],
  ["Cat Food Tuna", "Whiskas", "pet-care", "Cat Food", "🐱", "1.1 kg", 465, 540, false, "pet"],
];

function nutritionFor(cat: string) {
  if (cat === "fruits-vegetables")
    return [
      { label: "Energy", value: "52 kcal" },
      { label: "Carbs", value: "12 g" },
      { label: "Fibre", value: "2.4 g" },
      { label: "Protein", value: "1.1 g" },
    ];
  if (cat === "dairy-eggs")
    return [
      { label: "Energy", value: "148 kcal" },
      { label: "Protein", value: "8 g" },
      { label: "Fat", value: "6.5 g" },
      { label: "Calcium", value: "210 mg" },
    ];
  return [
    { label: "Energy", value: "320 kcal" },
    { label: "Carbs", value: "48 g" },
    { label: "Protein", value: "6 g" },
    { label: "Fat", value: "11 g" },
  ];
}

export const products: Product[] = seeds.map((s, i) => {
  const [name, brand, cat, sub, emoji, unit, price, mrp, veg, tags] = s;
  const stock = [0, 3, 8, 14, 22, 40, 60][i % 7];
  return {
    id: `p${i + 1}`,
    name,
    brand,
    categorySlug: cat,
    subcategory: sub,
    emoji,
    unit,
    variants: [unit],
    price,
    mrp,
    stock,
    isVeg: veg,
    rating: Math.round((3.9 + ((i * 7) % 11) / 10) * 10) / 10,
    eta: 8 + (i % 5),
    tags: tags.split(","),
    description: `${brand} ${name} — sourced fresh and delivered to your door in minutes. Quality checked at our dark store before every dispatch.`,
    nutrition: nutritionFor(cat),
  };
});

export const productById = (id: string) => products.find((p) => p.id === id);

export const byCategory = (slug: string) => products.filter((p) => p.categorySlug === slug);

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const discountPct = (p: Product) =>
  p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

export const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export const trending = products.filter((p) => p.stock > 0).slice(8, 20);
export const dealsOfTheDay = [...products]
  .filter((p) => p.stock > 0)
  .sort((a, b) => discountPct(b) - discountPct(a))
  .slice(0, 12);
export const orderAgain = products.filter((p) =>
  ["p17", "p18", "p19", "p23", "p46", "p60", "p22"].includes(p.id),
);
export const recommended = products.filter((p) => p.tags.includes("healthy") && p.stock > 0).slice(0, 12);

export const coupons = [
  { code: "FRESH50", type: "flat" as const, value: 50, minOrder: 299 },
  { code: "SAVE10", type: "percent" as const, value: 10, minOrder: 199 },
  { code: "BIG100", type: "flat" as const, value: 100, minOrder: 799 },
];

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored = products.map((p) => {
    const hay = `${p.name} ${p.brand} ${p.subcategory} ${p.tags.join(" ")} ${p.categorySlug}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += 3;
      else if (fuzzy(hay, t)) score += 1;
    }
    if (p.name.toLowerCase().startsWith(q)) score += 4;
    return { p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.p);
}

/** Cheap typo tolerance: allow one edit per word token. */
function fuzzy(hay: string, term: string) {
  if (term.length < 4) return false;
  return hay.split(/\s+/).some((w) => levenshtein(w, term) <= 1);
}

function levenshtein(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return 9;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return dp[a.length][b.length];
}
