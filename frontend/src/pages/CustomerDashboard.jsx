import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import BookingCard from "../components/BookingCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { getCustomerBookings, getPreviousBookings, cancelBooking } from "../api/bookings.js";
import { getVehicles } from "../api/vehicles.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Calendar, Heart, User, CheckCircle } from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [activeBookings, setActiveBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile form state
  const [fullName, setFullName] = useState(user?.username || "Priya Sharma");
  const [email, setEmail] = useState("priya@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [active, prev, cars] = await Promise.all([
          getCustomerBookings(),
          getPreviousBookings(),
          getVehicles(),
        ]);
        setActiveBookings(active);
        setPreviousBookings(prev);
        setFavorites(cars.slice(0, 2));
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(bookingId);
      setActiveBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking cancelled.");
    } catch (err) {
      setActiveBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Customer Dashboard"
        subtitle="Manage your upcoming trips, past bookings, saved favorites, and account details."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
        {/* Main Content Area: Bookings & Favorites */}
        <div className="space-y-8">
          {/* Active / Upcoming Bookings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600" />
                <span>Upcoming & Active Bookings</span>
              </h2>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                {activeBookings.length} Active
              </span>
            </div>

            {loading ? (
              <div className="h-28 rounded-xl bg-slate-100 animate-pulse" />
            ) : activeBookings.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl space-y-2">
                <p className="text-sm font-semibold text-slate-700">No active bookings</p>
                <p className="text-xs text-slate-500">Ready for a road trip? Explore available cars across your city.</p>
                <Link
                  to="/vehicles"
                  className="inline-block mt-2 px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 text-white"
                >
                  Browse Cars
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeBookings.map((b) => (
                  <BookingCard key={b.id} booking={b} onCancel={handleCancel} />
                ))}
              </div>
            )}
          </div>

          {/* Past Bookings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-lg text-slate-900">
                Previous Bookings
              </h2>
              <button
                onClick={() => alert("Downloading trip receipts (PDF)...")}
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                Download Receipts
              </button>
            </div>

            {loading ? (
              <div className="h-28 rounded-xl bg-slate-100 animate-pulse" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previousBookings.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            )}
          </div>

          {/* Saved Favorites */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Saved Favorites</span>
              </h2>
              <Link to="/vehicles" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                Explore More
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </div>

        {/* Profile Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-brand-600" />
            <h2 className="font-heading font-bold text-lg text-slate-900">Renter Profile</h2>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Profile preferences saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition shadow-sm"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
