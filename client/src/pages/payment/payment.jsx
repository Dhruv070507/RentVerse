import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRentalById } from "../../features/rentalSlice";
import {
    createPayment,
    verifyRazorpayPayment
} from "../../features/paymentSlice";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


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
                createPayment({
                    rentalId
                })
            ).unwrap();


            const options = {

                key: paymentData.keyId,

                amount: paymentData.order.amount,

                currency: paymentData.order.currency,

                name: "RentVerse",

                description: `Payment for ${rental.equipment?.name}`,

                order_id: paymentData.order.id,

                handler: async (response) => {

                    try {

                        await dispatch(
                            verifyRazorpayPayment({
                                paymentId: paymentData.payment._id,

                                razorpayPaymentId:
                                    response.razorpay_payment_id,

                                razorpayOrderId:
                                    response.razorpay_order_id,

                                razorpaySignature:
                                    response.razorpay_signature
                            })
                        ).unwrap();


                        navigate("/payment/success");

                    } catch (error) {

                        console.log(
                            "Payment verification failed:",
                            error
                        );

                    }

                },

                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },

                theme: {
                    color: "#0b1b34"
                }

            };


            const razorpay = new window.Razorpay(options);

            razorpay.open();


            razorpay.on(
                "payment.failed",
                function (response) {

                    console.log(
                        "Razorpay payment failed:",
                        response.error
                    );

                }
            );

        } catch (error) {

            console.log(
                "Payment initialization failed:",
                error
            );

        }

    };


    if (rentalLoading) {

        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="max-w-7xl mx-auto px-6 pt-36 pb-24">

                    <p className="font-sans text-sm text-gray-500">
                        Loading payment details...
                    </p>

                </main>

                <Footer />

            </div>
        );

    }


    if (rentalError) {

        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="max-w-7xl mx-auto px-6 pt-36 pb-24">

                    <p className="font-sans text-sm text-red-500">
                        {rentalError}
                    </p>

                </main>

                <Footer />

            </div>
        );

    }


    if (!rental) {
        return null;
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="pt-36 pb-20 px-6">

                <div className="max-w-7xl mx-auto">

                    <div className="max-w-3xl">

                        <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-5">
                            SECURE CHECKOUT
                        </p>

                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0b1b34]">
                            Complete your
                            <br />
                            rental payment.
                        </h1>

                        <p className="font-sans text-gray-500 text-base md:text-lg mt-7 max-w-xl leading-relaxed">
                            Review your rental details and securely complete
                            your payment through Razorpay.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                PAYMENT SECTION
            ===================================================== */}

            <section className="px-6 pb-28">

                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-10">


                        {/* =================================================
                            RENTAL SUMMARY
                        ================================================= */}

                        <div>

                            <div className="border-y border-gray-200">

                                {/* Equipment */}

                                <div className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                                    <div>

                                        <p className="font-sans text-xs tracking-[0.18em] uppercase text-gray-400 mb-2">
                                            Equipment
                                        </p>

                                        <h2 className="font-display text-3xl text-[#0b1b34]">
                                            {rental.equipment?.name}
                                        </h2>

                                    </div>

                                    <div className="text-left sm:text-right">

                                        <p className="font-sans text-xs text-gray-400 uppercase tracking-wider">
                                            Quantity
                                        </p>

                                        <p className="font-sans text-lg text-[#0b1b34] mt-1">
                                            {rental.quantity}
                                        </p>

                                    </div>

                                </div>


                                {/* Rental dates */}

                                <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100">

                                    <div className="py-7 sm:pr-8">

                                        <p className="font-sans text-xs tracking-[0.18em] uppercase text-gray-400 mb-2">
                                            Rental starts
                                        </p>

                                        <p className="font-sans text-base text-[#0b1b34]">
                                            {new Date(
                                                rental.rentalStartDate
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                }
                                            )}
                                        </p>

                                    </div>


                                    <div className="py-7 sm:pl-8 sm:border-l border-gray-100">

                                        <p className="font-sans text-xs tracking-[0.18em] uppercase text-gray-400 mb-2">
                                            Rental ends
                                        </p>

                                        <p className="font-sans text-base text-[#0b1b34]">
                                            {new Date(
                                                rental.rentalEndDate
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                }
                                            )}
                                        </p>

                                    </div>

                                </div>


                                {/* Total */}

                                <div className="border-t border-gray-200 py-8 flex items-center justify-between">

                                    <div>

                                        <p className="font-sans text-xs tracking-[0.18em] uppercase text-gray-400">
                                            Total amount
                                        </p>

                                        <p className="font-sans text-sm text-gray-500 mt-1">
                                            Including your complete rental cost
                                        </p>

                                    </div>

                                    <p className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                        ₹{rental.totalPrice}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            PAYMENT CARD
                        ================================================= */}

                        <div>

                            <div className="bg-[#0b1b34] text-white rounded-3xl p-8 md:p-10">

                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-4">
                                    PAYMENT
                                </p>

                                <h2 className="font-display text-3xl md:text-4xl">
                                    Pay securely
                                </h2>

                                <p className="font-sans text-sm text-white/60 mt-4 leading-relaxed">
                                    Your payment is securely processed through
                                    Razorpay. RentVerse does not store your
                                    card or banking credentials.
                                </p>


                                {/* Amount */}

                                <div className="border-t border-white/10 mt-8 pt-7">

                                    <div className="flex items-end justify-between">

                                        <span className="font-sans text-sm text-white/60">
                                            Amount payable
                                        </span>

                                        <span className="font-display text-3xl">
                                            ₹{rental.totalPrice}
                                        </span>

                                    </div>

                                </div>


                                {paymentError && (

                                    <div className="mt-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-400/20">

                                        <p className="font-sans text-sm text-red-300">
                                            {paymentError}
                                        </p>

                                    </div>

                                )}


                                <form
                                    onSubmit={handlePayment}
                                    className="mt-8"
                                >

                                    <button
                                        type="submit"
                                        disabled={paymentLoading}
                                        className="
                                            w-full
                                            px-6
                                            py-4
                                            rounded-full
                                            bg-white
                                            text-[#0b1b34]
                                            font-sans
                                            text-sm
                                            font-semibold
                                            hover:bg-gray-100
                                            transition
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {paymentLoading
                                            ? "Preparing payment..."
                                            : `Pay ₹${rental.totalPrice}`
                                        }
                                    </button>

                                </form>


                                {/* Trust */}

                                <div className="mt-7 pt-6 border-t border-white/10">

                                    <div className="flex items-start gap-3">

                                        <div className="mt-0.5 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">

                                            <span className="text-xs">
                                                ✓
                                            </span>

                                        </div>

                                        <div>

                                            <p className="font-sans text-sm text-white/80">
                                                Secure Razorpay checkout
                                            </p>

                                            <p className="font-sans text-xs text-white/40 mt-1">
                                                Your payment information is
                                                handled securely.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                TRUST SECTION
            ===================================================== */}

            <section className="bg-gray-50 px-6 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                                01
                            </p>

                            <h3 className="font-display text-2xl text-[#0b1b34]">
                                Secure payments
                            </h3>

                            <p className="font-sans text-sm text-gray-500 mt-3 leading-relaxed">
                                Payments are processed securely through
                                Razorpay's checkout system.
                            </p>

                        </div>


                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                                02
                            </p>

                            <h3 className="font-display text-2xl text-[#0b1b34]">
                                Simple checkout
                            </h3>

                            <p className="font-sans text-sm text-gray-500 mt-3 leading-relaxed">
                                Review your rental, confirm the amount and
                                complete your payment in a few steps.
                            </p>

                        </div>


                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                                03
                            </p>

                            <h3 className="font-display text-2xl text-[#0b1b34]">
                                Rental confirmed
                            </h3>

                            <p className="font-sans text-sm text-gray-500 mt-3 leading-relaxed">
                                Once your payment is verified, your rental
                                payment is recorded in RentVerse.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <Footer />

        </div>
    );
};


export default Payment;