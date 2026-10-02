import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRentals } from "../../features/adminSlice";


const statusStyles = {
    pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        dot: "bg-yellow-500",
    },
    approved: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        dot: "bg-blue-500",
    },
    rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        dot: "bg-red-500",
    },
    cancelled: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        dot: "bg-gray-400",
    },
    completed: {
        bg: "bg-green-50",
        text: "text-green-700",
        dot: "bg-green-500",
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

    if (!renter) return "Unknown user";

    if (typeof renter === "string") {
        return renter;
    }

    return (
        renter.name ||
        renter.fullName ||
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


const SectionHeader = ({
    eyebrow,
    title,
    description,
    buttonText,
    onClick,
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">

            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    {eyebrow}
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34] mt-1">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>
                )}
            </div>

            {buttonText && (
                <button
                    onClick={onClick}
                    className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-[#0b1b34] hover:border-[#0b1b34] hover:bg-gray-50 transition"
                >
                    {buttonText}
                </button>
            )}

        </div>
    );
};


const StatItem = ({ label, value, description, type }) => {

    const styles = {
        total: {
            bg: "bg-gray-50",
            value: "text-[#0b1b34]",
            dot: "bg-[#0b1b34]",
        },
        pending: {
            bg: "bg-yellow-50/70",
            value: "text-yellow-700",
            dot: "bg-yellow-500",
        },
        approved: {
            bg: "bg-blue-50/70",
            value: "text-blue-700",
            dot: "bg-blue-500",
        },
        completed: {
            bg: "bg-green-50/70",
            value: "text-green-700",
            dot: "bg-green-500",
        },
        cancelled: {
            bg: "bg-gray-100",
            value: "text-gray-600",
            dot: "bg-gray-400",
        },
    };

    const style = styles[type] || styles.total;

    return (
        <div className={`${style.bg} rounded-2xl p-5`}>

            <div className="flex items-center gap-2">

                <span
                    className={`w-2 h-2 rounded-full ${style.dot}`}
                />

                <p className="text-xs font-medium text-gray-500">
                    {label}
                </p>

            </div>

            <p
                className={`font-display text-4xl mt-3 ${style.value}`}
            >
                {value}
            </p>

            <p className="text-xs text-gray-400 mt-1">
                {description}
            </p>

        </div>
    );
};


const RentalRow = ({ rental, onView }) => {

    const status = String(rental?.status || "").toLowerCase();

    const statusStyle =
        statusStyles[status] || {
            bg: "bg-gray-100",
            text: "text-gray-600",
            dot: "bg-gray-400",
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
        <div className="group px-5 md:px-6 py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition">

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.25fr_1fr_0.8fr_auto] gap-4 lg:items-center">

                {/* Equipment */}
                <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Equipment
                    </p>

                    <p className="font-medium text-[#0b1b34] truncate">
                        {equipmentName}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        ID: {rental?._id?.slice(-8) || "—"}
                    </p>

                </div>


                {/* Customer */}
                <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Customer
                    </p>

                    <p className="text-sm font-medium text-gray-700 truncate">
                        {renterName}
                    </p>

                    {renterEmail && (
                        <p className="text-xs text-gray-400 truncate mt-1">
                            {renterEmail}
                        </p>
                    )}

                </div>


                {/* Dates */}
                <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Rental Period
                    </p>

                    <p className="text-sm text-gray-700">
                        {formatDate(startDate)}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        to {formatDate(endDate)}
                    </p>

                </div>


                {/* Status */}
                <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Status
                    </p>

                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {formatStatus(status)}
                    </span>

                </div>


                {/* Action */}
                <div className="lg:text-right">

                    <button
                        onClick={() => onView(rental)}
                        className="text-sm font-medium text-[#0b1b34] hover:text-blue-600 transition"
                    >
                        View →
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


    /*
        ----------------------------------------
        RENTAL STATISTICS
        ----------------------------------------
    */

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


    /*
        ----------------------------------------
        SEARCH + FILTER
        ----------------------------------------
    */

    const filteredRentals = useMemo(() => {

        const query = search.trim().toLowerCase();

        return rentals.filter((rental) => {

            const status =
                String(rental?.status || "").toLowerCase();

            const equipmentName =
                getEquipmentName(rental).toLowerCase();

            const renterName =
                getRenterName(rental).toLowerCase();

            const renterEmail =
                getRenterEmail(rental).toLowerCase();

            const id =
                String(rental?._id || "").toLowerCase();

            const matchesSearch =
                !query ||
                equipmentName.includes(query) ||
                renterName.includes(query) ||
                renterEmail.includes(query) ||
                id.includes(query);

            const matchesStatus =
                statusFilter === "all" ||
                status === statusFilter;

            return matchesSearch && matchesStatus;
        });

    }, [rentals, search, statusFilter]);


    /*
        ----------------------------------------
        LIMIT INITIAL RESULTS
        ----------------------------------------
    */

    const displayedRentals = showAll
        ? filteredRentals
        : filteredRentals.slice(0, 8);


    const handleViewRental = (rental) => {

        /*
            Change this route if you already have
            a dedicated rental details page.
        */

        navigate(`/admin/rentals/${rental._id}`);
    };


    return (
        <div className="min-h-screen bg-[#f7f7f5]">

            <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-10">

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        RentVerse Administration
                    </p>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mt-2">

                        <div>

                            <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                Rental Management
                            </h1>

                            <p className="text-gray-500 mt-2 max-w-xl">
                                Monitor rental activity, review requests and
                                keep track of the marketplace rental lifecycle.
                            </p>

                        </div>


                        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm min-w-[180px]">

                            <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                Total Rentals
                            </p>

                            <p className="font-display text-4xl text-[#0b1b34] mt-1">
                                {stats.total}
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

                        <p className="text-sm font-medium text-red-700">
                            {error}
                        </p>

                    </div>
                )}


                {/* =================================================
                    1. RENTAL OVERVIEW
                ================================================= */}

                <section className="mb-10">

                    <SectionHeader
                        eyebrow="Rental Overview"
                        title="Activity at a glance"
                        description="A quick look at the current rental lifecycle."
                    />


                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 md:p-6">

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

                            <StatItem
                                label="Total"
                                value={stats.total}
                                description="All rentals"
                                type="total"
                            />

                            <StatItem
                                label="Pending"
                                value={stats.pending}
                                description="Awaiting decision"
                                type="pending"
                            />

                            <StatItem
                                label="Approved"
                                value={stats.approved}
                                description="Approved requests"
                                type="approved"
                            />

                            <StatItem
                                label="Completed"
                                value={stats.completed}
                                description="Finished rentals"
                                type="completed"
                            />

                            <StatItem
                                label="Cancelled"
                                value={stats.cancelled}
                                description="Cancelled rentals"
                                type="cancelled"
                            />

                        </div>


                        {stats.rejected > 0 && (
                            <div className="mt-3 px-4 py-3 rounded-2xl bg-red-50 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 rounded-full bg-red-500" />

                                    <p className="text-sm text-red-700">
                                        Rejected rentals
                                    </p>

                                </div>

                                <p className="font-semibold text-red-700">
                                    {stats.rejected}
                                </p>

                            </div>
                        )}

                    </div>

                </section>


                {/* =================================================
                    2. RENTAL DIRECTORY
                ================================================= */}

                <section>

                    <SectionHeader
                        eyebrow="Rental Directory"
                        title="All rentals"
                        description="Search and review rental activity across the platform."
                    />


                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">


                        {/* Search + Filter */}

                        <div className="p-5 md:p-6 border-b border-gray-100">

                            <div className="flex flex-col lg:flex-row gap-3">

                                {/* Search */}

                                <div className="relative flex-1">

                                    <svg
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m20 20-4-4" />
                                    </svg>

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search by equipment, customer or rental ID..."
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-700 outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                    />

                                </div>


                                {/* Status */}

                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="lg:w-48 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-700 outline-none focus:border-[#0b1b34] focus:bg-white"
                                >

                                    <option value="all">
                                        All statuses
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="approved">
                                        Approved
                                    </option>

                                    <option value="completed">
                                        Completed
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>

                                    <option value="rejected">
                                        Rejected
                                    </option>

                                </select>

                            </div>


                            <div className="flex items-center justify-between mt-4">

                                <p className="text-xs text-gray-400">
                                    Showing{" "}
                                    <span className="font-medium text-gray-600">
                                        {displayedRentals.length}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium text-gray-600">
                                        {filteredRentals.length}
                                    </span>{" "}
                                    matching rentals
                                </p>

                                {(search || statusFilter !== "all") && (
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setStatusFilter("all");
                                        }}
                                        className="text-xs font-medium text-gray-500 hover:text-[#0b1b34]"
                                    >
                                        Clear filters
                                    </button>
                                )}

                            </div>

                        </div>


                        {/* Table Header */}

                        {displayedRentals.length > 0 && (
                            <div className="hidden lg:grid grid-cols-[1.5fr_1.25fr_1fr_0.8fr_auto] gap-4 px-5 md:px-6 py-3 bg-gray-50/70 border-b border-gray-100">

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Equipment
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Customer
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Rental Period
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Status
                                </p>

                                <span />

                            </div>
                        )}


                        {/* Loading */}

                        {loading && rentals.length === 0 && (
                            <div className="p-12 text-center">

                                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0b1b34] rounded-full animate-spin mx-auto" />

                                <p className="text-sm text-gray-400 mt-4">
                                    Loading rentals...
                                </p>

                            </div>
                        )}


                        {/* Empty */}

                        {!loading && displayedRentals.length === 0 && (
                            <div className="p-12 text-center">

                                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400">

                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="16"
                                            rx="2"
                                        />

                                        <path d="M8 9h8M8 13h5" />
                                    </svg>

                                </div>

                                <h3 className="font-display text-xl text-[#0b1b34] mt-4">
                                    No rentals found
                                </h3>

                                <p className="text-sm text-gray-400 mt-1">
                                    Try changing your search or status filter.
                                </p>

                            </div>
                        )}


                        {/* Rental rows */}

                        {displayedRentals.map((rental) => (
                            <RentalRow
                                key={rental._id}
                                rental={rental}
                                onView={handleViewRental}
                            />
                        ))}


                        {/* See all */}

                        {filteredRentals.length > 8 && (

                            <div className="px-5 md:px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">

                                <button
                                    onClick={() => setShowAll((prev) => !prev)}
                                    className="px-5 py-2.5 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition"
                                >
                                    {showAll
                                        ? "Show Less"
                                        : `See All ${filteredRentals.length} Rentals →`}
                                </button>

                            </div>

                        )}

                    </div>

                </section>

            </div>

        </div>
    );
};


export default AdminRentals;
