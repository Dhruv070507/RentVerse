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


    const canReview =
        rental &&
        rental.status === "completed";


    return (

        <>

            <article className="group bg-white border border-gray-200 rounded-3xl overflow-hidden transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(11,27,52,0.10)]">


                {/* =====================================================
                    IMAGE
                ===================================================== */}

                <div className="relative h-64 overflow-hidden bg-gray-100">

                    {equipment.images?.[0] ? (

                        <img
                            src={equipment.images[0]}
                            alt={equipment.name}
                            className="
                                w-full
                                h-full
                                object-cover
                                transition
                                duration-700
                                group-hover:scale-105
                            "
                        />

                    ) : (

                        <div className="w-full h-full flex items-center justify-center">

                            <span className="font-sans text-sm text-gray-400">
                                No image available
                            </span>

                        </div>

                    )}


                    {/* Availability */}

                    {equipment.available !== undefined && (

                        <div className="absolute top-5 left-5">

                            <span
                                className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-3.5
                                    py-2
                                    rounded-full
                                    backdrop-blur-md
                                    text-xs
                                    font-medium
                                    ${
                                        equipment.available
                                            ? "bg-white/90 text-green-700"
                                            : "bg-white/90 text-red-700"
                                    }
                                `}
                            >

                                <span
                                    className={`
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        ${
                                            equipment.available
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }
                                    `}
                                />

                                {equipment.available
                                    ? "Available"
                                    : "Unavailable"}

                            </span>

                        </div>

                    )}

                </div>


                {/* =====================================================
                    CONTENT
                ===================================================== */}

                <div className="p-7">


                    {/* Category / small label */}

                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-gray-400">
                        Equipment
                    </p>


                    {/* Equipment name */}

                    <h2 className="font-display text-2xl text-[#0b1b34] mt-2 leading-tight">
                        {equipment.name}
                    </h2>


                    {/* Description */}

                    <p className="font-sans text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2 min-h-[42px]">
                        {equipment.description}
                    </p>


                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div className="flex items-center gap-2 mt-5">

                        <div className="flex items-center gap-0.5">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <span
                                    key={star}
                                    className={`
                                        text-sm
                                        ${
                                            star <= Math.round(Number(rating))
                                                ? "text-[#0b1b34]"
                                                : "text-gray-200"
                                        }
                                    `}
                                >
                                    ★
                                </span>

                            ))}

                        </div>


                        <span className="font-sans text-sm font-medium text-[#0b1b34]">
                            {Number(rating).toFixed(1)}
                        </span>


                        <span className="font-sans text-xs text-gray-400">
                            ({reviewCount}{" "}
                            {reviewCount === 1
                                ? "review"
                                : "reviews"})
                        </span>

                    </div>


                    {/* =================================================
                        PRICE + ACTION
                    ================================================= */}

                    <div className="mt-7 pt-5 border-t border-gray-100">

                        <div className="flex items-end justify-between gap-4">

                            <div>

                                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400">
                                    Rental price
                                </p>

                                <div className="flex items-baseline gap-1 mt-1">

                                    <span className="font-display text-2xl text-[#0b1b34]">
                                        ₹{equipment.rentalPrice}
                                    </span>

                                    <span className="font-sans text-xs text-gray-400">
                                        / day
                                    </span>

                                </div>

                            </div>


                            <Link
                                to={`/equipment/${equipment._id}`}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-5
                                    py-3
                                    rounded-full
                                    bg-[#0b1b34]
                                    text-white
                                    font-sans
                                    text-sm
                                    font-medium
                                    transition
                                    hover:bg-[#142944]
                                "
                            >
                                View Details
                                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
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
                                className="
                                    w-full
                                    mt-4
                                    py-3
                                    rounded-full
                                    border
                                    border-gray-200
                                    text-[#0b1b34]
                                    font-sans
                                    text-sm
                                    font-medium
                                    hover:border-[#0b1b34]
                                    hover:bg-[#0b1b34]
                                    hover:text-white
                                    transition
                                "
                            >
                                ★ Write a Review
                            </button>

                        )}

                    </div>

                </div>

            </article>


            {/* =====================================================
                REVIEW MODAL
            ===================================================== */}

            {showReviewModal && (

                <ReviewModal
                    rental={rental}
                    onClose={() =>
                        setShowReviewModal(false)
                    }
                    onSuccess={() => {
                        setShowReviewModal(false);
                    }}
                />

            )}

        </>

    );
};


export default EquipmentCard;