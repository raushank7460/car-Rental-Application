import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// Layouts & Guards
import { RootLayout } from './layouts/RootLayout';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { Home } from './pages/public/Home';
import { Cars } from './pages/public/Cars';
import { CarDetails } from './pages/public/CarDetails';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';

// User Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { MyBookings } from './pages/user/MyBookings';
import { BookingDetails } from './pages/user/BookingDetails';
import { Wishlist } from './pages/user/Wishlist';
import { Profile } from './pages/user/Profile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageCars } from './pages/admin/ManageCars';
import { AddEditCar } from './pages/admin/AddEditCar';
import { ManageBookings } from './pages/admin/ManageBookings';
import { ManageUsers } from './pages/admin/ManageUsers';
import { Analytics } from './pages/admin/Analytics';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              {/* Public Routes Wrapped in RootLayout */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="cars" element={<Cars />} />
                <Route path="cars/:id" element={<CarDetails />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* User Protected Routes with UserLayout */}
                <Route
                  path="user"
                  element={
                    <ProtectedRoute>
                      <UserLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="bookings" element={<MyBookings />} />
                  <Route path="bookings/:id" element={<BookingDetails />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>

              {/* Admin Protected Routes with AdminLayout */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="cars" element={<ManageCars />} />
                <Route path="cars/new" element={<AddEditCar />} />
                <Route path="cars/edit/:id" element={<AddEditCar />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
