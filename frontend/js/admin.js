// frontend/js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const API_URL = 'http://localhost:5001/api/admin';
    const PRODUCTS_API = 'http://localhost:5001/api/products';

    // Helper to safely parse customerInfo which might be a JSON string or object
    function getCustomerInfo(info) {
        if (!info) return { name: 'Guest / Unknown', address: 'N/A' };
        if (typeof info === 'string') {
            try { 
                const parsed = JSON.parse(info); 
                return {
                    name: parsed.name || parsed.fullName || 'Unknown',
                    address: parsed.address || (parsed.city ? parsed.city + ', ' + (parsed.state || '') : 'N/A')
                };
            } catch(e) { 
                return { name: info || 'Unknown', address: 'N/A' }; 
            }
        }
        return {
            name: info.name || info.fullName || 'Unknown',
            address: info.address || (info.city ? info.city + ', ' + (info.state || '') : 'N/A')
        };
    }

    // Helper to safely parse items
    function getItems(items) {
        if (!items) return [];
        if (typeof items === 'string') {
            try { return JSON.parse(items); } catch(e) { return []; }
        }
        return items;
    }

    // Fetch and populate Metrics
    async function loadMetrics() {
        try {
            const res = await fetch(`${API_URL}/metrics`);
            if(!res.ok) throw new Error('API failed');
            const data = await res.json();
            document.getElementById('metrics-revenue').innerText = `₹${data.totalRevenue}`;
            document.getElementById('metrics-orders').innerText = data.totalOrders;
            document.getElementById('metrics-users').innerText = data.totalUsers;
        } catch (error) {
            console.error('Error fetching metrics', error);
        }
    }

    // Load Recent Orders (Dashboard page)
    async function loadRecentOrders() {
        try {
            const res = await fetch(`${API_URL}/orders`);
            if(!res.ok) throw new Error('API failed');
            const orders = await res.json();
            const body = document.getElementById('recent-activity-body');
            body.innerHTML = '';

            const recentOrders = orders.slice(0, 5); // display only 5 recent on dashboard
            if (recentOrders.length === 0) {
                body.innerHTML = '<tr><td colspan="5" style="text-align:center;">No recent activity.</td></tr>';
                return;
            }

            recentOrders.forEach(order => {
                const customer = getCustomerInfo(order.customerInfo);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>#${order.id}</td>
                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${customer.name}</td>
                    <td>₹${order.totalAmount}</td>
                    <td><span class="status-badge status-${order.paymentStatus.toLowerCase()}">${order.paymentStatus}</span></td>
                `;
                body.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching recent orders', error);
        }
    }

    // Load All Orders
    async function loadOrders() {
        try {
            const res = await fetch(`${API_URL}/orders`);
            if(!res.ok) throw new Error('API failed');
            const orders = await res.json();
            const body = document.getElementById('orders-table-body');
            body.innerHTML = '';

            if (orders.length === 0) {
                body.innerHTML = '<tr><td colspan="8" style="text-align:center;">No orders found.</td></tr>';
                return;
            }

            orders.forEach(order => {
                const customer = getCustomerInfo(order.customerInfo);
                const items = getItems(order.items);
                
                let itemsList = '<ul class="items-list">';
                items.forEach(i => {
                    itemsList += `<li>${i.name} (x${i.quantity || 1})</li>`;
                });
                itemsList += '</ul>';
                if(items.length === 0) itemsList = 'N/A';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>#${order.id}</td>
                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                    <td class="compact-info">
                        <strong>${customer.name}</strong>
                        ${customer.address}
                    </td>
                    <td>${itemsList}</td>
                    <td>₹${order.totalAmount}</td>
                    <td class="compact-info">
                        <strong>${order.paymentType}</strong>
                        <span class="status-badge status-${order.paymentStatus.toLowerCase()}">${order.paymentStatus}</span>
                    </td>
                    <td>
                        <span class="status-badge status-${(order.orderStatus || 'processing').toLowerCase()}" id="status-badge-${order.id}">${order.orderStatus || 'Processing'}</span>
                    </td>
                    <td>
                        <select class="status-select" id="select-status-${order.id}">
                            <option value="Processing" ${order.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                            <option value="Shipped" ${order.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                        <button class="btn-update" onclick="updateOrderStatus(${order.id})">Update</button>
                    </td>
                `;
                body.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching all orders', error);
        }
    }

    // Load Products / Inventory
    async function loadProducts() {
        try {
            const res = await fetch(`${PRODUCTS_API}`);
            if(!res.ok) throw new Error('API failed');
            const products = await res.json();
            const body = document.getElementById('products-table-body');
            body.innerHTML = '';

            if (products.length === 0) {
                body.innerHTML = '<tr><td colspan="6" style="text-align:center;">No products found.</td></tr>';
                return;
            }

            products.forEach(product => {
                // Generate a mock systematic stock number based on product ID for demo purposes
                // Real apps would have this in DB. We simulate Out of Stock organically.
                const stock = (product.id * 13) % 40; 
                let stockStatus = '';
                
                if (stock === 0) {
                    stockStatus = '<span class="status-badge status-failed">Out of Stock</span>';
                } else if (stock < 5) {
                    stockStatus = '<span class="status-badge status-pending">Low Stock</span>';
                } else {
                    stockStatus = '<span class="status-badge status-success">In Stock</span>';
                }

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>P-${product.id}</td>
                    <td><strong>${product.name}</strong></td>
                    <td style="text-transform: capitalize;">${product.category}</td>
                    <td>₹${product.price}</td>
                    <td>${stock} pcs</td>
                    <td>${stockStatus}</td>
                `;
                body.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }

    // Load Users
    async function loadUsers() {
        try {
            const res = await fetch(`${API_URL}/users`);
            if(!res.ok) throw new Error('API failed');
            const users = await res.json();
            const body = document.getElementById('users-table-body');
            body.innerHTML = '';

            if (users.length === 0) {
                body.innerHTML = '<tr><td colspan="4" style="text-align:center;">No users registered.</td></tr>';
                return;
            }

            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.id.substring(0,8)}...</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                `;
                body.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching users', error);
        }
    }

    // Load Reviews
    async function loadReviews() {
        try {
            const res = await fetch(`${API_URL}/reviews`);
            if(!res.ok) throw new Error('API failed');
            const reviews = await res.json();
            const body = document.getElementById('reviews-table-body');
            body.innerHTML = '';

            if (reviews.length === 0) {
                body.innerHTML = '<tr><td colspan="6" style="text-align:center;">No reviews yet.</td></tr>';
                return;
            }

            reviews.forEach(review => {
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${review.id.substring(0,8)}...</td>
                    <td>Product #${review.productId}</td>
                    <td>${review.userName}</td>
                    <td class="rating-stars">${stars}</td>
                    <td>${review.comment}</td>
                    <td>${new Date(review.createdAt).toLocaleDateString()}</td>
                `;
                body.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching reviews', error);
        }
    }

    // Expose function globally for the onclick attribute
    window.updateOrderStatus = async function(orderId) {
        const select = document.getElementById(`select-status-${orderId}`);
        const orderStatus = select.value;
        const btn = select.nextElementSibling;
        
        btn.innerText = '...';
        
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderStatus })
            });
            const data = await res.json();
            
            if (res.ok) {
                btn.innerText = 'Ok!';
                const badge = document.getElementById(`status-badge-${orderId}`);
                badge.innerText = orderStatus;
                badge.className = `status-badge status-${orderStatus.toLowerCase()}`;
                
                setTimeout(() => { btn.innerText = 'Update'; }, 2000);
            } else {
                alert(data.message || 'Error updating status');
                btn.innerText = 'Update';
            }
        } catch (error) {
            console.error('Error:', error);
            btn.innerText = 'Error';
            setTimeout(() => { btn.innerText = 'Update'; }, 2000);
        }
    };

    // Initialize Dashboard
    loadMetrics();
    loadRecentOrders();
    loadOrders();
    loadProducts();
    loadUsers();
    loadReviews();
});
