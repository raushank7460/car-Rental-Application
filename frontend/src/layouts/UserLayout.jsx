import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Heart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserLayout = () => {
  const { user } = useAuth();

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
      isActive
        ? 'bg-brand-red text-white shadow-glow'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* User Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="flex items-center gap-3.5 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center font-black text-lg text-white shadow-glow">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white truncate">{user?.name}</h3>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5">
              <NavLink to="/user/dashboard" end className={navItemClass}>
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/user/bookings" className={navItemClass}>
                <CalendarCheck className="w-4 h-4" />
                <span>My Bookings</span>
              </NavLink>
              <NavLink to="/user/wishlist" className={navItemClass}>
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </NavLink>
              <NavLink to="/user/profile" className={navItemClass}>
                <User className="w-4 h-4" />
                <span>Profile</span>
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
