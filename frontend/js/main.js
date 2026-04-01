// =============================================
//  VASTRA – Main JS
// =============================================

// ---- COLOR SWATCH HELPER ----
function normalizeColorForAsset(colorName) {
  return colorName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function inferAssetImage(product, colorName) {
  if (!product) return "";
  const c = normalizeColorForAsset(colorName);
  const n = product.name.toLowerCase();
  if (n.includes("belt")) return `assets/images/belt_${c}.png`;
  if (n.includes("tie")) return `assets/images/tie_${c}.png`;
  if (n.includes("wallet")) return `assets/images/wallet_${c}.png`;
  if (n.includes("jeans") || n.includes("denim")) return `assets/images/jeans_${c}.png`;
  return "";
}

function selectColor(productId, colorName, colorImage, el) {
  document.querySelectorAll(`.color-swatch-${productId}`).forEach(s => {
    s.style.outline = 'none';
    s.style.transform = 'scale(1)';
  });
  el.style.outline = '2px solid var(--gold, #d4a855)';
  el.style.outlineOffset = '2px';
  el.style.transform = 'scale(1.15)';
  const label = document.getElementById(`color-label-${productId}`);
  if (label) label.textContent = colorName;
  // Swap product image if a valid color-specific image exists.
  const product = products.find(p => p.id === productId);
  const nextImage = colorImage || inferAssetImage(product, colorName);
  if (!nextImage) return;

  const img = document.getElementById(`img-${productId}`);
  if (!img) return;
  const probe = new Image();
  probe.onload = () => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.2s';
    setTimeout(() => {
      img.src = nextImage;
      img.style.opacity = '1';
    }, 200);
  };
  probe.onerror = () => {
    // Keep existing image when guessed asset file is missing.
  };
  probe.src = nextImage;
}

// ---- PRODUCTS DATA ----
const products = [
  // ── TRADITIONAL ─────────────────────────────────────────────────────────────
  { id: 1,  name: "Royal Silk Kurta",          category: "traditional", price: 1899, original: 2499, image: "assets/images/kurta1.png",  badge: "Bestseller" },
  { id: 2,  name: "Embroidered Sherwani",       category: "traditional", price: 5499, original: 7999, image: "assets/images/sherwani.jpg",  badge: "New" },
  { id: 3,  name: "Nehru Jacket Set",           category: "traditional", price: 2799, original: 3499, image: "assets/images/nehru.png",  badge: "" },
  { id: 4,  name: "Cotton Kurta Pajama",        category: "traditional", price: 1299, original: 1799, image: "assets/images/hero.jpg",  badge: "Sale" },
  // { id: 5,  name: "Bandhgala Suit",             category: "traditional", price: 4299, original: 5999, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",  badge: "" },
  // { id: 6,  name: "Chanderi Kurta",             category: "traditional", price: 1599, original: 2199, image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&q=80",  badge: "" },
  // { id: 19, name: "Banarasi Silk Sherwani",     category: "traditional", price: 6999, original: 9999, image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&q=80",  badge: "Exclusive" },
  // { id: 20, name: "Jodhpuri Suit",              category: "traditional", price: 3899, original: 5499, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80",  badge: "Trending" },
  // { id: 21, name: "Anarkali Kurta Set",         category: "traditional", price: 2299, original: 2999, image: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=500&q=80",  badge: "New" },
  // { id: 22, name: "Lucknowi Chikankari Kurta",  category: "traditional", price: 1999, original: 2799, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=500&q=80",  badge: "" },
  { id: 23, name: "Indo-Western Jacket",        category: "traditional", price: 3299, original: 4499, image: "assets/images/indo.png",  badge: "Sale" },
  { id: 24, name: "Pathani Kurta",              category: "traditional", price: 1499, original: 1999, image: "assets/images/pathan.webp",  badge: "" },

  // ── FORMAL ──────────────────────────────────────────────────────────────────
  { id: 7,  name: "Classic White Shirt",        category: "formal", price:  899, original: 1299, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80",  badge: "Bestseller" },
  { id: 8,  name: "Slim Fit Formal Shirt",      category: "formal", price:  999, original: 1499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",  badge: "" },
  // { id: 9,  name: "Navy Dress Trousers",        category: "formal", price: 1499, original: 1999, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",  badge: "New" },
  { id: 10, name: "Linen Formal Shirt",         category: "formal", price: 1199, original: 1699, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80",  badge: "" },
  // { id: 11, name: "Charcoal Trousers",          category: "formal", price: 1699, original: 2299, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",  badge: "" },
  { id: 12, name: "Oxford Formal Shirt",        category: "formal", price: 1099, original: 1599, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",  badge: "Sale" },
  { id: 25, name: "Two-Piece Business Suit",    category: "formal", price: 5999, original: 8499, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80",  badge: "Bestseller" },
  { id: 26, name: "Herringbone Blazer",         category: "formal", price: 3799, original: 4999, image: "assets/images/blazer.jpg",  badge: "New" },
  { id: 27, name: "Italian Cotton Shirt",       category: "formal", price: 1599, original: 2199, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",  badge: "" },
  // { id: 28, name: "Pleated Dress Trousers",     category: "formal", price: 1799, original: 2499, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=500&q=80",  badge: "" },
  { id: 29, name: "Black Tuxedo Set",         category: "formal", price: 1299, original: 1799, image: "assets/images/tux_set.jpeg",  badge: "Exclusive" },
  { id: 30, name: "Warm Taupe Pleated Gurkha Pant",                category: "formal", price:  999, original: 1499, image: "assets/images/pants.webp",  badge: "Sale" },

  // ── T-SHIRTS ────────────────────────────────────────────────────────────────
  { id: 13, name: "Premium Solid Tee",          category: "tshirts", price: 499, original:  799, image: "assets/images/tshirt.jpg",                                                   badge: "Bestseller" },
  { id: 14, name: "Graphic Print Tee",          category: "tshirts", price: 649, original:  999, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",  badge: "New" },
  { id: 15, name: "Polo T-Shirt",               category: "tshirts", price: 799, original: 1199, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&q=80",  badge: "" },
  { id: 16, name: "Oversized Streetwear Tee",   category: "tshirts", price: 899, original: 1299, image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80",  badge: "Trending" },
  { id: 17, name: "V-Neck Cotton Tee",          category: "tshirts", price: 449, original:  699, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",  badge: "" },
  { id: 18, name: "Henley Tee",                 category: "tshirts", price: 599, original:  899, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80",  badge: "" },
  { id: 32, name: "Long Sleeve Snap Tee",       category: "tshirts", price: 699, original:  999, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80",  badge: "" },
  { id: 33, name: "Abstract Art Print Tee",     category: "tshirts", price: 749, original: 1099, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",  badge: "Trending" },
  { id: 34, name: "Muscle Fit Tee",             category: "tshirts", price: 549, original:  799, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80",  badge: "Sale" },

  // ── JEANS ───────────────────────────────────────────────────────────────────
  { id: 35, name: "Slim Fit Dark Denim",        category: "jeans", price: 1499, original: 1999, image: "assets/images/slim fit black.webp",  badge: "Bestseller", colors: [{name:"Black",hex:"#1a1a1a",image:"assets/images/slim fit black.webp"},{name:"Blue",hex:"#2d4a8a",image:"assets/images/slim fit blue.jpg"}] },
  { id: 39, name: "Light Wash Bootcut Jeans",   category: "jeans", price: 1599, original: 2099, image: "assets/images/bootcut_blue.png",     badge: "Sale",       colors: [{name:"Blue",hex:"#4878a8",image:"assets/images/bootcut_blue.png"},{name:"Black",hex:"#1a1a1a",image:"assets/images/bootcut black .png"}] },

  // ── ACCESSORIES ─────────────────────────────────────────────────────────────
  { id: 41, name: "Silk Pocket Square",         category: "accessories", price:  299, original:  499, image: "assets/images/gold_silk.webp",    badge: "New",        colors: [{name:"Gold",hex:"#d4a855",image:"assets/images/gold_silk.webp"},{name:"Red",hex:"#c0392b",image:"assets/images/red_silk.webp"},{name:"Purple",hex:"#7d3c98",image:"assets/images/purple_silk.webp"}] },
  { id: 42, name: "Leather Belt – Brown",       category: "accessories", price:  699, original:  999, image: "assets/images/belt_brown.png",   badge: "Bestseller", colors: [{name:"Brown",hex:"#7c5c3a",image:"assets/images/belt_brown.png"},{name:"Black",hex:"#1a1a1a",image:"assets/images/black_belt.jpeg"},{name:"Burgundy",hex:"#7b1e2e",image:"assets/images/burgundy_belt.webp"}] },
  { id: 43, name: "Classic Woven Tie",          category: "accessories", price:  499, original:  799, image: "assets/images/tie_navy.png",     badge: "",           colors: [{name:"Navy",hex:"#2d3561",image:"assets/images/tie_navy.png"},{name:"Black",hex:"#1a1a1a",image:"assets/images/black_tie.webp"},{name:"Green",hex:"#3f704d",image:"assets/images/green_tie.png"}] },
  { id: 44, name: "Gold Cufflinks Set",         category: "accessories", price:  899, original: 1299, image: "assets/images/gold_cuff.webp",    badge: "Exclusive",  colors: [{name:"Gold",hex:"#d4a855",image:"assets/images/gold_cuff.webp"},{name:"Blue",hex:"#4878a8",image:"assets/images/blue_cuff.webp"},{name:"Black",hex:"#1a1a1a",image:"assets/images/black_cuff.webp"}] },
  { id: 45, name: "Formal Leather Wallet",      category: "accessories", price:  799, original: 1099, image: "assets/images/brown_wallet.webp", badge: "",           colors: [{name:"Brown",hex:"#7c5c3a",image:"assets/images/brown_wallet.webp"},{name:"Black",hex:"#1a1a1a",image:"assets/images/black_wallet.webp"},{name:"Green",hex:"#3f704d",image:"assets/images/green_wallet.webp"}] },
  { id: 47, name: "Aviator Sunglasses",         category: "accessories", price: 1199, original: 1799, image: "assets/images/black_glass.webp",  badge: "Trending",   colors: [{name:"Black",hex:"#1a1a1a",image:"assets/images/black_glass.webp"},{name:"Green",hex:"#3f704d",image:"assets/images/green_glass.webp"}] },
];

let currentProductId = null;
let currentRating = 0;

// ---- CART ----
function getCart() {
  return JSON.parse(localStorage.getItem('vastra_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('vastra_cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId, size = 'M') {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Read selected color if product has colors
  let color = '';
  if (product.colors && product.colors.length > 0) {
    const label = document.getElementById(`color-label-${productId}`);
    color = (label && label.textContent !== 'Pick a color') ? label.textContent : product.colors[0].name;
  }

  const cartItemId = color ? `${productId}-${size}-${color}` : `${productId}-${size}`;
  const existing = cart.find(item => item.cartItemId === cartItemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, cartItemId, size, color, qty: 1 });
  }
  saveCart(cart);
  const colorStr = color ? `, ${color}` : '';
  showToast(`"${product.name}" (Size ${size}${colorStr}) added to cart!`);
}
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

// ---- TOAST ----
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- PRODUCT CARD ----
function createProductCard(product) {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const deliveryStr = deliveryDate.toLocaleDateString('en-IN', options);

  return `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${product.image}" id="img-${product.id}" alt="${product.name}" loading="lazy" style="transition: opacity 0.2s;"/>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <p class="product-cat">${
          product.category === 'tshirts' ? 'T-Shirts' :
          product.category === 'formal' ? 'Formal Wear' :
          product.category === 'jeans' ? 'Jeans' :
          product.category === 'accessories' ? 'Accessories' :
          'Traditional Wear'
        }</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">
          ₹${product.price.toLocaleString('en-IN')}
          <span class="original">₹${product.original.toLocaleString('en-IN')}</span>
        </p>
        <div class="product-delivery">
          <span style="color:var(--gold-dark); font-size: 0.8rem; font-weight: 600;">🚚 Delivery by ${deliveryStr}</span>
        </div>
        ${product.colors ? `
        <div style="margin: 12px 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <label style="font-size: 0.8rem; font-weight: 500;">Color:</label>
            <span id="color-label-${product.id}" style="font-size: 0.8rem; color: var(--gold, #d4a855); font-weight: 600;">${product.colors[0].name}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${product.colors.map((c, i) => `
              <div
                class="color-swatch-${product.id}"
                title="${c.name}"
                onclick="selectColor(${product.id}, '${c.name}', '${c.image || ''}', this)"
                style="
                  width: 24px; height: 24px; border-radius: 50%;
                  background: ${c.hex};
                  cursor: pointer;
                  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.2);
                  transition: transform 0.15s, outline 0.15s;
                  ${i === 0 ? 'outline: 2.5px solid #d4a855; outline-offset: 2px; transform: scale(1.2);' : ''}
                "
              ></div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        <div class="product-size" style="margin: 12px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label style="font-size: 0.8rem; font-weight: 500;">Select Size</label>
            <a href="javascript:void(0)" onclick="openSizeModal(${product.id})" style="font-size: 0.75rem; color: var(--gold); text-decoration: none; font-weight: 600;">📏 Find My Size</a>
          </div>
          <select id="size-${product.id}" style="width: 100%; padding: 8px; border: 1.5px solid var(--border-secondary); border-radius: 6px; outline: none; font-size: 0.85rem; font-family: var(--font-body); cursor: pointer; background: var(--bg-card); color: var(--text-primary);">
            <option value="S">Size S</option>
            <option value="M" selected>Size M</option>
            <option value="L">Size L</option>
            <option value="XL">Size XL</option>
          </select>
        </div>
        <button class="btn-add-cart" onclick="addToCart(${product.id}, document.getElementById('size-${product.id}').value); this.textContent='Added ✓'; this.classList.add('added'); setTimeout(()=>{this.textContent='Add to Cart'; this.classList.remove('added')}, 2000)">
          Add to Cart
        </button>
        <button class="btn-view-reviews" onclick="openReviewModal(${product.id})">
          View Reviews
        </button>
      </div>
    </div>
  `;
}

// ---- FEATURED PRODUCTS (Home Page) ----
function loadFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  // Pick one bestseller from each of the 5 categories
  const byCategory = (cat) => products.find(p => p.category === cat && p.badge === 'Bestseller') || products.find(p => p.category === cat);
  const featured = [
    byCategory('traditional'),
    byCategory('formal'),
    byCategory('tshirts'),
    byCategory('jeans'),
    byCategory('accessories'),
  ].filter(Boolean);
  grid.innerHTML = featured.map(createProductCard).join('');
}

// ---- NAVBAR SCROLL ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// ---- HAMBURGER MENU ----
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
}

// ---- USER AVATAR IN NAVBAR ----
function updateNavUser() {
  const user = JSON.parse(localStorage.getItem('vastra_user') || 'null');
  const loginLink = document.querySelector('.nav-login-btn');
  if (!loginLink) return;

  if (user) {
    const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';
    const avatar = document.createElement('div');
    avatar.className = 'nav-avatar';
    avatar.title = user.name;
    avatar.innerHTML = `
      <div class="avatar-circle">${initial}</div>
      <div class="avatar-dropdown">
        <span class="avatar-name">${user.name}</span>
        <a href="orders.html">My Orders</a>
        <a href="#" onclick="logout()">Logout</a>
      </div>
    `;
    loginLink.replaceWith(avatar);
  }
}

function logout() {
  localStorage.removeItem('vastra_user');
  localStorage.removeItem('vastra_token');
  window.location.href = 'index.html';
}

// ---- THEME TOGGLE ----
function initTheme() {
  const savedTheme = localStorage.getItem('vastra_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('vastra_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
}

// ---- REVIEWS LOGIC ----
async function openReviewModal(productId) {
  currentProductId = productId;
  const product = products.find(p => p.id === productId);
  document.getElementById('modalProductName').textContent = `${product.name} Reviews`;
  
  const modal = document.getElementById('reviewModal');
  modal.classList.add('show');
  
  const user = JSON.parse(localStorage.getItem('vastra_user') || 'null');
  if (user) {
    document.getElementById('addReviewSection').style.display = 'block';
    document.getElementById('loginToReview').style.display = 'none';
  } else {
    document.getElementById('addReviewSection').style.display = 'none';
    document.getElementById('loginToReview').style.display = 'block';
  }
  
  resetReviewForm();
  loadReviews(productId);
}

function closeReviewModal() {
  document.getElementById('reviewModal').classList.remove('show');
}

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll('#starRating span');
  stars.forEach((s, idx) => {
    if (idx < rating) s.classList.add('active');
    else s.classList.remove('active');
  });
}

function resetReviewForm() {
  currentRating = 0;
  setRating(0);
  document.getElementById('reviewComment').value = '';
}

async function loadReviews(productId) {
  const list = document.getElementById('reviewList');
  list.innerHTML = '<p style="text-align:center; color:var(--text-secondary);">Loading reviews...</p>';
  
  try {
    const res = await fetch(`http://localhost:5001/api/reviews/${productId}`);
    const reviews = await res.json();
    
    if (reviews.length === 0) {
      list.innerHTML = '<p style="text-align:center; padding: 20px; color:var(--text-secondary);">No reviews yet. Be the first to review!</p>';
    } else {
      list.innerHTML = reviews.map(r => `
        <div class="review-item">
          <div class="review-user">
            ${r.userName}
            <span class="review-date">${new Date(r.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="review-stars">
            ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
          </div>
          <p class="review-comment">${r.comment}</p>
        </div>
      `).join('');
    }
  } catch (err) {
    list.innerHTML = '<p style="color:red; text-align:center;">Error loading reviews.</p>';
  }
}

async function submitReview() {
  const comment = document.getElementById('reviewComment').value;
  const user = JSON.parse(localStorage.getItem('vastra_user') || 'null');
  const token = localStorage.getItem('vastra_token');
  
  if (!currentRating) return showToast('Please select a star rating.');
  if (!comment.trim()) return showToast('Please write a comment.');
  
  const btn = document.getElementById('submitReviewBtn');
  btn.disabled = true;
  btn.textContent = 'Posting...';
  
  try {
    const res = await fetch('http://localhost:5001/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({
        productId: currentProductId,
        userName: user.name,
        comment,
        rating: currentRating
      })
    });
    
    if (res.ok) {
      showToast('Review posted successfully!');
      resetReviewForm();
      loadReviews(currentProductId);
    } else {
      const data = await res.json();
      showToast(data.message || 'Error posting review.');
    }
  } catch (err) {
    showToast('Could not connect to server.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Post Review';
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateCartCount();
  updateNavUser();
  loadFeatured();
  initNavbar();
  initHamburger();
  initThemeToggle();
});