// ==========================================================================
// AURELIA LUXE - ORDER CONFIRMATION VIEW
// Location: customer/OrderConfirmationView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';

export function renderOrderConfirmationView(container, params) {
  const order = store.getOrderById(params.id) || store.getOrders()[0];

  if (!order) {
    container.innerHTML = `
      <div class="py-24 text-center text-white max-w-md mx-auto">
        <h2 class="font-serif text-2xl font-bold mb-3">Order Receipt Not Found</h2>
        <a href="#/products" class="btn-gold text-xs py-2.5 px-6">Return to Catalog</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="animate-fade-in text-white py-16 max-w-3xl mx-auto px-4 sm:px-6">
      
      <div class="text-center space-y-4 mb-10">
        <div class="w-20 h-20 rounded-full bg-[#1b2b1b] border-2 border-green-500/60 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          ${renderIcon('check', 'w-10 h-10')}
        </div>
        <span class="badge-gold">Receipt & Commission Verified</span>
        <h1 class="font-serif text-3xl sm:text-4xl font-bold text-white">Order Placed Successfully</h1>
        <p class="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
          Confirmation dispatched to <strong>${order.customerEmail}</strong>.
        </p>
      </div>

      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/40 rounded-2xl shadow-2xl space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800 text-xs">
          <div><div class="text-neutral-400">Order Reference</div><div class="font-mono text-base font-bold text-[#F5D76E]">#${order.id}</div></div>
          <div><div class="text-neutral-400">Date Placed</div><div class="font-medium text-white">${order.timestamp}</div></div>
          <div><div class="text-neutral-400">Status</div><span class="inline-flex items-center gap-1 text-green-400 font-semibold"><span class="w-2 h-2 rounded-full bg-green-500"></span> ${order.status}</span></div>
        </div>

        <div class="space-y-4">
          <h3 class="font-serif font-bold text-sm text-[#F5D76E]">Handcrafted Selections</h3>
          <div class="divide-y divide-neutral-800">
            ${order.items.map(item => `
              <div class="py-3 flex items-center justify-between gap-4 text-xs">
                <div class="flex items-center gap-3">
                  <img src="${item.image}" class="w-14 h-14 rounded-xl object-cover border border-neutral-700 bg-black" />
                  <div>
                    <div class="font-bold text-white text-sm">${item.name}</div>
                    <div class="text-neutral-400">Atelier: <span class="text-[#D4AF37]">${item.shopName}</span> • Qty: ${item.quantity}</div>
                  </div>
                </div>
                <div class="font-serif font-bold text-sm text-[#F5D76E]">$${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-neutral-800 flex justify-between items-center text-sm font-serif">
          <span class="text-neutral-400 font-sans text-xs">Total Amount Charged</span>
          <span class="text-2xl font-bold text-[#F5D76E]">$${order.total.toFixed(2)}</span>
        </div>

        <div class="p-4 rounded-xl bg-[#0f0f0f] border border-neutral-800/80 text-xs space-y-1">
          <div class="text-[#D4AF37] font-semibold">Shipping Address:</div>
          <div class="text-white">${order.shippingAddress.fullName}</div>
          <div class="text-neutral-400">${order.shippingAddress.address}, ${order.shippingAddress.city}</div>
          <div class="text-neutral-400">Carrier: ${order.carrier} (Tracking: ${order.trackingNumber})</div>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row gap-3">
          <a href="#/track-order/${order.id}" class="flex-1 btn-gold text-xs py-3 justify-center shadow-lg">
            ${renderIcon('truck', 'w-4 h-4')} Track Order Live
          </a>
          <a href="#/dashboard/customer?tab=orders" class="flex-1 btn-gold-outline text-xs py-3 justify-center">
            ${renderIcon('user', 'w-4 h-4')} View in Dashboard
          </a>
          <a href="#/products" class="flex-1 btn-dark text-xs py-3 justify-center">Continue Shopping</a>
        </div>
      </div>

    </div>
  `;
}
