import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyDeliveries } from "../../features/deliverySlice";
import AgentNavbar from "../../components/agentNavbar.jsx";
import Footer from "../../components/Footer.jsx";


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

    // --------------------------------
    // Statistics
    // --------------------------------

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

    // --------------------------------
    // Filter Deliveries
    // --------------------------------

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

    // --------------------------------
    // Helpers
    // --------------------------------

    const getStatusLabel = (status) => {
        switch (status) {
            case "pending":
                return "Pending";
            case "out_for_delivery":
                return "Out for Delivery";
            case "delivered":
                return "Delivered";
            case "return_scheduled":
                return "Return Scheduled";
            case "out_for_return":
                return "Out for Return";
            case "returned":
                return "Returned";
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
                    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
                    dot: "bg-yellow-500",
                };
            case "out_for_delivery":
                return {
                    badge: "bg-blue-50 text-blue-700 border-blue-200",
                    dot: "bg-blue-500",
                };
            case "delivered":
                return {
                    badge: "bg-green-50 text-green-700 border-green-200",
                    dot: "bg-green-500",
                };
            case "return_scheduled":
                return {
                    badge: "bg-purple-50 text-purple-700 border-purple-200",
                    dot: "bg-purple-500",
                };
            case "out_for_return":
                return {
                    badge: "bg-orange-50 text-orange-700 border-orange-200",
                    dot: "bg-orange-500",
                };
            case "returned":
                return {
                    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    dot: "bg-emerald-500",
                };
            case "cancelled":
                return {
                    badge: "bg-red-50 text-red-700 border-red-200",
                    dot: "bg-red-500",
                };
            default:
                return {
                    badge: "bg-gray-50 text-gray-700 border-gray-200",
                    dot: "bg-gray-500",
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

    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">

                <AgentNavbar />

                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-blue-400/20 blur-[90px]" />
                    <div className="absolute top-[35%] right-[20%] w-[420px] h-[420px] rounded-full bg-indigo-400/15 blur-[90px]" />
                    <div className="absolute bottom-[-150px] left-[15%] w-[500px] h-[400px] rounded-full bg-purple-400/15 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">

                    <div className="animate-pulse">

                        <div className="h-3 w-32 bg-gray-200 rounded-full mb-4" />
                        <div className="h-10 w-64 bg-gray-200 rounded-xl mb-3" />
                        <div className="h-4 w-96 bg-gray-200 rounded-full mb-12" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="h-36 bg-white border border-gray-100 rounded-3xl shadow-sm"
                                />
                            ))}
                        </div>

                        <div className="h-[500px] bg-white border border-gray-100 rounded-3xl shadow-sm" />

                    </div>
                </div>
            </div>
        );
    }

    // --------------------------------
    // Error
    // --------------------------------

    if (error) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">

                <AgentNavbar />

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-red-400/10 blur-[90px]" />
                </div>

                <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6">

                    <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl shadow-gray-200/40">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                            <span className="text-red-500 text-2xl font-bold">
                                !
                            </span>
                        </div>

                        <p className="text-xs tracking-[0.2em] text-red-400 uppercase mb-3">
                            Something went wrong
                        </p>

                        <h2 className="font-display text-3xl text-[#0b1b34]">
                            Unable to load deliveries
                        </h2>

                        <p className="text-gray-500 mt-3 leading-relaxed">
                            {error}
                        </p>

                        <button
                            onClick={() => dispatch(getMyDeliveries())}
                            className="mt-7 px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                        >
                            Try Again
                        </button>

                    </div>

                </div>
            </div>
        );
    }

    // --------------------------------
    // Main UI
    // --------------------------------

    const statCards = [
        {
            label: "Total",
            value: stats.total,
            icon: "D",
            note: "All assigned deliveries",
            valueColor: "text-[#0b1b34]",
            iconStyle: "bg-[#0b1b34] text-white",
        },
        {
            label: "Pending",
            value: stats.pending,
            icon: "P",
            note: "Waiting to start",
            valueColor: "text-yellow-600",
            iconStyle: "bg-yellow-50 text-yellow-600",
        },
        {
            label: "Active",
            value: stats.active,
            icon: "A",
            note: "Currently in progress",
            valueColor: "text-blue-600",
            iconStyle: "bg-blue-50 text-blue-600",
        },
        {
            label: "Delivered",
            value: stats.delivered,
            icon: "✓",
            note: "Successfully completed",
            valueColor: "text-green-600",
            iconStyle: "bg-green-50 text-green-600",
        },
        {
            label: "Returned",
            value: stats.returned,
            icon: "R",
            note: "Equipment returned",
            valueColor: "text-emerald-600",
            iconStyle: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">

            <AgentNavbar />

            {/* =========================================
                BACKGROUND
            ========================================= */}

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full bg-blue-400/20 blur-[80px]" />

                <div className="absolute top-[30%] right-[22%] w-[420px] h-[420px] rounded-full bg-indigo-400/15 blur-[85px]" />

                <div className="absolute top-[18%] right-[2%] w-[300px] h-[300px] rounded-full bg-pink-400/15 blur-[70px]" />

                <div className="absolute top-[45%] left-[-100px] w-[300px] h-[300px] rounded-full bg-orange-300/10 blur-[75px]" />

                <div className="absolute bottom-[-120px] right-[35%] w-[500px] h-[400px] rounded-full bg-blue-400/15 blur-[90px]" />

            </div>


            <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-20">

                {/* =========================================
                    HEADER
                ========================================= */}

                <section className="mb-12">

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                        <div>

                            <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-4">
                                RENTVERSE DELIVERY
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-[#0b1b34]">
                                Manage your
                                <br />
                                <span className="text-gray-400">
                                    deliveries.
                                </span>
                            </h1>

                            <p className="font-sans max-w-xl mt-5 text-base md:text-lg text-gray-500 leading-relaxed">
                                Manage assigned deliveries, track equipment
                                movement, and keep every rental moving smoothly.
                            </p>

                        </div>


                        {/* Active summary */}

                        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">

                            <div className="w-11 h-11 rounded-xl bg-[#0b1b34] text-white flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    {stats.active}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider">
                                    Active Deliveries
                                </p>

                                <p className="text-sm font-semibold text-[#0b1b34] mt-0.5">
                                    Currently in progress
                                </p>
                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    STATISTICS
                ========================================= */}

                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-12">

                    {statCards.map((card) => (

                        <div
                            key={card.label}
                            className="group bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                        {card.label}
                                    </p>

                                    <h2
                                        className={`font-display text-4xl mt-3 ${card.valueColor}`}
                                    >
                                        {card.value}
                                    </h2>
                                </div>

                                <div
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${card.iconStyle}`}
                                >
                                    <span className="text-sm font-semibold">
                                        {card.icon}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-7 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400">
                                    {card.note}
                                </p>
                            </div>

                        </div>

                    ))}

                </section>


                {/* =========================================
                    DELIVERIES
                ========================================= */}

                <section>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
                                DELIVERY DIRECTORY
                            </p>

                            <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                My Deliveries
                            </h2>

                        </div>

                        <p className="text-sm text-gray-400">
                            Showing{" "}
                            <span className="text-[#0b1b34] font-semibold">
                                {filteredDeliveries.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-[#0b1b34] font-semibold">
                                {deliveries.length}
                            </span>
                        </p>

                    </div>


                    {/* =========================================
                        SEARCH + FILTER BAR
                    ========================================= */}

                    <div className="bg-white/85 backdrop-blur-md border border-gray-200 rounded-3xl p-5 md:p-6 shadow-sm mb-5">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* Search */}

                            <div className="relative w-full lg:w-[360px]">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search by equipment or address..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#0b1b34]/30 focus:ring-4 focus:ring-[#0b1b34]/5 transition"
                                />

                            </div>


                            {/* Filters */}

                            <div className="flex flex-wrap items-center gap-2">

                                {[
                                    ["all", "All"],
                                    ["pending", "Pending"],
                                    ["active", "Active"],
                                    ["delivered", "Delivered"],
                                    ["returned", "Returned"],
                                ].map(([value, label]) => (

                                    <button
                                        key={value}
                                        onClick={() => setStatusFilter(value)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            statusFilter === value
                                                ? "bg-[#0b1b34] text-white shadow-sm"
                                                : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-[#0b1b34]"
                                        }`}
                                    >
                                        {label}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* =========================================
                        TABLE
                    ========================================= */}

                    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px]">

                                <thead>

                                    <tr className="border-b border-gray-100 bg-gray-50/70">

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Equipment
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Address
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Delivery Date
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Status
                                        </th>

                                        <th className="text-right px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {filteredDeliveries.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="px-6 py-20 text-center"
                                            >

                                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">

                                                    <span className="text-gray-300 text-xl">
                                                        D
                                                    </span>

                                                </div>

                                                <h3 className="font-display text-2xl text-[#0b1b34]">
                                                    {deliveries.length === 0
                                                        ? "No deliveries assigned"
                                                        : "No deliveries found"}
                                                </h3>

                                                <p className="text-sm text-gray-400 mt-2">
                                                    {deliveries.length === 0
                                                        ? "Your assigned deliveries will appear here."
                                                        : "Try changing your search or filter."}
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredDeliveries.map((delivery) => {

                                            const equipment =
                                                delivery.rental?.equipment;

                                            const statusStyle = getStatusStyle(
                                                delivery.deliveryStatus
                                            );

                                            return (
                                                <tr
                                                    key={delivery._id}
                                                    className="group hover:bg-gray-50/70 transition-colors"
                                                >

                                                    {/* Equipment */}

                                                    <td className="px-6 py-5">

                                                        <div className="flex items-center gap-3.5">

                                                            <div className="w-11 h-11 shrink-0 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm">

                                                                {equipment?.images?.[0] ? (
                                                                    <img
                                                                        src={equipment.images[0]}
                                                                        alt={
                                                                            equipment.name ||
                                                                            "Equipment"
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-lg">
                                                                        📦
                                                                    </span>
                                                                )}

                                                            </div>

                                                            <div className="min-w-0">

                                                                <p className="font-semibold text-[#0b1b34] truncate">
                                                                    {equipment?.name ||
                                                                        "Equipment"}
                                                                </p>

                                                                <p className="text-[11px] text-gray-400 mt-1">
                                                                    ID:{" "}
                                                                    {delivery._id.slice(
                                                                        -8
                                                                    )}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* Address */}

                                                    <td className="px-6 py-5">

                                                        <span className="text-sm text-gray-500 line-clamp-1 max-w-[280px]">
                                                            {delivery.deliveryAddress ||
                                                                "Not available"}
                                                        </span>

                                                    </td>


                                                    {/* Delivery Date */}

                                                    <td className="px-6 py-5">

                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(
                                                                delivery.deliveryDate
                                                            )}
                                                        </span>

                                                    </td>


                                                    {/* Status */}

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${statusStyle.badge}`}
                                                        >

                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                                                            />

                                                            {getStatusLabel(
                                                                delivery.deliveryStatus
                                                            )}

                                                        </span>

                                                    </td>


                                                    {/* Action */}

                                                    <td className="px-6 py-5 text-right">

                                                        <Link
                                                            to={`/agent/delivery/${delivery._id}`}
                                                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition shadow-sm"
                                                        >
                                                            View Details
                                                            <span>→</span>
                                                        </Link>

                                                    </td>

                                                </tr>
                                            );
                                        })
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </section>

            </main>

        

            <Footer />
</div>
    );
};

export default AgentDashboard;