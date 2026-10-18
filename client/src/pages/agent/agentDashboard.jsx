import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyDeliveries } from "../../features/deliverySlice";
import AgentNavbar from "../../components/agentNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconPackage, IconSearch, IconAlert } from "../../components/Icons.jsx";

const ACTIVE_STATUSES = ["out_for_delivery", "out_for_return"];

const AgentDashboard = () => {
    const dispatch = useDispatch();

    const { deliveries, loading, error } = useSelector(
        (state) => state.delivery
    );

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        dispatch(getMyDeliveries());
    }, [dispatch]);

    const stats = useMemo(() => {
        return {
            total: deliveries.length,
            pending: deliveries.filter(
                (d) => d.deliveryStatus === "pending"
            ).length,
            active: deliveries.filter((d) =>
                ACTIVE_STATUSES.includes(d.deliveryStatus)
            ).length,
            delivered: deliveries.filter(
                (d) => d.deliveryStatus === "delivered"
            ).length,
            returned: deliveries.filter(
                (d) => d.deliveryStatus === "returned"
            ).length,
        };
    }, [deliveries]);

    const filteredDeliveries = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return deliveries.filter((delivery) => {
            const matchesSearch =
                delivery.rental?.equipment?.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                delivery.deliveryAddress
                    ?.toLowerCase()
                    .includes(searchValue) ||
                delivery._id?.toLowerCase().includes(searchValue);

            let matchesStatus = true;

            if (statusFilter === "active") {
                matchesStatus = ACTIVE_STATUSES.includes(
                    delivery.deliveryStatus
                );
            } else if (statusFilter !== "all") {
                matchesStatus = delivery.deliveryStatus === statusFilter;
            }

            return matchesSearch && matchesStatus;
        });
    }, [deliveries, search, statusFilter]);

    const getStatusLabel = (status) => {
        switch (status) {
            case "pending":
                return "Pending Dispatch";
            case "out_for_delivery":
                return "Out for Delivery";
            case "delivered":
                return "Delivered to Customer";
            case "return_scheduled":
                return "Return Scheduled";
            case "out_for_return":
                return "Out for Return";
            case "returned":
                return "Returned to Owner";
            case "cancelled":
                return "Cancelled";
            default:
                return status;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return {
                    badge: "bg-slate-100 text-slate-800 border-slate-200",
                    dot: "bg-slate-500",
                };
            case "out_for_delivery":
                return {
                    badge: "bg-blue-50 text-blue-700 border-blue-200",
                    dot: "bg-blue-500",
                };
            case "delivered":
                return {
                    badge: "bg-blue-50 text-blue-700 border-blue-200",
                    dot: "bg-blue-500",
                };
            case "return_scheduled":
                return {
                    badge: "bg-slate-100 text-slate-700 border-slate-200",
                    dot: "bg-slate-500",
                };
            case "out_for_return":
                return {
                    badge: "bg-blue-50 text-blue-700 border-blue-200",
                    dot: "bg-blue-500",
                };
            case "returned":
                return {
                    badge: "bg-slate-900 text-white border-slate-800",
                    dot: "bg-slate-300",
                };
            case "cancelled":
                return {
                    badge: "bg-slate-100 text-slate-700 border-slate-200",
                    dot: "bg-slate-400",
                };
            default:
                return {
                    badge: "bg-slate-50 text-slate-700 border-slate-200",
                    dot: "bg-slate-500",
                };
        }
    };

    const formatDate = (date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (loading && deliveries.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50">
                <AgentNavbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 animate-pulse">
                    <div className="h-4 w-32 bg-slate-200 rounded-full mb-4" />
                    <div className="h-10 w-72 bg-slate-200 rounded-2xl mb-4" />
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-28 bg-white border border-slate-200 rounded-3xl" />
                        ))}
                    </div>
                    <div className="h-96 bg-white border border-slate-200 rounded-3xl" />
                </main>
            </div>
        );
    }

    if (error && deliveries.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50">
                <AgentNavbar />
                <main className="min-h-[70vh] flex items-center justify-center px-6">
                    <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                            <IconAlert className="w-6 h-6" />
                        </div>
                        <h2 className="font-display font-bold text-2xl text-slate-900">
                            Unable to load tasks
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                            {error}
                        </p>
                        <button
                            onClick={() => dispatch(getMyDeliveries())}
                            className="mt-6 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AgentNavbar />

            {/* Hero Header */}
            <section className="bg-slate-900 border-b border-slate-800 text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-3">
                                Agent Dispatch Console
                            </span>
                            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                                Delivery Workflow
                            </h1>
                            <p className="max-w-xl mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                                Manage pickup requests, fulfill customer handoffs with OTP verification, and process return drop-offs.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700 p-4 sm:p-5 rounded-2xl self-start lg:self-auto">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                                {stats.active}
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                    Active Dispatches
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                                    Currently in transit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 relative z-20 pb-16">
                {/* Statistics Cards */}
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Assigned</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.total}</p>
                        <p className="text-xs text-slate-500 mt-1">All history</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pending</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.pending}</p>
                        <p className="text-xs text-slate-500 mt-1">Ready to start</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Active</p>
                        <p className="font-display font-black text-3xl text-blue-600 mt-2">{stats.active}</p>
                        <p className="text-xs text-slate-500 mt-1">In progress</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Delivered</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.delivered}</p>
                        <p className="text-xs text-slate-500 mt-1">Fulfillment done</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Returned</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.returned}</p>
                        <p className="text-xs text-slate-500 mt-1">Return completed</p>
                    </div>
                </section>

                {/* Deliveries Directory */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Filter Bar */}
                    <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4">
                        <div className="w-full lg:w-96 relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                <IconSearch className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by equipment, address, or ID..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition font-medium"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                            {[
                                ["all", "All"],
                                ["pending", "Pending"],
                                ["active", "In Progress"],
                                ["delivered", "Delivered"],
                                ["returned", "Returned"],
                            ].map(([val, label]) => (
                                <button
                                    key={val}
                                    onClick={() => setStatusFilter(val)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                        statusFilter === val
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table Column Labels */}
                    <div className="hidden lg:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Equipment</span>
                        <span>Delivery Address</span>
                        <span>Delivery Date</span>
                        <span>Status</span>
                        <span className="text-right">Action</span>
                    </div>

                    {/* Rows */}
                    {filteredDeliveries.length === 0 ? (
                        <div className="py-16 text-center">
                            <IconPackage className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <h3 className="font-display font-bold text-lg text-slate-900">
                                {deliveries.length === 0
                                    ? "No deliveries assigned yet"
                                    : "No matching deliveries"}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                {deliveries.length === 0
                                    ? "Your assigned tasks from the administrator will appear here."
                                    : "Try adjusting your search query or status filter."}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filteredDeliveries.map((delivery) => {
                                const equipment = delivery.rental?.equipment;
                                const statusStyle = getStatusStyle(delivery.deliveryStatus);

                                return (
                                    <div
                                        key={delivery._id}
                                        className="px-6 py-5 hover:bg-slate-50/70 transition-colors grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] gap-4 lg:items-center"
                                    >
                                        {/* Equipment */}
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                                                {equipment?.images?.[0] ? (
                                                    <img
                                                        src={equipment.images[0]}
                                                        alt={equipment.name || "Equipment"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <IconPackage className="w-5 h-5 text-slate-400" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-sm text-slate-900 truncate">
                                                    {equipment?.name || "Equipment"}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    ID: {delivery._id.slice(-8)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 lg:hidden">Address</p>
                                            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                                                {delivery.deliveryAddress || "Not specified"}
                                            </p>
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 lg:hidden">Date</p>
                                            <p className="text-xs sm:text-sm font-medium text-slate-700">
                                                {formatDate(delivery.deliveryDate)}
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 lg:hidden">Status</p>
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.badge}`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                                                {getStatusLabel(delivery.deliveryStatus)}
                                            </span>
                                        </div>

                                        {/* Action */}
                                        <div className="lg:text-right">
                                            <Link
                                                to={`/agent/delivery/${delivery._id}`}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                                            >
                                                <span>Fulfill Order</span>
                                                <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AgentDashboard;