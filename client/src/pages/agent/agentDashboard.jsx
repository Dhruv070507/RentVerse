import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyDeliveries } from "../../features/delivery/deliverySlice";
import AgentNavbar from "../../components/agentNavbar"

const AgentDashboard = () => {
    const dispatch = useDispatch();

    const {
        deliveries,
        loading,
        error,
    } = useSelector((state) => state.delivery);

    useEffect(() => {
        dispatch(getMyDeliveries());
    }, [dispatch]);

    // ===============================
    // DELIVERY COUNTS
    // ===============================

    const stats = useMemo(() => {
        return {
            total: deliveries.length,

            pending: deliveries.filter(
                (delivery) =>
                    delivery.deliveryStatus === "pending"
            ).length,

            active: deliveries.filter(
                (delivery) =>
                    delivery.deliveryStatus === "out_for_delivery" ||
                    delivery.deliveryStatus === "out_for_return"
            ).length,

            delivered: deliveries.filter(
                (delivery) =>
                    delivery.deliveryStatus === "delivered"
            ).length,

            returned: deliveries.filter(
                (delivery) =>
                    delivery.deliveryStatus === "returned"
            ).length,
        };
    }, [deliveries]);

    // ===============================
    // STATUS LABEL
    // ===============================

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

    // ===============================
    // STATUS STYLE
    // ===============================

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "out_for_delivery":
                return "bg-blue-100 text-blue-700";

            case "delivered":
                return "bg-green-100 text-green-700";

            case "return_scheduled":
                return "bg-purple-100 text-purple-700";

            case "out_for_return":
                return "bg-orange-100 text-orange-700";

            case "returned":
                return "bg-emerald-100 text-emerald-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // ===============================
    // DATE FORMAT
    // ===============================

    const formatDate = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <AgentNavbar />

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Delivery Dashboard
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage your deliveries and returns
                            </p>
                        </div>

                        <div className="text-sm text-gray-500">
                            RentVerse
                        </div>

                    </div>

                </div>
            </header>


            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* ================= STATS ================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

                    {/* Total */}

                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">
                            Total Deliveries
                        </p>

                        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                            {stats.total}
                        </h2>
                    </div>


                    {/* Pending */}

                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">
                            Pending
                        </p>

                        <h2 className="text-3xl font-semibold text-yellow-600 mt-2">
                            {stats.pending}
                        </h2>
                    </div>


                    {/* Active */}

                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">
                            Active
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-2">
                            {stats.active}
                        </h2>
                    </div>


                    {/* Delivered */}

                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">
                            Delivered
                        </p>

                        <h2 className="text-3xl font-semibold text-green-600 mt-2">
                            {stats.delivered}
                        </h2>
                    </div>


                    {/* Returned */}

                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">
                            Returned
                        </p>

                        <h2 className="text-3xl font-semibold text-emerald-600 mt-2">
                            {stats.returned}
                        </h2>
                    </div>

                </div>


                {/* ================= ERROR ================= */}

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
                        {error}
                    </div>
                )}


                {/* ================= DELIVERY LIST ================= */}

                <div className="bg-white border border-gray-100 rounded-2xl">

                    <div className="px-6 py-5 border-b border-gray-100">

                        <h2 className="text-lg font-semibold text-gray-900">
                            My Deliveries
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Deliveries assigned to you
                        </p>

                    </div>


                    {/* Loading */}

                    {loading && (
                        <div className="px-6 py-12 text-center text-gray-500">
                            Loading deliveries...
                        </div>
                    )}


                    {/* Empty */}

                    {!loading && deliveries.length === 0 && (
                        <div className="px-6 py-16 text-center">

                            <div className="text-4xl mb-4">
                                📦
                            </div>

                            <h3 className="text-lg font-medium text-gray-900">
                                No deliveries yet
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Your assigned deliveries will appear here.
                            </p>

                        </div>
                    )}


                    {/* Delivery Cards */}

                    {!loading && deliveries.length > 0 && (

                        <div className="divide-y divide-gray-100">

                            {deliveries.map((delivery) => {

                                const equipment =
                                    delivery.rental?.equipment;

                                return (
                                    <div
                                        key={delivery._id}
                                        className="p-6 hover:bg-gray-50 transition"
                                    >

                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                            {/* LEFT */}

                                            <div className="flex gap-4">

                                                {/* Image */}

                                                <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">

                                                    {equipment?.images?.[0] ? (

                                                        <img
                                                            src={equipment.images[0]}
                                                            alt={equipment.name || "Equipment"}
                                                            className="w-full h-full object-cover"
                                                        />

                                                    ) : (

                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            📦
                                                        </div>

                                                    )}

                                                </div>


                                                {/* Information */}

                                                <div>

                                                    <h3 className="font-semibold text-gray-900">
                                                        {equipment?.name ||
                                                            "Equipment"}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Delivery ID:{" "}
                                                        {delivery._id}
                                                    </p>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Delivery Date:{" "}
                                                        {formatDate(
                                                            delivery.deliveryDate
                                                        )}
                                                    </p>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Address:{" "}
                                                        {delivery.deliveryAddress ||
                                                            "Not available"}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* RIGHT */}

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                                                <span
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                                                        delivery.deliveryStatus
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        delivery.deliveryStatus
                                                    )}
                                                </span>


                                                <Link
                                                    to={`/agent/delivery/${delivery._id}`}
                                                    className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                                                >
                                                    View Details
                                                </Link>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
};

export default AgentDashboard;