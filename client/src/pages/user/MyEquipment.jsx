import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEquipments } from "../../features/equipment/equipmentSlice";
import Navbar from "../../components/navbar";

const MyEquipment = () => {

    const dispatch = useDispatch();

    const {
        myEquipments,
        loading,
        error
    } = useSelector((state) => state.equipment);

    useEffect(() => {
        dispatch(getMyEquipments());
    }, [dispatch]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading your equipment...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10 mt-12">

                {/* Page Heading */}
                <div className="w-full text-center mb-10">

                    <h1 className="font-serif text-4xl text-[#0b1b34]">
                        My Equipment
                    </h1>

                    <p className="font-sans text-gray-500 mt-2">
                        Manage the equipment you have listed for rent.
                    </p>

                </div>


                {myEquipments.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-24">

                        <p className="font-sans text-gray-500 text-lg">
                            You haven't added any equipment yet.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {myEquipments.map((equipment) => (

                            <div
                                key={equipment._id}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition"
                            >

                                <img
                                    src={equipment.images?.[0]}
                                    alt={equipment.name}
                                    className="w-full h-60 object-cover"
                                />

                                <div className="p-6">

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <h2 className="font-serif text-2xl text-[#0b1b34]">
                                                {equipment.name}
                                            </h2>

                                            <p className="font-sans text-sm text-gray-500 mt-1">
                                                {equipment.category}
                                            </p>
                                        </div>

                                        <p className="font-sans text-sm font-semibold text-[#0b1b34]">
                                            ₹{equipment.rentalPrice}/day
                                        </p>

                                    </div>


                                    <div className="mt-5 space-y-2">

                                        <p className="font-sans text-sm text-gray-600">
                                            Quantity: {equipment.quantity}
                                        </p>

                                        <p className="font-sans text-sm text-gray-600">
                                            Location: {equipment.location}
                                        </p>

                                    </div>

                                    <div className="flex gap-3 mt-6">

                                        <button
                                            className="flex-1 px-4 py-2 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="flex-1 px-4 py-2 rounded-full bg-gray-200 text-[#0b1b34] text-sm hover:bg-gray-300 transition"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyEquipment;