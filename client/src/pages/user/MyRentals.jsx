import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMyRentals,
    cancelRental
} from "../../features/rental/rentalSlice";
import { createPayment } from "../../features/payment/paymentSlice";
import Navbar from "../../components/navbar";


const MyRentals = () => {

    const dispatch = useDispatch();

    const { rentals, loading, error } = useSelector(
        (state) => state.rental
    );


    useEffect(() => {
        dispatch(getMyRentals());
    }, [dispatch]);


    const handleCancelRental = (rentalId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this rental?"
        );

        if (!confirmed)
            return;

        dispatch(cancelRental(rentalId));
    };

    const handlePayment = (rentalId) => {
        dispatch(
            createPayment({
                rentalId,
                paymentMethod: "online"
            })
        );
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="pt-32 px-6">

                    <div className="max-w-6xl mx-auto">

                        <p className="font-sans text-sm text-gray-500">
                            Loading your rentals...
                        </p>

                    </div>

                </main>

            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="pt-32 px-6">

                    <div className="max-w-6xl mx-auto">

                        <p className="font-sans text-sm text-red-500">
                            {error}
                        </p>

                    </div>

                </main>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <main className="pt-32 px-6 pb-16">

                <section className="max-w-6xl mx-auto">

                    {/* Page heading */}

                    <div className="mb-10">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-3 text-center">
                            RENTAL ACTIVITY
                        </p>

                        <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34] text-center">
                            My Rentals
                        </h1>

                        <p className="font-sans text-gray-500 mt-3 text-center">
                            Track the equipment you have requested.
                        </p>

                    </div>


                    {/* No rentals */}

                    {rentals.length === 0 ? (

                        <div className="border border-gray-200 rounded-2xl p-10 text-center">

                            <h2 className="font-display text-2xl text-[#0b1b34]">
                                No rentals yet
                            </h2>

                            <p className="font-sans text-gray-500 mt-2">
                                You haven't requested any equipment yet.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {rentals.map((rental) => (

                                <div
                                    key={rental._id}
                                    className="border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition"
                                >

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                        {/* Equipment information */}

                                        <div>

                                            <h2 className="font-display text-2xl text-[#0b1b34]">
                                                {rental.equipment?.name}
                                            </h2>

                                            <p className="font-sans text-sm text-gray-500 mt-1">
                                                Owner: {rental.owner?.username}
                                            </p>

                                        </div>


                                        {/* Status */}

                                        <div>

                                            <span
                                                className={`font-sans text-xs px-3 py-1.5 rounded-full ${
                                                    rental.status === "pending"
                                                        ? "bg-yellow-50 text-yellow-700"
                                                        : rental.status === "approved"
                                                        ? "bg-green-50 text-green-700"
                                                        : rental.status === "rejected"
                                                        ? "bg-red-50 text-red-700"
                                                        : rental.status === "cancelled"
                                                        ? "bg-gray-100 text-gray-600"
                                                        : "bg-blue-50 text-blue-700"
                                                }`}
                                            >
                                                {rental.status}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Rental details */}

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-100">

                                        <div>
                                            <p className="font-sans text-xs text-gray-400">
                                                RENTAL PERIOD
                                            </p>

                                            <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                {new Date(
                                                    rental.rentalStartDate
                                                ).toLocaleDateString()}
                                                {" → "}
                                                {new Date(
                                                    rental.rentalEndDate
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="font-sans text-xs text-gray-400">
                                                QUANTITY
                                            </p>

                                            <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                {rental.quantity}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="font-sans text-xs text-gray-400">
                                                TOTAL PRICE
                                            </p>

                                            <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                ₹{rental.totalPrice}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="font-sans text-xs text-gray-400">
                                                REQUESTED
                                            </p>

                                            <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                {new Date(
                                                    rental.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Cancel rental */}

                                    {rental.status === "pending" && (

                                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">

                                            <button
                                                onClick={() =>
                                                    handleCancelRental(
                                                        rental._id
                                                    )
                                                }
                                                className="font-sans text-sm text-red-600 hover:text-red-700 transition "
                                            >
                                                Cancel Rental
                                            </button>

                                            {rental.status === "approved" && (
                                                <div className="mt-6 pt-5 border-t border-gray-100">

                                                    <button
                                                        onClick={() => handlePayment(rental._id)}
                                                        className="font-sans text-sm px-5 py-2 rounded-full bg-[#0b1b34] text-white hover:bg-[#142944] transition"
                                                    >
                                                        Pay Now
                                                    </button>

                                                </div>
                                            )}
                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
};


export default MyRentals;