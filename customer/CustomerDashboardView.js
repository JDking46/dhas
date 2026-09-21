// ==========================================================================
// AURELIA LUXE - CUSTOMER DASHBOARD VIEW
// Location: customer/CustomerDashboardView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { renderProductCard } from '../assets/js/components/ProductCard.js';
import { showToast } from '../assets/js/components/Toast.js';
import { router } from '../assets/js/router.js';

export function renderCustomerDashboardView(container, params, queryParams) {
  const user = store.getCurrentUser();
  const activeTab = queryParams.tab || 'overview';
  const orders = store.getOrders();
  const wishlist = store.getWishlist();
  const recommended = store.getProducts().slice(0, 4);

  const pendingOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;

  container.innerHTML = `
    <div class="animate-fade-in text-white py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Patron Banner -->
      <div class="card-luxe p-6 sm:p-8 bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] border border-[#D4AF37]/30 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div class="flex items-center gap-4 text-center sm:text-left">
          <img src="${user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" class="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shadow-xl" />
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#F5D76E] border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider mb-1">
              ${renderIcon('award', 'w-3 h-3')} Patron of the Arts
            </div>
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-white">Welcome back, ${user?.name || 'Elena Vance'}</h1>
            <p class="text-xs text-neutral-400 mt-0.5">${user?.email} • Member since 2024</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <a href="#/products" class="btn-gold text-xs py-2.5 px-5">
            ${renderIcon('sparkles', 'w-3.5 h-3.5')} Browse New Drops
          </a>
        </div>
      </div>

      <!-- Dashboard Layout: Sidebar + Main Area -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- SIDEBAR (3 cols) -->
        <aside class="lg:col-span-3 card-luxe p-4 bg-[#141414] border border-[#D4AF37]/25 rounded-2xl space-y-1 text-xs">
          ${[
            { id: 'overview', label: 'Dashboard Overview', icon: 'layout-dashboard' },
            { id: 'orders', label: 'My Orders', icon: 'package', badge: orders.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: 'heart', badge: wishlist.length },
            { id: 'addresses', label: 'Saved Addresses', icon: 'map-pin' },
            { id: 'payments', label: 'Payment Methods', icon: 'credit-card' },
            { id: 'notifications', label: 'Notifications', icon: 'bell', badge: 2 },
            { id: 'reviews', label: 'My Reviews', icon: 'star' },
            { id: 'shops', label: 'Followed Ateliers', icon: 'store' },
            { id: 'coupons', label: 'Exclusive Vouchers', icon: 'tag' },
            { id: 'settings', label: 'Account Settings', icon: 'settings' },
            { id: 'support', label: 'Help & Support', icon: 'help-circle' }
          ].map(tab => `
            <button 
              class="cust-sidebar-tab w-full flex items-center justify-between p-2.5 rounded-xl font-medium transition ${activeTab === tab.id ? 'bg-[#D4AF37] text-black font-bold shadow' : 'text-neutral-300 hover:bg-[#1f1f1f] hover:text-white'}"
              data-tab="${tab.id}"
            >
              <span class="flex items-center gap-2.5">
                ${renderIcon(tab.icon, 'w-4 h-4')} ${tab.label}
              </span>
              ${tab.badge ? `
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === tab.id ? 'bg-black text-[#F5D76E]' : 'bg-[#222222] text-neutral-400'}">${tab.badge}</span>
              ` : ''}
            </button>
          `).join('')}

          <div class="pt-2 border-t border-neutral-800">
            <button id="cust-logout-btn" class="w-full flex items-center gap-2.5 p-2.5 text-red-400 hover:bg-[#201515] rounded-xl transition font-medium">
              ${renderIcon('log-out', 'w-4 h-4')} Sign Out
            </button>
          </div>
        </aside>

        <!-- MAIN AREA (9 cols) -->
        <main class="lg:col-span-9 space-y-8">
          
          <!-- TAB: OVERVIEW -->
          ${activeTab === 'overview' ? `
            <div class="space-y-8 animate-fade-in">
              <!-- 5 Metric Cards -->
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div class="card-luxe p-4 bg-[#141414] border border-[#D4AF37]/20 rounded-xl">
                  <div class="text-[11px] text-neutral-400">Total Orders</div>
                  <div class="font-serif text-2xl font-bold text-white mt-1">${orders.length}</div>
                </div>
                <div class="card-luxe p-4 bg-[#141414] border border-[#D4AF37]/20 rounded-xl">
                  <div class="text-[11px] text-neutral-400">In Transit</div>
                  <div class="font-serif text-2xl font-bold text-[#F5D76E] mt-1">${pendingOrdersCount}</div>
                </div>
                <div class="card-luxe p-4 bg-[#141414] border border-[#D4AF37]/20 rounded-xl">
                  <div class="text-[11px] text-neutral-400">Delivered</div>
                  <div class="font-serif text-2xl font-bold text-green-400 mt-1">${deliveredOrdersCount}</div>
                </div>
                <div class="card-luxe p-4 bg-[#141414] border border-[#D4AF37]/20 rounded-xl">
                  <div class="text-[11px] text-neutral-400">Wishlist Items</div>
                  <div class="font-serif text-2xl font-bold text-white mt-1">${wishlist.length}</div>
                </div>
                <div class="card-luxe p-4 bg-[#141414] border border-[#D4AF37]/20 rounded-xl">
                  <div class="text-[11px] text-neutral-400">Patron Points</div>
                  <div class="font-serif text-2xl font-bold text-[#D4AF37] mt-1">${user?.rewardPoints || 480}</div>
                </div>
              </div>

              <!-- Recent Orders Table -->
              <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 class="font-serif font-bold text-base text-[#F5D76E]">Recent Commissions & Orders</h3>
                  <button class="text-xs text-[#D4AF37] hover:underline font-semibold" onclick="document.querySelector('[data-tab=orders]').click()">
                    View All Orders
                  </button>
                </div>

                <div class="space-y-4">
                  ${orders.slice(0, 2).map(o => `
                    <div class="p-4 rounded-xl bg-[#101010] border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div class="flex items-center gap-4">
                        <img src="${o.items[0]?.image}" class="w-14 h-14 rounded-xl object-cover border border-neutral-700 bg-black" />
                        <div>
                          <div class="font-bold text-sm text-white flex items-center gap-2">
                            <span>#${o.id}</span>
                            <span class="badge-gold text-[9px]">${o.status}</span>
                          </div>
                          <div class="text-xs text-neutral-400 mt-0.5">${o.items.length} piece(s) • $${o.total.toFixed(2)} total</div>
                          <div class="text-[10px] text-neutral-500">${o.timestamp}</div>
                        </div>
                      </div>

                      <div class="flex items-center gap-2.5">
                        <a href="#/track-order/${o.id}" class="btn-gold text-xs py-2 px-4">
                          ${renderIcon('truck', 'w-3.5 h-3.5')} Track Live
                        </a>
                        <a href="#/order-confirmation/${o.id}" class="btn-dark text-xs py-2 px-3">
                          Receipt
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Recommended -->
              <div>
                <h3 class="font-serif font-bold text-xl text-white mb-4">Recommended For Your Collection</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  ${recommended.map(p => renderProductCard(p)).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB: MY ORDERS -->
          ${activeTab === 'orders' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <h3 class="font-serif font-bold text-xl text-white pb-3 border-b border-neutral-800">
                My Artisan Orders (${orders.length})
              </h3>
              <div class="space-y-6">
                ${orders.map(o => `
                  <div class="p-5 rounded-2xl bg-[#101010] border border-neutral-800 space-y-4">
                    <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/80 text-xs">
                      <div>
                        <span class="text-neutral-400">Order:</span> <strong class="text-white font-mono">#${o.id}</strong>
                        <span class="mx-2 text-neutral-600">•</span>
                        <span class="text-neutral-400">${o.date}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="badge-gold text-[10px]">${o.status}</span>
                        <span class="font-bold text-[#F5D76E] text-sm">$${o.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div class="divide-y divide-neutral-800/50">
                      ${o.items.map(it => `
                        <div class="py-3 flex items-center justify-between text-xs">
                          <div class="flex items-center gap-3">
                            <img src="${it.image}" class="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <div class="font-bold text-white">${it.name}</div>
                              <div class="text-neutral-400">${it.shopName} • Qty: ${it.quantity}</div>
                            </div>
                          </div>
                          <div class="font-serif font-bold text-[#F5D76E]">$${(it.price * it.quantity).toFixed(2)}</div>
                        </div>
                      `).join('')}
                    </div>

                    <div class="pt-2 flex justify-end gap-3">
                      <a href="#/track-order/${o.id}" class="btn-gold text-xs py-2 px-5">
                        ${renderIcon('truck', 'w-3.5 h-3.5')} Track Shipment
                      </a>
                      <a href="#/order-confirmation/${o.id}" class="btn-dark text-xs py-2 px-4">
                        View Invoice
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- TAB: ADDRESSES -->
          ${activeTab === 'addresses' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 class="font-serif font-bold text-xl text-white">Saved Delivery Addresses</h3>
                <button class="btn-gold text-xs py-2 px-4" onclick="showToast('Address added!', 'success')">
                  ${renderIcon('plus', 'w-3.5 h-3.5')} Add New Address
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="p-5 rounded-xl border border-[#D4AF37] bg-[#1a1a1a] relative space-y-1.5">
                  <span class="badge-gold text-[9px] absolute top-4 right-4">Default</span>
                  <div class="font-bold text-white text-sm">${user?.name}</div>
                  <div class="text-neutral-300">${user?.address}</div>
                  <div class="text-neutral-400">${user?.city}, ${user?.state} ${user?.pincode}</div>
                  <div class="text-neutral-400">${user?.country}</div>
                  <div class="text-neutral-400 pt-1">${user?.phone}</div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB: SETTINGS -->
          ${activeTab === 'settings' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <h3 class="font-serif font-bold text-xl text-white pb-3 border-b border-neutral-800">
                Patron Profile & Security Settings
              </h3>
              <form id="patron-settings-form" class="space-y-4 text-xs max-w-lg">
                <div><label class="block font-semibold text-neutral-300 mb-1">Full Name</label><input type="text" value="${user?.name}" class="input-luxe" /></div>
                <div><label class="block font-semibold text-neutral-300 mb-1">Email Address</label><input type="email" value="${user?.email}" class="input-luxe" /></div>
                <div><label class="block font-semibold text-neutral-300 mb-1">Phone Number</label><input type="tel" value="${user?.phone}" class="input-luxe" /></div>
                <div class="pt-2"><button type="submit" class="btn-gold py-2.5 px-6">Save Changes</button></div>
              </form>
            </div>
          ` : ''}

        </main>
      </div>
    </div>
  `;

  container.querySelectorAll('.cust-sidebar-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab === 'wishlist') router.navigate('/wishlist');
      else if (tab === 'support') router.navigate('/help');
      else router.navigate(`/dashboard/customer?tab=${tab}`);
    });
  });

  document.getElementById('cust-logout-btn')?.addEventListener('click', () => {
    store.logout();
    router.navigate('/login');
  });

  document.getElementById('patron-settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Patron profile updated successfully!', 'success');
  });
}
