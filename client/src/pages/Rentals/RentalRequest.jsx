import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRentalRequests,
    updateRentalStatus
} from "../../features/rentalSlice";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconMail, IconCheck, IconClose } from "../../components/Icons.jsx";

const RentalRequests = () => {
    const dispatch = useDispatch();

    const {
        rentalRequests = [],
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

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-slate-100 text-slate-800 border-slate-200/60";
            case "approved":
                return "bg-blue-50 text-blue-700 border-blue-200/60";
            case "rejected":
                return "bg-slate-100 text-slate-600 border-slate-200/60";
            case "completed":
                return "bg-slate-900 text-white border-slate-800";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading rental requests...
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
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-4">
                            Owner Approvals
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                            Incoming Rental Requests
                        </h1>
                        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                            Review renters requesting your equipment, check scheduled booking dates, inspect delivery locations, and approve or decline with confidence.
                        </p>
                    </div>

                    <div className="bg-slate-800/90 px-6 py-4 rounded-2xl border border-slate-700/80 text-left md:text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Requests</span>
                        <span className="font-display font-extrabold text-3xl md:text-4xl text-white mt-1 block">
                            {rentalRequests.length}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content List */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-36 w-full">
                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold">
                        {error}
                    </div>
                )}

                {rentalRequests.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-16 sm:p-20 text-center max-w-lg mx-auto shadow-sm my-8">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4">
                            <IconMail className="w-7 h-7" />
                        </div>
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            No requests pending
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                            When users request to rent your equipment, they will appear here with full date and contact details for your approval.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {rentalRequests.map((request) => {
                            const returnDeadline = new Date(request.rentalEndDate);
                            returnDeadline.setDate(returnDeadline.getDate() + 5);

                            return (
                                <div
                                    key={request._id}
                                    className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12"
                                >
                                    {/* Left: Info */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusStyle(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status}
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-mono">
                                                ID: {request._id?.slice(-8)}
                                            </span>
                                        </div>

                                        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                            {request.equipment?.name || "Equipment"}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                                            <span>
                                                Requested by:{" "}
                                                <span className="font-semibold text-slate-800">
                                                    @{request.renter?.username || "user"}
                                                </span>
                                            </span>
                                            {request.renter?.email && (
                                                <span className="text-slate-400">({request.renter.email})</span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Middle: Details */}
                                    <div className="flex items-center gap-8 sm:gap-12 border-t sm:border-t-0 sm:border-l border-slate-100 pt-5 sm:pt-0 sm:pl-10">
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                                Rental Period
                                            </span>
                                            <p className="text-sm font-semibold text-slate-800 mt-1">
                                                {new Date(request.rentalStartDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                to {new Date(request.rentalEndDate).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                                Total Payout
                                            </span>
                                            <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                                                ₹{request.totalPrice}
                                            </p>
                                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                                                Qty: {request.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex items-center justify-end gap-3 flex-wrap">
                                        {request.status === "pending" ? (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateStatus(request._id, "approved")}
                                                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                                                >
                                                    <IconCheck className="w-4 h-4" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(request._id, "rejected")}
                                                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2"
                                                >
                                                    <IconClose className="w-4 h-4" />
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-xs font-medium text-slate-400">
                                                Decided on {new Date(request.updatedAt || request.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default RentalRequests;