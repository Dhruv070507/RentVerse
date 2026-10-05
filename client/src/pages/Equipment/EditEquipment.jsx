import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchEquipmentById,
    updateEquipment
} from "../../features/equipmentSlice";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


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

        } catch (error) {

            console.log("Update equipment failed:", error);

        }
    };


    if (loading && !selectedEquipment) {

        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">

                    <p className="font-sans text-sm text-gray-400">
                        Loading equipment...
                    </p>

                </main>

                <Footer />

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            <main className="pt-32 pb-24">


                {/* =====================================================
                    PAGE INTRO
                ===================================================== */}

                <section className="max-w-7xl mx-auto px-6">

                    <div className="max-w-3xl">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                            EQUIPMENT MANAGEMENT
                        </p>

                        <h1 className="font-display text-5xl md:text-6xl leading-tight text-[#0b1b34]">
                            Update your equipment.
                        </h1>

                        <p className="font-sans text-base md:text-lg text-gray-500 mt-6 leading-relaxed max-w-2xl">
                            Keep your equipment information accurate so renters
                            always know what you're offering.
                        </p>

                    </div>

                </section>


                {/* =====================================================
                    FORM SECTION
                ===================================================== */}

                <section className="max-w-7xl mx-auto px-6 mt-20">

                    <div className="border-t border-gray-200 pt-12">

                        <form
                            onSubmit={handleSubmit}
                            className="max-w-4xl"
                        >


                            {/* =================================================
                                BASIC INFORMATION
                            ================================================= */}

                            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 pb-14 border-b border-gray-100">

                                <div>

                                    <p className="font-sans text-xs tracking-[0.18em] text-gray-400 uppercase">
                                        Basic information
                                    </p>

                                    <p className="font-sans text-sm text-gray-400 mt-3 leading-relaxed">
                                        Provide the essential information
                                        renters need to understand your
                                        equipment.
                                    </p>

                                </div>


                                <div className="space-y-7">


                                    {/* Name */}

                                    <div>

                                        <label className="block font-sans text-sm font-medium text-[#0b1b34] mb-2">
                                            Equipment name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Canon EOS Camera"
                                            className="
                                                w-full
                                                px-5
                                                py-4
                                                rounded-xl
                                                bg-gray-50
                                                border
                                                border-gray-100
                                                text-sm
                                                text-[#0b1b34]
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:bg-white
                                                focus:border-[#0b1b34]
                                                transition
                                            "
                                            required
                                        />

                                    </div>


                                    {/* Description */}

                                    <div>

                                        <label className="block font-sans text-sm font-medium text-[#0b1b34] mb-2">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="5"
                                            placeholder="Describe your equipment, its condition, features, or anything renters should know."
                                            className="
                                                w-full
                                                px-5
                                                py-4
                                                rounded-xl
                                                bg-gray-50
                                                border
                                                border-gray-100
                                                text-sm
                                                text-[#0b1b34]
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:bg-white
                                                focus:border-[#0b1b34]
                                                transition
                                                resize-none
                                            "
                                            required
                                        />

                                    </div>


                                    {/* Category */}

                                    <div>

                                        <label className="block font-sans text-sm font-medium text-[#0b1b34] mb-2">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            placeholder="e.g. Photography"
                                            className="
                                                w-full
                                                px-5
                                                py-4
                                                rounded-xl
                                                bg-gray-50
                                                border
                                                border-gray-100
                                                text-sm
                                                text-[#0b1b34]
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:bg-white
                                                focus:border-[#0b1b34]
                                                transition
                                            "
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                RENTAL DETAILS
                            ================================================= */}

                            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 py-14 border-b border-gray-100">

                                <div>

                                    <p className="font-sans text-xs tracking-[0.18em] text-gray-400 uppercase">
                                        Rental details
                                    </p>

                                    <p className="font-sans text-sm text-gray-400 mt-3 leading-relaxed">
                                        Set the quantity, pricing and
                                        location for this equipment.
                                    </p>

                                </div>


                                <div className="space-y-7">


                                    {/* Quantity + Price */}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                        <div>

                                            <label className="block font-sans text-sm font-medium text-[#0b1b34] mb-2">
                                                Quantity
                                            </label>

                                            <input
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                min="0"
                                                className="
                                                    w-full
                                                    px-5
                                                    py-4
                                                    rounded-xl
                                                    bg-gray-50
                                                    border
                                                    border-gray-100
                                                    text-sm
                                                    text-[#0b1b34]
                                                    outline-none
                                                    focus:bg-white
                                                    focus:border-[#0b1b34]
                                                    transition
                                                "
                                                required
                                            />

                                        </div>


                                        <div>

                                            <label className="block font-sans text-sm font-medium text-[#0b1b34] mb-2">
                                                Rental price / day
                                            </label>

                                            <div className="relative">

                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                                    ₹
                                                </span>

                                                <input
                                                    type="number"
                                                    name="rentalPrice"
                                                    value={formData.rentalPrice}
                                                    onChange={handleChange}
                                                    min="0"
                                                    className="
                                                        w-full
                                                        pl-10
                                                        pr-5
                                                        py-4
                                                        rounded-xl
                                                        bg-gray-50
                                                        border
                                                        border-gray-100
                                                        text-sm
                                                        text-[#0b1b34]
                                                        outline-none
                                                        focus:bg-white
                                                        focus:border-[#0b1b34]
                                                        transition
                                                    "
                                                    required
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    {/* Location */}

                                    <div>

                                        <label className="block font-sans text-sm font-medium text-[#0b1b34] mb-2">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Where is this equipment located?"
                                            className="
                                                w-full
                                                px-5
                                                py-4
                                                rounded-xl
                                                bg-gray-50
                                                border
                                                border-gray-100
                                                text-sm
                                                text-[#0b1b34]
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:bg-white
                                                focus:border-[#0b1b34]
                                                transition
                                            "
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                AVAILABILITY
                            ================================================= */}

                            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 py-14 border-b border-gray-100">

                                <div>

                                    <p className="font-sans text-xs tracking-[0.18em] text-gray-400 uppercase">
                                        Availability
                                    </p>

                                    <p className="font-sans text-sm text-gray-400 mt-3 leading-relaxed">
                                        Control whether renters can currently
                                        request this equipment.
                                    </p>

                                </div>


                                <label className="flex items-center justify-between gap-6 p-5 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">

                                    <div>

                                        <p className="font-sans text-sm font-medium text-[#0b1b34]">
                                            Available for rent
                                        </p>

                                        <p className="font-sans text-sm text-gray-400 mt-1">
                                            Renters can request this equipment
                                            when availability is enabled.
                                        </p>

                                    </div>


                                    <div className="relative flex-shrink-0">

                                        <input
                                            type="checkbox"
                                            name="availability"
                                            checked={formData.availability}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />

                                        <div className="
                                            w-12
                                            h-7
                                            rounded-full
                                            bg-gray-300
                                            peer-checked:bg-[#0b1b34]
                                            transition
                                        " />

                                        <div className="
                                            absolute
                                            top-1
                                            left-1
                                            w-5
                                            h-5
                                            rounded-full
                                            bg-white
                                            transition
                                            peer-checked:translate-x-5
                                        " />

                                    </div>

                                </label>

                            </div>


                            {/* =================================================
                                ERROR
                            ================================================= */}

                            {error && (

                                <div className="mt-8 px-5 py-4 rounded-xl bg-red-50 border border-red-100">

                                    <p className="font-sans text-sm text-red-600">
                                        {error}
                                    </p>

                                </div>

                            )}


                            {/* =================================================
                                ACTIONS
                            ================================================= */}

                            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-5 pt-10">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/my-equipments")
                                    }
                                    className="
                                        font-sans
                                        text-sm
                                        text-gray-500
                                        hover:text-[#0b1b34]
                                        transition
                                    "
                                >
                                    ← Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        px-8
                                        py-3.5
                                        rounded-full
                                        bg-[#0b1b34]
                                        text-white
                                        font-sans
                                        text-sm
                                        font-medium
                                        hover:bg-[#142944]
                                        transition
                                        disabled:opacity-50
                                    "
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Save changes →"
                                    }
                                </button>

                            </div>

                        </form>

                    </div>

                </section>

            </main>


            <Footer />

        </div>
    );
};


export default EditEquipment;