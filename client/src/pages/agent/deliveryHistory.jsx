import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyDeliveries } from "../../features/deliverySlice";
import Footer from "../../components/Footer.jsx";
import AgentNavbar from "../../components/agentNavbar.jsx";
import { IconAlert, IconDocument, IconPackage } from "../../components/Icons.jsx";

const DeliveryHistory = () => {
    const dispatch = useDispatch();

    const {
        deliveries,
        loading,
        error,
    } = useSelector((state) => state.delivery);

    const [filter, setFilter] = useState("all");

    useEffect(() => {
        dispatch(getMyDeliveries());
    }, [dispatch]);

    const history = useMemo(() => {
        return deliveries.filter((delivery) => {
            const status = delivery.deliveryStatus;
            return (
                status === "delivered" ||
                status === "returned" ||
                status === "cancelled"
            );
        });
    }, [deliveries]);

    const filteredDeliveries = useMemo(() => {
        if (filter === "all") {
            return history;
        }

        return history.filter(
            (delivery) => delivery.deliveryStatus === filter
        );
    }, [history, filter]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "delivered":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "returned":
                return "bg-slate-900 text-white border-slate-800";
            case "cancelled":
                return "bg-slate-100 text-slate-600 border-slate-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "delivered":
                return "Delivered";
            case "returned":
                return "Returned";
            case "cancelled":
                return "Cancelled";
            default:
                return status;
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

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AgentNavbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        to="/agent/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0b1b34] transition"
                    >
                        <span>←</span> Back to Active Deliveries
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                            Fulfilled Records
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0b1b34] tracking-tight">
                            Delivery History
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Review completed customer deliveries, equipment returns, and canceled dispatches.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm self-start sm:self-auto">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-700">
                            {history.length} Completed Tasks
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium flex items-center gap-2">
                        <IconAlert className="w-4 h-4 text-slate-600 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {[
                        ["all", "All Completed"],
                        ["delivered", "Delivered to Customer"],
                        ["returned", "Returned to Owner"],
                        ["cancelled", "Cancelled Orders"],
                    ].map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setFilter(val)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                filter === val
                                    ? "bg-[#0b1b34] text-white shadow-sm"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* History List */}
                <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                        <h2 className="font-display font-bold text-sm text-[#0b1b34]">
                            Dispatches Ledger
                        </h2>
                        <span className="text-xs text-slate-400 font-medium">
                            {filteredDeliveries.length} records shown
                        </span>
                    </div>

                    {loading && (
                        <div className="py-16 text-center text-xs text-slate-500">
                            Loading delivery history...
                        </div>
                    )}

                    {!loading && filteredDeliveries.length === 0 && (
                        <div className="py-16 text-center">
                            <IconDocument className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <h3 className="font-display font-bold text-lg text-slate-900">
                                No delivery history found
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                Completed deliveries and returns will be archived here.
                            </p>
                        </div>
                    )}

                    {!loading && filteredDeliveries.length > 0 && (
                        <div className="divide-y divide-slate-100">
                            {filteredDeliveries.map((delivery) => {
                                const equipment = delivery.rental?.equipment;

                                return (
                                    <div
                                        key={delivery._id}
                                        className="p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                                                {equipment?.images?.[0] ? (
                                                    <img
                                                        src={equipment.images[0]}
                                                        alt={equipment.name || "Equipment"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <IconPackage className="w-6 h-6 text-slate-400" />
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-display font-bold text-base text-slate-900 truncate">
                                                    {equipment?.name || "Equipment"}
                                                </h3>

                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Rental Period:{" "}
                                                    <span className="font-medium text-slate-700">
                                                        {formatDate(delivery.rental?.rentalStartDate)} → {formatDate(delivery.rental?.rentalEndDate)}
                                                    </span>
                                                </p>

                                                <p className="text-[11px] text-slate-400 mt-0.5">
                                                    Fulfillment ID: {delivery._id}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0 self-start md:self-auto">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(
                                                    delivery.deliveryStatus
                                                )}`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {getStatusLabel(delivery.deliveryStatus)}
                                            </span>

                                            <Link
                                                to={`/agent/delivery/${delivery._id}`}
                                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                                            >
                                                View Summary →
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

export default DeliveryHistory;