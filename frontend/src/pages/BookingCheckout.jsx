import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { createBooking, checkoutBooking } from "../api/bookings.js";
import { ShieldCheck, CreditCard, Calendar, MapPin, AlertCircle } from "lucide-react";

export default function BookingCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingState = location.state || {};
  const vehicle = bookingState.vehicle || {
    id: 1,
    title: "Urban Glide Sedan",
    deliveryFee: 200,
  };

  const [name, setName] = useState("Priya Sharma");
  const [email, setEmail] = useState("priya@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [loading, setLoading] = useState(false);

  const pickupLocation = bookingState.pickup || "Bandra Station, Mumbai";
  const dropoffLocation = bookingState.dropoff || "Mumbai Central";
  const startAt = bookingState.startAt || "2026-10-20T10:00:00Z";
  const endAt = bookingState.endAt || "2026-10-20T18:00:00Z";
  const pricingUnit = bookingState.pricingUnit || "hourly";

  const basePrice = Number(bookingState.quotePrice || 2560);
  const deliveryFee = Number(vehicle.deliveryFee ?? 200);
  const totalPrice = basePrice + deliveryFee;

  const handleProceedToPay = async () => {
    setLoading(true);
    try {
      const payload = {
        vehicle: vehicle.id,
        start_at: startAt,
        end_at: endAt,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        delivery_fee: deliveryFee,
        pricing_unit: pricingUnit,
        vehicle_title: vehicle.title,
      };

      const booking = await createBooking(payload);
      const checkoutRes = await checkoutBooking(booking.id);

      navigate("/booking/success", {
        state: {
          bookingId: booking.booking_id || `BK${Date.now()}`,
          vehicleTitle: vehicle.title,
          totalPrice,
          paymentReference: checkoutRes.reference_id,
        },
      });
    } catch (err) {
      alert("Failed to process booking: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Checkout & Payment"
        subtitle="Review your trip reservation details and complete booking securely."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        {/* Left Column: Booking & Renter Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Trip Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500 block">Vehicle</span>
                <span className="font-bold text-slate-900">{vehicle.title}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500 block">Pricing Plan</span>
                <span className="font-bold text-slate-900 capitalize">{pricingUnit}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Schedule: {startAt} &rarr; {endAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Pickup: {pickupLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Dropoff: {dropoffLocation}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Renter Information
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Price Summary & Checkout Action */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
            <h2 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Price Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Rental Base Price</span>
                <span className="font-semibold text-slate-900">₹{basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery & Cleaning Fee</span>
                <span className="font-semibold text-slate-900">₹{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-base">
                <span className="font-heading font-bold text-slate-900">Total Payable</span>
                <span className="font-heading font-extrabold text-xl text-brand-600">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleProceedToPay}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>{loading ? "Initializing..." : "Proceed to Pay"}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition"
              >
                Cancel and return
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Payment Webhook</span>
              </div>
              <p>
                Live verification via <code>/api/payments/webhook/</code> upon Cashfree payment session settlement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
