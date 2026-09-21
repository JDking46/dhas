// ==========================================================================
// AURELIA LUXE - WISHLIST VIEW
// Location: customer/WishlistView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';

export function renderWishlistView(container) {
  const wishlistedProducts = store.getWishlist();

  if (wishlistedProducts.length === 0) {
    container.innerHTML = `
      <div class="animate-fade-in text-white py-24 max-w-md mx-auto px-4 text-center">
        <div class="w-16 h-16 rounded-full bg-[#171717] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
          ${renderIcon('heart', 'w-8 h-8')}
        </div>
        <h2 class="font-serif text-3xl font-bold mb-3 text-white">Your Wishlist is Empty</h2>
        <p class="text-xs text-neutral-400 mb-8 max-w-sm mx-auto leading-relaxed">
          Save your favorite handmade pieces here to commission later.
        </p>
        <a href="#/products" class="btn-gold text-xs py-3 px-8 shadow-xl">
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
          <h1 class="font-serif text-3xl font-bold text-white">Saved Wishlist</h1>
          <p class="text-xs text-neutral-400 mt-1">Curated list of your cherished handmade creations (${wishlistedProducts.length} items).</p>
        </div>
        <a href="#/products" class="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1">
          Explore More ${renderIcon('arrow-right', 'w-3 h-3')}
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${wishlistedProducts.map(product => `
          <div class="card-luxe bg-[#141414] border border-[#D4AF37]/25 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl group">
            <div class="relative aspect-square overflow-hidden bg-neutral-900">
              <a href="#/product/${product.slug}" class="block w-full h-full">
                <img src="${product.images[0]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </a>
              <button 
                class="remove-wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-red-400 flex items-center justify-center transition"
                data-product-id="${product.id}"
                title="Remove from Wishlist"
              >
                ${renderIcon('trash-2', 'w-4 h-4')}
              </button>
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between gap-3">
              <div>
                <div class="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span>${product.shopName}</span>
                  <span class="text-[#F5D76E] flex items-center gap-1 font-bold">
                    ${renderIcon('star-filled', 'w-3 h-3 text-[#D4AF37]')} ${product.rating}
                  </span>
                </div>
                <h3 class="font-medium text-sm text-white line-clamp-2">
                  <a href="#/product/${product.slug}" class="hover:text-[#F5D76E] transition">${product.name}</a>
                </h3>
              </div>

              <div>
                <div class="flex items-baseline justify-between pt-2 border-t border-neutral-800">
                  <span class="font-serif text-base font-bold text-[#F5D76E]">$${product.price.toFixed(2)}</span>
                  <span class="text-xs text-green-400 font-medium">In Stock</span>
                </div>

                <button class="wishlist-move-cart-btn w-full btn-gold text-xs py-2 mt-3 justify-center" data-product-id="${product.id}">
                  ${renderIcon('shopping-bag', 'w-3.5 h-3.5')} Move to Cart
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.productId;
      store.toggleWishlist(pId);
      showToast('Item removed from your wishlist.', 'gold');
      renderNavbar(); renderMobileNav(); renderWishlistView(container);
    });
  });

  container.querySelectorAll('.wishlist-move-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.productId;
      const prod = store.getProductById(pId);
      store.addToCart(pId, 1, prod.variants?.[0]?.options?.[0] || '', '');
      store.toggleWishlist(pId);
      showToast(`Moved "${prod.name}" to cart!`, 'success');
      renderNavbar(); renderMobileNav(); renderWishlistView(container);
    });
  });
}
