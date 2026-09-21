// ==========================================================================
// AURELIA LUXE - VISUAL ORDER TIMELINE COMPONENT
// ==========================================================================

import { renderIcon } from '../icons.js';

export function renderOrderTimeline(order) {
  const timeline = order.timeline || [
    { stage: 'Order Placed', time: order.timestamp, done: true, desc: 'Verified and submitted' },
    { stage: 'Confirmed', time: 'Completed', done: true, desc: 'Artisans accepted commission' },
    { stage: 'Processing & Handcrafting', time: 'In Progress', done: order.status !== 'Confirmed', desc: 'Handcrafted with personalized detail' },
    { stage: 'Shipped', time: order.status === 'Shipped' || order.status === 'Delivered' ? 'Completed' : 'Pending', done: order.status === 'Shipped' || order.status === 'Delivered', desc: 'Dispatched via priority courier' },
    { stage: 'Out for Delivery', time: 'Pending', done: order.status === 'Delivered', desc: 'Out for signature delivery' },
    { stage: 'Delivered', time: order.status === 'Delivered' ? 'Completed' : 'Pending', done: order.status === 'Delivered', desc: 'Signed and delivered' }
  ];

  return `
    <div class="relative py-4">
      <div class="hidden md:flex items-center justify-between relative">
        <!-- Connecting Line -->
        <div class="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-neutral-800 -z-0"></div>
        <div class="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] -z-0 transition-all duration-700" 
             style="width: ${calculateProgressPercent(timeline)}%;"></div>

        ${timeline.map((item, idx) => `
          <div class="relative z-10 flex flex-col items-center text-center max-w-[130px]">
            <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${item.done ? 'bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#1a1a1a] text-neutral-500 border border-neutral-700'}">
              ${item.done ? renderIcon('check', 'w-5 h-5') : (idx + 1)}
            </div>
            <div class="mt-2.5 text-xs font-semibold ${item.done ? 'text-white' : 'text-neutral-500'}">
              ${item.stage}
            </div>
            <div class="text-[10px] text-[#F5D76E] font-medium mt-0.5">
              ${item.time}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Mobile Vertical Stepper -->
      <div class="md:hidden space-y-6 relative pl-6 border-l-2 border-neutral-800">
        ${timeline.map((item, idx) => `
          <div class="relative">
            <div class="absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${item.done ? 'bg-[#D4AF37] text-black ring-4 ring-[#080808]' : 'bg-[#202020] text-neutral-500 border border-neutral-700'}">
              ${item.done ? renderIcon('check', 'w-3.5 h-3.5') : (idx + 1)}
            </div>
            <div>
              <div class="text-xs font-bold ${item.done ? 'text-white' : 'text-neutral-400'}">
                ${item.stage}
              </div>
              <div class="text-[11px] text-[#F5D76E] font-medium mt-0.5">${item.time}</div>
              <div class="text-[11px] text-neutral-400 mt-1">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function calculateProgressPercent(timeline) {
  const doneCount = timeline.filter(t => t.done).length;
  if (doneCount <= 1) return 10;
  if (doneCount >= timeline.length) return 100;
  return ((doneCount - 1) / (timeline.length - 1)) * 100;
}
