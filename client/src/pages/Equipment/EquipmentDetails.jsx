
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import Navbar from "../../components/navbar";
import ReviewModal from "../../components/ReviewModal";
import { getMyRentals } from "../../features/rentalSlice";
import Footer from "../../components/Footer.jsx";
import { IconStar, IconAlert } from "../../components/Icons.jsx";

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
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await api.get(`/equipments/${id}`);
                setEquipment(response.data.data);
            } catch (err) {
                console.error(err);
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
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            } finally {
                setReviewsLoading(false);
            }
        };

        fetchReviews();
    }, [id]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyRentals());
        }
    }, [dispatch, isAuthenticated]);

    const reviewRental = useMemo(() => {
        if (!isAuthenticated) return null;

        return rentals?.find((rental) => {
            const equipmentId = rental.equipment?._id || rental.equipment;
            return equipmentId === id && rental.status === "completed";
        });
    }, [rentals, id, isAuthenticated]);

    const totalReviews = reviews.length;

    const averageRating = totalReviews
        ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / totalReviews
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter((review) => Number(review.rating) === rating).length;
        const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

        return { rating, count, percentage };
    });

    const isOwner = Boolean(
        user &&
        equipment?.owner &&
        ((equipment.owner._id && equipment.owner._id === user._id) ||
            equipment.owner === user._id)
    );

    const handleRentAction = () => {
        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    from: `/equipment/${equipment._id}/rent`,
                    message: "Please sign in to rent this equipment."
                }
            });
            return;
        }

        if (isOwner) {
            navigate(`/edit-equipment/${equipment._id}`);
            return;
        }

        navigate(`/equipment/${equipment._id}/rent`);
    };

    const refreshReviews = () => {
        setShowReviewModal(false);

        api.get(`/reviews/equipment/${id}`)
            .then((response) => setReviews(response.data.data || []))
            .catch((err) => console.error(err));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F4F2] flex flex-col justify-between">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-9 h-9 border-2 border-black/10 border-t-black rounded-full animate-spin mb-4" />
                    <p className="text-sm text-black/50">
                        Loading equipment details...
                    </p>
                </div>

                <Footer />
            </div>
        );
    }

    if (error || !equipment) {
        return (
            <div className="min-h-screen bg-[#F5F4F2] flex flex-col justify-between">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                    <div className="w-12 h-12 bg-[#ECECEC] text-black flex items-center justify-center mb-5">
                        <IconAlert className="w-6 h-6" />
                    </div>

                    <h2 className="font-serif text-3xl text-black">
                        Equipment Not Found
                    </h2>

                    <p className="text-sm text-black/50 mt-3 mb-7">
                        {error || "The requested item is either unavailable or does not exist."}
                    </p>

                    <Link
                        to="/equipments"
                        className="px-6 py-3 bg-black text-white text-xs font-medium hover:bg-black/75 transition-colors"
                    >
                        Back to Equipment Catalog
                    </Link>
                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F4F2] font-sans text-black selection:bg-black selection:text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-24">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-black/45 mb-8">
                    <Link to="/" className="hover:text-black transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link to="/equipments" className="hover:text-black transition-colors">
                        Equipment
                    </Link>
                    <span>/</span>
                    <span className="text-black truncate max-w-xs">
                        {equipment.name}
                    </span>
                </nav>

                {/* Equipment Details */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="relative w-full aspect-[4/3] bg-[#ECECEC] overflow-hidden">
                            {equipment.images?.length > 0 ? (
                                <img
                                    src={equipment.images[0]}
                                    alt={equipment.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-black/30 text-sm">
                                    No image available
                                </div>
                            )}

                            <div className="absolute bottom-4 left-4">
                                <span className="inline-flex items-center gap-2 bg-[#F5F4F2] px-3 py-2 text-[11px] font-medium text-black">
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            equipment.availability ? "bg-green-700" : "bg-black/30"
                                        }`}
                                    />
                                    {equipment.availability
                                        ? `${equipment.quantity} Available`
                                        : "Currently Unavailable"}
                                </span>
                            </div>
                        </div>

                        {equipment.images?.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {equipment.images.slice(1).map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`View ${idx + 2}`}
                                        className="w-20 h-20 object-cover bg-[#ECECEC] shrink-0"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Information */}
                    <div className="flex flex-col">
                        <div className="pb-8 border-b border-black/10">
                            <div className="flex items-center justify-between gap-4 mb-5">
                                <span className="text-[10px] uppercase tracking-[0.18em] text-black/45">
                                    {equipment.category?.name || "Equipment"}
                                </span>

                                <div className="flex items-center gap-1.5 text-xs">
                                    <IconStar
                                        className="w-3.5 h-3.5 text-black"
                                        filled={true}
                                    />
                                    <span className="font-medium">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-black/40">
                                        ({totalReviews} reviews)
                                    </span>
                                </div>
                            </div>

                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.045em]">
                                {equipment.name}
                            </h1>

                            <div className="flex items-start gap-2 mt-6 text-sm text-black/50">
                                <svg
                                    className="w-4 h-4 mt-0.5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span>
                                    {equipment.location || "Pickup point specified on request"}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="py-8 border-b border-black/10">
                            <p className="text-xs uppercase tracking-[0.16em] text-black/40 mb-3">
                                About this equipment
                            </p>

                            <p className="text-sm leading-7 text-black/65 whitespace-pre-line">
                                {equipment.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-b border-black/10">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 mb-2">
                                    Owner
                                </p>
                                <p className="text-sm font-medium truncate">
                                    @{equipment.owner?.username || "Verified Owner"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 mb-2">
                                    Total Units
                                </p>
                                <p className="text-sm font-medium">
                                    {equipment.quantity} units
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 mb-2">
                                    Delivery
                                </p>
                                <p className="text-sm font-medium">
                                    Agent available
                                </p>
                            </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="pt-8 mt-auto">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.16em] text-black/40 mb-2">
                                        Rental price
                                    </p>

                                    <div className="flex items-baseline gap-2">
                                        <span className="font-sans text-4xl font-semibold tracking-[-0.04em]">
                                            ₹{equipment.rentalPrice}
                                        </span>
                                        <span className="text-xs text-black/45">
                                            / day
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:items-end">
                                    <div className="flex flex-wrap gap-3">
                                        {reviewRental && (
                                            <button
                                                onClick={() => setShowReviewModal(true)}
                                                className="px-5 py-3 border border-black/20 text-xs font-medium hover:bg-[#ECECEC] transition-colors"
                                            >
                                                Rate Rental
                                            </button>
                                        )}

                                        <button
                                            onClick={handleRentAction}
                                            className="px-7 py-3.5 bg-black text-white text-xs font-medium hover:bg-black/75 transition-colors"
                                        >
                                            {!isAuthenticated
                                                ? "Sign in to Rent"
                                                : isOwner
                                                ? "Manage Listing"
                                                : "Rent Equipment"}
                                        </button>
                                    </div>

                                    {!isAuthenticated && (
                                        <p className="text-[11px] text-black/40">
                                            Sign in is required to book rentals.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reviews */}
                <section className="mt-28">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-7 border-b border-black/15">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-black/40 mb-3">
                                Feedback
                            </p>

                            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
                                Customer Reviews
                            </h2>
                        </div>

                        {reviewRental && (
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="px-5 py-3 bg-black text-white text-xs font-medium hover:bg-black/75 transition-colors w-fit"
                            >
                                Write a Review <span className="ml-2">↗</span>
                            </button>
                        )}
                    </div>

                    {reviewsLoading ? (
                        <div className="py-16 text-center text-sm text-black/40">
                            Loading reviews...
                        </div>
                    ) : totalReviews === 0 ? (
                        <div className="py-20 text-center">
                            <h3 className="font-serif text-2xl">
                                No reviews yet.
                            </h3>
                            <p className="text-sm text-black/45 mt-2">
                                Be the first to share your experience with this equipment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                            {/* Rating Summary */}
                            <div className="lg:col-span-4">
                                <p className="text-[10px] uppercase tracking-[0.16em] text-black/40 mb-4">
                                    Overall Rating
                                </p>

                                <div className="flex items-baseline gap-2">
                                    <span className="font-serif text-7xl tracking-tight">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-sm text-black/40">
                                        / 5
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 mt-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <IconStar
                                            key={star}
                                            className={`w-4 h-4 ${
                                                star <= Math.round(averageRating)
                                                    ? "text-black"
                                                    : "text-black/15"
                                            }`}
                                            filled={star <= Math.round(averageRating)}
                                        />
                                    ))}
                                </div>

                                <p className="text-xs text-black/45 mt-2">
                                    Based on {totalReviews} review{totalReviews === 1 ? "" : "s"}
                                </p>

                                {/* Rating Distribution */}
                                <div className="mt-8 space-y-4">
                                    {ratingDistribution.map((item) => (
                                        <div
                                            key={item.rating}
                                            className="flex items-center gap-3 text-xs"
                                        >
                                            <span className="w-3 text-black/60">
                                                {item.rating}
                                            </span>

                                            <IconStar
                                                className="w-3 h-3 text-black"
                                                filled={true}
                                            />

                                            <div className="flex-1 h-1.5 bg-[#ECECEC] overflow-hidden">
                                                <div
                                                    className="h-full bg-black transition-all duration-500"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>

                                            <span className="w-5 text-right text-black/40 tabular-nums">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review List */}
                            <div className="lg:col-span-8">
                                {reviews.map((review, index) => (
                                    <article
                                        key={review._id}
                                        className={`py-7 ${
                                            index !== 0 ? "border-t border-black/10" : ""
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                {review.reviewer?.profileImage ? (
                                                    <img
                                                        src={review.reviewer.profileImage}
                                                        alt={review.reviewer.username}
                                                        className="w-10 h-10 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-[#ECECEC] flex items-center justify-center text-sm font-medium">
                                                        {review.reviewer?.username?.charAt(0)?.toUpperCase() || "U"}
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {review.reviewer?.username || "Verified Renter"}
                                                    </p>

                                                    <p className="text-[11px] text-black/40 mt-1">
                                                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric"
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-0.5 shrink-0">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <IconStar
                                                        key={star}
                                                        className={`w-3.5 h-3.5 ${
                                                            star <= Number(review.rating)
                                                                ? "text-black"
                                                                : "text-black/15"
                                                        }`}
                                                        filled={star <= Number(review.rating)}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mt-4 text-sm leading-7 text-black/65">
                                            {review.comment}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {showReviewModal && reviewRental && (
                <ReviewModal
                    rental={reviewRental}
                    onClose={() => setShowReviewModal(false)}
                    onSuccess={refreshReviews}
                />
            )}

            <Footer />
        </div>
    );
};

export default EquipmentDetails;
