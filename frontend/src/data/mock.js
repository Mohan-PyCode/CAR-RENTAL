export const vehicles = [
  {
    id: 1,
    title: "Urban Glide Sedan",
    location: "Mumbai, Bandra",
    pickupLocation: "Bandra Station",
    type: "sedan",
    transmission: "Automatic",
    seats: 5,
    hourlyRate: 320,
    dailyRate: 2200,
    weeklyRate: 11800,
    rating: 4.7,
    isBooked: true,
    images: ["/vehicle-placeholder.svg", "/vehicle-placeholder.svg"],
  },
  {
    id: 2,
    title: "Trailcrest SUV",
    location: "Pune, KP",
    pickupLocation: "Koregaon Park",
    type: "suv",
    transmission: "Manual",
    seats: 7,
    hourlyRate: 450,
    dailyRate: 3000,
    weeklyRate: 16500,
    rating: 4.5,
    isBooked: false,
    images: ["/vehicle-placeholder.svg", "/vehicle-placeholder.svg"],
  },
  {
    id: 3,
    title: "Cityline Hatch",
    location: "Delhi, Hauz Khas",
    pickupLocation: "Hauz Khas Metro",
    type: "hatchback",
    transmission: "Automatic",
    seats: 4,
    hourlyRate: 240,
    dailyRate: 1600,
    weeklyRate: 8900,
    rating: 4.3,
    isBooked: false,
    images: ["/vehicle-placeholder.svg"],
  },
];

export const reviews = [
  { id: 1, name: "Priya", rating: 5, comment: "Smooth pickup and great mileage." },
  { id: 2, name: "Arjun", rating: 4, comment: "Clean interiors, on-time delivery." },
  { id: 3, name: "Neha", rating: 5, comment: "Loved the host support and pricing." },
];

export const bookings = [
  {
    id: 101,
    bookingId: "BK202501091530101ABCD",
    vehicle: "Urban Glide Sedan",
    status: "confirmed",
    start: "2025-01-15 10:00",
    end: "2025-01-15 18:00",
    amount: 2560,
  },
  {
    id: 102,
    bookingId: "BK20250108101010PQRSZ",
    vehicle: "Trailcrest SUV",
    status: "cancelled",
    start: "2025-01-08 09:00",
    end: "2025-01-08 14:00",
    amount: 1800,
  },
];

export const ownerVehicles = [
  {
    id: 201,
    title: "Urban Glide Sedan",
    status: "active",
    nextBooking: "2025-01-15 10:00",
    revenue: 14250,
  },
  {
    id: 202,
    title: "Trailcrest SUV",
    status: "active",
    nextBooking: "2025-01-16 08:00",
    revenue: 18640,
  },
];

export const ownerBookings = [
  {
    id: 301,
    bookingId: "BK20250107101010QWERZ",
    customer: "Nikhil",
    vehicle: "Urban Glide Sedan",
    slot: "Jan 10, 10:00 - 18:00",
    status: "pending",
  },
  {
    id: 302,
    bookingId: "BK20250105101010LMNOP",
    customer: "Aditi",
    vehicle: "Trailcrest SUV",
    slot: "Jan 12, 09:00 - 17:00",
    status: "confirmed",
  },
];

export const adminStats = [
  { label: "Active Vehicles", value: "128" },
  { label: "Bookings This Week", value: "342" },
  { label: "Owners", value: "58" },
  { label: "Customers", value: "1,204" },
];
