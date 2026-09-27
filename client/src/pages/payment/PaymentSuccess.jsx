import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const PaymentSuccess = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <div className="min-h-[80vh] flex items-center justify-center px-6">

                <div className="text-center max-w-md">

                    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">

                        <span className="text-3xl text-green-600">
                            ✓
                        </span>

                    </div>

                    <h1 className="font-serif text-4xl text-[#0b1b34]">
                        Payment Successful
                    </h1>

                    <p className="font-sans text-gray-500 mt-3">
                        Your payment has been completed successfully.
                    </p>

                    <div className="flex justify-center gap-3 mt-8">

                        <button
                            onClick={() => navigate("/my-rentals")}
                            className="px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                        >
                            View My Rentals
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 rounded-full bg-gray-200 text-[#0b1b34] text-sm hover:bg-gray-300 transition"
                        >
                            Go Home
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PaymentSuccess;