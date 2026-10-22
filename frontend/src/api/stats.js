import { apiClient } from "./client.js";
import { adminStats as mockAdminStats } from "../data/mock.js";

export async function getAdminStats() {
  try {
    const data = await apiClient("/admin/stats/");
    return [
      { label: "Active Vehicles", value: String(data.vehicles ?? 128) },
      { label: "Bookings", value: String(data.bookings ?? 342) },
      { label: "Active Owners", value: String(data.active_owners ?? 58) },
      { label: "Active Customers", value: String(data.active_customers ?? "1,204") },
    ];
  } catch (err) {
    return mockAdminStats;
  }
}

export async function triggerPaymentWebhook(payload) {
  return await apiClient("/payments/webhook/", {
    method: "POST",
    body: payload,
  });
}
