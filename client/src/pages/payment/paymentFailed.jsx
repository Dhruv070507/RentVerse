import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


const PaymentFailed = () => {

    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            {/* =====================================================
                PAYMENT FAILED
            ===================================================== */}

            <main>

                <section className="min-h-[75vh] flex items-center px-6 py-28">

                    <div className="max-w-4xl mx-auto w-full">

                        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">


                            {/* =================================================
                                STATUS ICON
                            ================================================= */}

                            <div className="flex justify-center lg:justify-start">

                                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">

                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">

                                        <span className="text-4xl md:text-5xl text-red-500 font-light">
                                            ×
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                MESSAGE
                            ================================================= */}

                            <div className="text-center lg:text-left">

                                <p className="font-sans text-xs tracking-[0.25em] text-red-400 uppercase mb-5">
                                    PAYMENT UNSUCCESSFUL
                                </p>


                                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0b1b34]">
                                    Payment
                                    <br />
                                    didn't go through.
                                </h1>


                                <p className="font-sans text-gray-500 text-base md:text-lg mt-7 max-w-xl leading-relaxed mx-auto lg:mx-0">
                                    We couldn't complete your payment.
                                    Your rental hasn't been charged.
                                    You can return to your rentals and
                                    try the payment again.
                                </p>


                                {/* Actions */}

                                <div className="flex flex-col sm:flex-row gap-3 mt-9 justify-center lg:justify-start">

                                    <button
                                        onClick={() => navigate("/my-rentals")}
                                        className="
                                            px-7
                                            py-3.5
                                            rounded-full
                                            bg-[#0b1b34]
                                            text-white
                                            font-sans
                                            text-sm
                                            font-medium
                                            hover:bg-[#142944]
                                            transition
                                        "
                                    >
                                        Back to My Rentals
                                    </button>


                                    <button
                                        onClick={() => navigate("/")}
                                        className="
                                            px-7
                                            py-3.5
                                            rounded-full
                                            border
                                            border-gray-200
                                            text-[#0b1b34]
                                            font-sans
                                            text-sm
                                            font-medium
                                            hover:border-gray-400
                                            transition
                                        "
                                    >
                                        Go Home
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    HELP / INFORMATION
                ===================================================== */}

                <section className="bg-[#0b1b34] px-6 py-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                    01
                                </p>

                                <h2 className="font-display text-2xl text-white">
                                    No charge was made
                                </h2>

                                <p className="font-sans text-sm text-white/55 mt-3 leading-relaxed">
                                    A failed payment means the transaction
                                    was not successfully completed.
                                </p>

                            </div>


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                    02
                                </p>

                                <h2 className="font-display text-2xl text-white">
                                    Try again
                                </h2>

                                <p className="font-sans text-sm text-white/55 mt-3 leading-relaxed">
                                    Return to your rentals and start the
                                    payment process again.
                                </p>

                            </div>


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                    03
                                </p>

                                <h2 className="font-display text-2xl text-white">
                                    Need help?
                                </h2>

                                <p className="font-sans text-sm text-white/55 mt-3 leading-relaxed">
                                    If the problem continues, contact the
                                    RentVerse support team.
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


export default PaymentFailed;