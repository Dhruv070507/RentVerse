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

    // Find completed rental to allow review
    const reviewRental = useMemo(() => {
        if (!isAuthenticated) return null;
        return rentals?.find((rental) => {
            const equipmentId = rental.equipment?._id || rental.equipment;
            return equipmentId === id && rental.status === "completed";
        });
    }, [rentals, id, isAuthenticated]);

    // Rating calculations
    const totalReviews = reviews.length;
    const averageRating = totalReviews
        ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / totalReviews
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter((r) => Number(r.rating) === rating).length;
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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading equipment details...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !equipment) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                        <IconAlert className="w-6 h-6" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Equipment Not Found
                    </h2>
                    <p className="text-sm text-slate-500 mt-2 mb-6">
                        {error || "The requested item is either unavailable or does not exist."}
                    </p>
                    <Link
                        to="/equipments"
                        className="px-6 py-2.5 rounded-full bg-[#0b1b34] text-white text-sm font-semibold hover:bg-[#152a4e] transition-colors"
                    >
                        Back to Equipment Catalog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* Breadcrumb Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Link to="/" className="hover:text-slate-900 transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link to="/equipments" className="hover:text-slate-900 transition-colors">
                        Equipment
                    </Link>
                    <span>/</span>
                    <span className="text-slate-900 font-semibold truncate max-w-xs">
                        {equipment.name}
                    </span>
                </nav>
            </div>

            {/* Main Product Showcase */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
                    {/* Media / Images Column */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="w-full h-80 sm:h-[480px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group">
                            {equipment.images?.length > 0 ? (
                                <img
                                    src={equipment.images[0]}
                                    alt={equipment.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs">No image provided</span>
                                </div>
                            )}

                            {/* Badge */}
                            <div className="absolute top-4 left-4">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                                        equipment.availability
                                            ? "bg-white/95 text-blue-700 border border-blue-200"
                                            : "bg-white/95 text-slate-700 border border-slate-200"
                                    }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            equipment.availability ? "bg-blue-600" : "bg-slate-400"
                                        }`}
                                    />
                                    {equipment.availability
                                        ? `${equipment.quantity} Available`
                                        : "Currently Unavailable"}
                                </span>
                            </div>
                        </div>

                        {/* Additional images if any */}
                        {equipment.images?.length > 1 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-2">
                                {equipment.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0 cursor-pointer hover:border-blue-600 transition-colors"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details & Action Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                        <div>
                            {/* Category & Rating */}
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                                    {equipment.category?.name || "Equipment"}
                                </span>

                                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                    <IconStar className="w-3.5 h-3.5 text-amber-500" filled={true} />
                                    <span className="text-xs font-bold text-slate-800">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        ({totalReviews} review{totalReviews === 1 ? "" : "s"})
                                    </span>
                                </div>
                            </div>

                            {/* Equipment Name */}
                            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
                                {equipment.name}
                            </h1>

                            {/* Location */}
                            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-6">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{equipment.location || "Pickup point specified on request"}</span>
                            </p>

                            {/* Description */}
                            <div className="prose prose-sm text-slate-600 mb-8 leading-relaxed">
                                <p>{equipment.description}</p>
                            </div>

                            {/* Specifications Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8">
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                                        Owner
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate">
                                        @{equipment.owner?.username || "Verified Owner"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                                        Total Units
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                                        {equipment.quantity} in inventory
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                                        Delivery Mode
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                                        Agent Delivery Available
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price & Action Banner */}
                        <div className="pt-6 border-t border-slate-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                                        Standard Daily Rate
                                    </span>
                                    <div className="flex items-baseline gap-1 mt-0.5">
                                        <span className="font-display font-extrabold text-3xl text-slate-900">
                                            ₹{equipment.rentalPrice}
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">/ 24 hours</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end gap-2">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        {reviewRental && (
                                            <button
                                                onClick={() => setShowReviewModal(true)}
                                                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5"
                                            >
                                                <IconStar className="w-3.5 h-3.5 text-amber-500" filled={true} />
                                                <span>Rate Rental</span>
                                            </button>
                                        )}

                                        <button
                                            onClick={handleRentAction}
                                            className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                                        >
                                            {!isAuthenticated
                                                ? "Sign in to Rent →"
                                                : isOwner
                                                ? "Manage Listing →"
                                                : "Rent Equipment Now →"}
                                        </button>
                                    </div>
                                    {!isAuthenticated && (
                                        <p className="text-[11px] text-slate-500 text-right">
                                            Sign in is required to book rentals
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                                Verified Feedback
                            </span>
                            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0b1b34]">
                                Customer Reviews
                            </h2>
                        </div>

                        {reviewRental && (
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors w-fit"
                            >
                                Write a Review
                            </button>
                        )}
                    </div>

                    {reviewsLoading ? (
                        <div className="py-12 text-center text-slate-500 text-xs">
                            Loading verified reviews...
                        </div>
                    ) : totalReviews === 0 ? (
                        <div className="py-16 text-center rounded-2xl bg-slate-50 border border-slate-200/60 max-w-md mx-auto p-6">
                            <p className="text-sm font-semibold text-slate-700">No reviews yet for this equipment.</p>
                            <p className="text-xs text-slate-500 mt-1">
                                Rent this equipment and be the first to leave your feedback!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left Scorecard */}
                            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 h-fit">
                                <span className="text-xs font-bold text-slate-600 block">Overall Score</span>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="font-display font-extrabold text-5xl text-[#0b1b34]">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-xs text-slate-500 font-semibold">out of 5.0</span>
                                </div>

                                <div className="flex items-center gap-1 mt-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <IconStar
                                            key={s}
                                            className={`w-4 h-4 ${
                                                s <= Math.round(averageRating)
                                                    ? "text-amber-500"
                                                    : "text-slate-300"
                                            }`}
                                            filled={s <= Math.round(averageRating)}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-500 block mt-1">
                                    Based on {totalReviews} review{totalReviews === 1 ? "" : "s"}
                                </span>

                                {/* Distribution Bars */}
                                <div className="mt-6 space-y-2.5 pt-6 border-t border-slate-200">
                                    {ratingDistribution.map((item) => (
                                        <div key={item.rating} className="flex items-center gap-2.5 text-xs">
                                            <span className="w-8 font-semibold text-slate-600 flex items-center gap-1">
                                                {item.rating} <IconStar className="w-3 h-3 text-amber-500" filled={true} />
                                            </span>
                                            <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                            <span className="w-5 text-right text-slate-600 font-mono text-[11px]">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Reviews List */}
                            <div className="lg:col-span-8 space-y-4">
                                {reviews.map((rev) => (
                                    <div
                                        key={rev._id}
                                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                {rev.reviewer?.profileImage ? (
                                                    <img
                                                        src={rev.reviewer.profileImage}
                                                        alt={rev.reviewer.username}
                                                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                                    />
                                                ) : (
                                                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                                                        {rev.reviewer?.username?.charAt(0)?.toUpperCase() || "U"}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-xs text-slate-900">
                                                        {rev.reviewer?.username || "Verified Renter"}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500">
                                                        {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                         })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <IconStar
                                                        key={s}
                                                        className={`w-3.5 h-3.5 ${
                                                            s <= Number(rev.rating)
                                                                ? "text-amber-500"
                                                                : "text-slate-300"
                                                        }`}
                                                        filled={s <= Number(rev.rating)}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                            {rev.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* Review Modal Trigger */}
            {showReviewModal && reviewRental && (
                <ReviewModal
                    rental={reviewRental}
                    onClose={() => setShowReviewModal(false)}
                    onSuccess={() => {
                        setShowReviewModal(false);
                        api.get(`/reviews/equipment/${id}`)
                            .then((res) => setReviews(res.data.data || []))
                            .catch((err) => console.error(err));
                    }}
                />
            )}

            <Footer />
        </div>
    );
};

export default EquipmentDetails;