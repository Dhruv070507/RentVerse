import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRentals, getRentalRequests } from "../features/rentalSlice";
import Navbar from "../components/navbar.jsx";
import { Link } from "react-router-dom";
import api from "../services/api";

const Home = () => {

    const dispatch = useDispatch();

    const { rentals, rentalRequests } = useSelector(
        (state) => state.rental
    );

    const [topEquipment, setTopEquipment] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);


    useEffect(() => {
        dispatch(getMyRentals());
        dispatch(getRentalRequests());
    }, [dispatch]);


    useEffect(() => {

        const fetchTopRatedEquipment = async () => {

            try {

                setReviewsLoading(true);

                const response = await api.get("/equipments");

                const equipments = response.data.data || [];


                /*
                    FIX: The averageRating / reviewCount stored on the
                    equipment document go stale when a review is deleted.
                    So we fetch the actual reviews for every equipment and
                    calculate the rating from them (same as EquipmentDetails).
                */

                const equipmentWithReviews = await Promise.all(

                    equipments.map(async (equipment) => {

                        try {

                            const reviewResponse = await api.get(
                                `/reviews/equipment/${equipment._id}`
                            );

                            const reviews =
                                reviewResponse.data.data || [];

                            const reviewCount = reviews.length;

                            const averageRating = reviewCount
                                ? reviews.reduce(
                                    (sum, review) =>
                                        sum + Number(review.rating),
                                    0
                                ) / reviewCount
                                : 0;

                            return {
                                ...equipment,
                                reviews,
                                reviewCount,
                                averageRating
                            };

                        } catch (error) {

                            console.error(
                                `Failed to fetch reviews for ${equipment._id}:`,
                                error
                            );

                            return {
                                ...equipment,
                                reviews: [],
                                reviewCount: 0,
                                averageRating: 0
                            };

                        }

                    })

                );


                /*
                    Only equipment which actually has (live) reviews
                */

                const topRated = equipmentWithReviews
                    .filter((equipment) => equipment.reviewCount > 0)
                    .sort((a, b) => b.averageRating - a.averageRating)
                    .slice(0, 3);


                setTopEquipment(topRated);

            } catch (error) {

                console.error(
                    "Failed to fetch top rated equipment:",
                    error
                );

                setTopEquipment([]);

            } finally {

                setReviewsLoading(false);

            }

        };


        fetchTopRatedEquipment();

    }, []);


    const renderStars = (rating, size = "text-lg") => {

        const roundedRating = Math.round(Number(rating || 0));

        return (

            <div className="flex items-center gap-0.5">

                {[1, 2, 3, 4, 5].map((star) => (

                    <span
                        key={star}
                        className={
                            star <= roundedRating
                                ? `text-yellow-400 ${size}`
                                : `text-gray-200 ${size}`
                        }
                    >
                        ★
                    </span>

                ))}

            </div>

        );

    };


    const getRatingDistribution = (reviews) => {

        const total = reviews.length;

        return [5, 4, 3, 2, 1].map((rating) => {

            const count = reviews.filter(
                (review) => Number(review.rating) === rating
            ).length;

            return {
                rating,
                count,
                percentage: total ? (count / total) * 100 : 0
            };

        });

    };


    return (

        <div className="min-h-screen bg-white relative overflow-hidden">

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full bg-blue-400/25 blur-[70px]" />

                <div className="absolute top-[35%] right-[25%] w-[420px] h-[420px] rounded-full bg-indigo-400/20 blur-[75px]" />

                <div className="absolute top-[25%] right-[5%] w-[300px] h-[300px] rounded-full bg-pink-400/20 blur-[65px]" />

                <div className="absolute top-[28%] right-[38%] w-[260px] h-[260px] rounded-full bg-orange-300/25 blur-[60px]" />

                <div className="absolute bottom-[-100px] right-[30%] w-[500px] h-[400px] rounded-full bg-blue-400/20 blur-[80px]" />

            </div>


            <div className="relative z-10">

                <Navbar />


                <main className="pt-32">


                    {/* =================================================
                        HERO
                    ================================================= */}

                    <section className="max-w-5xl mx-auto px-6 text-center">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
                            EQUIPMENT RENTAL PLATFORM
                        </p>


                        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-[#0b1b34]">

                            Rent what you need.

                            <br />

                            Without buying it.

                        </h1>


                        <p className="font-sans max-w-xl mx-auto mt-7 text-base md:text-lg text-gray-500 leading-relaxed">

                            Discover equipment from people around you and rent it
                            whenever you need it.

                        </p>


                        <div className="flex justify-center gap-3 mt-9">

                            <Link
                                to="/equipments"
                                className="font-sans px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition inline-block"
                            >
                                Browse Equipments
                            </Link>


                            <Link
                                to="/add-equipment"
                                className="font-sans px-6 py-3 rounded-full bg-gray-200 text-[#0b1b34] text-sm hover:bg-gray-300 transition inline-block"
                            >
                                Add Your Equipment
                            </Link>

                        </div>

                    </section>



                    {/* =================================================
                        MY RENTALS
                    ================================================= */}

                    <section className="max-w-6xl mx-auto px-6 mt-28 pb-20">

                        <div className="flex items-end justify-between mb-7">

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-2 mt-10 ml-2">
                                    YOUR ACTIVITY
                                </p>

                                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34] mt-2">
                                    My Rentals
                                </h2>

                            </div>


                            <Link
                                to="/my-rentals"
                                className="font-sans text-sm text-[#0b1b34] hover:underline"
                            >
                                View All →
                            </Link>

                        </div>


                        {rentals.length === 0 ? (

                            <div className="border border-gray-200 bg-white rounded-2xl p-10 text-center shadow-sm">

                                <h3 className="font-display text-2xl text-[#0b1b34]">
                                    No rentals yet
                                </h3>

                                <p className="font-sans text-sm text-gray-500 mt-2">
                                    Start exploring equipment to make your first rental.
                                </p>

                            </div>

                        ) : (

                            <div className="flex gap-5 overflow-x-auto pb-4">

                                {rentals.slice(0, 5).map((rental) => (

                                    <div
                                        key={rental._id}
                                        className="min-w-[280px] md:min-w-[320px] border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                                    >

                                        <h3 className="font-display text-2xl text-[#0b1b34]">
                                            {rental.equipment?.name}
                                        </h3>


                                        <p className="font-sans text-sm text-gray-500 mt-1">
                                            Owner: {rental.owner?.username}
                                        </p>


                                        <div className="mt-5">

                                            <span
                                                className={`font-sans text-xs px-3 py-1.5 rounded-full ${
                                                    rental.status === "pending"
                                                        ? "bg-yellow-50 text-yellow-700"
                                                        : rental.status === "approved"
                                                        ? "bg-green-50 text-green-700"
                                                        : rental.status === "rejected"
                                                        ? "bg-red-50 text-red-700"
                                                        : rental.status === "cancelled"
                                                        ? "bg-gray-100 text-gray-600"
                                                        : "bg-blue-50 text-blue-700"
                                                }`}
                                            >
                                                {rental.status}
                                            </span>

                                        </div>


                                        <div className="mt-6 pt-5 border-t border-gray-100">

                                            <div className="flex justify-between">

                                                <div>

                                                    <p className="font-sans text-xs text-gray-400">
                                                        PERIOD
                                                    </p>

                                                    <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                        {new Date(
                                                            rental.rentalStartDate
                                                        ).toLocaleDateString()}
                                                    </p>

                                                    <p className="font-sans text-sm text-[#0b1b34]">
                                                        →
                                                        {" "}
                                                        {new Date(
                                                            rental.rentalEndDate
                                                        ).toLocaleDateString()}
                                                    </p>

                                                </div>


                                                <div className="text-right">

                                                    <p className="font-sans text-xs text-gray-400">
                                                        TOTAL
                                                    </p>

                                                    <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                        ₹{rental.totalPrice}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>



                    {/* =================================================
                        RENTAL REQUESTS
                    ================================================= */}

                    <section className="max-w-6xl mx-auto px-6 pb-20">

                        <div className="flex items-end justify-between mb-7">

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
                                    EQUIPMENT ACTIVITY
                                </p>

                                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                    Rental Requests
                                </h2>

                            </div>


                            <Link
                                to="/rental-requests"
                                className="font-sans text-sm text-[#0b1b34] hover:underline"
                            >
                                View All →
                            </Link>

                        </div>


                        {rentalRequests.length === 0 ? (

                            <div className="border border-gray-200 bg-white rounded-2xl p-10 text-center shadow-sm">

                                <h3 className="font-display text-2xl text-[#0b1b34]">
                                    No rental requests
                                </h3>

                                <p className="font-sans text-sm text-gray-500 mt-2">
                                    Requests for your equipment will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="flex gap-5 overflow-x-auto pb-4">

                                {rentalRequests.slice(0, 5).map((request) => (

                                    <div
                                        key={request._id}
                                        className="min-w-[280px] md:min-w-[320px] border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                                    >

                                        <h3 className="font-display text-2xl text-[#0b1b34]">
                                            {request.equipment?.name}
                                        </h3>


                                        <p className="font-sans text-sm text-gray-500 mt-1">
                                            Requested by: {request.renter?.username}
                                        </p>


                                        <div className="mt-5">

                                            <span
                                                className={`font-sans text-xs px-3 py-1.5 rounded-full ${
                                                    request.status === "pending"
                                                        ? "bg-yellow-50 text-yellow-700"
                                                        : request.status === "approved"
                                                        ? "bg-green-50 text-green-700"
                                                        : request.status === "rejected"
                                                        ? "bg-red-50 text-red-700"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {request.status}
                                            </span>

                                        </div>


                                        <div className="mt-6 pt-5 border-t border-gray-100">

                                            <div className="flex justify-between">

                                                <div>

                                                    <p className="font-sans text-xs text-gray-400">
                                                        PERIOD
                                                    </p>

                                                    <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                        {new Date(
                                                            request.rentalStartDate
                                                        ).toLocaleDateString()}
                                                    </p>

                                                    <p className="font-sans text-sm text-[#0b1b34]">
                                                        →
                                                        {" "}
                                                        {new Date(
                                                            request.rentalEndDate
                                                        ).toLocaleDateString()}
                                                    </p>

                                                </div>


                                                <div className="text-right">

                                                    <p className="font-sans text-xs text-gray-400">
                                                        TOTAL
                                                    </p>

                                                    <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                                        ₹{request.totalPrice}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>



                    {/* =================================================
                        TOP RATED EQUIPMENT
                    ================================================= */}

                    <section className="max-w-7xl mx-auto px-6 mt-44 pb-28">

                        <div className="relative w-full mb-10">

                            <div className="flex flex-col items-center text-center">

                                <p className="font-sans text-xs tracking-[0.18em] text-gray-400 uppercase">
                                    COMMUNITY REVIEWS
                                </p>

                                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mt-2">
                                    Top Rated Equipment
                                </h2>

                                <p className="font-sans text-sm text-gray-500 mt-2 text-center">
                                    Equipment rated highest by the RentVerse community.
                                </p>

                            </div>


                            <Link
                                to="/equipments"
                                className="block text-center mt-4 md:mt-0 md:absolute md:right-0 md:bottom-0 font-sans text-sm text-[#0b1b34] hover:underline"
                            >
                                Browse All →
                            </Link>

                        </div>


                        {reviewsLoading ? (

                            <div className="py-12 text-center">

                                <p className="text-sm text-gray-400">
                                    Loading community reviews...
                                </p>

                            </div>

                        ) : topEquipment.length === 0 ? (

                            <div className="bg-gray-50 rounded-2xl p-10 text-center">

                                <p className="font-display text-2xl text-[#0b1b34]">
                                    No reviews yet
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    Reviews from completed rentals will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="border-t border-gray-200">

                                {topEquipment.map((equipment) => {

                                    const visibleReviews =
                                        equipment.reviews.slice(0, 3);

                                    const averageRating = equipment.averageRating;

                                    const reviewCount = equipment.reviewCount;

                                    const ratingDistribution =
                                        getRatingDistribution(equipment.reviews);


                                    return (

                                        <div
                                            key={equipment._id}
                                            className="py-10 border-b border-gray-200"
                                        >

                                            <div className="grid grid-cols-1">


                                                {/* =================================================
                                                    REVIEW CONTENT
                                                    (same design as EquipmentDetails)
                                                ================================================= */}

                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                                                    {/* RATING SUMMARY */}

                                                    <div className="bg-gray-50 rounded-2xl p-7 self-start">

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
                                                            Based on {reviewCount}{" "}
                                                            {reviewCount === 1
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


                                                    {/* REVIEW LIST */}

                                                    <div className="lg:col-span-2 space-y-5">

                                                        <Link
                                                            to={`/equipment/${equipment._id}`}
                                                            className="flex items-baseline justify-between gap-4 hover:underline"
                                                        >
                                                            <h3 className="font-display text-2xl text-[#0b1b34]">
                                                                {equipment.name}
                                                            </h3>

                                                            <span className="text-sm text-gray-400">
                                                                ₹{equipment.rentalPrice} / day
                                                            </span>
                                                        </Link>


                                                        {visibleReviews.map((review) => (

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
                                                                                {review.createdAt
                                                                                    ? new Date(review.createdAt).toLocaleDateString()
                                                                                    : ""}
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


                                                                <div className="block mt-4">

                                                                    <Link
                                                                        to={`/equipment/${equipment._id}`}
                                                                        className="block w-48"
                                                                    >

                                                                        <div className="w-48 h-36 rounded-xl overflow-hidden bg-gray-100">

                                                                            {equipment.images?.[0] ? (

                                                                                <img
                                                                                    src={equipment.images[0]}
                                                                                    alt={equipment.name}
                                                                                    className="w-full h-full object-cover"
                                                                                />

                                                                            ) : (

                                                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                                                                    No Image
                                                                                </div>

                                                                            )}

                                                                        </div>

                                                                    </Link>


                                                                    <p className="block w-full mt-4 text-sm text-gray-600 leading-relaxed">
                                                                        {review.comment}
                                                                    </p>

                                                                </div>

                                                            </div>

                                                        ))}


                                                        {/* See All */}

                                                        {reviewCount > 3 && (

                                                            <Link
                                                                to={`/equipment/${equipment._id}`}
                                                                className="inline-block text-sm font-medium text-[#0b1b34] hover:underline"
                                                            >
                                                                See all {reviewCount} reviews →
                                                            </Link>

                                                        )}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        )}

                    </section>

                </main>

            </div>

        </div>

    );

};

export default Home;