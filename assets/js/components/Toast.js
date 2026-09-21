// ==========================================================================
// AURELIA LUXE - TOAST NOTIFICATION COMPONENT
// ==========================================================================

import { renderIcon } from '../icons.js';

export function showToast(message, type = 'gold') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-[#171717] border border-[#D4AF37]/40 shadow-2xl rounded-xl p-4 flex items-center gap-3 animate-fade-in text-white backdrop-blur-md transition-all duration-300 transform translate-y-0';

  let iconName = 'sparkles';
  let iconClass = 'text-[#D4AF37]';
  if (type === 'success') {
    iconName = 'check-circle-2';
    iconClass = 'text-green-400';
  } else if (type === 'error') {
    iconName = 'alert-circle';
    iconClass = 'text-red-400';
  }

  toast.innerHTML = `
    <div class="flex-shrink-0 ${iconClass}">
      ${renderIcon(iconName, 'w-6 h-6')}
    </div>
    <div class="flex-1 text-sm font-medium pr-2">
      ${message}
    </div>
    <button class="text-neutral-400 hover:text-white flex-shrink-0 text-sm focus:outline-none" onclick="this.parentElement.remove()">
      ${renderIcon('x', 'w-4 h-4')}
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
