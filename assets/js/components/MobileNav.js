// ==========================================================================
// AURELIA LUXE - MOBILE NAVIGATION & BOTTOM BAR
// ==========================================================================

import { store } from '../store.js';
import { renderIcon } from '../icons.js';
import { router } from '../router.js';

export function renderMobileNav() {
  const container = document.getElementById('mobile-nav-container');
  if (!container) return;

  const user = store.getCurrentUser();
  const cartTotals = store.getCartTotals();
  const isSeller = user?.role === 'SELLER';

  container.innerHTML = `
    <!-- Slide-out Drawer Overlay -->
    <div id="mobile-drawer-overlay" class="fixed inset-0 bg-black/80 z-50 hidden transition-opacity duration-300 backdrop-blur-sm"></div>

    <!-- Slide-out Drawer Content -->
    <div id="mobile-drawer" class="fixed top-0 bottom-0 left-0 w-4/5 max-w-sm bg-[#111111] border-r border-[#D4AF37]/30 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between overflow-y-auto">
      <div>
        <div class="flex items-center justify-between pb-5 border-b border-neutral-800">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-black">
              <span class="text-[#F5D76E] text-sm font-serif font-bold">A</span>
            </div>
            <span class="font-serif tracking-widest text-lg font-bold text-white">AURELIA <span class="text-[#D4AF37]">LUXE</span></span>
          </div>
          <button id="close-drawer-btn" class="text-neutral-400 hover:text-white">
            ${renderIcon('x', 'w-6 h-6')}
          </button>
        </div>

        <!-- Mobile Search Bar -->
        <div class="mt-4 mb-6">
          <div class="relative">
            <input 
              id="mobile-search-input"
              type="text" 
              placeholder="Search handmade..." 
              class="w-full bg-[#1c1c1c] text-white text-sm pl-10 pr-4 py-2.5 rounded-lg border border-neutral-700 focus:border-[#D4AF37] focus:outline-none"
            />
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]">
              ${renderIcon('search', 'w-4 h-4')}
            </div>
          </div>
        </div>

        <!-- Mobile Navigation Links -->
        <nav class="space-y-1 text-sm font-medium">
          <a href="#/" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-[#1a1a1a] hover:text-[#F5D76E]">
            ${renderIcon('store', 'w-5 h-5 text-[#D4AF37]')} Home
          </a>
          <a href="#/products" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-[#1a1a1a] hover:text-[#F5D76E]">
            ${renderIcon('sparkles', 'w-5 h-5 text-[#D4AF37]')} Explore Products
          </a>
          <a href="#/wishlist" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-[#1a1a1a] hover:text-[#F5D76E]">
            ${renderIcon('heart', 'w-5 h-5 text-[#D4AF37]')} Saved Wishlist
          </a>
          <a href="#/cart" class="mobile-nav-link flex items-center justify-between px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-[#1a1a1a] hover:text-[#F5D76E]">
            <span class="flex items-center gap-3">
              ${renderIcon('shopping-bag', 'w-5 h-5 text-[#D4AF37]')} My Cart
            </span>
            ${cartTotals.count > 0 ? `<span class="bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded-full">${cartTotals.count}</span>` : ''}
          </a>
          <a href="#/help" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-[#1a1a1a] hover:text-[#F5D76E]">
            ${renderIcon('help-circle', 'w-5 h-5 text-[#D4AF37]')} Help & FAQs
          </a>
        </nav>

        <div class="my-5 border-t border-neutral-800"></div>

        <!-- Categories List -->
        <div class="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-2 px-3">Top Categories</div>
        <div class="grid grid-cols-2 gap-1 text-xs">
          ${store.state.categories.slice(0, 6).map(c => `
            <a href="#/products?category=${c.id}" class="mobile-nav-link px-3 py-1.5 text-neutral-400 hover:text-white truncate">
              ${c.name}
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Bottom Drawer CTA -->
      <div class="pt-6 border-t border-neutral-800 space-y-3">
        <a href="#/seller/register" class="mobile-nav-link w-full btn-gold text-xs py-2.5 justify-center">
          ${renderIcon('sparkles', 'w-4 h-4')} Sell With Aurelia
        </a>
        <div class="text-center">
          <span class="text-[11px] text-neutral-500">Logged in as: </span>
          <span class="text-[11px] text-[#F5D76E] font-medium">${user?.name || 'Guest'}</span>
        </div>
      </div>
    </div>

    <!-- Mobile Fixed Bottom Navigation Bar (First-Class Experience) -->
    <div class="mobile-bottom-bar fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-xl border-t border-[#D4AF37]/25 px-4 py-2 flex items-center justify-around text-[10px]">
      ${isSeller ? `
        <!-- Seller Specific Mobile Bar -->
        <a href="#/dashboard/seller" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('layout-dashboard', 'w-5 h-5 text-[#D4AF37]')}
          <span>Dashboard</span>
        </a>
        <a href="#/dashboard/seller?tab=orders" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('package', 'w-5 h-5')}
          <span>Orders</span>
        </a>
        <a href="#/dashboard/seller?tab=products" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('tag', 'w-5 h-5')}
          <span>Products</span>
        </a>
        <a href="#/dashboard/seller?tab=analytics" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('bar-chart-3', 'w-5 h-5')}
          <span>Analytics</span>
        </a>
        <a href="#/shop/${user.shopId || 'atelier-aurelia'}" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('globe', 'w-5 h-5')}
          <span>My Shop</span>
        </a>
      ` : `
        <!-- Customer Mobile Bar -->
        <a href="#/" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('store', 'w-5 h-5 text-[#D4AF37]')}
          <span>Home</span>
        </a>
        <a href="#/products" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('sparkles', 'w-5 h-5')}
          <span>Explore</span>
        </a>
        <a href="#/wishlist" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('heart', 'w-5 h-5')}
          <span>Saved</span>
        </a>
        <a href="#/cart" class="relative flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('shopping-bag', 'w-5 h-5')}
          ${cartTotals.count > 0 ? `<span class="absolute -top-1 -right-1 bg-[#D4AF37] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">${cartTotals.count}</span>` : ''}
          <span>Cart</span>
        </a>
        <a href="#/dashboard/customer" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#F5D76E] transition">
          ${renderIcon('user', 'w-5 h-5')}
          <span>Account</span>
        </a>
      `}
    </div>
  `;

  // Attach mobile drawer handlers
  const drawerBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');

  const openDrawer = () => {
    overlay?.classList.remove('hidden');
    drawer?.classList.remove('-translate-x-full');
  };

  const closeDrawer = () => {
    overlay?.classList.add('hidden');
    drawer?.classList.add('-translate-x-full');
  };

  drawerBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  const mobileSearch = document.getElementById('mobile-search-input');
  mobileSearch?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && mobileSearch.value.trim()) {
      closeDrawer();
      router.navigate('/products?search=' + encodeURIComponent(mobileSearch.value.trim()));
    }
  });
}
