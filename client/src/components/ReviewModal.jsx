import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, clearReviewState } from "../features/reviewSlice";


const ReviewModal = ({
    rental,
    onClose,
    onSuccess
}) => {

    const dispatch =
        useDispatch();


    const {
        submitting,
        error,
        success
    } = useSelector(
        (state) => state.review
    );


    const [rating, setRating] =
        useState(0);

    const [hoverRating, setHoverRating] =
        useState(0);

    const [comment, setComment] =
        useState("");


    /* =====================================================
       SUCCESS
    ===================================================== */

    useEffect(() => {

        if (success) {

            onSuccess?.();

            onClose();

            dispatch(
                clearReviewState()
            );

        }

    }, [
        success,
        onClose,
        onSuccess,
        dispatch
    ]);


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = (e) => {

        e.preventDefault();


        if (rating === 0) {
            return;
        }


        if (!comment.trim()) {
            return;
        }


        dispatch(
            addReview({

                rentalId:
                    rental._id,

                rating,

                comment:
                    comment.trim()

            })
        );

    };


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Overlay */}

            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />


            {/* Modal */}

            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8">

                {/* Close */}

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
                >
                    ×
                </button>


                {/* Header */}

                <div className="pr-10">

                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
                        Rental Review
                    </p>

                    <h2 className="font-display text-3xl text-[#0b1b34] mt-1">
                        Share your experience
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        How was your experience with this equipment?
                    </p>

                </div>


                {/* Equipment */}

                <div className="mt-6 p-4 bg-gray-50 rounded-2xl">

                    <p className="text-xs text-gray-400">
                        Equipment
                    </p>

                    <p className="font-medium text-[#0b1b34] mt-1">
                        {rental?.equipment?.name ||
                            rental?.equipment?.title ||
                            "Equipment"}
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="mt-6"
                >

                    {/* Rating */}

                    <div>

                        <p className="text-sm font-medium text-[#0b1b34]">
                            Your rating
                        </p>


                        <div className="flex gap-2 mt-3">

                            {[1, 2, 3, 4, 5].map(
                                (star) => (

                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() =>
                                            setHoverRating(
                                                star
                                            )
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating(
                                                0
                                            )
                                        }
                                        onClick={() =>
                                            setRating(
                                                star
                                            )
                                        }
                                        className="text-3xl transition-transform hover:scale-110"
                                    >

                                        <span
                                            className={
                                                star <=
                                                (
                                                    hoverRating ||
                                                    rating
                                                )
                                                    ? "text-yellow-400"
                                                    : "text-gray-200"
                                            }
                                        >
                                            ★
                                        </span>

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* Comment */}

                    <div className="mt-6">

                        <label className="text-sm font-medium text-[#0b1b34]">
                            Your review
                        </label>

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }
                            rows={5}
                            placeholder="Tell others about your experience..."
                            className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/70 text-sm outline-none resize-none focus:border-[#0b1b34] focus:bg-white transition"
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100">

                            <p className="text-xs text-red-600">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            rating === 0 ||
                            !comment.trim()
                        }
                        className="w-full mt-6 py-3.5 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >

                        {submitting
                            ? "Submitting Review..."
                            : "Submit Review"}

                    </button>

                </form>

            </div>

        </div>
    );
};


export default ReviewModal;