import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEquipments } from "../../features/equipmentSlice";
import EquipmentCard from "../../components/EquipmentCard";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";


const Equipment = () => {

    const dispatch = useDispatch();

    const {
        equipments,
        loading,
        error
    } = useSelector((state) => state.equipment);

    const { user } = useSelector((state) => state.auth);

    const [search, setSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showCategories, setShowCategories] = useState(false);


    // Fetch equipments
    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);


    // Getting unique categories from populated equipment data
    const categories = useMemo(() => {

        const categoryMap = new Map();

        equipments.forEach((equipment) => {

            if (equipment.category?._id) {
                categoryMap.set(
                    equipment.category._id,
                    equipment.category
                );
            }

        });

        return Array.from(categoryMap.values());

    }, [equipments]);


    // Filtering categories
    const filteredCategories = useMemo(() => {

        return categories.filter((category) =>
            category.name
                .toLowerCase()
                .includes(categorySearch.toLowerCase())
        );

    }, [categories, categorySearch]);


    // Filtering equipments
    const filteredEquipments = useMemo(() => {

        return equipments.filter((equipment) => {

            const isOwnEquipment =
                equipment.owner?._id === user?._id;

            const matchesSearch =
                equipment.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                equipment.category?._id === selectedCategory;

            return (
                !isOwnEquipment &&
                matchesSearch &&
                matchesCategory
            );

        });

    }, [equipments, search, selectedCategory, user]);


    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <div className="min-h-[70vh] flex items-center justify-center">

                    <div className="text-center">

                        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#0b1b34] rounded-full animate-spin mx-auto mb-5" />

                        <p className="font-sans text-sm text-gray-500">
                            Loading equipment...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // Error
    if (error) {
        return (
            <div className="min-h-screen bg-white">

                <Navbar />

                <div className="min-h-[70vh] flex items-center justify-center">

                    <div className="text-center">

                        <p className="font-display text-2xl text-[#0b1b34]">
                            Something went wrong.
                        </p>

                        <p className="font-sans mt-3 text-sm text-red-500">
                            {error}
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    return (
    <div className="min-h-screen bg-white">

        <Navbar />


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="bg-[#0b1b34]">

            <div className="max-w-7xl mx-auto px-6 pt-24 pb-28">

                <div className="max-w-4xl">

                    <p className="
                        font-sans
                        text-xs
                        tracking-[0.25em]
                        text-gray-400
                        uppercase
                        mb-6
                    ">
                        RENTVERSE MARKETPLACE
                    </p>

                    <h1 className="
                        font-display
                        text-5xl
                        md:text-7xl
                        lg:text-8xl
                        leading-[0.95]
                        text-white
                    ">
                        Find the right
                        <br />
                        equipment.
                    </h1>

                    <p className="
                        font-sans
                        mt-8
                        max-w-2xl
                        text-base
                        md:text-lg
                        text-gray-300
                        leading-relaxed
                    ">
                        From tools and cameras to sports equipment and
                        everything in between, discover equipment available
                        for rent from people around you.
                    </p>

                </div>


                {/* SEARCH */}
                <div className="
                    mt-16
                    bg-white
                    rounded-3xl
                    p-3
                    shadow-2xl
                ">

                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        gap-3
                    ">

                        {/* Search */}
                        <div className="flex-1 relative">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="
                                    absolute
                                    left-5
                                    top-1/2
                                    -translate-y-1/2
                                    w-5
                                    h-5
                                    text-gray-400
                                "
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                                />
                            </svg>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="What are you looking for?"
                                className="
                                    w-full
                                    pl-14
                                    pr-5
                                    py-5
                                    rounded-2xl
                                    bg-gray-50
                                    border
                                    border-gray-100
                                    text-sm
                                    text-[#0b1b34]
                                    placeholder:text-gray-400
                                    outline-none
                                    focus:bg-white
                                    focus:border-[#0b1b34]
                                    transition
                                "
                            />

                        </div>


                        {/* Category */}
                        <div className="relative md:w-80">

                            <button
                                type="button"
                                onClick={() => setShowCategories(!showCategories)}
                                className="
                                    w-full
                                    px-5
                                    py-5
                                    rounded-2xl
                                    bg-gray-50
                                    border
                                    border-gray-100
                                    flex
                                    items-center
                                    justify-between
                                    text-sm
                                    text-[#0b1b34]
                                    hover:border-gray-300
                                    transition
                                "
                            >

                                <span>

                                    {selectedCategory === "all"
                                        ? "All Categories"
                                        : categories.find(
                                            (category) =>
                                                category._id === selectedCategory
                                        )?.name || "All Categories"
                                    }

                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className={`
                                        w-4
                                        h-4
                                        transition
                                        ${showCategories ? "rotate-180" : ""}
                                    `}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19 9-7 7-7-7"
                                    />
                                </svg>

                            </button>


                            {/* Category dropdown */}
                            {showCategories && (

                                <div className="
                                    absolute
                                    z-30
                                    top-full
                                    left-0
                                    right-0
                                    mt-3
                                    bg-white
                                    border
                                    border-gray-100
                                    rounded-2xl
                                    shadow-2xl
                                    overflow-hidden
                                ">

                                    <div className="p-3 border-b border-gray-100">

                                        <input
                                            type="text"
                                            value={categorySearch}
                                            onChange={(e) =>
                                                setCategorySearch(e.target.value)
                                            }
                                            placeholder="Search categories..."
                                            className="
                                                w-full
                                                px-4
                                                py-3
                                                rounded-xl
                                                bg-gray-50
                                                border
                                                border-gray-100
                                                text-sm
                                                outline-none
                                                focus:border-[#0b1b34]
                                            "
                                        />

                                    </div>


                                    <div className="max-h-64 overflow-y-auto p-2">

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedCategory("all");
                                                setShowCategories(false);
                                                setCategorySearch("");
                                            }}
                                            className={`
                                                w-full
                                                text-left
                                                px-4
                                                py-3
                                                rounded-xl
                                                text-sm
                                                transition
                                                ${
                                                    selectedCategory === "all"
                                                        ? "bg-[#0b1b34] text-white"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                }
                                            `}
                                        >
                                            All Categories
                                        </button>


                                        {filteredCategories.map((category) => (

                                            <button
                                                key={category._id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategory(category._id);
                                                    setShowCategories(false);
                                                    setCategorySearch("");
                                                }}
                                                className={`
                                                    w-full
                                                    text-left
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    text-sm
                                                    transition
                                                    ${
                                                        selectedCategory === category._id
                                                            ? "bg-[#0b1b34] text-white"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                    }
                                                `}
                                            >
                                                {category.name}
                                            </button>

                                        ))}

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>


        {/* =====================================================
            INTRODUCTION
        ===================================================== */}

        <section className="bg-white">

            <div className="max-w-7xl mx-auto px-6 py-28">

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-16
                    items-end
                ">

                    <div>

                        <p className="
                            font-sans
                            text-xs
                            tracking-[0.2em]
                            text-gray-400
                            uppercase
                            mb-5
                        ">
                            THE MARKETPLACE
                        </p>

                        <h2 className="
                            font-display
                            text-4xl
                            md:text-6xl
                            leading-tight
                            text-[#0b1b34]
                        ">
                            Equipment should be
                            <br />
                            easier to access.
                        </h2>

                    </div>


                    <div>

                        <p className="
                            font-sans
                            text-base
                            text-gray-500
                            leading-relaxed
                            max-w-xl
                        ">
                            Buying equipment isn't always practical.
                            Sometimes you only need something for a day,
                            a weekend, or a single project.
                        </p>

                        <p className="
                            font-sans
                            mt-5
                            text-base
                            text-gray-500
                            leading-relaxed
                            max-w-xl
                        ">
                            RentVerse connects people who have equipment
                            with people who need it, making access simpler
                            while helping equipment owners put their
                            unused gear to work.
                        </p>

                    </div>

                </div>

            </div>

        </section>


        {/* =====================================================
            CATEGORY SECTION
        ===================================================== */}

        <section className="bg-[#0b1b34]">

            <div className="max-w-7xl mx-auto px-6 py-28">

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    justify-between
                    gap-8
                    mb-14
                ">

                    <div>

                        <p className="
                            font-sans
                            text-xs
                            tracking-[0.2em]
                            text-gray-400
                            uppercase
                            mb-5
                        ">
                            EXPLORE CATEGORIES
                        </p>

                        <h2 className="
                            font-display
                            text-4xl
                            md:text-6xl
                            text-white
                        ">
                            Start with what
                            <br />
                            you need.
                        </h2>

                    </div>

                    <p className="
                        font-sans
                        max-w-md
                        text-sm
                        text-gray-400
                        leading-relaxed
                    ">
                        Browse equipment by category and discover
                        options from people around you.
                    </p>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                ">

                    {categories.map((category, index) => (

                        <button
                            key={category._id}
                            onClick={() => {
                                setSelectedCategory(category._id);

                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });
                            }}
                            className="
                                group
                                bg-white
                                rounded-2xl
                                p-6
                                min-h-[190px]
                                text-left
                                flex
                                flex-col
                                justify-between
                                hover:-translate-y-1
                                hover:shadow-2xl
                                transition-all
                                duration-300
                            "
                        >

                            <div className="
                                flex
                                items-start
                                justify-between
                            ">

                                <span className="
                                    text-xs
                                    font-semibold
                                    text-gray-400
                                ">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="
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
                                    transition
                                ">
                                    →
                                </span>

                            </div>


                            <div>

                                <h3 className="
                                    text-xl
                                    font-semibold
                                    text-[#0b1b34]
                                ">
                                    {category.name}
                                </h3>

                                {category.description && (

                                    <p className="
                                        mt-3
                                        text-sm
                                        text-gray-500
                                        leading-relaxed
                                    ">
                                        {category.description}
                                    </p>

                                )}

                            </div>

                        </button>

                    ))}

                </div>

            </div>

        </section>


        {/* =====================================================
            EQUIPMENT
        ===================================================== */}

        <section className="bg-white">

            <div className="max-w-7xl mx-auto px-6 py-28">

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    justify-between
                    gap-6
                    mb-14
                ">

                    <div>

                        <p className="
                            font-sans
                            text-xs
                            tracking-[0.2em]
                            text-gray-400
                            uppercase
                            mb-5
                        ">
                            AVAILABLE EQUIPMENT
                        </p>

                        <h2 className="
                            font-display
                            text-4xl
                            md:text-6xl
                            text-[#0b1b34]
                        ">
                            Ready when you are.
                        </h2>

                    </div>


                    <div className="flex items-center gap-5">

                        <p className="text-sm text-gray-500">

                            <span className="
                                font-semibold
                                text-[#0b1b34]
                            ">
                                {filteredEquipments.length}
                            </span>{" "}

                            available

                        </p>


                        {(search || selectedCategory !== "all") && (

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory("all");
                                    setCategorySearch("");
                                }}
                                className="
                                    text-sm
                                    font-medium
                                    text-[#0b1b34]
                                    hover:underline
                                "
                            >
                                Clear filters
                            </button>

                        )}

                    </div>

                </div>


                {equipments.length === 0 ? (

                    <div className="
                        py-24
                        border-y
                        border-gray-100
                        text-center
                    ">

                        <p className="
                            font-display
                            text-3xl
                            text-[#0b1b34]
                        ">
                            No equipment available yet.
                        </p>

                        <p className="
                            mt-3
                            text-sm
                            text-gray-500
                        ">
                            New equipment will appear here when owners
                            list their gear.
                        </p>

                    </div>

                ) : filteredEquipments.length === 0 ? (

                    <div className="
                        py-28
                        rounded-3xl
                        bg-gray-50
                        text-center
                    ">

                        <p className="
                            font-display
                            text-3xl
                            text-[#0b1b34]
                        ">
                            Nothing matched your search.
                        </p>

                        <p className="
                            mt-3
                            text-sm
                            text-gray-500
                        ">
                            Try another equipment name or category.
                        </p>

                    </div>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-x-7
                        gap-y-14
                    ">

                        {filteredEquipments.map((equipment) => (

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

        <section className="bg-gray-50">

            <div className="max-w-7xl mx-auto px-6 py-28">

                <div className="max-w-3xl mb-16">

                    <p className="
                        font-sans
                        text-xs
                        tracking-[0.2em]
                        text-gray-400
                        uppercase
                        mb-5
                    ">
                        HOW IT WORKS
                    </p>

                    <h2 className="
                        font-display
                        text-4xl
                        md:text-6xl
                        text-[#0b1b34]
                    ">
                        Simple from search
                        <br />
                        to rental.
                    </h2>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                ">

                    {[
                        {
                            number: "01",
                            title: "Find equipment",
                            text: "Search the marketplace or explore categories to find equipment that fits your needs."
                        },
                        {
                            number: "02",
                            title: "Send a request",
                            text: "Choose your equipment, select your rental details, and send a request to the owner."
                        },
                        {
                            number: "03",
                            title: "Rent and use",
                            text: "Once approved, complete the rental process and get the equipment you need."
                        }
                    ].map((step) => (

                        <div
                            key={step.number}
                            className="
                                bg-white
                                rounded-2xl
                                p-8
                                min-h-[260px]
                                flex
                                flex-col
                                justify-between
                            "
                        >

                            <span className="
                                text-xs
                                font-semibold
                                text-gray-400
                            ">
                                {step.number}
                            </span>

                            <div>

                                <h3 className="
                                    font-display
                                    text-2xl
                                    text-[#0b1b34]
                                ">
                                    {step.title}
                                </h3>

                                <p className="
                                    mt-4
                                    text-sm
                                    text-gray-500
                                    leading-relaxed
                                ">
                                    {step.text}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>


        {/* =====================================================
            TRUST SECTION
        ===================================================== */}

        <section className="bg-white">

            <div className="max-w-7xl mx-auto px-6 py-28">

                <div className="
                    bg-[#0b1b34]
                    rounded-3xl
                    px-8
                    py-14
                    md:px-14
                    md:py-16
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-10
                ">

                    <div>

                        <p className="
                            text-4xl
                            font-display
                            text-white
                        ">
                            Simple
                        </p>

                        <p className="
                            mt-3
                            text-sm
                            text-gray-400
                            leading-relaxed
                        ">
                            A straightforward rental experience without
                            unnecessary complexity.
                        </p>

                    </div>


                    <div>

                        <p className="
                            text-4xl
                            font-display
                            text-white
                        ">
                            Accessible
                        </p>

                        <p className="
                            mt-3
                            text-sm
                            text-gray-400
                            leading-relaxed
                        ">
                            Find equipment from people around you instead
                            of buying things you may rarely use.
                        </p>

                    </div>


                    <div>

                        <p className="
                            text-4xl
                            font-display
                            text-white
                        ">
                            Community
                        </p>

                        <p className="
                            mt-3
                            text-sm
                            text-gray-400
                            leading-relaxed
                        ">
                            Connect equipment owners and renters through
                            one shared marketplace.
                        </p>

                    </div>

                </div>

            </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="bg-white">

            <div className="max-w-7xl mx-auto px-6 pb-28">

                <div className="
                    border-t
                    border-gray-100
                    pt-24
                    text-center
                ">

                    <p className="
                        font-sans
                        text-xs
                        tracking-[0.2em]
                        text-gray-400
                        uppercase
                        mb-5
                    ">
                        YOUR NEXT PROJECT STARTS HERE
                    </p>

                    <h2 className="
                        font-display
                        text-4xl
                        md:text-6xl
                        text-[#0b1b34]
                    ">
                        Don't buy it.
                        <br />
                        Rent it.
                    </h2>

                    <p className="
                        max-w-xl
                        mx-auto
                        mt-6
                        text-sm
                        md:text-base
                        text-gray-500
                        leading-relaxed
                    ">
                        Explore available equipment and find what you need
                        without committing to a purchase.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }}
                        className="
                            mt-9
                            px-7
                            py-3.5
                            rounded-full
                            bg-[#0b1b34]
                            text-white
                            text-sm
                            font-medium
                            hover:bg-[#142944]
                            transition
                        "
                    >
                        Explore equipment
                    </button>

                </div>

            </div>

        </section>


        <Footer />

    </div>
);

};

export default Equipment;