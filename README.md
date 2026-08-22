# 🇮🇳 GlobeTrotter — Incredible India Travel Planning Platform

A full-stack travel planning web application for **Incredible India** built with React, Tailwind CSS, Lucide React icons, and a **persistent local database (`globetrotter-db.json`)** powered by an **Express.js REST API backend**.

![GlobeTrotter Royal Theme](https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **Royal Imperial Navy & Gold Theme**: Imperial Navy (`#0F172A`, `#1E1B4B`), Heritage Gold (`#F59E0B`, `#D97706`), and Ivory Sand (`#FAF8F5`).
- **Persistent Local Database & Express Backend**:
  - Standalone, zero-config local database engine at `server/database/globetrotter-db.json`.
  - Auto-seeds on first startup with Indian cities, initial trips, and community itineraries.
  - Complete REST API routes for Auth, Trips, Custom Activities, and Community Forking.
- **Strict Real-Time Client Validation**:
  - RFC email regex validation.
  - Password strength checklist (8+ chars, uppercase, lowercase, number, special char) with 4-segment dynamic meter.
  - Strict password confirmation matching.
  - Start date $\ge$ today, end date $\ge$ start date.
  - **14-Day Trip Restriction**: Warning alert and disabled submit if trips exceed 14 days.
  - Travelers count strictly limited to 1–20.
  - Positive numeric budget validation ($> 0$).
- **7 Detailed Indian Destinations**: Jaipur, Goa, Varanasi, Manali, Kerala (Munnar & Alleppey), Udaipur, and Agra with real monuments, local cuisine, hotel tiers, and 5-day weather forecasts.
- **3-Step AI Trip Planning Wizard**:
  - **Step 1**: Setup (City, dates, travelers, style, target budget in ₹).
  - **Step 2**: Multi-plan comparison (*Budget Backpacker*, *Heritage Explorer*, *Luxury Heritage*, *Cultural Immersion*).
  - **Step 3**: Interactive Itinerary Customizer with Day-by-Day accordions, 5-day weather widget, route map, expense chart, and custom activity drawer with live cost recalculation in ₹.
- **My Trips Deck & PDF Export**: Status filters (*Ongoing, Upcoming, Past*), delete confirmation modal, and printable travel pass with simulated QR code.
- **Day & Month Timeline View**: Vertical chronological activity sequence with connecting line markers.
- **Community Hub & 1-Click Forking**: Browse verified routes, filter by budget/city/duration, toggle likes, and click **"Copy / Fork Itinerary"** to clone directly into your database.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Diavora23/_Odoo-hack_.git

# Navigate into project directory
cd _Odoo-hack_

# Install dependencies
npm install

# Start both Backend Database Server (port 5000) and Frontend (port 5173)
npm run dev
```

- **Frontend Application**: `http://localhost:5173/`
- **Backend API & Database Health Check**: `http://localhost:5000/api/health`

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs both backend Express server and Vite frontend concurrently |
| `npm run server` | Starts only the Express REST API backend and local database |
| `npm run client` | Starts only the Vite frontend dev server |
| `npm run build` | Compiles the production frontend bundle |

---

## 📁 Full-Stack Architecture

```
_Odoo-hack_/
├── server/
│   ├── controllers/
│   │   ├── authController.js       # Auth (register, login, me)
│   │   ├── citiesController.js     # Indian cities dataset & weather
│   │   ├── communityController.js  # Community feed, liking, and 1-click forking
│   │   └── tripsController.js      # Trips CRUD & custom activities
│   ├── database/
│   │   ├── db.js                   # Local database engine with persistent disk storage
│   │   ├── seed.js                 # Automatic database seeder
│   │   └── globetrotter-db.json    # Local JSON-backed database file
│   ├── routes/                     # Express REST API routes
│   └── server.js                   # Express server entry point (Port 5000)
├── src/
│   ├── components/                 # React UI components (Royal Theme)
│   ├── context/
│   │   └── AppContext.jsx          # Synchronized with local database API
│   ├── services/
│   │   └── api.js                  # Frontend API service layer
│   ├── utils/                      # Form validation & INR formatters
│   ├── data/                       # Indian cities & initial dataset
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📜 License
MIT License. Created with ❤️ for Indian Tourism.
