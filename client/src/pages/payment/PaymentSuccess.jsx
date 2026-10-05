import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


const PaymentSuccess = () => {

    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            {/* =====================================================
                PAYMENT SUCCESS
            ===================================================== */}

            <main>

                <section className="min-h-[75vh] flex items-center px-6 py-28">

                    <div className="max-w-4xl mx-auto w-full">

                        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">


                            {/* =================================================
                                SUCCESS ICON
                            ================================================= */}

                            <div className="flex justify-center lg:justify-start">

                                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">

                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">

                                        <span className="text-4xl md:text-5xl text-green-600 font-light">
                                            ✓
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                MESSAGE
                            ================================================= */}

                            <div className="text-center lg:text-left">

                                <p className="font-sans text-xs tracking-[0.25em] text-green-600 uppercase mb-5">
                                    PAYMENT CONFIRMED
                                </p>


                                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0b1b34]">
                                    You're all
                                    <br />
                                    set to go.
                                </h1>


                                <p className="font-sans text-gray-500 text-base md:text-lg mt-7 max-w-xl leading-relaxed mx-auto lg:mx-0">
                                    Your payment has been successfully
                                    verified. Your rental is now confirmed
                                    and you can view its details from your
                                    rental dashboard.
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
                                        View My Rentals
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
                    NEXT STEPS
                ===================================================== */}

                <section className="bg-[#0b1b34] px-6 py-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="mb-12">

                            <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                WHAT'S NEXT
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl text-white">
                                Your rental journey continues.
                            </h2>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                    01
                                </p>

                                <h3 className="font-display text-2xl text-white">
                                    Check your rental
                                </h3>

                                <p className="font-sans text-sm text-white/55 mt-3 leading-relaxed">
                                    View your rental dates, equipment,
                                    payment details and current status.
                                </p>

                            </div>


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                    02
                                </p>

                                <h3 className="font-display text-2xl text-white">
                                    Prepare for delivery
                                </h3>

                                <p className="font-sans text-sm text-white/55 mt-3 leading-relaxed">
                                    Keep an eye on your rental while the
                                    delivery process gets underway.
                                </p>

                            </div>


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                    03
                                </p>

                                <h3 className="font-display text-2xl text-white">
                                    Enjoy your equipment
                                </h3>

                                <p className="font-sans text-sm text-white/55 mt-3 leading-relaxed">
                                    Your equipment is ready for your
                                    upcoming rental period.
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


export default PaymentSuccess;