import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  Car,
  Heart,
  User,
  Shield,
  LogOut,
  Menu,
  X,
  Compass,
  LayoutDashboard,
  CalendarCheck,
  ChevronDown,
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-all px-3 py-1.5 rounded-lg ${
      isActive
        ? 'text-white bg-white/10 shadow-sm'
        : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red to-brand-crimson flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-white flex items-center gap-1 font-sans">
              APEX<span className="text-brand-red">WHEELS</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 block -mt-1 font-mono uppercase">
              3D Luxury Fleet
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/cars" className={navLinkClass}>
            Fleet
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right CTA & Account Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Wishlist Icon */}
          <Link
            to={user ? '/user/wishlist' : '/login'}
            className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Account / Auth Buttons */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-slate-200"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-red/20 text-brand-red border border-brand-red/30 flex items-center justify-center font-bold text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/30">
                        Admin Access
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-colors font-medium"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Control Panel
                    </Link>
                  )}

                  <Link
                    to="/user/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    User Dashboard
                  </Link>

                  <Link
                    to="/user/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4 text-slate-400" />
                    My Bookings
                  </Link>

                  <Link
                    to="/user/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Profile Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-brand-red to-brand-crimson text-white shadow-glow hover:brightness-110 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to={user ? '/user/wishlist' : '/login'}
            className="p-2 text-slate-300 relative"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-1 right-1 w-2 h-2 bg-brand-red rounded-full"></span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-200 hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            to="/cars"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-200 hover:bg-white/10"
          >
            Explore Fleet
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-200 hover:bg-white/10"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-200 hover:bg-white/10"
          >
            Contact
          </Link>

          <hr className="border-white/10" />

          {user ? (
            <div className="space-y-2 pt-1">
              <div className="px-3 py-1">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-semibold text-white">{user.name}</p>
              </div>

              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-cyan-400 bg-cyan-500/10"
                >
                  Admin Control Panel
                </Link>
              )}

              <Link
                to="/user/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                to="/user/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10"
              >
                My Bookings
              </Link>
              <Link
                to="/user/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10"
              >
                Profile Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-brand-red text-white font-bold shadow-glow"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
