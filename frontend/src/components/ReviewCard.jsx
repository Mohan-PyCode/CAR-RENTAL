import React from "react";
import { Star, UserCircle2 } from "lucide-react";

export default function ReviewCard({ review }) {
  const rating = review.rating || 5;
  const reviewer = review.reviewer || review.name || "Verified Renter";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UserCircle2 className="w-6 h-6 text-slate-400" />
            <span className="font-bold text-sm text-slate-900">{reviewer}</span>
          </div>
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
      </div>

      {review.created_at && (
        <span className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 block">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}
