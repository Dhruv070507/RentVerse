import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRentalRequests,
    updateRentalStatus
} from "../../features/rentalSlice";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";

const RentalRequests = () => {

    const dispatch = useDispatch();

    const {
        rentalRequests,
        loading,
        error
    } = useSelector((state) => state.rental);


    useEffect(() => {
        dispatch(getRentalRequests());
    }, [dispatch]);


    const handleUpdateStatus = (rentalId, status) => {

        dispatch(
            updateRentalStatus({
                rentalId,
                status
            })
        );

    };


    if (loading) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="pt-32 px-6 pb-20">

                    <div className="max-w-7xl mx-auto">

                        <p className="font-sans text-sm text-gray-500">
                            Loading rental requests...
                        </p>

                    </div>

                </main>

                <Footer />

            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="pt-32 px-6 pb-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="border-y border-gray-100 py-10">

                            <p className="font-sans text-sm text-red-500">
                                {error}
                            </p>

                        </div>

                    </div>

                </main>

                <Footer />

            </div>
        );
    }


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
                                EQUIPMENT ACTIVITY
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0b1b34]">
                                Rental
                                <br />
                                requests.
                            </h1>

                            <p className="font-sans text-gray-500 text-base md:text-lg leading-relaxed mt-7 max-w-2xl">
                                Review people who want to rent your equipment,
                                check their rental details, and decide whether
                                to approve or reject their request.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    NAVY INTRO SECTION
                ===================================================== */}

                <section className="bg-[#0b1b34] text-white px-6 py-16">

                    <div className="max-w-7xl mx-auto">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

                            <div>

                                <p className="font-sans text-xs tracking-[0.25em] text-white/40 uppercase mb-4">
                                    REQUEST OVERVIEW
                                </p>

                                <h2 className="font-display text-4xl md:text-5xl">
                                    People want to rent
                                    <br />
                                    your equipment.
                                </h2>

                            </div>


                            <div className="md:text-right">

                                <p className="font-display text-5xl">
                                    {rentalRequests.length}
                                </p>

                                <p className="font-sans text-sm text-white/50 mt-1">
                                    Total requests
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    REQUESTS
                ===================================================== */}

                <section className="px-6 py-20">

                    <div className="max-w-7xl mx-auto">

                        {rentalRequests.length === 0 ? (

                            <div className="border-y border-gray-100 py-20">

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    NO ACTIVITY
                                </p>

                                <h2 className="font-display text-4xl text-[#0b1b34]">
                                    No rental requests yet.
                                </h2>

                                <p className="font-sans text-gray-500 mt-4 max-w-xl">
                                    When someone requests to rent one of your
                                    equipment items, their request will appear
                                    here.
                                </p>

                            </div>

                        ) : (

                            <div>

                                {/* Section heading */}

                                <div className="mb-10">

                                    <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">
                                        ALL REQUESTS
                                    </p>

                                    <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                        Manage your requests.
                                    </h2>

                                </div>


                                {/* Request list */}

                                <div className="border-t border-gray-100">

                                    {rentalRequests.map((request) => (

                                        <div
                                            key={request._id}
                                            className="py-10 border-b border-gray-100"
                                        >

                                            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_auto] gap-10 lg:items-center">


                                                {/* =================================================
                                                    EQUIPMENT + RENTER
                                                ================================================= */}

                                                <div>

                                                    <div className="flex items-center gap-3 mb-4">

                                                        <span className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                                                            Rental request
                                                        </span>


                                                        <span
                                                            className={`
                                                                text-xs
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                capitalize
                                                                ${
                                                                    request.status === "pending"
                                                                        ? "bg-yellow-50 text-yellow-700"
                                                                        : request.status === "approved"
                                                                        ? "bg-green-50 text-green-700"
                                                                        : request.status === "rejected"
                                                                        ? "bg-red-50 text-red-700"
                                                                        : request.status === "cancelled"
                                                                        ? "bg-gray-100 text-gray-600"
                                                                        : "bg-blue-50 text-blue-700"
                                                                }
                                                            `}
                                                        >
                                                            {request.status}
                                                        </span>

                                                    </div>


                                                    <h3 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                                        {request.equipment?.name || "Equipment"}
                                                    </h3>


                                                    <p className="font-sans text-sm text-gray-500 mt-3">
                                                        Requested by{" "}
                                                        <span className="text-[#0b1b34] font-medium">
                                                            {request.renter?.username || "User"}
                                                        </span>
                                                    </p>

                                                </div>


                                                {/* =================================================
                                                    DETAILS
                                                ================================================= */}

                                                <div className="grid grid-cols-2 gap-8">

                                                    <div>

                                                        <p className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                                                            Rental period
                                                        </p>

                                                        <p className="font-sans text-sm text-[#0b1b34] mt-2">
                                                            {new Date(
                                                                request.rentalStartDate
                                                            ).toLocaleDateString()}
                                                        </p>

                                                        <p className="font-sans text-sm text-gray-400 mt-1">
                                                            to{" "}
                                                            {new Date(
                                                                request.rentalEndDate
                                                            ).toLocaleDateString()}
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                                                            Total
                                                        </p>

                                                        <p className="font-display text-2xl text-[#0b1b34] mt-2">
                                                            ₹{request.totalPrice}
                                                        </p>

                                                        <p className="font-sans text-sm text-gray-400 mt-1">
                                                            Qty. {request.quantity}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* =================================================
                                                    ACTION
                                                ================================================= */}

                                                <div className="lg:text-right">

                                                    {request.status === "pending" ? (

                                                        <div className="flex lg:flex-col gap-3 lg:items-end">

                                                            <button
                                                                onClick={() =>
                                                                    handleUpdateStatus(
                                                                        request._id,
                                                                        "approved"
                                                                    )
                                                                }
                                                                className="px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition"
                                                            >
                                                                Approve request
                                                            </button>


                                                            <button
                                                                onClick={() =>
                                                                    handleUpdateStatus(
                                                                        request._id,
                                                                        "rejected"
                                                                    )
                                                                }
                                                                className="px-6 py-3 rounded-full border border-gray-200 text-[#0b1b34] text-sm font-medium hover:bg-gray-50 transition"
                                                            >
                                                                Reject
                                                            </button>

                                                        </div>

                                                    ) : (

                                                        <div className="lg:text-right">

                                                            <p className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                                                                Requested
                                                            </p>

                                                            <p className="font-sans text-sm text-[#0b1b34] mt-2">
                                                                {new Date(
                                                                    request.createdAt
                                                                ).toLocaleDateString()}
                                                            </p>

                                                        </div>

                                                    )}

                                                </div>

                                            </div>


                                            {/* =================================================
                                                BOTTOM INFORMATION
                                            ================================================= */}

                                            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                                <div className="flex flex-wrap gap-x-8 gap-y-2">

                                                    <div>

                                                        <span className="font-sans text-xs text-gray-400 uppercase tracking-wider">
                                                            Requested
                                                        </span>

                                                        <span className="font-sans text-sm text-[#0b1b34] ml-2">
                                                            {new Date(
                                                                request.createdAt
                                                            ).toLocaleDateString()}
                                                        </span>

                                                    </div>


                                                    <div>

                                                        <span className="font-sans text-xs text-gray-400 uppercase tracking-wider">
                                                            Quantity
                                                        </span>

                                                        <span className="font-sans text-sm text-[#0b1b34] ml-2">
                                                            {request.quantity}
                                                        </span>

                                                    </div>

                                                </div>


                                                <p className="font-sans text-xs text-gray-400">
                                                    Request ID: {request._id}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

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
                                Keep your equipment
                                <br />
                                working for you.
                            </h2>

                            <p className="font-sans text-gray-500 mt-5 max-w-xl leading-relaxed">
                                Approve the right requests and let your
                                equipment reach more people through RentVerse.
                            </p>

                        </div>

                    </div>

                </section>

            </main>


            <Footer />

        </div>
    );
};


export default RentalRequests;