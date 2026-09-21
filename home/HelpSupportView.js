// ==========================================================================
// AURELIA LUXE - HELP & SUPPORT VIEW
// Location: home/HelpSupportView.js
// ==========================================================================

import { store } from '../assets/js/store.js';
import { renderIcon } from '../assets/js/icons.js';
import { showToast } from '../assets/js/components/Toast.js';

export function renderHelpSupportView(container) {
  const faqs = [
    {
      q: 'How does Aurelia verify that products are truly handmade?',
      a: 'Every artisan atelier must submit video provenance of their bench-work, workshop photography, and craft credentials before acceptance into the Aurelia Guild. We do not permit automated mass manufacturing, drop-shipping, or factory resale.'
    },
    {
      q: 'How does the Escrow Payment Protection system work?',
      a: 'When you place an order, your funds are safely deposited into Aurelia platform escrow. The artisan begins handcrafting your piece. Payment is only disbursed to the creator after insured delivery is confirmed by signature.'
    },
    {
      q: 'Can I commission custom engravings, sizing, or bespoke gemstones?',
      a: 'Yes! Items marked with the "Bespoke Custom" badge allow you to specify custom monograms, ring sizing, or custom dimensions directly in the customization field or by messaging the artisan through their public shop page.'
    },
    {
      q: 'What is the return and refund policy on handcrafted pieces?',
      a: 'Standard non-personalized handmade items carry a 30-day inspection period. If the item does not meet your expectations, return it in original condition for a full refund. Bespoke personalized pieces are guaranteed for structural integrity.'
    }
  ];

  container.innerHTML = `
    <div class="animate-fade-in text-white py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="text-center max-w-xl mx-auto space-y-3">
        <span class="badge-gold">Patron Concierge</span>
        <h1 class="font-serif text-3xl sm:text-4xl font-bold text-white">Help & Artisan Support Center</h1>
        <p class="text-xs text-neutral-400">Frequently asked questions and direct artisan inquiry support.</p>
      </div>

      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-4">
        <h2 class="font-serif font-bold text-xl text-[#F5D76E] mb-4">Frequently Asked Questions</h2>
        <div class="divide-y divide-neutral-800">
          ${faqs.map((faq, idx) => `
            <div class="py-4 cursor-pointer group faq-item" data-idx="${idx}">
              <div class="flex items-center justify-between font-medium text-sm text-white group-hover:text-[#F5D76E] transition">
                <span>${faq.q}</span>
                <span class="text-[#D4AF37] faq-icon">${renderIcon('chevron-down', 'w-4 h-4')}</span>
              </div>
              <p class="faq-answer hidden text-xs text-neutral-400 mt-2 leading-relaxed">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card-luxe p-6 sm:p-8 bg-[#141414] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-6">
        <div>
          <h2 class="font-serif font-bold text-xl text-[#F5D76E]">Submit an Artisan Concierge Inquiry</h2>
          <p class="text-xs text-neutral-400 mt-1">Our customer concierge responds within 4 hours.</p>
        </div>

        <form id="support-ticket-form" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-neutral-300 mb-1">Inquiry Subject *</label>
              <input type="text" id="tck-subject" required placeholder="e.g. Ring resizing inquiry" class="input-luxe" />
            </div>
            <div>
              <label class="block font-semibold text-neutral-300 mb-1">Priority</label>
              <select id="tck-priority" class="input-luxe">
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-semibold text-neutral-300 mb-1">Message *</label>
            <textarea id="tck-message" required rows="4" placeholder="Describe your request..." class="input-luxe"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn-gold py-2.5 px-6">${renderIcon('mail', 'w-4 h-4')} Submit Ticket</button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      const isHidden = answer?.classList.contains('hidden');
      container.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
      container.querySelectorAll('.faq-icon').forEach(i => i.innerHTML = renderIcon('chevron-down', 'w-4 h-4'));
      if (isHidden) {
        answer?.classList.remove('hidden');
        if (icon) icon.innerHTML = renderIcon('chevron-up', 'w-4 h-4');
      }
    });
  });

  document.getElementById('support-ticket-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('tck-subject').value;
    const priority = document.getElementById('tck-priority').value;
    const message = document.getElementById('tck-message').value;
    const ticket = store.createTicket({ subject, priority, message });
    showToast(`Support Ticket #${ticket.id} created! Concierge will reply shortly.`, 'success');
    e.target.reset();
  });
}
