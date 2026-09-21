// ==========================================================================
// AURELIA LUXE - GLOBAL FOOTER COMPONENT
// ==========================================================================

import { renderIcon } from '../icons.js';
import { showToast } from './Toast.js';

export function renderFooter() {
  const footerContainer = document.getElementById('main-footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="bg-[#080808] border-t border-[#D4AF37]/25 text-[#B8B8B8] pt-16 pb-24 md:pb-12 text-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Top Section: Brand Statement & Newsletter Subscription -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          <div class="lg:col-span-5 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#171717]">
                <span class="text-[#F5D76E] text-base font-serif font-bold">A</span>
              </div>
              <div class="font-serif tracking-[0.2em] text-xl font-bold text-white">
                AURELIA <span class="text-[#D4AF37]">LUXE</span>
              </div>
            </div>
            <p class="text-xs text-neutral-400 max-w-md leading-relaxed">
              Aurelia Luxe is an uncompromising sanctuary for authentic handmade mastery. We unite discerning patrons with independent master artisans of jewelry, ceramics, fine leather, and traditional crafts worldwide.
            </p>
            <div class="flex items-center gap-4 text-xs text-[#D4AF37]">
              <span class="flex items-center gap-1">${renderIcon('shield-check', 'w-4 h-4 text-[#F5D76E]')} Verified Authenticity</span>
              <span class="flex items-center gap-1">${renderIcon('truck', 'w-4 h-4 text-[#F5D76E]')} Insured Delivery</span>
              <span class="flex items-center gap-1">${renderIcon('rotate-ccw', 'w-4 h-4 text-[#F5D76E]')} 30-Day Returns</span>
            </div>
          </div>

          <!-- Newsletter Box -->
          <div class="lg:col-span-7 bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_25px_rgba(212,175,55,0.06)]">
            <div class="space-y-1">
              <div class="font-serif text-lg font-bold text-white flex items-center gap-2">
                ${renderIcon('sparkles', 'w-4 h-4 text-[#D4AF37]')} The Aurelia Gazette
              </div>
              <p class="text-xs text-neutral-400">
                Receive private invitations to limited artisan drops, private auctions, and creator profiles.
              </p>
            </div>
            <form id="footer-newsletter-form" class="w-full md:w-auto flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <input 
                id="newsletter-email" 
                type="email" 
                required 
                placeholder="Enter your email address" 
                class="bg-[#1a1a1a] border border-neutral-700 text-white text-xs px-4 py-3 rounded-lg focus:border-[#D4AF37] focus:outline-none min-w-[240px]"
              />
              <button type="submit" class="btn-gold text-xs py-3 px-5 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Middle Columns: Navigation Structure -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-neutral-800">
          
          <!-- Column 1: SHOP -->
          <div>
            <h4 class="font-serif text-xs uppercase tracking-[0.15em] text-[#F5D76E] font-bold mb-4">Shop</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/products" class="hover:text-white transition">All Products</a></li>
              <li><a href="#/products?category=jewelry" class="hover:text-white transition">Handmade Jewelry</a></li>
              <li><a href="#/products?category=home-decor" class="hover:text-white transition">Home Decor</a></li>
              <li><a href="#/products?category=pottery" class="hover:text-white transition">Pottery & Ceramics</a></li>
              <li><a href="#/products?category=woodcraft" class="hover:text-white transition">Wooden Crafts</a></li>
              <li><a href="#/products?sort=new" class="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#/products?sort=popular" class="hover:text-white transition">Best Sellers</a></li>
            </ul>
          </div>

          <!-- Column 2: SELLERS -->
          <div>
            <h4 class="font-serif text-xs uppercase tracking-[0.15em] text-[#F5D76E] font-bold mb-4">Sellers</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/seller/register" class="text-[#D4AF37] font-semibold hover:underline flex items-center gap-1">Become a Seller ${renderIcon('sparkles', 'w-3 h-3')}</a></li>
              <li><a href="#/dashboard/seller" class="hover:text-white transition">Seller Dashboard</a></li>
              <li><a href="#/policies/seller-terms" class="hover:text-white transition">Artisan Standards</a></li>
              <li><a href="#/help" class="hover:text-white transition">Seller Help Center</a></li>
              <li><a href="#/dashboard/seller?tab=payouts" class="hover:text-white transition">Payout Schedules</a></li>
            </ul>
          </div>

          <!-- Column 3: CUSTOMER -->
          <div>
            <h4 class="font-serif text-xs uppercase tracking-[0.15em] text-[#F5D76E] font-bold mb-4">Customer</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/dashboard/customer" class="hover:text-white transition">My Account</a></li>
              <li><a href="#/dashboard/customer?tab=orders" class="hover:text-white transition">Track Orders</a></li>
              <li><a href="#/wishlist" class="hover:text-white transition">Saved Wishlist</a></li>
              <li><a href="#/help" class="hover:text-white transition">Help Center & FAQs</a></li>
              <li><a href="#/policies/return" class="hover:text-white transition">Return & Exchange</a></li>
            </ul>
          </div>

          <!-- Column 4: COMPANY -->
          <div>
            <h4 class="font-serif text-xs uppercase tracking-[0.15em] text-[#F5D76E] font-bold mb-4">Company</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/policies/about" class="hover:text-white transition">About Aurelia</a></li>
              <li><a href="#/policies/contact" class="hover:text-white transition">Contact Us</a></li>
              <li><a href="#/policies/careers" class="hover:text-white transition">Artisan Guild Careers</a></li>
              <li><a href="#/policies/about" class="hover:text-white transition">Sustainability Pledge</a></li>
            </ul>
          </div>

          <!-- Column 5: LEGAL & SOCIAL -->
          <div>
            <h4 class="font-serif text-xs uppercase tracking-[0.15em] text-[#F5D76E] font-bold mb-4">Legal & Social</h4>
            <ul class="space-y-2.5 text-xs mb-6">
              <li><a href="#/policies/privacy" class="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#/policies/terms" class="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#/policies/shipping" class="hover:text-white transition">Shipping & Duties</a></li>
              <li><a href="#/policies/refund" class="hover:text-white transition">Refund Guidelines</a></li>
            </ul>

            <div class="text-[11px] text-neutral-400 mb-2">Connect With Artisans</div>
            <div class="flex items-center gap-3 text-neutral-300">
              <a href="javascript:void(0)" class="w-8 h-8 rounded-full bg-[#181818] border border-neutral-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition">
                ${renderIcon('globe', 'w-4 h-4')}
              </a>
              <a href="javascript:void(0)" class="w-8 h-8 rounded-full bg-[#181818] border border-neutral-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition">
                ${renderIcon('camera', 'w-4 h-4')}
              </a>
              <a href="javascript:void(0)" class="w-8 h-8 rounded-full bg-[#181818] border border-neutral-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition">
                ${renderIcon('share-2', 'w-4 h-4')}
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright & Badges -->
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 Aurelia Luxe Inc. All rights reserved. Handcrafted with devotion for authentic creators.
          </div>
          <div class="flex items-center gap-3 text-[11px] text-neutral-400">
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span> 256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Amex</span>
            <span>•</span>
            <span>UPI / QR</span>
            <span>•</span>
            <span>Escrow Payout</span>
          </div>
        </div>

      </div>
    </footer>
  `;

  // Newsletter handler
  document.getElementById('footer-newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    showToast(`Welcome to the Gazette, ${email}! Your 10% welcome coupon is GOLDEN10.`, 'success');
    e.target.reset();
  });
}
