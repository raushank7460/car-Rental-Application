# APEX WHEELS - Modern 3D Luxury Car Rental Platform (MERN)

> A production-grade, full-stack MERN automobile rental platform featuring real-time interactive 3D vehicle customization (Three.js / React Three Fiber), conflict-free date booking engines, JWT authentication, and comprehensive User/Admin intelligence portals.

---

## 🌟 Key Features

### 🏎️ 3D Virtual Showroom & Configurator
- **Three.js & React Three Fiber Engine**: Realistic 3D sports car aerodynamics with metallic lacquer clearcoat shaders, alloy wheels, glowing LED projector headlights, and under-chassis contact shadows.
- **Real-Time Color Customizer**: Switch between Obsidian Black, Pearl White, Rosso Corsa Red, Yas Marina Blue, Quicksilver, Emerald Green, and Liquid Gold with instant shader feedback.
- **Showroom Studio Controls**: 360° orbital rotation, constrained pitch controls, auto-rotation toggle, preset showroom camera angles (Front 3/4, Profile, Rear, Top), and fullscreen immersion.
- **Custom GLB Model Support**: Drop any `.glb` or `.gltf` asset directly into `/frontend/public/models/`.

### 🛡️ Booking & Availability System
- **Double-Booking Prevention**: Mathematical date-overlap engine ensures vehicles cannot be double-booked across active or confirmed dates.
- **Dynamic Pricing Engine**: Automated calculation of base daily rate, collision damage waiver (8%), mandatory GST (18%), and long-term rental discounts (10% for ≥ 5 days).
- **Interactive Multi-Method Payment Simulation**:
  - Credit / Debit Card (with realistic animated card mock)
  - UPI (Instant QR-code simulator for GPay/PhonePe/Paytm)
  - Net Banking (Top Tier-1 Indian & Global Banks)
  - Confetti celebration upon transaction authorization.
- **Digital Reservation Voucher**: Complete printable invoice with QR code check-in, pickup directions, and transaction telemetry.

### 👤 User Portal
- **Client Dashboard**: KPI overview (Total Bookings, Active Rentals, Completed Drives, Total Spend).
- **My Reservations**: Real-time reservation status tracker (`Pending`, `Confirmed`, `Active`, `Completed`, `Cancelled`), payment triggers, and instant cancellation.
- **Wishlist**: Save favorite luxury vehicles with persistent cloud synchronization.
- **Profile Management**: Update member credentials, mobile coordinates, and security passwords.

### ⚡ Admin Control Hub
- **Executive Telemetry**: Fleet count, client accounts, booking volume, and gross revenue metrics.
- **Visual Analytics (Recharts)**: 6-month revenue curve, status distribution donut chart, and top performing vehicles.
- **Fleet Inventory Control**: Add, edit, delete, toggle rental availability, and feature cars on the landing page.
- **Booking Management**: Real-time status dispatcher (`Pending` → `Confirmed` → `Active` → `Completed` → `Cancelled`).
- **User Delegation**: Inspect user accounts, toggle administrative access, or delete records.

---

## 🏗️ Folder Structure

```text
CarRental/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/
│   │   ├── adminController.js    # Aggregated metrics & chart telemetry
│   │   ├── authController.js     # User registration, login, profiles
│   │   ├── bookingController.js  # Overlap validation & booking lifecycle
│   │   ├── carController.js      # Fleet listing, search, filters & CRUD
│   │   ├── paymentController.js  # Mock payment processing
│   │   ├── reviewController.js   # Client reviews & rating recalculation
│   │   ├── userController.js     # Admin user management
│   │   └── wishlistController.js # Favorites toggle & storage
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & role-based guards
│   │   └── errorMiddleware.js    # Global error & 404 handler
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Car.js
│   │   ├── Payment.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── carRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── userRoutes.js
│   │   └── wishlistRoutes.js
│   ├── utils/
│   │   └── seedData.js           # 12 luxury cars with realistic specs
│   ├── .env                      # Environment configurations
│   ├── .env.example
│   ├── package.json
│   ├── seed.js                   # Database seeder script
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   │   ├── models/               # GLTF/GLB vehicle model assets
│   │   └── favicon.svg           # Luxury car favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/
│   │   │   │   ├── CarCanvas.jsx         # R3F Canvas & lighting controls
│   │   │   │   └── ProceduralSupercar.jsx# Aerodynamic 3D car geometry
│   │   │   └── common/
│   │   │       ├── CarCard.jsx           # Responsive vehicle card
│   │   │       ├── Footer.jsx
│   │   │       ├── Navbar.jsx            # Glassmorphic header & user menu
│   │   │       └── ProtectedRoute.jsx    # Auth & Admin route guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx           # JWT user authentication state
│   │   │   ├── ToastContext.jsx          # Animated notifications
│   │   │   └── WishlistContext.jsx       # Vehicle bookmarks
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── RootLayout.jsx
│   │   │   └── UserLayout.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AddEditCar.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── ManageBookings.jsx
│   │   │   │   ├── ManageCars.jsx
│   │   │   │   └── ManageUsers.jsx
│   │   │   ├── public/
│   │   │   │   ├── About.jsx
│   │   │   │   ├── CarDetails.jsx
│   │   │   │   ├── Cars.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── user/
│   │   │       ├── BookingDetails.jsx
│   │   │       ├── MyBookings.jsx
│   │   │       ├── Profile.jsx
│   │   │       ├── UserDashboard.jsx
│   │   │       └── Wishlist.jsx
│   │   ├── services/
│   │   │   ├── adminService.js
│   │   │   ├── api.js                    # Axios instance with interceptors
│   │   │   ├── authService.js
│   │   │   ├── bookingService.js
│   │   │   ├── carService.js
│   │   │   └── extraServices.js
│   │   ├── App.jsx                       # Master route tree
│   │   ├── index.css                     # Glassmorphic Tailwind directives
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 2. Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/carrental
JWT_SECRET=car_rental_super_secret_jwt_key_2025_secure
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

*(Optional) Create `frontend/.env`:*
```env
VITE_API_URL=/api
```

---

### 3. Backend Setup & Database Seeding

Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
node seed.js
```

> **Seeder Credentials Created:**
> - **Super Admin:** `admin@apexwheels.com` / `Admin@123`
> - **Demo Client:** `alex@example.com` / `User@123`
> - **Pre-seeded Fleet:** 12 exotic luxury vehicles (BMW M4, AMG GT, Audi R8, Porsche 911, G-Wagon, Huracan, etc.) with active bookings and revenue analytics.

Start the backend API server:
```bash
npm start
# or for live reload:
npm run dev
```
*Backend runs at:* `http://localhost:5000`

---

### 4. Frontend Setup

Open a second terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at:* `http://localhost:5173`

---

## 🔑 Default Test Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Super Admin** | `admin@apexwheels.com` | `Admin@123` | Full Admin Dashboard, Manage Fleet, Bookings, Users, Revenue |
| **Client** | `alex@example.com` | `User@123` | User Dashboard, My Bookings, Saved Wishlist, 3D Booking |

*(Both accounts are accessible via convenient **One-Click Quick Login** buttons on the `/login` screen).*

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new user account.
- `POST /api/auth/login` - Authenticate and return JWT token.
- `GET /api/auth/me` - Get current authenticated user profile.
- `PUT /api/auth/profile` - Update user name, phone, or password.

### 🏎️ Cars & Fleet (`/api/cars`)
- `GET /api/cars` - Filter cars by brand, category, fuel, transmission, price range, rating, sort.
- `GET /api/cars/featured` - Get top 6 featured cars for home showcase.
- `GET /api/cars/:id` - Get single vehicle specifications, reviews, and 3D configuration.
- `POST /api/cars/:id/availability` - Real-time date overlap check for requested rental dates.
- `POST /api/cars` *(Admin)* - Add a new vehicle to fleet.
- `PUT /api/cars/:id` *(Admin)* - Modify vehicle details or toggle rental availability.
- `DELETE /api/cars/:id` *(Admin)* - Permanently delete vehicle.

### 📅 Bookings (`/api/bookings`)
- `POST /api/bookings` *(Private)* - Reserve a vehicle (with automatic overlap collision checks).
- `GET /api/bookings` *(Private)* - Retrieve logged-in client's bookings.
- `GET /api/bookings/:id` *(Private)* - Get itemized voucher for a reservation.
- `PUT /api/bookings/:id` *(Private)* - Update status or payment status.
- `PUT /api/bookings/:id/cancel` *(Private)* - Cancel reservation.

### 💳 Payments (`/api/payments`)
- `POST /api/payments/process` *(Private)* - Process card/UPI/netbanking transaction, transition booking to `paid` & `confirmed`.

### ❤️ Wishlist (`/api/wishlist`)
- `GET /api/wishlist` *(Private)* - Get client's saved vehicles.
- `POST /api/wishlist/toggle/:carId` *(Private)* - Add or remove vehicle from wishlist.

### ⭐ Reviews (`/api/reviews`)
- `GET /api/reviews/car/:carId` - Retrieve verified reviews for a vehicle.
- `POST /api/reviews` *(Private)* - Submit verified rating and review comment.

### 📊 Admin Intelligence (`/api/admin`)
- `GET /api/admin/dashboard` *(Admin)* - High-level metrics, 6-month revenue, status breakdown, popular cars.
- `GET /api/users` *(Admin)* - List all registered platform accounts.
- `PUT /api/users/:id` *(Admin)* - Toggle administrative access.
- `DELETE /api/users/:id` *(Admin)* - Delete user account.

---

## 🌐 Production Deployment Guide

### Option A: Frontend on Vercel + Backend on Render

#### 1. Backend on Render
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random secret string.
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `https://your-frontend.vercel.app`

#### 2. Frontend on Vercel
1. Create a new project on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-render-service.onrender.com/api`
5. Deploy.

---

## ⚖️ License
Released under the MIT License. Built with passion for automotive excellence and high-performance full-stack web engineering.
