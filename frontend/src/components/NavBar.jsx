import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Car, Menu, X, User, LogOut, PlusCircle } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
      isActive
        ? "text-brand-600 bg-brand-50"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-heading font-bold text-xl tracking-tight text-slate-900 group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-600 group-hover:bg-brand-700 flex items-center justify-center text-white shadow-sm transition">
            <Car className="w-5 h-5" />
          </div>
          <span>RoadReady</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/vehicles" className={navLinkClass}>
            Browse Cars
          </NavLink>
          <NavLink to="/dashboard/customer" className={navLinkClass}>
            Customer
          </NavLink>
          <NavLink to="/dashboard/owner" className={navLinkClass}>
            Owner
          </NavLink>
          <NavLink to="/dashboard/admin" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                <User className="w-4 h-4 text-slate-500" />
                {user?.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow transition"
              >
                <PlusCircle className="w-4 h-4" />
                List your car
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <Link
            to="/vehicles"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Browse Cars
          </Link>
          <Link
            to="/dashboard/customer"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Customer Dashboard
          </Link>
          <Link
            to="/dashboard/owner"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Owner Dashboard
          </Link>
          <Link
            to="/dashboard/admin"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Admin Dashboard
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-base font-semibold text-red-600 rounded-lg hover:bg-red-50"
              >
                Logout ({user?.username})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2.5 text-sm font-semibold rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2.5 text-sm font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                >
                  List your car
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
