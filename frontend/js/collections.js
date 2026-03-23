// Collections Page JS

function loadCollections(filterCat = 'all') {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productsCount');
  if (!grid) return;

  const filtered = filterCat === 'all'
    ? products
    : products.filter(p => p.category === filterCat);

  countEl.textContent = `Showing ${filtered.length} products`;
  grid.innerHTML = filtered.map(createProductCard).join('');
}

function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadCollections(btn.dataset.cat);
    });
  });

  // Check URL param
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    btns.forEach(b => b.classList.remove('active'));
    const match = document.querySelector(`[data-cat="${cat}"]`);
    if (match) {
      match.classList.add('active');
      loadCollections(cat);
    } else {
      loadCollections('all');
    }
  } else {
    loadCollections('all');
  }
}

document.addEventListener('DOMContentLoaded', initFilters);
