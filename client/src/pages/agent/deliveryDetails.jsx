import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../components/Footer.jsx";
import {
    getDeliveryById,
    startDelivery,
    generateDeliveryOtp,
    completeDelivery,
    startReturn,
    generateReturnOtp,
    completeReturn,
    clearOtp,
} from "../../features/deliverySlice";

const DeliveryDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        selectedDelivery,
        loading,
        error,
        otp,
    } = useSelector((state) => state.delivery);

    const [deliveryOtp, setDeliveryOtp] = useState("");
    const [returnOtp, setReturnOtp] = useState("");

    useEffect(() => {
        dispatch(getDeliveryById(id));

        return () => {
            dispatch(clearOtp());
        };
    }, [dispatch, id]);

    if (loading && !selectedDelivery) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">
                    Loading delivery...
                </p>
            </div>
        );
    }

    if (!selectedDelivery) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">
                        Delivery not found
                    </h2>

                    <Link
                        to="/agent/dashboard"
                        className="inline-block mt-4 text-sm underline"
                    >
                        Back to dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const delivery = selectedDelivery;
    const rental = delivery.rental;
    const equipment = rental?.equipment;

    const status = delivery.deliveryStatus;

    const formatDate = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleStartDelivery = async () => {
        await dispatch(startDelivery(delivery._id));
        dispatch(getDeliveryById(delivery._id));
    };

    const handleGenerateDeliveryOtp = async () => {
        await dispatch(generateDeliveryOtp(delivery._id));
    };

    const handleCompleteDelivery = async () => {
        if (!deliveryOtp.trim()) return;

        const result = await dispatch(
            completeDelivery({
                deliveryId: delivery._id,
                otp: deliveryOtp,
            })
        );

        if (!result.error) {
            setDeliveryOtp("");
            dispatch(clearOtp());
            dispatch(getDeliveryById(delivery._id));
        }
    };

    const handleStartReturn = async () => {
        await dispatch(startReturn(delivery._id));
        dispatch(getDeliveryById(delivery._id));
    };

    const handleGenerateReturnOtp = async () => {
        await dispatch(generateReturnOtp(delivery._id));
    };

    const handleCompleteReturn = async () => {
        if (!returnOtp.trim()) return;

        const result = await dispatch(
            completeReturn({
                deliveryId: delivery._id,
                otp: returnOtp,
            })
        );

        if (!result.error) {
            setReturnOtp("");
            dispatch(clearOtp());
            dispatch(getDeliveryById(delivery._id));
        }
    };

    const getStatusStyle = () => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "out_for_delivery":
                return "bg-blue-100 text-blue-700";

            case "delivered":
                return "bg-green-100 text-green-700";

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

    const getStatusText = () => {
        switch (status) {
            case "Pending":
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

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <header className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 py-5">

                    <Link
                        to="/agent/dashboard"
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        ← Back to Dashboard
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Delivery Details
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                {delivery._id}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyle()}`}
                        >
                            {getStatusText()}
                        </span>

                    </div>

                </div>
            </header>


            <main className="max-w-5xl mx-auto px-6 py-8">

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
                        {error}
                    </div>
                )}


                {/* EQUIPMENT */}

                <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-5">
                        Equipment
                    </h2>

                    <div className="flex gap-5">

                        <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden">

                            {equipment?.images?.[0] ? (
                                <img
                                    src={equipment.images[0]}
                                    alt={equipment.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    📦
                                </div>
                            )}

                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">
                                {equipment?.name || "Equipment"}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Rental Status:{" "}
                                {rental?.status || "Unknown"}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Rental Period:{" "}
                                {formatDate(rental?.rentalStartDate)}
                                {" → "}
                                {formatDate(rental?.rentalEndDate)}
                            </p>
                        </div>

                    </div>

                </section>


                {/* DELIVERY INFORMATION */}

                <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-5">
                        Delivery Information
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-gray-500">
                                Delivery Address
                            </p>

                            <p className="mt-1 font-medium text-gray-900">
                                {delivery.deliveryAddress ||
                                    "Not available"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Delivery Date
                            </p>

                            <p className="mt-1 font-medium">
                                {formatDateTime(
                                    delivery.deliveryDate
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Delivered At
                            </p>

                            <p className="mt-1 font-medium">
                                {formatDateTime(
                                    delivery.deliveredAt
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Delivery Charges
                            </p>

                            <p className="mt-1 font-medium">
                                ₹{delivery.deliveryCharges || 0}
                            </p>
                        </div>

                    </div>

                </section>


                {/* DELIVERY ACTION */}

                {status === "Pending" && (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                        <h2 className="text-lg font-semibold">
                            Start Delivery
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Start the delivery once you have picked up
                            the equipment.
                        </p>

                        <button
                            onClick={handleStartDelivery}
                            disabled={loading}
                            className="mt-5 px-5 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading
                                ? "Starting..."
                                : "Start Delivery"}
                        </button>

                    </section>
                )}


                {/* DELIVERY OTP */}

                {status === "out_for_delivery" && (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                        <h2 className="text-lg font-semibold">
                            Complete Delivery
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Generate the delivery OTP and verify it
                            with the renter.
                        </p>


                        <button
                            onClick={handleGenerateDeliveryOtp}
                            disabled={loading}
                            className="mt-5 px-5 py-3 border border-gray-900 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                        >
                            Generate Delivery OTP
                        </button>


                        {otp && (
                            <div className="mt-5 bg-gray-50 rounded-xl p-5">

                                <p className="text-sm text-gray-500">
                                    Generated OTP
                                </p>

                                <p className="text-3xl font-bold tracking-widest mt-1">
                                    {otp}
                                </p>

                            </div>
                        )}


                        <div className="mt-5 flex flex-col sm:flex-row gap-3">

                            <input
                                type="text"
                                value={deliveryOtp}
                                onChange={(e) =>
                                    setDeliveryOtp(e.target.value)
                                }
                                placeholder="Enter renter OTP"
                                maxLength={6}
                                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                            />

                            <button
                                onClick={handleCompleteDelivery}
                                disabled={
                                    loading ||
                                    !deliveryOtp.trim()
                                }
                                className="px-5 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                            >
                                Complete Delivery
                            </button>

                        </div>

                    </section>
                )}


                {/* RETURN INFORMATION */}

                {(status === "delivered" ||
                    status === "out_for_return" ||
                    status === "returned") && (

                    <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                        <h2 className="text-lg font-semibold mb-5">
                            Return Information
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Return Start Date
                                </p>

                                <p className="mt-1 font-medium">
                                    {formatDate(
                                        delivery.returnStartDate
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Return Deadline
                                </p>

                                <p className="mt-1 font-medium">
                                    {formatDate(
                                        delivery.returnDeadline
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Returned At
                                </p>

                                <p className="mt-1 font-medium">
                                    {formatDateTime(
                                        delivery.returnedAt
                                    )}
                                </p>
                            </div>

                        </div>

                    </section>
                )}


                {/* START RETURN */}

                {status === "delivered" && (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                        <h2 className="text-lg font-semibold">
                            Return Equipment
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Start the return pickup when the return
                            window is available.
                        </p>

                        <button
                            onClick={handleStartReturn}
                            disabled={loading}
                            className="mt-5 px-5 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading
                                ? "Starting..."
                                : "Start Return"}
                        </button>

                    </section>
                )}


                {/* RETURN OTP */}

                {status === "out_for_return" && (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

                        <h2 className="text-lg font-semibold">
                            Complete Return
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Generate the return OTP and verify it
                            with the renter.
                        </p>

                        <button
                            onClick={handleGenerateReturnOtp}
                            disabled={loading}
                            className="mt-5 px-5 py-3 border border-gray-900 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                        >
                            Generate Return OTP
                        </button>


                        {otp && (
                            <div className="mt-5 bg-gray-50 rounded-xl p-5">

                                <p className="text-sm text-gray-500">
                                    Generated OTP
                                </p>

                                <p className="text-3xl font-bold tracking-widest mt-1">
                                    {otp}
                                </p>

                            </div>
                        )}


                        <div className="mt-5 flex flex-col sm:flex-row gap-3">

                            <input
                                type="text"
                                value={returnOtp}
                                onChange={(e) =>
                                    setReturnOtp(e.target.value)
                                }
                                placeholder="Enter renter OTP"
                                maxLength={6}
                                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                            />

                            <button
                                onClick={handleCompleteReturn}
                                disabled={
                                    loading ||
                                    !returnOtp.trim()
                                }
                                className="px-5 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                            >
                                Complete Return
                            </button>

                        </div>

                    </section>
                )}


                {/* COMPLETED */}

                {status === "returned" && (
                    <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">

                        <h2 className="text-lg font-semibold text-emerald-800">
                            Delivery & Return Completed
                        </h2>

                        <p className="text-sm text-emerald-700 mt-2">
                            The equipment has been successfully
                            returned.
                        </p>

                    </section>
                )}

            </main>

        

            <Footer />
</div>
    );
};

export default DeliveryDetails;