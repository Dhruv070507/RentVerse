import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { createRental } from "../../features/rentalSlice";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


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
            navigate("/");
        }

    };


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            <main className="pt-28">

                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="px-6 pt-12 pb-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="max-w-3xl">

                            <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-5">
                                RENT EQUIPMENT
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0b1b34]">
                                Make your
                                <br />
                                rental request.
                            </h1>

                            <p className="font-sans text-gray-500 text-base md:text-lg leading-relaxed mt-7 max-w-2xl">
                                Choose how much equipment you need, select your
                                rental period, and provide your delivery
                                details to send a request to the equipment
                                owner.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    NAVY INFORMATION SECTION
                ===================================================== */}

                <section className="bg-[#0b1b34] text-white px-6 py-16">

                    <div className="max-w-7xl mx-auto">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                            <div>

                                <p className="font-display text-3xl">
                                    01
                                </p>

                                <h2 className="font-sans font-medium text-lg mt-4">
                                    Choose quantity
                                </h2>

                                <p className="font-sans text-sm text-white/50 mt-2 leading-relaxed">
                                    Select the number of equipment units you
                                    need for your rental.
                                </p>

                            </div>


                            <div>

                                <p className="font-display text-3xl">
                                    02
                                </p>

                                <h2 className="font-sans font-medium text-lg mt-4">
                                    Select dates
                                </h2>

                                <p className="font-sans text-sm text-white/50 mt-2 leading-relaxed">
                                    Tell the equipment owner when you want to
                                    start and finish your rental.
                                </p>

                            </div>


                            <div>

                                <p className="font-display text-3xl">
                                    03
                                </p>

                                <h2 className="font-sans font-medium text-lg mt-4">
                                    Send your request
                                </h2>

                                <p className="font-sans text-sm text-white/50 mt-2 leading-relaxed">
                                    Provide your delivery address and submit
                                    your rental request.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    FORM SECTION
                ===================================================== */}

                <section className="px-6 py-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">


                            {/* =================================================
                                LEFT CONTENT
                            ================================================= */}

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    RENTAL DETAILS
                                </p>

                                <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34] leading-tight">
                                    Tell us what
                                    <br />
                                    you need.
                                </h2>

                                <p className="font-sans text-gray-500 mt-5 leading-relaxed max-w-md">
                                    Fill in the details below to send your
                                    rental request. The equipment owner will
                                    review your request before it is approved.
                                </p>


                                <div className="mt-10 pt-8 border-t border-gray-100">

                                    <p className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                                        REQUEST PROCESS
                                    </p>

                                    <div className="mt-5 space-y-5">

                                        <div className="flex gap-4">

                                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0b1b34] text-white text-xs flex items-center justify-center">
                                                1
                                            </span>

                                            <p className="font-sans text-sm text-gray-500 leading-relaxed">
                                                Submit your rental request.
                                            </p>

                                        </div>


                                        <div className="flex gap-4">

                                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 text-[#0b1b34] text-xs flex items-center justify-center">
                                                2
                                            </span>

                                            <p className="font-sans text-sm text-gray-500 leading-relaxed">
                                                Wait for the equipment owner
                                                to approve it.
                                            </p>

                                        </div>


                                        <div className="flex gap-4">

                                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 text-[#0b1b34] text-xs flex items-center justify-center">
                                                3
                                            </span>

                                            <p className="font-sans text-sm text-gray-500 leading-relaxed">
                                                Complete your payment after
                                                approval.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                FORM
                            ================================================= */}

                            <div>

                                {error && (

                                    <div className="mb-8 border-l-2 border-red-400 bg-red-50 px-5 py-4">

                                        <p className="font-sans text-sm text-red-600">
                                            {error}
                                        </p>

                                    </div>

                                )}


                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >

                                    {/* Quantity */}

                                    <div>

                                        <label className="block font-sans text-xs tracking-[0.15em] text-gray-400 uppercase mb-3">
                                            Quantity
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            className="
                                                w-full
                                                px-0
                                                py-4
                                                border-0
                                                border-b
                                                border-gray-200
                                                bg-transparent
                                                text-[#0b1b34]
                                                font-sans
                                                outline-none
                                                focus:border-[#0b1b34]
                                                transition
                                            "
                                            required
                                        />

                                    </div>


                                    {/* Dates */}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        <div>

                                            <label className="block font-sans text-xs tracking-[0.15em] text-gray-400 uppercase mb-3">
                                                Start date
                                            </label>

                                            <input
                                                type="date"
                                                value={rentalStartDate}
                                                onChange={(e) =>
                                                    setRentalStartDate(
                                                        e.target.value
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    px-0
                                                    py-4
                                                    border-0
                                                    border-b
                                                    border-gray-200
                                                    bg-transparent
                                                    text-[#0b1b34]
                                                    font-sans
                                                    outline-none
                                                    focus:border-[#0b1b34]
                                                    transition
                                                "
                                                required
                                            />

                                        </div>


                                        <div>

                                            <label className="block font-sans text-xs tracking-[0.15em] text-gray-400 uppercase mb-3">
                                                End date
                                            </label>

                                            <input
                                                type="date"
                                                value={rentalEndDate}
                                                onChange={(e) =>
                                                    setRentalEndDate(
                                                        e.target.value
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    px-0
                                                    py-4
                                                    border-0
                                                    border-b
                                                    border-gray-200
                                                    bg-transparent
                                                    text-[#0b1b34]
                                                    font-sans
                                                    outline-none
                                                    focus:border-[#0b1b34]
                                                    transition
                                                "
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Address */}

                                    <div>

                                        <label className="block font-sans text-xs tracking-[0.15em] text-gray-400 uppercase mb-3">
                                            Delivery address
                                        </label>

                                        <textarea
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            rows="5"
                                            placeholder="Enter your complete delivery address"
                                            className="
                                                w-full
                                                px-0
                                                py-4
                                                border-0
                                                border-b
                                                border-gray-200
                                                bg-transparent
                                                text-[#0b1b34]
                                                font-sans
                                                outline-none
                                                focus:border-[#0b1b34]
                                                transition
                                                resize-none
                                                placeholder:text-gray-300
                                            "
                                            required
                                        />

                                    </div>


                                    {/* Submit */}

                                    <div className="pt-4">

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="
                                                w-full
                                                md:w-auto
                                                min-w-[220px]
                                                px-8
                                                py-4
                                                rounded-full
                                                bg-[#0b1b34]
                                                text-white
                                                font-sans
                                                text-sm
                                                font-medium
                                                hover:bg-[#142944]
                                                transition
                                                disabled:opacity-50
                                                disabled:cursor-not-allowed
                                            "
                                        >
                                            {loading
                                                ? "Sending request..."
                                                : "Send rental request →"
                                            }
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    BOTTOM CTA
                ===================================================== */}

                <section className="bg-gray-50 px-6 py-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="max-w-3xl">

                            <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-4">
                                RENTVERSE
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                Simple requests.
                                <br />
                                Better rentals.
                            </h2>

                            <p className="font-sans text-gray-500 mt-5 max-w-xl leading-relaxed">
                                Once your request is approved by the equipment
                                owner, you'll be able to continue with the
                                payment process.
                            </p>

                        </div>

                    </div>

                </section>

            </main>


            <Footer />

        </div>
    );
};


export default RentEquipment;