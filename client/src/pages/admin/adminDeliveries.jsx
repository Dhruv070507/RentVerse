import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDeliveries } from "../../features/adminSlice.js";
import Footer from "../../components/Footer.jsx";
import AdminNavbar from "../../components/adminNavbar.jsx";
import { IconTruck, IconSearch, IconAlert } from "../../components/Icons.jsx";

const statusStyles = {
    pending: {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-800",
        dot: "bg-slate-400",
    },
    out_for_delivery: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        dot: "bg-blue-500",
    },
    delivered: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        dot: "bg-blue-500",
    },
    out_for_return: {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-700",
        dot: "bg-slate-500",
    },
    returned: {
        bg: "bg-slate-900 border-slate-800",
        text: "text-white",
        dot: "bg-slate-300",
    },
    cancelled: {
        bg: "bg-slate-100 border-slate-200",
        text: "text-slate-600",
        dot: "bg-slate-400",
    },
};

const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getCustomerName = (delivery) => {
    const renter =
        delivery?.rental?.renter ||
        delivery?.renter ||
        delivery?.customer;

    if (!renter) return "Unknown customer";
    if (typeof renter === "string") return renter;
    return (
        renter.name ||
        renter.fullName ||
        renter.username ||
        `${renter.firstName || ""} ${renter.lastName || ""}`.trim() ||
        renter.email ||
        "Unknown customer"
    );
};

const getCustomerEmail = (delivery) => {
    const renter =
        delivery?.rental?.renter ||
        delivery?.renter ||
        delivery?.customer;

    if (!renter || typeof renter === "string") return "";
    return renter.email || "";
};

const getAgentName = (delivery) => {
    const agent = delivery?.deliveryAgent;
    if (!agent) return "Unassigned";
    if (typeof agent === "string") return "Assigned";
    return agent.username || agent.name || agent.fullName || agent.email || "Assigned";
};

const getEquipmentName = (delivery) => {
    const equipment =
        delivery?.rental?.equipment ||
        delivery?.equipment;

    if (!equipment) return "Equipment";
    if (typeof equipment === "string") return equipment;
    return (
        equipment.name ||
        equipment.title ||
        equipment.equipmentName ||
        "Equipment"
    );
};

const DeliveryRow = ({ delivery, onView }) => {
    const status = String(
        delivery?.deliveryStatus || delivery?.status || ""
    ).toLowerCase();

    const statusStyle =
        statusStyles[status] || {
            bg: "bg-slate-100 border-slate-200",
            text: "text-slate-600",
            dot: "bg-slate-400",
        };

    const customerName = getCustomerName(delivery);
    const customerEmail = getCustomerEmail(delivery);
    const agentName = getAgentName(delivery);
    const equipmentName = getEquipmentName(delivery);

    return (
        <div className="group px-6 py-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1.25fr_1.5fr_1fr_auto] gap-4 lg:items-center">
                {/* Customer */}
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Customer
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                        {customerName}
                    </p>
                    {customerEmail && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                            {customerEmail}
                        </p>
                    )}
                </div>

                {/* Equipment */}
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Equipment
                    </p>
                    <p className="font-bold text-sm text-[#0b1b34] truncate">
                        {equipmentName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        ID: {delivery?._id?.slice(-8) || "—"}
                    </p>
                </div>

                {/* Delivery Address */}
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Delivery Destination
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 line-clamp-2">
                        {delivery?.deliveryAddress || "Address not specified"}
                    </p>
                </div>

                {/* Status & Agent */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Status & Courier
                    </p>
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {formatStatus(status)}
                    </span>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        Agent: <span className="text-slate-800 font-bold">{agentName}</span>
                    </p>
                </div>

                {/* Action */}
                <div className="lg:text-right">
                    <button
                        onClick={() => onView(delivery)}
                        className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                        Inspect →
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminDeliveries = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        deliveries = [],
        loading,
        error,
    } = useSelector((state) => state.admin);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        dispatch(getAllDeliveries());
    }, [dispatch]);

    const stats = useMemo(() => {
        const count = (status) =>
            deliveries.filter((d) => {
                const current = String(
                    d?.deliveryStatus || d?.status || ""
                ).toLowerCase();
                return current === status;
            }).length;

        return {
            total: deliveries.length,
            pending: count("pending"),
            outForDelivery: count("out_for_delivery"),
            delivered: count("delivered"),
            outForReturn: count("out_for_return"),
            returned: count("returned"),
        };
    }, [deliveries]);

    const filteredDeliveries = useMemo(() => {
        const query = search.trim().toLowerCase();

        return deliveries.filter((d) => {
            const status = String(
                d?.deliveryStatus || d?.status || ""
            ).toLowerCase();
            const customer = getCustomerName(d).toLowerCase();
            const email = getCustomerEmail(d).toLowerCase();
            const equipment = getEquipmentName(d).toLowerCase();
            const address = String(d?.deliveryAddress || "").toLowerCase();
            const id = String(d?._id || "").toLowerCase();

            const matchesSearch =
                !query ||
                customer.includes(query) ||
                email.includes(query) ||
                equipment.includes(query) ||
                address.includes(query) ||
                id.includes(query);

            const matchesStatus =
                statusFilter === "all" || status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [deliveries, search, statusFilter]);

    const displayedDeliveries = showAll
        ? filteredDeliveries
        : filteredDeliveries.slice(0, 8);

    const handleViewDelivery = (delivery) => {
        navigate(`/admin/delivery/${delivery._id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                            Logistics Coordination
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0b1b34] tracking-tight">
                            Delivery Management
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                            Real-time tracking of doorstep fulfillment, driver assignments, and gear return drop-offs.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm self-start lg:self-auto">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Shipments</p>
                            <p className="font-display font-black text-xl text-[#0b1b34]">{stats.total}</p>
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

                {/* KPI Metrics */}
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.total}</p>
                        <p className="text-xs text-slate-500 mt-1">All deliveries</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pending</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.pending}</p>
                        <p className="text-xs text-slate-500 mt-1">Unassigned or awaiting</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">In Transit</p>
                        <p className="font-display font-black text-3xl text-blue-600 mt-2">{stats.outForDelivery}</p>
                        <p className="text-xs text-slate-500 mt-1">Out for delivery</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Delivered</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.delivered}</p>
                        <p className="text-xs text-slate-500 mt-1">With renter</p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Returned</p>
                        <p className="font-display font-black text-3xl text-[#0b1b34] mt-2">{stats.returned}</p>
                        <p className="text-xs text-slate-500 mt-1">Complete cycle</p>
                    </div>
                </section>

                {/* Deliveries Directory */}
                <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
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
                                placeholder="Search customer, equipment, or address..."
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
                                <option value="out_for_delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="out_for_return">Out for Return</option>
                                <option value="returned">Returned</option>
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
                    <div className="hidden lg:grid grid-cols-[1.25fr_1.25fr_1.5fr_1fr_auto] gap-4 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Customer</span>
                        <span>Equipment</span>
                        <span>Destination</span>
                        <span>Status & Courier</span>
                        <span>Action</span>
                    </div>

                    {/* Rows */}
                    {loading && deliveries.length === 0 ? (
                        <div className="py-16 text-center text-xs text-slate-500">
                            Loading deliveries...
                        </div>
                    ) : displayedDeliveries.length === 0 ? (
                        <div className="py-16 text-center">
                            <IconTruck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <h3 className="font-display font-bold text-lg text-slate-900">No deliveries found</h3>
                            <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or status filter.</p>
                        </div>
                    ) : (
                        displayedDeliveries.map((delivery) => (
                            <DeliveryRow
                                key={delivery._id}
                                delivery={delivery}
                                onView={handleViewDelivery}
                            />
                        ))
                    )}

                    {/* Show more pagination */}
                    {filteredDeliveries.length > 8 && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                            >
                                {showAll ? "Show Less" : `View All ${filteredDeliveries.length} Deliveries`}
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDeliveries;