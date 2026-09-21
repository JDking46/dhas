// ==========================================================================
// AURELIA LUXE - ARTISAN SHOP CARD COMPONENT
// ==========================================================================

import { renderIcon } from '../icons.js';
import { showToast } from './Toast.js';

export function renderShopCard(shop) {
  return `
    <div class="card-luxe overflow-hidden bg-[#141414] border border-[#D4AF37]/25 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/60 group shadow-md">
      
      <!-- Cover Banner -->
      <div class="relative h-28 w-full overflow-hidden bg-neutral-900">
        <img 
          src="${shop.coverImage}" 
          alt="${shop.name}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40"></div>
        <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[10px] text-neutral-300 px-2 py-0.5 rounded-full border border-neutral-700 flex items-center gap-1">
          ${renderIcon('map-pin', 'w-3 h-3 text-[#D4AF37]')} ${shop.location}
        </div>
      </div>

      <!-- Shop Info -->
      <div class="px-5 pb-5 pt-0 relative flex-1 flex flex-col justify-between">
        <div>
          <!-- Shop Avatar (overlapping banner) -->
          <div class="-mt-8 mb-3 flex items-end justify-between">
            <div class="relative">
              <img 
                src="${shop.avatar}" 
                alt="${shop.name}" 
                class="w-16 h-16 rounded-xl object-cover border-2 border-[#D4AF37] shadow-xl bg-black" 
              />
              ${shop.verified ? `
                <div class="absolute -bottom-1 -right-1 bg-black text-[#22C55E] rounded-full p-0.5" title="Verified Artisan">
                  ${renderIcon('check-circle-2', 'w-4 h-4')}
                </div>
              ` : ''}
            </div>
            
            <button 
              class="follow-shop-btn px-3 py-1 rounded-full text-xs font-semibold border border-[#D4AF37]/50 text-[#F5D76E] hover:bg-[#D4AF37] hover:text-black transition flex items-center gap-1"
              data-shop-id="${shop.id}"
            >
              ${renderIcon('plus', 'w-3 h-3')} Follow
            </button>
          </div>

          <!-- Shop Title & Owner -->
          <div class="mb-2">
            <h3 class="font-serif font-bold text-base text-white group-hover:text-[#F5D76E] transition">
              <a href="#/shop/${shop.slug}">${shop.name}</a>
            </h3>
            <div class="text-xs text-neutral-400">Master Artisan: <span class="text-neutral-200">${shop.owner}</span></div>
          </div>

          <!-- Bio -->
          <p class="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            ${shop.bio}
          </p>
        </div>

        <!-- Metrics & Visit CTA -->
        <div>
          <div class="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#0d0d0d] rounded-xl border border-neutral-800/80 text-center text-xs mb-3">
            <div>
              <div class="text-[#F5D76E] font-bold flex items-center justify-center gap-1">
                ${renderIcon('star-filled', 'w-3 h-3 text-[#D4AF37]')} ${shop.rating}
              </div>
              <div class="text-[10px] text-neutral-500">${shop.reviewCount} reviews</div>
            </div>
            <div>
              <div class="text-white font-bold">${shop.productCount}</div>
              <div class="text-[10px] text-neutral-500">Creations</div>
            </div>
            <div>
              <div class="text-white font-bold">${shop.followerCount}</div>
              <div class="text-[10px] text-neutral-500">Patrons</div>
            </div>
          </div>

          <a href="#/shop/${shop.slug}" class="w-full btn-gold-outline text-xs py-2 justify-center">
            Visit Artisan Atelier ${renderIcon('chevron-right', 'w-3.5 h-3.5')}
          </a>
        </div>

      </div>

    </div>
  `;
}

// Follow button listener
document.addEventListener('click', (e) => {
  const followBtn = e.target.closest('.follow-shop-btn');
  if (followBtn) {
    e.preventDefault();
    const isFollowing = followBtn.classList.contains('following');
    if (isFollowing) {
      followBtn.classList.remove('following');
      followBtn.innerHTML = `${renderIcon('plus', 'w-3 h-3')} Follow`;
      showToast('Unfollowed shop.', 'gold');
    } else {
      followBtn.classList.add('following');
      followBtn.innerHTML = `${renderIcon('check', 'w-3 h-3')} Following`;
      showToast('You are now following this artisan shop!', 'success');
    }
  }
});
