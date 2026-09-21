// ==========================================================================
// AURELIA LUXE - PRODUCT CARD COMPONENT
// ==========================================================================

import { store } from '../store.js';
import { renderIcon } from '../icons.js';
import { showToast } from './Toast.js';
import { openQuickView } from './QuickViewModal.js';
import { renderNavbar } from './Navbar.js';
import { renderMobileNav } from './MobileNav.js';

export function renderProductCard(product) {
  const isWishlisted = store.isWishlisted(product.id);
  const shop = store.getShopById(product.shopId);

  return `
    <div class="card-luxe group relative flex flex-col justify-between overflow-hidden bg-[#141414] border border-[#D4AF37]/25 rounded-2xl transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-[0_8px_30px_rgba(212,175,55,0.18)]">
      
      <!-- Top Image Container -->
      <div class="relative w-full aspect-square overflow-hidden bg-[#0d0d0d] rounded-t-2xl">
        <a href="#/product/${product.slug}" class="block w-full h-full">
          <img 
            src="${product.images[0]}" 
            alt="${product.name}" 
            class="product-img-zoom w-full h-full object-cover"
            loading="lazy"
          />
        </a>

        <!-- Badges (Discount & Artisan Tag) -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          ${product.discount > 0 ? `
            <span class="bg-[#D4AF37] text-[#080808] font-bold text-[10px] tracking-wider px-2 py-0.5 rounded shadow">
              -${product.discount}% OFF
            </span>
          ` : ''}
          ${product.customizable ? `
            <span class="bg-black/80 backdrop-blur-md text-[#F5D76E] border border-[#D4AF37]/40 text-[9px] font-semibold px-2 py-0.5 rounded">
              Bespoke Custom
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Button -->
        <button 
          class="wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700 hover:border-[#D4AF37] flex items-center justify-center transition text-neutral-300 hover:text-white"
          data-product-id="${product.id}"
          title="Save to Wishlist"
        >
          ${isWishlisted ? renderIcon('heart-filled', 'w-4 h-4 text-[#D4AF37]') : renderIcon('heart', 'w-4 h-4 text-white')}
        </button>

        <!-- Quick View Overlay on Hover -->
        <div class="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex gap-2">
          <button 
            class="quick-view-btn flex-1 bg-black/85 backdrop-blur-md border border-[#D4AF37] text-white hover:bg-[#D4AF37] hover:text-black transition text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-lg"
            data-product-id="${product.id}"
          >
            ${renderIcon('eye', 'w-3.5 h-3.5')} Quick View
          </button>
        </div>
      </div>

      <!-- Content Details -->
      <div class="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <!-- Shop Link & Rating -->
          <div class="flex items-center justify-between text-xs mb-1">
            <a href="#/shop/${shop?.slug || product.shopId}" class="text-neutral-400 hover:text-[#D4AF37] transition font-medium flex items-center gap-1 truncate max-w-[140px]">
              <span>${product.shopName}</span>
              ${shop?.verified ? renderIcon('check-circle-2', 'w-3 h-3 text-[#22C55E]') : ''}
            </a>
            <div class="flex items-center gap-1 text-[11px] text-[#F5D76E]">
              ${renderIcon('star-filled', 'w-3 h-3 text-[#D4AF37]')}
              <span class="font-bold">${product.rating}</span>
              <span class="text-neutral-500">(${product.reviewsCount})</span>
            </div>
          </div>

          <!-- Product Name -->
          <h3 class="font-medium text-sm text-white line-clamp-2 leading-snug group-hover:text-[#F5D76E] transition">
            <a href="#/product/${product.slug}">${product.name}</a>
          </h3>
        </div>

        <!-- Price & Add to Cart -->
        <div class="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div>
            <div class="text-base font-bold text-[#F5D76E] font-serif">
              $${product.price.toFixed(2)}
            </div>
            ${product.originalPrice > product.price ? `
              <div class="text-xs text-neutral-500 line-through">
                $${product.originalPrice.toFixed(2)}
              </div>
            ` : ''}
          </div>

          <button 
            class="add-cart-btn btn-gold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 shadow-none"
            data-product-id="${product.id}"
            title="Add to Shopping Cart"
          >
            ${renderIcon('shopping-bag', 'w-3.5 h-3.5')}
            <span class="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>

    </div>
  `;
}

// Global click event delegator for product cards (Wishlist, Quick View, Add to Cart)
document.addEventListener('click', (e) => {
  const wishlistBtn = e.target.closest('.wishlist-btn');
  if (wishlistBtn) {
    e.preventDefault();
    const productId = wishlistBtn.dataset.productId;
    const nowWishlisted = store.toggleWishlist(productId);
    const prod = store.getProductById(productId);

    wishlistBtn.innerHTML = nowWishlisted 
      ? renderIcon('heart-filled', 'w-4 h-4 text-[#D4AF37]')
      : renderIcon('heart', 'w-4 h-4 text-white');

    showToast(nowWishlisted ? `Added "${prod.name}" to your wishlist.` : `Removed from wishlist.`, 'gold');
    renderNavbar();
    renderMobileNav();
    return;
  }

  const quickViewBtn = e.target.closest('.quick-view-btn');
  if (quickViewBtn) {
    e.preventDefault();
    const productId = quickViewBtn.dataset.productId;
    openQuickView(productId);
    return;
  }

  const addCartBtn = e.target.closest('.add-cart-btn');
  if (addCartBtn) {
    e.preventDefault();
    const productId = addCartBtn.dataset.productId;
    const prod = store.getProductById(productId);
    const defaultVariant = prod.variants?.[0]?.options?.[0] || '';
    store.addToCart(productId, 1, defaultVariant, '');
    showToast(`Added "${prod.name}" to your cart.`, 'success');
    renderNavbar();
    renderMobileNav();
    return;
  }
});
