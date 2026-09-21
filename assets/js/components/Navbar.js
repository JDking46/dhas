// ==========================================================================
// AURELIA LUXE - GLOBAL NAVIGATION COMPONENT
// ==========================================================================

import { store } from '../store.js';
import { renderIcon } from '../icons.js';
import { router } from '../router.js';

export function renderNavbar() {
  const navContainer = document.getElementById('main-navbar');
  if (!navContainer) return;

  const user = store.getCurrentUser();
  const cartTotals = store.getCartTotals();
  const wishlistCount = store.state.wishlist.length;
  const unreadNotifs = store.state.notifications.filter(n => n.unread && (!n.targetRole || n.targetRole === user?.role)).length;

  navContainer.innerHTML = `
    <!-- 1. Top Announcement Bar -->
    <div class="bg-[#111111] border-b border-[#D4AF37]/20 text-xs py-2 px-4 text-center text-[#B8B8B8] flex items-center justify-between">
      <div class="hidden md:flex items-center gap-4 text-[11px] tracking-wider text-[#D4AF37]">
        <span class="flex items-center gap-1">${renderIcon('award', 'w-3.5 h-3.5')} 100% AUTHENTIC HANDMADE GUARANTEE</span>
        <span class="flex items-center gap-1">${renderIcon('globe', 'w-3.5 h-3.5')} WORLDWIDE ARTISAN SHIPPING</span>
      </div>
      <div class="flex-1 text-center font-medium">
        <span class="text-white">Discover Unique Handmade Products From Independent Creators</span> — 
        <span class="text-[#F5D76E]">Complimentary Global Express on Orders Over $150</span>
      </div>
      <div class="hidden lg:flex items-center gap-3 text-[11px]">
        <a href="#/help" class="hover:text-[#F5D76E] transition">Help & Support</a>
        <span class="text-neutral-700">|</span>
        <a href="#/policies/shipping" class="hover:text-[#F5D76E] transition">Track Order</a>
      </div>
    </div>

    <!-- 2. Interactive Role Switcher & Perspective Ribbon -->
    <div class="bg-gradient-to-r from-[#080808] via-[#171717] to-[#080808] border-b border-[#D4AF37]/30 py-1.5 px-4 text-xs">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-[#D4AF37] font-semibold tracking-wider uppercase text-[10px] flex items-center gap-1">
            ${renderIcon('shield-check', 'w-3.5 h-3.5 text-[#F5D76E]')} Live Perspective:
          </span>
          <span class="bg-[#222222] text-white px-2 py-0.5 rounded border border-[#D4AF37]/40 font-mono text-[11px] font-bold">
            ${user ? user.role : 'GUEST'}
          </span>
          <span class="text-neutral-400 text-[11px] hidden sm:inline">
            ${user ? `(${user.name})` : ''}
          </span>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-neutral-400 text-[11px] mr-1 hidden md:inline">Quick Access:</span>
          <button id="switch-admin-btn" class="px-2.5 py-1 rounded text-[11px] font-medium transition ${user?.role === 'ADMIN' ? 'bg-[#D4AF37] text-black font-bold shadow' : 'bg-[#1e1e1e] text-neutral-300 hover:text-white border border-neutral-700'}">
            Admin
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Main Global Sticky Navbar -->
    <header class="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#D4AF37]/20 transition duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        <!-- Left: Logo & Brand Name -->
        <a href="#/" class="flex items-center gap-3 group flex-shrink-0">
          <div class="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-gradient-to-br from-[#171717] to-[#080808] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition">
            <span class="text-[#F5D76E] text-lg font-serif font-bold">A</span>
          </div>
          <div>
            <div class="flex items-center gap-1.5 leading-none">
              <span class="font-serif tracking-[0.2em] text-xl font-bold text-white group-hover:text-[#F5D76E] transition">AURELIA</span>
              <span class="font-serif tracking-[0.2em] text-xl font-bold text-[#D4AF37]">LUXE</span>
            </div>
            <span class="text-[9px] uppercase tracking-[0.25em] text-[#B8B8B8] block font-medium mt-0.5">Handmade Marketplace</span>
          </div>
        </a>

        <!-- Center: Search Bar with Suggestions Dropdown -->
        <div class="hidden md:flex flex-1 max-w-xl relative mx-2">
          <div class="relative w-full">
            <input 
              id="global-search-input"
              type="text" 
              placeholder="Search handmade jewelry, candles, pottery, woodcraft, shops..." 
              class="w-full bg-[#121212] text-white text-sm pl-11 pr-10 py-2.5 rounded-full border border-[#2d2d2d] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 transition placeholder:text-neutral-500"
              autocomplete="off"
            />
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none">
              ${renderIcon('search', 'w-4 h-4')}
            </div>
            <button id="clear-search-btn" class="hidden absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
              ${renderIcon('x', 'w-4 h-4')}
            </button>
          </div>

          <!-- Live Search Suggestions Modal / Dropdown -->
          <div id="search-suggestions-box" class="hidden absolute left-0 right-0 top-full mt-2 bg-[#141414] border border-[#D4AF37]/30 rounded-xl shadow-2xl p-4 z-50 animate-fade-in backdrop-blur-xl max-h-96 overflow-y-auto">
            <!-- Rendered dynamically by setupSearch -->
          </div>
        </div>

        <!-- Right: Actions & Navigation -->
        <div class="flex items-center gap-5">
          <nav class="hidden xl:flex items-center gap-6 text-sm font-medium text-[#B8B8B8]">
            <a href="#/" class="hover:text-[#F5D76E] transition">Home</a>
            <a href="#/products" class="hover:text-[#F5D76E] transition">Explore</a>
            <a href="#/products?sort=popular" class="hover:text-[#F5D76E] transition">Trending</a>
            <a href="#/help" class="hover:text-[#F5D76E] transition">Support</a>
          </nav>

          <div class="h-5 w-px bg-neutral-800 hidden xl:block"></div>

          <!-- Wishlist -->
          <a href="#/wishlist" class="relative text-[#B8B8B8] hover:text-[#F5D76E] transition p-2" title="Saved Wishlist">
            ${renderIcon('heart', 'w-5 h-5')}
            ${wishlistCount > 0 ? `<span class="absolute top-1 right-1 bg-[#D4AF37] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">${wishlistCount}</span>` : ''}
          </a>

          <!-- Cart -->
          <a href="#/cart" class="relative text-[#B8B8B8] hover:text-[#F5D76E] transition p-2" title="Shopping Cart">
            ${renderIcon('shopping-bag', 'w-5 h-5')}
            ${cartTotals.count > 0 ? `<span class="absolute top-1 right-1 bg-[#D4AF37] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">${cartTotals.count}</span>` : ''}
          </a>

          <!-- Notifications Popover Button -->
          <div class="relative">
            <button id="notif-toggle-btn" class="relative text-[#B8B8B8] hover:text-[#F5D76E] transition p-2 focus:outline-none" title="Notifications">
              ${renderIcon('bell', 'w-5 h-5')}
              ${unreadNotifs > 0 ? `<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#080808]"></span>` : ''}
            </button>
            <div id="notif-dropdown" class="hidden absolute right-0 mt-3 w-80 bg-[#171717] border border-[#D4AF37]/30 rounded-xl shadow-2xl p-4 z-50 animate-fade-in text-left">
              <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span class="font-semibold text-sm text-white">Notifications</span>
                <span class="text-[11px] text-[#D4AF37]">${unreadNotifs} Unread</span>
              </div>
              <div class="divide-y divide-neutral-800/60 max-h-64 overflow-y-auto py-1">
                ${store.state.notifications.slice(0, 5).map(n => `
                  <div class="py-2.5 px-1 hover:bg-[#1f1f1f] rounded transition cursor-pointer">
                    <div class="flex items-center justify-between text-xs font-semibold ${n.unread ? 'text-[#F5D76E]' : 'text-neutral-300'}">
                      <span>${n.title}</span>
                      <span class="text-[10px] text-neutral-500 font-normal">${n.time}</span>
                    </div>
                    <p class="text-[11px] text-neutral-400 mt-0.5 leading-snug">${n.message}</p>
                  </div>
                `).join('')}
              </div>
              <div class="pt-2 border-t border-neutral-800 text-center">
                <a href="#/dashboard/customer?tab=notifications" class="text-xs text-[#D4AF37] hover:underline">View All Notifications</a>
              </div>
            </div>
          </div>

          <!-- Distinct "Sell With Us" CTA Button -->
          <a href="#/seller/register" class="hidden sm:inline-flex btn-gold text-xs px-3.5 py-2">
            ${renderIcon('sparkles', 'w-3.5 h-3.5')}
            <span>Sell With Us</span>
          </a>

          <!-- Mobile Hamburger Trigger -->
          <button id="mobile-menu-btn" class="md:hidden text-neutral-300 hover:text-white p-2">
            ${renderIcon('menu', 'w-6 h-6')}
          </button>
        </div>

      </div>
    </header>
  `;

  // Attach navbar event listeners
  setupNavbarListeners();
}

function setupNavbarListeners() {
  // Quick Role Switchers
  document.getElementById('switch-admin-btn')?.addEventListener('click', () => {
    store.switchRole('ADMIN');
    renderNavbar();
    router.navigate('/dashboard/admin');
  });

  // Logout
  document.getElementById('navbar-logout-btn')?.addEventListener('click', () => {
    router.navigate('/login');
  });

  // Notifications dropdown toggle
  const notifBtn = document.getElementById('notif-toggle-btn');
  const notifMenu = document.getElementById('notif-dropdown');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifMenu?.classList.toggle('hidden');
    document.getElementById('profile-dropdown')?.classList.add('hidden');
  });

  // Profile dropdown toggle
  const profileBtn = document.getElementById('profile-toggle-btn');
  const profileMenu = document.getElementById('profile-dropdown');
  profileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu?.classList.toggle('hidden');
    notifMenu?.classList.add('hidden');
  });

  // Close menus on body click
  document.addEventListener('click', () => {
    notifMenu?.classList.add('hidden');
    profileMenu?.classList.add('hidden');
  });

  // Search logic
  const searchInput = document.getElementById('global-search-input');
  const suggestionsBox = document.getElementById('search-suggestions-box');
  const clearBtn = document.getElementById('clear-search-btn');

  if (searchInput && suggestionsBox) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.toggle('hidden', query.length === 0);

      if (query.length < 2) {
        suggestionsBox.classList.add('hidden');
        return;
      }

      // Search across products, categories, shops
      const matchingProducts = store.state.products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.shopName.toLowerCase().includes(query)
      ).slice(0, 4);

      const matchingCategories = store.state.categories.filter(c => 
        c.name.toLowerCase().includes(query)
      ).slice(0, 3);

      const matchingShops = store.state.shops.filter(s => 
        s.name.toLowerCase().includes(query) || s.owner.toLowerCase().includes(query)
      ).slice(0, 2);

      suggestionsBox.innerHTML = `
        <div class="text-[11px] text-[#B8B8B8] uppercase font-bold tracking-wider mb-2">Search Results for "${query}"</div>
        
        ${matchingCategories.length ? `
          <div class="mb-3">
            <div class="text-[10px] text-[#D4AF37] font-semibold uppercase mb-1">Categories</div>
            <div class="flex flex-wrap gap-1.5">
              ${matchingCategories.map(c => `
                <a href="#/products?category=${c.id}" class="px-2.5 py-1 rounded bg-[#1e1e1e] hover:bg-[#D4AF37] hover:text-black transition text-xs border border-neutral-800">
                  ${c.name}
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${matchingShops.length ? `
          <div class="mb-3">
            <div class="text-[10px] text-[#D4AF37] font-semibold uppercase mb-1">Artisan Shops</div>
            ${matchingShops.map(s => `
              <a href="#/shop/${s.slug}" class="flex items-center gap-2 p-1.5 rounded hover:bg-[#202020] transition">
                <img src="${s.avatar}" class="w-6 h-6 rounded-full object-cover border border-[#D4AF37]" />
                <span class="text-xs text-white font-medium">${s.name}</span>
                <span class="text-[10px] text-[#22C55E]">Verified</span>
              </a>
            `).join('')}
          </div>
        ` : ''}

        <div>
          <div class="text-[10px] text-[#D4AF37] font-semibold uppercase mb-1">Artisan Products</div>
          ${matchingProducts.length ? matchingProducts.map(p => `
            <a href="#/product/${p.slug}" class="flex items-center justify-between p-2 rounded hover:bg-[#202020] transition border-b border-neutral-800/50 last:border-0">
              <div class="flex items-center gap-2.5">
                <img src="${p.images[0]}" class="w-8 h-8 rounded object-cover border border-neutral-700" />
                <div>
                  <div class="text-xs text-white font-medium">${p.name}</div>
                  <div class="text-[10px] text-neutral-400">${p.shopName}</div>
                </div>
              </div>
              <div class="text-xs font-bold text-[#F5D76E]">$${p.price.toFixed(2)}</div>
            </a>
          `).join('') : `<div class="text-xs text-neutral-500 py-2">No matching products found</div>`}
        </div>

        <div class="mt-3 pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
          <a href="#/products?search=${encodeURIComponent(query)}" class="text-[#D4AF37] hover:underline font-semibold flex items-center gap-1">
            See all results ${renderIcon('arrow-right', 'w-3.5 h-3.5')}
          </a>
        </div>
      `;

      suggestionsBox.classList.remove('hidden');
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          suggestionsBox.classList.add('hidden');
          router.navigate(`/products?search=${encodeURIComponent(query)}`);
        }
      }
    });

    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      suggestionsBox.classList.add('hidden');
      clearBtn.classList.add('hidden');
    });
  }
}
