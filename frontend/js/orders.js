document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('ordersContainer');
  const user = JSON.parse(localStorage.getItem('vastra_user') || 'null');

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  updateCartCount();
  updateNavUser();

  try {
    const res = await fetch(`http://localhost:5001/api/orders/${user.id}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    
    const orders = await res.json();
    
    if (orders.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 60px 20px;">
          <h3 style="font-family: var(--font-display); font-size: 2rem; color: var(--text-primary); margin-bottom: 12px;">No Orders Yet</h3>
          <p style="color: var(--text-secondary);">You haven't placed any orders with us yet. Start shopping!</p>
          <a href="collections.html" class="btn-gold" style="display:inline-block; margin-top:20px;">Browse Collections</a>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <div>
            <p>Order Placed</p>
            <h4>${new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
          </div>
          <div>
            <p>Order ID</p>
            <h4>#VST-${order.id.toString().padStart(6, '0')}</h4>
          </div>
          <div class="order-status ${order.paymentStatus.includes('Pending') ? 'status-pending' : order.paymentStatus.includes('Failed') ? 'status-failed' : 'status-success'}">
            ${order.paymentStatus}
          </div>
        </div>
        <div class="order-body">
          <div class="order-item-list">
            ${order.items.map(item => `
              <div class="item">
                <img src="${item.image}" alt="${item.name}" class="item-img" />
                <div class="item-info">
                  <h5>${item.name} <span style="font-size:0.75rem; background:var(--bg-secondary); color:var(--gold); border:1px solid var(--border-secondary); padding:3px 8px; border-radius:4px; margin-left:8px; font-family:var(--font-body);">Size: ${item.size || 'M'}</span></h5>
                  <p>Qty: ${item.qty} &nbsp;&nbsp;|&nbsp;&nbsp; ₹${item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="order-footer">
          <h4>Total: ₹${parseFloat(order.totalAmount).toLocaleString('en-IN')}</h4>
        </div>
      </div>
    `).join('');

  } catch (err) {
    container.innerHTML = `<p style="color:red; text-align:center;">Error loading orders. Please try again later.</p>`;
    console.error(err);
  }
});
