// ==========================================================================
// AURELIA LUXE - PUBLIC SHOP / ATELIER VIEW (/shop/:slug)
// Location: owner/ShopPublicView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { renderProductCard } from '../assets/js/components/ProductCard.js';
import { showToast } from '../assets/js/components/Toast.js';

export function renderShopPublicView(container, params) {
  const shop = store.getShopById(params.id);

  if (!shop) {
    container.innerHTML = `
      <div class="py-24 text-center text-white max-w-md mx-auto">
        <h2 class="font-serif text-2xl font-bold mb-3">Artisan Atelier Not Found</h2>
        <a href="#/products?tab=shops" class="btn-gold text-xs py-2.5 px-6">Explore All Ateliers</a>
      </div>
    `;
    return;
  }

  const shopProducts = store.getProductsByShop(shop.id);
  let activeTab = 'home';

  function render() {
    container.innerHTML = `
      <div class="animate-fade-in text-white pb-20">
        
        <!-- Cover Banner -->
        <div class="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900 border-b border-[#D4AF37]/30">
          <img src="${shop.coverImage}" class="w-full h-full object-cover opacity-75" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent"></div>
          <div class="absolute top-4 left-4 sm:left-8">
            <a href="#/products?tab=shops" class="btn-dark text-xs py-1.5 px-3 backdrop-blur-md bg-black/60 flex items-center gap-1.5">
              ${renderIcon('chevron-left', 'w-3.5 h-3.5')} All Ateliers
            </a>
          </div>
        </div>

        <!-- Info Bar -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-10">
          <div class="card-luxe p-6 sm:p-8 bg-[#141414]/95 backdrop-blur-xl border-[#D4AF37]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-center gap-5">
              <div class="relative flex-shrink-0">
                <img src="${shop.avatar}" class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-xl bg-black" />
                ${shop.verified ? `
                  <div class="absolute -bottom-1 -right-1 bg-black text-[#22C55E] rounded-full p-1 border border-neutral-800" title="Verified Artisan">
                    ${renderIcon('check-circle-2', 'w-4 h-4')}
                  </div>
                ` : ''}
              </div>

              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="font-serif text-2xl sm:text-3xl font-bold text-white">${shop.name}</h1>
                  <span class="badge-verified text-[10px]">${renderIcon('award', 'w-3 h-3')} Verified Master</span>
                </div>
                <div class="text-xs text-neutral-300">Master Creator: <span class="text-white font-semibold">${shop.owner}</span></div>
                <div class="flex items-center gap-4 text-xs text-neutral-400 pt-1">
                  <span class="flex items-center gap-1">${renderIcon('map-pin', 'w-3.5 h-3.5 text-[#D4AF37]')} ${shop.location}</span>
                  <span>•</span>
                  <span>Est. ${shop.established}</span>
                  <span>•</span>
                  <span class="text-[#F5D76E]">${renderIcon('star-filled', 'w-3.5 h-3.5 text-[#D4AF37]')} ${shop.rating} (${shop.reviewCount})</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto">
              <button id="shop-follow-toggle-btn" class="flex-1 md:flex-initial btn-gold-outline text-xs py-2.5 px-5">
                ${renderIcon('plus', 'w-4 h-4')} Follow Atelier (${shop.followerCount})
              </button>
              <button id="contact-artisan-btn" class="flex-1 md:flex-initial btn-gold text-xs py-2.5 px-5">
                ${renderIcon('mail', 'w-4 h-4')} Contact Artisan
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-b border-neutral-800">
          <div class="flex items-center gap-8 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none">
            <button class="shop-tab-nav pb-3.5 transition border-b-2 ${activeTab === 'home' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab="home">Shop Home</button>
            <button class="shop-tab-nav pb-3.5 transition border-b-2 ${activeTab === 'products' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab="products">All Creations (${shopProducts.length})</button>
            <button class="shop-tab-nav pb-3.5 transition border-b-2 ${activeTab === 'about' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab="about">About The Atelier</button>
          </div>
        </div>

        <!-- Tab Contents -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          ${activeTab === 'home' || activeTab === 'products' ? `
            <div>
              <h2 class="font-serif text-2xl font-bold text-white mb-6">Artisan Creations</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                ${shopProducts.map(p => renderProductCard(p)).join('')}
              </div>
            </div>
          ` : ''}

          ${activeTab === 'about' ? `
            <div class="max-w-3xl card-luxe p-8 space-y-4">
              <h2 class="font-serif text-2xl font-bold text-[#F5D76E]">About ${shop.name}</h2>
              <p class="text-sm text-neutral-300 leading-relaxed">${shop.bio}</p>
            </div>
          ` : ''}
        </div>

      </div>
    `;

    container.querySelectorAll('.shop-tab-nav').forEach(btn => {
      btn.addEventListener('click', () => { activeTab = btn.dataset.tab; render(); });
    });

    document.getElementById('shop-follow-toggle-btn')?.addEventListener('click', () => {
      showToast(`You are now following ${shop.name}!`, 'success');
    });

    document.getElementById('contact-artisan-btn')?.addEventListener('click', () => {
      showToast(`Direct message sent to ${shop.owner}.`, 'success');
    });
  }

  render();
}
