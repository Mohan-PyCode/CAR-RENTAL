import { apiClient } from "./client.js";
import { bookings as mockBookings, ownerBookings as mockOwnerBookings, ownerVehicles as mockOwnerVehicles } from "../data/mock.js";

export async function createBooking(payload) {
  try {
    return await apiClient("/bookings/", {
      method: "POST",
      body: payload,
    });
  } catch (err) {
    console.warn("createBooking falling back to simulated confirmation:", err.message);
    return {
      id: Math.floor(Math.random() * 1000) + 100,
      booking_id: `BK${Date.now()}`,
      status: "pending",
      vehicle_title: payload.vehicle_title || "Reserved Vehicle",
      total_price: payload.total_price || "2760.00",
      ...payload,
    };
  }
}

export async function checkoutBooking(bookingId) {
  try {
    return await apiClient(`/bookings/${bookingId}/checkout/`, { method: "POST" });
  } catch (err) {
    return {
      id: bookingId,
      status: "pending",
      reference_id: `REF_${Date.now()}`,
      message: "Simulated Cashfree payment session initialized.",
    };
  }
}

export async function cancelBooking(bookingId) {
  return await apiClient(`/bookings/${bookingId}/cancel/`, { method: "POST" });
}

export async function getCustomerBookings() {
  try {
    const data = await apiClient("/bookings/");
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    return mockBookings;
  }
}

export async function getPreviousBookings() {
  try {
    const data = await apiClient("/bookings/previous/");
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    return mockBookings.filter(b => b.status !== "pending");
  }
}

export async function getOwnerBookings() {
  try {
    const data = await apiClient("/owner-bookings/");
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    return mockOwnerBookings;
  }
}

export async function approveBooking(id) {
  try {
    return await apiClient(`/owner-bookings/${id}/approve/`, { method: "POST" });
  } catch (err) {
    return { detail: "Booking confirmed (simulated)." };
  }
}

export async function rejectBooking(id) {
  try {
    return await apiClient(`/owner-bookings/${id}/reject/`, { method: "POST" });
  } catch (err) {
    return { detail: "Booking rejected (simulated)." };
  }
}

export async function getOwnerVehicles() {
  try {
    const data = await apiClient("/vehicles/");
    const results = Array.isArray(data) ? data : data.results || [];
    return results;
  } catch (err) {
    return mockOwnerVehicles;
  }
}

export async function addOwnerVehicle(vehicleData) {
  return await apiClient("/vehicles/", {
    method: "POST",
    body: vehicleData,
  });
}
