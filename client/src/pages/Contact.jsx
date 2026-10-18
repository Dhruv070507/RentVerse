import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import { IconMail, IconClock, IconShield, IconCheck } from "../components/Icons.jsx";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
        setSubmitted(true);
        setFormData({
            name: "",
            email: "",
            message: ""
        });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 text-white pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-6">
                            24/7 Rental Assistance
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] max-w-4xl mx-auto">
                            We're here to help you <span className="text-blue-400">succeed</span>.
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                            Have questions about a rental, need help coordinating equipment return, or interested in partnership opportunities? Send us a message anytime.
                        </p>
                    </div>
                </section>

                {/* Split Contact Container */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Contact Info & Support Channels */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
                                    Direct Channels
                                </span>
                                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                                    Reach our team
                                </h2>
                                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Our support team responds to rental inquiries, account assistance, and logistics queries promptly.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                                        <IconMail className="w-5 h-5 text-slate-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Inquiries</p>
                                        <p className="font-semibold text-sm text-slate-900 mt-1">support@rentverse.com</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Average reply time under 2 hours</p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                                        <IconClock className="w-5 h-5 text-slate-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Operational Hours</p>
                                        <p className="font-semibold text-sm text-slate-900 mt-1">Mon – Sun: 7:00 AM – 10:00 PM IST</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Delivery coordination available 7 days a week</p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                                        <IconShield className="w-5 h-5 text-slate-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Dispute & Safety Desk</p>
                                        <p className="font-semibold text-sm text-slate-900 mt-1">safety@rentverse.com</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Escrow release & damage reporting</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
                            <div className="mb-6">
                                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                                    Send us a message
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Fill out the form below and we will get back to you shortly.
                                </p>
                            </div>

                            {submitted && (
                                <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center gap-2">
                                    <IconCheck className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span>Thank you! Your message has been received. Our team will contact you soon.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Alex Mercer"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@example.com"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about the issue or inquiry you need assistance with..."
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all resize-none font-medium"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                                >
                                    Send Message →
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
