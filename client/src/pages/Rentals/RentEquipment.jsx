import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { createRental } from "../../features/rentalSlice";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconAlert, IconShield } from "../../components/Icons.jsx";

const RentEquipment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.rental);

    const [quantity, setQuantity] = useState(1);
    const [rentalStartDate, setRentalStartDate] = useState("");
    const [rentalEndDate, setRentalEndDate] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rentalData = {
            equipmentId: id,
            quantity: Number(quantity),
            rentalStartDate,
            rentalEndDate,
            address,
        };

        const result = await dispatch(createRental(rentalData));

        if (createRental.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 border-b border-slate-800 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-4">
                        Booking Request
                    </span>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                        Rent Equipment
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Specify rental dates, quantity needed, and your delivery address. The owner will review your booking request and respond quickly.
                    </p>
                </div>
            </section>

            {/* Main Form Container */}
            <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-36 w-full">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 sm:p-12">
                    {/* Error Banner */}
                    {error && (
                        <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium flex items-center gap-2.5">
                            <IconAlert className="w-4 h-4 shrink-0 text-slate-500" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Quantity */}
                        <div>
                            <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                Number of Units Required *
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="startDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Rental Start Date *
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={rentalStartDate}
                                    onChange={(e) => setRentalStartDate(e.target.value)}
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Rental End Date *
                                </label>
                                <input
                                    id="endDate"
                                    type="date"
                                    value={rentalEndDate}
                                    onChange={(e) => setRentalEndDate(e.target.value)}
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                            <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                Delivery Address & Notes *
                            </label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter street address, landmark, and contact instructions for the delivery agent..."
                                rows={4}
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none leading-relaxed"
                            />
                        </div>

                        {/* Info banner */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed my-2">
                            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1.5">
                                <IconShield className="w-4 h-4 text-blue-600 shrink-0" />
                                <span>Safe Booking Protection</span>
                            </div>
                            <p className="text-slate-500">You won't be charged until the equipment owner accepts your booking request. Payment will then be handled via secure Razorpay checkout.</p>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {loading ? "Submitting Booking..." : "Send Rental Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RentEquipment;