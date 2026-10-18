import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addEquipment } from "../../features/equipmentSlice";
import { fetchCategories } from "../../features/categorySlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconAlert, IconCamera } from "../../components/Icons.jsx";

const AddEquipment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading: equipmentLoading,
        error: equipmentError
    } = useSelector((state) => state.equipment);

    const {
        categories = [],
        loading: categoryLoading,
        error: categoryError
    } = useSelector((state) => state.category);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        rentalPrice: "",
        quantity: "",
        location: ""
    });

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("rentalPrice", formData.rentalPrice);
        data.append("quantity", formData.quantity);
        data.append("location", formData.location);

        images.forEach((image) => {
            data.append("images", image);
        });

        const result = await dispatch(addEquipment(data));

        if (addEquipment.fulfilled.match(result)) {
            setFormData({
                name: "",
                description: "",
                category: "",
                rentalPrice: "",
                quantity: "",
                location: ""
            });
            setImages([]);
            setPreviewImages([]);
            navigate("/my-equipments");
        }
    };

    const loading = equipmentLoading || categoryLoading;
    const error = equipmentError || categoryError;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-3">
                        Lending Marketplace
                    </span>
                    <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
                        List Your Equipment
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                        Share your tools and machinery with verified community members and start earning passive income today.
                    </p>
                </div>
            </section>

            {/* Main Form Container */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-24">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
                    {/* Error Notice */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                            <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Basic Information */}
                        <div>
                            <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                    1
                                </span>
                                <h2 className="font-display font-bold text-lg text-slate-900">
                                    General Information
                                </h2>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Equipment Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Bosch Professional 18V Cordless Drill Set"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Description & Condition *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe accessories included, power requirements, condition, operating instructions..."
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                            Category *
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            disabled={categoryLoading}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        >
                                            <option value="">
                                                {categoryLoading ? "Loading categories..." : "Select category"}
                                            </option>
                                            {categories.map((c) => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                            Pickup Location / City *
                                        </label>
                                        <input
                                            id="location"
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="e.g. Indiranagar, Bengaluru"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Pricing & Inventory */}
                        <div>
                            <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                    2
                                </span>
                                <h2 className="font-display font-bold text-lg text-slate-900">
                                    Pricing & Inventory
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="rentalPrice" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Daily Rate (₹) *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                            ₹
                                        </span>
                                        <input
                                            id="rentalPrice"
                                            type="number"
                                            name="rentalPrice"
                                            min="0"
                                            value={formData.rentalPrice}
                                            onChange={handleChange}
                                            placeholder="499"
                                            required
                                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Quantity Available *
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        name="quantity"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="1"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Upload Photos */}
                        <div>
                            <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                    3
                                </span>
                                <h2 className="font-display font-bold text-lg text-slate-900">
                                    Photos & Verification
                                </h2>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Equipment Photos (At least 1 required) *
                                </label>
                                <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-blue-500 transition-colors text-center relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required={images.length === 0}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
                                            <IconCamera className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">
                                            Drop your equipment photos here, or <span className="text-blue-600">browse</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            Supports PNG, JPG, WebP up to 10MB each
                                        </p>
                                    </div>
                                </div>

                                {/* Previews */}
                                {previewImages.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {previewImages.map((src, i) => (
                                            <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                                                    #{i + 1}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || images.length === 0}
                                className="px-8 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                            >
                                {loading ? "Publishing Listing..." : "Publish Equipment Listing →"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AddEquipment;