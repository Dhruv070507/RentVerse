import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyDeliveries } from "../../features/delivery/deliverySlice";

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
            (delivery) =>
                delivery.deliveryStatus === filter
        );
    }, [history, filter]);


    const getStatusStyle = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-700";

            case "returned":
                return "bg-emerald-100 text-emerald-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
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
        if (!date) return "Not available";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };


    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <header className="bg-white border-b border-gray-100">

                <div className="max-w-6xl mx-auto px-6 py-5">

                    <Link
                        to="/agent/dashboard"
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        ← Back to Dashboard
                    </Link>

                    <div className="mt-4">

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Delivery History
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            View your completed delivery operations
                        </p>

                    </div>

                </div>

            </header>


            <main className="max-w-6xl mx-auto px-6 py-8">

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
                        {error}
                    </div>
                )}


                {/* FILTERS */}

                <div className="flex flex-wrap gap-3 mb-6">

                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            filter === "all"
                                ? "bg-black text-white"
                                : "bg-white border border-gray-200 text-gray-600"
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("delivered")}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            filter === "delivered"
                                ? "bg-black text-white"
                                : "bg-white border border-gray-200 text-gray-600"
                        }`}
                    >
                        Delivered
                    </button>

                    <button
                        onClick={() => setFilter("returned")}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            filter === "returned"
                                ? "bg-black text-white"
                                : "bg-white border border-gray-200 text-gray-600"
                        }`}
                    >
                        Returned
                    </button>

                    <button
                        onClick={() => setFilter("cancelled")}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            filter === "cancelled"
                                ? "bg-black text-white"
                                : "bg-white border border-gray-200 text-gray-600"
                        }`}
                    >
                        Cancelled
                    </button>

                </div>


                {/* HISTORY */}

                <div className="bg-white rounded-2xl border border-gray-100">

                    <div className="px-6 py-5 border-b border-gray-100">

                        <h2 className="font-semibold text-gray-900">
                            History
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {filteredDeliveries.length} records
                        </p>

                    </div>


                    {loading && (
                        <div className="px-6 py-12 text-center text-gray-500">
                            Loading history...
                        </div>
                    )}


                    {!loading &&
                        filteredDeliveries.length === 0 && (
                            <div className="px-6 py-16 text-center">

                                <div className="text-4xl mb-4">
                                    📋
                                </div>

                                <h3 className="font-medium text-gray-900">
                                    No history found
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Completed deliveries will appear
                                    here.
                                </p>

                            </div>
                        )}


                    {!loading &&
                        filteredDeliveries.length > 0 && (

                            <div className="divide-y divide-gray-100">

                                {filteredDeliveries.map(
                                    (delivery) => {

                                        const equipment =
                                            delivery.rental?.equipment;

                                        return (
                                            <div
                                                key={delivery._id}
                                                className="p-6"
                                            >

                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                                    {/* EQUIPMENT */}

                                                    <div className="flex gap-4">

                                                        <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">

                                                            {equipment?.images?.[0] ? (

                                                                <img
                                                                    src={
                                                                        equipment.images[0]
                                                                    }
                                                                    alt={
                                                                        equipment.name ||
                                                                        "Equipment"
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                />

                                                            ) : (

                                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                    📦
                                                                </div>

                                                            )}

                                                        </div>


                                                        <div>

                                                            <h3 className="font-semibold text-gray-900">
                                                                {equipment?.name ||
                                                                    "Equipment"}
                                                            </h3>

                                                            <p className="text-sm text-gray-500 mt-1">
                                                                Rental:{" "}
                                                                {formatDate(
                                                                    delivery
                                                                        .rental
                                                                        ?.rentalStartDate
                                                                )}
                                                                {" → "}
                                                                {formatDate(
                                                                    delivery
                                                                        .rental
                                                                        ?.rentalEndDate
                                                                )}
                                                            </p>

                                                            <p className="text-xs text-gray-400 mt-1">
                                                                ID:{" "}
                                                                {
                                                                    delivery._id
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* STATUS */}

                                                    <div className="flex items-center gap-4">

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
                                                            className="text-sm font-medium text-gray-900 hover:underline"
                                                        >
                                                            View
                                                        </Link>

                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                        )}

                </div>

            </main>

        </div>
    );
};

export default DeliveryHistory;