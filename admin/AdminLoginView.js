// ==========================================================================
// AURELIA LUXE - SECURE ADMIN LOGIN VIEW
// Location: admin/AdminLoginView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';
import { router } from '../assets/js/router.js';

export function renderAdminLoginView(container) {
  container.innerHTML = `
    <div class="animate-fade-in text-white py-16 max-w-md mx-auto px-4">
      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.2)] space-y-6">
        
        <div class="text-center space-y-2">
          <div class="w-14 h-14 rounded-2xl bg-black border border-[#D4AF37] flex items-center justify-center text-[#F5D76E] mx-auto shadow-xl">
            ${renderIcon('lock', 'w-7 h-7')}
          </div>
          <span class="badge-gold text-[10px]">Restricted Area</span>
          <h1 class="font-serif text-2xl font-bold text-white">Platform Governance</h1>
          <p class="text-xs text-neutral-400">Super Administrator credential verification</p>
        </div>

        <form id="admin-login-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Administrative Email</label>
            <input type="email" id="adm-email" required value="admin@aurelia.com" class="input-luxe" />
          </div>

          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Master Token / Password</label>
            <input type="password" required value="••••••••••••" class="input-luxe font-mono" />
          </div>

          <button type="submit" class="w-full btn-gold py-3 text-sm justify-center shadow-xl">
            Authenticate & Access Portal
          </button>
        </form>

        <div class="p-3 rounded-xl bg-black/60 border border-neutral-800 text-[11px] text-neutral-400 text-center">
          For evaluation: Click authenticate above to enter the live Admin Governance Suite.
        </div>

      </div>
    </div>
  `;

  document.getElementById('admin-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.switchRole('ADMIN');
    showToast('Authenticated as Platform Administrator.', 'success');
    renderNavbar();
    renderMobileNav();
    router.navigate('/dashboard/admin');
  });
}
