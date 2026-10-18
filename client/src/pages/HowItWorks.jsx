import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import {
    IconSearch,
    IconCalendar,
    IconShield,
    IconPackage,
    IconCheck,
    IconCamera,
    IconDocument,
    IconCreditCard
} from "../components/Icons.jsx";

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 text-white pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-6">
                            Step-By-Step Process
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] max-w-4xl mx-auto">
                            How renting works on <span className="text-blue-400">RentVerse</span>.
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                            From discovering equipment nearby to safe doorstep handover, we make renting tools and gear straightforward, verified, and secure.
                        </p>
                    </div>
                </section>

                {/* For Renters: 4 Simple Steps */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
                            The Renter Journey
                        </span>
                        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                            Four easy steps to your gear
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Transparent booking lifecycle from start to finish
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center mb-6 border border-slate-200">
                                    01
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">
                                    Browse & Discover
                                </h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    Search our catalog by category, location, or price. Compare equipment specs, reviews, and daily rental rates.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <IconSearch className="w-3.5 h-3.5 text-slate-400" />
                                <span>Filter by tools & gear</span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center mb-6 border border-slate-200">
                                    02
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">
                                    Request Rental
                                </h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    Select your start and return dates, enter your delivery address, and submit the booking request directly to the owner.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <IconCalendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>Direct owner notification</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center mb-6 border border-slate-200">
                                    03
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">
                                    Pay Securely
                                </h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    Once approved by the owner, pay through Razorpay using Cards, UPI, or Netbanking with 256-bit encrypted escrow protection.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <IconShield className="w-3.5 h-3.5 text-slate-400" />
                                <span>Escrow protection</span>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center mb-6 border border-slate-200">
                                    04
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900">
                                    Deliver & Return
                                </h3>
                                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    Our delivery agent brings the gear to your location. Verify condition via OTP check, use it, and schedule pickup when done.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <IconPackage className="w-3.5 h-3.5 text-slate-400" />
                                <span>OTP-verified handover</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* For Equipment Owners Spotlight */}
                <section className="bg-slate-900 text-white py-20 md:py-24 border-y border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-6">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full inline-block mb-4">
                                    For Equipment Owners
                                </span>
                                <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
                                    Turn idle machinery into reliable monthly income.
                                </h2>
                                <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                                    Have professional equipment sitting in your garage or warehouse? List it on RentVerse and let verified renters borrow it when you're not using it.
                                </p>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                                        <IconCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                        <span><strong>You set the price:</strong> Choose your daily rate and availability schedule.</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                                        <IconCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                        <span><strong>You approve every renter:</strong> Review booking requests before accepting.</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                                        <IconCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                        <span><strong>Zero delivery hassle:</strong> Assigned delivery agents coordinate pickups and drop-offs.</span>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <Link
                                        to="/add-equipment"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-all shadow-sm"
                                    >
                                        List Equipment Now →
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-8">
                                <h3 className="font-display font-bold text-xl text-white mb-6">
                                    Owner Listing Checklist
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                                            <IconCamera className="w-4 h-4 text-slate-200" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-white">1. Snap Clear Photos</h4>
                                            <p className="text-xs text-slate-400 mt-1">Include good angles showing working condition and any included accessories.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                                            <IconDocument className="w-4 h-4 text-slate-200" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-white">2. Write Accurate Specs</h4>
                                            <p className="text-xs text-slate-400 mt-1">Detail brand, model, power requirements, and operation instructions.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                                            <IconCreditCard className="w-4 h-4 text-slate-200" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-white">3. Define Rental Terms</h4>
                                            <p className="text-xs text-slate-400 mt-1">Set competitive daily rates and toggle availability on or off anytime.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                        Ready to start your first rental?
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
                        Join hundreds of professionals and creators making the most of equipment sharing.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/equipments"
                            className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm transition-all"
                        >
                            Browse Equipment →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HowItWorks;
