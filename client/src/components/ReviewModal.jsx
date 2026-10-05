import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, clearReviewState } from "../features/reviewSlice";


const ReviewModal = ({
    rental,
    onClose,
    onSuccess
}) => {

    const dispatch = useDispatch();


    const {
        submitting,
        error,
        success
    } = useSelector(
        (state) => state.review
    );


    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");


    /* =====================================================
       SUCCESS
    ===================================================== */

    useEffect(() => {

        if (success) {

            onSuccess?.();

            onClose();

            dispatch(clearReviewState());

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
                rentalId: rental._id,
                rating,
                comment: comment.trim()
            })
        );

    };


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8">

            {/* =====================================================
                OVERLAY
            ===================================================== */}

            <div
                onClick={onClose}
                className="
                    absolute
                    inset-0
                    bg-[#0b1b34]/70
                    backdrop-blur-sm
                "
            />


            {/* =====================================================
                MODAL
            ===================================================== */}

            <div
                className="
                    relative
                    w-full
                    max-w-xl
                    max-h-[90vh]
                    overflow-y-auto
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    px-7
                    py-8
                    md:px-10
                    md:py-10
                "
            >

                {/* =====================================================
                    CLOSE BUTTON
                ===================================================== */}

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        absolute
                        top-6
                        right-6
                        w-10
                        h-10
                        rounded-full
                        border
                        border-gray-100
                        bg-white
                        text-gray-400
                        text-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-50
                        hover:text-[#0b1b34]
                        transition
                    "
                    aria-label="Close"
                >
                    ×
                </button>


                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="pr-12">

                    <p className="
                        font-sans
                        text-[10px]
                        tracking-[0.25em]
                        text-gray-400
                        uppercase
                        mb-4
                    ">
                        RENTAL REVIEW
                    </p>


                    <h2 className="
                        font-display
                        text-4xl
                        md:text-5xl
                        leading-tight
                        text-[#0b1b34]
                    ">
                        Share your experience.
                    </h2>


                    <p className="
                        font-sans
                        text-sm
                        md:text-base
                        text-gray-500
                        leading-relaxed
                        mt-4
                        max-w-md
                    ">
                        Your experience helps other renters make
                        better decisions when choosing equipment.
                    </p>

                </div>



                {/* =====================================================
                    EQUIPMENT
                ===================================================== */}

                <div className="
                    mt-8
                    border-y
                    border-gray-100
                    py-5
                ">

                    <p className="
                        font-sans
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-gray-400
                    ">
                        Equipment
                    </p>


                    <div className="flex items-center justify-between gap-4 mt-2">

                        <h3 className="
                            font-display
                            text-2xl
                            text-[#0b1b34]
                        ">
                            {rental?.equipment?.name ||
                                rental?.equipment?.title ||
                                "Equipment"}
                        </h3>


                        <span className="
                            shrink-0
                            text-xs
                            text-gray-400
                        ">
                            Completed rental
                        </span>

                    </div>

                </div>



                {/* =====================================================
                    FORM
                ===================================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8"
                >


                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div>

                        <div className="flex items-end justify-between">

                            <div>

                                <p className="
                                    font-sans
                                    text-xs
                                    uppercase
                                    tracking-[0.15em]
                                    text-gray-400
                                ">
                                    Your rating
                                </p>

                                <p className="
                                    font-sans
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">
                                    How would you rate this equipment?
                                </p>

                            </div>


                            {rating > 0 && (

                                <span className="
                                    font-sans
                                    text-sm
                                    font-medium
                                    text-[#0b1b34]
                                ">
                                    {rating}/5
                                </span>

                            )}

                        </div>


                        <div className="flex gap-2 mt-5">

                            {[1, 2, 3, 4, 5].map(
                                (star) => (

                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() =>
                                            setHoverRating(star)
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating(0)
                                        }
                                        onClick={() =>
                                            setRating(star)
                                        }
                                        className="
                                            w-11
                                            h-11
                                            rounded-full
                                            border
                                            border-gray-100
                                            flex
                                            items-center
                                            justify-center
                                            transition
                                            hover:border-gray-300
                                            hover:scale-105
                                        "
                                    >

                                        <span
                                            className={`
                                                text-xl
                                                transition
                                                ${
                                                    star <=
                                                    (
                                                        hoverRating ||
                                                        rating
                                                    )
                                                        ? "text-yellow-400"
                                                        : "text-gray-200"
                                                }
                                            `}
                                        >
                                            ★
                                        </span>

                                    </button>

                                )
                            )}

                        </div>

                    </div>



                    {/* =================================================
                        COMMENT
                    ================================================= */}

                    <div className="mt-8">

                        <label
                            htmlFor="review-comment"
                            className="
                                font-sans
                                text-xs
                                uppercase
                                tracking-[0.15em]
                                text-gray-400
                            "
                        >
                            Your review
                        </label>


                        <textarea
                            id="review-comment"
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            rows={5}
                            placeholder="Tell others about your experience..."
                            className="
                                w-full
                                mt-3
                                px-0
                                py-4
                                border-0
                                border-b
                                border-gray-200
                                bg-transparent
                                font-sans
                                text-sm
                                text-[#0b1b34]
                                placeholder:text-gray-400
                                outline-none
                                resize-none
                                focus:border-[#0b1b34]
                                transition
                            "
                        />

                    </div>



                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="
                            mt-5
                            border-l-2
                            border-red-500
                            bg-red-50
                            px-4
                            py-3
                        ">

                            <p className="
                                font-sans
                                text-sm
                                text-red-600
                            ">
                                {error}
                            </p>

                        </div>

                    )}



                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="
                        flex
                        flex-col-reverse
                        sm:flex-row
                        gap-3
                        mt-8
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex-1
                                px-6
                                py-3.5
                                rounded-full
                                border
                                border-gray-200
                                bg-white
                                text-[#0b1b34]
                                font-sans
                                text-sm
                                font-medium
                                hover:bg-gray-50
                                transition
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                rating === 0 ||
                                !comment.trim()
                            }
                            className="
                                flex-1
                                px-6
                                py-3.5
                                rounded-full
                                bg-[#0b1b34]
                                text-white
                                font-sans
                                text-sm
                                font-medium
                                hover:bg-[#142944]
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                                transition
                            "
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Review →"
                            }
                        </button>

                    </div>


                    {/* =================================================
                        FOOTNOTE
                    ================================================= */}

                    <p className="
                        font-sans
                        text-xs
                        text-gray-400
                        text-center
                        mt-5
                    ">
                        Your review will be visible to other RentVerse users.
                    </p>

                </form>

            </div>

        </div>
    );
};


export default ReviewModal; 