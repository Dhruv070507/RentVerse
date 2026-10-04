import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const SafetyTrust = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-[#0b1b34] text-white">
                <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">

                    <p className="font-sans text-xs tracking-[0.25em] text-blue-300 uppercase mb-6">
                        SAFETY & TRUST
                    </p>

                    <h1 className="font-display text-5xl md:text-7xl leading-tight">
                        Rent with confidence.
                    </h1>

                    <p className="font-sans max-w-2xl mt-7 text-base md:text-lg text-gray-300 leading-relaxed">
                        A rental platform works best when both sides can trust
                        the process. RentVerse is built around transparency,
                        accountability, and responsible use.
                    </p>

                </div>
            </section>


            {/* Trust Intro */}
            <section className="max-w-5xl mx-auto px-6 py-24">

                <div className="max-w-3xl">

                    <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                        BUILT AROUND TRUST
                    </p>

                    <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34] leading-tight">
                        Good rentals start with good communication.
                    </h2>

                    <p className="font-sans text-gray-500 mt-6 leading-relaxed">
                        RentVerse connects people who own equipment with people
                        who need it. Clear information, responsible behaviour,
                        and reliable communication help make every rental
                        smoother.
                    </p>

                </div>


                {/* Trust Sections */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">

                    <div>
                        <p className="text-3xl font-display text-[#0b1b34]">
                            01
                        </p>

                        <h3 className="font-display text-2xl text-[#0b1b34] mt-4">
                            Know what you're renting
                        </h3>

                        <p className="font-sans text-gray-500 mt-4 leading-relaxed">
                            Equipment owners should provide accurate details
                            about their equipment, including condition,
                            availability, pricing, and location.
                        </p>
                    </div>


                    <div>
                        <p className="text-3xl font-display text-[#0b1b34]">
                            02
                        </p>

                        <h3 className="font-display text-2xl text-[#0b1b34] mt-4">
                            Communicate clearly
                        </h3>

                        <p className="font-sans text-gray-500 mt-4 leading-relaxed">
                            Clear communication between renters and owners
                            helps prevent misunderstandings throughout the
                            rental process.
                        </p>
                    </div>


                    <div>
                        <p className="text-3xl font-display text-[#0b1b34]">
                            03
                        </p>

                        <h3 className="font-display text-2xl text-[#0b1b34] mt-4">
                            Respect the equipment
                        </h3>

                        <p className="font-sans text-gray-500 mt-4 leading-relaxed">
                            Renters should handle equipment responsibly and
                            return it according to the agreed rental process.
                        </p>
                    </div>


                    <div>
                        <p className="text-3xl font-display text-[#0b1b34]">
                            04
                        </p>

                        <h3 className="font-display text-2xl text-[#0b1b34] mt-4">
                            Protect your account
                        </h3>

                        <p className="font-sans text-gray-500 mt-4 leading-relaxed">
                            Keep your password private and avoid sharing your
                            account credentials with other people.
                        </p>
                    </div>

                </div>

            </section>


            {/* Safety Banner */}
            <section className="bg-[#0b1b34] text-white">

                <div className="max-w-5xl mx-auto px-6 py-24">

                    <p className="text-xs tracking-[0.2em] text-blue-300 uppercase mb-5">
                        A SHARED RESPONSIBILITY
                    </p>

                    <h2 className="font-display text-4xl md:text-5xl leading-tight">
                        Trust is something we build together.
                    </h2>

                    <p className="font-sans max-w-2xl mt-6 text-gray-300 leading-relaxed">
                        Owners, renters, delivery agents, and administrators
                        all play a role in keeping the RentVerse community
                        reliable and respectful.
                    </p>

                </div>

            </section>


            {/* Guidelines */}
            <section className="max-w-5xl mx-auto px-6 py-24">

                <div className="border-t border-gray-200">

                    <div className="py-8 border-b border-gray-200">
                        <h3 className="font-display text-2xl text-[#0b1b34]">
                            Be accurate
                        </h3>

                        <p className="font-sans text-gray-500 mt-3 leading-relaxed">
                            Provide honest information when creating equipment
                            listings or making rental requests.
                        </p>
                    </div>


                    <div className="py-8 border-b border-gray-200">
                        <h3 className="font-display text-2xl text-[#0b1b34]">
                            Be respectful
                        </h3>

                        <p className="font-sans text-gray-500 mt-3 leading-relaxed">
                            Treat other members of the RentVerse community
                            professionally and respectfully.
                        </p>
                    </div>


                    <div className="py-8 border-b border-gray-200">
                        <h3 className="font-display text-2xl text-[#0b1b34]">
                            Report problems
                        </h3>

                        <p className="font-sans text-gray-500 mt-3 leading-relaxed">
                            If something doesn't look right, report the issue
                            so that it can be reviewed appropriately.
                        </p>
                    </div>

                </div>

            </section>


            <Footer />
        </div>
    );
};

export default SafetyTrust;
