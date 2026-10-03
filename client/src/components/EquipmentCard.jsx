import { useState } from "react";
import { Link } from "react-router-dom";

import ReviewModal from "./ReviewModal";


const EquipmentCard = ({ equipment, rental }) => {

    const [showReviewModal, setShowReviewModal] =
        useState(false);


    const rating =
        equipment.averageRating ||
        equipment.rating ||
        0;


    const reviewCount =
        equipment.reviewCount ||
        equipment.reviewsCount ||
        0;


    /*
     * A user can review only when:
     *
     * 1. A rental is provided
     * 2. That rental is completed
     */

    const canReview =
        rental &&
        rental.status === "completed";


    return (

        <>

            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300">


                {/* =================================================
                    EQUIPMENT IMAGE
                ================================================= */}

                <div className="h-56 bg-gray-100 relative">

                    {equipment.images?.[0] ? (

                        <img
                            src={equipment.images[0]}
                            alt={equipment.name}
                            className="w-full h-full object-cover"
                        />

                    ) : (

                        <div className="w-full h-full flex items-center justify-center">

                            <span className="text-sm text-gray-400">
                                No image available
                            </span>

                        </div>

                    )}


                    {/* Availability */}

                    {equipment.available !== undefined && (

                        <div className="absolute top-4 right-4">

                            <span
                                className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                                    equipment.available
                                        ? "bg-green-50/90 text-green-700"
                                        : "bg-red-50/90 text-red-700"
                                }`}
                            >

                                <span className="inline-flex items-center gap-1.5">

                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            equipment.available
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    />

                                    {equipment.available
                                        ? "Available"
                                        : "Unavailable"}

                                </span>

                            </span>

                        </div>

                    )}

                </div>


                {/* =================================================
                    EQUIPMENT INFORMATION
                ================================================= */}

                <div className="p-5">


                    {/* Equipment name */}

                    <h2 className="font-display text-xl text-[#0b1b34]">
                        {equipment.name}
                    </h2>


                    {/* Description */}

                    <p className="font-sans text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                        {equipment.description}
                    </p>


                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div className="flex items-center gap-2 mt-4">

                        <div className="flex items-center gap-0.5">

                            {[1, 2, 3, 4, 5].map(
                                (star) => (

                                    <span
                                        key={star}
                                        className={
                                            star <=
                                            Math.round(
                                                Number(rating)
                                            )
                                                ? "text-yellow-400 text-sm"
                                                : "text-gray-200 text-sm"
                                        }
                                    >
                                        ★
                                    </span>

                                )
                            )}

                        </div>


                        <span className="text-sm font-medium text-[#0b1b34]">
                            {Number(rating).toFixed(1)}
                        </span>


                        <span className="text-xs text-gray-400">
                            ({reviewCount}{" "}
                            {reviewCount === 1
                                ? "review"
                                : "reviews"})
                        </span>

                    </div>


                    {/* =================================================
                        PRICE
                    ================================================= */}

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                        <div>

                            <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                Rental Price
                            </p>

                            <p className="font-display text-lg text-[#0b1b34] mt-0.5">

                                ₹{equipment.rentalPrice}

                                <span className="font-sans text-xs text-gray-400">
                                    {" "} / day
                                </span>

                            </p>

                        </div>


                        <Link
                            to={`/equipment/${equipment._id}`}
                            className="font-sans text-sm px-4 py-2.5 rounded-xl bg-[#0b1b34] text-white hover:bg-[#142944] transition"
                        >
                            View Details →
                        </Link>

                    </div>


                    {/* =================================================
                        WRITE REVIEW
                    ================================================= */}

                    {canReview && (

                        <button
                            onClick={() =>
                                setShowReviewModal(true)
                            }
                            className="w-full mt-3 py-2.5 rounded-xl border border-[#0b1b34] text-[#0b1b34] text-sm font-medium hover:bg-[#0b1b34] hover:text-white transition"
                        >

                            ★ Write a Review

                        </button>

                    )}

                </div>

            </div>


            {/* =================================================
                REVIEW MODAL
            ================================================= */}

            {showReviewModal && (

                <ReviewModal
                    rental={rental}
                    onClose={() =>
                        setShowReviewModal(false)
                    }
                    onSuccess={() => {

                        /*
                         * Review was successfully submitted.
                         *
                         * We close the modal here.
                         * The review list can be refreshed separately.
                         */

                    }}
                />

            )}

        </>

    );
};


export default EquipmentCard;