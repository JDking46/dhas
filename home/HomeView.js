// ==========================================================================
// AURELIA LUXE - HOME / PUBLIC HOMEPAGE VIEW
// Location: home/HomeView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { renderProductCard } from '../assets/js/components/ProductCard.js';
import { renderShopCard } from '../assets/js/components/ShopCard.js';
import { showToast } from '../assets/js/components/Toast.js';

export function renderHomeView(container) {
  const products = store.getProducts();
  const trendingProducts = products.filter(p => p.isTrending);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival);
  const shops = store.getShops();
  const categories = store.state.categories;

  container.innerHTML = `
    <div class="animate-fade-in text-white overflow-hidden">

      <!-- 1. HERO SECTION -->
      <section class="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/20 overflow-hidden bg-[#080808]">
        <!-- Subtle Animated Golden Radial Backdrop -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#D4AF37]/15 via-[#9C7A20]/5 to-transparent rounded-full blur-3xl pointer-events-none animate-gold-pulse"></div>
        <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <!-- Left Hero Text -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#D4AF37]/40 text-xs font-semibold tracking-widest text-[#F5D76E] uppercase shadow-lg">
              ${renderIcon('sparkles', 'w-3.5 h-3.5 text-[#D4AF37]')}
              The World's Finest Artisan Marketplace
            </div>

            <h1 class="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Handmade. <br />
              <span class="text-gold-gradient">Unique. Yours.</span>
            </h1>

            <p class="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover breathtaking handmade jewelry, ceramic masterpieces, heirloom woodcraft, and sensory fragrances created by verified independent master artisans.
            </p>

            <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#/products" class="w-full sm:w-auto btn-gold text-sm py-3.5 px-8 shadow-xl">
                ${renderIcon('shopping-bag', 'w-4 h-4')} Shop Now
              </a>
              <a href="#/products?tab=shops" class="w-full sm:w-auto btn-gold-outline text-sm py-3.5 px-8">
                Explore Artisan Ateliers ${renderIcon('arrow-right', 'w-4 h-4')}
              </a>
            </div>

            <!-- Trust Metrics -->
            <div class="pt-6 grid grid-cols-3 gap-6 border-t border-neutral-800/80 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
              <div>
                <div class="text-xl sm:text-2xl font-serif font-bold text-[#F5D76E]">2,400+</div>
                <div class="text-xs text-neutral-400">Masterpieces Sold</div>
              </div>
              <div>
                <div class="text-xl sm:text-2xl font-serif font-bold text-[#F5D76E]">100%</div>
                <div class="text-xs text-neutral-400">Authentic Handmade</div>
              </div>
              <div>
                <div class="text-xl sm:text-2xl font-serif font-bold text-[#F5D76E]">4.98 ★</div>
                <div class="text-xs text-neutral-400">Patron Satisfaction</div>
              </div>
            </div>

          </div>

          <!-- Right Hero Visual Showcase -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <!-- Gilded Border Card -->
              <div class="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-[#111111] group">
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80" 
                  alt="Featured Artisan Jewelry" 
                  class="w-full h-[450px] object-cover transition duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                <!-- Floating Showcase Tag -->
                <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#171717]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-2xl flex items-center justify-between">
                  <div>
                    <span class="badge-gold text-[10px] mb-1">Featured Masterpiece</span>
                    <div class="font-serif font-bold text-sm text-white">Imperial 24K Gold Filigree Earrings</div>
                    <div class="text-xs text-neutral-400">By Atelier Aurelia • Florence, Italy</div>
                  </div>
                  <div class="text-right">
                    <div class="text-base font-serif font-bold text-[#F5D76E]">$340.00</div>
                    <a href="#/product/imperial-24k-gold-filigree-blossom-earrings" class="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold">
                      Inspect ${renderIcon('arrow-right', 'w-3 h-3')}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Floating Accent Badge -->
              <div class="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 bg-[#171717] border border-[#D4AF37] py-2 px-4 rounded-2xl shadow-xl">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#9C7A20] flex items-center justify-center text-black font-bold">
                  ${renderIcon('award', 'w-4 h-4')}
                </div>
                <div class="text-left">
                  <div class="text-xs font-bold text-white">Certified Guild</div>
                  <div class="text-[10px] text-neutral-400">Direct From Creators</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- 2. FEATURED CATEGORIES (14 Categories) -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-center justify-between mb-12 text-center sm:text-left gap-4">
          <div>
            <div class="text-xs text-[#D4AF37] uppercase tracking-[0.2em] font-semibold mb-1">Curated Mediums</div>
            <h2 class="font-serif text-3xl font-bold text-white">Featured Artisan Categories</h2>
          </div>
          <a href="#/products" class="text-xs text-[#D4AF37] hover:text-[#F5D76E] flex items-center gap-1.5 font-semibold group">
            Browse All Categories <span class="group-hover:translate-x-1 transition">${renderIcon('arrow-right', 'w-4 h-4')}</span>
          </a>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          ${categories.slice(0, 14).map(c => `
            <a href="#/products?category=${c.id}" class="group relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1.5 shadow-md flex flex-col bg-[#141414]">
              <div class="aspect-square w-full overflow-hidden bg-neutral-900">
                <img 
                  src="${c.image}" 
                  alt="${c.name}" 
                  class="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <div class="p-3 text-center bg-[#171717] flex-1 flex flex-col justify-center">
                <div class="text-xs font-semibold text-white group-hover:text-[#F5D76E] transition truncate">
                  ${c.name}
                </div>
                <div class="text-[10px] text-neutral-500 mt-0.5">
                  ${c.count} items
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- 3. TRENDING PRODUCTS -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="flex flex-col sm:flex-row items-center justify-between mb-10 text-center sm:text-left gap-4">
          <div>
            <span class="badge-gold mb-2">Most Coveted</span>
            <h2 class="font-serif text-3xl font-bold text-white">Trending Handcrafted Pieces</h2>
          </div>
          <a href="#/products?sort=popular" class="btn-gold-outline text-xs py-2 px-4">
            View All Trending
          </a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${trendingProducts.slice(0, 4).map(p => renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- 4. FEATURED SHOPS / ATELIERS -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="badge-gold mb-2">Independent Creators</span>
          <h2 class="font-serif text-3xl font-bold text-white mb-3">Meet Our Master Ateliers</h2>
          <p class="text-xs text-neutral-400">
            Every shop on Aurelia Luxe is an independent artisan atelier verified for heritage techniques and genuine craftsmanship.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${shops.map(s => renderShopCard(s)).join('')}
        </div>
      </section>

      <!-- 5. NEW ARRIVALS HORIZONTAL CAROUSEL -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="text-xs text-[#D4AF37] uppercase tracking-[0.2em] font-semibold mb-1">Fresh From The Bench</div>
            <h2 class="font-serif text-3xl font-bold text-white">New Artisan Arrivals</h2>
          </div>
          <div class="flex items-center gap-2">
            <button id="carousel-prev" class="w-9 h-9 rounded-full border border-neutral-700 hover:border-[#D4AF37] flex items-center justify-center text-neutral-300 hover:text-white transition">
              ${renderIcon('chevron-left', 'w-5 h-5')}
            </button>
            <button id="carousel-next" class="w-9 h-9 rounded-full border border-neutral-700 hover:border-[#D4AF37] flex items-center justify-center text-neutral-300 hover:text-white transition">
              ${renderIcon('chevron-right', 'w-5 h-5')}
            </button>
          </div>
        </div>

        <div id="new-arrivals-carousel" class="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none" style="scrollbar-width: none;">
          ${newArrivals.map(p => `
            <div class="w-72 flex-shrink-0">
              ${renderProductCard(p)}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 6. CURATED EDITORIAL COLLECTIONS -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="text-center max-w-xl mx-auto mb-12">
          <span class="badge-gold mb-2">Curated Editions</span>
          <h2 class="font-serif text-3xl font-bold text-white">Handmade Collections</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="relative rounded-2xl overflow-hidden group h-96 border border-[#D4AF37]/30 shadow-xl">
            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 space-y-2">
              <span class="badge-gold text-[10px]">Edition No. 01</span>
              <h3 class="font-serif text-2xl font-bold text-white">The Royal 24K Gold Archive</h3>
              <p class="text-xs text-neutral-300">Intricate filigree and hand-forged solid golds from Florence and Grasse.</p>
              <a href="#/products?category=jewelry" class="inline-flex items-center gap-1.5 text-xs text-[#F5D76E] font-semibold pt-1 hover:underline">
                Explore Collection ${renderIcon('arrow-right', 'w-3.5 h-3.5')}
              </a>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden group h-96 border border-[#D4AF37]/30 shadow-xl">
            <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 space-y-2">
              <span class="badge-gold text-[10px]">Edition No. 02</span>
              <h3 class="font-serif text-2xl font-bold text-white">Wabi-Sabi Stoneware</h3>
              <p class="text-xs text-neutral-300">Wheel-thrown Japanese ceramic tea bowls, tenmoku glazes, and minimalist urns.</p>
              <a href="#/products?category=pottery" class="inline-flex items-center gap-1.5 text-xs text-[#F5D76E] font-semibold pt-1 hover:underline">
                Explore Collection ${renderIcon('arrow-right', 'w-3.5 h-3.5')}
              </a>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden group h-96 border border-[#D4AF37]/30 shadow-xl">
            <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 space-y-2">
              <span class="badge-gold text-[10px]">Edition No. 03</span>
              <h3 class="font-serif text-2xl font-bold text-white">Sylvan Heritage Woodcraft</h3>
              <p class="text-xs text-neutral-300">Century-old fallen black walnut sculpted with mitered brass joinery.</p>
              <a href="#/products?category=woodcraft" class="inline-flex items-center gap-1.5 text-xs text-[#F5D76E] font-semibold pt-1 hover:underline">
                Explore Collection ${renderIcon('arrow-right', 'w-3.5 h-3.5')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. WHY SHOP WITH US? -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="text-center max-w-xl mx-auto mb-16">
          <span class="badge-gold mb-2">The Aurelia Standard</span>
          <h2 class="font-serif text-3xl font-bold text-white">Why Shop With Us?</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card-luxe p-6 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('sparkles', 'w-6 h-6')}
            </div>
            <h3 class="font-serif font-bold text-lg text-white">Authentic Handmade Products</h3>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Zero drop-shipping or mass manufacturing. Every listed creation is shaped by the human hand of independent master craftspeople.
            </p>
          </div>

          <div class="card-luxe p-6 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('shield-check', 'w-6 h-6')}
            </div>
            <h3 class="font-serif font-bold text-lg text-white">Trusted Guild Sellers</h3>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Every artisan studio is individually vetted for provenance, material authenticity, and ethical labor standards.
            </p>
          </div>

          <div class="card-luxe p-6 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('lock', 'w-6 h-6')}
            </div>
            <h3 class="font-serif font-bold text-lg text-white">Secure Escrow Payments</h3>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Your payment is securely held in platform escrow until your handcrafted parcel arrives safely and meets your expectations.
            </p>
          </div>

          <div class="card-luxe p-6 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('rotate-ccw', 'w-6 h-6')}
            </div>
            <h3 class="font-serif font-bold text-lg text-white">Easy 30-Day Returns</h3>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Shop with total confidence. If a non-custom piece does not exceed your expectations, return it hassle-free within 30 days.
            </p>
          </div>

          <div class="card-luxe p-6 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('headphones', 'w-6 h-6')}
            </div>
            <h3 class="font-serif font-bold text-lg text-white">Direct Artisan Dialogue</h3>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Communicate directly with the artisan making your piece. Request custom engravings, unique gemstones, or specific sizing.
            </p>
          </div>

          <div class="card-luxe p-6 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              ${renderIcon('award', 'w-6 h-6')}
            </div>
            <h3 class="font-serif font-bold text-lg text-white">One-of-a-Kind Creations</h3>
            <p class="text-xs text-neutral-400 leading-relaxed">
              No two pieces are identical. Own a unique piece of living art that carries the soul, fingerprint, and memory of the maker.
            </p>
          </div>
        </div>
      </section>

      <!-- 8. SELLER CTA SECTION -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171717] via-[#1c1c1c] to-[#121212] border-2 border-[#D4AF37]/40 p-8 sm:p-14 shadow-2xl">
          <div class="max-w-2xl relative z-10 space-y-6">
            <span class="badge-gold">Artisan Partner Program</span>
            <h2 class="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Turn Your Craft Into a <span class="text-gold-gradient">Thriving Business</span>
            </h2>
            <p class="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Join the Aurelia Artisan Guild and showcase your creations to patrons across 45 countries with low 10% commission and automated payouts.
            </p>
            <div class="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a href="#/seller/register" class="w-full sm:w-auto btn-gold text-sm py-3.5 px-8">
                ${renderIcon('sparkles', 'w-4 h-4')} Create Your Shop Today
              </a>
              <a href="#/policies/seller-terms" class="w-full sm:w-auto btn-gold-outline text-sm py-3.5 px-6">
                Learn About Seller Standards
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. TESTIMONIALS -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div class="text-center max-w-xl mx-auto mb-14">
          <span class="badge-gold mb-2">Verified Patron Reviews</span>
          <h2 class="font-serif text-3xl font-bold text-white">Words From Discerning Patrons</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card-luxe p-6 flex flex-col justify-between space-y-4">
            <div>
              <div class="flex text-[#D4AF37] gap-1 mb-3">
                ${[...Array(5)].map(() => renderIcon('star-filled', 'w-4 h-4')).join('')}
              </div>
              <p class="text-xs text-neutral-300 italic leading-relaxed">
                "The 24K gold filigree earrings from Atelier Aurelia are beyond comparison. Wearing them feels like wearing royalty."
              </p>
            </div>
            <div class="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" class="w-9 h-9 rounded-full object-cover border border-[#D4AF37]" />
              <div>
                <div class="text-xs font-bold text-white">Elena Vance</div>
                <div class="text-[10px] text-neutral-500">Verified Collector • Beverly Hills</div>
              </div>
            </div>
          </div>

          <div class="card-luxe p-6 flex flex-col justify-between space-y-4">
            <div>
              <div class="flex text-[#D4AF37] gap-1 mb-3">
                ${[...Array(5)].map(() => renderIcon('star-filled', 'w-4 h-4')).join('')}
              </div>
              <p class="text-xs text-neutral-300 italic leading-relaxed">
                "The charcoal matcha ceremony set arrived wrapped in Japanese washi paper inside a hand-planed wooden crate."
              </p>
            </div>
            <div class="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" class="w-9 h-9 rounded-full object-cover border border-[#D4AF37]" />
              <div>
                <div class="text-xs font-bold text-white">Julian Thorne</div>
                <div class="text-[10px] text-neutral-500">Verified Buyer • Zurich</div>
              </div>
            </div>
          </div>

          <div class="card-luxe p-6 flex flex-col justify-between space-y-4">
            <div>
              <div class="flex text-[#D4AF37] gap-1 mb-3">
                ${[...Array(5)].map(() => renderIcon('star-filled', 'w-4 h-4')).join('')}
              </div>
              <p class="text-xs text-neutral-300 italic leading-relaxed">
                "The black walnut keepsake box is a masterwork of joinery. The brass inlays are flush to the micron."
              </p>
            </div>
            <div class="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" class="w-9 h-9 rounded-full object-cover border border-[#D4AF37]" />
              <div>
                <div class="text-xs font-bold text-white">Sophia Moreau</div>
                <div class="text-[10px] text-neutral-500">Verified Buyer • Paris</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;

  const carousel = document.getElementById('new-arrivals-carousel');
  document.getElementById('carousel-prev')?.addEventListener('click', () => {
    carousel?.scrollBy({ left: -320, behavior: 'smooth' });
  });
  document.getElementById('carousel-next')?.addEventListener('click', () => {
    carousel?.scrollBy({ left: 320, behavior: 'smooth' });
  });
}
