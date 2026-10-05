import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPayments } from "../../features/paymentSlice.js";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";

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


    if (loading) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <main className="pt-32 px-6 pb-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="py-20 text-center">

                            <p className="font-sans text-sm text-gray-500">
                                Loading payment activity...
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

                        <div className="border-y border-gray-100 py-16">

                            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                                PAYMENT ACTIVITY
                            </p>

                            <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                Something went wrong.
                            </h1>

                            <p className="font-sans text-sm text-red-500 mt-4">
                                {error}
                            </p>

                        </div>

                    </div>

                </main>

                <Footer />

            </div>
        );
    }


    const completedPayments = payments.filter(
        (payment) => payment.paymentStatus === "completed"
    );

    const totalPaid = completedPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            <main className="pt-28 pb-24">


                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="px-6">

                    <div className="max-w-7xl mx-auto">

                        <div className="max-w-3xl py-16 md:py-20">

                            <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-5">
                                PAYMENT ACTIVITY
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0b1b34]">
                                Your payments,
                                <br />
                                all in one place.
                            </h1>

                            <p className="font-sans text-base md:text-lg text-gray-500 leading-7 mt-7 max-w-2xl">
                                Keep track of the payments you've made for
                                equipment rentals and view the status of each
                                transaction.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    SUMMARY
                ===================================================== */}

                <section className="bg-[#0b1b34] text-white">

                    <div className="max-w-7xl mx-auto px-6 py-14">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">
                                    TOTAL PAYMENTS
                                </p>

                                <p className="font-display text-4xl md:text-5xl mt-3">
                                    {payments.length}
                                </p>

                            </div>


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">
                                    COMPLETED
                                </p>

                                <p className="font-display text-4xl md:text-5xl mt-3">
                                    {completedPayments.length}
                                </p>

                            </div>


                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">
                                    TOTAL PAID
                                </p>

                                <p className="font-display text-4xl md:text-5xl mt-3">
                                    ₹{totalPaid.toLocaleString("en-IN")}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    PAYMENT HISTORY
                ===================================================== */}

                <section className="px-6 pt-20">

                    <div className="max-w-7xl mx-auto">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">
                                    TRANSACTION HISTORY
                                </p>

                                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                    Recent payments
                                </h2>

                            </div>

                            <p className="font-sans text-sm text-gray-500 max-w-sm md:text-right">
                                A record of your rental payment activity on
                                RentVerse.
                            </p>

                        </div>


                        {payments.length === 0 ? (

                            <div className="border-y border-gray-100 py-16">

                                <h3 className="font-display text-3xl text-[#0b1b34]">
                                    No payments yet.
                                </h3>

                                <p className="font-sans text-gray-500 mt-3 max-w-md">
                                    Once you complete a payment for an approved
                                    rental, your transaction will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="border-t border-gray-200">

                                {payments.map((payment, index) => (

                                    <div
                                        key={payment._id}
                                        className="py-7 border-b border-gray-100"
                                    >

                                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-6 lg:gap-12 lg:items-center">


                                            {/* PAYMENT INFORMATION */}

                                            <div className="flex items-start gap-5">

                                                <div className="hidden sm:flex w-11 h-11 rounded-full bg-gray-50 items-center justify-center shrink-0">

                                                    <span className="font-sans text-sm font-medium text-[#0b1b34]">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                </div>


                                                <div>

                                                    <h3 className="font-display text-2xl text-[#0b1b34]">

                                                        {payment.rental?.equipment?.name ||
                                                            "Rental payment"}

                                                    </h3>

                                                    <p className="font-sans text-sm text-gray-500 mt-1">

                                                        {payment.rental?.rentalStartDate
                                                            ? new Date(
                                                                payment.rental.rentalStartDate
                                                            ).toLocaleDateString()
                                                            : "Date unavailable"
                                                        }

                                                        {" — "}

                                                        {payment.rental?.rentalEndDate
                                                            ? new Date(
                                                                payment.rental.rentalEndDate
                                                            ).toLocaleDateString()
                                                            : "Date unavailable"
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* AMOUNT */}

                                            <div className="lg:text-right">

                                                <p className="font-sans text-xs tracking-[0.15em] uppercase text-gray-400">
                                                    Amount
                                                </p>

                                                <p className="font-display text-2xl text-[#0b1b34] mt-1">
                                                    ₹{payment.amount.toLocaleString("en-IN")}
                                                </p>

                                            </div>


                                            {/* STATUS */}

                                            <div className="lg:min-w-[130px]">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        font-sans
                                                        text-xs
                                                        uppercase
                                                        tracking-wider
                                                        px-4
                                                        py-2
                                                        rounded-full
                                                        ${
                                                            payment.paymentStatus === "completed"
                                                                ? "bg-green-50 text-green-700"
                                                                : payment.paymentStatus === "pending"
                                                                ? "bg-yellow-50 text-yellow-700"
                                                                : "bg-red-50 text-red-700"
                                                        }
                                                    `}
                                                >

                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />

                                                    {payment.paymentStatus}

                                                </span>

                                            </div>

                                        </div>


                                        {/* TRANSACTION DETAILS */}

                                        <div className="mt-6 ml-0 sm:ml-16 pt-5 border-t border-gray-100">

                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">

                                                {payment.razorpayOrderId && (

                                                    <div>

                                                        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400">
                                                            Razorpay Order
                                                        </p>

                                                        <p className="font-sans text-xs text-gray-600 mt-1 break-all">
                                                            {payment.razorpayOrderId}
                                                        </p>

                                                    </div>

                                                )}


                                                {payment.razorpayPaymentId && (

                                                    <div>

                                                        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400">
                                                            Payment ID
                                                        </p>

                                                        <p className="font-sans text-xs text-gray-600 mt-1 break-all">
                                                            {payment.razorpayPaymentId}
                                                        </p>

                                                    </div>

                                                )}


                                                {payment.createdAt && (

                                                    <div className="sm:ml-auto">

                                                        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400">
                                                            Created
                                                        </p>

                                                        <p className="font-sans text-xs text-gray-600 mt-1">
                                                            {new Date(
                                                                payment.createdAt
                                                            ).toLocaleDateString()}
                                                        </p>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </section>


                {/* =====================================================
                    SECURITY / TRUST
                ===================================================== */}

                <section className="px-6 pt-24">

                    <div className="max-w-7xl mx-auto">

                        <div className="bg-gray-50 px-8 py-12 md:px-12 md:py-14 rounded-3xl">

                            <div className="max-w-2xl">

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    SECURE PAYMENTS
                                </p>

                                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                    Simple, secure rental payments.
                                </h2>

                                <p className="font-sans text-gray-500 leading-7 mt-4">
                                    RentVerse uses Razorpay to process rental
                                    payments securely. Your payment activity
                                    and transaction status are kept connected
                                    to the rental they belong to.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </main>


            <Footer />

        </div>
    );
};


export default Payments;