import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchEquipmentById,
    updateEquipment
} from "../../features/equipment/equipmentSlice";

import Navbar from "../../components/navbar";


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
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading equipment...</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10 mt-12">

                <div className="text-center mb-10">

                    <h1 className="font-serif text-4xl text-[#0b1b34]">
                        Edit Equipment
                    </h1>

                    <p className="font-sans text-gray-500 mt-2">
                        Update your equipment details.
                    </p>

                </div>


                {error && (
                    <p className="text-red-500 text-center mb-6">
                        {error}
                    </p>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="block text-sm font-sans text-[#0b1b34] mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0b1b34]"
                            required
                        />

                    </div>


                    <div>

                        <label className="block text-sm font-sans text-[#0b1b34] mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0b1b34]"
                            required
                        />

                    </div>


                    <div>

                        <label className="block text-sm font-sans text-[#0b1b34] mb-2">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0b1b34]"
                        />

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <label className="block text-sm font-sans text-[#0b1b34] mb-2">
                                Quantity
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0b1b34]"
                                required
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-sans text-[#0b1b34] mb-2">
                                Rental Price / Day
                            </label>

                            <input
                                type="number"
                                name="rentalPrice"
                                value={formData.rentalPrice}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0b1b34]"
                                required
                            />

                        </div>

                    </div>


                    <div>

                        <label className="block text-sm font-sans text-[#0b1b34] mb-2">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0b1b34]"
                        />

                    </div>


                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />

                        <label className="font-sans text-sm text-gray-600">
                            Available for rent
                        </label>

                    </div>


                    <div className="flex gap-4 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/my-equipments")}
                            className="flex-1 px-6 py-3 rounded-full bg-gray-200 text-[#0b1b34] text-sm hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Equipment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditEquipment;