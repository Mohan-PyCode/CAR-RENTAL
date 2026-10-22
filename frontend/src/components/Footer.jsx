import React from "react";
import { Link } from "react-router-dom";
import { Car, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Car className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-lg text-slate-900">RoadReady</span>
            <span className="text-xs text-slate-400">| Modern Car Rental Architecture</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/vehicles" className="hover:text-brand-600 transition">Browse Catalog</Link>
            <Link to="/dashboard/customer" className="hover:text-brand-600 transition">My Trips</Link>
            <Link to="/dashboard/owner" className="hover:text-brand-600 transition">Host Dashboard</Link>
            <Link to="/dashboard/admin" className="hover:text-brand-600 transition">Platform Admin</Link>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} RoadReady. Built with React & Tailwind.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
