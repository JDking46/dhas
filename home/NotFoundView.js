// ==========================================================================
// AURELIA LUXE - 404 NOT FOUND VIEW
// Location: home/NotFoundView.js
// ==========================================================================

import { renderIcon } from '../assets/js/icons.js';

export function renderNotFoundView(container) {
  container.innerHTML = `
    <div class="animate-fade-in text-white py-24 max-w-xl mx-auto px-4 text-center space-y-6">
      <div class="w-24 h-24 rounded-full bg-[#141414] border-2 border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#F5D76E] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        <span class="font-serif text-3xl font-bold">404</span>
      </div>
      <div class="space-y-2">
        <h1 class="font-serif text-3xl font-bold text-white">Masterpiece Not Found</h1>
        <p class="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
          The artisan page or creation you are seeking may have completed its exhibition or moved to a new collection.
        </p>
      </div>
      <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="#/" class="btn-gold text-xs py-3 px-6 shadow-xl">
          ${renderIcon('store', 'w-4 h-4')} Return to Homepage
        </a>
        <a href="#/products" class="btn-gold-outline text-xs py-3 px-6">
          Explore All Creations
        </a>
      </div>
    </div>
  `;
}
