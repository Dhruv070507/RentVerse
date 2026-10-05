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

const StatusPill = ({ children, color = "yellow" }) => {
    const styles = {
        yellow: "bg-amber-50 text-amber-700 border-amber-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-emerald-50 text-emerald-700 border-emerald-200",
        red: "bg-red-50 text-red-700 border-red-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        orange: "bg-orange-50 text-orange-700 border-orange-200",
        gray: "bg-gray-100 text-gray-600 border-gray-200",
    };

    const dots = {
        yellow: "bg-amber-500",
        blue: "bg-blue-500",
        green: "bg-emerald-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
        gray: "bg-gray-400",
    };

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-medium ${styles[color]}`}
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
            <p
                className={`text-[10px] tracking-[0.25em] uppercase mb-3 ${
                    dark ? "text-white/50" : "text-gray-400"
                }`}
            >
                {eyebrow}
            </p>

            <h2
                className={`font-display text-3xl md:text-4xl leading-tight ${
                    dark ? "text-white" : "text-[#0b1b34]"
                }`}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={`text-sm leading-relaxed mt-3 ${
                        dark ? "text-white/60" : "text-gray-500"
                    }`}
                >
                    {description}
                </p>
            )}
        </div>

        {buttonText && (
            <button
                onClick={onClick}
                className={`group inline-flex items-center gap-3 text-sm font-medium transition shrink-0 ${
                    dark
                        ? "text-white hover:text-blue-300"
                        : "text-[#0b1b34] hover:text-blue-600"
                }`}
            >
                {buttonText}

                <span className="group-hover:translate-x-1 transition-transform">
                    →
                </span>
            </button>
        )}
    </div>
);

const Metric = ({ label, value, description, light = false }) => (
    <div
        className={`py-5 border-b ${
            light ? "border-white/10" : "border-gray-200"
        }`}
    >
        <p
            className={`text-[10px] tracking-[0.18em] uppercase ${
                light ? "text-white/45" : "text-gray-400"
            }`}
        >
            {label}
        </p>

        <div className="flex items-end justify-between gap-4 mt-2">
            <p
                className={`font-display text-4xl md:text-5xl ${
                    light ? "text-white" : "text-[#0b1b34]"
                }`}
            >
                {value}
            </p>

            {description && (
                <p
                    className={`text-xs pb-1 text-right ${
                        light ? "text-white/45" : "text-gray-400"
                    }`}
                >
                    {description}
                </p>
            )}
        </div>
    </div>
);

const StatusLine = ({ item }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
        <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${item.dot}`} />

            <span className="text-sm text-gray-600">{item.label}</span>
        </div>

        <span className={`text-lg font-semibold ${item.text}`}>
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
        <div className="px-5 md:px-7 py-6 border-b border-gray-100 last:border-0">
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:items-center">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-display text-xl text-[#0b1b34]">
                            {equipmentName}
                        </h3>

                        <StatusPill color={isReturn ? "purple" : "yellow"}>
                            {isReturn ? "Return Scheduled" : "Pending"}
                        </StatusPill>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                        <p className="text-gray-500">
                            Customer{" "}
                            <span className="text-gray-700 font-medium">
                                {customerName}
                            </span>
                        </p>

                        {!isReturn ? (
                            <p className="text-gray-500 truncate max-w-xl">
                                Destination{" "}
                                <span className="text-gray-700">
                                    {address}
                                </span>
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                Deadline{" "}
                                <span className="text-gray-700 font-medium">
                                    {returnDeadline}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <select
                        value={selectedAgent || ""}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        className="w-full sm:w-56 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:bg-white focus:border-[#0b1b34] transition"
                    >
                        <option value="">
                            Select {isReturn ? "return" : "delivery"} agent
                        </option>

                        {agents.length === 0 ? (
                            <option disabled>No agents available</option>
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
                        className="px-5 py-3 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                    >
                        {assigning
                            ? "Assigning..."
                            : isReturn
                            ? "Assign Return"
                            : "Assign"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmptyState = ({ title, description }) => (
    <div className="px-6 py-14 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-semibold mb-5">
            ✓
        </div>

        <h3 className="font-display text-2xl text-[#0b1b34]">
            {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
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
            <div className="min-h-screen bg-[#f8fafc]">
                <AdminNavbar />

                <main className="max-w-7xl mx-auto px-6 lg:px-8 py-14 animate-pulse">
                    <div className="h-3 w-40 bg-gray-200 rounded mb-5" />
                    <div className="h-14 w-80 bg-gray-200 rounded-xl mb-5" />
                    <div className="h-4 w-[500px] max-w-full bg-gray-200 rounded mb-14" />

                    <div className="h-56 bg-[#0b1b34] rounded-3xl mb-10" />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 bg-white border border-gray-200 rounded-2xl"
                            />
                        ))}
                    </div>

                    <div className="h-80 bg-white border border-gray-200 rounded-3xl mb-8" />
                    <div className="h-80 bg-white border border-gray-200 rounded-3xl mb-8" />
                </main>
            </div>
        );
    }

    if (error && !dashboard) {
        return (
            <div className="min-h-screen bg-[#f8fafc]">
                <AdminNavbar />

                <main className="min-h-[70vh] flex items-center justify-center px-6">
                    <div className="max-w-lg text-center">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-red-400 mb-4">
                            Dashboard Error
                        </p>

                        <h1 className="font-display text-4xl text-[#0b1b34]">
                            Unable to load dashboard
                        </h1>

                        <p className="text-gray-500 mt-4 leading-relaxed">
                            {error}
                        </p>

                        <button
                            onClick={() => {
                                dispatch(getAdminDashboard());
                                dispatch(getUnassignedDeliveries());
                                dispatch(getDeliveryAgents());
                                dispatch(getAllDeliveries());
                            }}
                            className="mt-7 px-6 py-3 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition"
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
            label: "Pending",
            value: rentals.pending,
            dot: "bg-yellow-500",
            text: "text-yellow-600",
        },
        {
            label: "Approved",
            value: rentals.approved,
            dot: "bg-blue-500",
            text: "text-blue-600",
        },
        {
            label: "Completed",
            value: rentals.completed,
            dot: "bg-green-500",
            text: "text-green-600",
        },
        {
            label: "Rejected",
            value: rentals.rejected,
            dot: "bg-red-500",
            text: "text-red-600",
        },
        {
            label: "Cancelled",
            value: rentals.cancelled,
            dot: "bg-gray-500",
            text: "text-gray-600",
        },
    ];

    const deliveryStatuses = [
        {
            label: "Pending",
            value: deliveries.pending,
            dot: "bg-yellow-500",
            text: "text-yellow-600",
        },
        {
            label: "Out for Delivery",
            value: deliveries.outForDelivery,
            dot: "bg-blue-500",
            text: "text-blue-600",
        },
        {
            label: "Delivered",
            value: deliveries.delivered,
            dot: "bg-green-500",
            text: "text-green-600",
        },
        {
            label: "Return Scheduled",
            value: deliveries.returnScheduled ?? 0,
            dot: "bg-orange-500",
            text: "text-orange-600",
        },
        {
            label: "Out for Return",
            value: deliveries.outForReturn ?? 0,
            dot: "bg-purple-500",
            text: "text-purple-600",
        },
        {
            label: "Returned",
            value: deliveries.returned,
            dot: "bg-emerald-500",
            text: "text-emerald-600",
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
        <div className="min-h-screen bg-[#f8fafc]">
            <AdminNavbar />

            {/* HERO */}
            <section className="bg-[#0b1b34] text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
                    <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
                        <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-5">
                                RentVerse Administration
                            </p>

                            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
                                Manage the
                                <br />
                                <span className="text-white/45">
                                    marketplace.
                                </span>
                            </h1>

                            <p className="max-w-xl mt-7 text-base md:text-lg text-white/60 leading-relaxed">
                                Monitor rentals, coordinate deliveries, manage
                                returns, and keep the RentVerse marketplace
                                moving.
                            </p>
                        </div>

                        <div className="border-l border-white/10 pl-7 min-w-[190px]">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                                Needs attention
                            </p>

                            <p className="font-display text-6xl mt-2">
                                {rentals.pending}
                            </p>

                            <p className="text-sm text-white/50 mt-1">
                                pending rentals
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/admin/rentals")
                                }
                                className="mt-6 text-sm font-medium text-white hover:text-blue-300 transition"
                            >
                                Review rentals →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <main>
                {/* OVERVIEW */}
                <section className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8">
                            <Metric
                                label="Total Users"
                                value={users.total}
                                description="accounts"
                            />

                            <Metric
                                label="Equipment"
                                value={equipment.total}
                                description="listed"
                            />

                            <Metric
                                label="Rentals"
                                value={rentals.total}
                                description="requests"
                            />

                            <Metric
                                label="Deliveries"
                                value={deliveries.total}
                                description="records"
                            />
                        </div>
                    </div>
                </section>

                {/* RENTALS */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <SectionIntro
                        eyebrow="01 / Rental Activity"
                        title="Rental overview"
                        description="A quick view of the current rental lifecycle across the marketplace."
                        buttonText="See all rentals"
                        onClick={() => navigate("/admin/rentals")}
                    />

                    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
                        <div className="grid lg:grid-cols-[0.8fr_2fr]">
                            <div className="bg-[#0b1b34] text-white p-7 md:p-9">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                                    Total rentals
                                </p>

                                <p className="font-display text-6xl mt-3">
                                    {rentals.total}
                                </p>

                                <p className="text-sm text-white/50 mt-3 max-w-xs leading-relaxed">
                                    All rental requests currently recorded on
                                    the platform.
                                </p>
                            </div>

                            <div className="p-6 md:p-9">
                                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-x-8">
                                    {rentalStatuses.map((item) => (
                                        <StatusLine
                                            key={item.label}
                                            item={item}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DELIVERY */}
                <section className="bg-[#eef2f6]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                        <SectionIntro
                            eyebrow="02 / Delivery Activity"
                            title="The delivery lifecycle"
                            description="Track every stage from assignment to delivery, return, and completion."
                            buttonText="See all deliveries"
                            onClick={() => navigate("/admin/deliveries")}
                        />

                        <div className="grid lg:grid-cols-[0.75fr_1.5fr] bg-white border border-gray-200 rounded-3xl overflow-hidden">
                            <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                    Total deliveries
                                </p>

                                <p className="font-display text-6xl text-[#0b1b34] mt-3">
                                    {deliveries.total}
                                </p>

                                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                                    All delivery and return records in the
                                    system.
                                </p>
                            </div>

                            <div className="p-7 md:p-10">
                                <div className="grid sm:grid-cols-2">
                                    {deliveryStatuses.map((item) => (
                                        <div
                                            key={item.label}
                                            className="pr-8"
                                        >
                                            <StatusLine item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DELIVERY ASSIGNMENTS */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <SectionIntro
                        eyebrow="03 / Delivery Management"
                        title="Assign delivery work"
                        description={
                            unassignedDeliveries.length > 0
                                ? `${unassignedDeliveries.length} deliveries are waiting for a delivery agent.`
                                : "All current deliveries have been assigned."
                        }
                        buttonText={
                            unassignedDeliveries.length > 3
                                ? "See all assignments"
                                : undefined
                        }
                        onClick={() =>
                            navigate("/admin/deliveries/unassigned")
                        }
                    />

                    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
                        {unassignedDeliveries.length === 0 ? (
                            <EmptyState
                                title="Everything is assigned"
                                description="There are currently no deliveries waiting for a delivery worker."
                            />
                        ) : (
                            <>
                                {visibleDeliveries.map((delivery) => (
                                    <AssignmentRow
                                        key={delivery._id}
                                        delivery={delivery}
                                        agents={deliveryAgents}
                                        selectedAgent={
                                            selectedAgents[delivery._id]
                                        }
                                        setSelectedAgent={(value) =>
                                            setSelectedAgents((prev) => ({
                                                ...prev,
                                                [delivery._id]: value,
                                            }))
                                        }
                                        assigning={
                                            assigningDelivery === delivery._id
                                        }
                                        onAssign={() =>
                                            handleAssignWorker(
                                                delivery._id
                                            )
                                        }
                                    />
                                ))}

                                {unassignedDeliveries.length > 3 && (
                                    <div className="px-6 md:px-7 py-5 bg-[#f8fafc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <p className="text-xs text-gray-500">
                                            Showing{" "}
                                            <span className="font-semibold text-gray-700">
                                                3
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-semibold text-gray-700">
                                                {unassignedDeliveries.length}
                                            </span>{" "}
                                            pending assignments
                                        </p>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    "/admin/deliveries/unassigned"
                                                )
                                            }
                                            className="text-sm font-medium text-[#0b1b34] hover:text-blue-600 transition"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* RETURN ASSIGNMENTS */}
                <section className="bg-[#0b1b34] text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                        <SectionIntro
                            dark
                            eyebrow="04 / Return Management"
                            title="Coordinate returns"
                            description={
                                returnAssignments.length > 0
                                    ? `${returnAssignments.length} delivered rentals are waiting for a return agent.`
                                    : "All scheduled returns have been assigned."
                            }
                            buttonText={
                                returnAssignments.length > 3
                                    ? "See all returns"
                                    : undefined
                            }
                            onClick={() =>
                                navigate("/admin/deliveries")
                            }
                        />

                        <div className="bg-white text-[#0b1b34] rounded-3xl overflow-hidden">
                            {returnAssignments.length === 0 ? (
                                <EmptyState
                                    title="No pending return assignments"
                                    description="There are currently no scheduled returns waiting for a return agent."
                                />
                            ) : (
                                <>
                                    {visibleReturnAssignments.map(
                                        (delivery) => (
                                            <AssignmentRow
                                                key={delivery._id}
                                                delivery={delivery}
                                                type="return"
                                                agents={deliveryAgents}
                                                selectedAgent={
                                                    selectedReturnAgents[
                                                        delivery._id
                                                    ]
                                                }
                                                setSelectedAgent={(value) =>
                                                    setSelectedReturnAgents(
                                                        (prev) => ({
                                                            ...prev,
                                                            [delivery._id]:
                                                                value,
                                                        })
                                                    )
                                                }
                                                assigning={
                                                    assigningReturn ===
                                                    delivery._id
                                                }
                                                onAssign={() =>
                                                    handleAssignReturnAgent(
                                                        delivery._id
                                                    )
                                                }
                                            />
                                        )
                                    )}

                                    {returnAssignments.length > 3 && (
                                        <div className="px-6 md:px-7 py-5 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <p className="text-xs text-gray-500">
                                                Showing{" "}
                                                <span className="font-semibold text-gray-700">
                                                    3
                                                </span>{" "}
                                                of{" "}
                                                <span className="font-semibold text-gray-700">
                                                    {returnAssignments.length}
                                                </span>{" "}
                                                pending returns
                                            </p>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/admin/deliveries"
                                                    )
                                                }
                                                className="text-sm font-medium text-[#0b1b34] hover:text-blue-600 transition"
                                            >
                                                View all →
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* USERS */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <SectionIntro
                        eyebrow="05 / User Management"
                        title="Know your marketplace"
                        description="A high-level view of the people operating and using RentVerse."
                        buttonText="See all users"
                        onClick={() => navigate("/admin/users")}
                    />

                    <div className="grid lg:grid-cols-[1fr_1.5fr] border-y border-gray-200">
                        <div className="py-8 lg:pr-12 lg:border-r border-gray-200">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                Total users
                            </p>

                            <p className="font-display text-7xl text-[#0b1b34] mt-3">
                                {users.total}
                            </p>

                            <p className="text-sm text-gray-500 mt-3">
                                Registered accounts across the platform.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-12 px-0 lg:px-12 py-5">
                            <Metric
                                label="Delivery Agents"
                                value={users.deliveryAgents}
                                description="workers"
                            />

                            <Metric
                                label="Customers"
                                value={
                                    users.total - users.deliveryAgents
                                }
                                description="accounts"
                            />

                            <Metric
                                label="Pending Rentals"
                                value={rentals.pending}
                                description="review"
                            />

                            <Metric
                                label="Active Deliveries"
                                value={deliveries.outForDelivery}
                                description="in transit"
                            />
                        </div>
                    </div>
                </section>

                {/* EQUIPMENT */}
                <section className="bg-[#eef2f6]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                        <SectionIntro
                            eyebrow="06 / Platform Resources"
                            title="Equipment inventory"
                            description="Keep track of the equipment available throughout the marketplace."
                            buttonText="See all equipment"
                            onClick={() => navigate("/admin/equipment")}
                        />

                        <div className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 overflow-hidden rounded-3xl">
                            <div className="bg-white p-8 md:p-10">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                    Total equipment
                                </p>

                                <p className="font-display text-6xl text-[#0b1b34] mt-3">
                                    {equipment.total}
                                </p>

                                <p className="text-sm text-gray-500 mt-4">
                                    Equipment currently listed on the
                                    marketplace.
                                </p>
                            </div>

                            <div className="bg-[#dceee4] p-8 md:p-10">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700/60">
                                    Available equipment
                                </p>

                                <p className="font-display text-6xl text-emerald-700 mt-3">
                                    {equipment.available}
                                </p>

                                <p className="text-sm text-emerald-800/60 mt-4">
                                    Currently available for rental.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;