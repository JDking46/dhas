// ==========================================================================
// AURELIA LUXE - STATIC PAGES & POLICY VIEWS
// Location: home/StaticPagesView.js
// ==========================================================================

import { renderIcon } from '../assets/js/icons.js';

const STATIC_CONTENT = {
  about: {
    title: 'About Aurelia Luxe',
    subtitle: 'Preserving Centuries of Heritage Artisan Mastery in a Fast-Fashion World',
    body: `
      <p>Aurelia Luxe was founded with a singular conviction: genuine human artistry cannot be replaced by machines. In an era dominated by mass manufacturing and disposable commodities, we serve as an uncompromising sanctuary for authentic handcrafted excellence.</p>
      <p>Every piece showcased on our platform is hand-forged, hand-thrown, hand-carved, or hand-stitched by verified independent artisans across Florence, Kyoto, Grasse, the Black Forest, and beyond. We guarantee 100% human provenance, ethical material sourcing, and fair artisan compensation with a low 10% platform commission.</p>
    `
  },
  contact: {
    title: 'Contact Concierge',
    subtitle: 'Direct Private Client Services & Guild Inquiries',
    body: `
      <p>Our dedicated Concierge team is available around the clock to assist discerning patrons and guild members.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div class="card-luxe p-6 space-y-2">
          <div class="text-[#D4AF37] font-semibold text-sm">Global Headquarters</div>
          <div class="text-xs text-neutral-300">Aurelia Luxe International Guild</div>
          <div class="text-xs text-neutral-400">Via de' Tornabuoni 14, 50123 Florence, Italy</div>
        </div>
        <div class="card-luxe p-6 space-y-2">
          <div class="text-[#D4AF37] font-semibold text-sm">Americas Concierge</div>
          <div class="text-xs text-neutral-300">Beverly Hills Private Office</div>
          <div class="text-xs text-neutral-400">9500 Wilshire Blvd, Suite 800, Beverly Hills, CA 90212</div>
        </div>
      </div>
    `
  },
  terms: {
    title: 'Terms & Conditions of Patronage',
    subtitle: 'Legal Agreement Governing Transactions & Escrow Protections',
    body: `
      <p>By browsing, commissioning, or purchasing through Aurelia Luxe, patrons agree to these binding terms. All payments are secured in platform escrow until delivery verification.</p>
    `
  },
  privacy: {
    title: 'Privacy & Data Protection Policy',
    subtitle: 'Comprehensive GDPR, CCPA, and Global Patron Confidentiality',
    body: `
      <p>Your privacy is sacred. Aurelia Luxe never sells, licenses, or monetizes patron personal data or purchase histories.</p>
    `
  },
  'seller-terms': {
    title: 'Artisan Seller Standards & Guild Charter',
    subtitle: 'Operational Guidelines for Independent Workshop Owners',
    body: `
      <p>Artisans accepted into Aurelia enjoy direct patron access, automated currency conversions, and subsidized express shipping.</p>
    `
  },
  shipping: {
    title: 'White-Glove Shipping & Customs Policy',
    subtitle: 'Global Priority Transport with Insured Escrow Delivery',
    body: `
      <p>Every parcel is packed with shock-absorbing, museum-grade materials and shipped via DHL Luxury Express or FedEx Priority.</p>
    `
  },
  return: {
    title: 'Return & Exchange Guarantee',
    subtitle: '30-Day Complete Peace of Mind for All Standard Creations',
    body: `
      <p>Non-personalized creations may be returned within 30 days of confirmed delivery for a full refund.</p>
    `
  }
};

export function renderStaticPagesView(container, params) {
  const type = params.type || 'about';
  const page = STATIC_CONTENT[type] || STATIC_CONTENT.about;

  container.innerHTML = `
    <div class="animate-fade-in text-white py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex items-center gap-2 text-xs text-neutral-400">
        <a href="#/" class="hover:text-white transition">Home</a>
        <span>/</span>
        <span class="text-[#D4AF37] capitalize">${type.replace('-', ' ')}</span>
      </div>

      <div class="border-b border-neutral-800 pb-6 space-y-2">
        <span class="badge-gold">Aurelia Codex</span>
        <h1 class="font-serif text-3xl sm:text-4xl font-bold text-white">${page.title}</h1>
        <p class="text-xs sm:text-sm text-neutral-400">${page.subtitle}</p>
      </div>

      <div class="card-luxe p-6 sm:p-10 bg-[#141414] border border-[#D4AF37]/30 rounded-3xl shadow-2xl space-y-4 text-xs sm:text-sm leading-relaxed text-neutral-300">
        ${page.body}
      </div>
    </div>
  `;
}
