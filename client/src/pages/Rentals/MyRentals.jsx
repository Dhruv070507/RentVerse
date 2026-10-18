import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getMyPayments } from "../../features/paymentSlice";
import { getMyRentals, cancelRental } from "../../features/rentalSlice";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconCheck, IconClock, IconPackage, IconMapPin, IconDocument } from "../../components/Icons.jsx";

const MyRentals = () => {
    const dispatch = useDispatch();
    const [filterTab, setFilterTab] = useState("all");

    const {
        rentals = [],
        loading,
        error
    } = useSelector((state) => state.rental);

    const {
        payments = []
    } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(getMyRentals());
        dispatch(getMyPayments());
    }, [dispatch]);

    const handleCancel = (rentalId) => {
        if (window.confirm("Are you sure you want to cancel this rental request?")) {
            dispatch(cancelRental(rentalId));
        }
    };

    const activeRentals = rentals.filter((r) => r.status === "approved");
    const pendingRequests = rentals.filter((r) => r.status === "pending");
    const completedRentals = rentals.filter(
        (r) =>
            r.status === "completed" ||
            r.status === "cancelled" ||
            r.status === "rejected"
    );

    const displayedRentals = rentals.filter((r) => {
        if (filterTab === "active") return r.status === "approved";
        if (filterTab === "pending") return r.status === "pending";
        if (filterTab === "history") {
            return (
                r.status === "completed" ||
                r.status === "cancelled" ||
                r.status === "rejected"
            );
        }
        return true;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return "bg-blue-50 text-blue-700 border-blue-200/60";
            case "pending":
                return "bg-slate-100 text-slate-800 border-slate-200/60";
            case "completed":
                return "bg-slate-900 text-white border-slate-800";
            case "cancelled":
            case "rejected":
                return "bg-slate-100 text-slate-600 border-slate-200/60";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading your rentals...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 border-b border-slate-800 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-4">
                        Renter Dashboard
                    </span>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                        My Rental Bookings
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                        Monitor approval status, manage payments, track rental periods, and review your rental history with full transparency.
                    </p>
                </div>
            </section>

            {/* Summary KPI Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 mb-8 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                                Active Rentals
                            </span>
                            <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">
                                {activeRentals.length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                            <IconCheck className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                                Pending Requests
                            </span>
                            <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">
                                {pendingRequests.length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                            <IconClock className="w-5 h-5 text-slate-600" />
                        </div>
                    </div>

                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                                Completed / Closed
                            </span>
                            <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">
                                {completedRentals.length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                            <IconPackage className="w-5 h-5 text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Rentals Section */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-36 w-full">
                {/* Filter Tabs */}
                <div className="flex items-center gap-3 mb-10 border-b border-slate-200 pb-5 overflow-x-auto">
                    {[
                        { key: "all", label: `All Rentals (${rentals.length})` },
                        { key: "active", label: `Active (${activeRentals.length})` },
                        { key: "pending", label: `Pending (${pendingRequests.length})` },
                        { key: "history", label: `History (${completedRentals.length})` }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilterTab(tab.key)}
                            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                                filterTab === tab.key
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold">
                        {error}
                    </div>
                )}

                {displayedRentals.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-16 sm:p-20 text-center max-w-lg mx-auto shadow-sm my-8">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4">
                            <IconDocument className="w-7 h-7" />
                        </div>
                        <h3 className="font-display font-bold text-xl text-slate-900">
                            No bookings found
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                            You have no rental bookings in this view right now. Explore the marketplace to reserve gear for your upcoming projects.
                        </p>
                        <Link
                            to="/equipments"
                            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors inline-block cursor-pointer shadow-sm"
                        >
                            Explore Equipment Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {displayedRentals.map((rental) => {
                            const payment = payments?.find(
                                (p) =>
                                    p.rental?._id === rental._id ||
                                    p.rental === rental._id
                            );

                            return (
                                <div
                                    key={rental._id}
                                    className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12"
                                >
                                    {/* Left: Info */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadge(
                                                    rental.status
                                                )}`}
                                            >
                                                {rental.status}
                                            </span>

                                            {payment?.paymentStatus === "completed" ? (
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                                    Payment Pending
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                            {rental.equipment?.name || "Equipment"}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                                             <span>
                                                 Owner:{" "}
                                                 <span className="font-semibold text-slate-700">
                                                     @{rental.owner?.username || "owner"}
                                                 </span>
                                             </span>
                                             {rental.address && (
                                                 <span className="inline-flex items-center gap-1.5 text-slate-600">
                                                     <IconMapPin className="w-3.5 h-3.5 text-slate-400" />
                                                     <span>Delivery: {rental.address}</span>
                                                 </span>
                                             )}
                                         </p>
                                     </div>

                                     {/* Middle: Dates & Price */}
                                     <div className="flex items-center gap-8 sm:gap-12 border-t sm:border-t-0 sm:border-l border-slate-100 pt-5 sm:pt-0 sm:pl-10">
                                         <div>
                                             <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                                 Rental Period
                                             </span>
                                             <p className="text-sm font-semibold text-slate-800 mt-1">
                                                 {new Date(rental.rentalStartDate).toLocaleDateString()}
                                             </p>
                                             <p className="text-xs text-slate-400 mt-0.5">
                                                 to {new Date(rental.rentalEndDate).toLocaleDateString()}
                                             </p>
                                         </div>

                                         <div>
                                             <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                                 Total Cost
                                             </span>
                                             <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                                                 ₹{rental.totalPrice}
                                             </p>
                                             <p className="text-xs text-slate-400 font-medium mt-0.5">
                                                 Qty: {rental.quantity}
                                             </p>
                                         </div>
                                     </div>

                                     {/* Right: Actions */}
                                     <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 justify-end flex-wrap">
                                         {rental.status === "pending" && (
                                             <button
                                                 onClick={() => handleCancel(rental._id)}
                                                 className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                             >
                                                 Cancel Request
                                             </button>
                                         )}

                                         {rental.status === "approved" && payment?.paymentStatus !== "completed" && (
                                             <Link
                                                 to={`/payment/${rental._id}`}
                                                 className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                                             >
                                                 Pay ₹{rental.totalPrice} Now
                                             </Link>
                                         )}

                                         {rental.equipment?._id && (
                                             <Link
                                                 to={`/equipment/${rental.equipment._id}`}
                                                 className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors"
                                             >
                                                 View Item
                                             </Link>
                                         )}
                                     </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyRentals;