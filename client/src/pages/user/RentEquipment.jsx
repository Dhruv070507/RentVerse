import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { createRental } from "../../features/rental/rentalSlice";


const RentEquipment = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {
        loading,
        error
    } = useSelector((state) => state.rental);


    const [quantity, setQuantity] = useState(1);
    const [rentalStartDate, setRentalStartDate] = useState("");
    const [rentalEndDate, setRentalEndDate] = useState("");
    const [address, setAddress] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();


        const rentalData = {
            equipmentId: id,
            quantity: Number(quantity),
            rentalStartDate,
            rentalEndDate,
            address
        };


        const result = await dispatch(
            createRental(rentalData)
        );


        if (createRental.fulfilled.match(result)) {

            navigate("/dashboard");

        }

    };


    return (
        <div className="min-h-screen bg-white">

            <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">

                {/* Page heading */}
                <div className="mb-12">

                    <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                        RENT EQUIPMENT
                    </p>

                    <h1 className="font-display text-5xl text-[#0b1b34]">
                        Rent this equipment.
                    </h1>

                    <p className="font-sans mt-5 text-base text-gray-500 leading-relaxed">
                        Choose your rental period and provide your delivery
                        address to continue.
                    </p>

                </div>


                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-500 font-sans text-sm">
                        {error}
                    </div>
                )}


                {/* Rental form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Quantity */}
                    <div>

                        <label className="font-sans text-sm text-[#0b1b34]">
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0b1b34]"
                            required
                        />

                    </div>


                    {/* Start date */}
                    <div>

                        <label className="font-sans text-sm text-[#0b1b34]">
                            Rental Start Date
                        </label>

                        <input
                            type="date"
                            value={rentalStartDate}
                            onChange={(e) =>
                                setRentalStartDate(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0b1b34]"
                            required
                        />

                    </div>


                    {/* End date */}
                    <div>

                        <label className="font-sans text-sm text-[#0b1b34]">
                            Rental End Date
                        </label>

                        <input
                            type="date"
                            value={rentalEndDate}
                            onChange={(e) =>
                                setRentalEndDate(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0b1b34]"
                            required
                        />

                    </div>


                    {/* Delivery address */}
                    <div>

                        <label className="font-sans text-sm text-[#0b1b34]">
                            Delivery Address
                        </label>

                        <textarea
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            rows="4"
                            placeholder="Enter your delivery address"
                            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0b1b34] resize-none"
                            required
                        />

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-[#0b1b34] text-white font-sans text-sm hover:bg-[#142944] transition disabled:opacity-50"
                    >
                        {loading
                            ? "Requesting..."
                            : "Request Rental"}
                    </button>

                </form>

            </main>

        </div>
    );
};


export default RentEquipment;