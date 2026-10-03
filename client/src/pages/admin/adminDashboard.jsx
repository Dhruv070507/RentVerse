import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminDashboard,
    getUnassignedDeliveries,
    getDeliveryAgents,
    assignDeliveryAgent,
} from "../../features/adminSlice";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/adminNavbar.jsx";
import Footer from "../../components/Footer.jsx";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        dashboard,
        loading,
        error,
        unassignedDeliveries = [],
        deliveryAgents = [],
    } = useSelector((state) => state.admin);

    const [selectedAgents, setSelectedAgents] = useState({});
    const [assigningDelivery, setAssigningDelivery] = useState(null);

    useEffect(() => {
        dispatch(getAdminDashboard());
        dispatch(getUnassignedDeliveries());
        dispatch(getDeliveryAgents());
    }, [dispatch]);

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

                dispatch(getAdminDashboard());
                dispatch(getUnassignedDeliveries());
            }
        } finally {
            setAssigningDelivery(null);
        }
    };

    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading && !dashboard) {
        return (
            <div className="min-h-screen bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 animate-pulse">
                    <div className="h-4 w-36 bg-gray-200 rounded mb-5" />
                    <div className="h-12 w-72 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-5 w-[500px] max-w-full bg-gray-200 rounded mb-12" />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 bg-white border border-gray-200 rounded-2xl"
                            />
                        ))}
                    </div>

                    <div className="h-64 bg-white border border-gray-200 rounded-3xl mb-6" />
                    <div className="h-64 bg-white border border-gray-200 rounded-3xl mb-6" />
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error && !dashboard) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-xl font-bold mb-5">
                        !
                    </div>

                    <p className="text-xs tracking-[0.2em] text-red-400 uppercase mb-3">
                        Something went wrong
                    </p>

                    <h2 className="font-display text-3xl text-[#0b1b34]">
                        Unable to load dashboard
                    </h2>

                    <p className="text-gray-500 mt-3 leading-relaxed">
                        {error}
                    </p>

                    <button
                        onClick={() => {
                            dispatch(getAdminDashboard());
                            dispatch(getUnassignedDeliveries());
                            dispatch(getDeliveryAgents());
                        }}
                        className="mt-7 px-6 py-3 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!dashboard) return null;

    const { users, equipment, rentals, deliveries } = dashboard;

    // --------------------------------------------------
    // DATA
    // --------------------------------------------------

    const overviewStats = [
        {
            label: "Total Users",
            value: users.total,
            description: "Registered accounts",
            icon: "U",
            iconClass: "bg-[#0b1b34] text-white",
        },
        {
            label: "Equipment",
            value: equipment.total,
            description: "Listed equipment",
            icon: "E",
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            label: "Rentals",
            value: rentals.total,
            description: "Rental requests",
            icon: "R",
            iconClass: "bg-purple-50 text-purple-600",
        },
        {
            label: "Deliveries",
            value: deliveries.total,
            description: "Delivery records",
            icon: "D",
            iconClass: "bg-orange-50 text-orange-600",
        },
    ];

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
            label: "Returned",
            value: deliveries.returned,
            dot: "bg-emerald-500",
            text: "text-emerald-600",
        },
    ];

    // Only show a few on the dashboard.
    const visibleDeliveries = unassignedDeliveries.slice(0, 3);

    // --------------------------------------------------
    // SMALL COMPONENTS
    // --------------------------------------------------

    const SectionHeader = ({
        eyebrow,
        title,
        description,
        buttonText,
        onClick,
    }) => (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
                <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                    {eyebrow}
                </p>

                <h2 className="font-display text-3xl text-[#0b1b34]">
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
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[#0b1b34] hover:text-blue-600 transition"
                >
                    {buttonText}

                    <span className="group-hover:translate-x-1 transition-transform">
                        →
                    </span>
                </button>
            )}
        </div>
    );

    const StatusRow = ({ item }) => (
        <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
                <span
                    className={`w-2.5 h-2.5 rounded-full ${item.dot}`}
                />

                <span className="text-sm text-gray-600">
                    {item.label}
                </span>
            </div>

            <span className={`text-lg font-semibold ${item.text}`}>
                {item.value}
            </span>
        </div>
    );

    // --------------------------------------------------
    // MAIN UI
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">

            <AdminNavbar />

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-blue-400/10 blur-[100px]" />

                <div className="absolute top-[40%] -left-40 w-[450px] h-[450px] rounded-full bg-purple-400/10 blur-[110px]" />

                <div className="absolute bottom-[-200px] right-[20%] w-[500px] h-[400px] rounded-full bg-orange-300/10 blur-[100px]" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20">

                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                        <div>
                            <p className="text-[11px] tracking-[0.25em] text-gray-400 uppercase mb-3">
                                RentVerse Administration
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-[#0b1b34]">
                                Manage your
                                <br />
                                <span className="text-gray-400">
                                    marketplace.
                                </span>
                            </h1>

                            <p className="max-w-xl mt-5 text-base text-gray-500 leading-relaxed">
                                A quick overview of your marketplace activity,
                                rentals, deliveries, and resources.
                            </p>
                        </div>

                        {/* Pending rental alert */}
                        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center font-semibold">
                                {rentals.pending}
                            </div>

                            <div>
                                <p className="text-[11px] uppercase tracking-wider text-gray-400">
                                    Pending Rentals
                                </p>

                                <p className="text-sm font-semibold text-[#0b1b34] mt-1">
                                    Awaiting review
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* =================================================
                    1. OVERVIEW
                ================================================= */}

                <section className="mb-12">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                                At a glance
                            </p>

                            <h2 className="font-display text-2xl text-[#0b1b34] mt-1">
                                Overview
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                        {overviewStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-gray-400">
                                            {stat.label}
                                        </p>

                                        <p className="font-display text-4xl text-[#0b1b34] mt-2">
                                            {stat.value}
                                        </p>
                                    </div>

                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold ${stat.iconClass}`}
                                    >
                                        {stat.icon}
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 mt-5">
                                    {stat.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>

                {/* =================================================
                    2. RENTAL ACTIVITY
                ================================================= */}

                <section className="mb-10">

                    <SectionHeader
                        eyebrow="Rental Activity"
                        title="Rental Overview"
                        description="Current rental activity across the marketplace"
                        buttonText="See All Rentals"
                        onClick={() => navigate("/admin/rentals")}
                    />

                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                        <div className="p-6 md:p-8">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-7">

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400">
                                        Total Rentals
                                    </p>

                                    <p className="font-display text-5xl text-[#0b1b34] mt-1">
                                        {rentals.total}
                                    </p>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

                                {rentalStatuses.map((item) => (
                                    <div
                                        key={item.label}
                                        className="bg-gray-50 rounded-2xl px-4 py-4"
                                    >
                                        <div className="flex items-center gap-2">

                                            <span
                                                className={`w-2 h-2 rounded-full ${item.dot}`}
                                            />

                                            <span className="text-xs text-gray-500">
                                                {item.label}
                                            </span>

                                        </div>

                                        <p
                                            className={`text-2xl font-semibold mt-3 ${item.text}`}
                                        >
                                            {item.value}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    3. DELIVERY ACTIVITY
                ================================================= */}

                <section className="mb-10">

                    <SectionHeader
                        eyebrow="Delivery Activity"
                        title="Delivery Overview"
                        description="Track the current delivery lifecycle"
                        buttonText="See All Deliveries"
                        onClick={() => navigate("/admin/deliveries")}
                    />

                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm">

                        <div className="grid grid-cols-1 lg:grid-cols-3">

                            {/* Total */}
                            <div className="p-7 lg:border-r border-gray-100">

                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Total Deliveries
                                </p>

                                <p className="font-display text-5xl text-[#0b1b34] mt-2">
                                    {deliveries.total}
                                </p>

                                

                                <p className="text-sm text-gray-500 mt-3">
                                    All delivery records in the system
                                </p>

                            </div>

                            {/* Status list */}
                            <div className="lg:col-span-2 p-7">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">

                                    {deliveryStatuses.map((item) => (
                                        <StatusRow
                                            key={item.label}
                                            item={item}
                                        />
                                    ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                {/* =================================================
                    4. DELIVERY ASSIGNMENTS
                ================================================= */}

                <section className="mb-10">

                    <SectionHeader
                        eyebrow="Delivery Management"
                        title="Pending Assignments"
                        description={
                            unassignedDeliveries.length > 0
                                ? `${unassignedDeliveries.length} deliveries waiting for a worker`
                                : "All deliveries have been assigned"
                        }
                        buttonText={
                            unassignedDeliveries.length > 3
                                ? "See All Assignments"
                                : undefined
                        }
                        onClick={() =>
                            navigate("/admin/deliveries/unassigned")
                        }
                    />

                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                        {unassignedDeliveries.length === 0 ? (

                            <div className="px-6 py-14 text-center">

                                <div className="w-14 h-14 mx-auto rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl font-semibold mb-4">
                                    ✓
                                </div>

                                <h3 className="font-display text-2xl text-[#0b1b34]">
                                    Everything is assigned
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    There are currently no deliveries waiting
                                    for a delivery worker.
                                </p>

                            </div>

                        ) : (

                            <>
                                {visibleDeliveries.map((delivery) => {

                                    const rental = delivery.rental;

                                    const equipmentName =
                                        rental?.equipment?.name ||
                                        "Equipment";

                                    const customerName =
                                        rental?.renter?.username ||
                                        "Unknown customer";

                                    const address =
                                        delivery.deliveryAddress ||
                                        rental?.address ||
                                        "Address not available";

                                    return (
                                        <div
                                            key={delivery._id}
                                            className="px-6 md:px-8 py-5 border-b border-gray-100 last:border-0"
                                        >

                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                                {/* Delivery information */}
                                                <div className="flex items-start gap-4 min-w-0">

                                                    <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 font-semibold">
                                                        D
                                                    </div>

                                                    <div className="min-w-0">

                                                        <div className="flex flex-wrap items-center gap-2">

                                                            <h3 className="font-semibold text-[#0b1b34]">
                                                                {equipmentName}
                                                            </h3>

                                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-[11px] font-medium">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                                                Pending
                                                            </span>

                                                        </div>

                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 mt-1.5">

                                                            <p className="text-sm text-gray-500">
                                                                Customer:{" "}
                                                                <span className="text-gray-700 font-medium">
                                                                    {customerName}
                                                                </span>
                                                            </p>

                                                            <p className="text-sm text-gray-500 truncate max-w-md">
                                                                To:{" "}
                                                                <span className="text-gray-700">
                                                                    {address}
                                                                </span>
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* Assignment controls */}
                                                <div className="flex flex-col sm:flex-row gap-2 shrink-0">

                                                    <select
                                                        value={
                                                            selectedAgents[
                                                                delivery._id
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedAgents(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [delivery._id]:
                                                                        e.target.value,
                                                                })
                                                            )
                                                        }
                                                        className="w-full sm:w-56 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:bg-white focus:border-[#0b1b34] transition"
                                                    >
                                                        <option value="">
                                                            Select worker
                                                        </option>

                                                        {deliveryAgents.length ===
                                                        0 ? (
                                                            <option disabled>
                                                                No workers available
                                                            </option>
                                                        ) : (
                                                            deliveryAgents.map(
                                                                (agent) => (
                                                                    <option
                                                                        key={
                                                                            agent._id
                                                                        }
                                                                        value={
                                                                            agent._id
                                                                        }
                                                                    >
                                                                        {
                                                                            agent.username
                                                                        }
                                                                    </option>
                                                                )
                                                            )
                                                        )}
                                                    </select>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            !selectedAgents[
                                                                delivery._id
                                                            ] ||
                                                            assigningDelivery ===
                                                                delivery._id
                                                        }
                                                        onClick={() =>
                                                            handleAssignWorker(
                                                                delivery._id
                                                            )
                                                        }
                                                        className="px-5 py-2.5 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                                                    >
                                                        {assigningDelivery ===
                                                        delivery._id
                                                            ? "Assigning..."
                                                            : "Assign"}
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}

                                {/* See all footer */}
                                {unassignedDeliveries.length > 3 && (
                                    <div className="px-6 md:px-8 py-4 bg-gray-50/70 flex items-center justify-between">

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


{/* =================================================
    5. USERS
================================================= */}

<section className="mb-10">

    <SectionHeader
        eyebrow="User Management"
        title="Users"
        description="Quick overview of accounts across RentVerse"
        buttonText="See All Users"
        onClick={() => navigate("/admin/users")}
    />

    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

        <div className="p-6 md:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-7">

                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                        Total Users
                    </p>

                    <p className="font-display text-5xl text-[#0b1b34] mt-1">
                        {users.total}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        Registered accounts on the platform
                    </p>
                </div>


            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                {/* Delivery Agents */}
                <div className="bg-orange-50/70 rounded-2xl p-4">

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />

                        <p className="text-xs text-gray-500">
                            Delivery Agents
                        </p>
                    </div>

                    <p className="font-display text-3xl text-orange-600 mt-3">
                        {users.deliveryAgents}
                    </p>

                </div>

                {/* Customers */}
                <div className="bg-blue-50/70 rounded-2xl p-4">

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />

                        <p className="text-xs text-gray-500">
                            Customers
                        </p>
                    </div>

                    <p className="font-display text-3xl text-blue-600 mt-3">
                        {users.total - users.deliveryAgents}
                    </p>

                </div>

                {/* Pending Rentals */}
                <div className="bg-yellow-50/70 rounded-2xl p-4">

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />

                        <p className="text-xs text-gray-500">
                            Pending Rentals
                        </p>
                    </div>

                    <p className="font-display text-3xl text-yellow-600 mt-3">
                        {rentals.pending}
                    </p>

                </div>

                {/* Active Deliveries */}
                <div className="bg-green-50/70 rounded-2xl p-4">

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />

                        <p className="text-xs text-gray-500">
                            Active Deliveries
                        </p>
                    </div>

                    <p className="font-display text-3xl text-green-600 mt-3">
                        {deliveries.outForDelivery}
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>


{/* =================================================
    6. PLATFORM RESOURCES
================================================= */}

<section>

    <SectionHeader
        eyebrow="Platform Resources"
        title="Resources"
        description="Quick overview of marketplace resources"
        buttonText="See All Equipment "
        onClick={() => navigate("/admin/equipment")}
    />

    <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-7 shadow-sm">

        {/* Equipment Header */}

        <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-lg">
                E
            </div>

            <div>

                <h3 className="font-display text-2xl text-[#0b1b34]">
                    Equipment
                </h3>

                <p className="text-sm text-gray-400 mt-0.5">
                    Marketplace inventory
                </p>

            </div>

        </div>


        {/* Equipment Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">

            {/* Total Equipment */}

            <div className="bg-gray-50 rounded-2xl p-5">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                            Total Equipment
                        </p>

                        <p className="font-display text-4xl text-[#0b1b34] mt-2">
                            {equipment.total}
                        </p>

                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 font-semibold">
                        E
                    </div>

                </div>

                <p className="text-xs text-gray-400 mt-3">
                    Equipment listed on the marketplace
                </p>

            </div>


            {/* Available Equipment */}

            <div className="bg-green-50/70 rounded-2xl p-5">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-[10px] uppercase tracking-wider text-green-600/70">
                            Available Equipment
                        </p>

                        <p className="font-display text-4xl text-green-600 mt-2">
                            {equipment.available}
                        </p>

                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-green-600 font-semibold">
                        ✓
                    </div>

                </div>

                <p className="text-xs text-green-600/60 mt-3">
                    Currently available for rental
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