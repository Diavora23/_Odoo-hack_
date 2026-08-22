# 🇮🇳 GlobeTrotter — Incredible India Travel Planning Web Application

A responsive, production-ready frontend prototype for **GlobeTrotter** — an Incredible India travel planning platform built with React, Tailwind CSS, Lucide React icons, and INR (₹) localization.

![GlobeTrotter Theme](https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **Incredible India Design System**: Warm Saffron (`#F97316`), Deep Indian Teal (`#0D9488`), Marigold Gold, and warm sand tones.
- **Strict Real-Time Client Validation**:
  - RFC email regex validation.
  - Password strength checklist (8+ chars, uppercase, lowercase, number, special char) with a 4-segment dynamic meter.
  - Strict password confirmation matching.
  - Start date $\ge$ today, end date $\ge$ start date.
  - **14-Day Trip Restriction**: Warnings and disabled submit if trips exceed 14 days.
  - Travelers count strictly limited to 1–20.
  - Positive numeric budget validation ($> 0$).
- **7 Detailed Indian Destinations**: Jaipur, Goa, Varanasi, Manali, Kerala (Munnar & Alleppey), Udaipur, and Agra with real activities, local food, hotel tiers, and 5-day weather forecasts.
- **3-Step AI Trip Planning Wizard**:
  - **Step 1**: Setup (City, dates, travelers, style, target budget in ₹).
  - **Step 2**: Multi-plan comparison (*Budget Backpacker*, *Heritage Explorer*, *Luxury Heritage*, *Cultural Immersion*).
  - **Step 3**: Interactive Itinerary Customizer with Day-by-Day accordions, 5-day weather widget, route map, expense chart, and custom activity drawer with live cost recalculation in ₹.
- **My Trips Deck & PDF Export**: Status filters (*Ongoing, Upcoming, Past*), delete confirmation modal, and printable travel pass with simulated QR code.
- **Day & Month Timeline View**: Vertical chronological activity sequence with connecting line markers.
- **Community Hub & 1-Click Forking**: Browse verified routes, filter by budget/city/duration, toggle likes, and click **"Copy / Fork Itinerary"** to clone into your own saved trips.
- **LocalStorage Persistence**: Trips, custom activities, and likes persist seamlessly across browser sessions.
- **Backend API Placeholders**: Standard `// TODO: API Endpoint - POST/GET/DELETE` comments over all async handlers.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Navigate into project directory
cd Globaltrotters

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Building for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
Globaltrotters/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/           # Login, Register, Password Strength Meter
│   │   ├── calendar/       # Calendar Page, Vertical Timeline View
│   │   ├── common/         # Navbar, Sidebar, Floating CTA, Toasts
│   │   ├── community/      # Social Feed, Filters, Fork Itinerary Modal
│   │   ├── dashboard/      # Hero Banner, Featured 7 Cities, Quick Trips, Tips
│   │   ├── trips/          # My Trips Page, Trip Card, Printable PDF Voucher
│   │   └── wizard/         # 3-Step Wizard, Map, Weather, Expense Chart
│   ├── context/
│   │   └── AppContext.jsx  # Global state & LocalStorage synchronization
│   ├── data/
│   │   ├── indianCities.js # 7 Indian destination models with ₹ pricing
│   │   ├── mockTrips.js    # Initial sample trips
│   │   └── communityTrips.js # Public shared itineraries
│   ├── utils/
│   │   ├── validation.js   # Real-time form validation engine
│   │   ├── formatters.js   # INR (₹) formatters, date utilities
│   │   └── planGenerator.js# Multi-tier itinerary generator
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📜 License
MIT License. Created with ❤️ for Indian Tourism.
