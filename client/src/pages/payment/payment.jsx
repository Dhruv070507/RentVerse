import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRentalById } from "../../features/rentalSlice";
import {
    createPayment,
    verifyRazorpayPayment
} from "../../features/paymentSlice";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconShield, IconMapPin, IconAlert, IconLock } from "../../components/Icons.jsx";

const Payment = () => {
    const { rentalId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        rental,
        loading: rentalLoading,
        error: rentalError
    } = useSelector((state) => state.rental);

    const {
        loading: paymentLoading,
        error: paymentError
    } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(getRentalById(rentalId));
    }, [dispatch, rentalId]);

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const paymentData = await dispatch(
                createPayment({ rentalId })
            ).unwrap();

            const options = {
                key: paymentData.keyId,
                amount: paymentData.order.amount,
                currency: paymentData.order.currency,
                name: "RentVerse",
                description: `Rental payment for ${rental.equipment?.name || "Equipment"}`,
                order_id: paymentData.order.id,
                handler: async (response) => {
                    try {
                        await dispatch(
                            verifyRazorpayPayment({
                                paymentId: paymentData.payment._id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature
                            })
                        ).unwrap();

                        navigate("/payment/success");
                    } catch (err) {
                        console.error("Payment verification failed:", err);
                        navigate("/payment/failure");
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#0f172a"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

            razorpay.on("payment.failed", function (response) {
                console.error("Razorpay payment failed:", response.error);
                navigate("/payment/failure");
            });
        } catch (err) {
            console.error("Payment initialization failed:", err);
        }
    };

    if (rentalLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading checkout session...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    if (rentalError || !rental) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                        <IconAlert className="w-7 h-7" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Checkout Error
                    </h2>
                    <p className="text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                        {rentalError || "Unable to retrieve this rental for payment. Please return to your rentals dashboard."}
                    </p>
                    <Link
                        to="/my-rentals"
                        className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors inline-block shadow-sm"
                    >
                        Return to My Rentals
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 border-b border-slate-800 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                        Secure Rental Checkout
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                        Review your rental booking breakdown and complete your payment with the authorized Razorpay gateway.
                    </p>
                </div>
            </section>

            {/* Checkout Main Card */}
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-36 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Left: Booking Order Details */}
                    <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
                        <div className="flex items-center justify-between pb-5 mb-8 border-b border-slate-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Booking Summary
                            </span>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                                Approved Request
                            </span>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <span className="text-xs font-bold uppercase text-slate-400 block tracking-wider">
                                    Equipment
                                </span>
                                <h2 className="font-display font-bold text-2xl text-slate-900 mt-1.5">
                                    {rental.equipment?.name}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Reserved Quantity: <span className="font-semibold text-slate-800">{rental.quantity} units</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div>
                                    <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                                        Start Date
                                    </span>
                                    <p className="text-sm font-bold text-slate-800 mt-1">
                                        {new Date(rental.rentalStartDate).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                                        End Date
                                    </span>
                                    <p className="text-sm font-bold text-slate-800 mt-1">
                                        {new Date(rental.rentalEndDate).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>

                            {rental.address && (
                                <div>
                                    <span className="text-xs font-bold uppercase text-slate-400 block tracking-wider mb-2">
                                        Delivery Destination
                                    </span>
                                    <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-2.5 leading-relaxed">
                                        <IconMapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <span>{rental.address}</span>
                                    </div>
                                </div>
                            )}

                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold uppercase text-slate-400 block tracking-wider">
                                        Total Amount Due
                                    </span>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Includes full duration rental fee & platform coverage
                                    </p>
                                </div>
                                <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                                    ₹{rental.totalPrice}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Box */}
                    <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-lg border border-slate-800">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Payment Method
                                </span>
                                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                                    Razorpay Gateway
                                </span>
                            </div>

                            <h3 className="font-display font-bold text-2xl text-white">
                                Instant Verification
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                                UPI, Cards, NetBanking, and Wallets are fully supported. Funds are held safely under escrow protection until equipment delivery.
                            </p>

                            {paymentError && (
                                <div className="mt-6 p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium">
                                    {paymentError}
                                </div>
                            )}

                            <div className="my-10 pt-8 border-t border-slate-800 flex items-baseline justify-between">
                                <span className="text-xs sm:text-sm text-slate-400">Amount to Pay</span>
                                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                                    ₹{rental.totalPrice}
                                </span>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={handlePayment}>
                                <button
                                    type="submit"
                                    disabled={paymentLoading}
                                    className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md disabled:opacity-50 transition-all cursor-pointer"
                                >
                                    {paymentLoading ? "Initiating Gateway..." : `Pay ₹${rental.totalPrice} Securely`}
                                </button>
                            </form>

                            <p className="text-xs text-center text-slate-400 mt-6 flex items-center justify-center gap-2">
                                <IconLock className="w-4 h-4 text-slate-500" />
                                <span>Razorpay Encrypted Transaction</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Payment;