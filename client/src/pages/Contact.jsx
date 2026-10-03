import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Contact form submitted:", formData);

        setFormData({
            name: "",
            email: "",
            message: ""
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>

                {/* Hero */}
                <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">

                    <div className="max-w-4xl">

                        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                            CONTACT US
                        </p>

                        <h1 className="font-display text-5xl md:text-7xl leading-tight text-[#0b1b34]">
                            Let's talk.
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg text-gray-500 leading-relaxed">
                            Have a question, need help with a rental, or want
                            to know more about RentVerse? Send us a message.
                        </p>

                    </div>

                </section>


                {/* Contact Section */}
                <section className="bg-[#0b1b34] text-white">

                    <div className="max-w-7xl mx-auto px-6 py-24">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                            {/* Contact Information */}
                            <div>

                                <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-6">
                                    GET IN TOUCH
                                </p>

                                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                                    We're here to help.
                                </h2>

                                <p className="mt-6 max-w-md text-gray-400 leading-relaxed">
                                    Whether you're renting equipment, listing
                                    equipment, or simply have a question,
                                    we'd love to hear from you.
                                </p>


                                <div className="mt-12 space-y-8">

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500">
                                            Email
                                        </p>

                                        <p className="mt-2 text-sm text-gray-300">
                                            support@rentverse.com
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500">
                                            Availability
                                        </p>

                                        <p className="mt-2 text-sm text-gray-300">
                                            We're available to help with your
                                            questions and rental concerns.
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Form */}
                            <div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >

                                    {/* Name */}
                                    <div>

                                        <label
                                            htmlFor="name"
                                            className="block text-sm text-gray-300 mb-2"
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition"
                                        />

                                    </div>


                                    {/* Email */}
                                    <div>

                                        <label
                                            htmlFor="email"
                                            className="block text-sm text-gray-300 mb-2"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition"
                                        />

                                    </div>


                                    {/* Message */}
                                    <div>

                                        <label
                                            htmlFor="message"
                                            className="block text-sm text-gray-300 mb-2"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition resize-none"
                                        />

                                    </div>


                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 rounded-full bg-white text-[#0b1b34] text-sm font-medium hover:bg-gray-100 transition"
                                    >
                                        Send Message
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </div>
    );
};

export default Contact;
