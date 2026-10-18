import { useState } from "react";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { IconStar } from "./Icons";

const EquipmentCard = ({ equipment, rental }) => {
    const [showReviewModal, setShowReviewModal] = useState(false);

    const rating = equipment.averageRating || equipment.rating || 0;
    const reviewCount = equipment.reviewCount || equipment.reviewsCount || 0;
    const canReview = rental && rental.status === "completed";

    return (
        <>
            <article className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    {equipment.images?.[0] ? (
                        <img
                            src={equipment.images[0]}
                            alt={equipment.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-2">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-medium">No image provided</span>
                        </div>
                    )}

                    {/* Availability Badge */}
                    {equipment.available !== undefined && (
                        <div className="absolute top-3.5 left-3.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-700 border border-slate-200 shadow-xs">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        equipment.available ? "bg-blue-600" : "bg-slate-400"
                                    }`}
                                />
                                {equipment.available ? "Available" : "Unavailable"}
                            </span>
                        </div>
                    )}

                    {/* Category Tag (Top Right) */}
                    {equipment.category?.name && (
                        <div className="absolute top-3.5 right-3.5">
                            <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/90 text-white backdrop-blur-xs">
                                {equipment.category.name}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5">
                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span className="flex items-center gap-1 truncate max-w-[180px]">
                            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {equipment.location || "Available for pickup"}
                        </span>

                        {/* Rating */}
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                            <IconStar className="w-3.5 h-3.5 text-amber-500" filled={true} />
                            <span className="text-xs font-semibold text-slate-800">
                                {Number(rating).toFixed(1)}
                            </span>
                            <span className="text-[10px] text-slate-500">
                                ({reviewCount})
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                        {equipment.name}
                    </h2>

                    {/* Description */}
                    <p className="font-sans text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2 flex-1">
                        {equipment.description || "No description provided for this equipment item."}
                    </p>

                    {/* Footer: Price & Details button */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block">
                                Rental Rate
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="font-display text-xl font-bold text-slate-900">
                                    ₹{equipment.rentalPrice}
                                </span>
                                <span className="text-xs text-slate-500">/ day</span>
                            </div>
                        </div>

                        <Link
                            to={`/equipment/${equipment._id}`}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-xs transition-all group/btn"
                        >
                            <span>Details</span>
                            <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Write Review Action */}
                    {canReview && (
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="mt-3 w-full py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <IconStar className="w-3.5 h-3.5 text-amber-500" filled={true} />
                            <span>Write a Review</span>
                        </button>
                    )}
                </div>
            </article>

            {/* Review Modal */}
            {showReviewModal && (
                <ReviewModal
                    rental={rental}
                    onClose={() => setShowReviewModal(false)}
                    onSuccess={() => setShowReviewModal(false)}
                />
            )}
        </>
    );
};

export default EquipmentCard;