// Cart Page JS

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartContent');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="collections.html" class="btn-gold">Browse Collections</a>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-item" id="cart-item-${item.cartItemId}">
            <div class="cart-item-img">
              <img src="${item.image}" alt="${item.name}"/>
            </div>
            <div class="cart-item-info">
              <p class="cart-item-cat">${item.category === 'tshirts' ? 'T-Shirts' : item.category === 'formal' ? 'Formal Wear' : 'Traditional Wear'} <span style="margin-left:8px; padding:2px 6px; background:var(--off-white); border-radius:4px; font-size:0.75rem;">Size: ${item.size || 'M'}</span></p>
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
              <div class="qty-control">
                <button class="qty-btn" onclick="changeQty('${item.cartItemId}', -1)">−</button>
                <span class="qty-num" id="qty-${item.cartItemId}">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty('${item.cartItemId}', 1)">+</button>
              </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.cartItemId}')" title="Remove">✕</button>
          </div>
        `).join('')}
      </div>

      <div class="order-summary">
        <h3 class="summary-title">Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal (${cart.reduce((s,i) => s+i.qty,0)} items)</span>
          <span>₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
        </div>
        ${shipping > 0 ? `<div class="summary-row"><span style="font-size:0.75rem;color:var(--gold-dark)">Add ₹${(999-subtotal).toLocaleString('en-IN')} more for free shipping</span></div>` : ''}
        <div class="summary-row total">
          <span>Total</span>
          <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
        <button class="checkout-btn" onclick="placeOrder()">Place Order</button>
        <a href="collections.html" class="continue-shopping">← Continue Shopping</a>
      </div>
    </div>`;
}

function changeQty(cartItemId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(cartItemId);
    return;
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(cartItemId) {
  let cart = getCart();
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart(cart);
  renderCart();
  showToast('Item removed from cart');
}

function placeOrder() {
  const user = JSON.parse(localStorage.getItem('vastra_user') || 'null');
  if (!user) {
    showToast('Please login to place an order.');
    setTimeout(() => {
      window.location.href = 'login.html?redirect=payment.html';
    }, 1500);
    return;
  }
  window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', renderCart);
