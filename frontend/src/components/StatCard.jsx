import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatCard({ label, value, trend = "+4.5%" }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between text-slate-500 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
        {value}
      </div>
    </div>
  );
}
