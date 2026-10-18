import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
    getMyEquipments,
    deleteEquipment
} from "../../features/equipmentSlice";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconTool, IconAlert } from "../../components/Icons.jsx";

const MyEquipment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        myEquipments = [],
        loading,
        error
    } = useSelector((state) => state.equipment);

    useEffect(() => {
        dispatch(getMyEquipments());
    }, [dispatch]);

    const handleDelete = (equipmentId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this equipment listing?"
        );
        if (!confirmDelete) return;

        dispatch(deleteEquipment(equipmentId));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading your equipment listings...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                        <IconAlert className="w-6 h-6 text-slate-600" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Error Loading Equipment
                    </h2>
                    <p className="text-sm text-slate-500 mt-2 mb-6">{error}</p>
                    <button
                        onClick={() => dispatch(getMyEquipments())}
                        className="px-6 py-2.5 rounded-full bg-[#0b1b34] text-white text-sm font-semibold hover:bg-[#152a4e] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* Header / Hero Section */}
            <section className="bg-slate-900 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-3">
                            Owner Portal
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
                            My Equipment Listings
                        </h1>
                        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
                            Manage inventory, edit daily rental pricing, monitor availability, and track listed items.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/add-equipment")}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-sm transition-all flex items-center gap-2 w-fit cursor-pointer"
                    >
                        <span>+</span>
                        <span>List New Equipment</span>
                    </button>
                </div>
            </section>

            {/* Stats strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Total Listed Items
                        </span>
                        <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                            {myEquipments.length}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Active in Marketplace
                        </span>
                        <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                            {myEquipments.filter(e => e.availability !== false).length}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Average Daily Return
                        </span>
                        <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                            ₹{myEquipments.length ? Math.round(myEquipments.reduce((acc, curr) => acc + (Number(curr.rentalPrice) || 0), 0) / myEquipments.length) : 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Listings Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24">
                {myEquipments.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                            <IconTool className="w-6 h-6 text-slate-600" />
                        </div>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            No equipment listed yet
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
                            Start sharing your equipment with the RentVerse community and generate extra income from idle tools.
                        </p>
                        <button
                            onClick={() => navigate("/add-equipment")}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            List Your First Equipment
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myEquipments.map((equipment) => (
                            <article
                                key={equipment._id}
                                className="flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                                    {equipment.images?.[0] ? (
                                        <img
                                            src={equipment.images[0]}
                                            alt={equipment.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                            No preview image
                                        </div>
                                    )}

                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0b1b34] shadow-xs">
                                            {equipment.category?.name || "Equipment"}
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <h3 className="font-display font-bold text-lg text-slate-900 line-clamp-1">
                                                {equipment.name}
                                            </h3>
                                            <span className="font-display font-extrabold text-base text-[#0b1b34] shrink-0">
                                                ₹{equipment.rentalPrice}<span className="text-[10px] text-slate-400 font-normal">/d</span>
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                                            {equipment.description || "No description provided."}
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                                            <div>
                                                <span className="text-slate-400 block text-[9px] uppercase font-bold">Qty</span>
                                                <span className="font-semibold text-slate-800">{equipment.quantity} units</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block text-[9px] uppercase font-bold">Location</span>
                                                <span className="font-semibold text-slate-800 truncate block">{equipment.location || "—"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => navigate(`/edit-equipment/${equipment._id}`)}
                                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(equipment._id)}
                                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyEquipment;
