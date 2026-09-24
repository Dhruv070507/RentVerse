import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMyPayments,
    updatePaymentStatus
} from "../../features/payment/paymentSlice";
import Navbar from "../../components/navbar";

const Payments = () => {

    const dispatch = useDispatch();

    const {
        payments,
        loading,
        error
    } = useSelector((state) => state.payment);


    useEffect(() => {
        dispatch(getMyPayments());
    }, [dispatch]);


    const handlePaymentStatus = (paymentId, status) => {

        dispatch(
            updatePaymentStatus({
                paymentId,
                status
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
                            Loading payments...
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
                            PAYMENT ACTIVITY
                        </p>

                        <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34] text-center">
                            My Payments
                        </h1>

                        <p className="font-sans text-gray-500 mt-3 text-center">
                            Track your rental payments.
                        </p>

                    </div>


                    {/* No payments */}

                    {payments.length === 0 ? (

                        <div className="border border-gray-200 rounded-2xl p-10 text-center">

                            <h2 className="font-display text-2xl text-[#0b1b34]">
                                No payments yet
                            </h2>

                            <p className="font-sans text-gray-500 mt-2">
                                Your rental payments will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {payments.map((payment) => (

                                <div
                                    key={payment._id}
                                    className="border border-gray-200 rounded-2xl p-6"
                                >

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                        <div>

                                            <h2 className="font-display text-2xl text-[#0b1b34]">
                                                ₹{payment.amount}
                                            </h2>

                                            <p className="font-sans text-sm text-gray-500 mt-1">
                                                Payment method: {payment.paymentMethod}
                                            </p>

                                        </div>


                                        <span
                                            className={`font-sans text-xs px-3 py-1.5 rounded-full ${
                                                payment.paymentStatus === "pending"
                                                    ? "bg-yellow-50 text-yellow-700"
                                                    : payment.paymentStatus === "completed"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-700"
                                            }`}
                                        >
                                            {payment.paymentStatus}
                                        </span>

                                    </div>


                                    {payment.paymentStatus === "pending" && (

                                        <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">

                                            <button
                                                onClick={() =>
                                                    handlePaymentStatus(
                                                        payment._id,
                                                        "completed"
                                                    )
                                                }
                                                className="font-sans text-sm px-5 py-2 rounded-full bg-[#0b1b34] text-white hover:bg-[#142944] transition"
                                            >
                                                Complete Payment
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handlePaymentStatus(
                                                        payment._id,
                                                        "failed"
                                                    )
                                                }
                                                className="font-sans text-sm px-5 py-2 rounded-full bg-gray-100 text-[#0b1b34] hover:bg-gray-200 transition"
                                            >
                                                Mark Failed
                                            </button>

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


export default Payments;