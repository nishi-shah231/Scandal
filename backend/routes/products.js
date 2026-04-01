const express = require('express');
const router = express.Router();

// Hardcoded products (no admin panel needed for lab)
const products = [
  // ── TRADITIONAL ──────────────────────────────────────────────────────────────
  { id: 1, name: "Royal Silk Kurta", category: "traditional", price: 1899, original: 2499, image: "assets/images/kurta1.png", badge: "Bestseller" },
  { id: 2, name: "Embroidered Sherwani", category: "traditional", price: 5499, original: 7999, image: "assets/images/sherwani.jpg", badge: "New" },
  { id: 3, name: "Nehru Jacket Set", category: "traditional", price: 2799, original: 3499, image: "assets/images/nehru.png", badge: "" },
  { id: 4, name: "Cotton Kurta Pajama", category: "traditional", price: 1299, original: 1799, image: "assets/images/hero.jpg", badge: "Sale" },
  // { id: 5, name: "Bandhgala Suit", category: "traditional", price: 4299, original: 5999, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", badge: "" },
  // { id: 6, name: "Chanderi Kurta", category: "traditional", price: 1599, original: 2199, image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&q=80", badge: "" },
  // { id: 19, name: "Banarasi Silk Sherwani", category: "traditional", price: 6999, original: 9999, image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&q=80", badge: "Exclusive" },
  // { id: 20, name: "Jodhpuri Suit", category: "traditional", price: 3899, original: 5499, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80", badge: "Trending" },
  // { id: 21, name: "Anarkali Kurta Set", category: "traditional", price: 2299, original: 2999, image: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=500&q=80", badge: "New" },
  // { id: 22, name: "Lucknowi Chikankari Kurta", category: "traditional", price: 1999, original: 2799, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=500&q=80", badge: "" },
  { id: 23, name: "Indo-Western Jacket", category: "traditional", price: 3299, original: 4499, image: "assets/images/indo.png", badge: "Sale" },
  { id: 24, name: "Pathani Kurta", category: "traditional", price: 1499, original: 1999, image: "assets/images/pathan.webp", badge: "" },

  // ── FORMAL ───────────────────────────────────────────────────────────────────
  { id: 7, name: "Classic White Shirt", category: "formal", price: 899, original: 1299, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80", badge: "Bestseller" },
  { id: 8, name: "Slim Fit Formal Shirt", category: "formal", price: 999, original: 1499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", badge: "" },
  // { id: 9, name: "Navy Dress Trousers", category: "formal", price: 1499, original: 1999, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80", badge: "New" },
  { id: 10, name: "Linen Formal Shirt", category: "formal", price: 1199, original: 1699, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80", badge: "" },
  // { id: 11, name: "Charcoal Trousers", category: "formal", price: 1699, original: 2299, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80", badge: "" },
  { id: 12, name: "Oxford Formal Shirt", category: "formal", price: 1099, original: 1599, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80", badge: "Sale" },
  { id: 25, name: "Two-Piece Business Suit", category: "formal", price: 5999, original: 8499, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80", badge: "Bestseller" },
  { id: 26, name: "Herringbone Blazer", category: "formal", price: 3799, original: 4999, image: "assets/images/blazer.jpg", badge: "New" },
  { id: 27, name: "Italian Cotton Shirt", category: "formal", price: 1599, original: 2199, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80", badge: "" },
  // { id: 28, name: "Pleated Dress Trousers", category: "formal", price: 1799, original: 2499, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=500&q=80", badge: "" },
  { id: 29, name: "Black Tuxedo Set", category: "formal", price: 1299, original: 1799, image: "assets/images/tux_set.jpeg", badge: "Exclusive" },
  { id: 30, name: "Warm Taupe Pleated Gurkha Pant", category: "formal", price: 999, original: 1499, image: "assets/images/pants.webp", badge: "Sale" },

  // ── T-SHIRTS ─────────────────────────────────────────────────────────────────
  { id: 13, name: "Premium Solid Tee", category: "tshirts", price: 499, original: 799, image: "assets/images/tshirt.jpg", badge: "Bestseller" },
  { id: 14, name: "Graphic Print Tee", category: "tshirts", price: 649, original: 999, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80", badge: "New" },
  { id: 15, name: "Polo T-Shirt", category: "tshirts", price: 799, original: 1199, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&q=80", badge: "" },
  { id: 16, name: "Oversized Streetwear Tee", category: "tshirts", price: 899, original: 1299, image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80", badge: "Trending" },
  { id: 17, name: "V-Neck Cotton Tee", category: "tshirts", price: 449, original: 699, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80", badge: "" },
  { id: 18, name: "Henley Tee", category: "tshirts", price: 599, original: 899, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80", badge: "" },
  { id: 32, name: "Long Sleeve Snap Tee", category: "tshirts", price: 699, original: 999, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80", badge: "" },
  { id: 33, name: "Abstract Art Print Tee", category: "tshirts", price: 749, original: 1099, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", badge: "Trending" },
  { id: 34, name: "Muscle Fit Tee", category: "tshirts", price: 549, original: 799, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80", badge: "Sale" },

  // ── JEANS ────────────────────────────────────────────────────────────────────
  { id: 35, name: "Slim Fit Dark Denim", category: "jeans", price: 1499, original: 1999, image: "assets/images/jeans_dark.png", badge: "Bestseller" },
  { id: 39, name: "Light Wash Bootcut Jeans", category: "jeans", price: 1599, original: 2099, image: "assets/images/jeans_light.png", badge: "Sale" },

  // ── ACCESSORIES ──────────────────────────────────────────────────────────────
  { id: 41, name: "Silk Pocket Square", category: "accessories", price: 299, original: 499, image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80", badge: "New" },
  { id: 42, name: "Leather Belt – Brown", category: "accessories", price: 699, original: 999, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", badge: "Bestseller" },
  { id: 43, name: "Classic Woven Tie", category: "accessories", price: 499, original: 799, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80", badge: "" },
  { id: 44, name: "Gold Cufflinks Set", category: "accessories", price: 899, original: 1299, image: "https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?w=500&q=80", badge: "Exclusive" },
  { id: 45, name: "Formal Leather Wallet", category: "accessories", price: 799, original: 1099, image: "https://images.unsplash.com/photo-1627123424574-724758594785?w=500&q=80", badge: "" },
  { id: 47, name: "Aviator Sunglasses", category: "accessories", price: 1199, original: 1799, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", badge: "Trending" },
];

// GET /api/products
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(products.filter(p => p.category === category));
  }
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

module.exports = router;
