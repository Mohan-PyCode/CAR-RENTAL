import React from "react";
import { Calendar, Clock, MapPin, CheckCircle, Clock3, XCircle } from "lucide-react";

export default function BookingCard({ booking, onCancel }) {
  const statusColors = {
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const statusIcons = {
    confirmed: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />,
    pending: <Clock3 className="w-3.5 h-3.5 text-amber-600" />,
    cancelled: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
  };

  const status = booking.status?.toLowerCase() || "pending";
  const vehicleName = booking.vehicle_title || booking.vehicle || "Reserved Vehicle";
  const bookingId = booking.booking_id || booking.bookingId || `BK-${booking.id}`;
  const amount = booking.total_price || booking.amount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-xs font-mono font-medium text-slate-400 block mb-0.5">
            {bookingId}
          </span>
          <h4 className="font-heading font-bold text-base text-slate-900">
            {vehicleName}
          </h4>
        </div>
        <span
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border capitalize ${
            statusColors[status] || statusColors.pending
          }`}
        >
          {statusIcons[status] || statusIcons.pending}
          {status}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {booking.start_at || booking.start} &rarr; {booking.end_at || booking.end}
          </span>
        </div>
        {booking.pickup_location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Pickup: {booking.pickup_location}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Paid</span>
          <span className="text-sm font-extrabold text-slate-900">₹{amount}</span>
        </div>

        {status === "pending" && onCancel && (
          <button
            onClick={() => onCancel(booking.id)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition"
          >
            Cancel Trip
          </button>
        )}
      </div>
    </div>
  );
}
