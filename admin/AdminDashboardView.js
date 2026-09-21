// ==========================================================================
// AURELIA LUXE - PLATFORM ADMIN DASHBOARD VIEW
// Location: admin/AdminDashboardView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { router } from '../assets/js/router.js';

export function renderAdminDashboardView(container, params, queryParams) {
  const activeTab = queryParams.tab || 'overview';
  const shops = store.getShops();
  const products = store.getProducts();
  const orders = store.getOrders();
  const tickets = store.getTickets();
  const coupons = store.state.coupons;
  const categories = store.state.categories;
  const settings = store.state.settings;
  const auditLogs = store.state.auditLogs;

  const totalPlatformVolume = orders.reduce((acc, curr) => acc + curr.total, 0);
  const platformRevenue = orders.reduce((acc, curr) => acc + curr.commissionFee, 0);

  container.innerHTML = `
    <div class="animate-fade-in text-white py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Admin Header -->
      <div class="card-luxe p-6 bg-gradient-to-r from-[#171717] via-[#202020] to-[#121212] border border-[#D4AF37]/50 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div class="flex items-center gap-4 text-center sm:text-left">
          <div class="w-14 h-14 rounded-2xl bg-black border-2 border-[#D4AF37] flex items-center justify-center text-[#F5D76E] shadow-xl">
            ${renderIcon('shield-check', 'w-8 h-8')}
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider mb-1">
              Super Administrator
            </div>
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-white">Aurelia Platform Governance</h1>
            <p class="text-xs text-neutral-400">Global marketplace operations, escrow settlement, and atelier curation.</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs text-neutral-400">Commission Rate:</span>
          <span class="bg-black text-[#F5D76E] font-mono px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 font-bold text-xs">
            ${settings.platformCommission}% FEE
          </span>
        </div>
      </div>

      <!-- Layout: Sidebar + Main Area -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- SIDEBAR (3 cols) -->
        <aside class="lg:col-span-3 card-luxe p-4 bg-[#141414] border border-[#D4AF37]/25 rounded-2xl space-y-1 text-xs">
          ${[
            { id: 'overview', label: 'Platform Overview', icon: 'layout-dashboard' },
            { id: 'sellers', label: 'Artisan Sellers & Shops', icon: 'store', badge: shops.length },
            { id: 'products', label: 'Products & Moderation', icon: 'tag', badge: products.length },
            { id: 'categories', label: 'Category Architecture', icon: 'layers', badge: categories.length },
            { id: 'orders', label: 'Global Orders', icon: 'package', badge: orders.length },
            { id: 'commission', label: 'Commission & Settings', icon: 'dollar-sign' },
            { id: 'coupons', label: 'Promo Coupons', icon: 'tag', badge: coupons.length },
            { id: 'tickets', label: 'Support Inquiries', icon: 'help-circle', badge: tickets.length },
            { id: 'logs', label: 'Audit Security Logs', icon: 'clock' }
          ].map(tab => `
            <button 
              class="admin-sidebar-tab w-full flex items-center justify-between p-2.5 rounded-xl font-medium transition ${activeTab === tab.id ? 'bg-[#D4AF37] text-black font-bold shadow' : 'text-neutral-300 hover:bg-[#1f1f1f] hover:text-white'}"
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
            <button id="admin-logout-btn" class="w-full flex items-center gap-2.5 p-2.5 text-red-400 hover:bg-[#201515] rounded-xl transition font-medium">
              ${renderIcon('log-out', 'w-4 h-4')} Exit Admin Portal
            </button>
          </div>
        </aside>

        <!-- MAIN AREA (9 cols) -->
        <main class="lg:col-span-9 space-y-8">
          
          <!-- TAB: OVERVIEW -->
          ${activeTab === 'overview' ? `
            <div class="space-y-8 animate-fade-in">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl">
                  <div class="text-xs text-neutral-400">Total GMV Volume</div>
                  <div class="font-serif text-2xl font-bold text-white mt-1">$${totalPlatformVolume.toFixed(2)}</div>
                  <div class="text-[10px] text-green-400">+22.4% vs last period</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl">
                  <div class="text-xs text-[#D4AF37]">Platform Commission Revenue</div>
                  <div class="font-serif text-2xl font-bold text-[#F5D76E] mt-1">$${platformRevenue.toFixed(2)}</div>
                  <div class="text-[10px] text-neutral-400">10% standard take rate</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl">
                  <div class="text-xs text-neutral-400">Active Guild Sellers</div>
                  <div class="font-serif text-2xl font-bold text-white mt-1">${shops.length} Ateliers</div>
                  <div class="text-[10px] text-green-400">100% verified status</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl">
                  <div class="text-xs text-neutral-400">Handcrafted Listings</div>
                  <div class="font-serif text-2xl font-bold text-white mt-1">${products.length} Pieces</div>
                  <div class="text-[10px] text-neutral-400">Across 14 mediums</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl">
                  <div class="text-xs text-neutral-400">Orders Processed</div>
                  <div class="font-serif text-2xl font-bold text-white mt-1">${orders.length} Orders</div>
                  <div class="text-[10px] text-green-400">Zero disputes</div>
                </div>

                <div class="card-luxe p-5 bg-[#141414] border border-[#D4AF37]/30 rounded-xl">
                  <div class="text-xs text-neutral-400">Support Inquiries</div>
                  <div class="font-serif text-2xl font-bold text-[#F5D76E] mt-1">${tickets.length} Open</div>
                  <div class="text-[10px] text-neutral-400">Avg 2.4 hr response</div>
                </div>
              </div>

              <!-- Platform Chart -->
              <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <h3 class="font-serif font-bold text-base text-white">Platform GMV & Commission Velocity</h3>
                    <p class="text-xs text-neutral-400">Aggregated marketplace throughput</p>
                  </div>
                  <span class="badge-gold text-[10px]">Real-time Telemetry</span>
                </div>
                <div class="relative h-64 w-full">
                  <canvas id="admin-platform-chart"></canvas>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB: SELLERS -->
          ${activeTab === 'sellers' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <div class="pb-4 border-b border-neutral-800">
                <h3 class="font-serif font-bold text-xl text-white">Artisan Seller Directory</h3>
                <p class="text-xs text-neutral-400">Verify and moderate workshop status</p>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#101010] text-neutral-400 uppercase font-bold border-b border-neutral-800">
                    <tr>
                      <th class="p-3">Atelier</th>
                      <th class="p-3">Master Artisan</th>
                      <th class="p-3">Status</th>
                      <th class="p-3 text-right">Moderation</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-neutral-800">
                    ${shops.map(s => `
                      <tr class="hover:bg-[#181818] transition">
                        <td class="p-3 flex items-center gap-2.5">
                          <img src="${s.avatar}" class="w-9 h-9 rounded-xl object-cover border border-[#D4AF37]" />
                          <div>
                            <div class="font-bold text-white">${s.name}</div>
                            <div class="text-[10px] text-neutral-400">${s.location}</div>
                          </div>
                        </td>
                        <td class="p-3 text-neutral-300">${s.owner}</td>
                        <td class="p-3">
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'approved' ? 'bg-green-900/40 text-green-400 border border-green-700' : 'bg-red-900/40 text-red-400 border border-red-700'}">
                            ${s.status}
                          </span>
                        </td>
                        <td class="p-3 text-right space-x-2">
                          <button class="approve-seller-btn text-xs px-2.5 py-1 rounded bg-green-900/50 hover:bg-green-700 text-green-200 transition" data-shop-id="${s.id}">Approve</button>
                          <button class="suspend-seller-btn text-xs px-2.5 py-1 rounded bg-red-900/50 hover:bg-red-700 text-red-200 transition" data-shop-id="${s.id}">Suspend</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- TAB: COMMISSION -->
          ${activeTab === 'commission' ? `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6 animate-fade-in">
              <div class="pb-4 border-b border-neutral-800">
                <h3 class="font-serif font-bold text-xl text-white">Platform Commission & Tax Settings</h3>
              </div>
              <form id="admin-settings-form" class="space-y-4 text-xs max-w-lg">
                <div>
                  <label class="block font-semibold text-neutral-300 mb-1">Platform Commission Fee (%)</label>
                  <input type="number" id="adm-commission" value="${settings.platformCommission}" min="1" max="50" class="input-luxe text-[#F5D76E] font-bold" />
                </div>
                <div>
                  <label class="block font-semibold text-neutral-300 mb-1">Marketplace Tax Rate (%)</label>
                  <input type="number" id="adm-tax" value="${settings.taxRate}" min="0" max="30" class="input-luxe" />
                </div>
                <div>
                  <label class="block font-semibold text-neutral-300 mb-1">Free Shipping Threshold ($ USD)</label>
                  <input type="number" id="adm-shipping" value="${settings.freeShippingThreshold}" class="input-luxe" />
                </div>
                <div class="pt-2">
                  <button type="submit" class="btn-gold py-2.5 px-6">Save Platform Configuration</button>
                </div>
              </form>
            </div>
          ` : ''}

        </main>
      </div>

    </div>
  `;

  attachAdminHandlers();
  initAdminChart();
}

function attachAdminHandlers() {
  document.querySelectorAll('.admin-sidebar-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      router.navigate(`/dashboard/admin?tab=${tab}`);
    });
  });

  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    store.logout();
    router.navigate('/admin/login');
  });

  document.querySelectorAll('.approve-seller-btn').forEach(b => {
    b.addEventListener('click', () => {
      store.approveSeller(b.dataset.shopId);
      showToast('Artisan Atelier approved!', 'success');
      router.navigate('/dashboard/admin?tab=sellers');
    });
  });

  document.querySelectorAll('.suspend-seller-btn').forEach(b => {
    b.addEventListener('click', () => {
      store.suspendSeller(b.dataset.shopId);
      showToast('Artisan Atelier suspended.', 'error');
      router.navigate('/dashboard/admin?tab=sellers');
    });
  });

  document.getElementById('admin-settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const comm = parseFloat(document.getElementById('adm-commission').value);
    const tax = parseFloat(document.getElementById('adm-tax').value);
    const shipping = parseFloat(document.getElementById('adm-shipping').value);

    store.updatePlatformSettings({ platformCommission: comm, taxRate: tax, freeShippingThreshold: shipping });
    showToast(`Updated platform commission to ${comm}%!`, 'success');
  });
}

function initAdminChart() {
  const ctx = document.getElementById('admin-platform-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['April', 'May', 'June', 'July', 'August', 'September'],
      datasets: [
        { label: 'Platform GMV ($)', data: [18400, 24600, 31200, 38900, 44200, 52800], backgroundColor: '#D4AF37', borderRadius: 6 },
        { label: 'Platform Net Commission ($)', data: [1840, 2460, 3120, 3890, 4420, 5280], backgroundColor: '#F5D76E', borderRadius: 6 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#B8B8B8', font: { size: 11 } } } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#737373', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#737373', font: { size: 10 }, callback: v => '$' + v } }
      }
    }
  });
}
