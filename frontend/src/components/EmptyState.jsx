import React from "react";
import { AlertCircle } from "lucide-react";

export default function EmptyState({ title = "No items found", description, action }) {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-heading font-bold text-base text-slate-800">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
