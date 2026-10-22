import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { getVehicles } from "../api/vehicles.js";
import { ArrowRight, ShieldCheck, Clock, Award, Sparkles } from "lucide-react";

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await getVehicles();
        setFeaturedVehicles(data.slice(0, 3));
      } catch (err) {
        console.error("Error loading featured vehicles:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <AppLayout>
      {/* Modern Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white overflow-hidden p-8 sm:p-12 lg:p-16 mb-16 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Verified & Sanitized Fleet
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight">
            Find the perfect drive for every journey.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium">
            Rent top-rated sedans, SUVs, and luxury cars from trusted local owners with zero hidden fees and instant booking.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition"
            >
              <span>Explore All Cars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur border border-white/10 transition"
            >
              List Your Car
            </Link>
          </div>
        </div>

        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b6ff5_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      </section>

      {/* Featured Listings Section */}
      <section className="mb-16">
        <PageHeader
          title="Featured listings"
          subtitle="Popular cars with high availability and verified ratings."
          action={
            <Link
              to="/vehicles"
              className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View all cars &rarr;
            </Link>
          }
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-slate-200/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>

      {/* Why Owners List Here */}
      <section className="mb-12">
        <PageHeader
          title="Why owners list here"
          subtitle="Clear pricing controls, flexible approvals, and automated payouts."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Flexible Rate Controls
            </h3>
            <p className="text-sm text-slate-600">
              Set hourly, daily, and weekly rates with customized delivery fees to maximize your earnings.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              One-Click Approvals
            </h3>
            <p className="text-sm text-slate-600">
              Review customer trip details and verify schedules before accepting booking reservations.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Track Performance
            </h3>
            <p className="text-sm text-slate-600">
              Monitor active vehicle revenues, reviews, and upcoming bookings directly from your host portal.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
