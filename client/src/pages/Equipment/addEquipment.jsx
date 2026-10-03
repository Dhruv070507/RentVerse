import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEquipment } from "../../features/equipmentSlice";
import Navbar from "../../components/navbar";

const AddEquipment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.equipment);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        location: "",
        rentalPrice: "",
        quantity: 1
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleImages = (e) => {
        const files = Array.from(e.target.files);

        setImages(files);

        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );

        setImagePreviews(previews);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            return;
        }

        if (!formData.description.trim()) {
            return;
        }

        if (!formData.category) {
            return;
        }

        if (!formData.location.trim()) {
            return;
        }

        if (!formData.rentalPrice || Number(formData.rentalPrice) <= 0) {
            return;
        }

        if (!formData.quantity || Number(formData.quantity) <= 0) {
            return;
        }

        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("location", formData.location);
        data.append("rentalPrice", formData.rentalPrice);
        data.append("quantity", formData.quantity);

        images.forEach((image) => {
            data.append("images", image);
        });

        try {
            await dispatch(addEquipment(data)).unwrap();

            navigate("/my-equipments");
        } catch (error) {
            console.error("Add equipment error:", error);
        }
    };


    return (
        <div className="min-h-screen bg-[#f8f9fb] font-sans">

            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-10">

                {/* Header */}

                <div className="mb-10">

                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                        Marketplace
                    </p>

                    <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34] mt-2">
                        Add Equipment
                    </h1>

                    <p className="text-sm text-gray-500 mt-3 max-w-xl">
                        Add your equipment to RentVerse and make it available
                        for other users to rent.
                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* =================================================
                        BASIC INFORMATION
                    ================================================= */}

                    <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">

                        <div className="mb-7">

                            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
                                01
                            </p>

                            <h2 className="font-display text-2xl text-[#0b1b34] mt-1">
                                Basic Information
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Tell renters about your equipment.
                            </p>

                        </div>


                        <div className="space-y-6">

                            {/* Name */}

                            <div>

                                <label className="text-sm font-medium text-[#0b1b34]">
                                    Equipment Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. JCB Excavator"
                                    className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                />

                            </div>


                            {/* Description */}

                            <div>

                                <label className="text-sm font-medium text-[#0b1b34]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Describe the equipment, its condition, features, and suitable use..."
                                    className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm outline-none resize-none focus:border-[#0b1b34] focus:bg-white transition"
                                />

                            </div>


                            {/* Category + Location */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <label className="text-sm font-medium text-[#0b1b34]">
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Construction"
                                        className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                    />

                                </div>


                                <div>

                                    <label className="text-sm font-medium text-[#0b1b34]">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Ahmedabad"
                                        className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        RENTAL INFORMATION
                    ================================================= */}

                    <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm mt-6">

                        <div className="mb-7">

                            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
                                02
                            </p>

                            <h2 className="font-display text-2xl text-[#0b1b34] mt-1">
                                Rental Information
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Set your rental price and available quantity.
                            </p>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Price */}

                            <div>

                                <label className="text-sm font-medium text-[#0b1b34]">
                                    Rental Price / Day
                                </label>

                                <div className="relative mt-2">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="rentalPrice"
                                        value={formData.rentalPrice}
                                        onChange={handleChange}
                                        min="1"
                                        placeholder="5000"
                                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                    />

                                </div>

                            </div>


                            {/* Quantity */}

                            <div>

                                <label className="text-sm font-medium text-[#0b1b34]">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                />

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        IMAGES
                    ================================================= */}

                    <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm mt-6">

                        <div className="mb-7">

                            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
                                03
                            </p>

                            <h2 className="font-display text-2xl text-[#0b1b34] mt-1">
                                Equipment Images
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Add clear images so renters can inspect the equipment.
                            </p>

                        </div>


                        <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#0b1b34] hover:bg-gray-50 transition">

                            <div className="text-3xl text-gray-300">
                                +
                            </div>

                            <p className="text-sm font-medium text-[#0b1b34] mt-2">
                                Choose equipment images
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                You can select multiple images
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImages}
                                className="hidden"
                            />

                        </label>


                        {/* Image previews */}

                        {imagePreviews.length > 0 && (

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

                                {imagePreviews.map((preview, index) => (

                                    <div
                                        key={index}
                                        className="h-32 rounded-xl overflow-hidden bg-gray-100"
                                    >

                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* Error */}

                    {error && (

                        <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100">

                            <p className="text-sm text-red-600">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* Actions */}

                    <div className="flex items-center justify-end gap-3 mt-8">

                        <button
                            type="button"
                            onClick={() => navigate("/my-equipments")}
                            className="px-6 py-3 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={loading}
                            className="px-7 py-3 rounded-full bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading
                                ? "Adding Equipment..."
                                : "Add Equipment"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
};


export default AddEquipment;