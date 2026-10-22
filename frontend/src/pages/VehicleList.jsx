import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getVehicles, getFilterOptions } from "../api/vehicles.js";
import { SlidersHorizontal, RotateCcw, Search, Car } from "lucide-react";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMeta, setFilterMeta] = useState(null);

  // Filter State
  const [search, setSearch] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [seatsMin, setSeatsMin] = useState("");
  const [seatsMax, setSeatsMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Load initial filter meta from /api/filters/
  useEffect(() => {
    async function loadMeta() {
      const meta = await getFilterOptions();
      setFilterMeta(meta);
    }
    loadMeta();
  }, []);

  // Fetch vehicles with applied parameters
  const fetchCarList = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (pickupLocation) params.pickup_location = pickupLocation;
      if (startAt) params.start_at = startAt;
      if (endAt) params.end_at = endAt;
      if (availableOnly) params.available_only = "true";
      if (selectedTypes.length > 0) params.vehicle_type = selectedTypes.join(",");
      if (selectedTransmissions.length > 0) params.transmission = selectedTransmissions.join(",");
      if (seatsMin) params.seats_min = seatsMin;
      if (seatsMax) params.seats_max = seatsMax;
      if (priceMin) params.price_min = priceMin;
      if (priceMax) params.price_max = priceMax;
      if (sortBy) params.sort = sortBy;

      const data = await getVehicles(params);
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarList();
  }, [sortBy]);

  const handleApplyFilters = (e) => {
    e?.preventDefault();
    fetchCarList();
  };

  const handleResetFilters = () => {
    setSearch("");
    setPickupLocation("");
    setStartAt("");
    setEndAt("");
    setAvailableOnly(false);
    setSelectedTypes([]);
    setSelectedTransmissions([]);
    setSeatsMin("");
    setSeatsMax("");
    setPriceMin("");
    setPriceMax("");
    setSortBy("");
    setTimeout(() => {
      fetchCarList();
    }, 0);
  };

  const toggleType = (type) => {
    const lower = type.toLowerCase();
    setSelectedTypes((prev) =>
      prev.includes(lower) ? prev.filter((t) => t !== lower) : [...prev, lower]
    );
  };

  const toggleTransmission = (trans) => {
    setSelectedTransmissions((prev) =>
      prev.includes(trans) ? prev.filter((t) => t !== trans) : [...prev, trans]
    );
  };

  const vehicleTypes = filterMeta?.vehicle_types || [
    "Sedan",
    "SUV",
    "Hatchback",
    "Coupe",
    "Pickup",
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Browse cars"
        subtitle="Compare availability, price, and pickup options."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-heading font-bold text-base text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filters</span>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <form onSubmit={handleApplyFilters} className="space-y-5 divide-y divide-slate-100 mt-4 text-sm">
            {/* Search inputs */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Model, make, or city"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Date & Time */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Schedule
              </label>
              <div className="space-y-1.5">
                <input
                  type="datetime-local"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                />
                <input
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                />
              </div>
              <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                Show only available
              </label>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Vehicle Type
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {vehicleTypes.map((type) => {
                  const val = typeof type === "string" ? type : type[0];
                  const label = typeof type === "string" ? type : type[1];
                  const isChecked = selectedTypes.includes(val.toLowerCase());
                  return (
                    <label
                      key={val}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleType(val)}
                        className="rounded text-brand-600 focus:ring-brand-500"
                      />
                      <span className="capitalize">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Transmission */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Transmission
              </label>
              <div className="flex gap-4">
                {["Automatic", "Manual"].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTransmissions.includes(t)}
                      onChange={() => toggleTransmission(t)}
                      className="rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Seats */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Seats
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={seatsMin}
                  onChange={(e) => setSeatsMin(e.target.value)}
                  className="w-1/2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={seatsMax}
                  onChange={(e) => setSeatsMax(e.target.value)}
                  className="w-1/2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hourly Rate
                </label>
                <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  INR {priceMin || 200} - {priceMax || 600}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="pt-4 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
              >
                Clear All
              </button>
            </div>
          </form>
        </aside>

        {/* Cars List View */}
        <section className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
            <div className="text-sm font-bold text-slate-700">
              <span className="text-brand-600 font-extrabold text-base">{vehicles.length}</span>{" "}
              {vehicles.length === 1 ? "car" : "cars"} available
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Featured</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Fleet</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-200/60 animate-pulse" />
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <EmptyState
              title="No cars match your filters"
              description="Try adjusting your schedule, lowering the price threshold, or clearing the filter options."
              action={
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 text-white"
                >
                  Reset all filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
