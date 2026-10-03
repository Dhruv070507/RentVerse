import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getMyEquipments,
    deleteEquipment
} from "../../features/equipmentSlice";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


const MyEquipment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        myEquipments,
        loading,
        error
    } = useSelector((state) => state.equipment);


    useEffect(() => {
        dispatch(getMyEquipments());
    }, [dispatch]);


    const handleDelete = (equipmentId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this equipment?"
        );

        if (!confirmDelete) {
            return;
        }

        dispatch(deleteEquipment(equipmentId));
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="font-sans text-sm text-gray-500">
                    Loading your equipment...
                </p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="font-sans text-sm text-red-500">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            <main className="max-w-7xl mx-auto px-6 pt-28 pb-24">


                {/* Intro Section */}
                <section className="max-w-3xl mb-16">

                    <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                        YOUR EQUIPMENT
                    </p>

                    <h1 className="font-display text-5xl md:text-6xl leading-tight text-[#0b1b34]">
                        Everything you rent,
                        <br />
                        all in one place.
                    </h1>

                    <p className="font-sans mt-6 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
                        Manage the equipment you've listed on RentVerse.
                        Keep your listings up to date, monitor what you're
                        offering, and make it easy for others to discover
                        what you have available.
                    </p>

                </section>


                {/* Stats / Action Section */}
                <section className="mb-16">

                    <div className="bg-[#0b1b34] rounded-3xl px-8 py-8 md:px-10">

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                            <div>

                                <p className="font-sans text-xs tracking-[0.18em] uppercase text-white/50">
                                    YOUR LISTINGS
                                </p>

                                <p className="font-display text-4xl text-white mt-2">
                                    {myEquipments.length}
                                </p>

                                <p className="font-sans text-sm text-white/60 mt-1">
                                    Equipment listed for rent
                                </p>

                            </div>


                            <div className="max-w-md">

                                <p className="font-sans text-sm leading-relaxed text-white/70">
                                    Keep your listings accurate and up to date.
                                    A clear description, good images, and the
                                    right category help renters find your equipment.
                                </p>

                            </div>


                            <button
                                onClick={() => navigate("/add-equipment")}
                                className="
                                    shrink-0
                                    px-6 py-3
                                    rounded-full
                                    bg-white
                                    text-[#0b1b34]
                                    text-sm
                                    font-medium
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                Add Equipment
                            </button>

                        </div>

                    </div>

                </section>


                {/* Equipment Section */}
                <section>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">

                        <div>

                            <p className="font-sans text-xs tracking-[0.18em] text-gray-400 uppercase mb-3">
                                YOUR COLLECTION
                            </p>

                            <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                Listed equipment
                            </h2>

                        </div>

                        {myEquipments.length > 0 && (
                            <p className="font-sans text-sm text-gray-400">
                                {myEquipments.length}{" "}
                                {myEquipments.length === 1
                                    ? "listing"
                                    : "listings"}
                            </p>
                        )}

                    </div>


                    {myEquipments.length === 0 ? (

                        <div className="border border-gray-100 rounded-3xl py-24 px-6 text-center">

                            <div className="max-w-md mx-auto">

                                <p className="font-display text-3xl text-[#0b1b34]">
                                    Nothing listed yet.
                                </p>

                                <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4">
                                    Start sharing your equipment with the
                                    RentVerse community and turn the things
                                    you own into something useful for others.
                                </p>

                                <button
                                    onClick={() => navigate("/add-equipment")}
                                    className="
                                        mt-7
                                        px-6 py-3
                                        rounded-full
                                        bg-[#0b1b34]
                                        text-white
                                        text-sm
                                        hover:bg-[#142944]
                                        transition
                                    "
                                >
                                    List Your First Equipment
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">

                            {myEquipments.map((equipment) => (

                                <article
                                    key={equipment._id}
                                    className="
                                        group
                                        bg-white
                                        rounded-3xl
                                        border border-gray-100
                                        overflow-hidden
                                        transition
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                    "
                                >

                                    {/* Image */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={equipment.images?.[0]}
                                            alt={equipment.name}
                                            className="
                                                w-full
                                                h-64
                                                object-cover
                                                transition
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />

                                        {/* Category */}
                                        <div className="absolute top-4 left-4">

                                            <span className="
                                                px-3 py-1.5
                                                rounded-full
                                                bg-white/95
                                                backdrop-blur-sm
                                                text-xs
                                                font-medium
                                                text-[#0b1b34]
                                            ">
                                                {equipment.category?.name || "Uncategorized"}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Content */}
                                    <div className="p-7">

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">

                                                <h3 className="
                                                    font-display
                                                    text-2xl
                                                    text-[#0b1b34]
                                                    truncate
                                                ">
                                                    {equipment.name}
                                                </h3>

                                                <p className="font-sans text-sm text-gray-400 mt-1">
                                                    {equipment.location || "Location not specified"}
                                                </p>

                                            </div>


                                            <div className="text-right shrink-0">

                                                <p className="font-sans text-lg font-semibold text-[#0b1b34]">
                                                    ₹{equipment.rentalPrice}
                                                </p>

                                                <p className="font-sans text-xs text-gray-400">
                                                    per day
                                                </p>

                                            </div>

                                        </div>


                                        {/* Description */}
                                        {equipment.description && (
                                            <p className="
                                                font-sans
                                                text-sm
                                                text-gray-500
                                                leading-relaxed
                                                mt-5
                                                line-clamp-2
                                            ">
                                                {equipment.description}
                                            </p>
                                        )}


                                        {/* Details */}
                                        <div className="grid grid-cols-2 gap-3 mt-6">

                                            <div className="rounded-2xl bg-gray-50 px-4 py-3">

                                                <p className="font-sans text-xs text-gray-400">
                                                    Quantity
                                                </p>

                                                <p className="font-sans text-sm font-medium text-[#0b1b34] mt-1">
                                                    {equipment.quantity}
                                                </p>

                                            </div>


                                            <div className="rounded-2xl bg-gray-50 px-4 py-3">

                                                <p className="font-sans text-xs text-gray-400">
                                                    Availability
                                                </p>

                                                <p className={`font-sans text-sm font-medium mt-1 ${
                                                    equipment.availability
                                                        ? "text-green-600"
                                                        : "text-gray-500"
                                                }`}>
                                                    {equipment.availability
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Actions */}
                                        <div className="flex gap-3 mt-6">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-equipment/${equipment._id}`
                                                    )
                                                }
                                                className="
                                                    flex-1
                                                    px-4 py-2.5
                                                    rounded-full
                                                    bg-[#0b1b34]
                                                    text-white
                                                    text-sm
                                                    font-medium
                                                    hover:bg-[#142944]
                                                    transition
                                                "
                                            >
                                                Edit Listing
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(equipment._id)
                                                }
                                                className="
                                                    px-5 py-2.5
                                                    rounded-full
                                                    border
                                                    border-gray-200
                                                    text-gray-600
                                                    text-sm
                                                    font-medium
                                                    hover:border-red-200
                                                    hover:text-red-500
                                                    transition
                                                "
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>


                {/* Bottom Information */}
                {myEquipments.length > 0 && (
                    <section className="mt-24">

                        <div className="
                            border-t
                            border-gray-100
                            pt-10
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-6
                        ">

                            <div>

                                <p className="font-display text-2xl text-[#0b1b34]">
                                    Keep your listings ready.
                                </p>

                                <p className="font-sans text-sm text-gray-500 mt-2 max-w-xl">
                                    Good images, accurate details, and clear
                                    availability make your equipment easier
                                    for renters to discover and request.
                                </p>

                            </div>


                            <button
                                onClick={() => navigate("/add-equipment")}
                                className="
                                    shrink-0
                                    px-6 py-3
                                    rounded-full
                                    bg-[#0b1b34]
                                    text-white
                                    text-sm
                                    hover:bg-[#142944]
                                    transition
                                "
                            >
                                Add Another Equipment
                            </button>

                        </div>

                    </section>
                )}

            </main>


            <Footer />

        </div>
    );
};


export default MyEquipment;
