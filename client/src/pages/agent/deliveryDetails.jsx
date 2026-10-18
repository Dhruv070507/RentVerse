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
import AgentNavbar from "../../components/agentNavbar.jsx";
import { IconCheck, IconPackage, IconAlert } from "../../components/Icons.jsx";

const DeliveryDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        selectedDelivery,
        loading,
        error,
    } = useSelector((state) => state.delivery);

    const [deliveryOtp, setDeliveryOtp] = useState("");
    const [returnOtp, setReturnOtp] = useState("");
    const [showReturnOtpSent, setShowReturnOtpSent] = useState(false);

    useEffect(() => {
        dispatch(getDeliveryById(id));

        return () => {
            dispatch(clearOtp());
        };
    }, [dispatch, id]);

    if (loading && !selectedDelivery) {
        return (
            <div className="min-h-screen bg-slate-50">
                <AgentNavbar />
                <div className="min-h-[70vh] flex items-center justify-center">
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                        Loading delivery assignment...
                    </p>
                </div>
            </div>
        );
    }

    if (!selectedDelivery) {
        return (
            <div className="min-h-screen bg-slate-50">
                <AgentNavbar />
                <div className="min-h-[70vh] flex items-center justify-center px-6">
                    <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
                            <IconPackage className="w-6 h-6" />
                        </div>
                        <h2 className="font-display font-bold text-2xl text-slate-900">
                            Delivery record not found
                        </h2>
                        <p className="text-xs text-slate-500 mt-2">
                            This delivery ID may have been reassigned or does not exist.
                        </p>
                        <Link
                            to="/agent"
                            className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                        >
                            Back to Agent Console
                        </Link>
                    </div>
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
        const result = await dispatch(startDelivery(delivery._id));
        if (startDelivery.fulfilled.match(result)) {
            dispatch(getDeliveryById(delivery._id));
        } else {
            console.error("Start delivery failed:", result.payload);
        }
    };

    const handleGenerateDeliveryOtp = async () => {
        const result = await dispatch(generateDeliveryOtp(delivery._id));
        if (generateDeliveryOtp.fulfilled.match(result)) {
            alert("Delivery OTP sent to renter via notifications.");
        } else {
            console.error("Generate OTP failed:", result.payload);
        }
    };

    const handleCompleteDelivery = async () => {
        if (!deliveryOtp.trim()) return;

        const result = await dispatch(
            completeDelivery({
                deliveryId: delivery._id,
                otp: deliveryOtp,
            })
        );

        if (completeDelivery.fulfilled.match(result)) {
            setDeliveryOtp("");
            dispatch(clearOtp());
            dispatch(getDeliveryById(delivery._id));
        } else {
            console.error("Complete delivery failed:", result.payload);
        }
    };

    const handleStartReturn = async () => {
        const result = await dispatch(startReturn(delivery._id));
        if (startReturn.fulfilled.match(result)) {
            dispatch(getDeliveryById(delivery._id));
        } else {
            console.error("Start return failed:", result.payload);
        }
    };

    const handleGenerateReturnOtp = async () => {
        const result = await dispatch(generateReturnOtp(delivery._id));
        if (generateReturnOtp.fulfilled.match(result)) {
            setShowReturnOtpSent(true);
        } else {
            console.error("Return OTP failed:", result.payload);
        }
    };

    const handleCompleteReturn = async () => {
        if (!returnOtp.trim()) return;

        const result = await dispatch(
            completeReturn({
                deliveryId: delivery._id,
                otp: returnOtp,
            })
        );

        if (completeReturn.fulfilled.match(result)) {
            setReturnOtp("");
            dispatch(clearOtp());
            dispatch(getDeliveryById(delivery._id));
        } else {
            console.error("Complete return failed:", result.payload);
        }
    };

    const getStatusStyle = () => {
        switch (status) {
            case "pending":
                return "bg-slate-100 text-slate-700 border-slate-200";
            case "out_for_delivery":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "delivered":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "return_scheduled":
                return "bg-slate-100 text-slate-700 border-slate-200";
            case "out_for_return":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "returned":
                return "bg-slate-900 text-white border-slate-900";
            case "cancelled":
                return "bg-slate-100 text-slate-700 border-slate-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getStatusText = () => {
        switch (status) {
            case "pending":
                return "Pending Dispatch";
            case "out_for_delivery":
                return "Out for Delivery";
            case "delivered":
                return "Delivered to Customer";
            case "return_scheduled":
                return "Return Scheduled";
            case "out_for_return":
                return "Out for Return";
            case "returned":
                return "Returned to Owner";
            case "cancelled":
                return "Cancelled";
            default:
                return status || "Unknown";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AgentNavbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                {/* Breadcrumbs */}
                <div className="mb-6">
                    <Link
                        to="/agent/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0b1b34] transition"
                    >
                        <span>←</span> Back to Delivery Console
                    </Link>
                </div>

                {/* Header Card */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Fulfillment ID: {delivery._id}
                        </span>
                        <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0b1b34] mt-1">
                            Delivery Order
                        </h1>
                    </div>

                    <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border self-start sm:self-auto ${getStatusStyle()}`}
                    >
                        <span className="w-2 h-2 rounded-full bg-current" />
                        {getStatusText()}
                    </span>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-2">
                        <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Equipment & Rental Overview */}
                <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                    <h2 className="font-display font-bold text-lg text-slate-900 mb-5">
                        Equipment Details
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                        <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                            {equipment?.images?.[0] ? (
                                <img
                                    src={equipment.images[0]}
                                    alt={equipment.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <IconPackage className="w-8 h-8 text-slate-400" />
                            )}
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-display font-bold text-xl text-slate-900">
                                {equipment?.name || "Equipment"}
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                Category: <span className="text-slate-700 font-semibold">{equipment?.category?.name || equipment?.category || "General"}</span>
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                Booking Duration:{" "}
                                <span className="text-slate-700 font-semibold">
                                    {formatDate(rental?.rentalStartDate)} → {formatDate(rental?.rentalEndDate)}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Address & Logistics Info */}
                <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-6">
                    <h2 className="font-display font-bold text-lg text-[#0b1b34] mb-5">
                        Dispatch Destination & Timing
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Delivery Address
                            </p>
                            <p className="mt-1 font-semibold text-sm text-[#0b1b34]">
                                {delivery.deliveryAddress || "Address not provided"}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Scheduled Date
                            </p>
                            <p className="mt-1 font-semibold text-sm text-[#0b1b34]">
                                {formatDateTime(delivery.deliveryDate)}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Delivered Timestamp
                            </p>
                            <p className="mt-1 font-semibold text-sm text-[#0b1b34]">
                                {formatDateTime(delivery.deliveredAt)}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Delivery Allowance / Charges
                            </p>
                            <p className="mt-1 font-semibold text-sm text-slate-900">
                                ₹{delivery.deliveryCharges || 0}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Action Section: Pending Dispatch */}
                {status === "pending" && (
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                            Step 1: Start Pickup
                        </span>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            Ready to collect and transport?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                            Click start delivery once you have picked up the gear from the owner and are en route to the customer's address.
                        </p>

                        <button
                            onClick={handleStartDelivery}
                            disabled={loading}
                            className="mt-5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shadow-sm transition disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Starting..." : "Start Out-for-Delivery"}
                        </button>
                    </section>
                )}

                {/* Action Section: Delivery OTP */}
                {status === "out_for_delivery" && (
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                            Step 2: Customer Handover Verification
                        </span>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            Confirm Doorstep Delivery
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                            Send the one-time passcode to the customer, inspect the equipment together, and enter the OTP they provide to complete delivery.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleGenerateDeliveryOtp}
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                            >
                                {loading ? "Generating..." : "Generate Delivery OTP"}
                            </button>

                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={deliveryOtp}
                                    onChange={(e) => setDeliveryOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-800 tracking-wider outline-none focus:border-blue-600"
                                />

                                <button
                                    onClick={handleCompleteDelivery}
                                    disabled={loading || !deliveryOtp.trim()}
                                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition disabled:opacity-40 cursor-pointer shadow-sm"
                                >
                                    Verify & Complete
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Return Information Details */}
                {(status === "delivered" ||
                    status === "return_scheduled" ||
                    status === "out_for_return" ||
                    status === "returned") && (
                    <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-6">
                        <h2 className="font-display font-bold text-lg text-[#0b1b34] mb-5">
                            Return Schedule Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Return Start Date
                                </p>
                                <p className="mt-1 font-semibold text-sm text-[#0b1b34]">
                                    {formatDate(delivery.returnStartDate)}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Return Deadline
                                </p>
                                <p className="mt-1 font-semibold text-sm text-[#0b1b34]">
                                    {formatDate(delivery.returnDeadline)}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Returned Date
                                </p>
                                <p className="mt-1 font-semibold text-sm text-[#0b1b34]">
                                    {formatDateTime(delivery.returnedAt)}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Start Return */}
                {status === "return_scheduled" && (
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                            Step 3: Return Pickup
                        </span>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            Collect Equipment from Renter
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                            The rental has ended. Start the return process when you are ready to collect the item from the customer.
                        </p>

                        <button
                            onClick={handleStartReturn}
                            disabled={loading}
                            className="mt-5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shadow-sm transition disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Starting..." : "Start Out-for-Return"}
                        </button>
                    </section>
                )}

                {/* Return OTP */}
                {status === "out_for_return" && (
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                            Step 4: Return Handover Verification
                        </span>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            Confirm Return to Owner
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                            Generate the return OTP, collect the equipment from the customer, and enter the OTP to close the return.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleGenerateReturnOtp}
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                            >
                                {loading ? "Generating..." : "Generate Return OTP"}
                            </button>

                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={returnOtp}
                                    onChange={(e) => setReturnOtp(e.target.value)}
                                    placeholder="Enter return OTP"
                                    maxLength={6}
                                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-800 tracking-wider outline-none focus:border-blue-600"
                                />

                                <button
                                    onClick={handleCompleteReturn}
                                    disabled={loading || !returnOtp.trim()}
                                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition disabled:opacity-40 cursor-pointer shadow-sm"
                                >
                                    Complete Return
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Completed Banner */}
                {status === "returned" && (
                    <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl shrink-0">
                            <IconCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold text-lg text-slate-900">
                                Full Rental & Return Cycle Completed
                            </h2>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Equipment was safely returned to the owner and verified through secure OTP checkpoints.
                            </p>
                        </div>
                    </section>
                )}
            </main>

            {/* RETURN OTP SENT MODAL */}
            {showReturnOtpSent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
                    role="presentation"
                >
                    <div
                        className="relative w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-lg border border-slate-200"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <IconCheck className="w-6 h-6" />
                        </div>

                        <h2 className="mt-4 font-display font-bold text-xl text-slate-900">
                            Return OTP Dispatched
                        </h2>

                        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                            A secure return verification OTP has been notified to the renter. Request it upon receiving the gear.
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowReturnOtpSent(false)}
                            className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition cursor-pointer"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default DeliveryDetails;