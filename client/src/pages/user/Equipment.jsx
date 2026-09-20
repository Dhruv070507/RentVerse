import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEquipments } from "../../features/equipment/equipmentSlice";
import EquipmentCard from "../../components/EquipmentCard";
import Navbar from "../../components/navbar";


const Equipment = () => {

    const dispatch = useDispatch();

    const {
        equipments,
        loading,
        error
    } = useSelector((state) => state.equipment);


    // fetching equipments when the page loads
    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);


    // showing loading message while equipments are being fetched
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="font-sans text-sm text-gray-500">
                    Loading equipments...
                </p>
            </div>
        );
    }


    // showing error if the API request fails
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="font-sans text-sm text-red-500">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">

                {/* Page heading */}
                <div className="mb-12">

                    <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5 text-center">
                        EXPLORE EQUIPMENT
                    </p>

                    <h1 className="font-display text-5xl md:text-6xl text-[#0b1b34] text-center">
                        Find what you need.
                    </h1>

                    <p className="font-sans max-w-xl mt-5 text-base text-gray-500 leading-relaxed text-center mx-auto">
                        Discover equipment available for rent from people around you.
                    </p>

                </div>


                {/* Equipment */}
                {equipments.length === 0 ? (

                    <p className="font-sans text-sm text-gray-500">
                        No equipments available.
                    </p>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {equipments.map((equipment) => (
                            <EquipmentCard
                                key={equipment._id}
                                equipment={equipment}
                            />
                        ))}

                    </div>

                )}

            </main>

        </div>
    );
};


export default Equipment;