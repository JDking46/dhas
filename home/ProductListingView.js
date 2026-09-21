// ==========================================================================
// AURELIA LUXE - CATALOG / PRODUCT LISTING VIEW
// Location: home/ProductListingView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { renderProductCard } from '../assets/js/components/ProductCard.js';
import { renderShopCard } from '../assets/js/components/ShopCard.js';

export function renderProductListingView(container, params, queryParams) {
  const allProducts = store.getProducts();
  const allCategories = store.state.categories;
  const allShops = store.getShops();

  let selectedCategory = queryParams.category || 'all';
  let searchQuery = queryParams.search ? decodeURIComponent(queryParams.search).toLowerCase() : '';
  let maxPrice = queryParams.maxPrice ? parseInt(queryParams.maxPrice) : 700;
  let minRating = queryParams.minRating ? parseFloat(queryParams.minRating) : 0;
  let inStockOnly = queryParams.inStock === 'true';
  let customizableOnly = queryParams.customizable === 'true';
  let selectedShop = queryParams.shop || 'all';
  let activeSort = queryParams.sort || 'relevance';
  let activeTab = queryParams.tab || 'products';

  function filterAndSortProducts() {
    return allProducts.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedShop !== 'all' && p.shopId !== selectedShop) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (customizableOnly && !p.customizable) return false;
      if (searchQuery) {
        const text = `${p.name} ${p.description} ${p.categoryName} ${p.shopName} ${p.materials}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (activeSort === 'price-asc') return a.price - b.price;
      if (activeSort === 'price-desc') return b.price - a.price;
      if (activeSort === 'rating') return b.rating - a.rating;
      if (activeSort === 'popular') return b.reviewsCount - a.reviewsCount;
      if (activeSort === 'new') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0;
    });
  }

  function renderView() {
    const filteredProducts = filterAndSortProducts();

    container.innerHTML = `
      <div class="animate-fade-in text-white py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs & Header -->
        <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div class="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <a href="#/" class="hover:text-white transition">Home</a>
              <span>/</span>
              <span class="text-[#D4AF37]">Artisan Catalog</span>
              ${selectedCategory !== 'all' ? `<span>/</span><span class="text-white capitalize">${selectedCategory}</span>` : ''}
              ${searchQuery ? `<span>/</span><span class="text-[#F5D76E]">"${searchQuery}"</span>` : ''}
            </div>
            <h1 class="font-serif text-3xl font-bold text-white">
              ${activeTab === 'shops' ? 'Independent Creator Ateliers' : (selectedCategory !== 'all' ? allCategories.find(c => c.id === selectedCategory)?.name || 'Artisan Creations' : 'Artisan Catalog')}
            </h1>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="inline-flex rounded-lg bg-[#141414] p-1 border border-neutral-800 text-xs">
              <button id="tab-products-btn" class="px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'products' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-400 hover:text-white'}">
                Products (${filteredProducts.length})
              </button>
              <button id="tab-shops-btn" class="px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'shops' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-400 hover:text-white'}">
                Artisan Shops (${allShops.length})
              </button>
            </div>

            <button id="open-mobile-filter-btn" class="lg:hidden btn-gold-outline text-xs py-2 px-3 flex items-center gap-1.5">
              ${renderIcon('sliders', 'w-3.5 h-3.5')} Filters
            </button>

            <div class="flex items-center gap-2 text-xs">
              <label class="text-neutral-400 hidden sm:inline">Sort:</label>
              <select id="sort-select" class="bg-[#141414] border border-neutral-700 text-white rounded-lg px-3 py-2 text-xs focus:border-[#D4AF37] focus:outline-none cursor-pointer">
                <option value="relevance" ${activeSort === 'relevance' ? 'selected' : ''}>Relevance</option>
                <option value="new" ${activeSort === 'new' ? 'selected' : ''}>Newest Additions</option>
                <option value="popular" ${activeSort === 'popular' ? 'selected' : ''}>Popularity & Reviews</option>
                <option value="rating" ${activeSort === 'rating' ? 'selected' : ''}>Highest Rated</option>
                <option value="price-asc" ${activeSort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-desc" ${activeSort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        ${activeTab === 'shops' ? `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${allShops.map(s => renderShopCard(s)).join('')}
          </div>
        ` : `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Sidebar (3 cols) -->
            <aside class="hidden lg:block lg:col-span-3 space-y-6 bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-5 sticky top-28 shadow-xl">
              <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span class="font-serif font-bold text-sm text-[#F5D76E] flex items-center gap-2">
                  ${renderIcon('sliders', 'w-4 h-4 text-[#D4AF37]')} Filters
                </span>
                <button id="reset-filters-btn" class="text-[11px] text-neutral-400 hover:text-[#F5D76E] transition">
                  Reset All
                </button>
              </div>

              <!-- Categories -->
              <div>
                <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">Category</label>
                <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                  <div class="flex items-center justify-between py-1 px-2 rounded hover:bg-[#1a1a1a] cursor-pointer ${selectedCategory === 'all' ? 'text-[#D4AF37] font-bold bg-[#1a1a1a]' : 'text-neutral-400'}" data-cat-id="all">
                    <span>All Mediums</span>
                    <span class="text-[10px]">${allProducts.length}</span>
                  </div>
                  ${allCategories.map(c => `
                    <div class="flex items-center justify-between py-1 px-2 rounded hover:bg-[#1a1a1a] cursor-pointer ${selectedCategory === c.id ? 'text-[#D4AF37] font-bold bg-[#1a1a1a]' : 'text-neutral-400'}" data-cat-id="${c.id}">
                      <span>${c.name}</span>
                      <span class="text-[10px]">${allProducts.filter(p => p.category === c.id).length}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Price -->
              <div class="pt-3 border-t border-neutral-800">
                <div class="flex justify-between text-xs mb-1.5 font-semibold">
                  <span class="text-neutral-300">Max Price</span>
                  <span class="text-[#F5D76E] font-bold">$${maxPrice}</span>
                </div>
                <input id="price-range-slider" type="range" min="50" max="700" step="10" value="${maxPrice}" class="w-full cursor-pointer accent-[#D4AF37]" />
              </div>

              <!-- Ratings -->
              <div class="pt-3 border-t border-neutral-800">
                <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">Minimum Rating</label>
                <div class="space-y-1 text-xs">
                  ${[4.9, 4.8, 4.5, 0].map(r => `
                    <label class="flex items-center gap-2 text-neutral-400 hover:text-white cursor-pointer py-0.5">
                      <input type="radio" name="rating-filter" value="${r}" ${minRating === r ? 'checked' : ''} class="accent-[#D4AF37]" />
                      <span>${r > 0 ? `${r}★ & above` : 'All Ratings'}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <!-- Atelier -->
              <div class="pt-3 border-t border-neutral-800">
                <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">Artisan Atelier</label>
                <select id="shop-filter-select" class="w-full bg-[#171717] border border-neutral-700 text-neutral-300 rounded-lg p-2 text-xs focus:border-[#D4AF37] focus:outline-none">
                  <option value="all" ${selectedShop === 'all' ? 'selected' : ''}>All Ateliers</option>
                  ${allShops.map(s => `<option value="${s.id}" ${selectedShop === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                </select>
              </div>

              <!-- Checkbox Toggles -->
              <div class="pt-3 border-t border-neutral-800 space-y-2 text-xs">
                <label class="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white">
                  <input type="checkbox" id="instock-check" ${inStockOnly ? 'checked' : ''} class="accent-[#D4AF37]" />
                  <span>In Stock Only</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white">
                  <input type="checkbox" id="customizable-check" ${customizableOnly ? 'checked' : ''} class="accent-[#D4AF37]" />
                  <span>Bespoke / Customizable</span>
                </label>
              </div>
            </aside>

            <!-- Product Grid (9 cols) -->
            <main class="lg:col-span-9">
              ${filteredProducts.length === 0 ? `
                <div class="card-luxe p-12 text-center my-8 max-w-lg mx-auto">
                  <h3 class="font-serif text-lg font-bold text-white mb-2">No Matching Artisan Creations</h3>
                  <p class="text-xs text-neutral-400 mb-6">Try relaxing your price filters or searching with different keywords.</p>
                  <button id="empty-reset-btn" class="btn-gold text-xs py-2 px-5">Clear All Filters</button>
                </div>
              ` : `
                <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  ${filteredProducts.map(p => renderProductCard(p)).join('')}
                </div>
              `}
            </main>
          </div>
        `}

        <!-- Mobile Filter Drawer -->
        <div id="mobile-filter-drawer" class="fixed inset-0 z-50 bg-black/80 hidden items-end sm:items-center justify-center backdrop-blur-sm p-4">
          <div class="bg-[#171717] border border-[#D4AF37]/40 w-full max-w-md rounded-2xl p-6 text-white max-h-[85vh] overflow-y-auto space-y-5 animate-fade-in">
            <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span class="font-serif font-bold text-base text-[#F5D76E]">Filter Creations</span>
              <button id="close-mobile-filter-btn" class="text-neutral-400 hover:text-white">${renderIcon('x', 'w-5 h-5')}</button>
            </div>
            <div>
              <label class="block text-xs uppercase font-bold text-neutral-400 mb-1">Category</label>
              <select id="mobile-cat-select" class="w-full bg-[#1f1f1f] border border-neutral-700 text-white rounded p-2 text-xs">
                <option value="all">All Mediums</option>
                ${allCategories.map(c => `<option value="${c.id}" ${selectedCategory === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1 font-semibold">
                <span class="text-neutral-400">Max Price:</span>
                <span class="text-[#F5D76E]">$${maxPrice}</span>
              </div>
              <input type="range" id="mobile-price-slider" min="50" max="700" step="10" value="${maxPrice}" class="w-full accent-[#D4AF37]" />
            </div>
            <div class="pt-4 border-t border-neutral-800 flex gap-3">
              <button id="apply-mobile-filter-btn" class="flex-1 btn-gold text-xs py-2.5 justify-center">Apply Filters</button>
            </div>
          </div>
        </div>

      </div>
    `;

    attachListeners();
  }

  function attachListeners() {
    document.getElementById('tab-products-btn')?.addEventListener('click', () => { activeTab = 'products'; renderView(); });
    document.getElementById('tab-shops-btn')?.addEventListener('click', () => { activeTab = 'shops'; renderView(); });
    document.getElementById('sort-select')?.addEventListener('change', (e) => { activeSort = e.target.value; renderView(); });

    container.querySelectorAll('[data-cat-id]').forEach(el => {
      el.addEventListener('click', () => { selectedCategory = el.dataset.catId; renderView(); });
    });

    document.getElementById('price-range-slider')?.addEventListener('input', (e) => { maxPrice = parseInt(e.target.value); renderView(); });

    container.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
      radio.addEventListener('change', (e) => { minRating = parseFloat(e.target.value); renderView(); });
    });

    document.getElementById('shop-filter-select')?.addEventListener('change', (e) => { selectedShop = e.target.value; renderView(); });
    document.getElementById('instock-check')?.addEventListener('change', (e) => { inStockOnly = e.target.checked; renderView(); });
    document.getElementById('customizable-check')?.addEventListener('change', (e) => { customizableOnly = e.target.checked; renderView(); });

    const reset = () => {
      selectedCategory = 'all'; searchQuery = ''; maxPrice = 700; minRating = 0; inStockOnly = false; customizableOnly = false; selectedShop = 'all'; renderView();
    };
    document.getElementById('reset-filters-btn')?.addEventListener('click', reset);
    document.getElementById('empty-reset-btn')?.addEventListener('click', reset);

    const drawer = document.getElementById('mobile-filter-drawer');
    document.getElementById('open-mobile-filter-btn')?.addEventListener('click', () => { drawer?.classList.remove('hidden'); drawer?.classList.add('flex'); });
    document.getElementById('close-mobile-filter-btn')?.addEventListener('click', () => { drawer?.classList.add('hidden'); drawer?.classList.remove('flex'); });
    document.getElementById('apply-mobile-filter-btn')?.addEventListener('click', () => {
      selectedCategory = document.getElementById('mobile-cat-select').value;
      maxPrice = parseInt(document.getElementById('mobile-price-slider').value);
      drawer?.classList.add('hidden'); drawer?.classList.remove('flex');
      renderView();
    });
  }

  renderView();
}
