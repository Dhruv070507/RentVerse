import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addEquipment } from "../../features/equipmentSlice";
import { fetchCategories } from "../../features/categorySlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";

const AddEquipment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading: equipmentLoading,
        error: equipmentError
    } = useSelector((state) => state.equipment);

    const {
        categories,
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
        <div className="min-h-screen bg-white">

            <Navbar />

            {/* Hero */}
            <section className="bg-[#0b1b34] text-white">

                <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

                    <div className="max-w-3xl">

                        <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-6">
                            LIST YOUR EQUIPMENT
                        </p>

                        <h1 className="font-display text-5xl md:text-7xl leading-tight">
                            Turn your equipment
                            <br />
                            into an opportunity.
                        </h1>

                        <p className="font-sans mt-7 max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed">
                            Share equipment you already own with people who need it.
                            Add a few details, upload some photos, and make your
                            equipment available for the RentVerse community.
                        </p>

                    </div>

                </div>

            </section>


            {/* Intro */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div>

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            CREATE A LISTING
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34] leading-tight">
                            Tell people what
                            <br />
                            you're offering.
                        </h2>

                    </div>

                    <div className="lg:col-span-2">

                        <p className="font-sans text-base text-gray-500 leading-relaxed max-w-2xl">
                            Good equipment listings are clear, honest, and easy to
                            understand. Add accurate information about your equipment,
                            choose the right category, set your rental price, and
                            upload photos that show what renters can expect.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">

                            <div>
                                <p className="font-display text-3xl text-[#0b1b34]">
                                    01
                                </p>

                                <p className="mt-3 text-sm font-medium text-[#0b1b34]">
                                    Add details
                                </p>

                                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                                    Give renters the information they need.
                                </p>
                            </div>

                            <div>
                                <p className="font-display text-3xl text-[#0b1b34]">
                                    02
                                </p>

                                <p className="mt-3 text-sm font-medium text-[#0b1b34]">
                                    Set your price
                                </p>

                                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                                    Decide what your equipment costs per day.
                                </p>
                            </div>

                            <div>
                                <p className="font-display text-3xl text-[#0b1b34]">
                                    03
                                </p>

                                <p className="mt-3 text-sm font-medium text-[#0b1b34]">
                                    Add photos
                                </p>

                                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                                    Show renters exactly what they're getting.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Form Section */}
            <section className="bg-[#f7f8fa] py-24">

                <div className="max-w-5xl mx-auto px-6">

                    <div className="mb-12">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            EQUIPMENT DETAILS
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                            Build your listing.
                        </h2>

                        <p className="font-sans mt-4 text-sm text-gray-500 max-w-xl leading-relaxed">
                            Everything you enter here will help renters understand
                            your equipment before sending a rental request.
                        </p>

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-8 px-5 py-4 rounded-xl border border-red-100 bg-red-50 text-sm text-red-500">
                            {error}
                        </div>
                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm"
                    >

                        {/* Basic Information */}
                        <div>

                            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                                BASIC INFORMATION
                            </p>

                            <div className="space-y-6">

                                {/* Name */}
                                <div>

                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-[#0b1b34] mb-2"
                                    >
                                        Equipment Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Electric Drill"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none focus:border-[#0b1b34] transition"
                                    />

                                </div>


                                {/* Description */}
                                <div>

                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-[#0b1b34] mb-2"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your equipment, condition, features, or anything renters should know..."
                                        rows="5"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none focus:border-[#0b1b34] transition resize-none"
                                    />

                                </div>


                                {/* Category */}
                                <div>

                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-[#0b1b34] mb-2"
                                    >
                                        Category
                                    </label>

                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        disabled={categoryLoading}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-sm text-[#0b1b34] outline-none focus:border-[#0b1b34] transition"
                                    >

                                        <option value="">
                                            {categoryLoading
                                                ? "Loading categories..."
                                                : "Select a category"}
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}

                                    </select>

                                    <p className="mt-2 text-xs text-gray-400">
                                        Choose the category that best describes your equipment.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Pricing & Availability */}
                        <div className="mt-14 pt-10 border-t border-gray-100">

                            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                                PRICING & AVAILABILITY
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Price */}
                                <div>

                                    <label
                                        htmlFor="rentalPrice"
                                        className="block text-sm font-medium text-[#0b1b34] mb-2"
                                    >
                                        Rental Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                            ₹
                                        </span>

                                        <input
                                            id="rentalPrice"
                                            type="number"
                                            name="rentalPrice"
                                            value={formData.rentalPrice}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="500"
                                            required
                                            className="w-full pl-10 pr-5 py-4 rounded-xl border border-gray-200 text-sm text-[#0b1b34] outline-none focus:border-[#0b1b34] transition"
                                        />

                                    </div>

                                    <p className="text-xs text-gray-400 mt-2">
                                        Price per day
                                    </p>

                                </div>


                                {/* Quantity */}
                                <div>

                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-[#0b1b34] mb-2"
                                    >
                                        Quantity
                                    </label>

                                    <input
                                        id="quantity"
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="1"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 text-sm text-[#0b1b34] outline-none focus:border-[#0b1b34] transition"
                                    />

                                    <p className="text-xs text-gray-400 mt-2">
                                        How many units are available?
                                    </p>

                                </div>

                            </div>


                            {/* Location */}
                            <div className="mt-6">

                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-[#0b1b34] mb-2"
                                >
                                    Location
                                </label>

                                <input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Ahmedabad"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none focus:border-[#0b1b34] transition"
                                />

                                <p className="text-xs text-gray-400 mt-2">
                                    Let renters know where the equipment is located.
                                </p>

                            </div>

                        </div>


                        {/* Images */}
                        <div className="mt-14 pt-10 border-t border-gray-100">

                            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                                EQUIPMENT PHOTOS
                            </p>

                            <label
                                htmlFor="images"
                                className="block border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-[#0b1b34] transition cursor-pointer"
                            >

                                <div className="mx-auto w-14 h-14 rounded-full bg-[#f7f8fa] flex items-center justify-center">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-[#0b1b34]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5V7.125A2.625 2.625 0 015.625 4.5h5.25L13.5 7.125h4.875A2.625 2.625 0 0121 9.75v6.75a2.625 2.625 0 01-2.625 2.625H5.625A2.625 2.625 0 013 16.5z"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 13.5l2.25-2.25 2.25 2.25 1.5-1.5 2.25 2.25"
                                        />
                                    </svg>

                                </div>

                                <p className="mt-4 text-sm font-medium text-[#0b1b34]">
                                    Upload equipment photos
                                </p>

                                <p className="mt-2 text-xs text-gray-400">
                                    Add one or more clear images of your equipment.
                                </p>

                                <span className="inline-block mt-5 px-5 py-2.5 rounded-full bg-[#0b1b34] text-white text-xs font-medium">
                                    Choose Images
                                </span>

                                <input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    required
                                    className="hidden"
                                />

                            </label>


                            {/* Preview */}
                            {previewImages.length > 0 && (

                                <div className="mt-8">

                                    <div className="flex items-center justify-between mb-4">

                                        <p className="text-sm font-medium text-[#0b1b34]">
                                            Selected Images
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {previewImages.length} image
                                            {previewImages.length > 1 ? "s" : ""}
                                        </p>

                                    </div>


                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                        {previewImages.map((image, index) => (

                                            <div
                                                key={index}
                                                className="relative overflow-hidden rounded-xl border border-gray-100"
                                            >

                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover"
                                                />

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* Submit */}
                        <div className="mt-14 pt-8 border-t border-gray-100">

                            <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                                <div>

                                    <p className="text-sm font-medium text-[#0b1b34]">
                                        Ready to list your equipment?
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        You can manage your listing from My Equipment.
                                    </p>

                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {equipmentLoading
                                        ? "Adding Equipment..."
                                        : "Publish Equipment"}
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </section>


            {/* Closing section */}
            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                            RENTVERSE COMMUNITY
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34] leading-tight">
                            What you own can
                            <br />
                            help someone else.
                        </h2>

                    </div>

                    <div>

                        <p className="font-sans text-base text-gray-500 leading-relaxed">
                            RentVerse makes it easier to put unused equipment to
                            work. By listing your equipment, you give others access
                            to the tools and resources they need while creating an
                            opportunity from something you already own.
                        </p>

                    </div>

                </div>

            </section>


            <Footer />

        </div>
    );
};

export default AddEquipment;