// ==========================================================================
// AURELIA LUXE - CLIENT-SIDE ROUTER & ROLE GUARDS
// ==========================================================================

import { store } from './store.js';

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentRoute = null;
    this.params = {};
    this.queryParams = {};

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  addRoute(pattern, handler, requiredRole = null) {
    this.routes[pattern] = { handler, requiredRole };
  }

  navigate(hashPath) {
    window.location.hash = hashPath.startsWith('#') ? hashPath : '#' + hashPath;
  }

  parseHash() {
    let hash = window.location.hash.slice(1) || '/';
    if (!hash.startsWith('/')) hash = '/' + hash;

    const [pathPart, queryPart] = hash.split('?');
    const queryParams = {};
    if (queryPart) {
      const pairs = queryPart.split('&');
      for (const pair of pairs) {
        const [k, v] = pair.split('=');
        queryParams[decodeURIComponent(k)] = decodeURIComponent(v || '');
      }
    }

    return { path: pathPart, queryParams };
  }

  matchRoute(currentPath) {
    for (const [pattern, routeDef] of Object.entries(this.routes)) {
      const patternParts = pattern.split('/').filter(Boolean);
      const currentParts = currentPath.split('/').filter(Boolean);

      if (patternParts.length !== currentParts.length) continue;

      let match = true;
      const params = {};

      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          const paramName = patternParts[i].slice(1);
          params[paramName] = currentParts[i];
        } else if (patternParts[i] !== currentParts[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        return { routeDef, params, pattern };
      }
    }
    return null;
  }

  handleRoute() {
    const { path, queryParams } = this.parseHash();
    this.queryParams = queryParams;

    const match = this.matchRoute(path);

    // Default container
    const appEl = document.getElementById('app-content');
    if (!appEl) return;

    if (!match) {
      // 404 Route
      if (this.routes['/404']) {
        this.params = {};
        this.routes['/404'].handler(appEl, this.params, this.queryParams);
      } else {
        appEl.innerHTML = `<div class="py-24 text-center text-secondary">Page Not Found</div>`;
      }
      window.scrollTo(0, 0);
      return;
    }

    const { routeDef, params } = match;
    this.params = params;

    // Role Guard Check
    if (routeDef.requiredRole) {
      const currentUser = store.getCurrentUser();
      if (!currentUser) {
        this.navigate('/login?redirect=' + encodeURIComponent(path));
        return;
      }
      if (routeDef.requiredRole === 'ADMIN' && currentUser.role !== 'ADMIN') {
        alert('Unauthorized access: Admin portal requires Administrator role.');
        this.navigate('/admin/login');
        return;
      }
      if (routeDef.requiredRole === 'SELLER' && currentUser.role !== 'SELLER') {
        alert('Unauthorized access: Seller dashboard requires a registered Seller account.');
        this.navigate('/seller/login');
        return;
      }
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Render handler
    routeDef.handler(appEl, this.params, this.queryParams);

    // Update active nav state in DOM if applicable
    document.dispatchEvent(new CustomEvent('aurelia-route-changed', {
      detail: { path, params: this.params, queryParams: this.queryParams }
    }));
  }
}

export const router = new Router();
