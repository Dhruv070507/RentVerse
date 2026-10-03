import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <main>

                <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">

                    <div className="max-w-4xl">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                            ABOUT RENTVERSE
                        </p>

                        <h1 className="font-display text-5xl md:text-7xl leading-tight text-[#0b1b34]">
                            Making equipment rental
                            <br />
                            simple.
                        </h1>

                        <p className="font-sans mt-8 max-w-2xl text-lg text-gray-500 leading-relaxed">
                            RentVerse is a platform designed to make equipment
                            rental easier, more accessible, and more convenient.
                            Discover equipment, connect with owners, and manage
                            your rentals from one place.
                        </p>

                    </div>

                </section>


                {/* Dark Section */}
                <section className="bg-[#0b1b34] text-white">

                    <div className="max-w-7xl mx-auto px-6 py-24">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                            <div>

                                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                                    OUR PURPOSE
                                </p>

                                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                                    Better access.
                                    <br />
                                    Less hassle.
                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-400 leading-relaxed">
                                    Equipment can be expensive to purchase and
                                    difficult to store when it is only needed
                                    occasionally. RentVerse brings owners and
                                    renters together so useful equipment can be
                                    shared instead of sitting unused.
                                </p>

                                <p className="mt-6 text-gray-400 leading-relaxed">
                                    Our goal is to create a straightforward
                                    rental experience where users can discover
                                    equipment, request rentals, make payments,
                                    and keep track of the entire rental process.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Values */}
                <section className="max-w-7xl mx-auto px-6 py-24">

                    <div className="mb-14">

                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            WHAT WE BELIEVE
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                            Built around simplicity.
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        <div>
                            <p className="text-2xl font-semibold text-[#0b1b34]">
                                01
                            </p>

                            <h3 className="mt-5 text-lg font-semibold text-[#0b1b34]">
                                Simple
                            </h3>

                            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                Keep the rental process clear and easy to
                                understand from discovery to return.
                            </p>
                        </div>


                        <div>
                            <p className="text-2xl font-semibold text-[#0b1b34]">
                                02
                            </p>

                            <h3 className="mt-5 text-lg font-semibold text-[#0b1b34]">
                                Transparent
                            </h3>

                            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                Give users the information they need to make
                                informed rental decisions.
                            </p>
                        </div>


                        <div>
                            <p className="text-2xl font-semibold text-[#0b1b34]">
                                03
                            </p>

                            <h3 className="mt-5 text-lg font-semibold text-[#0b1b34]">
                                Community-driven
                            </h3>

                            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                Help people make better use of equipment by
                                connecting owners and renters.
                            </p>
                        </div>

                    </div>

                </section>


                {/* CTA */}
                <section className="bg-gray-50">

                    <div className="max-w-7xl mx-auto px-6 py-20 text-center">

                        <h2 className="font-display text-4xl text-[#0b1b34]">
                            Ready to explore?
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Find equipment that fits what you need.
                        </p>

                        <Link
                            to="/equipments"
                            className="inline-block mt-8 px-7 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                        >
                            Explore Equipment
                        </Link>

                    </div>

                </section>

            </main>

            <Footer />
        </div>
    );
};

export default About;
