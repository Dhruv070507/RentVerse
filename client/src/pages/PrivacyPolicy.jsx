import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-[#0b1b34] text-white">
                <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">

                    <p className="font-sans text-xs tracking-[0.25em] text-blue-300 uppercase mb-6">
                        PRIVACY
                    </p>

                    <h1 className="font-display text-5xl md:text-7xl leading-tight">
                        Your privacy matters.
                    </h1>

                    <p className="font-sans max-w-2xl mt-7 text-base md:text-lg text-gray-300 leading-relaxed">
                        RentVerse is designed to make equipment rental simple
                        and trustworthy. We believe that transparency about
                        your information is an important part of that experience.
                    </p>

                </div>
            </section>


            {/* Content */}
            <main className="max-w-5xl mx-auto px-6 py-24">

                <div className="space-y-20">

                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            01 — Information
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Information we collect
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            When you use RentVerse, we may collect information
                            that helps us provide our rental services. This may
                            include your name, email address, profile information,
                            rental activity, equipment listings, and information
                            required to operate your account.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            02 — Usage
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            How we use your information
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            Your information helps us operate RentVerse,
                            process rentals, communicate important updates,
                            improve the platform, maintain account security,
                            and provide a better experience for renters and
                            equipment owners.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            03 — Security
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Keeping information secure
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            We take reasonable measures to protect information
                            associated with your RentVerse account. Access to
                            sensitive account information is restricted and
                            authentication mechanisms are used to help protect
                            user accounts.
                        </p>
                    </section>


                    <section>
                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            04 — Your choices
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                            Your information, your control
                        </h2>

                        <p className="font-sans text-gray-600 leading-relaxed mt-6">
                            You can manage information associated with your
                            account through RentVerse. If you have questions
                            about your information or how it is used, you can
                            contact the RentVerse team.
                        </p>
                    </section>

                </div>


                {/* Closing */}
                <div className="mt-24 bg-[#0b1b34] rounded-3xl px-8 py-12 md:px-12">
                    <h3 className="font-display text-3xl text-white">
                        Transparency comes first.
                    </h3>

                    <p className="font-sans text-gray-300 mt-4 max-w-2xl leading-relaxed">
                        We want RentVerse to be a platform where people feel
                        comfortable renting, sharing, and connecting.
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
