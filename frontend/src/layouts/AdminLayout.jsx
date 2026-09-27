import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  CalendarCheck,
  Users,
  TrendingUp,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { user } = useAuth();

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
      isActive
        ? 'bg-cyan-500 text-dark-950 font-bold shadow-glow-cyan'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="h-16 glass-nav border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Site
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
            <Shield className="w-4 h-4" />
            APEX CONTROL HUB
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">{user?.name}</p>
            <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
            {user?.name?.charAt(0) || 'A'}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Admin Navigation Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4 sticky top-24">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 font-mono">
              Management
            </p>
            <nav className="flex flex-col gap-1.5">
              <NavLink to="/admin/dashboard" end className={navItemClass}>
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </NavLink>
              <NavLink to="/admin/cars" className={navItemClass}>
                <Car className="w-4 h-4" />
                <span>Manage Fleet</span>
              </NavLink>
              <NavLink to="/admin/cars/new" className={navItemClass}>
                <PlusCircle className="w-4 h-4" />
                <span>Add Vehicle</span>
              </NavLink>
              <NavLink to="/admin/bookings" className={navItemClass}>
                <CalendarCheck className="w-4 h-4" />
                <span>Bookings</span>
              </NavLink>
              <NavLink to="/admin/users" className={navItemClass}>
                <Users className="w-4 h-4" />
                <span>Users</span>
              </NavLink>
              <NavLink to="/admin/analytics" className={navItemClass}>
                <TrendingUp className="w-4 h-4" />
                <span>Revenue Analytics</span>
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Admin Content Outlet */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
