import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyPayments } from "../../features/paymentSlice.js";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconCreditCard, IconAlert } from "../../components/Icons.jsx";

const Payments = () => {
    const dispatch = useDispatch();

    const {
        payments = [],
        loading,
        error
    } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(getMyPayments());
    }, [dispatch]);

    const completedPayments = payments.filter(
        (payment) => payment.paymentStatus === "completed"
    );

    const totalPaid = completedPayments.reduce(
        (total, payment) => total + (Number(payment.amount) || 0),
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading payment history...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 border-b border-slate-800 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-4">
                        Financial History
                    </span>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                        My Payment Receipts
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                        View transactions, download proof of payments, and track charges across all your equipment rentals with full transparency.
                    </p>
                </div>
            </section>

            {/* KPI Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 mb-8 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Total Spent
                        </span>
                        <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">
                            ₹{totalPaid}
                        </p>
                        <span className="text-xs text-slate-500 mt-1 block">Across all completed rentals</span>
                    </div>

                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Settled Payments
                        </span>
                        <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">
                            {completedPayments.length}
                        </p>
                        <span className="text-xs text-slate-500 mt-1 block">Verified Razorpay receipts</span>
                    </div>

                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm sm:col-span-2 lg:col-span-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Total Attempts
                        </span>
                        <p className="font-display font-extrabold text-3xl text-slate-700 mt-2">
                            {payments.length}
                        </p>
                        <span className="text-xs text-slate-500 mt-1 block">Includes pending & processed</span>
                    </div>
                </div>
            </div>

            {/* Payments List */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-36 w-full">
                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                        <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {payments.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-16 sm:p-20 text-center max-w-lg mx-auto shadow-sm my-8">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4">
                            <IconCreditCard className="w-7 h-7" />
                        </div>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            No payment history
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                            When you complete checkout for approved equipment rentals, your receipts and transaction IDs will appear here.
                        </p>
                        <Link
                            to="/equipments"
                            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors inline-block shadow-sm"
                        >
                            Browse Equipment
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
                        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                                Transaction Records
                            </h2>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                {payments.length} record{payments.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {payments.map((p) => {
                                const isSuccess = p.paymentStatus === "completed";

                                return (
                                    <div
                                        key={p._id}
                                        className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors"
                                    >
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                        isSuccess
                                                            ? "bg-blue-50 text-blue-700 border-blue-200"
                                                            : "bg-slate-100 text-slate-700 border-slate-200"
                                                    }`}
                                                >
                                                    {p.paymentStatus}
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-mono">
                                                    Txn: {p.razorpayPaymentId || p._id?.slice(-10)}
                                                </span>
                                            </div>

                                            <h3 className="font-display font-bold text-lg text-slate-900">
                                                {p.rental?.equipment?.name || "Equipment Rental Booking"}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-slate-500">
                                                Paid on{" "}
                                                {new Date(p.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                 })}
                                            </p>
                                        </div>

                                        <div className="text-left sm:text-right shrink-0">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                                Amount
                                            </span>
                                            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
                                                ₹{p.amount}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Payments;