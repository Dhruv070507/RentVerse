
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import { fetchCategories } from "../features/categorySlice";

const heroImage =
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=85";

const Home = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { categories = [], loading: categoryLoading } = useSelector(
        (state) => state.category
    );

    // Fetch categories
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Scroll animations
    useEffect(() => {
        const revealElements = document.querySelectorAll(".rv-reveal");
        const headingElements = document.querySelectorAll(".rv-heading-reveal");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            revealElements.forEach((element) =>
                element.classList.add("is-visible")
            );
            headingElements.forEach((element) =>
                element.classList.add("is-visible")
            );
            return;
        }

        // Normal content: reveal only once
        const contentObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        contentObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        // Main headings: repeat on entering and leaving viewport
        const headingObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    } else {
                        entry.target.classList.remove("is-visible");
                    }
                });
            },
            { threshold: 0.3 }
        );

        revealElements.forEach((element) => contentObserver.observe(element));
        headingElements.forEach((element) => headingObserver.observe(element));

        return () => {
            contentObserver.disconnect();
            headingObserver.disconnect();
        };
    }, [categoryLoading, categories.length]);

    return (
        <div className="min-h-screen bg-[#F5F4F2] font-sans text-black">
            <Navbar />

            <main>
                {/* HERO SECTION */}
                <section className="px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-16 lg:pb-24 lg:pt-24">
                    <div className="mx-auto max-w-[1600px]">
                        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

                            {/* HERO CONTENT */}
                            <div className="relative z-10 py-4 lg:py-10">
                                <p className="rv-reveal mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-black/65">
                                    Equipment rental, made considered
                                </p>

                                <h1 className="rentverse-hero-title max-w-3xl font-serif text-[clamp(3.25rem,7.4vw,7.3rem)] leading-[0.91] tracking-[-0.055em]">
                                    <span className="rentverse-word" style={{ animationDelay: "0.15s" }}>The</span>{" "}
                                    <span className="rentverse-word" style={{ animationDelay: "0.3s" }}>right</span>{" "}
                                    <span className="rentverse-word" style={{ animationDelay: "0.45s" }}>tools</span>
                                    <br />
                                    <span className="font-normal italic">
                                        <span className="rentverse-word" style={{ animationDelay: "0.6s" }}>for</span>{" "}
                                        <span className="rentverse-word" style={{ animationDelay: "0.75s" }}>what’s</span>{" "}
                                        <span className="rentverse-word" style={{ animationDelay: "0.9s" }}>next.</span>
                                    </span>
                                </h1>

                                <p className="rv-reveal mt-7 max-w-lg text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
                                    Find the equipment your next project needs. Rent from
                                    owners, book with confidence, and put good equipment
                                    to work.
                                </p>

                                <div className="rv-reveal mt-9 flex flex-wrap items-center gap-3">
                                    <Link
                                        to="/equipments"
                                        className="inline-flex min-h-12 items-center justify-center gap-5 bg-black px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#333333] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                    >
                                        Explore equipment
                                    </Link>

                                    {!isAuthenticated ? (
                                        <Link
                                            to="/login"
                                            className="inline-flex min-h-12 items-center justify-center border border-black/30 px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
                                        >
                                            Get started
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/add-equipment"
                                            className="inline-flex min-h-12 items-center justify-center border border-black/30 px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
                                        >
                                            Add equipment
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/15 pt-5 text-xs tracking-wide text-black/65 sm:mt-16">
                                    <span className="rv-reveal">Browse by category</span>
                                    <span className="rv-reveal">Transparent rental rates</span>
                                    <span className="rv-reveal">Delivery and return tracking</span>
                                </div>
                            </div>

                            {/* HERO IMAGE */}
                            <div className="rv-reveal relative min-w-0">
                                <div className="relative aspect-[4/4.1] overflow-hidden bg-[#ECECEC] sm:aspect-[5/4] lg:aspect-[0.94/1]">
                                    <img
                                        src={heroImage}
                                        alt="A general equipment and engineering workspace"
                                        className="h-full w-full object-cover object-center"
                                        fetchPriority="high"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                                        <div className="max-w-xs">
                                            <p className="rv-reveal text-[10px] uppercase tracking-[0.2em] text-white">
                                                Make room for progress
                                            </p>

                                            <p className="rv-reveal mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl">
                                                Good work starts with the right equipment.
                                            </p>
                                        </div>

                                        <span
                                            className="rv-reveal hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-xl text-white sm:flex"
                                            aria-hidden="true"
                                        >
                                            ↗
                                        </span>
                                    </div>
                                </div>

                                <p className="rv-reveal mt-3 text-right text-[10px] uppercase tracking-[0.18em] text-black/60">
                                    Find it. Rent it. Get to work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EQUIPMENT CATEGORIES */}
                <section className="bg-[#F5F4F2] px-5 py-28 sm:px-8 sm:py-36 lg:px-16 lg:py-44">
                    <div className="mx-auto max-w-[1600px]">

                        {/* SECTION HEADER */}
                        <div className="mb-16 flex flex-col gap-7 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                <p className="rv-reveal mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
                                    Explore our collection
                                </p>

                                <h2 className="rv-heading-reveal font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                                    Find the right equipment
                                    <br className="hidden sm:block" />
                                    for every project.
                                </h2>

                                <p className="rv-reveal mt-5 max-w-xl text-base leading-7 text-black/70">
                                    Explore a wide range of equipment available for rent.
                                    Find what you need and get your next project moving.
                                </p>
                            </div>

                            <Link
                                to="/equipments"
                                className="rv-reveal inline-flex min-h-12 w-fit items-center justify-center gap-5 bg-black px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#333333]"
                            >
                                View all equipment
                            </Link>
                        </div>

                        {/* CATEGORY GRID */}
                        {categoryLoading ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[230px] animate-pulse bg-[#E8E7E4]"
                                    />
                                ))}
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="border-y border-black/20 py-14 text-center">
                                <h3 className="rv-reveal font-serif text-2xl">
                                    No categories available yet.
                                </h3>

                                <Link
                                    to="/equipments"
                                    className="rv-reveal mt-5 inline-flex border-b border-black pb-1 text-sm font-medium"
                                >
                                    Browse equipment →
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {categories.slice(0, 8).map((category, index) => (
                                    <Link
                                        key={category._id}
                                        to={`/equipments?category=${category._id}`}
                                        className="group flex min-h-[230px] flex-col justify-between border border-black/15 bg-[#ECECEC] p-6 transition-all duration-300 hover:border-black/50 hover:bg-[#E5E4E1] sm:p-7"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="rv-reveal text-xs font-semibold tracking-[0.15em] text-black/70">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <span className="rv-reveal flex h-9 w-9 items-center justify-center rounded-full border border-black/30 text-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
                                                ↗
                                            </span>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="rv-reveal font-serif text-2xl leading-tight tracking-[-0.02em] text-black sm:text-3xl">
                                                {category.name}
                                            </h3>

                                            <p className="rv-reveal mt-3 line-clamp-2 min-h-[40px] text-sm leading-5 text-black/75">
                                                {category.description ||
                                                    `Explore ${category.name.toLowerCase()} available for rent.`}
                                            </p>

                                            <div className="mt-6 flex items-center justify-between border-t border-black/20 pt-4">
                                                <span className="rv-reveal text-xs font-semibold text-black">
                                                    Explore category
                                                </span>

                                                <span className="rv-reveal text-sm transition-transform duration-300 group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* HOW RENTVERSE WORKS */}
                <section className="bg-[#ECECEC] px-5 py-28 sm:px-8 sm:py-36 lg:px-16 lg:py-44">
                    <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">

                        {/* SECTION INTRO */}
                        <div>
                            <p className="rv-reveal mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-black/65">
                                A better way to rent
                            </p>

                            <h2 className="rv-heading-reveal max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                                Less buying. More doing.
                            </h2>

                            <p className="rv-reveal mt-6 max-w-md text-base leading-7 text-black/70">
                                Access useful equipment when you need it, and give the
                                equipment you own more opportunities to work.
                            </p>

                            <Link
                                to="/about"
                                className="rv-reveal group mt-8 inline-flex items-center gap-3 border-b border-black/40 pb-2 text-sm hover:border-black"
                            >
                                Get to know RentVerse
                                <span
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </Link>
                        </div>

                        {/* PROCESS */}
                        <div className="grid gap-0 sm:grid-cols-2">
                            <article className="border-t border-black/20 py-8 sm:pr-8">
                                <span className="rv-reveal font-serif text-2xl">01</span>

                                <h3 className="rv-reveal mt-6 font-serif text-2xl">
                                    Find the right fit
                                </h3>

                                <p className="rv-reveal mt-3 max-w-sm text-sm leading-6 text-black/70">
                                    Explore equipment by category and compare the details
                                    before making a request.
                                </p>
                            </article>

                            <article className="border-t border-black/20 py-8 sm:pl-8">
                                <span className="rv-reveal font-serif text-2xl">02</span>

                                <h3 className="rv-reveal mt-6 font-serif text-2xl">
                                    Book with clarity
                                </h3>

                                <p className="rv-reveal mt-3 max-w-sm text-sm leading-6 text-black/70">
                                    Choose your rental dates, review the price, and follow
                                    your request through its status.
                                </p>
                            </article>

                            <article className="border-t border-black/20 py-8 sm:pr-8">
                                <span className="rv-reveal font-serif text-2xl">03</span>

                                <h3 className="rv-reveal mt-6 font-serif text-2xl">
                                    Payment made simple
                                </h3>

                                <p className="rv-reveal mt-3 max-w-sm text-sm leading-6 text-black/70">
                                    Complete eligible rentals through the platform's
                                    Razorpay payment flow.
                                </p>
                            </article>

                            <article className="border-t border-black/20 py-8 sm:pl-8">
                                <span className="rv-reveal font-serif text-2xl">04</span>

                                <h3 className="rv-reveal mt-6 font-serif text-2xl">
                                    Track every handoff
                                </h3>

                                <p className="rv-reveal mt-3 max-w-sm text-sm leading-6 text-black/70">
                                    Follow delivery and return progress, including
                                    OTP-based handoff verification.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                
{/* RENTALS AND REQUESTS SECTION */}
<section className="px-5 py-28 sm:px-8 sm:py-36 lg:px-16 lg:py-44">
    <div className="mx-auto max-w-[1600px] border-y border-black/20 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
            <p className="rv-reveal mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-black/65">
                Your RentVerse activity
            </p>

            <h2 className="rv-heading-reveal font-serif text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Everything about your rentals, in one place.
            </h2>

            <p className="rv-reveal mx-auto mt-6 max-w-xl text-base leading-7 text-black/70">
                Keep track of the equipment you've rented and manage requests
                from people interested in renting your equipment.
            </p>

            <div className="rv-reveal mt-9 flex flex-wrap justify-center gap-3">
                <Link
                    to="/my-rentals"
                    className="inline-flex min-h-12 items-center justify-center gap-4 bg-black px-7 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#333333]"
                >
                    My Rentals
                </Link>

                <Link
                    to="/rental-requests"
                    className="inline-flex min-h-12 items-center justify-center gap-4 border border-black/30 px-7 py-3 text-sm font-medium text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
                >
                    Rental Requests
                </Link>
            </div>
        </div>
    </div>
</section>


{/* LIST YOUR EQUIPMENT SECTION */}
<section className="px-5 pb-24 pt-12 sm:px-8 sm:pb-32 lg:px-16 lg:pb-36">
    <div className="mx-auto max-w-[1600px]">
        <div className="relative overflow-hidden bg-black px-7 py-14 text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24">

            {/* Decorative element */}
            <span className="pointer-events-none absolute -right-10 -top-24 font-serif text-[280px] leading-none text-white/[0.035] sm:-right-4 sm:-top-36 sm:text-[400px]">
                +
            </span>

            <div className="relative z-10">

                <div className="flex items-center justify-between gap-4">
                    <p className="rv-reveal text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
                        For equipment owners
                    </p>

                    <span className="rv-reveal hidden text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">
                        RentVerse / 01
                    </span>
                </div>

                <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_auto] lg:items-end">

                    {/* Heading and description */}
                    <div>
                        <h2 className="rv-heading-reveal max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
                            Your equipment.
                            <br />
                            <span className="font-normal italic text-white/55">
                                Your opportunity.
                            </span>
                        </h2>

                        <p className="rv-reveal mt-8 max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                            Turn unused equipment into an opportunity.
                            List what you own, reach people who need it,
                            and earn from the equipment you already have.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="rv-reveal">
                        <Link
                            to={isAuthenticated ? "/add-equipment" : "/login"}
                            className="group inline-flex min-h-14 w-full items-center justify-between gap-10 border border-white/40 px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:w-auto"
                        >
                            List your equipment
                        </Link>
                    </div>

                </div>

                {/* Bottom details */}
                <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-6 sm:mt-24">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                        Make more of what you own
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                        List · Connect · Earn
                    </p>
                </div>

            </div>
        </div>
    </div>
</section>


            </main>

            <Footer />
        </div>
    );
};

export default Home;
