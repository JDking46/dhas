// ==========================================================================
// AURELIA LUXE - QUICK VIEW MODAL COMPONENT
// ==========================================================================

import { store } from '../store.js';
import { renderIcon } from '../icons.js';
import { showToast } from './Toast.js';
import { renderNavbar } from './Navbar.js';
import { renderMobileNav } from './MobileNav.js';

export function openQuickView(productId) {
  const product = store.getProductById(productId);
  if (!product) return;

  let modalOverlay = document.getElementById('quick-view-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'quick-view-modal';
    modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
    document.body.appendChild(modalOverlay);
  }

  const shop = store.getShopById(product.shopId);

  modalOverlay.innerHTML = `
    <div class="relative w-full max-w-3xl bg-[#141414] border border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow-2xl animate-fade-in text-white">
      
      <!-- Close Button -->
      <button id="close-quickview-btn" class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition">
        ${renderIcon('x', 'w-5 h-5')}
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2">
        
        <!-- Left: Image Showcase -->
        <div class="relative bg-[#0d0d0d] aspect-square md:aspect-auto flex items-center justify-center p-4">
          <img 
            id="qv-main-image" 
            src="${product.images[0]}" 
            alt="${product.name}" 
            class="max-h-[380px] w-full object-contain rounded-xl"
          />
          ${product.discount > 0 ? `
            <span class="absolute top-4 left-4 bg-[#D4AF37] text-black font-bold text-xs px-2.5 py-1 rounded shadow">
              -${product.discount}% OFF
            </span>
          ` : ''}
        </div>

        <!-- Right: Details & Options -->
        <div class="p-6 flex flex-col justify-between max-h-[500px] overflow-y-auto">
          <div>
            <!-- Shop Tag -->
            <div class="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <a href="#/shop/${shop?.slug || product.shopId}" class="hover:text-[#D4AF37] transition flex items-center gap-1">
                ${product.shopName} ${shop?.verified ? renderIcon('check-circle-2', 'w-3 h-3 text-[#22C55E]') : ''}
              </a>
              <div class="flex items-center gap-1 text-[#F5D76E]">
                ${renderIcon('star-filled', 'w-3.5 h-3.5 text-[#D4AF37]')}
                <span class="font-bold">${product.rating}</span>
                <span class="text-neutral-500">(${product.reviewsCount})</span>
              </div>
            </div>

            <!-- Title -->
            <h2 class="font-serif text-lg font-bold text-white mb-2 leading-snug">
              ${product.name}
            </h2>

            <!-- Price -->
            <div class="flex items-baseline gap-3 mb-4">
              <span class="text-2xl font-serif font-bold text-[#F5D76E]">$${product.price.toFixed(2)}</span>
              ${product.originalPrice > product.price ? `
                <span class="text-sm text-neutral-500 line-through">$${product.originalPrice.toFixed(2)}</span>
              ` : ''}
              <span class="text-xs text-green-400 font-medium ml-auto flex items-center gap-1">
                ${renderIcon('check', 'w-3 h-3')} In Stock (${product.stock} left)
              </span>
            </div>

            <p class="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4">
              ${product.description}
            </p>

            <!-- Variants Selectors -->
            ${product.variants?.map((v, i) => `
              <div class="mb-3">
                <label class="block text-xs font-semibold text-neutral-300 mb-1.5">${v.name}:</label>
                <div class="flex flex-wrap gap-1.5">
                  ${v.options.map((opt, optIdx) => `
                    <button 
                      class="qv-variant-option px-3 py-1 text-xs rounded border transition ${optIdx === 0 ? 'bg-[#D4AF37] text-black font-semibold border-[#D4AF37]' : 'bg-[#1e1e1e] text-neutral-300 border-neutral-700 hover:border-[#D4AF37]'}"
                      data-variant-name="${v.name}"
                      data-variant-val="${opt}"
                    >
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('') || ''}

            <!-- Custom Personalization Field if Supported -->
            ${product.customizable ? `
              <div class="mb-3">
                <label class="block text-xs font-semibold text-[#F5D76E] mb-1">Custom Engraving / Notes (Optional):</label>
                <input 
                  id="qv-custom-notes" 
                  type="text" 
                  placeholder="e.g., Initials 'E.V.', custom sizing, or special message" 
                  class="input-luxe text-xs py-1.5"
                />
              </div>
            ` : ''}

            <!-- Quantity Selector -->
            <div class="flex items-center gap-3 mb-4">
              <span class="text-xs text-neutral-300 font-semibold">Quantity:</span>
              <div class="flex items-center border border-neutral-700 rounded-lg bg-[#1a1a1a]">
                <button id="qv-qty-minus" class="px-2.5 py-1 text-neutral-400 hover:text-white">-</button>
                <span id="qv-qty-val" class="px-3 py-1 text-xs font-bold text-white">1</span>
                <button id="qv-qty-plus" class="px-2.5 py-1 text-neutral-400 hover:text-white">+</button>
              </div>
            </div>

          </div>

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-neutral-800 flex items-center gap-3">
            <button id="qv-add-cart-btn" class="flex-1 btn-gold text-xs py-2.5 justify-center">
              ${renderIcon('shopping-bag', 'w-4 h-4')} Add to Cart
            </button>
            <a href="#/product/${product.slug}" id="qv-view-full-btn" class="btn-gold-outline text-xs py-2.5 px-4">
              Full Details
            </a>
          </div>

        </div>

      </div>

    </div>
  `;

  // Attach handlers
  let quantity = 1;
  const qtyVal = document.getElementById('qv-qty-val');
  document.getElementById('qv-qty-minus')?.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      qtyVal.innerText = quantity;
    }
  });
  document.getElementById('qv-qty-plus')?.addEventListener('click', () => {
    if (quantity < product.stock) {
      quantity++;
      qtyVal.innerText = quantity;
    }
  });

  // Variant selector buttons
  modalOverlay.querySelectorAll('.qv-variant-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = e.target.parentElement;
      parent.querySelectorAll('.qv-variant-option').forEach(b => {
        b.className = 'qv-variant-option px-3 py-1 text-xs rounded border transition bg-[#1e1e1e] text-neutral-300 border-neutral-700 hover:border-[#D4AF37]';
      });
      e.target.className = 'qv-variant-option px-3 py-1 text-xs rounded border transition bg-[#D4AF37] text-black font-semibold border-[#D4AF37]';
    });
  });

  // Close handlers
  const closeModal = () => modalOverlay.remove();
  document.getElementById('close-quickview-btn')?.addEventListener('click', closeModal);
  document.getElementById('qv-view-full-btn')?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Add to cart handler
  document.getElementById('qv-add-cart-btn')?.addEventListener('click', () => {
    const selectedVariants = Array.from(modalOverlay.querySelectorAll('.qv-variant-option.bg-\\[\\#D4AF37\\]'))
      .map(b => b.dataset.variantVal).join(' / ');
    const customNotes = document.getElementById('qv-custom-notes')?.value || '';

    store.addToCart(product.id, quantity, selectedVariants, customNotes);
    showToast(`Added ${quantity}x "${product.name}" to cart.`, 'success');
    renderNavbar();
    renderMobileNav();
    closeModal();
  });
}
