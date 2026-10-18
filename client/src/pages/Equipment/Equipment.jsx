import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchEquipments } from "../../features/equipmentSlice";
import EquipmentCard from "../../components/EquipmentCard";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconPackage, IconSearch, IconClose, IconAlert } from "../../components/Icons.jsx";

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

    // Getting unique categories from populated equipment data
    const categories = useMemo(() => {
        const categoryMap = new Map();
        equipments.forEach((equipment) => {
            if (equipment.category?._id) {
                categoryMap.set(equipment.category._id, equipment.category);
            }
        });
        return Array.from(categoryMap.values());
    }, [equipments]);

    // Filtering categories in dropdown
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

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-display font-semibold text-slate-700 text-sm">
                        Loading marketplace equipment...
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                        <IconAlert className="w-6 h-6" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Unable to load equipment
                    </h2>
                    <p className="text-sm text-slate-500 mt-2 mb-6">
                        {error}
                    </p>
                    <button
                        onClick={() => dispatch(fetchEquipments())}
                        className="px-6 py-2.5 rounded-full bg-[#0b1b34] text-white text-sm font-semibold hover:bg-[#152a4e] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* =====================================================
                HEADER / SEARCH BANNER
            ===================================================== */}
            <section className="bg-slate-900 text-white pt-16 pb-20 relative border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 mb-4 uppercase tracking-widest">
                            Verified Marketplace
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
                            Find the right gear for your project.
                        </h1>
                        <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                            Rent professional-grade tools, machinery, and equipment from verified owners in your community.
                        </p>
                    </div>

                    {/* Integrated Search Console */}
                    <div className="mt-10 bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20 w-full">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                            {/* Text Input */}
                            <div className="flex-1 relative">
                                <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                                    <IconSearch className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="What tool or machinery do you need? (e.g. Electric Drill, Camera, Mower)"
                                    className="w-full h-[52px] pl-12 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                                        title="Clear search"
                                    >
                                        <IconClose className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Category Selector */}
                            <div ref={categoryRef} className="relative w-full md:w-72 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setShowCategories(!showCategories)}
                                    className="w-full h-[52px] px-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer font-medium"
                                >
                                    <span className="truncate">
                                        {selectedCategory === "all"
                                            ? "All Categories"
                                            : categories.find(
                                                  (c) => c._id === selectedCategory
                                              )?.name || "All Categories"}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ml-2 ${
                                            showCategories ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown menu */}
                                {showCategories && (
                                    <div className="absolute z-40 top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                        <div className="p-2 border-b border-slate-100">
                                            <input
                                                type="text"
                                                value={categorySearch}
                                                onChange={(e) => setCategorySearch(e.target.value)}
                                                placeholder="Filter categories..."
                                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                                            />
                                        </div>

                                        <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategory("all");
                                                    setShowCategories(false);
                                                    setCategorySearch("");
                                                }}
                                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                                    selectedCategory === "all"
                                                        ? "bg-[#0b1b34] text-white"
                                                        : "text-slate-700 hover:bg-slate-100"
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
                                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                                                        selectedCategory === cat._id
                                                            ? "bg-[#0b1b34] text-white font-semibold"
                                                            : "text-slate-700 hover:bg-slate-100"
                                                    }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="w-full md:w-auto h-[52px] px-7 rounded-2xl bg-[#0b1b34] hover:bg-[#152a4e] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm hover:shadow cursor-pointer"
                            >
                                <IconSearch className="w-4 h-4 text-white" />
                                <span>Search</span>
                            </button>
                        </form>

                        {/* Quick filter pills */}
                        <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-slate-100">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0 mr-1">
                                Quick filter:
                            </span>
                            <button
                                type="button"
                                onClick={() => setSelectedCategory("all")}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                                    selectedCategory === "all"
                                        ? "bg-[#0b1b34] text-white shadow-xs"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                All
                            </button>
                            {categories.slice(0, 8).map((c) => (
                                <button
                                    key={c._id}
                                    type="button"
                                    onClick={() => setSelectedCategory(c._id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                                        selectedCategory === c._id
                                            ? "bg-[#0b1b34] text-white font-semibold shadow-xs"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                AVAILABLE EQUIPMENT SECTION
            ===================================================== */}
            <main id="equipment-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Result header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
                    <div>
                        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0b1b34]">
                            Available Equipment
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Showing{" "}
                            <span className="font-semibold text-slate-900">
                                {filteredEquipments.length}
                            </span>{" "}
                            item{filteredEquipments.length === 1 ? "" : "s"} ready for rental
                        </p>
                    </div>

                    {(search || selectedCategory !== "all") && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("all");
                                setCategorySearch("");
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors w-fit cursor-pointer border border-slate-200"
                        >
                            <IconClose className="w-3 h-3 text-slate-500" />
                            <span>Clear all filters</span>
                        </button>
                    )}
                </div>

                {/* Empty states */}
                {equipments.length === 0 ? (
                    <div className="py-20 text-center rounded-2xl bg-white border border-slate-200 max-w-lg mx-auto p-8 shadow-xs">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                            <IconPackage className="w-6 h-6 text-slate-600" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900">
                            No equipment listed yet
                        </h3>
                        <p className="text-sm text-slate-500 mt-2">
                            Check back soon or be the first to list equipment for rent!
                        </p>
                    </div>
                ) : filteredEquipments.length === 0 ? (
                    <div className="py-20 text-center rounded-2xl bg-white border border-slate-200 max-w-lg mx-auto p-8 shadow-xs">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                            <IconSearch className="w-6 h-6 text-slate-600" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900">
                            No equipment matches your search
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 mb-5">
                            Try checking for spelling, choosing another category, or clearing your active filters.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("all");
                                setCategorySearch("");
                            }}
                            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredEquipments.map((equipment) => (
                            <EquipmentCard key={equipment._id} equipment={equipment} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Equipment;