import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>

                {/* Hero */}
                <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">

                    <div className="max-w-4xl">

                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                            HOW IT WORKS
                        </p>

                        <h1 className="font-display text-5xl md:text-7xl leading-tight text-[#0b1b34]">
                            From discovery
                            <br />
                            to rental.
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg text-gray-500 leading-relaxed">
                            RentVerse keeps the entire rental journey in one
                            place. Find equipment, send a request, complete
                            payment, and manage your rental with ease.
                        </p>

                    </div>

                </section>


                {/* Steps */}
                <section className="bg-[#0b1b34] text-white">

                    <div className="max-w-7xl mx-auto px-6 py-24">

                        <div className="max-w-3xl mb-16">

                            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                                THE PROCESS
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl">
                                Four simple steps.
                            </h2>

                        </div>


                        <div className="space-y-0">

                            {/* Step 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-white/10">

                                <div className="md:col-span-2">
                                    <span className="text-sm text-gray-500">
                                        01
                                    </span>
                                </div>

                                <div className="md:col-span-4">
                                    <h3 className="text-2xl font-semibold">
                                        Find equipment
                                    </h3>
                                </div>

                                <div className="md:col-span-6">
                                    <p className="text-gray-400 leading-relaxed">
                                        Browse available equipment and find
                                        something that matches your requirements.
                                    </p>
                                </div>

                            </div>


                            {/* Step 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-white/10">

                                <div className="md:col-span-2">
                                    <span className="text-sm text-gray-500">
                                        02
                                    </span>
                                </div>

                                <div className="md:col-span-4">
                                    <h3 className="text-2xl font-semibold">
                                        Send a rental request
                                    </h3>
                                </div>

                                <div className="md:col-span-6">
                                    <p className="text-gray-400 leading-relaxed">
                                        Choose your rental details and send a
                                        request to the equipment owner.
                                    </p>
                                </div>

                            </div>


                            {/* Step 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-white/10">

                                <div className="md:col-span-2">
                                    <span className="text-sm text-gray-500">
                                        03
                                    </span>
                                </div>

                                <div className="md:col-span-4">
                                    <h3 className="text-2xl font-semibold">
                                        Get approved & pay
                                    </h3>
                                </div>

                                <div className="md:col-span-6">
                                    <p className="text-gray-400 leading-relaxed">
                                        Once your request is approved, complete
                                        the payment through the platform.
                                    </p>
                                </div>

                            </div>


                            {/* Step 4 */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-white/10">

                                <div className="md:col-span-2">
                                    <span className="text-sm text-gray-500">
                                        04
                                    </span>
                                </div>

                                <div className="md:col-span-4">
                                    <h3 className="text-2xl font-semibold">
                                        Receive & return
                                    </h3>
                                </div>

                                <div className="md:col-span-6">
                                    <p className="text-gray-400 leading-relaxed">
                                        Follow the delivery process, use the
                                        equipment, and return it according to
                                        the rental agreement.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Owners */}
                <section className="max-w-7xl mx-auto px-6 py-24">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                        <div>

                            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                                FOR EQUIPMENT OWNERS
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34] leading-tight">
                                Put your equipment
                                <br />
                                to work.
                            </h2>

                        </div>

                        <div>

                            <p className="text-gray-500 leading-relaxed">
                                Have equipment that you don't use all the time?
                                List it on RentVerse and make it available to
                                people who need it.
                            </p>

                            <Link
                                to="/add-equipment"
                                className="inline-block mt-8 px-7 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                            >
                                List Equipment
                            </Link>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </div>
    );
};

export default HowItWorks;

