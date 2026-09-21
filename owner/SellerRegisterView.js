// ==========================================================================
// AURELIA LUXE - SELLER REGISTRATION & 7-STEP SHOP SETUP WIZARD
// Location: owner/SellerRegisterView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';
import { router } from '../assets/js/router.js';

export function renderSellerLoginView(container) {
  container.innerHTML = `
    <div class="animate-fade-in text-white py-16 max-w-md mx-auto px-4">
      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/40 rounded-3xl shadow-2xl space-y-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center bg-black mx-auto shadow-lg">
            <span class="text-[#F5D76E] text-xl font-serif font-bold">A</span>
          </div>
          <h1 class="font-serif text-2xl font-bold text-white">Owner Sign In</h1>
          <p class="text-xs text-neutral-400">Access your atelier dashboard and store operations</p>
        </div>

        <div class="p-3 rounded-xl bg-[#0e0e0e] border border-neutral-800 text-center space-y-2">
          <div class="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider">Demo Owner Access</div>
          <button id="quick-owner-login-btn" class="w-full py-2.5 px-3 rounded bg-[#1c1c1c] hover:bg-[#D4AF37] hover:text-black transition font-medium border border-neutral-700 text-xs">
            Login as Seller / Owner
          </button>
        </div>

        <form id="seller-login-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Business Email</label>
            <input type="email" id="seller-login-email" required value="marcus@aurelia.com" class="input-luxe" />
          </div>
          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Password</label>
            <input type="password" required value="••••••••" class="input-luxe" />
          </div>
          <button type="submit" class="w-full btn-gold py-3 text-sm justify-center shadow-lg">
            Login to Dashboard
          </button>
        </form>

        <div class="text-center text-xs text-neutral-400 pt-2 border-t border-neutral-800 space-y-2">
          <div>
            New owner? <a href="#/seller/register" class="text-[#D4AF37] font-semibold hover:underline">Create Shop Account</a>
          </div>
          <div>
            Customer account? <a href="#/login" class="text-neutral-400 hover:text-[#D4AF37] underline">Go to Customer Login</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('quick-owner-login-btn')?.addEventListener('click', () => {
    store.switchRole('SELLER');
    showToast('Owner login successful', 'success');
    renderNavbar(); renderMobileNav();
    router.navigate('/dashboard/seller');
  });

  document.getElementById('seller-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('seller-login-email').value;
    const user = store.login(email, 'pass');
    showToast(`Welcome back, ${user.name}!`, 'success');
    renderNavbar(); renderMobileNav();
    router.navigate('/dashboard/seller');
  });
}

export function renderSellerRegisterView(container, params, queryParams) {
  let isWizardMode = queryParams.mode === 'wizard';
  let wizardStep = 1;

  let sellerFormData = {
    fullName: 'Julian Thorne',
    email: 'julian@sylvanheritage.com',
    phone: '+49 761 987654',
    shopName: 'Sylvan Heritage Woodcraft',
    shopDescription: 'Master joinery and hand-carved black walnut desk and jewelry boxes.',
    category: 'woodcraft',
    address: 'Schwarzwald Strasse 18',
    city: 'Freiburg',
    state: 'Baden-Württemberg',
    country: 'Germany',
    pincode: '79098',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    shippingMethod: 'DHL Luxury Express & Local Priority',
    payoutIban: 'DE89 3704 0044 0532 0130 00',
    firstProductName: 'Black Walnut Valet Catchall Tray',
    firstProductPrice: 145,
    firstProductStock: 8
  };

  function render() {
    container.innerHTML = `
      <div class="animate-fade-in text-white py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        ${!isWizardMode ? `
          <div class="card-luxe p-6 sm:p-10 bg-[#141414] border border-[#D4AF37]/40 rounded-3xl shadow-2xl space-y-8">
            <div class="text-center max-w-lg mx-auto space-y-2">
              <span class="badge-gold">${renderIcon('sparkles', 'w-3 h-3')} Artisan Guild Application</span>
              <h1 class="font-serif text-3xl sm:text-4xl font-bold text-white">Start Your Handmade Business</h1>
              <p class="text-xs text-neutral-400">Join our curated international directory of master craftspeople.</p>
            </div>

            <form id="seller-reg-form" class="space-y-6 text-xs">
              <div class="p-5 rounded-2xl bg-[#0f0f0f] border border-neutral-800 space-y-4">
                <h3 class="font-serif font-bold text-sm text-[#F5D76E]">1. Artisan Information</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div><label class="block font-semibold mb-1">Full Name *</label><input type="text" id="sr-fullname" required value="${sellerFormData.fullName}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Email *</label><input type="email" id="sr-email" required value="${sellerFormData.email}" class="input-luxe" /></div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div><label class="block font-semibold mb-1">Phone *</label><input type="tel" id="sr-phone" required value="${sellerFormData.phone}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Password *</label><input type="password" required value="••••••••" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Confirm *</label><input type="password" required value="••••••••" class="input-luxe" /></div>
                </div>
              </div>

              <div class="p-5 rounded-2xl bg-[#0f0f0f] border border-neutral-800 space-y-4">
                <h3 class="font-serif font-bold text-sm text-[#F5D76E]">2. Atelier / Shop Information</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div><label class="block font-semibold mb-1">Shop Name *</label><input type="text" id="sr-shopname" required value="${sellerFormData.shopName}" class="input-luxe" /></div>
                  <div>
                    <label class="block font-semibold mb-1">Category Medium *</label>
                    <select id="sr-category" class="input-luxe">
                      <option value="woodcraft">Wooden Crafts</option>
                      <option value="jewelry">Handmade Jewelry</option>
                      <option value="pottery">Pottery & Ceramics</option>
                      <option value="candles">Candles & Scents</option>
                    </select>
                  </div>
                </div>
                <div><label class="block font-semibold mb-1">Philosophy / Bio *</label><textarea id="sr-desc" rows="3" class="input-luxe">${sellerFormData.shopDescription}</textarea></div>
                <div class="grid grid-cols-4 gap-3">
                  <div><label class="block font-semibold mb-1">City</label><input type="text" id="sr-city" value="${sellerFormData.city}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">State</label><input type="text" id="sr-state" value="${sellerFormData.state}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Country</label><input type="text" id="sr-country" value="${sellerFormData.country}" class="input-luxe" /></div>
                  <div><label class="block font-semibold mb-1">Pincode</label><input type="text" id="sr-pincode" value="${sellerFormData.pincode}" class="input-luxe" /></div>
                </div>
              </div>

              <button type="submit" class="w-full btn-gold py-3 text-sm justify-center shadow-xl">
                Submit & Open Setup Wizard ${renderIcon('arrow-right', 'w-4 h-4')}
              </button>
            </form>
          </div>
        ` : `
          <!-- 7 STEP WIZARD -->
          <div class="card-luxe p-6 sm:p-10 bg-[#141414] border border-[#D4AF37]/40 rounded-3xl shadow-2xl space-y-8">
            <div class="flex justify-between items-center">
              <div>
                <span class="badge-gold text-[10px]">Step ${wizardStep} of 7</span>
                <h2 class="font-serif text-2xl font-bold text-white mt-1">Shop Setup Wizard</h2>
              </div>
              <button id="exit-wizard-btn" class="text-xs text-neutral-400 hover:text-white">Skip to Dashboard</button>
            </div>

            <div class="grid grid-cols-7 gap-1 text-[10px] font-semibold text-center">
              ${['1. Identity', '2. Details', '3. Shipping', '4. Payout', '5. Product', '6. Preview', '7. Publish'].map((s, idx) => `
                <div class="py-1.5 rounded border ${idx + 1 === wizardStep ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold' : (idx + 1 < wizardStep ? 'border-neutral-700 bg-[#1e1e1e] text-green-400' : 'border-neutral-800 bg-[#0d0d0d] text-neutral-500')}">${s}</div>
              `).join('')}
            </div>

            ${wizardStep === 1 ? `
              <div class="space-y-4 text-xs animate-fade-in">
                <h3 class="font-serif font-bold text-base text-[#F5D76E]">Step 1: Atelier URL</h3>
                <div><label class="block mb-1">Shop Name</label><input type="text" value="${sellerFormData.shopName}" class="input-luxe" /></div>
                <div class="p-3 bg-[#111111] rounded text-neutral-400 font-mono text-xs">/shop/${sellerFormData.shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</div>
                <div class="pt-4 flex justify-end"><button class="wz-next btn-gold py-2 px-6">Continue</button></div>
              </div>
            ` : ''}

            ${wizardStep >= 2 && wizardStep <= 6 ? `
              <div class="space-y-4 text-xs animate-fade-in">
                <h3 class="font-serif font-bold text-base text-[#F5D76E]">Step ${wizardStep}: Verification & Product Launch</h3>
                <p class="text-neutral-400">Settings and first masterpiece are configured.</p>
                <div class="pt-4 flex justify-between">
                  <button class="wz-prev btn-dark py-2 px-4">Back</button>
                  <button class="wz-next btn-gold py-2 px-6">Continue</button>
                </div>
              </div>
            ` : ''}

            ${wizardStep === 7 ? `
              <div class="text-center space-y-6 py-6 animate-fade-in">
                <div class="w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500 flex items-center justify-center mx-auto">
                  ${renderIcon('check', 'w-8 h-8')}
                </div>
                <h3 class="font-serif font-bold text-2xl text-white">Your Atelier is Ready to Launch!</h3>
                <button id="final-publish-shop-btn" class="btn-gold py-3.5 px-8 text-sm shadow-2xl">
                  ${renderIcon('sparkles', 'w-4 h-4')} Open Seller Dashboard Now
                </button>
              </div>
            ` : ''}
          </div>
        `}

      </div>
    `;

    attachHandlers();
  }

  function attachHandlers() {
    document.getElementById('seller-reg-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      sellerFormData.fullName = document.getElementById('sr-fullname').value;
      sellerFormData.email = document.getElementById('sr-email').value;
      sellerFormData.phone = document.getElementById('sr-phone').value;
      sellerFormData.shopName = document.getElementById('sr-shopname').value;
      isWizardMode = true;
      wizardStep = 1;
      render();
    });

    container.querySelectorAll('.wz-next').forEach(b => {
      b.addEventListener('click', () => { if (wizardStep < 7) { wizardStep++; render(); } });
    });
    container.querySelectorAll('.wz-prev').forEach(b => {
      b.addEventListener('click', () => { if (wizardStep > 1) { wizardStep--; render(); } });
    });

    document.getElementById('exit-wizard-btn')?.addEventListener('click', finish);
    document.getElementById('final-publish-shop-btn')?.addEventListener('click', finish);
  }

  function finish() {
    const user = store.registerSeller(sellerFormData);
    showToast(`Congratulations, ${user.shopName} is live!`, 'success');
    renderNavbar(); renderMobileNav();
    router.navigate('/dashboard/seller');
  }

  render();
}
