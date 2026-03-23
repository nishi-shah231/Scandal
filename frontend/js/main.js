// =============================================
//  VASTRA – Main JS
// =============================================

// ---- PRODUCTS DATA ----
const products = [
  // Traditional Wear
  { id: 1, name: "Royal Silk Kurta", category: "traditional", price: 1899, original: 2499, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80", badge: "Bestseller" },
  { id: 2, name: "Embroidered Sherwani", category: "traditional", price: 5499, original: 7999, image: "https://images.unsplash.com/photo-1610189352649-6f5f6f77f2eb?w=500&q=80", badge: "New" },
  { id: 3, name: "Nehru Jacket Set", category: "traditional", price: 2799, original: 3499, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80", badge: "" },
  { id: 4, name: "Cotton Kurta Pajama", category: "traditional", price: 1299, original: 1799, image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&q=80", badge: "Sale" },
  { id: 5, name: "Bandhgala Suit", category: "traditional", price: 4299, original: 5999, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", badge: "" },
  { id: 6, name: "Chanderi Kurta", category: "traditional", price: 1599, original: 2199, image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&q=80", badge: "" },

  // Formal Wear
  { id: 7, name: "Classic White Shirt", category: "formal", price: 899, original: 1299, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80", badge: "Bestseller" },
  { id: 8, name: "Slim Fit Formal Shirt", category: "formal", price: 999, original: 1499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", badge: "" },
  { id: 9, name: "Navy Dress Trousers", category: "formal", price: 1499, original: 1999, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80", badge: "New" },
  { id: 10, name: "Linen Formal Shirt", category: "formal", price: 1199, original: 1699, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80", badge: "" },
  { id: 11, name: "Charcoal Trousers", category: "formal", price: 1699, original: 2299, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80", badge: "" },
  { id: 12, name: "Oxford Formal Shirt", category: "formal", price: 1099, original: 1599, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80", badge: "Sale" },

  // T-Shirts
  { id: 13, name: "Premium Solid Tee", category: "tshirts", price: 499, original: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", badge: "Bestseller" },
  { id: 14, name: "Graphic Print Tee", category: "tshirts", price: 649, original: 999, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80", badge: "New" },
  { id: 15, name: "Polo T-Shirt", category: "tshirts", price: 799, original: 1199, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&q=80", badge: "" },
  { id: 16, name: "Oversized Streetwear", category: "tshirts", price: 899, original: 1299, image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80", badge: "Trending" },
  { id: 17, name: "V-Neck Cotton Tee", category: "tshirts", price: 449, original: 699, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80", badge: "" },
  { id: 18, name: "Henley Tee", category: "tshirts", price: 599, original: 899, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80", badge: "" },
];

// ---- CART ----
function getCart() {
  return JSON.parse(localStorage.getItem('vastra_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('vastra_cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`"${product.name}" added to cart!`);
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
  return `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy"/>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <p class="product-cat">${product.category === 'tshirts' ? 'T-Shirts' : product.category === 'formal' ? 'Formal Wear' : 'Traditional Wear'}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">
          ₹${product.price.toLocaleString('en-IN')}
          <span class="original">₹${product.original.toLocaleString('en-IN')}</span>
        </p>
        <button class="btn-add-cart" onclick="addToCart(${product.id}); this.textContent='Added ✓'; this.classList.add('added'); setTimeout(()=>{this.textContent='Add to Cart'; this.classList.remove('added')}, 2000)">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// ---- FEATURED PRODUCTS (Home Page) ----
function loadFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  // Pick 4 featured: 2 traditional, 1 formal, 1 tshirt
  const featured = [products[0], products[1], products[6], products[12]];
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

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateNavUser();
  loadFeatured();
  initNavbar();
  initHamburger();
});