import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchEquipments } from "../../features/equipmentSlice";
import EquipmentCard from "../../components/EquipmentCard";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconPackage, IconSearch, IconClose, IconAlert } from "../../components/Icons.jsx";

const ITEMS_PER_PAGE = 15;

const Equipment = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");

    const { equipments = [], loading, error } = useSelector(
        (state) => state.equipment
    );

    const { user } = useSelector((state) => state.auth);

    const [search, setSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
    const [showCategories, setShowCategories] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const categoryRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryRef.current &&
                !categoryRef.current.contains(event.target)
            ) {
                setShowCategories(false);
            }
        };

        if (showCategories) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCategories]);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();

        const equipmentSection = document.getElementById("equipment-section");

        if (equipmentSection) {
            equipmentSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Get unique categories from populated equipment data
    const categories = useMemo(() => {
        const categoryMap = new Map();

        equipments.forEach((equipment) => {
            if (equipment.category?._id) {
                categoryMap.set(equipment.category._id, equipment.category);
            }
        });

        return Array.from(categoryMap.values());
    }, [equipments]);

    // Filter categories inside the dropdown
    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.name.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [categories, categorySearch]);

    // Filter equipment by name, category and owner
    const filteredEquipments = useMemo(() => {
        return equipments.filter((equipment) => {
            const isOwnEquipment = Boolean(
                user?._id &&
                (equipment.owner?._id === user._id || equipment.owner === user._id)
            );

            const matchesSearch = equipment.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                equipment.category?._id === selectedCategory;

            return !isOwnEquipment && matchesSearch && matchesCategory;
        });
    }, [equipments, search, selectedCategory, user]);

    // Reset pagination whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredEquipments.length / ITEMS_PER_PAGE);

    const paginatedEquipments = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

        return filteredEquipments.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );
    }, [filteredEquipments, currentPage]);

    const resetFilters = () => {
        setSearch("");
        setSelectedCategory("all");
        setCategorySearch("");
    };

    const selectedCategoryName =
        selectedCategory === "all"
            ? "All Categories"
            : categories.find((category) => category._id === selectedCategory)?.name ||
              "All Categories";

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F4F2] flex flex-col">
                <Navbar />

                <main className="flex flex-1 flex-col items-center justify-center px-5 py-24">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
                    <p className="mt-5 text-xs uppercase tracking-[0.18em] text-black/50">
                        Loading marketplace equipment
                    </p>
                </main>

                <Footer />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-[#F5F4F2] flex flex-col">
                <Navbar />

                <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
                    <IconAlert className="h-7 w-7 text-black/50" />

                    <h2 className="mt-5 font-serif text-3xl tracking-tight">
                        Unable to load equipment
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-black/55">
                        {error}
                    </p>

                    <button
                        onClick={() => dispatch(fetchEquipments())}
                        className="mt-7 border border-black bg-black px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-transparent hover:text-black"
                    >
                        Try Again
                    </button>
                </main>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F4F2] font-sans text-black selection:bg-black selection:text-white">
            <Navbar />

            {/* MARKETPLACE INTRODUCTION */}
            <section className="px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-16 lg:pt-24">
                <div className="mx-auto max-w-[1600px]">
                    <div className="mx-auto max-w-5xl px-5 pt-10 text-center sm:px-8 lg:pt-14">
                        <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.8rem]">
                            Find the right equipment.
                            <span className="mt-1.5 block font-normal italic text-black/45">
                                Get more done.
                            </span>
                        </h1>
                    </div>

                    {/* SEARCH AND FILTER */}
                    <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
                        {/* Search Controls */}
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-2 rounded-sm bg-[#ECEBE8] p-2 sm:flex-row sm:items-center"
                        >
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="What are you looking for?"
                                    className="h-11 w-full bg-transparent pl-10 pr-9 text-sm outline-none placeholder:text-black/40"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
                                        title="Clear search"
                                    >
                                        <IconClose className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Category Selector */}
                            <div ref={categoryRef} className="relative sm:w-52 sm:shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setShowCategories(!showCategories)}
                                    className="flex h-11 w-full items-center justify-between bg-white/60 px-3 text-sm text-black/70 transition-colors hover:bg-white"
                                >
                                    <span className="truncate">{selectedCategoryName}</span>

                                    <svg
                                        className={`ml-2 h-4 w-4 shrink-0 text-black/45 transition-transform ${
                                            showCategories ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {showCategories && (
                                    <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden border border-black/10 bg-[#F5F4F2] shadow-lg">
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                value={categorySearch}
                                                onChange={(e) => setCategorySearch(e.target.value)}
                                                placeholder="Search categories..."
                                                className="w-full bg-black/[0.04] px-3 py-2.5 text-xs outline-none placeholder:text-black/40 focus:bg-black/[0.07]"
                                            />
                                        </div>

                                        <div className="max-h-56 overflow-y-auto px-2 pb-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategory("all");
                                                    setShowCategories(false);
                                                    setCategorySearch("");
                                                }}
                                                className={`w-full px-3 py-2.5 text-left text-xs ${
                                                    selectedCategory === "all"
                                                        ? "bg-black text-white"
                                                        : "text-black/70 hover:bg-black/5"
                                                }`}
                                            >
                                                All Categories
                                            </button>

                                            {filteredCategories.map((cat) => (
                                                <button
                                                    key={cat._id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCategory(cat._id);
                                                        setShowCategories(false);
                                                        setCategorySearch("");
                                                    }}
                                                    className={`w-full px-3 py-2.5 text-left text-xs ${
                                                        selectedCategory === cat._id
                                                            ? "bg-black text-white"
                                                            : "text-black/70 hover:bg-black/5"
                                                    }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}

                                            {filteredCategories.length === 0 && (
                                                <p className="px-3 py-3 text-xs text-black/45">
                                                    No categories found.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="flex h-11 items-center justify-center gap-3 bg-black px-6 text-xs font-medium text-white transition-colors hover:bg-black/75 sm:shrink-0"
                            >
                                Search
                            </button>
                        </form>

                        {/* Quick Category Filters */}
                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="mr-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/40">
                                Categories
                            </span>

                            <button
                                type="button"
                                onClick={() => setSelectedCategory("all")}
                                className={`text-xs transition-colors ${
                                    selectedCategory === "all"
                                        ? "font-semibold text-black"
                                        : "text-black/45 hover:text-black"
                                }`}
                            >
                                All
                            </button>

                            {categories.slice(0, 8).map((category) => (
                                <button
                                    key={category._id}
                                    type="button"
                                    onClick={() => setSelectedCategory(category._id)}
                                    className={`text-xs transition-colors ${
                                        selectedCategory === category._id
                                            ? "font-semibold text-black"
                                            : "text-black/45 hover:text-black"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AVAILABLE EQUIPMENT */}
            <main
                id="equipment-section"
                className="scroll-mt-10 px-5 pb-20 pt-5 sm:px-8 sm:pb-24 lg:px-16"
            >
                <div className="mx-auto max-w-[1600px]">
                    {/* Result Header */}
                    <div className="flex flex-col justify-between gap-5 border-b border-black/20 pb-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black/45">
                                The collection
                            </p>

                            <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                                Available Equipment
                            </h2>

                        </div>

                        {(search || selectedCategory !== "all") && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex w-fit items-center gap-2 border-b border-black/30 pb-1 text-xs text-black/60 transition-colors hover:border-black hover:text-black"
                            >
                                <IconClose className="h-3 w-3" />
                                Clear all filters
                            </button>
                        )}
                    </div>

                    {/* Empty States */}
                    {equipments.length === 0 ? (
                        <div className="mx-auto max-w-lg py-24 text-center">
                            <IconPackage className="mx-auto h-8 w-8 text-black/35" />

                            <h3 className="mt-5 font-serif text-2xl tracking-tight">
                                No equipment listed yet
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-black/55">
                                Check back soon or be the first to list equipment for rent.
                            </p>
                        </div>
                    ) : filteredEquipments.length === 0 ? (
                        <div className="mx-auto max-w-lg py-24 text-center">
                            <IconSearch className="mx-auto h-8 w-8 text-black/35" />

                            <h3 className="mt-5 font-serif text-2xl tracking-tight">
                                No equipment matches your search
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-black/55">
                                Try another search term or category, or clear your active filters.
                            </p>

                            <button
                                onClick={resetFilters}
                                className="mt-6 border border-black bg-black px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-transparent hover:text-black"
                            >
                                Reset Search
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Equipment Grid */}
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-8 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                                {paginatedEquipments.map((equipment) => (
                                    <EquipmentCard
                                        key={equipment._id}
                                        equipment={equipment}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                        disabled={currentPage === 1}
                                        className="border border-black/15 px-4 py-2.5 text-xs text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                                    >
                                        Previous
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            aria-current={currentPage === page ? "page" : undefined}
                                            className={`h-10 w-10 text-xs transition-colors ${
                                                currentPage === page
                                                    ? "bg-black text-white"
                                                    : "text-black/60 hover:bg-[#ECECEC]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                        disabled={currentPage === totalPages}
                                        className="border border-black/15 px-4 py-2.5 text-xs text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Equipment;