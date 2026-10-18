import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import { getAllEquipment } from "../../features/adminSlice";
import AdminNavbar from "../../components/adminNavbar.jsx";
import { IconAlert, IconSearch, IconTool, IconClose } from "../../components/Icons.jsx";

const formatStatus = (status) => {
    if (!status) return "Unknown";
    return String(status)
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getEquipmentName = (item) => {
    return item?.name || item?.title || item?.equipmentName || "Unnamed Equipment";
};

const getOwnerName = (item) => {
    const owner = item?.owner || item?.user || item?.createdBy;
    if (!owner) return "Unknown owner";
    if (typeof owner === "string") return owner;
    return owner.name || owner.fullName || owner.username || owner.email || "Unknown owner";
};

const getOwnerEmail = (item) => {
    const owner = item?.owner || item?.user || item?.createdBy;
    if (!owner || typeof owner === "string") return "";
    return owner.email || "";
};

const getStatus = (item) => {
    return String(
        item?.status ||
        item?.availabilityStatus ||
        (item?.available === true
            ? "available"
            : item?.available === false
            ? "unavailable"
            : "")
    ).toLowerCase();
};

const getStatusStyle = (status) => {
    if (status === "available" || status === "active") {
        return {
            bg: "bg-blue-50 border-blue-200",
            text: "text-blue-700",
            dot: "bg-blue-500",
        };
    }
    if (status === "rented" || status === "unavailable") {
        return {
            bg: "bg-slate-100 border-slate-200",
            text: "text-slate-800",
            dot: "bg-slate-400",
        };
    }
    if (status === "pending") {
        return {
            bg: "bg-blue-50 border-blue-200",
            text: "text-blue-700",
            dot: "bg-blue-500",
        };
    }
    return {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-600",
        dot: "bg-slate-400",
    };
};

const EquipmentRow = ({ item, onView }) => {
    const name = getEquipmentName(item);
    const owner = getOwnerName(item);
    const email = getOwnerEmail(item);
    const status = getStatus(item);
    const statusStyle = getStatusStyle(status);

    const price = item?.pricePerDay ?? item?.rentalPrice ?? item?.price;

    return (
        <div className="group px-6 py-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.2fr_1fr_0.9fr_auto] gap-4 lg:items-center">
                {/* Equipment & Image */}
                <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80">
                        {item?.images && item.images.length > 0 ? (
                            <img
                                src={item.images[0]}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <IconTool className="w-5 h-5 text-slate-400" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate">
                            {name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                            ID: {item?._id?.slice(-8) || "—"}
                            {price !== undefined && (
                                <span className="ml-2 font-bold text-slate-700">₹{price}/day</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Owner */}
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Owner
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                        {owner}
                    </p>
                    {email && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                            {email}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Category
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-700">
                        {item?.category?.name || item?.category || "General"}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Availability
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
                        onClick={() => onView(item)}
                        className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                        Inspect →
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminEquipment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        equipment = [],
        loading,
        error,
    } = useSelector((state) => state.admin);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        dispatch(getAllEquipment());
    }, [dispatch]);

    const stats = useMemo(() => {
        let available = 0;
        let rented = 0;
        let pending = 0;

        equipment.forEach((item) => {
            const status = getStatus(item);
            if (status === "available" || status === "active") {
                available++;
            } else if (status === "rented" || status === "unavailable") {
                rented++;
            } else if (status === "pending") {
                pending++;
            }
        });

        return {
            total: equipment.length,
            available,
            rented,
            pending,
        };
    }, [equipment]);

    const filteredEquipment = useMemo(() => {
        const query = search.trim().toLowerCase();

        return equipment.filter((item) => {
            const name = getEquipmentName(item).toLowerCase();
            const owner = getOwnerName(item).toLowerCase();
            const email = getOwnerEmail(item).toLowerCase();
            const categoryName = (item?.category?.name || item?.category || "").toLowerCase();
            const status = getStatus(item);

            const matchesSearch =
                !query ||
                name.includes(query) ||
                owner.includes(query) ||
                email.includes(query) ||
                categoryName.includes(query);

            const matchesStatus =
                statusFilter === "all" || status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [equipment, search, statusFilter]);

    const displayedEquipment = showAll
        ? filteredEquipment
        : filteredEquipment.slice(0, 8);

    const handleViewEquipment = (item) => {
        navigate(`/admin/equipment/${item._id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                            Equipment Registry
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                            Platform Equipment Catalog
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                            Manage owner listings, audit specifications, and monitor availability across all cities.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm self-start lg:self-auto">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Listings</p>
                            <p className="font-display font-black text-xl text-slate-900">{stats.total}</p>
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2">
                        <IconAlert className="w-4 h-4 text-slate-600 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* KPI Metrics */}
                <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Listed</p>
                        <p className="font-display font-black text-3xl text-slate-900 mt-2">{stats.total}</p>
                        <p className="text-xs text-slate-500 mt-1">Platform inventory</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Available</p>
                        <p className="font-display font-black text-3xl text-slate-900 mt-2">{stats.available}</p>
                        <p className="text-xs text-slate-500 mt-1">Ready for rent</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Currently Rented</p>
                        <p className="font-display font-black text-3xl text-slate-900 mt-2">{stats.rented}</p>
                        <p className="text-xs text-slate-500 mt-1">Out on active jobs</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Pending Review</p>
                        <p className="font-display font-black text-3xl text-blue-600 mt-2">{stats.pending}</p>
                        <p className="text-xs text-slate-500 mt-1">New submissions</p>
                    </div>
                </section>

                {/* Equipment Directory */}
                <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                    {/* Filters Bar */}
                    <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                        <div className="w-full lg:w-96 relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <IconSearch className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, owner, or category..."
                                className="w-full h-10 pl-10 pr-9 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition font-medium"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                    title="Clear search"
                                >
                                    <IconClose className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-600 focus:bg-white transition font-medium cursor-pointer"
                            >
                                <option value="all">All statuses</option>
                                <option value="available">Available</option>
                                <option value="rented">Rented</option>
                                <option value="pending">Pending</option>
                                <option value="unavailable">Unavailable</option>
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
                    <div className="hidden lg:grid grid-cols-[1.4fr_1.2fr_1fr_0.9fr_auto] gap-4 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Equipment</span>
                        <span>Owner</span>
                        <span>Category</span>
                        <span>Availability</span>
                        <span className="lg:text-right">Action</span>
                    </div>

                    {/* Rows */}
                    {loading && equipment.length === 0 ? (
                        <div className="py-16 text-center text-xs text-slate-500">
                            Loading equipment inventory...
                        </div>
                    ) : displayedEquipment.length === 0 ? (
                        <div className="py-16 text-center">
                            <IconTool className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <h3 className="font-display font-bold text-lg text-slate-900">No equipment found</h3>
                            <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or status filter.</p>
                        </div>
                    ) : (
                        displayedEquipment.map((item) => (
                            <EquipmentRow
                                key={item._id}
                                item={item}
                                onView={handleViewEquipment}
                            />
                        ))
                    )}

                    {/* Show more pagination */}
                    {filteredEquipment.length > 8 && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                            >
                                {showAll ? "Show Less" : `View All ${filteredEquipment.length} Equipment →`}
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdminEquipment;