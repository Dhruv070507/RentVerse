import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchEquipmentById,
    updateEquipment
} from "../../features/equipmentSlice";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconAlert } from "../../components/Icons.jsx";

const EditEquipment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        selectedEquipment,
        loading,
        error
    } = useSelector((state) => state.equipment);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        quantity: "",
        location: "",
        rentalPrice: "",
        availability: true
    });

    useEffect(() => {
        dispatch(fetchEquipmentById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedEquipment) {
            setFormData({
                name: selectedEquipment.name || "",
                description: selectedEquipment.description || "",
                category: selectedEquipment.category || "",
                quantity: selectedEquipment.quantity || "",
                location: selectedEquipment.location || "",
                rentalPrice: selectedEquipment.rentalPrice || "",
                availability: selectedEquipment.availability ?? true
            });
        }
    }, [selectedEquipment]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(
                updateEquipment({
                    equipmentId: id,
                    updateData: {
                        ...formData,
                        quantity: Number(formData.quantity),
                        rentalPrice: Number(formData.rentalPrice)
                    }
                })
            ).unwrap();

            navigate("/my-equipments");
        } catch (err) {
            console.log("Update equipment failed:", err);
        }
    };

    if (loading && !selectedEquipment) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading listing data...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-3">
                        Listing Management
                    </span>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
                        Edit Equipment Details
                    </h1>
                    <p className="mt-2 text-slate-300 text-sm max-w-md mx-auto">
                        Update pricing, availability, and description for your listed equipment.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-24">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                            <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Equipment Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div>
                                <label htmlFor="rentalPrice" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Rental Price (₹/day)
                                </label>
                                <input
                                    id="rentalPrice"
                                    type="number"
                                    name="rentalPrice"
                                    value={formData.rentalPrice}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* Availability Toggle */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Available for Rental
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Turn off if the equipment is undergoing maintenance or reserved offline.
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={formData.availability}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/my-equipments")}
                                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                            >
                                {loading ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EditEquipment;