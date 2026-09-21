# Aurelia Luxe — Premium Black + Gold Handmade Marketplace Platform

Aurelia Luxe is an elite, multi-vendor handmade marketplace connecting discerning patrons with independent master artisans. It features a bespoke **Black + Gold** visual identity (#080808 deep black, #111111 secondary black, #171717 card black, with #D4AF37 / #F5D76E / #9C7A20 gold accents) and comprehensive role-based workflows organized cleanly into dedicated directories.

---

## 📁 Clean Role-Based Directory Organization

```
aurelia-luxe/
├── index.html                      # Main HTML5 application shell
├── server.ps1                      # Native zero-dependency PowerShell HTTP server (Port 5173)
├── start.bat                       # 1-Click double-click launcher
├── README.md                       # Complete platform documentation
│
├── home/                           # 🏠 HOME & PUBLIC MARKETPLACE
│   ├── HomeView.js                 # 12-section luxury homepage (Hero, 14 categories, ateliers, etc.)
│   ├── ProductListingView.js       # Product catalog with filter sidebar & 4/3/2-col grid
│   ├── ProductDetailsView.js       # Product details, zoom gallery, variants, custom engraving & reviews
│   ├── HelpSupportView.js          # Concierge help center with FAQ accordion & ticket submit
│   ├── StaticPagesView.js          # About Us, Terms, Privacy, Seller Terms, Shipping, Return
│   └── NotFoundView.js             # Luxury 404 Not Found screen
│
├── customer/                       # 👤 CUSTOMER ROLE
│   ├── CustomerAuth.js             # Patron Sign In & Account Registration
│   ├── CustomerDashboardView.js    # 14-tab patron dashboard (Orders, Addresses, Profile, etc.)
│   ├── CartView.js                 # Multi-seller grouped cart with coupon applicator
│   ├── CheckoutView.js             # 4-step escrow checkout (Address, Delivery, Escrow, Review)
│   ├── OrderConfirmationView.js    # Order receipt screen
│   ├── OrderTrackingView.js        # Visual 6-stage delivery timeline tracking
│   └── WishlistView.js             # Saved wishlist with 1-click move-to-cart
│
├── owner/                          # ⚒️ SHOP OWNER / SELLER ROLE
│   ├── SellerRegisterView.js       # Seller registration & 7-step shop setup wizard
│   ├── SellerDashboardView.js      # Seller portal with products CRUD, order pipeline & gold Chart.js
│   └── ShopPublicView.js           # Public atelier storefront (/shop/:slug)
│
├── admin/                          # 🛡️ ADMIN GOVERNANCE ROLE
│   ├── AdminLoginView.js           # Restricted admin login screen
│   └── AdminDashboardView.js       # Platform governance (GMV charts, seller moderation, take-rate, logs)
│
└── assets/                         # 🎨 SHARED ASSETS & ENGINE
    ├── css/
    │   └── aurelia.css             # Black + Gold design tokens, glow effects, glassmorphism, fonts
    └── js/
        ├── app.js                  # Main application bootstrap and route registry
        ├── store.js                # Central reactive state engine & localStorage persistence
        ├── router.js               # Client-side hash router with role protection guards
        ├── icons.js                # High-definition SVG icons generator
        └── components/
            ├── Navbar.js           # Header with search auto-suggest & 1-Click Role Switcher
            ├── MobileNav.js        # Mobile drawer & role-aware bottom navigation
            ├── Footer.js           # 5-column luxury footer
            ├── ProductCard.js      # Product card with zoom, rating, wishlist & quick view
            ├── ShopCard.js         # Atelier card with cover, rating, followers & follow button
            ├── QuickViewModal.js   # Fast preview modal with variant selector
            ├── OrderTimeline.js    # Visual order tracking timeline
            └── Toast.js            # Floating gold notification alerts
```

---

## 🚀 How to Run Locally

### Option 1: 1-Click Launch (Windows)
Double-click [`start.bat`](start.bat) in File Explorer. It starts the local HTTP server and opens your default browser at `http://localhost:5173/`.

### Option 2: PowerShell Command
Run in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Then visit: 👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 🔑 Demo Credentials & Quick Switch

The top navigation bar features a **Live Perspective Ribbon** allowing you to switch between roles with a single click:
- **Customer**: Elena Vance (`elena@aurelia.com`)
- **Seller**: Marcus Aurelius — Atelier Aurelia (`marcus@atelier.com`)
- **Admin**: Platform Governance (`admin@aurelia.com`)
