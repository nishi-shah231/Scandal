// Collections Page JS

let currentCategory = 'all';
let currentPrice = 'all';
let currentSort = 'featured';

function renderCollections() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productsCount');
  if (!grid) return;

  // 1. Filter by category
  let filtered = currentCategory === 'all'
    ? [...products]
    : products.filter(p => p.category === currentCategory);

  // 2. Filter by price
  if (currentPrice !== 'all') {
    filtered = filtered.filter(p => {
      if (currentPrice === 'under1000') return p.price < 1000;
      if (currentPrice === '1000to2000') return p.price >= 1000 && p.price <= 2000;
      if (currentPrice === 'over2000') return p.price > 2000;
      return true;
    });
  }

  // 3. Sort
  if (currentSort === 'priceLowHigh') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'priceHighLow') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // Featured - restore original order
    filtered.sort((a, b) => a.id - b.id);
  }

  countEl.textContent = `Showing ${filtered.length} products`;
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: var(--dark); margin-bottom: 12px;">No Products Found</h3>
        <p style="color: var(--gray);">We couldn't find any products matching your current filters. Try adjusting the category or price range.</p>
        <button onclick="resetFilters()" style="margin-top: 20px; padding: 10px 24px; background: var(--gold); color: var(--white); border: none; border-radius: 4px; cursor: pointer;">Clear Filters</button>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(createProductCard).join('');
  }
}

function resetFilters() {
  document.getElementById('categoryFilter').value = 'all';
  document.getElementById('priceFilter').value = 'all';
  document.getElementById('sortFilter').value = 'featured';
  
  currentCategory = 'all';
  currentPrice = 'all';
  currentSort = 'featured';
  
  renderCollections();
}

function initFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');

  if (!categoryFilter || !priceFilter || !sortFilter) return;

  categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderCollections();
  });

  priceFilter.addEventListener('change', (e) => {
    currentPrice = e.target.value;
    renderCollections();
  });

  sortFilter.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderCollections();
  });

  // Check URL param for initial category
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    currentCategory = cat;
    categoryFilter.value = cat;
  }

  renderCollections();
}

document.addEventListener('DOMContentLoaded', initFilters);
