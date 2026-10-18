import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRentals } from "../../features/adminSlice";
import Footer from "../../components/Footer.jsx";
import AdminNavbar from "../../components/adminNavbar.jsx";
import { IconAlert, IconDocument, IconSearch } from "../../components/Icons.jsx";

const statusStyles = {
    pending: {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-800",
        dot: "bg-slate-400",
    },
    approved: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        dot: "bg-blue-500",
    },
    rejected: {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-600",
        dot: "bg-slate-400",
    },
    cancelled: {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-600",
        dot: "bg-slate-400",
    },
    completed: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        dot: "bg-blue-500",
    },
};

const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (date) => {
    if (!date) return "—";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }
    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const getEquipmentName = (rental) => {
    if (!rental?.equipment) return "Equipment";
    if (typeof rental.equipment === "string") {
        return rental.equipment;
    }
    return (
        rental.equipment.name ||
        rental.equipment.title ||
        rental.equipment.equipmentName ||
        "Equipment"
    );
};

const getRenterName = (rental) => {
    const renter = rental?.renter || rental?.user || rental?.customer;
    if (!renter) return "Unknown customer";
    if (typeof renter === "string") {
        return renter;
    }
    return (
        renter.name ||
        renter.fullName ||
        renter.username ||
        `${renter.firstName || ""} ${renter.lastName || ""}`.trim() ||
        renter.email ||
        "Unknown user"
    );
};

const getRenterEmail = (rental) => {
    const renter = rental?.renter || rental?.user || rental?.customer;
    if (!renter || typeof renter === "string") {
        return "";
    }
    return renter.email || "";
};

const RentalRow = ({ rental, onView }) => {
    const status = String(rental?.status || "").toLowerCase();
    const statusStyle =
        statusStyles[status] || {
            bg: "bg-slate-100 border-slate-200",
            text: "text-slate-600",
            dot: "bg-slate-400",
        };

    const equipmentName = getEquipmentName(rental);
    const renterName = getRenterName(rental);
    const renterEmail = getRenterEmail(rental);

    const startDate =
        rental?.rentalStartDate ||
        rental?.startDate ||
        rental?.rentalStart;

    const endDate =
        rental?.rentalEndDate ||
        rental?.endDate ||
        rental?.rentalEnd;

    return (
        <div className="group px-6 py-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.25fr_1fr_0.8fr_auto] gap-4 lg:items-center">
                {/* Equipment */}
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Equipment
                    </p>
                    <p className="font-bold text-sm text-slate-900 truncate">
                        {equipmentName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        ID: {rental?._id?.slice(-8) || "—"}
                    </p>
                </div>

                {/* Customer */}
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Customer
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                        {renterName}
                    </p>
                    {renterEmail && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                            {renterEmail}
                        </p>
                    )}
                </div>

                {/* Dates */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Rental Period
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-700">
                        {formatDate(startDate)}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        to {formatDate(endDate)}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Status
                    </p>
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {formatStatus(status)}
                    </span>
                </div>

                {/* Action */}
                <div className="lg:text-right">
                    <button
                        onClick={() => onView(rental)}
                        className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                        View Details →
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminRentals = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        rentals = [],
        loading,
        error,
    } = useSelector((state) => state.admin);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        dispatch(getAllRentals());
    }, [dispatch]);

    const stats = useMemo(() => {
        const count = (status) =>
            rentals.filter(
                (rental) =>
                    String(rental?.status || "").toLowerCase() === status
            ).length;

        return {
            total: rentals.length,
            pending: count("pending"),
            approved: count("approved"),
            completed: count("completed"),
            cancelled: count("cancelled"),
            rejected: count("rejected"),
        };
    }, [rentals]);

    const filteredRentals = useMemo(() => {
        const query = search.trim().toLowerCase();

        return rentals.filter((rental) => {
            const status = String(rental?.status || "").toLowerCase();
            const equipmentName = getEquipmentName(rental).toLowerCase();
            const renterName = getRenterName(rental).toLowerCase();
            const renterEmail = getRenterEmail(rental).toLowerCase();
            const id = String(rental?._id || "").toLowerCase();

            const matchesSearch =
                !query ||
                equipmentName.includes(query) ||
                renterName.includes(query) ||
                renterEmail.includes(query) ||
                id.includes(query);

            const matchesStatus =
                statusFilter === "all" || status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [rentals, search, statusFilter]);

    const displayedRentals = showAll
        ? filteredRentals
        : filteredRentals.slice(0, 8);

    const handleViewRental = (rental) => {
        navigate(`/admin/rentals/${rental._id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                            RentVerse Operations
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                            Rental Orders Directory
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                            Audit active requests, verify agreements, and track rental completions across the platform.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm self-start lg:self-auto">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Bookings</p>
                            <p className="font-display font-black text-xl text-slate-900">{stats.total}</p>
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium flex items-center gap-2">
                        <IconAlert className="w-4 h-4 text-slate-600 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* KPI Overview */}
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
                        <p className="font-display font-black text-3xl text-slate-900 mt-2">{stats.total}</p>
                        <p className="text-xs text-slate-500 mt-1">All bookings</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pending</p>
                        <p className="font-display font-black text-3xl text-slate-900 mt-2">{stats.pending}</p>
                        <p className="text-xs text-slate-500 mt-1">Awaiting approval</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Approved</p>
                        <p className="font-display font-black text-3xl text-blue-600 mt-2">{stats.approved}</p>
                        <p className="text-xs text-slate-500 mt-1">Active rentals</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Completed</p>
                        <p className="font-display font-black text-3xl text-slate-900 mt-2">{stats.completed}</p>
                        <p className="text-xs text-slate-500 mt-1">Returned & closed</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cancelled / Rejected</p>
                        <p className="font-display font-black text-3xl text-slate-700 mt-2">{stats.cancelled + stats.rejected}</p>
                        <p className="text-xs text-slate-500 mt-1">Non-fulfilled</p>
                    </div>
                </section>

                {/* Directory & Table */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Filters Bar */}
                    <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4">
                        <div className="w-full lg:w-96 relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                <IconSearch className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by equipment, renter, or ID..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-600 focus:bg-white transition font-medium"
                            >
                                <option value="all">All statuses</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            {(search || statusFilter !== "all") && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setStatusFilter("all");
                                    }}
                                    className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Table Column Labels */}
                    <div className="hidden lg:grid grid-cols-[1.5fr_1.25fr_1fr_0.8fr_auto] gap-4 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Equipment</span>
                        <span>Customer</span>
                        <span>Rental Period</span>
                        <span>Status</span>
                        <span>Action</span>
                    </div>

                    {/* Rows */}
                    {loading && rentals.length === 0 ? (
                        <div className="py-16 text-center text-xs text-slate-500">
                            Loading rentals...
                        </div>
                    ) : displayedRentals.length === 0 ? (
                        <div className="py-16 text-center">
                            <IconDocument className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <h3 className="font-display font-bold text-lg text-slate-900">No rentals found</h3>
                            <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or status filter.</p>
                        </div>
                    ) : (
                        displayedRentals.map((rental) => (
                            <RentalRow
                                key={rental._id}
                                rental={rental}
                                onView={handleViewRental}
                            />
                        ))
                    )}

                    {/* Show more pagination */}
                    {filteredRentals.length > 8 && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                            >
                                {showAll ? "Show Less" : `View All ${filteredRentals.length} Rentals`}
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdminRentals;