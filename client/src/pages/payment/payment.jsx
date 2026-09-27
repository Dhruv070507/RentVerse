import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    getRentalById
} from "../../features/rental/rentalSlice";

import {
    createPayment
} from "../../features/payment/paymentSlice";

import Navbar from "../../components/navbar";


const Payment = () => {

    const { rentalId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {
        rental,
        loading: rentalLoading,
        error: rentalError
    } = useSelector((state) => state.rental);


    const {
        payment,
        loading: paymentLoading,
        error: paymentError
    } = useSelector((state) => state.payment);


    const [paymentMethod, setPaymentMethod] = useState("");


    useEffect(() => {

        dispatch(getRentalById(rentalId));

    }, [dispatch, rentalId]);


    const handlePayment = async (e) => {

        e.preventDefault();

        if (!paymentMethod) {
            return;
        }


        try {

            await dispatch(
                createPayment({
                    rentalId,
                    paymentMethod
                })
            ).unwrap();


            navigate("/payment/success");

        } catch (error) {

            console.log("Payment failed:", error);

        }
    };


    if (rentalLoading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading payment details...</p>
            </div>
        );

    }


    if (rentalError) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    {rentalError}
                </p>
            </div>
        );

    }


    if (!rental) {
        return null;
    }


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            <div className="max-w-3xl mx-auto px-6 py-12">

                <div className="text-center mb-10">

                    <h1 className="font-serif text-4xl text-[#0b1b34]">
                        Payment
                    </h1>

                    <p className="font-sans text-gray-500 mt-2">
                        Complete your payment for this rental.
                    </p>

                </div>


                <div className="bg-gray-50 rounded-2xl p-6 mb-8">

                    <h2 className="font-serif text-2xl text-[#0b1b34]">
                        Rental Details
                    </h2>


                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Equipment
                            </span>

                            <span className="text-[#0b1b34] font-medium">
                                {rental.equipment?.name}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Quantity
                            </span>

                            <span>
                                {rental.quantity}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Start Date
                            </span>

                            <span>
                                {new Date(
                                    rental.rentalStartDate
                                ).toLocaleDateString()}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                End Date
                            </span>

                            <span>
                                {new Date(
                                    rental.rentalEndDate
                                ).toLocaleDateString()}
                            </span>
                        </div>


                        <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between">

                            <span className="font-semibold text-[#0b1b34]">
                                Total
                            </span>

                            <span className="font-semibold text-[#0b1b34]">
                                ₹{rental.totalPrice}
                            </span>

                        </div>

                    </div>

                </div>


                <form
                    onSubmit={handlePayment}
                    className="space-y-6"
                >

                    <div>

                        <label className="block font-sans text-sm text-[#0b1b34] mb-3">
                            Payment Method
                        </label>


                        <div className="space-y-3">

                            <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 cursor-pointer">

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit_card"
                                    checked={
                                        paymentMethod === "credit_card"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <span>
                                    Credit Card
                                </span>

                            </label>


                            <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 cursor-pointer">

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={
                                        paymentMethod === "paypal"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <span>
                                    PayPal
                                </span>

                            </label>


                            <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 cursor-pointer">

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank_transfer"
                                    checked={
                                        paymentMethod === "bank_transfer"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <span>
                                    Bank Transfer
                                </span>

                            </label>

                        </div>

                    </div>


                    {paymentError && (

                        <p className="text-red-500 text-sm">
                            {paymentError}
                        </p>

                    )}


                    <button
                        type="submit"
                        disabled={
                            paymentLoading ||
                            !paymentMethod
                        }
                        className="w-full px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition disabled:opacity-50"
                    >
                        {paymentLoading
                            ? "Processing..."
                            : `Pay ₹${rental.totalPrice}`
                        }
                    </button>

                </form>

            </div>

        </div>
    );
};


export default Payment;