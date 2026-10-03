import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import EquipmentCard from "../components/EquipmentCard.jsx";

import { fetchCategories } from "../features/categorySlice";


const Home = () => {

    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const {
        equipments = [],
        loading
    } = useSelector(
        (state) => state.equipment
    );

    const {
        rentals = []
    } = useSelector(
        (state) => state.rental
    );

    const {
        categories = [],
        loading: categoryLoading
    } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white text-[#0b1b34]">

            <Navbar />


            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="relative overflow-hidden bg-white">

                <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-28">

                    <div className="max-w-5xl">

                        <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-7">
                            EQUIPMENT RENTAL, SIMPLIFIED
                        </p>

                        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-[#0b1b34]">
                            Rent what you need.
                            <br />
                            <span className="text-gray-400">
                                Share what you own.
                            </span>
                        </h1>

                        <p className="font-sans max-w-2xl mt-8 text-lg md:text-xl leading-relaxed text-gray-500">
                            RentVerse connects people who need equipment with
                            people who have it. Discover useful equipment,
                            request rentals, and manage everything from one
                            simple platform.
                        </p>


                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">

                            <Link
                                to="/equipments"
                                className="
                                    px-7 py-3.5
                                    rounded-full
                                    bg-[#0b1b34]
                                    text-white
                                    text-sm
                                    font-medium
                                    hover:bg-[#142944]
                                    transition
                                "
                            >
                                Explore Equipment
                            </Link>

                            {!isAuthenticated && (
                                <Link
                                    to="/login"
                                    className="
                                        px-7 py-3.5
                                        rounded-full
                                        border
                                        border-gray-200
                                        text-[#0b1b34]
                                        text-sm
                                        font-medium
                                        hover:border-gray-400
                                        transition
                                    "
                                >
                                    Get Started
                                </Link>
                            )}

                            {isAuthenticated && (
                                <Link
                                    to="/add-equipment"
                                    className="
                                        px-7 py-3.5
                                        rounded-full
                                        border
                                        border-gray-200
                                        text-[#0b1b34]
                                        text-sm
                                        font-medium
                                        hover:border-gray-400
                                        transition
                                    "
                                >
                                    Add Your Equipment
                                </Link>
                            )}

                        </div>

                    </div>


                    {/* Hero bottom information */}

                    <div className="
                        mt-24
                        pt-8
                        border-t
                        border-gray-100
                        grid
                        grid-cols-1
                        sm:grid-cols-3
                        gap-8
                    ">

                        <div>
                            <p className="text-lg font-semibold text-[#0b1b34]">
                                Simple
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Find and request equipment without the hassle.
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-[#0b1b34]">
                                Community-driven
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Turn equipment you already own into something useful.
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-[#0b1b34]">
                                All in one place
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Rentals, payments, deliveries and notifications.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                INTRO
            ===================================================== */}

            <section className="bg-[#f7f8fa]">

                <div className="max-w-7xl mx-auto px-6 py-28">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                                ONE PLATFORM
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-[#0b1b34]">
                                Equipment should be
                                <br />
                                easier to access.
                            </h2>

                        </div>


                        <div className="lg:pt-10">

                            <p className="font-sans text-base md:text-lg text-gray-500 leading-relaxed">
                                Not everyone needs to own every piece of
                                equipment they use. RentVerse makes it easier
                                to find the right equipment when you need it
                                while giving owners a simple way to make their
                                unused equipment available to others.
                            </p>

                            <p className="font-sans mt-6 text-base md:text-lg text-gray-500 leading-relaxed">
                                From discovering equipment to requesting a
                                rental, completing payments and managing
                                deliveries, everything stays connected.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-[#0b1b34]">

    <div className="max-w-7xl mx-auto px-6 py-28">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">

            <div>

                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                    EXPLORE BY CATEGORY
                </p>

                <h2 className="font-display text-4xl md:text-5xl text-white">
                    Find equipment by what you need.
                </h2>

                <p className="font-sans mt-5 text-base text-gray-300 leading-relaxed max-w-xl">
                    Explore different categories and discover equipment
                    that fits your next project, event, or activity.
                </p>

            </div>

            <Link
                to="/equipments"
                className="
                    text-sm
                    font-medium
                    text-white
                    hover:text-gray-300
                    transition
                    whitespace-nowrap
                "
            >
                View all equipment →
            </Link>

        </div>


        {/* Categories */}
        {categoryLoading ? (

            <p className="text-sm text-gray-300">
                Loading categories...
            </p>

        ) : categories.length === 0 ? (

            <p className="text-sm text-gray-300">
                No categories available yet.
            </p>

        ) : (

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

    {categories.map((category, index) => (

        <Link
            key={category._id}
            to={`/equipments?category=${category._id}`}
            className="
                group
                bg-white
                rounded-2xl
                p-6
                min-h-[190px]
                flex
                flex-col
                justify-between
                border
                border-white/10
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
                duration-300
            "
        >

            <div className="flex items-start justify-between">

                <span className="text-xs font-semibold text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <span
                    className="
                        w-9
                        h-9
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-500
                        group-hover:bg-[#0b1b34]
                        group-hover:text-white
                        group-hover:translate-x-1
                        transition-all
                    "
                >
                    →
                </span>

            </div>


            <div>

                <h3 className="
                    text-xl
                    font-semibold
                    text-[#0b1b34]
                    tracking-tight
                ">
                    {category.name}
                </h3>

                {category.description && (
                    <p className="
                        mt-2
                        text-sm
                        text-gray-500
                        leading-relaxed
                    ">
                        {category.description}
                    </p>
                )}

            </div>

        </Link>

    ))}

</div>

        )}

    </div>

</section>


            {/* =====================================================
                MY RENTALS / REQUESTS
            ===================================================== */}

            {isAuthenticated && (
                <section className="bg-white">

                    <div className="max-w-7xl mx-auto px-6 py-28">

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

                            <div>

                                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    YOUR ACTIVITY
                                </p>

                                <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                    Your rentals & requests.
                                </h2>

                                <p className="font-sans mt-4 text-sm text-gray-500 max-w-xl">
                                    Keep track of the equipment you've rented
                                    and the requests you've made.
                                </p>

                            </div>

                            <Link
                                to="/my-rentals"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#0b1b34]
                                    hover:underline
                                    whitespace-nowrap
                                "
                            >
                                Browse all →
                            </Link>

                        </div>


                        {rentals.length === 0 ? (

                            <div className="
                                border-y
                                border-gray-100
                                py-12
                            ">

                                <p className="text-sm text-gray-500">
                                    You don't have any rentals yet.
                                </p>

                                <Link
                                    to="/equipments"
                                    className="inline-block mt-4 text-sm font-medium text-[#0b1b34] hover:underline"
                                >
                                    Explore equipment →
                                </Link>

                            </div>

                        ) : (

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                lg:grid-cols-3
                                gap-6
                            ">

                                {rentals.slice(0, 3).map((rental) => (

                                    <div
                                        key={rental._id}
                                        className="
                                            border
                                            border-gray-100
                                            rounded-2xl
                                            p-6
                                            hover:border-gray-300
                                            transition
                                        "
                                    >

                                        <p className="text-xs uppercase tracking-wider text-gray-400">
                                            Rental
                                        </p>

                                        <h3 className="mt-3 text-lg font-semibold text-[#0b1b34]">
                                            {rental.equipment?.name || "Equipment"}
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Status: {rental.status}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </section>
            )}


            {/* =====================================================
                EXPLORE EQUIPMENT
            ===================================================== */}

            <section className="bg-[#f7f8fa]">

                <div className="max-w-7xl mx-auto px-6 py-28">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                EXPLORE
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                Find what you need.
                            </h2>

                            <p className="font-sans mt-4 text-sm md:text-base text-gray-500 max-w-xl">
                                Browse equipment available from people around
                                you and find something that fits your next project.
                            </p>

                        </div>

                        <Link
                            to="/equipments"
                            className="
                                text-sm
                                font-medium
                                text-[#0b1b34]
                                hover:underline
                                whitespace-nowrap
                            "
                        >
                            View all equipment →
                        </Link>

                    </div>


                    {loading ? (

                        <p className="text-sm text-gray-500">
                            Loading equipment...
                        </p>

                    ) : equipments.length === 0 ? (

                        <p className="text-sm text-gray-500">
                            No equipment available right now.
                        </p>

                    ) : (

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        ">

                            {equipments
                                .filter(
                                    (equipment) =>
                                        equipment.owner?._id !== user?._id
                                )
                                .slice(0, 3)
                                .map((equipment) => (

                                    <EquipmentCard
                                        key={equipment._id}
                                        equipment={equipment}
                                    />

                                ))}

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                HOW IT WORKS
            ===================================================== */}

            <section className="bg-white">

                <div className="max-w-7xl mx-auto px-6 py-28">

                    <div className="max-w-2xl mb-16">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                            HOW IT WORKS
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                            From discovery to delivery.
                        </h2>

                        <p className="font-sans mt-5 text-base text-gray-500 leading-relaxed">
                            RentVerse keeps the rental journey simple for
                            everyone involved.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        <div className="border-t border-gray-200 pt-6">

                            <span className="text-xs font-semibold text-gray-400">
                                01
                            </span>

                            <h3 className="mt-6 text-xl font-semibold text-[#0b1b34]">
                                Find equipment
                            </h3>

                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                                Browse available equipment, explore details
                                and find something that matches your needs.
                            </p>

                        </div>


                        <div className="border-t border-gray-200 pt-6">

                            <span className="text-xs font-semibold text-gray-400">
                                02
                            </span>

                            <h3 className="mt-6 text-xl font-semibold text-[#0b1b34]">
                                Request a rental
                            </h3>

                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                                Send a rental request to the equipment owner
                                and manage the request directly from your account.
                            </p>

                        </div>


                        <div className="border-t border-gray-200 pt-6">

                            <span className="text-xs font-semibold text-gray-400">
                                03
                            </span>

                            <h3 className="mt-6 text-xl font-semibold text-[#0b1b34]">
                                Get it delivered
                            </h3>

                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                                Once approved, payment and delivery can be
                                managed through the RentVerse platform.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                NAVY TRUST SECTION
            ===================================================== */}

            <section className="bg-[#0b1b34] text-white">

                <div className="max-w-7xl mx-auto px-6 py-28">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-5">
                                WHY RENTVERSE
                            </p>

                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
                                A simpler way to
                                <br />
                                access equipment.
                            </h2>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">

                            <div>

                                <p className="text-xl font-semibold">
                                    Simple
                                </p>

                                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                                    Designed to make renting equipment
                                    straightforward from start to finish.
                                </p>

                            </div>


                            <div>

                                <p className="text-xl font-semibold">
                                    Connected
                                </p>

                                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                                    Rentals, payments, deliveries and
                                    notifications work together.
                                </p>

                            </div>


                            <div>

                                <p className="text-xl font-semibold">
                                    Accessible
                                </p>

                                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                                    Find equipment without needing to own
                                    everything yourself.
                                </p>

                            </div>


                            <div>

                                <p className="text-xl font-semibold">
                                    Community
                                </p>

                                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                                    Help useful equipment reach people who
                                    actually need it.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <section className="bg-white">

                <div className="max-w-7xl mx-auto px-6 py-32">

                    <div className="text-center max-w-3xl mx-auto">

                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                            GET STARTED
                        </p>

                        <h2 className="font-display text-5xl md:text-6xl text-[#0b1b34] leading-tight">
                            Ready to find
                            <br />
                            what you need?
                        </h2>

                        <p className="font-sans mt-6 text-base text-gray-500 leading-relaxed">
                            Explore equipment available on RentVerse or list
                            something you own and make it available to others.
                        </p>


                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-9">

                            <Link
                                to="/equipments"
                                className="
                                    px-7 py-3.5
                                    rounded-full
                                    bg-[#0b1b34]
                                    text-white
                                    text-sm
                                    font-medium
                                    hover:bg-[#142944]
                                    transition
                                "
                            >
                                Explore Equipment
                            </Link>

                            <Link
                                to="/about"
                                className="
                                    px-7 py-3.5
                                    rounded-full
                                    border
                                    border-gray-200
                                    text-[#0b1b34]
                                    text-sm
                                    font-medium
                                    hover:border-gray-400
                                    transition
                                "
                            >
                                Learn More
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            <Footer />

        </div>
    );
};

export default Home;
