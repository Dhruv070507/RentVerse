import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import Navbar from "../../components/navbar";
import ReviewModal from "../../components/ReviewModal";
import { getMyRentals } from "../../features/rentalSlice";
import Footer from "../../components/Footer.jsx";


const EquipmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [equipment, setEquipment] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [error, setError] = useState("");
    const [showReviewModal, setShowReviewModal] = useState(false);

    const { rentals } = useSelector((state) => state.rental);


    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await api.get(`/equipments/${id}`);
                setEquipment(response.data.data);
            } catch (error) {
                console.error(error);
                setError("Unable to load equipment.");
            } finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, [id]);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setReviewsLoading(true);

                const response = await api.get(`/reviews/equipment/${id}`);

                setReviews(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setReviewsLoading(false);
            }
        };

        fetchReviews();
    }, [id]);


    useEffect(() => {
        dispatch(getMyRentals());
    }, [dispatch]);


    /*
     * Find a completed rental for this equipment.
     *
     * This rental is required by the backend
     * when creating a review.
     */

    const reviewRental = useMemo(() => {
        return rentals?.find((rental) => {
            const equipmentId =
                rental.equipment?._id ||
                rental.equipment;

            return (
                equipmentId === id &&
                rental.status === "completed"
            );
        });
    }, [rentals, id]);


    /*
     * Calculate rating information
     */

    const totalReviews = reviews.length;

    const averageRating = totalReviews
        ? reviews.reduce(
            (sum, review) => sum + Number(review.rating),
            0
        ) / totalReviews
        : 0;


    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter(
            (review) => Number(review.rating) === rating
        ).length;

        const percentage = totalReviews
            ? (count / totalReviews) * 100
            : 0;

        return {
            rating,
            count,
            percentage
        };
    });


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Loading equipment...
                </p>
            </div>
        );
    }


    if (error || !equipment) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    {error || "Equipment not found."}
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-white font-sans">

            <Navbar />


            {/* =================================================
                BACK
            ================================================= */}

            <div className="max-w-7xl mx-auto px-6 pt-8">

                <Link
                    to="/"
                    className="text-sm text-gray-500 hover:text-black transition"
                >
                    ← Back to equipment
                </Link>

            </div>


            <main className="max-w-7xl mx-auto px-6 py-10">


                {/* =================================================
                    EQUIPMENT
                ================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">


                    {/* Image */}

                    <div className="w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden">

                        {equipment.images?.length > 0 && (
                            <img
                                src={equipment.images[0]}
                                alt={equipment.name}
                                className="w-full h-full object-cover"
                            />
                        )}

                    </div>


                    {/* Information */}

                    <div>

                        <p className="text-sm uppercase tracking-[0.1em] text-gray-400 mb-4">
                            {equipment.category?.name || "Equipment"}
                        </p>


                        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-5">
                            {equipment.name}
                        </h1>


                        {/* Rating summary */}

                        <div className="flex items-center gap-3 mb-5">

                            <div className="flex items-center gap-1">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={
                                            star <= Math.round(averageRating)
                                                ? "text-yellow-400 text-lg"
                                                : "text-gray-200 text-lg"
                                        }
                                    >
                                        ★
                                    </span>
                                ))}

                            </div>

                            <span className="font-medium text-gray-900">
                                {averageRating.toFixed(1)}
                            </span>

                            <span className="text-sm text-gray-400">
                                ({totalReviews} reviews)
                            </span>

                        </div>


                        <p className="text-sm text-gray-500 mb-6">
                            📍 {equipment.location}
                        </p>


                        <p className="text-gray-500 leading-relaxed max-w-xl mb-8">
                            {equipment.description}
                        </p>


                        {/* Price */}

                        <div className="border-t border-b border-gray-100 py-6 mb-8">

                            <p className="text-sm text-gray-400 mb-1">
                                Rental price
                            </p>

                            <p className="text-3xl font-semibold text-gray-900">
                                ₹{equipment.rentalPrice}

                                <span className="text-base font-normal text-gray-400">
                                    {" "} / day
                                </span>
                            </p>

                        </div>


                        {/* Availability */}

                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <p className="text-sm text-gray-400 mb-1">
                                    Availability
                                </p>

                                <p className="font-medium text-gray-900">
                                    {equipment.availability
                                        ? `${equipment.quantity} available`
                                        : "Currently unavailable"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-400 mb-1">
                                    Owner
                                </p>

                                <p className="font-medium text-gray-900">
                                    {equipment.owner?.username || "Unknown"}
                                </p>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() => navigate(`/equipment/${equipment._id}/rent`)}
                                className="font-sans px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                            >
                                Rent Now
                            </button>


                            {reviewRental && (
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="px-6 py-3 rounded-full border border-[#0b1b34] text-[#0b1b34] text-sm hover:bg-[#0b1b34] hover:text-white transition"
                                >
                                    ★ Write a Review
                                </button>
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    EQUIPMENT DETAILS
                ================================================= */}

                <section className="mt-20 border-t border-gray-100 pt-10">

                    <h2 className="font-serif text-3xl text-gray-900 mb-8">
                        Equipment Details
                    </h2>


                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                        <div className="bg-gray-50 rounded-xl p-6">

                            <p className="text-sm text-gray-400 mb-2">
                                Category
                            </p>

                            <p className="font-medium">
                                {equipment.category?.name || "—"}
                            </p>

                        </div>


                        <div className="bg-gray-50 rounded-xl p-6">

                            <p className="text-sm text-gray-400 mb-2">
                                Location
                            </p>

                            <p className="font-medium">
                                {equipment.location || "—"}
                            </p>

                        </div>


                        <div className="bg-gray-50 rounded-xl p-6">

                            <p className="text-sm text-gray-400 mb-2">
                                Quantity
                            </p>

                            <p className="font-medium">
                                {equipment.quantity}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    REVIEWS
                ================================================= */}

                <section className="mt-20 border-t border-gray-100 pt-10">

                    <div className="flex items-center justify-between mb-10">

                        <div>

                            <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                                Customer Feedback
                            </p>

                            <h2 className="font-serif text-3xl text-gray-900 mt-1">
                                Reviews
                            </h2>

                        </div>


                    </div>


                    {reviewsLoading ? (

                        <div className="py-10 text-center">
                            <p className="text-sm text-gray-400">
                                Loading reviews...
                            </p>
                        </div>

                    ) : totalReviews === 0 ? (

                        <div className="bg-gray-50 rounded-2xl p-10 text-center">

                            <p className="text-gray-500">
                                No reviews yet.
                            </p>

                            {reviewRental && (
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="mt-4 text-sm font-medium text-[#0b1b34] hover:underline"
                                >
                                    Be the first to review →
                                </button>
                            )}

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">


                            {/* =================================================
                                RATING SUMMARY
                            ================================================= */}

                            <div className="bg-gray-50 rounded-2xl p-7">

                                <p className="text-sm text-gray-400">
                                    Overall rating
                                </p>


                                <div className="flex items-end gap-3 mt-2">

                                    <span className="font-serif text-5xl text-[#0b1b34]">
                                        {averageRating.toFixed(1)}
                                    </span>

                                    <span className="text-sm text-gray-400 mb-2">
                                        / 5
                                    </span>

                                </div>


                                <div className="flex gap-1 mt-2">

                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={
                                                star <= Math.round(averageRating)
                                                    ? "text-yellow-400"
                                                    : "text-gray-200"
                                            }
                                        >
                                            ★
                                        </span>
                                    ))}

                                </div>


                                <p className="text-xs text-gray-400 mt-2">
                                    Based on {totalReviews}{" "}
                                    {totalReviews === 1
                                        ? "review"
                                        : "reviews"}
                                </p>


                                {/* Rating bars */}

                                <div className="mt-7 space-y-3">

                                    {ratingDistribution.map((item) => (

                                        <div
                                            key={item.rating}
                                            className="flex items-center gap-3"
                                        >

                                            <span className="text-xs text-gray-500 w-8">
                                                {item.rating} ★
                                            </span>


                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">

                                                <div
                                                    className="h-full bg-yellow-400 rounded-full"
                                                    style={{
                                                        width: `${item.percentage}%`
                                                    }}
                                                />

                                            </div>


                                            <span className="text-xs text-gray-400 w-6 text-right">
                                                {item.count}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>


                            {/* =================================================
                                REVIEW LIST
                            ================================================= */}

                            <div className="lg:col-span-2 space-y-5">

                                {reviews.map((review) => (

                                    <div
                                        key={review._id}
                                        className="border border-gray-100 rounded-2xl p-6"
                                    >

                                        <div className="flex items-start justify-between">

                                            <div className="flex items-center gap-3">

                                                {review.reviewer?.profileImage ? (

                                                    <img
                                                        src={review.reviewer.profileImage}
                                                        alt={review.reviewer.username}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />

                                                ) : (

                                                    <div className="w-10 h-10 rounded-full bg-[#0b1b34] text-white flex items-center justify-center text-sm font-medium">
                                                        {review.reviewer?.username?.charAt(0)?.toUpperCase() || "U"}
                                                    </div>

                                                )}


                                                <div>

                                                    <p className="font-medium text-[#0b1b34]">
                                                        {review.reviewer?.username || "User"}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="flex gap-0.5">

                                                {[1, 2, 3, 4, 5].map((star) => (

                                                    <span
                                                        key={star}
                                                        className={
                                                            star <= Number(review.rating)
                                                                ? "text-yellow-400 text-sm"
                                                                : "text-gray-200 text-sm"
                                                        }
                                                    >
                                                        ★
                                                    </span>

                                                ))}

                                            </div>

                                        </div>


                                        <p className="text-sm text-gray-600 leading-relaxed mt-4">
                                            {review.comment}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )}

                </section>

            </main>


            {/* =================================================
                REVIEW MODAL
            ================================================= */}

            {showReviewModal && reviewRental && (
                <ReviewModal
                    rental={reviewRental}
                    onClose={() => setShowReviewModal(false)}
                    onSuccess={() => {
                        setShowReviewModal(false);

                        api.get(`/reviews/equipment/${id}`)
                            .then((response) => {
                                setReviews(response.data.data || []);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                />
            )}

        

            <Footer />
</div>
    );
};


export default EquipmentDetails;