import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, Settings2, Star, ArrowRight } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const isBooked = vehicle.is_booked ?? vehicle.isBooked;
  const imageSrc = vehicle.images?.[0] || "/vehicle-placeholder.svg";
  const vehicleType = vehicle.vehicle_type || vehicle.type || "Sedan";
  const hourlyRate = vehicle.hourly_rate ?? vehicle.hourlyRate ?? 300;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition duration-200">
      {/* Vehicle Media Header */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={vehicle.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.currentTarget.src = "/vehicle-placeholder.svg";
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md ${
              isBooked
                ? "bg-red-500/90 text-white"
                : "bg-emerald-500/90 text-white"
            }`}
          >
            {isBooked ? "Booked" : "Available"}
          </span>
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-900/80 text-white backdrop-blur-md capitalize">
            {vehicleType}
          </span>
        </div>

        {vehicle.rating && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{vehicle.rating}</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-slate-900 tracking-tight group-hover:text-brand-600 transition">
            <Link to={`/vehicles/${vehicle.id}`}>{vehicle.title}</Link>
          </h3>

          <div className="mt-2 text-xs text-slate-500 space-y-1">
            <p className="flex items-center gap-1 text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{vehicle.location}</span>
            </p>
            <div className="flex items-center gap-3 pt-1 text-slate-500">
              <span className="flex items-center gap-1">
                <Settings2 className="w-3.5 h-3.5 text-slate-400" />
                {vehicle.transmission}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {vehicle.seats} seats
              </span>
            </div>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
              Starting from
            </span>
            <div className="text-base font-extrabold text-slate-900">
              ₹{hourlyRate}
              <span className="text-xs font-medium text-slate-500">/hr</span>
            </div>
          </div>

          <Link
            to={`/vehicles/${vehicle.id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-brand-600 transition shadow-sm group-hover:bg-brand-600"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
