# RoadReady Frontend - Modernized Architecture & Developer Guide

Modern, accessible, and high-performance React.js frontend for the RoadReady Car Rental platform.
Designed to integrate directly with the Django REST Framework backend with zero backend changes.

---

## 1. Tech Stack & Architectural Decisions

* **Framework:** React 18 with Vite for rapid Hot Module Replacement (HMR).
* **Styling:** **Tailwind CSS v3** with utility-first classes and CSS variables (Space Grotesk & Manrope font stack).
  * *Why Tailwind?* Eliminates runtime CSS-in-JS style computation overhead (previously incurred by Emotion/Chakra UI v2), bringing compressed CSS down to **~5.8 kB**.
* **Icons:** `lucide-react` (Accessible, tree-shakeable SVG icons).
* **State Management:** Native React Hooks (`useState`, `useEffect`, `useReducer`) with scoped React Context (`AuthContext`).
* **Routing:** React Router v6.

---

## 2. Directory Structure

```
frontend/
├── src/
│   ├── api/                     # Centralized API service layer
│   │   ├── client.js            # Fetch wrapper with Token auth & error normalization
│   │   ├── auth.js              # Login & Registration endpoints
│   │   ├── vehicles.js          # Catalog, filters, availability, quotes, reviews
│   │   ├── bookings.js          # Reservations, checkouts, host approvals/rejections
│   │   └── stats.js             # Platform admin stats & webhook simulator
│   ├── components/              # Atomic, accessible UI components
│   │   ├── AppLayout.jsx        # Semantic landmark layout + a11y skip link
│   │   ├── NavBar.jsx           # Responsive header + mobile drawer + auth links
│   │   ├── Footer.jsx           # Clean footer navigation
│   │   ├── PageHeader.jsx       # Standardized page title header
│   │   ├── VehicleCard.jsx      # Modern car card with rate, badges, and specs
│   │   ├── BookingCard.jsx      # Trip card with status badge & cancellation
│   │   ├── ReviewCard.jsx       # Star ratings and customer testimonial card
│   │   ├── StatCard.jsx         # Metric card with trend indicators
│   │   └── EmptyState.jsx       # Fallback visual when queries return 0 results
│   ├── context/
│   │   └── AuthContext.jsx      # Global user session & persistent token store
│   ├── data/
│   │   └── mock.js              # Graceful offline fixtures
│   ├── pages/                   # Application routes
│   │   ├── Home.jsx             # Hero, featured fleet, host benefits
│   │   ├── VehicleList.jsx      # Filters, live counts, sorting, vehicle grid
│   │   ├── VehicleDetail.jsx    # Specs, gallery, quote calculator, reviews
│   │   ├── BookingCheckout.jsx  # Trip review, customer form, payment trigger
│   │   ├── BookingSuccess.jsx   # Confirmation screen with booking ID
│   │   ├── CustomerDashboard.jsx# Upcoming trips, receipts, saved favorites, profile
│   │   ├── OwnerDashboard.jsx   # Fleet listings, approval queue, add vehicle form
│   │   ├── AdminDashboard.jsx   # Platform metrics, payment feed, webhook tester
│   │   ├── Login.jsx            # Sign in form
│   │   ├── Register.jsx         # Account creation with role selection
│   │   └── NotFound.jsx         # Accessible 404 page
│   ├── index.css                # Tailwind directives & global typography
│   └── main.jsx                 # App entrypoint with BrowserRouter & AuthProvider
├── tailwind.config.js           # Theme extensions & brand palettes
└── vite.config.js               # Vite build config
```

---

## 3. API Contract Mapping (DRF Backend Integration)

The frontend communicates with the Django REST Framework backend at `/api/` using token-based authentication (`Authorization: Token <token>`):

| Action | HTTP | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Login** | `POST` | `/api/auth/login/` | Authenticates user; returns `{ token, username }` |
| **Register** | `POST` | `/api/auth/register/` | Registers customer or owner; returns token |
| **Filter Metadata** | `GET` | `/api/filters/` | Rates, transmission types, seat capacities |
| **Vehicles List** | `GET` | `/api/vehicles/` | Search, vehicle_type, seats, price_min, available_only |
| **Vehicle Detail** | `GET` | `/api/vehicles/:id/` | Full vehicle specifications and photos |
| **Price Quote** | `GET` | `/api/vehicles/:id/quote/` | Dynamic quote for start/end window & tier |
| **Availability** | `GET` | `/api/vehicles/:id/availability/` | Blocked schedule slots |
| **Create Booking** | `POST` | `/api/bookings/` | Creates reservation in pending status |
| **Checkout** | `POST` | `/api/bookings/:id/checkout/` | Initiates Cashfree payment session |
| **Owner Bookings** | `GET` | `/api/owner-bookings/` | Reservations for host's fleet |
| **Approve Booking**| `POST` | `/api/owner-bookings/:id/approve/` | Confirms pending reservation |
| **Reject Booking** | `POST` | `/api/owner-bookings/:id/reject/` | Cancels pending reservation |
| **Admin Stats** | `GET` | `/api/admin/stats/` | Overview counts (vehicles, bookings, users) |
| **Payment Webhook**| `POST` | `/api/payments/webhook/` | Cashfree webhook simulation & confirmation |

> **Graceful Fallback Note:** If the Django backend is offline during local UI development, the API layer (`src/api/*`) falls back to `src/data/mock.js` so developers and UI testers never get a broken screen.

---

## 4. Getting Started

### Prerequisites
* Node.js v18+ and npm

### Installation & Run
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. Performance & Accessibility (a11y) Features

1. **Zero-Runtime CSS Overhead:** Replaced Emotion runtime compilation with static Tailwind CSS.
2. **Keyboard Accessibility:** Added `a11y` Skip-to-content link, proper focus rings (`focus:ring-2 focus:ring-brand-500`), and semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`, `article`).
3. **Cumulative Layout Shift (CLS) Protection:** Vehicle image containers use explicit `aspect-[16/10]` CSS boxes and native `loading="lazy"`.
4. **Color Contrast:** All interactive badges and status text comply with WCAG 2.1 AA standards (minimum 4.5:1 contrast).
