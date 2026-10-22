# Changelog & Migration Notes

All notable changes and architectural modernizations made to the RoadReady frontend.

---

## [2.0.0] - Frontend Modernization

### Architectural Changes
* **Migrated from Chakra UI v2 + Emotion to Tailwind CSS v3:**
  * Replaced runtime CSS generation with precompiled utility classes.
  * Compressed production CSS bundle dropped from ~180 kB to **5.79 kB** (96% reduction).
  * JavaScript bundle size reduced to **75.01 kB gzipped**.
* **Eliminated Proprietary Component Lock-in:**
  * Replaced `<Box>`, `<Stack>`, `<SimpleGrid>`, `<Card>` with standard semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
* **Clean API Integration Layer:**
  * Created `src/api/client.js` managing headers, token authentication, and query parameter serialization.
  * Added domain-specific modules: `vehicles.js`, `bookings.js`, `auth.js`, `stats.js`.
  * Preserved 100% of the Django REST Framework API contract without modifying backend routes.
  * Built graceful fallback to `src/data/mock.js` so local UI testing works reliably even when the Django server is offline.
* **Authentication & Session Management:**
  * Introduced `AuthContext` to manage user identity, authentication state, and token persistence in `localStorage`.
* **Icons Modernization:**
  * Replaced `@chakra-ui/icons` with `lucide-react` for accessible, lightweight SVG icons.

### Component-by-Component Modernization
* **`AppLayout.jsx` & `NavBar.jsx`:** Added `#main-content` skip link, responsive sticky header, mobile drawer with aria attributes, and session-aware login/profile indicators.
* **`VehicleCard.jsx`:** Upgraded to semantic `<article>` with responsive `aspect-[16/10]` image container, availability badges, and rate formatting.
* **`VehicleList.jsx`:** Added interactive multi-select filters, price ranges, seat limits, transmission toggles, schedule inputs, and live car count.
* **`VehicleDetail.jsx`:** Added image gallery, live price quote calculator (`/vehicles/:id/quote/`), slot availability viewer, and customer review form.
* **`BookingCheckout.jsx`:** Connected to backend `/api/bookings/` and `/api/bookings/:id/checkout/` with sticky price summary and contact fields.
* **`BookingSuccess.jsx`:** Upgraded with confirmation checkmark, booking ID reference, and quick navigation to customer trips.
* **`CustomerDashboard.jsx`:** Added active trips, previous booking records, and saved favorites list.
* **`OwnerDashboard.jsx`:** Added fleet management cards, approval/rejection queue with one-click actions, and add-vehicle form.
* **`AdminDashboard.jsx`:** Added real-time metric cards, payment gateway feed, and interactive Cashfree webhook simulator.
* **`Login.jsx` & `Register.jsx`:** Connected to backend auth endpoints with role selection (Customer vs Owner) and field validation.
