
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addEquipment } from "../../features/equipmentSlice";
import { fetchCategories } from "../../features/categorySlice";
import {
    createCategoryRequest,
    clearCategoryRequestStatus
} from "../../features/categoryRequestSlice";

import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconAlert, IconCamera } from "../../components/Icons.jsx";

const AddEquipment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading: equipmentLoading, error: equipmentError } =
        useSelector((state) => state.equipment);

    const { categories = [], loading: categoryLoading, error: categoryError } =
        useSelector((state) => state.category);

    const {
        submitting: requestSubmitting,
        error: requestError
    } = useSelector((state) => state.categoryRequest);

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
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestData, setRequestData] = useState({
        name: "",
        description: ""
    });
    const [requestMessage, setRequestMessage] = useState("");

    useEffect(() => {
        dispatch(fetchCategories());

        return () => {
            dispatch(clearCategoryRequestStatus());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    };

    const handleCategoryRequest = async (e) => {
        e.preventDefault();
        setRequestMessage("");

        const result = await dispatch(createCategoryRequest({
            name: requestData.name.trim(),
            description: requestData.description.trim()
        }));

        if (createCategoryRequest.fulfilled.match(result)) {
            setRequestMessage("Request submitted successfully.");
            setRequestData({ name: "", description: "" });
            setTimeout(() => setShowRequestModal(false), 1000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!images.length) return;

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        images.forEach((image) => data.append("images", image));

        const result = await dispatch(addEquipment(data));

        if (addEquipment.fulfilled.match(result)) {
            navigate("/my-equipments");
        }
    };

    const error = equipmentError || categoryError;

    const inputClass =
        "w-full bg-[#ECEBE8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:bg-[#E5E4E0]";

    const labelClass =
        "mb-2 block text-xs font-medium text-black/65";

    return (
        <div className="min-h-screen bg-[#F5F4F2] font-sans text-black">
            <Navbar />

            <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
                <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                List your equipment.
                <span className="block font-normal italic text-black/40">
                    Put it to good use.
                </span>
            </h1>

                {error && (
                    <div className="mb-6 flex items-center gap-2 bg-[#ECEBE8] p-3 text-sm text-red-700">
                        <IconAlert className="h-4 w-4 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">

                    <div className="mt-10">
                        <label htmlFor="name" className={labelClass}>
                            Equipment name *
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter equipment name"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className={labelClass}>
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your equipment and its condition"
                            rows={4}
                            required
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
    <label htmlFor="category" className={labelClass}>
        Category *
    </label>

    <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        disabled={categoryLoading}
        className={`${inputClass} focus:border-black focus:ring-black accent-black`}
    >
        <option value="">
            {categoryLoading ? "Loading..." : "Select category"}
        </option>

        {categories.map((category) => (
            <option key={category._id} value={category._id}>
                {category.name}
            </option>
        ))}
    </select>

    <button
        type="button"
        onClick={() => {
            dispatch(clearCategoryRequestStatus());
            setRequestMessage("");
            setShowRequestModal(true);
        }}
        className="mt-2 text-xs text-black/60 underline underline-offset-4 hover:text-black"
    >
        + Request new category
    </button>
</div>

                        <div>
                            <label htmlFor="location" className={labelClass}>
                                Pickup location *
                            </label>
                            <input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter city or location"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="rentalPrice" className={labelClass}>
                                Daily rental price (₹) *
                            </label>
                            <input
                                id="rentalPrice"
                                type="number"
                                name="rentalPrice"
                                min="0"
                                value={formData.rentalPrice}
                                onChange={handleChange}
                                placeholder="499"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity" className={labelClass}>
                                Quantity *
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
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>
                            Equipment photos *
                        </label>

                        <div className="relative border border-dashed border-black/20 bg-[#ECEBE8] px-5 py-9 text-center transition-colors hover:border-black/50">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                required={images.length === 0}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />

                            <IconCamera className="mx-auto mb-3 h-6 w-6 text-black/50" />
                            <p className="text-sm text-black/65">
                                Click or drop photos here
                            </p>
                        </div>

                        {previewImages.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {previewImages.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Equipment ${index + 1}`}
                                        className="h-20 w-20 object-cover"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col-reverse justify-end gap-3 border-t border-black/10 pt-6 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 text-sm text-black/60 hover:text-black"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={equipmentLoading || images.length === 0}
                            className="bg-black px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {equipmentLoading ? "Publishing..." : "Publish listing →"}
                        </button>
                    </div>
                </form>
            </main>

            {/* CATEGORY REQUEST MODAL */}
            {showRequestModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md bg-[#F5F4F2] p-6 sm:p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="font-serif text-2xl">
                                Request category
                            </h2>
                            <button
                                type="button"
                                onClick={() => setShowRequestModal(false)}
                                className="text-xl text-black/50 hover:text-black"
                            >
                                ×
                            </button>
                        </div>

                        {requestError && (
                            <p className="mb-4 text-xs text-red-700">
                                {requestError}
                            </p>
                        )}

                        {requestMessage && (
                            <p className="mb-4 text-xs text-green-700">
                                {requestMessage}
                            </p>
                        )}

                        <form onSubmit={handleCategoryRequest} className="space-y-5">
                            <div>
                                <label htmlFor="requestName" className={labelClass}>
                                    Category name *
                                </label>
                                <input
                                    id="requestName"
                                    name="name"
                                    value={requestData.name}
                                    onChange={(e) => setRequestData((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                    placeholder="Enter category name"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="requestDescription" className={labelClass}>
                                    Description
                                </label>
                                <textarea
                                    id="requestDescription"
                                    name="description"
                                    value={requestData.description}
                                    onChange={(e) => setRequestData((prev) => ({
                                        ...prev,
                                        description: e.target.value
                                    }))}
                                    placeholder="Category description (optional)"
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={requestSubmitting || !requestData.name.trim()}
                                className="w-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/75 disabled:opacity-40"
                            >
                                {requestSubmitting ? "Submitting..." : "Submit request →"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AddEquipment;
