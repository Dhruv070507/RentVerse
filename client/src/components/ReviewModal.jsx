import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, clearReviewState } from "../features/reviewSlice";
import { IconStar, IconAlert } from "./Icons.jsx";

const ReviewModal = ({ rental, onClose, onSuccess }) => {
    const dispatch = useDispatch();

    const { submitting, error, success } = useSelector(
        (state) => state.review || {}
    );

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (success) {
            onSuccess?.();
            onClose();
            dispatch(clearReviewState());
        }
    }, [success, onClose, onSuccess, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) return;
        if (!comment.trim()) return;

        dispatch(
            addReview({
                rentalId: rental._id,
                rating,
                comment: comment.trim(),
            })
        );
    };

    const ratingLabels = ["Select Rating", "Poor", "Fair", "Good", "Very Good", "Excellent!"];
    const activeScore = hoverRating || rating;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
                        Feedback
                    </span>
                    <h2 className="font-display font-bold text-2xl text-slate-900">
                        Rate your rental
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Share your experience with{" "}
                        <span className="font-semibold text-slate-700">
                            {rental?.equipment?.name || "this equipment"}
                        </span>
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-2">
                        <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Interactive Stars */}
                    <div className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const isFilled = star <= (hoverRating || rating);
                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                                    >
                                        <IconStar
                                            className={`w-7 h-7 ${isFilled ? "text-amber-400" : "text-slate-300"}`}
                                            filled={isFilled}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <span className="text-xs font-semibold text-slate-600 mt-2">
                            {ratingLabels[activeScore] || "Tap a star to rate"}
                        </span>
                    </div>

                    {/* Review text */}
                    <div>
                        <label
                            htmlFor="comment"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                            Your Review
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="How was the equipment condition? Was the owner helpful?"
                            rows={4}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || rating === 0 || !comment.trim()}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
                        >
                            {submitting ? "Submitting..." : "Post Review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;