// ==========================================================================
// AURELIA LUXE - ORDER TRACKING VIEW
// Location: customer/OrderTrackingView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { renderOrderTimeline } from '../assets/js/components/OrderTimeline.js';

export function renderOrderTrackingView(container, params) {
  const order = store.getOrderById(params.id) || store.getOrders()[0];

  if (!order) {
    container.innerHTML = `
      <div class="py-24 text-center text-white max-w-md mx-auto">
        <h2 class="font-serif text-2xl font-bold mb-3">Order Tracking Not Found</h2>
        <a href="#/products" class="btn-gold text-xs py-2.5 px-6">Explore Catalog</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="animate-fade-in text-white py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div class="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <a href="#/dashboard/customer?tab=orders" class="hover:text-white transition">My Orders</a>
            <span>/</span>
            <span class="text-[#D4AF37]">Tracking #${order.id}</span>
          </div>
          <h1 class="font-serif text-3xl font-bold text-white">Artisan Dispatch Tracking</h1>
        </div>
        <div class="text-right">
          <span class="badge-gold text-xs">${order.status}</span>
          <div class="text-[11px] text-neutral-400 mt-1">Carrier: ${order.carrier}</div>
        </div>
      </div>

      <div class="card-luxe p-6 sm:p-10 bg-[#141414] border border-[#D4AF37]/40 rounded-2xl shadow-2xl space-y-10 mb-8">
        <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#1e1e1e] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('truck', 'w-5 h-5')}
            </div>
            <div>
              <div class="font-bold text-white text-sm">Waybill: <span class="font-mono text-[#F5D76E]">${order.trackingNumber}</span></div>
              <div class="text-neutral-400">${order.carrier} • Priority Air Express</div>
            </div>
          </div>
          <div>
            <div class="text-[10px] text-neutral-400">Estimated Delivery:</div>
            <div class="font-bold text-white">${order.estimatedDelivery}</div>
          </div>
        </div>

        <div>
          <h3 class="font-serif font-bold text-sm text-[#F5D76E] mb-6">Delivery Progression</h3>
          ${renderOrderTimeline(order)}
        </div>

        <div class="pt-6 border-t border-neutral-800 space-y-4">
          <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-neutral-300">Items En Route</h4>
          <div class="divide-y divide-neutral-800/60">
            ${order.items.map(it => `
              <div class="py-3 flex items-center justify-between text-xs">
                <div class="flex items-center gap-3">
                  <img src="${it.image}" class="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div class="font-bold text-white">${it.name}</div>
                    <div class="text-neutral-400">${it.shopName} • Qty: ${it.quantity}</div>
                  </div>
                </div>
                <div class="font-serif font-bold text-sm text-[#F5D76E]">$${(it.price * it.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="text-center">
        <a href="#/dashboard/customer?tab=orders" class="btn-dark text-xs py-2.5 px-6">
          ${renderIcon('chevron-left', 'w-3.5 h-3.5')} Return to My Orders
        </a>
      </div>

    </div>
  `;
}
