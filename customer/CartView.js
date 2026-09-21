// ==========================================================================
// AURELIA LUXE - CUSTOMER SHOPPING CART VIEW
// Location: customer/CartView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';
import { router } from '../assets/js/router.js';

export function renderCartView(container) {
  const cartItems = store.getCart();
  const totals = store.getCartTotals();
  const appliedCoupon = store.state.appliedCoupon;

  const sellerGroups = {};
  cartItems.forEach((item, index) => {
    const sId = item.product.shopId;
    if (!sellerGroups[sId]) {
      sellerGroups[sId] = {
        shopName: item.product.shopName,
        shopId: sId,
        items: []
      };
    }
    sellerGroups[sId].items.push({ ...item, cartIndex: index });
  });

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="animate-fade-in text-white py-24 max-w-xl mx-auto px-4 text-center">
        <div class="w-20 h-20 rounded-full bg-[#171717] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
          ${renderIcon('shopping-bag', 'w-10 h-10')}
        </div>
        <h2 class="font-serif text-3xl font-bold mb-3 text-white">Your Cart is Currently Empty</h2>
        <p class="text-sm text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed">
          You have not selected any handcrafted masterpieces yet. Explore our verified artisan ateliers to discover unique treasures.
        </p>
        <a href="#/products" class="btn-gold text-sm py-3.5 px-8 shadow-xl">
          ${renderIcon('sparkles', 'w-4 h-4')} Explore Masterpieces
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="animate-fade-in text-white py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 border-b border-neutral-800 pb-5 flex items-center justify-between">
        <div>
          <h1 class="font-serif text-3xl font-bold text-white">Artisan Shopping Cart</h1>
          <p class="text-xs text-neutral-400 mt-1">Review your handcrafted selections grouped by master creators.</p>
        </div>
        <a href="#/products" class="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1">
          Continue Browsing ${renderIcon('arrow-right', 'w-3 h-3')}
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Cart Items by Seller (8 cols) -->
        <div class="lg:col-span-8 space-y-8">
          ${Object.values(sellerGroups).map(group => `
            <div class="card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-neutral-400">Shipped Directly From:</span>
                  <a href="#/shop/${group.shopId}" class="font-serif font-bold text-sm text-[#F5D76E] hover:underline flex items-center gap-1">
                    ${group.shopName} ${renderIcon('check-circle-2', 'w-3.5 h-3.5 text-[#22C55E]')}
                  </a>
                </div>
                <span class="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Direct Atelier Packaging</span>
              </div>

              <div class="divide-y divide-neutral-800/80">
                ${group.items.map(item => `
                  <div class="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                      <img src="${item.product.images[0]}" class="w-20 h-20 rounded-xl object-cover border border-neutral-700 bg-neutral-900" />
                      <div class="space-y-1">
                        <h4 class="font-medium text-sm text-white hover:text-[#F5D76E] transition">
                          <a href="#/product/${item.product.slug}">${item.product.name}</a>
                        </h4>
                        ${item.variant ? `<div class="text-xs text-neutral-400">Option: <span class="text-neutral-200">${item.variant}</span></div>` : ''}
                        ${item.customText ? `<div class="text-[11px] text-[#F5D76E] font-mono">Custom Inscription: "${item.customText}"</div>` : ''}
                        <div class="text-sm font-serif font-bold text-[#F5D76E]">$${item.product.price.toFixed(2)}</div>
                      </div>
                    </div>

                    <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div class="flex items-center border border-neutral-700 rounded-lg bg-[#1a1a1a]">
                        <button class="cart-qty-btn px-3 py-1 text-xs text-neutral-400 hover:text-white" data-index="${item.cartIndex}" data-delta="-1">-</button>
                        <span class="px-3 py-1 text-xs font-bold text-white">${item.quantity}</span>
                        <button class="cart-qty-btn px-3 py-1 text-xs text-neutral-400 hover:text-white" data-index="${item.cartIndex}" data-delta="1">+</button>
                      </div>

                      <div class="text-right min-w-[80px]">
                        <div class="font-serif text-base font-bold text-white">
                          $${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <button class="remove-cart-item-btn text-neutral-500 hover:text-red-400 transition p-1" data-index="${item.cartIndex}" title="Remove Item">
                        ${renderIcon('trash-2', 'w-4 h-4')}
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}

          <div class="p-4 rounded-xl bg-[#121212] border border-[#D4AF37]/25 text-xs text-neutral-300 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              ${renderIcon('truck', 'w-4 h-4 text-[#D4AF37]')}
              ${totals.freeShipping ? `
                <span class="text-[#22C55E] font-semibold">Complimentary Worldwide Express Unlocked!</span>
              ` : `
                <span>Add <strong>$${(150 - totals.subtotal).toFixed(2)}</strong> more for <strong>Complimentary Express</strong></span>
              `}
            </div>
            <div class="text-[10px] text-neutral-500">Threshold: $150</div>
          </div>
        </div>

        <!-- Summary (4 cols) -->
        <div class="lg:col-span-4 card-luxe p-6 bg-[#141414] border border-[#D4AF37]/40 rounded-2xl shadow-2xl space-y-6 sticky top-28">
          <h3 class="font-serif font-bold text-lg text-white pb-3 border-b border-neutral-800">Order Summary</h3>
          <dl class="space-y-3 text-xs">
            <div class="flex justify-between text-neutral-400"><dt>Subtotal (${totals.count} items)</dt><dd class="text-white font-medium">$${totals.subtotal.toFixed(2)}</dd></div>
            ${totals.discount > 0 ? `<div class="flex justify-between text-[#22C55E]"><dt>Promotion (${appliedCoupon?.code})</dt><dd>- $${totals.discount.toFixed(2)}</dd></div>` : ''}
            <div class="flex justify-between text-neutral-400"><dt>Shipping</dt><dd class="text-white font-medium">${totals.shipping === 0 ? '<span class="text-[#22C55E]">FREE</span>' : `$${totals.shipping.toFixed(2)}`}</dd></div>
            <div class="flex justify-between text-neutral-400"><dt>Estimated Tax (5%)</dt><dd class="text-white font-medium">$${totals.tax.toFixed(2)}</dd></div>
            <div class="pt-3 border-t border-neutral-800 flex justify-between text-base font-serif font-bold"><dt class="text-white">Total</dt><dd class="text-[#F5D76E]">$${totals.total.toFixed(2)}</dd></div>
          </dl>

          <div class="pt-2 border-t border-neutral-800">
            ${appliedCoupon ? `
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-[#1b1b1b] border border-[#22C55E]/40 text-xs">
                <span class="text-[#22C55E] font-semibold">${appliedCoupon.code} Applied</span>
                <button id="remove-coupon-btn" class="text-neutral-400 hover:text-red-400 text-xs">Remove</button>
              </div>
            ` : `
              <form id="apply-coupon-form" class="flex gap-2">
                <input id="coupon-code-input" type="text" placeholder="Coupon code (e.g. AURELIA15)" class="input-luxe text-xs uppercase font-mono py-2" />
                <button type="submit" class="btn-dark text-xs py-2 px-3 whitespace-nowrap">Apply</button>
              </form>
            `}
          </div>

          <button id="proceed-checkout-btn" class="w-full btn-gold text-sm py-3.5 justify-center shadow-2xl">
            ${renderIcon('lock', 'w-4 h-4')} Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const delta = parseInt(btn.dataset.delta);
      store.updateCartQuantity(idx, cartItems[idx].quantity + delta);
      renderNavbar(); renderMobileNav(); renderCartView(container);
    });
  });

  container.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      store.removeFromCart(idx);
      showToast('Item removed from cart.', 'gold');
      renderNavbar(); renderMobileNav(); renderCartView(container);
    });
  });

  document.getElementById('apply-coupon-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('coupon-code-input').value;
    const result = store.applyCoupon(code);
    showToast(result.message, result.success ? 'success' : 'error');
    if (result.success) renderCartView(container);
  });

  document.getElementById('remove-coupon-btn')?.addEventListener('click', () => {
    store.removeCoupon();
    showToast('Promotion code removed.', 'gold');
    renderCartView(container);
  });

  document.getElementById('proceed-checkout-btn')?.addEventListener('click', () => {
    router.navigate('/checkout');
  });
}
