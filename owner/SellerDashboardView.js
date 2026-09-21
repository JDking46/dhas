// ==========================================================================
// AURELIA LUXE - SELLER / SHOP OWNER DASHBOARD VIEW
// Location: owner/SellerDashboardView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { router } from '../assets/js/router.js';

export function renderSellerDashboardView(container, params, queryParams) {
  const user = store.getCurrentUser();
  const shop = store.getShopById(user?.shopId || 'atelier-aurelia') || store.getShops()[0];
  const activeTab = queryParams.tab || 'overview';

  const sellerProducts = store.getProductsByShop(shop.id);
  const allOrders = store.getOrders();
  const sellerOrders = allOrders.filter(o => o.items.some(i => i.shopId === shop.id));

  let grossSales = 0;
  let totalPiecesSold = 0;
  sellerOrders.forEach(o => {
    o.items.filter(i => i.shopId === shop.id).forEach(it => {
      grossSales += (it.price * it.quantity);
      totalPiecesSold += it.quantity;
    });
  });

  const commissionRate = store.state.settings.platformCommission; // 10%
  const platformFees = Math.round(grossSales * (commissionRate / 100) * 100) / 100;
  const netEarnings = Math.round((grossSales - platformFees) * 100) / 100;
  const pendingOrders = sellerOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');

  container.innerHTML = `
    <div class="animate-fade-in text-white py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Atelier Header -->
      <div class="card-luxe p-6 sm:p-8 bg-gradient-to-r from-[#171717] via-[#1a1a1a] to-[#121212] border border-[#D4AF37]/40 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div class="flex items-center gap-4 text-center sm:text-left">
          <img src="${shop.avatar}" class="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-xl bg-black" />
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider mb-1">
              ${renderIcon('store', 'w-3 h-3')} Artisan Atelier Portal
            </div>
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-white">${shop.name}</h1>
            <div class="text-xs text-neutral-400 mt-0.5">Master Creator: <span class="text-white">${shop.owner}</span> • ${shop.location}</div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <a href="#/shop/${shop.slug}" class="btn-gold-outline text-xs py-2 px-4" target="_blank">
            ${renderIcon('external-link', 'w-3.5 h-3.5')} View Public Atelier
          </a>
          <button id="add-product-top-btn" class="btn-gold text-xs py-2 px-4">
            ${renderIcon('plus', 'w-3.5 h-3.5')} Add New Creation
          </button>
        </div>
      </div>

      <!-- Layout: Sidebar + Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- SIDEBAR (3 cols) -->
        <aside class="lg:col-span-3 card-luxe p-4 bg-[#141414] border border-[#D4AF37]/25 rounded-2xl space-y-1 text-xs">
          ${[
            { id: 'overview', label: 'Dashboard Overview', icon: 'layout-dashboard' },
            { id: 'products', label: 'Products & Inventory', icon: 'tag', badge: sellerProducts.length },
            { id: 'orders', label: 'Customer Orders', icon: 'package', badge: sellerOrders.length },
            { id: 'earnings', label: 'Earnings & Payouts', icon: 'dollar-sign' },
            { id: 'analytics', label: 'Sales Analytics', icon: 'bar-chart-3' },
            { id: 'reviews', label: 'Customer Reviews', icon: 'star' },
            { id: 'settings', label: 'Shop Settings', icon: 'settings' }
          ].map(tab => `
            <button 
              class="seller-sidebar-tab w-full flex items-center justify-between p-2.5 rounded-xl font-medium transition ${activeTab === tab.id ? 'bg-[#D4AF37] text-black font-bold shadow' : 'text-neutral-300 hover:bg-[#1f1f1f] hover:text-white'}"
              data-tab="${tab.id}"
            >
              <span class="flex items-center gap-2.5">
                ${renderIcon(tab.icon, 'w-4 h-4')} ${tab.label}
              </span>
              ${tab.badge !== undefined ? `
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === tab.id ? 'bg-black text-[#F5D76E]' : 'bg-[#222222] text-neutral-400'}">${tab.badge}</span>
              ` : ''}
            </button>
          `).join('')}

          <div class="pt-2 border-t border-neutral-800">
            <button id="seller-logout-btn" class="w-full flex items-center gap-2.5 p-2.5 text-red-400 hover:bg-[#201515] rounded-xl transition font-medium">
              ${renderIcon('log-out', 'w-4 h-4')} Sign Out
            </button>
          </div>
        </aside>

        <!-- MAIN (9 cols) -->
        <main class="lg:col-span-9 space-y-8">
          
          <!-- TAB: OVERVIEW -->
          ${activeTab === 'overview' ? `
            <div class="space-y-8 animate-fade-in">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl space-y-1">
                  <div class="text-[11px] text-neutral-400">Gross Sales</div>
                  <div class="font-serif text-2xl font-bold text-[#F5D76E]">$${grossSales.toFixed(2)}</div>
                  <div class="text-[10px] text-green-400">+14.2% this month</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl space-y-1">
                  <div class="text-[11px] text-neutral-400">Net Earnings (After 10%)</div>
                  <div class="font-serif text-2xl font-bold text-white">$${netEarnings.toFixed(2)}</div>
                  <div class="text-[10px] text-neutral-500">Platform fee: $${platformFees.toFixed(2)}</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl space-y-1">
                  <div class="text-[11px] text-neutral-400">Total Orders</div>
                  <div class="font-serif text-2xl font-bold text-white">${sellerOrders.length}</div>
                  <div class="text-[10px] text-[#F5D76E]">${pendingOrders.length} require action</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl space-y-1">
                  <div class="text-[11px] text-neutral-400">Pieces Crafted</div>
                  <div class="font-serif text-2xl font-bold text-white">${totalPiecesSold}</div>
                  <div class="text-[10px] text-neutral-500">${sellerProducts.length} active listings</div>
                </div>
              </div>

              <!-- Revenue Chart -->
              <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <h3 class="font-serif font-bold text-base text-white">Atelier Revenue Growth</h3>
                    <p class="text-xs text-neutral-400">Monthly gross sales trajectory</p>
                  </div>
                  <span class="badge-gold text-[10px]">2026 Fiscal Year</span>
                </div>
                <div class="relative h-64 w-full">
                  <canvas id="seller-revenue-chart"></canvas>
                </div>
              </div>

              <!-- Pending Orders -->
              <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 class="font-serif font-bold text-base text-[#F5D76E]">Orders In Progress</h3>
                  <button class="text-xs text-[#D4AF37] hover:underline font-semibold" onclick="document.querySelector('[data-tab=orders]').click()">
                    View All Orders
                  </button>
                </div>

                <div class="space-y-4">
                  ${pendingOrders.slice(0, 3).map(o => `
                    <div class="p-4 rounded-xl bg-[#101010] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div class="font-bold text-white text-sm">Order #${o.id} • ${o.customerName}</div>
                        <div class="text-neutral-400 mt-0.5">Dest: ${o.shippingAddress.city}, ${o.shippingAddress.country}</div>
                        <div class="text-[10px] text-[#F5D76E] mt-1 font-semibold">Current Status: ${o.status}</div>
                      </div>

                      <div class="flex items-center gap-2">
                        <select class="order-status-quick-select bg-[#1a1a1a] border border-neutral-700 text-white rounded p-1.5 text-xs" data-order-id="${o.id}">
                          <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                          <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                          <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                        <a href="#/track-order/${o.id}" class="btn-dark py-1.5 px-3">Inspect</a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB: PRODUCTS -->
          ${activeTab === 'products' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h3 class="font-serif font-bold text-xl text-white">Artisan Product Inventory</h3>
                  <p class="text-xs text-neutral-400">Manage catalog, pricing, variants, and stock (${sellerProducts.length} pieces)</p>
                </div>
                <button id="open-add-product-modal-btn" class="btn-gold text-xs py-2 px-4">
                  ${renderIcon('plus', 'w-3.5 h-3.5')} Add Product
                </button>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#101010] text-neutral-400 uppercase font-bold border-b border-neutral-800">
                    <tr>
                      <th class="p-3">Masterpiece</th>
                      <th class="p-3">Category</th>
                      <th class="p-3">Price</th>
                      <th class="p-3">Stock</th>
                      <th class="p-3">Reviews</th>
                      <th class="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-neutral-800">
                    ${sellerProducts.map(p => `
                      <tr class="hover:bg-[#181818] transition">
                        <td class="p-3 flex items-center gap-3">
                          <img src="${p.images[0]}" class="w-10 h-10 rounded-lg object-cover bg-black border border-neutral-700" />
                          <div>
                            <div class="font-bold text-white">${p.name}</div>
                            <div class="text-[10px] text-neutral-500 font-mono">${p.sku}</div>
                          </div>
                        </td>
                        <td class="p-3 text-neutral-300 capitalize">${p.category}</td>
                        <td class="p-3 font-serif font-bold text-[#F5D76E]">$${p.price.toFixed(2)}</td>
                        <td class="p-3">
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.stock > 0 ? 'bg-green-900/40 text-green-400 border border-green-700' : 'bg-red-900/40 text-red-400 border border-red-700'}">
                            ${p.stock} units
                          </span>
                        </td>
                        <td class="p-3 text-[#D4AF37] font-bold">${p.rating} ★ (${p.reviewsCount})</td>
                        <td class="p-3 text-right space-x-2">
                          <button class="delete-product-btn text-red-400 hover:text-red-300 p-1" data-product-id="${p.id}" title="Delete Product">
                            ${renderIcon('trash-2', 'w-4 h-4')}
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- TAB: ORDERS -->
          ${activeTab === 'orders' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <div class="pb-4 border-b border-neutral-800">
                <h3 class="font-serif font-bold text-xl text-white">Customer Orders & Dispatch Pipeline</h3>
                <p class="text-xs text-neutral-400">Update fulfillment status from Confirmed to Delivered</p>
              </div>

              <div class="space-y-4">
                ${sellerOrders.map(o => `
                  <div class="p-5 rounded-2xl bg-[#101010] border border-neutral-800 space-y-3 text-xs">
                    <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                      <div>
                        <span class="text-neutral-400">Order:</span> <strong class="text-white font-mono">#${o.id}</strong>
                        <span class="mx-2 text-neutral-600">•</span>
                        <span class="text-neutral-400">Customer: ${o.customerName}</span>
                      </div>
                      <div class="flex items-center gap-3">
                        <span class="text-neutral-400">Update Status:</span>
                        <select class="order-status-select bg-[#1a1a1a] border border-[#D4AF37]/50 text-[#F5D76E] font-bold rounded px-2 py-1 text-xs" data-order-id="${o.id}">
                          <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                          <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                          <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-400">
                      <div>
                        <div class="text-white font-semibold mb-1">Items:</div>
                        ${o.items.filter(i => i.shopId === shop.id).map(it => `
                          <div class="text-white">• ${it.name} (Qty: ${it.quantity}) - $${(it.price * it.quantity).toFixed(2)}</div>
                        `).join('')}
                      </div>
                      <div>
                        <div class="text-white font-semibold mb-1">Destination:</div>
                        <div>${o.shippingAddress.address}, ${o.shippingAddress.city}, ${o.shippingAddress.country}</div>
                        <div>Carrier: ${o.carrier} (${o.trackingNumber})</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- TAB: EARNINGS -->
          ${activeTab === 'earnings' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <div class="pb-4 border-b border-neutral-800">
                <h3 class="font-serif font-bold text-xl text-white">Financial Settlement & Commission Architecture</h3>
                <p class="text-xs text-neutral-400">Aurelia retains a standard 10% platform fee for insured escrow.</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-5 rounded-xl bg-[#101010] border border-neutral-800">
                  <div class="text-xs text-neutral-400">Cumulative Gross Sales</div>
                  <div class="font-serif text-3xl font-bold text-white mt-1">$${grossSales.toFixed(2)}</div>
                </div>
                <div class="p-5 rounded-xl bg-[#101010] border border-neutral-800">
                  <div class="text-xs text-neutral-400">Platform Commission (10%)</div>
                  <div class="font-serif text-3xl font-bold text-neutral-400 mt-1">$${platformFees.toFixed(2)}</div>
                </div>
                <div class="p-5 rounded-xl bg-[#101010] border border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  <div class="text-xs text-[#D4AF37] font-semibold">Net Disbursed Earnings</div>
                  <div class="font-serif text-3xl font-bold text-[#F5D76E] mt-1">$${netEarnings.toFixed(2)}</div>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-[#101010] border border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-white text-sm">Automated Weekly IBAN Wire</h4>
                  <p class="text-xs text-neutral-400">Current Payout Account: DE89 3704 •••• •••• 0130 00</p>
                </div>
                <button id="request-payout-btn" class="btn-gold text-xs py-2.5 px-6">
                  ${renderIcon('dollar-sign', 'w-4 h-4')} Request Instant Payout
                </button>
              </div>
            </div>
          ` : ''}

        </main>
      </div>

      <!-- Add Product Modal -->
      <div id="add-product-modal" class="fixed inset-0 z-50 bg-black/80 hidden items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-[#171717] border border-[#D4AF37]/50 w-full max-w-2xl rounded-3xl p-6 sm:p-8 text-white space-y-5 animate-fade-in shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 class="font-serif font-bold text-lg text-[#F5D76E]">List New Handmade Masterpiece</h3>
            <button id="close-add-product-modal-btn" class="text-neutral-400 hover:text-white">${renderIcon('x', 'w-5 h-5')}</button>
          </div>

          <form id="new-product-form" class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-4">
              <div><label class="block font-semibold mb-1">Product Title *</label><input type="text" id="np-name" required placeholder="e.g. Hand-Carved Oak Keepsake Box" class="input-luxe" /></div>
              <div>
                <label class="block font-semibold mb-1">Category Medium *</label>
                <select id="np-category" class="input-luxe">
                  ${store.state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="block font-semibold mb-1">Price ($ USD) *</label><input type="number" id="np-price" required step="0.01" value="185.00" class="input-luxe text-[#F5D76E] font-bold" /></div>
              <div><label class="block font-semibold mb-1">Original Price</label><input type="number" id="np-orig-price" step="0.01" value="220.00" class="input-luxe" /></div>
              <div><label class="block font-semibold mb-1">Stock *</label><input type="number" id="np-stock" required value="5" class="input-luxe" /></div>
            </div>
            <div><label class="block font-semibold mb-1">Artisan Description & Story *</label><textarea id="np-desc" required rows="3" class="input-luxe">Handcrafted using sustainably logged European timber.</textarea></div>
            <div><label class="block font-semibold mb-1">Image URL *</label><input type="url" id="np-image" value="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80" class="input-luxe" /></div>
            <div class="pt-4 border-t border-neutral-800 flex justify-end gap-3">
              <button type="button" id="cancel-add-product-btn" class="btn-dark py-2 px-4">Cancel</button>
              <button type="submit" class="btn-gold py-2.5 px-6">Publish Masterpiece</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;

  attachHandlers();
  initRevenueChart();
}

function attachHandlers() {
  document.querySelectorAll('.seller-sidebar-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      router.navigate(`/dashboard/seller?tab=${tab}`);
    });
  });

  document.getElementById('seller-logout-btn')?.addEventListener('click', () => {
    store.logout();
    router.navigate('/login');
  });

  document.querySelectorAll('.order-status-select, .order-status-quick-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const orderId = e.target.dataset.orderId;
      const newStatus = e.target.value;
      store.updateOrderStatus(orderId, newStatus);
      showToast(`Order #${orderId} marked as ${newStatus}!`, 'success');
    });
  });

  document.querySelectorAll('.delete-product-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.productId;
      if (confirm('Are you sure you want to retire this piece from public sale?')) {
        store.deleteProduct(pId);
        showToast('Product removed from inventory.', 'gold');
        router.navigate('/dashboard/seller?tab=products');
      }
    });
  });

  const addModal = document.getElementById('add-product-modal');
  const openAdd = () => { addModal?.classList.remove('hidden'); addModal?.classList.add('flex'); };
  const closeAdd = () => { addModal?.classList.add('hidden'); addModal?.classList.remove('flex'); };

  document.getElementById('add-product-top-btn')?.addEventListener('click', openAdd);
  document.getElementById('open-add-product-modal-btn')?.addEventListener('click', openAdd);
  document.getElementById('close-add-product-modal-btn')?.addEventListener('click', closeAdd);
  document.getElementById('cancel-add-product-btn')?.addEventListener('click', closeAdd);

  document.getElementById('new-product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('np-name').value;
    const category = document.getElementById('np-category').value;
    const price = document.getElementById('np-price').value;
    const origPrice = document.getElementById('np-orig-price').value;
    const stock = document.getElementById('np-stock').value;
    const desc = document.getElementById('np-desc').value;
    const image = document.getElementById('np-image').value;

    store.addProduct({
      name, category, price: parseFloat(price), originalPrice: parseFloat(origPrice) || parseFloat(price),
      stock: parseInt(stock), description: desc, images: [image]
    });

    showToast(`"${name}" published to catalog!`, 'success');
    closeAdd();
    router.navigate('/dashboard/seller?tab=products');
  });

  document.getElementById('request-payout-btn')?.addEventListener('click', () => {
    showToast('Wire transfer for available funds initiated to your verified IBAN.', 'success');
  });
}

function initRevenueChart() {
  const ctx = document.getElementById('seller-revenue-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep (MTD)'],
      datasets: [
        {
          label: 'Gross Revenue ($)',
          data: [1420, 2180, 1950, 3200, 3840],
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: '#F5D76E',
          pointBorderColor: '#080808',
          pointRadius: 5
        },
        {
          label: 'Net Artisan Earnings ($)',
          data: [1278, 1962, 1755, 2880, 3456],
          borderColor: '#F5D76E',
          borderDash: [5, 5],
          borderWidth: 1.5,
          tension: 0.35,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#B8B8B8', font: { size: 11 } } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#737373', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#737373', font: { size: 10 }, callback: v => '$' + v } }
      }
    }
  });
}
