// ==========================================================================
// AURELIA LUXE - CUSTOMER AUTHENTICATION (LOGIN & REGISTER)
// Location: customer/CustomerAuth.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';
import { router } from '../assets/js/router.js';

export function renderLoginView(container, params, queryParams = {}) {
  const redirectPath = queryParams.redirect || '/dashboard/customer';

  container.innerHTML = `
    <div class="animate-fade-in text-white py-16 max-w-md mx-auto px-4">
      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/40 rounded-3xl shadow-2xl space-y-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center bg-black mx-auto shadow-lg">
            <span class="text-[#F5D76E] text-xl font-serif font-bold">A</span>
          </div>
          <h1 class="font-serif text-2xl font-bold text-white">Patron Sign In</h1>
          <p class="text-xs text-neutral-400">Welcome back to the artisan realm</p>
        </div>

        <!-- 1-Click Role Switcher for fast evaluation -->
        <div class="p-3 rounded-xl bg-[#0e0e0e] border border-neutral-800 space-y-2 text-center">
          <div class="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider">Quick Demo Logins:</div>
          <div class="grid grid-cols-3 gap-1.5 text-[11px]">
            <button id="quick-cust-login-btn" class="py-1.5 px-2 rounded bg-[#1c1c1c] hover:bg-[#D4AF37] hover:text-black transition font-medium border border-neutral-700">
              Customer
            </button>
            <button id="quick-seller-login-btn" class="py-1.5 px-2 rounded bg-[#1c1c1c] hover:bg-[#D4AF37] hover:text-black transition font-medium border border-neutral-700">
              Seller
            </button>
            <button id="quick-admin-login-btn" class="py-1.5 px-2 rounded bg-[#1c1c1c] hover:bg-[#D4AF37] hover:text-black transition font-medium border border-neutral-700">
              Admin
            </button>
          </div>
        </div>

        <form id="customer-login-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Email Address</label>
            <input type="email" id="cust-login-email" required value="elena@aurelia.com" class="input-luxe" />
          </div>
          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Password</label>
            <input type="password" required value="••••••••" class="input-luxe" />
          </div>
          <button type="submit" class="w-full btn-gold py-3 text-sm justify-center shadow-lg">
            Sign In
          </button>
        </form>

        <div class="text-center text-xs text-neutral-400 pt-2 border-t border-neutral-800">
          New to Aurelia? <a href="#/register" class="text-[#D4AF37] font-semibold hover:underline">Create Account</a>
          <span class="mx-2">•</span>
          <a href="#/seller/register" class="text-neutral-400 hover:text-[#D4AF37] hover:underline">Open Atelier</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('quick-cust-login-btn')?.addEventListener('click', () => {
    store.switchRole('CUSTOMER');
    showToast('Signed in as Patron Elena Vance', 'success');
    renderNavbar(); renderMobileNav();
    router.navigate('/dashboard/customer');
  });

  document.getElementById('quick-seller-login-btn')?.addEventListener('click', () => {
    store.switchRole('SELLER');
    showToast('Signed in as Artisan Marcus Aurelius', 'success');
    renderNavbar(); renderMobileNav();
    router.navigate('/dashboard/seller');
  });

  document.getElementById('quick-admin-login-btn')?.addEventListener('click', () => {
    store.switchRole('ADMIN');
    showToast('Signed in as Super Administrator', 'success');
    renderNavbar(); renderMobileNav();
    router.navigate('/dashboard/admin');
  });

  document.getElementById('customer-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('cust-login-email').value;
    const user = store.login(email, 'pass');
    showToast(`Welcome back, ${user.name}!`, 'success');
    renderNavbar(); renderMobileNav();
    if (user.role === 'ADMIN') router.navigate('/dashboard/admin');
    else if (user.role === 'SELLER') router.navigate('/dashboard/seller');
    else router.navigate(redirectPath);
  });
}

export function renderRegisterView(container, params, queryParams = {}) {
  const redirectPath = queryParams.redirect || '/dashboard/customer';

  container.innerHTML = `
    <div class="animate-fade-in text-white py-12 max-w-xl mx-auto px-4">
      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/40 rounded-3xl shadow-2xl space-y-6">
        <div class="text-center space-y-2">
          <span class="badge-gold">Patron Membership</span>
          <h1 class="font-serif text-3xl font-bold text-white">Create Patron Account</h1>
          <p class="text-xs text-neutral-400">Discover bespoke handmade creations from independent masters.</p>
        </div>

        <form id="cust-reg-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold mb-1">Full Name *</label>
            <input type="text" id="reg-name" required placeholder="Elena Vance" class="input-luxe" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block font-semibold mb-1">Email *</label><input type="email" id="reg-email" required placeholder="elena@example.com" class="input-luxe" /></div>
            <div><label class="block font-semibold mb-1">Phone</label><input type="tel" id="reg-phone" placeholder="+1 (555) 234-5678" class="input-luxe" /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block font-semibold mb-1">Password *</label><input type="password" required value="••••••••" class="input-luxe" /></div>
            <div><label class="block font-semibold mb-1">Confirm Password *</label><input type="password" required value="••••••••" class="input-luxe" /></div>
          </div>
          <div>
            <label class="block font-semibold mb-1">Address</label>
            <input type="text" id="reg-address" placeholder="742 Evergreen Terrace" class="input-luxe" />
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div><label class="block font-semibold mb-1">City</label><input type="text" id="reg-city" placeholder="Beverly Hills" class="input-luxe" /></div>
            <div><label class="block font-semibold mb-1">State</label><input type="text" id="reg-state" placeholder="CA" class="input-luxe" /></div>
            <div><label class="block font-semibold mb-1">Pincode</label><input type="text" id="reg-pincode" placeholder="90210" class="input-luxe" /></div>
          </div>
          <button type="submit" class="w-full btn-gold py-3 text-sm justify-center shadow-xl">
            Complete Registration & Enter Dashboard
          </button>
        </form>

        <div class="text-center text-xs text-neutral-400 pt-2 border-t border-neutral-800">
          Already a patron? <a href="#/login" class="text-[#D4AF37] font-semibold hover:underline">Sign In</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('cust-reg-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = store.registerCustomer({
      fullName: document.getElementById('reg-name').value,
      email: document.getElementById('reg-email').value,
      phone: document.getElementById('reg-phone').value,
      address: document.getElementById('reg-address').value,
      city: document.getElementById('reg-city').value,
      state: document.getElementById('reg-state').value,
      pincode: document.getElementById('reg-pincode').value
    });
    showToast(`Welcome, ${user.name}!`, 'success');
    renderNavbar(); renderMobileNav();
    router.navigate(redirectPath);
  });
}

export const renderCustomerLogin = renderLoginView;
export const renderCustomerRegister = renderRegisterView;
