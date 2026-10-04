import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-[#0b1b34] text-white">
                <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">

                    <p className="font-sans text-xs tracking-[0.25em] text-blue-300 uppercase mb-6">
                        TERMS
                    </p>

                    <h1 className="font-display text-5xl md:text-7xl leading-tight">
                        Clear rules. Better rentals.
                    </h1>

                    <p className="font-sans max-w-2xl mt-7 text-base md:text-lg text-gray-300 leading-relaxed">
                        These terms help keep RentVerse reliable, transparent,
                        and fair for everyone using the platform.
                    </p>

                </div>
            </section>


            {/* Content */}
            <main className="max-w-5xl mx-auto px-6 py-24">

                <div className="space-y-20">

                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            01 — Platform
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Using RentVerse
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            RentVerse provides a platform that allows users to
                            discover, list, request, rent, and manage equipment.
                            By using the platform, you agree to use it
                            responsibly and in accordance with these terms.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            02 — Accounts
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Your account
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            Users are responsible for providing accurate account
                            information and keeping their login credentials
                            secure. Your account should not be used by another
                            person or for activities that violate the platform's
                            rules.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            03 — Equipment
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Listing and renting equipment
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            Equipment owners are responsible for providing
                            accurate information about their equipment,
                            including its condition, availability, location,
                            quantity, and rental price.
                        </p>

                        <p className="font-sans text-gray-600 leading-relaxed mt-4">
                            Renters are responsible for treating rented
                            equipment appropriately and following the agreed
                            rental and return process.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            04 — Responsible use
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Use the platform responsibly
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            Users must not use RentVerse for fraudulent,
                            misleading, unlawful, abusive, or otherwise
                            inappropriate activities. Equipment listings and
                            user interactions should remain accurate and
                            respectful.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            05 — Changes
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Keeping the platform evolving
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            RentVerse may update platform features, policies,
                            and these terms as the service develops. Continued
                            use of the platform after changes means that users
                            agree to the updated terms.
                        </p>
                    </section>

                </div>


                <div className="mt-24 bg-gray-50 rounded-3xl px-8 py-12 md:px-12 border border-gray-100">
                    <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                        Our principle
                    </p>

                    <h3 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                        Keep renting simple and fair.
                    </h3>

                    <p className="font-sans text-gray-500 mt-4 max-w-2xl leading-relaxed">
                        Every part of RentVerse is built around making equipment
                        rental easier for both owners and renters.
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default TermsOfService;
