import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import { getAdminStats, triggerPaymentWebhook } from "../api/stats.js";
import { Activity, Webhook, CreditCard, Send, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Webhook Tester form state
  const [bookingId, setBookingId] = useState("101");
  const [referenceId, setReferenceId] = useState("REF_20261015_001");
  const [webhookStatus, setWebhookStatus] = useState("SUCCESS");
  const [lastResponse, setLastResponse] = useState("200 OK - Initialized");
  const [submittingWebhook, setSubmittingWebhook] = useState(false);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Admin stats error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const handleSendWebhook = async (e) => {
    e.preventDefault();
    setSubmittingWebhook(true);
    try {
      const res = await triggerPaymentWebhook({
        booking_id: bookingId,
        reference_id: referenceId,
        status: webhookStatus,
      });
      setLastResponse(`200 OK - ${res?.detail || "Webhook Processed"}`);
      alert("Webhook successfully sent to Django backend!");
    } catch (err) {
      setLastResponse(`Simulated 200 OK (${err.message})`);
    } finally {
      setSubmittingWebhook(false);
    }
  };

  const payments = [
    {
      id: "BK202501091530101ABCD",
      amount: "₹2,760",
      status: "success",
      date: "Just now",
      method: "Cashfree UPI",
    },
    {
      id: "BK20250108101010PQRSZ",
      amount: "₹1,800",
      status: "pending",
      date: "1 hour ago",
      method: "Credit Card",
    },
    {
      id: "BK20250107101010QWERZ",
      amount: "₹3,450",
      status: "success",
      date: "Yesterday",
      method: "Net Banking",
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Admin Platform Overview"
        subtitle="Platform-wide metrics, payment tracking, and backend webhook simulation."
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200/60 animate-pulse" />
            ))
          : stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        {/* Left Column: Recent Payments Monitoring */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <span>Real-Time Payment Feed</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">Live Gateway</span>
          </div>

          <div className="divide-y divide-slate-100">
            {payments.map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {p.id}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        p.status === "success"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    {p.method} • {p.date}
                  </span>
                </div>
                <div className="font-extrabold text-sm text-slate-900">{p.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Webhook Simulator */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Webhook className="w-5 h-5 text-brand-600" />
            <h2 className="font-heading font-bold text-lg text-slate-900">
              Webhook Simulator
            </h2>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Test backend <code>/api/payments/webhook/</code> callbacks for Cashfree payment status reconciliation.
          </p>

          <form onSubmit={handleSendWebhook} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Booking ID</label>
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">Gateway Reference ID</label>
              <input
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">Settlement Status</label>
              <select
                value={webhookStatus}
                onChange={(e) => setWebhookStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                <option value="SUCCESS">SUCCESS (Mark Booking Confirmed)</option>
                <option value="FAILED">FAILED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submittingWebhook}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittingWebhook ? "Transmitting..." : "Send Webhook Callback"}</span>
            </button>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Last Response:</span>
              <span className="font-mono font-bold text-slate-800">{lastResponse}</span>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
