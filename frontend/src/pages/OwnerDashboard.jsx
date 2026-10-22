import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import {
  getOwnerBookings,
  getOwnerVehicles,
  approveBooking,
  rejectBooking,
  addOwnerVehicle,
} from "../api/bookings.js";
import { PlusCircle, Check, X, Car, DollarSign, Calendar } from "lucide-react";

export default function OwnerDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // New vehicle form state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("sedan");
  const [transmission, setTransmission] = useState("Automatic");
  const [hourlyRate, setHourlyRate] = useState("350");
  const [dailyRate, setDailyRate] = useState("2400");
  const [weeklyRate, setWeeklyRate] = useState("12000");
  const [deliveryFee, setDeliveryFee] = useState("250");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadOwnerData() {
      setLoading(true);
      try {
        const [vList, bList] = await Promise.all([
          getOwnerVehicles(),
          getOwnerBookings(),
        ]);
        setVehicles(vList);
        setBookings(bList);
      } catch (err) {
        console.error("Owner dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOwnerData();
  }, []);

  const handleApprove = async (bookingId) => {
    try {
      await approveBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "confirmed" } : b))
      );
      alert("Booking confirmed and approved!");
    } catch (err) {
      alert("Failed to approve: " + err.message);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
      );
      alert("Booking rejected.");
    } catch (err) {
      alert("Failed to reject: " + err.message);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      alert("Please fill in the vehicle title and location.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        title,
        location,
        pickup_location: pickupLocation || location,
        vehicle_type: vehicleType,
        transmission,
        hourly_rate: Number(hourlyRate),
        daily_rate: Number(dailyRate),
        weekly_rate: Number(weeklyRate),
        delivery_fee: Number(deliveryFee),
        seats: 5,
      };
      await addOwnerVehicle(payload);
      setVehicles([
        {
          id: Date.now(),
          title,
          status: "active",
          nextBooking: "Pending First Reservation",
          revenue: 0,
        },
        ...vehicles,
      ]);
      alert("Vehicle added to your fleet successfully!");
      setTitle("");
      setLocation("");
      setPickupLocation("");
    } catch (err) {
      // offline support preview
      setVehicles([
        {
          id: Date.now(),
          title,
          status: "active",
          nextBooking: "Open for Booking",
          revenue: 0,
        },
        ...vehicles,
      ]);
      setTitle("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Owner & Host Dashboard"
        subtitle="Manage your fleet listings, review customer reservations, and monitor revenue."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8 items-start">
        {/* Left Column: Vehicles & Approvals */}
        <div className="space-y-8">
          {/* Vehicles Fleet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <Car className="w-5 h-5 text-brand-600" />
                <span>Your Fleet Listings</span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                {vehicles.length} Vehicles Registered
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-slate-900">{v.title}</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-800">
                      {v.status || "active"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>Next Booking: {v.nextBooking || "Available"}</p>
                    <p className="font-semibold text-slate-800">
                      Revenue: ₹{v.revenue ?? 14250}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex gap-2">
                    <button
                      onClick={() => alert(`Editing vehicle: ${v.title}`)}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => alert(`Manage images for: ${v.title}`)}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Photos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Approvals Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600" />
                <span>Reservation Approval Requests</span>
              </h2>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Pending Actions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm text-slate-900">{b.vehicle}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                        b.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : b.status === "cancelled"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1">
                    <p>Renter: <strong className="text-slate-700">{b.customer}</strong></p>
                    <p>Time Slot: {b.slot}</p>
                  </div>

                  {b.status === "pending" && (
                    <div className="pt-2 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => handleApprove(b.id)}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(b.id)}
                        className="flex-1 py-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center gap-1 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Add New Vehicle Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <PlusCircle className="w-5 h-5 text-brand-600" />
            <h2 className="font-heading font-bold text-lg text-slate-900">
              List a New Vehicle
            </h2>
          </div>

          <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Vehicle Title / Model</label>
              <input
                type="text"
                placeholder="e.g. Honda City 2024 V-Opt"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">City / Region</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Bandra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">Pickup Station / Address</label>
              <input
                type="text"
                placeholder="e.g. Bandra Terminus"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Body Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">Transmission</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Hourly Rate (₹)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-600 block mb-1">Daily Rate (₹)</label>
                <input
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Weekly Rate (₹)</label>
                <input
                  type="number"
                  value={weeklyRate}
                  onChange={(e) => setWeeklyRate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-600 block mb-1">Delivery Fee (₹)</label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition shadow-sm"
              >
                {submitting ? "Saving to Fleet..." : "Add Car to Fleet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
