// ==========================================================================
// AURELIA LUXE - MULTI-STEP CHECKOUT VIEW
// Location: customer/CheckoutView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';
import { router } from '../assets/js/router.js';

export function renderCheckoutView(container) {
  const cartItems = store.getCart();
  const totals = store.getCartTotals();
  const user = store.getCurrentUser();

  if (cartItems.length === 0) {
    router.navigate('/cart');
    return;
  }

  let currentStep = 1;
  let addressData = {
    fullName: user?.name || 'Elena Vance',
    email: user?.email || 'elena@aurelia.com',
    phone: user?.phone || '+1 (555) 234-5678',
    address: user?.address || '742 Evergreen Terrace, Suite 400',
    city: user?.city || 'Beverly Hills',
    state: user?.state || 'California',
    country: user?.country || 'United States',
    pincode: user?.pincode || '90210'
  };

  let deliveryMethod = 'express';
  let paymentMethod = 'card';

  function render() {
    container.innerHTML = `
      <div class="animate-fade-in text-white py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Stepper -->
        <div class="mb-10 max-w-2xl mx-auto">
          <div class="flex items-center justify-between relative">
            <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800 -z-0"></div>
            <div class="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#D4AF37] -z-0 transition-all duration-300" style="width: ${(currentStep - 1) * 33.33}%;"></div>

            ${[
              { num: 1, label: 'Address' },
              { num: 2, label: 'Delivery' },
              { num: 3, label: 'Payment' },
              { num: 4, label: 'Review' }
            ].map(step => `
              <div class="relative z-10 flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${step.num <= currentStep ? 'bg-[#D4AF37] text-black ring-4 ring-[#080808]' : 'bg-[#1a1a1a] text-neutral-500 border border-neutral-700'}">
                  ${step.num < currentStep ? renderIcon('check', 'w-4 h-4') : step.num}
                </div>
                <span class="text-[11px] font-semibold mt-1.5 ${step.num <= currentStep ? 'text-white' : 'text-neutral-500'}">${step.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-7 card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl">
            
            <!-- STEP 1 -->
            ${currentStep === 1 ? `
              <form id="checkout-address-form" class="space-y-4 animate-fade-in text-xs">
                <h3 class="font-serif font-bold text-lg text-[#F5D76E] pb-3 border-b border-neutral-800">Step 1: Shipping Destination</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div><label class="block font-semibold mb-1">Full Name *</label><input type="text" id="chk-fullname" required value="${addressData.fullName}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Email *</label><input type="email" id="chk-email" required value="${addressData.email}" class="input-luxe" /></div>
                </div>
                <div><label class="block font-semibold mb-1">Phone Number *</label><input type="tel" id="chk-phone" required value="${addressData.phone}" class="input-luxe" /></div>
                <div><label class="block font-semibold mb-1">Street Address *</label><input type="text" id="chk-address" required value="${addressData.address}" class="input-luxe" /></div>
                <div class="grid grid-cols-3 gap-3">
                  <div><label class="block font-semibold mb-1">City *</label><input type="text" id="chk-city" required value="${addressData.city}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">State *</label><input type="text" id="chk-state" required value="${addressData.state}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Pincode *</label><input type="text" id="chk-pincode" required value="${addressData.pincode}" class="input-luxe" /></div>
                </div>
                <div class="pt-4 flex justify-end">
                  <button type="submit" class="btn-gold py-2.5 px-6">Continue to Delivery ${renderIcon('arrow-right', 'w-4 h-4')}</button>
                </div>
              </form>
            ` : ''}

            <!-- STEP 2 -->
            ${currentStep === 2 ? `
              <div class="space-y-5 animate-fade-in text-xs">
                <div class="flex justify-between pb-3 border-b border-neutral-800">
                  <h3 class="font-serif font-bold text-lg text-[#F5D76E]">Step 2: Delivery Speed</h3>
                  <button id="back-to-step-1" class="text-neutral-400 hover:text-white">${renderIcon('chevron-left', 'w-3 h-3')} Edit Address</button>
                </div>
                <label class="block p-4 rounded-xl border border-[#D4AF37] bg-[#1a1a1a] cursor-pointer">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-bold text-white text-sm">DHL Luxury Express Insured</div>
                      <div class="text-neutral-400 mt-0.5">Delivered in 2-4 business days with signature requirement.</div>
                    </div>
                    <div class="text-sm font-bold text-[#F5D76E]">${totals.shipping === 0 ? 'FREE' : '$15.00'}</div>
                  </div>
                </label>
                <div class="pt-4 flex justify-between">
                  <button id="step-2-prev-btn" class="btn-dark py-2.5 px-4">Back</button>
                  <button id="step-2-next-btn" class="btn-gold py-2.5 px-6">Continue to Payment ${renderIcon('arrow-right', 'w-4 h-4')}</button>
                </div>
              </div>
            ` : ''}

            <!-- STEP 3 -->
            ${currentStep === 3 ? `
              <div class="space-y-5 animate-fade-in text-xs">
                <div class="flex justify-between pb-3 border-b border-neutral-800">
                  <h3 class="font-serif font-bold text-lg text-[#F5D76E]">Step 3: Payment Method</h3>
                  <button id="back-to-step-2" class="text-neutral-400 hover:text-white">${renderIcon('chevron-left', 'w-3 h-3')} Edit Delivery</button>
                </div>
                <div class="p-4 rounded-xl bg-[#111111] border border-neutral-800 space-y-3">
                  <div><label class="block mb-1">Cardholder Name</label><input type="text" value="${addressData.fullName}" class="input-luxe" /></div>
                  <div><label class="block mb-1">Card Number</label><input type="text" value="4242 •••• •••• 4242" class="input-luxe font-mono" /></div>
                  <div class="grid grid-cols-2 gap-3">
                    <div><label class="block mb-1">Expiry</label><input type="text" value="10/28" class="input-luxe text-center" /></div>
                    <div><label class="block mb-1">CVV</label><input type="password" value="888" class="input-luxe text-center" /></div>
                  </div>
                </div>
                <div class="pt-4 flex justify-between">
                  <button id="step-3-prev-btn" class="btn-dark py-2.5 px-4">Back</button>
                  <button id="step-3-next-btn" class="btn-gold py-2.5 px-6">Review Order ${renderIcon('arrow-right', 'w-4 h-4')}</button>
                </div>
              </div>
            ` : ''}

            <!-- STEP 4 -->
            ${currentStep === 4 ? `
              <div class="space-y-5 animate-fade-in text-xs">
                <div class="flex justify-between pb-3 border-b border-neutral-800">
                  <h3 class="font-serif font-bold text-lg text-[#F5D76E]">Step 4: Final Order Review</h3>
                  <button id="back-to-step-3" class="text-neutral-400 hover:text-white">${renderIcon('chevron-left', 'w-3 h-3')} Edit Payment</button>
                </div>
                <div class="p-4 rounded-xl bg-[#111111] border border-neutral-800 space-y-2">
                  <div class="text-[#D4AF37] font-semibold">Delivering to: ${addressData.fullName}</div>
                  <div class="text-neutral-400">${addressData.address}, ${addressData.city}, ${addressData.country}</div>
                  <div class="text-neutral-400">Courier: DHL Luxury Express Insured</div>
                </div>
                <div class="divide-y divide-neutral-800">
                  ${cartItems.map(item => `
                    <div class="py-2.5 flex justify-between">
                      <span class="text-white">${item.product.name} (x${item.quantity})</span>
                      <span class="text-[#F5D76E] font-bold">$${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  `).join('')}
                </div>
                <div class="pt-4 flex justify-between">
                  <button id="step-4-prev-btn" class="btn-dark py-2.5 px-4">Back</button>
                  <button id="final-place-order-btn" class="btn-gold text-sm py-3.5 px-8 shadow-2xl">
                    ${renderIcon('check-circle-2', 'w-4 h-4')} Place Order ($${totals.total.toFixed(2)})
                  </button>
                </div>
              </div>
            ` : ''}

          </div>

          <!-- Summary (5 cols) -->
          <div class="lg:col-span-5 card-luxe p-6 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl space-y-3 shadow-xl">
            <h4 class="font-serif font-bold text-base text-white pb-3 border-b border-neutral-800">Cart Summary</h4>
            <dl class="space-y-2 text-xs">
              <div class="flex justify-between text-neutral-400"><dt>Subtotal</dt><dd class="text-white font-medium">$${totals.subtotal.toFixed(2)}</dd></div>
              ${totals.discount > 0 ? `<div class="flex justify-between text-[#22C55E]"><dt>Discount</dt><dd>- $${totals.discount.toFixed(2)}</dd></div>` : ''}
              <div class="flex justify-between text-neutral-400"><dt>Shipping</dt><dd class="text-white font-medium">${totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}</dd></div>
              <div class="flex justify-between text-neutral-400"><dt>Tax</dt><dd class="text-white font-medium">$${totals.tax.toFixed(2)}</dd></div>
              <div class="pt-3 border-t border-neutral-800 flex justify-between text-base font-serif font-bold"><dt class="text-white">Order Total</dt><dd class="text-[#F5D76E]">$${totals.total.toFixed(2)}</dd></div>
            </dl>
          </div>
        </div>

      </div>
    `;

    attachListeners();
  }

  function attachListeners() {
    document.getElementById('checkout-address-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      addressData.fullName = document.getElementById('chk-fullname').value;
      addressData.email = document.getElementById('chk-email').value;
      addressData.phone = document.getElementById('chk-phone').value;
      addressData.address = document.getElementById('chk-address').value;
      addressData.city = document.getElementById('chk-city').value;
      addressData.state = document.getElementById('chk-state').value;
      addressData.pincode = document.getElementById('chk-pincode').value;
      currentStep = 2; render();
    });

    document.getElementById('step-2-prev-btn')?.addEventListener('click', () => { currentStep = 1; render(); });
    document.getElementById('back-to-step-1')?.addEventListener('click', () => { currentStep = 1; render(); });
    document.getElementById('step-2-next-btn')?.addEventListener('click', () => { currentStep = 3; render(); });

    document.getElementById('step-3-prev-btn')?.addEventListener('click', () => { currentStep = 2; render(); });
    document.getElementById('back-to-step-2')?.addEventListener('click', () => { currentStep = 2; render(); });
    document.getElementById('step-3-next-btn')?.addEventListener('click', () => { currentStep = 4; render(); });

    document.getElementById('step-4-prev-btn')?.addEventListener('click', () => { currentStep = 3; render(); });
    document.getElementById('back-to-step-3')?.addEventListener('click', () => { currentStep = 3; render(); });

    document.getElementById('final-place-order-btn')?.addEventListener('click', () => {
      const order = store.createOrder(addressData, paymentMethod);
      showToast(`Order #${order.id} placed successfully!`, 'success');
      renderNavbar(); renderMobileNav();
      router.navigate(`/order-confirmation/${order.id}`);
    });
  }

  render();
}
