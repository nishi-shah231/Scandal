/**
 * AI Wardrobe Stylist Logic
 * Scandal E-commerce
 */

let stylistStep = 1;
let stylistChoices = {
  occasion: '',
  style: ''
};

// PREDEFINED RECIPES — IDs must exist in main.js `products` (commented-out products break lookups).
const outfitRecipes = {
  'wedding-classic': [2, 1],   // Sherwani + Silk Kurta
  'wedding-modern': [23, 2],  // Indo-Western Jacket + Sherwani
  'wedding-bold': [2, 3],     // Sherwani + Nehru Jacket

  'formal-classic': [7, 30],   // White Shirt + Gurkha Pant
  'formal-modern': [10, 30],   // Linen Shirt + Gurkha Pant
  'formal-bold': [8, 30],      // Slim Fit Shirt + Gurkha Pant

  'brunch-classic': [13, 30],   // Solid Tee + Gurkha Pant
  'brunch-modern': [16, 30],   // Oversized Tee + Gurkha Pant
  'brunch-bold': [14, 15],    // Graphic Tee + Polo

  'casual-classic': [24, 4],   // Pathani Kurta + Cotton Kurta Pajama
  'casual-modern': [15, 12],  // Polo + Oxford Shirt
  'casual-bold': [16, 13]     // Oversized Tee + Solid Tee
};

function openStylistModal() {
  const modal = document.getElementById('stylistModal');
  if (modal) {
    modal.classList.add('show');
    resetStylist();
  }
}

function closeStylistModal() {
  const modal = document.getElementById('stylistModal');
  if (modal) modal.classList.remove('show');
}

function selectStylistOption(type, value, element) {
  // Update UI
  const siblings = element.parentElement.querySelectorAll('.option-card');
  siblings.forEach(s => s.classList.remove('selected'));
  element.classList.add('selected');

  // Store choice
  stylistChoices[type] = value;
  
  // Auto-next for occasion
  if (type === 'occasion') {
    setTimeout(nextStylistStep, 300);
  }
}

function nextStylistStep() {
  if (stylistStep === 3) return;
  
  // Validate
  if (stylistStep === 1 && !stylistChoices.occasion) return showToast('Please select an occasion.');
  if (stylistStep === 2 && !stylistChoices.style) return showToast('Please select a style.');

  stylistStep++;
  updateStylistUI();
  
  if (stylistStep === 3) {
    generateRecommendation();
  }
}

function prevStylistStep() {
  if (stylistStep === 1) return;
  stylistStep--;
  updateStylistUI();
}

function updateStylistUI() {
  // Update steps
  document.querySelectorAll('.stylist-step').forEach((s, idx) => {
    if (idx + 1 === stylistStep) s.classList.add('active');
    else s.classList.remove('active');
  });

  // Update progress bar
  const progress = ((stylistStep - 1) / 2) * 100;
  document.getElementById('stylistProgress').style.width = `${progress}%`;

  // Update actions
  const nextBtn = document.getElementById('btnNextStylist');
  const backBtn = document.getElementById('btnBackStylist');
  const finishActions = document.getElementById('stylistFinishActions');
  const normalActions = document.getElementById('stylistNormalActions');

  if (stylistStep === 3) {
    normalActions.style.display = 'none';
    finishActions.style.display = 'block';
  } else {
    normalActions.style.display = 'flex';
    finishActions.style.display = 'none';
    backBtn.style.visibility = stylistStep === 1 ? 'hidden' : 'visible';
    nextBtn.textContent = 'Next';
  }
}

function generateRecommendation() {
  const key = `${stylistChoices.occasion}-${stylistChoices.style}`;
  let recipeIds = outfitRecipes[key] || [1, 7];

  let recommendedProducts = recipeIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  if (recommendedProducts.length === 0) {
    recipeIds = [1, 7];
    recommendedProducts = recipeIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  }

  const container = document.getElementById('recommendationContainer');
  if (!container) return;

  const cartIds = recommendedProducts.map(p => p.id);

  container.innerHTML = `
    <div class="rec-outfit-set">
      ${recommendedProducts.map(p => `
        <div class="rec-item">
          <img src="${p.image}" alt="${p.name}">
          <div class="rec-item-info">
            <h6>${p.name}</h6>
            <p>₹${p.price.toLocaleString('en-IN')}</p>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="text-align:center; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
      <p style="font-size: 0.9rem; color: #aaa; margin-bottom: 20px;">Based on your interest in <strong>${stylistChoices.occasion.toUpperCase()}</strong> with a <strong>${stylistChoices.style.toUpperCase()}</strong> aesthetic, we recommend this signature look.</p>
      <button class="btn-shop-look" onclick="shopTheLook([${cartIds.join(', ')}])">
        ✨ Add Full Look to Cart ✨
      </button>
    </div>
  `;
}

function shopTheLook(productIds) {
  productIds.forEach(id => addToCart(id, 'M'));
  showToast('Signature Look added to your cart!');
  closeStylistModal();
}

function resetStylist() {
  stylistStep = 1;
  stylistChoices = { occasion: '', style: '' };
  document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  updateStylistUI();
}
