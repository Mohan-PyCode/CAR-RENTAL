import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto my-16 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
          Page Not Found (404)
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The requested page route could not be found or has moved.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
