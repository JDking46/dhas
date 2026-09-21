// ==========================================================================
// AURELIA LUXE - PRODUCT DETAILS VIEW
// Location: home/ProductDetailsView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { renderProductCard } from '../assets/js/components/ProductCard.js';
import { showToast } from '../assets/js/components/Toast.js';
import { renderNavbar } from '../assets/js/components/Navbar.js';
import { renderMobileNav } from '../assets/js/components/MobileNav.js';
import { router } from '../assets/js/router.js';

export function renderProductDetailsView(container, params) {
  const product = store.getProductById(params.id);

  if (!product) {
    container.innerHTML = `
      <div class="py-24 text-center text-white max-w-md mx-auto">
        <h2 class="font-serif text-2xl font-bold mb-3">Product Not Found</h2>
        <a href="#/products" class="btn-gold text-xs py-2.5 px-6">Explore Catalog</a>
      </div>
    `;
    return;
  }

  const shop = store.getShopById(product.shopId);
  const reviews = store.getProductReviews(product.id);
  const similarProducts = store.getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const isWishlisted = store.isWishlisted(product.id);

  let activeImageIndex = 0;
  let selectedVariants = {};
  product.variants?.forEach(v => {
    selectedVariants[v.name] = v.options[0];
  });
  let quantity = 1;
  let activeTab = 'description';

  function render() {
    container.innerHTML = `
      <div class="animate-fade-in text-white py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <a href="#/" class="hover:text-white transition">Home</a>
          <span>/</span>
          <a href="#/products?category=${product.category}" class="hover:text-white transition">${product.categoryName}</a>
          <span>/</span>
          <span class="text-[#D4AF37] truncate max-w-xs">${product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-neutral-800">
          
          <!-- Image Gallery (7 cols) -->
          <div class="lg:col-span-7 space-y-4">
            <div class="relative bg-[#111111] border border-[#D4AF37]/30 rounded-3xl overflow-hidden aspect-square flex items-center justify-center group shadow-2xl">
              <img 
                id="main-product-img" 
                src="${product.images[activeImageIndex] || product.images[0]}" 
                alt="${product.name}" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                ${product.discount > 0 ? `<span class="badge-gold text-xs">-${product.discount}% OFF</span>` : ''}
                ${product.customizable ? `<span class="bg-black/80 backdrop-blur-md text-[#F5D76E] border border-[#D4AF37]/40 text-[10px] font-semibold px-2.5 py-1 rounded-full">Bespoke Custom</span>` : ''}
              </div>
            </div>

            ${product.images.length > 1 ? `
              <div class="flex items-center gap-3 overflow-x-auto pb-2">
                ${product.images.map((img, idx) => `
                  <button class="thumb-btn flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${idx === activeImageIndex ? 'border-[#D4AF37]' : 'border-neutral-800 opacity-60'}" data-index="${idx}">
                    <img src="${img}" class="w-full h-full object-cover" />
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Buy Box (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
              <a href="#/shop/${shop?.slug || product.shopId}" class="flex items-center gap-2.5 group">
                <img src="${shop?.avatar}" class="w-9 h-9 rounded-full object-cover border border-[#D4AF37]" />
                <div>
                  <div class="text-xs font-bold text-white group-hover:text-[#F5D76E] transition flex items-center gap-1">
                    ${product.shopName}
                    ${shop?.verified ? renderIcon('check-circle-2', 'w-3.5 h-3.5 text-[#22C55E]') : ''}
                  </div>
                  <div class="text-[10px] text-neutral-400">Master Artisan • ${shop?.location || 'Verified Guild'}</div>
                </div>
              </a>
              <div class="flex items-center gap-1 text-xs text-[#F5D76E] font-bold">
                ${renderIcon('star-filled', 'w-3.5 h-3.5 text-[#D4AF37]')} ${product.rating} (${product.reviewsCount})
              </div>
            </div>

            <div>
              <span class="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase block mb-1">SKU: ${product.sku}</span>
              <h1 class="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">${product.name}</h1>
            </div>

            <div class="flex items-baseline justify-between py-2">
              <div class="flex items-baseline gap-3">
                <span class="font-serif text-3xl font-bold text-[#F5D76E]">$${product.price.toFixed(2)}</span>
                ${product.originalPrice > product.price ? `<span class="text-base text-neutral-500 line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
              </div>
              <div class="text-xs font-semibold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}">
                ${product.stock > 0 ? `In Stock (${product.stock} pieces crafted)` : 'Sold Out'}
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#141414] border border-neutral-800 text-xs text-neutral-300 flex items-center gap-3">
              <div class="text-[#D4AF37]">${renderIcon('truck', 'w-5 h-5')}</div>
              <div>Estimated Delivery: Ships within 2-3 business days. Free shipping over $150.</div>
            </div>

            ${product.variants?.map(v => `
              <div class="space-y-2">
                <span class="text-xs font-semibold text-neutral-200">${v.name}: <span class="text-[#F5D76E]">${selectedVariants[v.name]}</span></span>
                <div class="flex flex-wrap gap-2">
                  ${v.options.map(opt => `
                    <button class="variant-btn px-3 py-1.5 text-xs rounded-lg border transition ${selectedVariants[v.name] === opt ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]' : 'bg-[#1a1a1a] text-neutral-300 border-neutral-700'}" data-variant-name="${v.name}" data-variant-val="${opt}">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('') || ''}

            ${product.customizable ? `
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-[#F5D76E]">Custom Inscription / Sizing (Complimentary):</label>
                <input id="product-custom-text" type="text" placeholder="e.g., Initials 'E.V.', custom sizing" class="input-luxe text-xs py-2.5" />
              </div>
            ` : ''}

            <div class="space-y-3 pt-2">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-neutral-700 rounded-xl bg-[#141414]">
                  <button id="detail-qty-minus" class="px-3.5 py-2 text-neutral-400 hover:text-white">-</button>
                  <span id="detail-qty-val" class="px-4 py-2 text-xs font-bold text-white">${quantity}</span>
                  <button id="detail-qty-plus" class="px-3.5 py-2 text-neutral-400 hover:text-white">+</button>
                </div>

                <button id="add-to-cart-action-btn" class="flex-1 btn-gold text-sm py-3 justify-center shadow-lg">
                  ${renderIcon('shopping-bag', 'w-4 h-4')} Add to Cart
                </button>

                <button id="wishlist-toggle-action-btn" class="w-12 h-12 rounded-xl bg-[#141414] border border-neutral-700 hover:border-[#D4AF37] flex items-center justify-center text-neutral-300 hover:text-white transition">
                  ${isWishlisted ? renderIcon('heart-filled', 'w-5 h-5 text-[#D4AF37]') : renderIcon('heart', 'w-5 h-5')}
                </button>
              </div>

              <button id="buy-now-action-btn" class="w-full btn-gold-outline text-xs py-3 justify-center tracking-wider uppercase font-bold">
                Instant Buy Now
              </button>
            </div>
          </div>
        </div>

        <!-- TABS -->
        <div class="py-16 border-b border-neutral-800">
          <div class="flex items-center gap-6 border-b border-neutral-800 overflow-x-auto mb-8 text-xs sm:text-sm font-semibold">
            <button class="details-tab-nav pb-3 transition border-b-2 ${activeTab === 'description' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab-name="description">Description</button>
            <button class="details-tab-nav pb-3 transition border-b-2 ${activeTab === 'specs' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab-name="specs">Specifications</button>
            <button class="details-tab-nav pb-3 transition border-b-2 ${activeTab === 'artisan' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab-name="artisan">Artisan Story</button>
            <button class="details-tab-nav pb-3 transition border-b-2 ${activeTab === 'shipping' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab-name="shipping">Shipping & Returns</button>
            <button class="details-tab-nav pb-3 transition border-b-2 ${activeTab === 'reviews' ? 'text-[#F5D76E] border-[#D4AF37]' : 'text-neutral-400 border-transparent hover:text-white'}" data-tab-name="reviews">Reviews (${reviews.length})</button>
          </div>

          ${activeTab === 'description' ? `<div class="max-w-3xl space-y-3 text-neutral-300 text-sm"><p>${product.description}</p></div>` : ''}
          ${activeTab === 'specs' ? `
            <div class="max-w-3xl text-xs sm:text-sm divide-y divide-neutral-800">
              <div class="py-3 grid grid-cols-3"><span class="text-neutral-400">Materials</span><span class="col-span-2 text-white">${product.materials}</span></div>
              <div class="py-3 grid grid-cols-3"><span class="text-neutral-400">Dimensions</span><span class="col-span-2 text-white">${product.dimensions}</span></div>
              <div class="py-3 grid grid-cols-3"><span class="text-neutral-400">Weight</span><span class="col-span-2 text-white">${product.weight}</span></div>
            </div>
          ` : ''}
          ${activeTab === 'artisan' ? `<div class="max-w-3xl text-sm text-neutral-300 space-y-3"><p>${shop?.bio}</p></div>` : ''}
          ${activeTab === 'shipping' ? `<div class="max-w-3xl text-sm text-neutral-300 space-y-3"><p>${product.shippingInfo}</p><p>${product.returnPolicy}</p></div>` : ''}
          ${activeTab === 'reviews' ? `
            <div class="space-y-6">
              <div class="flex items-center justify-between p-6 rounded-2xl bg-[#141414] border border-neutral-800">
                <div class="font-serif text-4xl font-bold text-[#F5D76E]">${product.rating} ★</div>
                <button id="open-write-review-btn" class="btn-gold text-xs py-2 px-5">Write Review</button>
              </div>
              <div class="space-y-3">
                ${reviews.map(r => `
                  <div class="p-4 rounded-xl bg-[#141414] border border-neutral-800 space-y-1 text-xs">
                    <div class="flex justify-between font-bold text-white"><span>${r.customerName}</span><span class="text-[#D4AF37]">${r.rating} ★</span></div>
                    <p class="text-neutral-300">${r.comment}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Similar Products -->
        <div class="py-16">
          <h2 class="font-serif text-2xl font-bold text-white mb-6">More From This Medium</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${similarProducts.map(p => renderProductCard(p)).join('')}
          </div>
        </div>

      </div>
    `;

    attachHandlers();
  }

  function attachHandlers() {
    container.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => { activeImageIndex = parseInt(btn.dataset.index); render(); });
    });
    container.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', () => { selectedVariants[btn.dataset.variantName] = btn.dataset.variantVal; render(); });
    });
    document.getElementById('detail-qty-minus')?.addEventListener('click', () => { if (quantity > 1) { quantity--; document.getElementById('detail-qty-val').innerText = quantity; } });
    document.getElementById('detail-qty-plus')?.addEventListener('click', () => { if (quantity < product.stock) { quantity++; document.getElementById('detail-qty-val').innerText = quantity; } });

    document.getElementById('add-to-cart-action-btn')?.addEventListener('click', () => {
      const variantStr = Object.values(selectedVariants).join(' / ');
      const customNotes = document.getElementById('product-custom-text')?.value || '';
      store.addToCart(product.id, quantity, variantStr, customNotes);
      showToast(`Added ${quantity}x "${product.name}" to cart.`, 'success');
      renderNavbar(); renderMobileNav();
    });

    document.getElementById('buy-now-action-btn')?.addEventListener('click', () => {
      const variantStr = Object.values(selectedVariants).join(' / ');
      const customNotes = document.getElementById('product-custom-text')?.value || '';
      store.addToCart(product.id, quantity, variantStr, customNotes);
      renderNavbar(); renderMobileNav();
      router.navigate('/checkout');
    });

    document.getElementById('wishlist-toggle-action-btn')?.addEventListener('click', () => {
      const nowWishlisted = store.toggleWishlist(product.id);
      showToast(nowWishlisted ? 'Added to wishlist.' : 'Removed from wishlist.', 'gold');
      renderNavbar(); renderMobileNav(); render();
    });

    container.querySelectorAll('.details-tab-nav').forEach(btn => {
      btn.addEventListener('click', () => { activeTab = btn.dataset.tabName; render(); });
    });
  }

  render();
}
