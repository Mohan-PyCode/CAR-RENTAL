import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import { CheckCircle2, ArrowRight, Calendar, FileText } from "lucide-react";

export default function BookingSuccess() {
  const location = useLocation();
  const state = location.state || {};
  const bookingId = state.bookingId || "BK202501091530101ABCD";
  const vehicleTitle = state.vehicleTitle || "Urban Glide Sedan";
  const totalPrice = state.totalPrice || 2760;

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Payment & Reservation Initiated!
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Your reservation for <strong className="text-slate-900">{vehicleTitle}</strong> has been transmitted. Your host is reviewing your schedule details.
        </p>

        <div className="my-6 p-4 bg-slate-50 border border-slate-200/90 rounded-2xl text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Booking ID</span>
            <span className="font-mono font-bold text-slate-900">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Status</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Pending Confirmation
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Amount Processed</span>
            <span className="font-bold text-slate-900">₹{totalPrice}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard/customer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition"
          >
            <span>Go to Customer Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/vehicles"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
          >
            Browse More Cars
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
