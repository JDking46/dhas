// ==========================================================================
// AURELIA LUXE - APPLICATION BOOTSTRAP & ROUTE REGISTRY
// ==========================================================================

import { store } from './store.js';
import { router } from './router.js';
import { renderNavbar } from './components/Navbar.js';
import { renderMobileNav } from './components/MobileNav.js';
import { renderFooter } from './components/Footer.js';

// 1. Home / Marketplace Views
import { renderHomeView } from '../../home/HomeView.js';
import { renderProductListingView } from '../../home/ProductListingView.js';
import { renderProductDetailsView } from '../../home/ProductDetailsView.js';
import { renderHelpSupportView } from '../../home/HelpSupportView.js';
import { renderStaticPagesView } from '../../home/StaticPagesView.js';
import { renderNotFoundView } from '../../home/NotFoundView.js';

// 2. Customer Views
import { renderCartView } from '../../customer/CartView.js';
import { renderCheckoutView } from '../../customer/CheckoutView.js';
import { renderOrderConfirmationView } from '../../customer/OrderConfirmationView.js';
import { renderOrderTrackingView } from '../../customer/OrderTrackingView.js';
import { renderWishlistView } from '../../customer/WishlistView.js';
import { renderCustomerDashboardView } from '../../customer/CustomerDashboardView.js';
import { renderLoginView, renderRegisterView } from '../../customer/CustomerAuth.js';

// 3. Shop Owner / Seller Views
import { renderSellerRegisterView, renderSellerLoginView } from '../../owner/SellerRegisterView.js';
import { renderSellerDashboardView } from '../../owner/SellerDashboardView.js';
import { renderShopPublicView } from '../../owner/ShopPublicView.js';

// 4. Admin Views
import { renderAdminDashboardView } from '../../admin/AdminDashboardView.js';
import { renderAdminLoginView } from '../../admin/AdminLoginView.js';

function initApp() {
  // 1. Public Marketplace Routes
  router.addRoute('/', renderHomeView);
  router.addRoute('/products', renderProductListingView);
  router.addRoute('/product/:id', renderProductDetailsView);
  router.addRoute('/shop/:id', renderShopPublicView);
  router.addRoute('/cart', renderCartView, 'CUSTOMER');
  router.addRoute('/checkout', renderCheckoutView, 'CUSTOMER');
  router.addRoute('/order-confirmation/:id', renderOrderConfirmationView, 'CUSTOMER');
  router.addRoute('/track-order/:id', renderOrderTrackingView, 'CUSTOMER');
  router.addRoute('/wishlist', renderWishlistView, 'CUSTOMER');

  // 2. Authentication Routes
  router.addRoute('/login', renderLoginView);
  router.addRoute('/register', renderRegisterView);
  router.addRoute('/admin/login', renderAdminLoginView);

  // 3. Seller Registration, Login & Setup Wizard
  router.addRoute('/seller/login', renderSellerLoginView);
  router.addRoute('/seller/register', renderSellerRegisterView);

  // 4. Role-Protected Dashboard Routes
  router.addRoute('/dashboard/customer', renderCustomerDashboardView, 'CUSTOMER');
  router.addRoute('/dashboard/seller', renderSellerDashboardView, 'SELLER');
  router.addRoute('/dashboard/admin', renderAdminDashboardView, 'ADMIN');

  // 5. Help & Policies Routes
  router.addRoute('/help', renderHelpSupportView);
  router.addRoute('/policies/:type', renderStaticPagesView);

  // 6. 404 Route
  router.addRoute('/404', renderNotFoundView);

  // Initial layout render
  renderNavbar();
  renderMobileNav();
  renderFooter();

  // Subscribe navigation updates to store changes
  store.subscribe(() => {
    renderNavbar();
    renderMobileNav();
  });

  // Start routing
  router.handleRoute();
}

window.addEventListener('DOMContentLoaded', initApp);
