import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import { IconTool, IconTruck, IconCreditCard, IconStar } from "../components/Icons.jsx";

const About = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-slate-900 text-white pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-6">
                            About RentVerse
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] max-w-4xl mx-auto">
                            Rethinking equipment rental for <span className="text-blue-400">everyone</span>.
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                            RentVerse bridges the gap between equipment owners and those who need reliable gear. Whether for construction, events, photography, or power tools, we make borrowing effortless.
                        </p>
                    </div>
                </section>

                {/* Metrics Bar */}
                <section className="relative mt-8 sm:mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <p className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">1,200+</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Equipment Listed</p>
                        </div>
                        <div>
                            <p className="font-display font-extrabold text-3xl sm:text-4xl text-blue-600">99.4%</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">On-Time Deliveries</p>
                        </div>
                        <div>
                            <p className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">4.9 / 5</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Average Rating</p>
                        </div>
                        <div>
                            <p className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">₹0</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Membership Fees</p>
                        </div>
                    </div>
                </section>

                {/* Purpose Story */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-4">
                                Our Mission
                            </span>
                            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">
                                High upfront costs shouldn't stand in the way of great work.
                            </h2>
                            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                                Professional tools, cameras, excavators, and audiovisual machinery often sit idle in storage for weeks while neighboring teams and creators search endlessly for affordable rental options.
                            </p>
                            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                                RentVerse provides verified listings, fair pricing, door-to-door delivery logistics, and secure online payments so equipment gets used to its fullest potential while owners monetize their investments.
                            </p>
                        </div>

                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                    <IconTool className="w-5 h-5 text-slate-700" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-slate-900">Verified Equipment</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Every listing contains authentic imagery, specifications, operational guidelines, and transparent rental rates.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                    <IconTruck className="w-5 h-5 text-slate-700" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-slate-900">Delivery Agents</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Our dedicated delivery network handles pickup and return drop-offs with OTP security checkouts.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                    <IconCreditCard className="w-5 h-5 text-slate-700" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-slate-900">Protected Escrow</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Funds are kept securely via Razorpay until the owner approves and delivery is officially confirmed.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                    <IconStar className="w-5 h-5 text-slate-700" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-slate-900">Genuine Reviews</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Feedback is submitted exclusively by confirmed renters to maintain marketplace integrity.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-slate-50 py-20 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-white px-3 py-1 rounded-full inline-block mb-3 border border-slate-200">
                                Guiding Principles
                            </span>
                            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                                Built on clarity and trust
                            </h2>
                            <p className="mt-3 text-sm text-slate-500">
                                The values that inform every feature we design in RentVerse.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                                <div className="text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                                    01
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">Simplicity First</h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    No convoluted agreements or hidden fees. Search, request, pay, and receive your tools with clean digital flows.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                                <div className="text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                                    02
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">Radical Transparency</h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    Clear daily rates, explicit item availability, real user ratings, and full delivery tracking at every step.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                                <div className="text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                                    03
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">Community Resilience</h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    Empowering local freelancers, contractors, and DIYers to access industrial-strength gear whenever they need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA Banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="rounded-2xl bg-slate-900 p-8 sm:p-14 text-white text-center border border-slate-800 shadow-xl">
                        <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
                            Ready to rent or list equipment?
                        </h2>
                        <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Explore available equipment now, or join fellow owners and start monetizing your tools today.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                to="/equipments"
                                className="px-7 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 shadow-sm transition-all"
                            >
                                Browse Equipment →
                            </Link>
                            <Link
                                to="/add-equipment"
                                className="px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
                            >
                                List Your Tools
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
