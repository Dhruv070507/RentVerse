import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    getMyPayments
} from "../../features/paymentSlice";

import {
    getMyRentals,
    cancelRental
} from "../../features/rentalSlice";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";


const MyRentals = () => {

    const dispatch = useDispatch();

    const {
        rentals,
        loading,
        error
    } = useSelector((state) => state.rental);

    const {
        payments
    } = useSelector((state) => state.payment);


    useEffect(() => {

        dispatch(getMyRentals());
        dispatch(getMyPayments());

    }, [dispatch]);



    const handleCancel = (rentalId) => {

        if (window.confirm("Are you sure you want to cancel this rental request?")) {

            dispatch(cancelRental(rentalId));

        }

    };


    const activeRentals = rentals.filter(
        (rental) => rental.status === "approved"
    );


    const pendingRequests = rentals.filter(
        (rental) => rental.status === "pending"
    );


    const completedRentals = rentals.filter(
        (rental) =>
            rental.status === "completed" ||
            rental.status === "cancelled" ||
            rental.status === "rejected"
    );


    if (loading) {

        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="pt-32 px-6 pb-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="max-w-2xl">

                            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                RENTAL ACTIVITY
                            </p>

                            <h1 className="font-display text-5xl text-[#0b1b34]">
                                My Rentals
                            </h1>

                            <p className="font-sans text-gray-500 mt-4">
                                Loading your rental activity...
                            </p>

                        </div>

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

                        <div className="border-y border-gray-200 py-10">

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


            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="pt-32 pb-20 px-6">

                <div className="max-w-7xl mx-auto">

                    <div className="max-w-3xl">

                        <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-5">
                            YOUR RENTAL ACTIVITY
                        </p>

                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#0b1b34]">
                            Everything you're
                            <br />
                            renting.
                        </h1>

                        <p className="font-sans text-gray-500 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
                            Keep track of your equipment rentals, pending
                            requests, rental periods, payments, and activity
                            from one place.
                        </p>

                    </div>


                    {/* Summary */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200">

                        <div>

                            <p className="font-sans text-xs uppercase tracking-[0.18em] text-gray-400">
                                Active rentals
                            </p>

                            <p className="font-display text-4xl text-[#0b1b34] mt-2">
                                {activeRentals.length}
                            </p>

                        </div>


                        <div>

                            <p className="font-sans text-xs uppercase tracking-[0.18em] text-gray-400">
                                Pending requests
                            </p>

                            <p className="font-display text-4xl text-[#0b1b34] mt-2">
                                {pendingRequests.length}
                            </p>

                        </div>


                        <div>

                            <p className="font-sans text-xs uppercase tracking-[0.18em] text-gray-400">
                                Total activity
                            </p>

                            <p className="font-display text-4xl text-[#0b1b34] mt-2">
                                {rentals.length}
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                ACTIVE RENTALS
            ===================================================== */}

            <section className="bg-[#0b1b34] text-white py-20 px-6">

                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase mb-4">
                                CURRENTLY RENTING
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl">
                                Active rentals
                            </h2>

                            <p className="font-sans text-white/60 mt-4 max-w-xl">
                                Equipment that has been approved and is
                                currently part of your rental activity.
                            </p>

                        </div>

                    </div>


                    {activeRentals.length === 0 ? (

                        <div className="border-y border-white/10 py-12">

                            <p className="font-sans text-white/60">
                                You don't have any active rentals yet.
                            </p>

                            <Link
                                to="/equipment"
                                className="inline-block mt-5 text-sm text-white underline underline-offset-4"
                            >
                                Explore equipment →
                            </Link>

                        </div>

                    ) : (

                       <div className="space-y-0">

    {activeRentals.map((rental) => {

        const payment = payments?.find(
            (payment) =>
                payment.rental?._id === rental._id ||
                payment.rental === rental._id
        );

        return (

            <div
                key={rental._id}
                className="border-t border-white/10 py-8 last:border-b"
            >

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_auto] gap-8 lg:items-center">

                    {/* Equipment */}

                    <div>

                        <div className="flex items-center gap-3 mb-4">

                            <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                                Active rental
                            </span>

                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs capitalize">
                                {rental.status}
                            </span>

                        </div>


                        <h3 className="font-display text-3xl">
                            {rental.equipment?.name || "Equipment"}
                        </h3>


                        <p className="font-sans text-sm text-white/50 mt-2">
                            Rented from{" "}
                            {rental.owner?.username || "Equipment owner"}
                        </p>

                    </div>


                    {/* Rental details */}

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                                Rental period
                            </p>


                            <p className="font-sans text-sm mt-2">
                                {new Date(
                                    rental.rentalStartDate
                                ).toLocaleDateString()}
                            </p>


                            <p className="font-sans text-sm text-white/50">
                                to{" "}
                                {new Date(
                                    rental.rentalEndDate
                                ).toLocaleDateString()}
                            </p>

                        </div>


                        <div>

                            <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                                Total
                            </p>


                            <p className="font-display text-2xl mt-2">
                                ₹{rental.totalPrice}
                            </p>


                            <p className="text-sm text-white/50">
                                Qty. {rental.quantity}
                            </p>

                        </div>

                    </div>


                    {/* Payment action */}

                    <div className="lg:text-right">

                        {payment?.paymentStatus === "completed" ? (

                            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-50 text-green-700 text-sm font-medium">

                                <span className="w-2 h-2 rounded-full bg-green-500"></span>

                                Paid

                            </div>

                        ) : payment?.paymentStatus === "pending" ? (

                            <Link
                                to={`/payment/${rental._id}`}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0b1b34] text-sm font-medium hover:bg-gray-100 transition"
                            >
                                Complete Payment
                            </Link>

                        ) : (

                            <Link
                                to={`/payment/${rental._id}`}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0b1b34] text-sm font-medium hover:bg-gray-100 transition"
                            >
                                Pay Now
                            </Link>

                        )}

                    </div>

                </div>

            </div>

        );

    })}

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                PENDING REQUESTS
            ===================================================== */}

            <section className="py-20 px-6">

                <div className="max-w-7xl mx-auto">

                    <div className="max-w-2xl mb-12">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                            WAITING FOR APPROVAL
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                            Pending requests
                        </h2>

                        <p className="font-sans text-gray-500 mt-4">
                            Requests you've sent to equipment owners.
                            Once approved, they'll move into your active
                            rentals.
                        </p>

                    </div>


                    {pendingRequests.length === 0 ? (

                        <div className="border-y border-gray-200 py-12">

                            <p className="font-sans text-sm text-gray-500">
                                You don't have any pending rental requests.
                            </p>

                        </div>

                    ) : (

                        <div>

                            {pendingRequests.map((rental) => (

                                <div
                                    key={rental._id}
                                    className="border-t border-gray-200 py-8 last:border-b"
                                >

                                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_auto] gap-8 lg:items-center">

                                        <div>

                                            <div className="flex items-center gap-3 mb-3">

                                                <span className="text-xs uppercase tracking-[0.15em] text-gray-400">
                                                    Rental request
                                                </span>

                                                <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs capitalize">
                                                    {rental.status}
                                                </span>

                                            </div>

                                            <h3 className="font-display text-2xl text-[#0b1b34]">
                                                {rental.equipment?.name || "Equipment"}
                                            </h3>

                                            <p className="font-sans text-sm text-gray-500 mt-2">
                                                Owner:{" "}
                                                {rental.owner?.username || "Equipment owner"}
                                            </p>

                                        </div>


                                        <div className="grid grid-cols-2 gap-6">

                                            <div>

                                                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                                                    Requested period
                                                </p>

                                                <p className="text-sm text-[#0b1b34] mt-2">
                                                    {new Date(
                                                        rental.rentalStartDate
                                                    ).toLocaleDateString()}
                                                </p>

                                                <p className="text-sm text-gray-400">
                                                    to{" "}
                                                    {new Date(
                                                        rental.rentalEndDate
                                                    ).toLocaleDateString()}
                                                </p>

                                            </div>


                                            <div>

                                                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                                                    Amount
                                                </p>

                                                <p className="font-display text-2xl text-[#0b1b34] mt-2">
                                                    ₹{rental.totalPrice}
                                                </p>

                                                <p className="text-sm text-gray-400">
                                                    Qty. {rental.quantity}
                                                </p>

                                            </div>

                                        </div>


                                        <div>

                                            <button
                                                onClick={() =>
                                                    handleCancel(rental._id)
                                                }
                                                className="px-6 py-3 rounded-full border border-gray-200 text-[#0b1b34] text-sm hover:border-gray-400 transition"
                                            >
                                                Cancel request
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                HISTORY
            ===================================================== */}

            {completedRentals.length > 0 && (

                <section className="bg-gray-50 py-20 px-6">

                    <div className="max-w-7xl mx-auto">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    PAST ACTIVITY
                                </p>

                                <h2 className="font-display text-4xl text-[#0b1b34]">
                                    Rental history
                                </h2>

                            </div>

                        </div>


                        <div>

                            {completedRentals.map((rental) => (

                                <div
                                    key={rental._id}
                                    className="border-t border-gray-200 py-7 last:border-b"
                                >

                                    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-6 md:items-center">

                                        <div>

                                            <h3 className="font-display text-xl text-[#0b1b34]">
                                                {rental.equipment?.name || "Equipment"}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {rental.owner?.username || "Equipment owner"}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                                                Period
                                            </p>

                                            <p className="text-sm text-gray-600 mt-2">
                                                {new Date(
                                                    rental.rentalStartDate
                                                ).toLocaleDateString()}
                                                {" — "}
                                                {new Date(
                                                    rental.rentalEndDate
                                                ).toLocaleDateString()}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                                                Amount
                                            </p>

                                            <p className="font-display text-xl text-[#0b1b34] mt-2">
                                                ₹{rental.totalPrice}
                                            </p>

                                        </div>


                                        <div>

                                            <span className={`inline-block px-3 py-1.5 rounded-full text-xs capitalize ${
                                                rental.status === "completed"
                                                    ? "bg-green-50 text-green-700"
                                                    : rental.status === "cancelled"
                                                    ? "bg-gray-100 text-gray-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}>
                                                {rental.status}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="bg-[#0b1b34] px-6 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

                        <div className="max-w-2xl">

                            <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                NEED SOMETHING ELSE?
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl text-white">
                                Find your next piece of equipment.
                            </h2>

                            <p className="font-sans text-white/60 mt-4 max-w-xl">
                                Explore equipment from other users and find
                                what you need for your next project.
                            </p>

                        </div>


                        <Link
                            to="/equipment"
                            className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-white text-[#0b1b34] text-sm font-medium hover:bg-gray-100 transition whitespace-nowrap"
                        >
                            Explore equipment →
                        </Link>

                    </div>

                </div>

            </section>


            <Footer />

        </div>
    );
};


export default MyRentals;