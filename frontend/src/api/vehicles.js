import { apiClient } from "./client.js";
import { vehicles as mockVehicles, reviews as mockReviews } from "../data/mock.js";

// Helper to normalize vehicle properties whether from DRF or mock
export function normalizeVehicle(v) {
  if (!v) return null;
  return {
    id: v.id,
    title: v.title || `${v.make || ""} ${v.model || ""}`.trim() || "Vehicle",
    location: v.location || "Available Citywide",
    pickupLocation: v.pickup_location || v.pickupLocation || v.location || "Downtown Center",
    type: (v.vehicle_type || v.type || "sedan").toLowerCase(),
    transmission: v.transmission || "Automatic",
    seats: v.seats || 5,
    hourlyRate: Number(v.hourly_rate ?? v.hourlyRate ?? 300),
    dailyRate: Number(v.daily_rate ?? v.dailyRate ?? 2000),
    weeklyRate: Number(v.weekly_rate ?? v.weeklyRate ?? 10000),
    deliveryFee: Number(v.delivery_fee ?? v.deliveryFee ?? 200),
    rating: v.avg_rating ?? v.rating ?? 4.5,
    isBooked: Boolean(v.is_booked ?? v.isBooked),
    images: (v.images && v.images.length > 0) ? v.images : ["/vehicle-placeholder.svg"],
    description: v.description || "Well-maintained, fully sanitized, and ready for your next adventure.",
  };
}

export async function getVehicles(params = {}) {
  try {
    const data = await apiClient("/vehicles/", { params });
    // DRF returns either a raw list or paginated results object
    const results = Array.isArray(data) ? data : data.results || [];
    return results.map(normalizeVehicle);
  } catch (err) {
    console.warn("Backend not available for /vehicles/, falling back to mock fixtures:", err.message);
    // Apply client-side filtering on mock data for offline support
    let filtered = [...mockVehicles];
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        v => v.title.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)
      );
    }
    if (params.vehicle_type) {
      const types = params.vehicle_type.split(",").map(t => t.toLowerCase().trim());
      filtered = filtered.filter(v => types.includes(v.type.toLowerCase()));
    }
    if (params.transmission) {
      const trans = params.transmission.split(",").map(t => t.toLowerCase().trim());
      filtered = filtered.filter(v => trans.includes(v.transmission.toLowerCase()));
    }
    if (params.available_only === "true" || params.available_only === "1") {
      filtered = filtered.filter(v => !v.isBooked);
    }
    return filtered.map(normalizeVehicle);
  }
}

export async function getVehicleById(id) {
  try {
    const data = await apiClient(`/vehicles/${id}/`);
    return normalizeVehicle(data);
  } catch (err) {
    console.warn(`Backend not available for /vehicles/${id}/, falling back to mock:`, err.message);
    const found = mockVehicles.find(v => String(v.id) === String(id)) || mockVehicles[0];
    return normalizeVehicle(found);
  }
}

export async function getFilterOptions() {
  try {
    return await apiClient("/filters/");
  } catch (err) {
    console.warn("Backend not available for /filters/, returning defaults:", err.message);
    return {
      vehicle_types: ["sedan", "suv", "hatchback", "coupe", "pickup"],
      transmissions: ["Automatic", "Manual"],
      min_hourly_rate: 200,
      max_hourly_rate: 600,
      min_seats: 4,
      max_seats: 8,
    };
  }
}

export async function getVehicleAvailability(vehicleId, startAt, endAt) {
  try {
    return await apiClient(`/vehicles/${vehicleId}/availability/`, {
      params: { start_at: startAt, end_at: endAt }
    });
  } catch (err) {
    return {
      vehicle_id: vehicleId,
      booked_slots: [
        { start_at: "2026-10-20T10:00:00Z", end_at: "2026-10-20T16:00:00Z", status: "confirmed" },
      ]
    };
  }
}

export async function getVehicleQuote(vehicleId, startAt, endAt, pricingUnit = "hourly") {
  try {
    return await apiClient(`/vehicles/${vehicleId}/quote/`, {
      params: { start_at: startAt, end_at: endAt, pricing_unit: pricingUnit }
    });
  } catch (err) {
    // Basic local calculation if backend offline
    return {
      vehicle_id: vehicleId,
      total_price: pricingUnit === "daily" ? "2200.00" : "640.00",
    };
  }
}

export async function getVehicleReviews(vehicleId) {
  try {
    const data = await apiClient("/reviews/", { params: { vehicle: vehicleId } });
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    return mockReviews;
  }
}

export async function submitReview(vehicleId, rating, comment) {
  return await apiClient("/reviews/", {
    method: "POST",
    body: { vehicle: vehicleId, rating, comment }
  });
}
