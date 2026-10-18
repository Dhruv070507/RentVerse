import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminDashboard,
    getUnassignedDeliveries,
    getDeliveryAgents,
    assignDeliveryAgent,
    assignReturnAgent,
    getAllDeliveries,
} from "../../features/adminSlice";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/adminNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import {
    IconCheck,
    IconUser,
    IconTool,
    IconDocument,
    IconTruck,
    IconAlert,
} from "../../components/Icons.jsx";

const StatusPill = ({ children, color = "slate" }) => {
    const styles = {
        yellow: "bg-slate-100 text-slate-800 border-slate-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-blue-50 text-blue-700 border-blue-200",
        red: "bg-slate-100 text-slate-700 border-slate-200",
        slate: "bg-slate-100 text-slate-700 border-slate-200",
        orange: "bg-slate-100 text-slate-800 border-slate-200",
        gray: "bg-slate-100 text-slate-600 border-slate-200",
    };

    const dots = {
        yellow: "bg-slate-500",
        blue: "bg-blue-500",
        green: "bg-blue-500",
        red: "bg-slate-400",
        slate: "bg-slate-400",
        orange: "bg-slate-500",
        gray: "bg-slate-400",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold tracking-wide ${styles[color]}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${dots[color]}`} />
            {children}
        </span>
    );
};

const SectionIntro = ({
    eyebrow,
    title,
    description,
    buttonText,
    onClick,
    dark = false,
}) => (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="max-w-2xl">
            <span
                className={`text-[11px] font-bold tracking-widest uppercase inline-block mb-3 px-3 py-1 rounded-full ${
                    dark
                        ? "text-blue-300 bg-blue-500/10 border border-blue-400/20"
                        : "text-blue-600 bg-blue-50 border border-blue-100"
                }`}
            >
                {eyebrow}
            </span>

            <h2
                className={`font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-tight ${
                    dark ? "text-white" : "text-[#0b1b34]"
                }`}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={`text-xs sm:text-sm leading-relaxed mt-2.5 ${
                        dark ? "text-slate-300" : "text-slate-500"
                    }`}
                >
                    {description}
                </p>
            )}
        </div>

        {buttonText && (
            <button
                onClick={onClick}
                className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-bold transition px-4 py-2 rounded-xl shrink-0 cursor-pointer ${
                    dark
                        ? "text-white bg-white/10 hover:bg-white/20 border border-white/20"
                        : "text-[#0b1b34] bg-white border border-slate-200 hover:bg-slate-50 shadow-sm"
                }`}
            >
                <span>{buttonText}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        )}
    </div>
);

const MetricCard = ({ label, value, description, icon, dark = false }) => (
    <div
        className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
            dark
                ? "bg-white/5 border-white/10 text-white"
                : "bg-white border-slate-200/90 shadow-sm"
        }`}
    >
        <div className="flex items-center justify-between">
            <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                    dark ? "text-slate-400" : "text-slate-500"
                }`}
            >
                {label}
            </span>
            {icon && (
                <span className="text-xl">{icon}</span>
            )}
        </div>

        <div className="mt-4">
            <p
                className={`font-display font-black text-3xl sm:text-4xl tracking-tight ${
                    dark ? "text-white" : "text-[#0b1b34]"
                }`}
            >
                {value}
            </p>
            {description && (
                <p
                    className={`text-xs mt-1 font-medium ${
                        dark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                    {description}
                </p>
            )}
        </div>
    </div>
);

const StatusLine = ({ item }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
        <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${item.dot}`} />
            <span className="text-xs sm:text-sm font-medium text-slate-700">{item.label}</span>
        </div>

        <span className={`text-base font-bold ${item.text}`}>
            {item.value}
        </span>
    </div>
);

const AssignmentRow = ({
    delivery,
    type = "delivery",
    selectedAgent,
    setSelectedAgent,
    agents,
    assigning,
    onAssign,
}) => {
    const rental = delivery.rental;

    const equipmentName =
        rental?.equipment?.name ||
        delivery.equipment?.name ||
        "Equipment";

    const customerName =
        rental?.renter?.username ||
        delivery.renter?.username ||
        "Unknown customer";

    const address =
        delivery.deliveryAddress ||
        rental?.address ||
        "Address not available";

    const returnDeadline = delivery.returnDeadline
        ? new Date(delivery.returnDeadline).toLocaleDateString()
        : "Not specified";

    const isReturn = type === "return";

    return (
        <div className="p-6 md:p-7 border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:items-center">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#0b1b34]">
                            {equipmentName}
                        </h3>

                        <StatusPill color={isReturn ? "slate" : "yellow"}>
                            {isReturn ? "Return Scheduled" : "Delivery Pending"}
                        </StatusPill>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xs sm:text-sm">
                        <p className="text-slate-500">
                            Customer:{" "}
                            <span className="text-slate-800 font-semibold">
                                {customerName}
                            </span>
                        </p>

                        {!isReturn ? (
                            <p className="text-slate-500 truncate max-w-xl">
                                Destination:{" "}
                                <span className="text-slate-700 font-medium">
                                    {address}
                                </span>
                            </p>
                        ) : (
                            <p className="text-slate-500">
                                Deadline:{" "}
                                <span className="text-slate-800 font-semibold">
                                    {returnDeadline}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 items-center">
                    <select
                        value={selectedAgent || ""}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        className="w-full sm:w-60 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition shadow-sm font-medium"
                    >
                        <option value="">
                            Select {isReturn ? "return" : "delivery"} agent
                        </option>

                        {agents.length === 0 ? (
                            <option disabled>No agents registered</option>
                        ) : (
                            agents.map((agent) => (
                                <option key={agent._id} value={agent._id}>
                                    {agent.username}
                                </option>
                            ))
                        )}
                    </select>

                    <button
                        type="button"
                        disabled={!selectedAgent || assigning}
                        onClick={onAssign}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0b1b34] text-white text-xs sm:text-sm font-bold hover:bg-[#152a4e] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shrink-0"
                    >
                        {assigning
                            ? "Assigning..."
                            : isReturn
                            ? "Dispatch Return"
                            : "Assign Agent"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmptyState = ({ title, description }) => (
    <div className="px-6 py-14 text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center text-lg font-bold mb-4">
            <IconCheck className="w-5 h-5 text-blue-600" />
        </div>

        <h3 className="font-display font-bold text-xl text-slate-900">
            {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
            {description}
        </p>
    </div>
);

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        dashboard,
        loading,
        error,
        unassignedDeliveries = [],
        deliveryAgents = [],
        deliveries: allDeliveries = [],
    } = useSelector((state) => state.admin);

    const [selectedAgents, setSelectedAgents] = useState({});
    const [selectedReturnAgents, setSelectedReturnAgents] = useState({});
    const [assigningDelivery, setAssigningDelivery] = useState(null);
    const [assigningReturn, setAssigningReturn] = useState(null);

    useEffect(() => {
        dispatch(getAdminDashboard());
        dispatch(getUnassignedDeliveries());
        dispatch(getDeliveryAgents());
        dispatch(getAllDeliveries());
    }, [dispatch]);

    const refreshDeliveryData = () => {
        dispatch(getAdminDashboard());
        dispatch(getUnassignedDeliveries());
        dispatch(getAllDeliveries());
    };

    const handleAssignWorker = async (deliveryId) => {
        const agentId = selectedAgents[deliveryId];
        if (!agentId) return;

        try {
            setAssigningDelivery(deliveryId);

            const result = await dispatch(
                assignDeliveryAgent({
                    deliveryId,
                    agentId,
                })
            );

            if (assignDeliveryAgent.fulfilled.match(result)) {
                setSelectedAgents((prev) => ({
                    ...prev,
                    [deliveryId]: "",
                }));
                refreshDeliveryData();
            }
        } finally {
            setAssigningDelivery(null);
        }
    };

    const handleAssignReturnAgent = async (deliveryId) => {
        const agentId = selectedReturnAgents[deliveryId];
        if (!agentId) return;

        try {
            setAssigningReturn(deliveryId);

            const result = await dispatch(
                assignReturnAgent({
                    deliveryId,
                    agentId,
                })
            );

            if (assignReturnAgent.fulfilled.match(result)) {
                setSelectedReturnAgents((prev) => ({
                    ...prev,
                    [deliveryId]: "",
                }));
                refreshDeliveryData();
            }
        } finally {
            setAssigningReturn(null);
        }
    };

    if (loading && !dashboard) {
        return (
            <div className="min-h-screen bg-slate-50">
                <AdminNavbar />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 animate-pulse">
                    <div className="h-4 w-40 bg-slate-200 rounded-full mb-4" />
                    <div className="h-12 w-80 bg-slate-200 rounded-2xl mb-4" />
                    <div className="h-4 w-96 bg-slate-200 rounded-full mb-12" />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 bg-white border border-slate-200 rounded-3xl"
                            />
                        ))}
                    </div>

                    <div className="h-72 bg-white border border-slate-200 rounded-3xl mb-8" />
                    <div className="h-72 bg-white border border-slate-200 rounded-3xl" />
                </main>
            </div>
        );
    }

    if (error && !dashboard) {
        return (
            <div className="min-h-screen bg-slate-50">
                <AdminNavbar />

                <main className="min-h-[70vh] flex items-center justify-center px-6">
                    <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                            <IconAlert className="w-6 h-6" />
                        </div>

                        <h2 className="font-display font-bold text-2xl text-slate-900">
                            Unable to load dashboard
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                            {error}
                        </p>

                        <button
                            onClick={() => {
                                dispatch(getAdminDashboard());
                                dispatch(getUnassignedDeliveries());
                                dispatch(getDeliveryAgents());
                                dispatch(getAllDeliveries());
                            }}
                            className="mt-6 px-6 py-3 rounded-full bg-[#0b1b34] text-white text-xs font-bold hover:bg-[#152a4e] transition cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (!dashboard) return null;

    const { users, equipment, rentals, deliveries } = dashboard;

    const rentalStatuses = [
        {
            label: "Pending Review",
            value: rentals.pending,
            dot: "bg-slate-400",
            text: "text-slate-700",
        },
        {
            label: "Approved",
            value: rentals.approved,
            dot: "bg-blue-500",
            text: "text-blue-700",
        },
        {
            label: "Completed",
            value: rentals.completed,
            dot: "bg-blue-500",
            text: "text-blue-700",
        },
        {
            label: "Rejected",
            value: rentals.rejected,
            dot: "bg-slate-400",
            text: "text-slate-600",
        },
        {
            label: "Cancelled",
            value: rentals.cancelled,
            dot: "bg-slate-400",
            text: "text-slate-600",
        },
    ];

    const deliveryStatuses = [
        {
            label: "Pending Dispatch",
            value: deliveries.pending,
            dot: "bg-slate-400",
            text: "text-slate-700",
        },
        {
            label: "Out for Delivery",
            value: deliveries.outForDelivery,
            dot: "bg-blue-500",
            text: "text-blue-700",
        },
        {
            label: "Delivered",
            value: deliveries.delivered,
            dot: "bg-blue-500",
            text: "text-blue-700",
        },
        {
            label: "Return Scheduled",
            value: deliveries.returnScheduled ?? 0,
            dot: "bg-slate-400",
            text: "text-slate-700",
        },
        {
            label: "Out for Return",
            value: deliveries.outForReturn ?? 0,
            dot: "bg-slate-400",
            text: "text-slate-700",
        },
        {
            label: "Returned",
            value: deliveries.returned,
            dot: "bg-slate-600",
            text: "text-slate-800",
        },
    ];

    const visibleDeliveries = unassignedDeliveries.slice(0, 3);

    const returnAssignments = allDeliveries.filter((delivery) => {
        return (
            String(delivery.deliveryStatus || "").toLowerCase() ===
                "delivered" && !delivery.returnAgent
        );
    });

    const visibleReturnAssignments = returnAssignments.slice(0, 3);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            {/* HERO */}
            <section className="bg-slate-900 border-b border-slate-800 text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
                    <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
                        <div>
                            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-4">
                                Marketplace Operations
                            </span>

                            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
                                Platform Executive Control
                            </h1>

                            <p className="max-w-xl mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                                Monitor system-wide equipment reservations, coordinate delivery logistics, and oversee account permissions.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[220px]">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-blue-200">
                                Requires Review
                            </p>

                            <p className="font-display font-black text-5xl mt-2 text-white">
                                {rentals.pending}
                            </p>

                            <p className="text-xs text-slate-300 mt-1">
                                pending rental requests
                            </p>

                            <button
                                onClick={() => navigate("/admin/rentals")}
                                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white text-[#0b1b34] text-xs font-bold hover:bg-slate-100 transition shadow-sm cursor-pointer"
                            >
                                Review Requests →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1">
                {/* OVERVIEW STATS */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 relative z-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <MetricCard
                            label="Total Accounts"
                            value={users.total}
                            description="Registered users & agents"
                            icon={<IconUser className="w-5 h-5 text-slate-500" />}
                        />

                        <MetricCard
                            label="Equipment Listed"
                            value={equipment.total}
                            description={`${equipment.available} currently available`}
                            icon={<IconTool className="w-5 h-5 text-slate-500" />}
                        />

                        <MetricCard
                            label="Total Rentals"
                            value={rentals.total}
                            description={`${rentals.approved} approved bookings`}
                            icon={<IconDocument className="w-5 h-5 text-slate-500" />}
                        />

                        <MetricCard
                            label="Total Deliveries"
                            value={deliveries.total}
                            description={`${deliveries.outForDelivery} in transit right now`}
                            icon={<IconTruck className="w-5 h-5 text-slate-500" />}
                        />
                    </div>
                </section>

                {/* RENTALS LIFECYCLE */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <SectionIntro
                        eyebrow="Rental Activity"
                        title="Booking Status Overview"
                        description="Status distribution across all active and completed equipment bookings."
                        buttonText="View All Rentals"
                        onClick={() => navigate("/admin/rentals")}
                    />

                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {rentalStatuses.map((item) => (
                                <div key={item.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                                        <span className="text-xs font-bold text-slate-600">{item.label}</span>
                                    </div>
                                    <p className={`font-display font-black text-2xl ${item.text}`}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DELIVERY LIFECYCLE */}
                <section className="bg-slate-100/60 py-14 border-y border-slate-200/70">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="Logistics Stream"
                            title="Delivery & Return Pipeline"
                            description="Real-time transit stages from fulfillment dispatch to customer return completion."
                            buttonText="View All Deliveries"
                            onClick={() => navigate("/admin/deliveries")}
                        />

                        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                {deliveryStatuses.map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                                            <span className="text-[11px] font-bold text-slate-600 truncate">{item.label}</span>
                                        </div>
                                        <p className={`font-display font-black text-2xl ${item.text}`}>
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* UNASSIGNED DELIVERIES */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <SectionIntro
                        eyebrow="Dispatch Console"
                        title="Assign Delivery Work"
                        description={
                            unassignedDeliveries.length > 0
                                ? `${unassignedDeliveries.length} orders are awaiting delivery agent assignment.`
                                : "All current deliveries are assigned to agents."
                        }
                        buttonText={
                            unassignedDeliveries.length > 3
                                ? "View All Pending Deliveries"
                                : undefined
                        }
                        onClick={() => navigate("/admin/deliveries/unassigned")}
                    />

                    <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
                        {unassignedDeliveries.length === 0 ? (
                            <EmptyState
                                title="No pending delivery dispatches"
                                description="All bookings currently marked for delivery have assigned logistics agents."
                            />
                        ) : (
                            <>
                                {visibleDeliveries.map((delivery) => (
                                    <AssignmentRow
                                        key={delivery._id}
                                        delivery={delivery}
                                        agents={deliveryAgents}
                                        selectedAgent={selectedAgents[delivery._id]}
                                        setSelectedAgent={(value) =>
                                            setSelectedAgents((prev) => ({
                                                ...prev,
                                                [delivery._id]: value,
                                            }))
                                        }
                                        assigning={assigningDelivery === delivery._id}
                                        onAssign={() => handleAssignWorker(delivery._id)}
                                    />
                                ))}

                                {unassignedDeliveries.length > 3 && (
                                    <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                                        <p className="text-xs text-slate-500">
                                            Showing 3 of {unassignedDeliveries.length} waiting assignments
                                        </p>
                                        <button
                                            onClick={() => navigate("/admin/deliveries/unassigned")}
                                            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                        >
                                            View all {unassignedDeliveries.length} →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* RETURN ASSIGNMENTS */}
                <section className="bg-slate-900 border-t border-slate-800 text-white py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            dark
                            eyebrow="Return Coordination"
                            title="Assign Return Agents"
                            description={
                                returnAssignments.length > 0
                                    ? `${returnAssignments.length} delivered items need return agent coordination.`
                                    : "All delivered items have designated return logistics."
                            }
                            buttonText={
                                returnAssignments.length > 3
                                    ? "View All Returns"
                                    : undefined
                            }
                            onClick={() => navigate("/admin/deliveries")}
                        />

                        <div className="bg-white text-slate-900 rounded-3xl shadow-xl overflow-hidden">
                            {returnAssignments.length === 0 ? (
                                <EmptyState
                                    title="No pending returns needing assignment"
                                    description="All active return pickups are smoothly proceeding."
                                />
                            ) : (
                                <>
                                    {visibleReturnAssignments.map((delivery) => (
                                        <AssignmentRow
                                            key={delivery._id}
                                            delivery={delivery}
                                            type="return"
                                            agents={deliveryAgents}
                                            selectedAgent={selectedReturnAgents[delivery._id]}
                                            setSelectedAgent={(value) =>
                                                setSelectedReturnAgents((prev) => ({
                                                    ...prev,
                                                    [delivery._id]: value,
                                                }))
                                            }
                                            assigning={assigningReturn === delivery._id}
                                            onAssign={() => handleAssignReturnAgent(delivery._id)}
                                        />
                                    ))}

                                    {returnAssignments.length > 3 && (
                                        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                                            <p className="text-xs text-slate-500">
                                                Showing 3 of {returnAssignments.length} returns
                                            </p>
                                            <button
                                                onClick={() => navigate("/admin/deliveries")}
                                                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                            >
                                                View all {returnAssignments.length} →
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;