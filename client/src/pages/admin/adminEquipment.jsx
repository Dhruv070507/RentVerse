import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import Footer from "../../components/Footer.jsx";
import {
    getAllEquipment
} from "../../features/adminSlice";


/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date) => {

    if (!date) {
        return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
};


const formatStatus = (status) => {

    if (!status) {
        return "Unknown";
    }

    return String(status)
        .replace(/_/g, " ")
        .replace(
            /\b\w/g,
            (char) => char.toUpperCase()
        );
};


const getEquipmentName = (item) => {

    return (
        item?.name ||
        item?.title ||
        item?.equipmentName ||
        "Unnamed Equipment"
    );
};


const getOwnerName = (item) => {

    const owner =
        item?.owner ||
        item?.user ||
        item?.createdBy;

    if (!owner) {
        return "Unknown owner";
    }

    if (typeof owner === "string") {
        return owner;
    }

    return (
        owner.name ||
        owner.fullName ||
        owner.email ||
        "Unknown owner"
    );
};


const getOwnerEmail = (item) => {

    const owner =
        item?.owner ||
        item?.user ||
        item?.createdBy;

    if (!owner || typeof owner === "string") {
        return "";
    }

    return owner.email || "";
};


const getStatus = (item) => {

    return String(
        item?.status ||
        item?.availabilityStatus ||
        (
            item?.available === true
                ? "available"
                : item?.available === false
                    ? "unavailable"
                    : ""
        )
    ).toLowerCase();
};


/* =========================================================
   STATUS STYLE
========================================================= */

const getStatusStyle = (status) => {

    if (
        status === "available" ||
        status === "active"
    ) {

        return {
            bg: "bg-green-50",
            text: "text-green-700",
            dot: "bg-green-500"
        };
    }


    if (
        status === "rented" ||
        status === "unavailable"
    ) {

        return {
            bg: "bg-orange-50",
            text: "text-orange-700",
            dot: "bg-orange-500"
        };
    }


    if (
        status === "pending"
    ) {

        return {
            bg: "bg-yellow-50",
            text: "text-yellow-700",
            dot: "bg-yellow-500"
        };
    }


    if (
        status === "inactive"
    ) {

        return {
            bg: "bg-gray-100",
            text: "text-gray-600",
            dot: "bg-gray-400"
        };
    }


    return {
        bg: "bg-gray-100",
        text: "text-gray-600",
        dot: "bg-gray-400"
    };
};


/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({
    eyebrow,
    title,
    description,
    buttonText,
    onClick
}) => {

    return (

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">

            <div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    {eyebrow}
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34] mt-1">
                    {title}
                </h2>

                {description && (

                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>

                )}

            </div>


            {buttonText && (

                <button
                    onClick={onClick}
                    className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-[#0b1b34] hover:border-[#0b1b34] hover:bg-gray-50 transition"
                >
                    {buttonText}
                </button>

            )}

        </div>
    );
};


/* =========================================================
   STAT ITEM
========================================================= */

const StatItem = ({
    label,
    value,
    description,
    type
}) => {

    const styles = {

        total: {
            bg: "bg-gray-50",
            value: "text-[#0b1b34]",
            dot: "bg-[#0b1b34]"
        },

        available: {
            bg: "bg-green-50/70",
            value: "text-green-600",
            dot: "bg-green-500"
        },

        rented: {
            bg: "bg-orange-50/70",
            value: "text-orange-600",
            dot: "bg-orange-500"
        },

        pending: {
            bg: "bg-yellow-50/70",
            value: "text-yellow-600",
            dot: "bg-yellow-500"
        }

    };


    const style =
        styles[type] ||
        styles.total;


    return (

        <div
            className={`${style.bg} rounded-2xl p-5`}
        >

            <div className="flex items-center gap-2">

                <span
                    className={`w-2 h-2 rounded-full ${style.dot}`}
                />

                <p className="text-xs font-medium text-gray-500">
                    {label}
                </p>

            </div>


            <p
                className={`font-display text-4xl mt-3 ${style.value}`}
            >
                {value}
            </p>


            <p className="text-xs text-gray-400 mt-1">
                {description}
            </p>

        </div>
    );
};


/* =========================================================
   EQUIPMENT ROW
========================================================= */

const EquipmentRow = ({
    item,
    onView
}) => {

    const name =
        getEquipmentName(item);

    const owner =
        getOwnerName(item);

    const email =
        getOwnerEmail(item);

    const status =
        getStatus(item);

    const statusStyle =
        getStatusStyle(status);


    return (

        <div className="group px-5 md:px-6 py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition">

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.2fr_1fr_0.9fr_auto] gap-4 lg:items-center">


                {/* EQUIPMENT */}

                <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Equipment
                    </p>

                    <p className="text-sm font-medium text-[#0b1b34] truncate">
                        {name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        ID: {item?._id?.slice(-8) || "—"}
                    </p>

                </div>


                {/* OWNER */}

                <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Owner
                    </p>

                    <p className="text-sm text-gray-700 truncate">
                        {owner}
                    </p>

                    {email && (

                        <p className="text-xs text-gray-400 truncate mt-1">
                            {email}
                        </p>

                    )}

                </div>


                {/* CATEGORY */}

                <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Category
                    </p>

                    <p className="text-sm text-gray-700">
                        {item?.category || "—"}
                    </p>

                </div>


                {/* STATUS */}

                <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Status
                    </p>

                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                    >

                        <span
                            className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {formatStatus(status)}

                    </span>

                </div>


                {/* ACTION */}

                <div className="lg:text-right">

                    <button
                        onClick={() =>
                            onView(item)
                        }
                        className="text-sm font-medium text-[#0b1b34] hover:text-blue-600 transition"
                    >
                        View →
                    </button>

                </div>

            </div>

        </div>
    );
};


/* =========================================================
   MAIN PAGE
========================================================= */

const AdminEquipment = () => {

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();


    const {
        equipment = [],
        loading,
        error
    } = useSelector(
        (state) => state.admin
    );


    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [showAll, setShowAll] =
        useState(false);


    /* =====================================================
       FETCH EQUIPMENT
    ===================================================== */

    useEffect(() => {

        dispatch(
            getAllEquipment()
        );

    }, [dispatch]);


    /* =====================================================
       STATISTICS
    ===================================================== */

    const stats = useMemo(() => {

        let available = 0;
        let rented = 0;
        let pending = 0;


        equipment.forEach(
            (item) => {

                const status =
                    getStatus(item);


                if (
                    status === "available" ||
                    status === "active"
                ) {

                    available++;

                }
                else if (
                    status === "rented" ||
                    status === "unavailable"
                ) {

                    rented++;

                }
                else if (
                    status === "pending"
                ) {

                    pending++;

                }

            }
        );


        return {

            total:
                equipment.length,

            available,

            rented,

            pending

        };

    }, [equipment]);


    /* =====================================================
       SEARCH + FILTER
    ===================================================== */

    const filteredEquipment =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            return equipment.filter(
                (item) => {

                    const name =
                        getEquipmentName(
                            item
                        ).toLowerCase();


                    const owner =
                        getOwnerName(
                            item
                        ).toLowerCase();


                    const email =
                        getOwnerEmail(
                            item
                        ).toLowerCase();


                    const category =
                        String(
                            item?.category ||
                            ""
                        ).toLowerCase();


                    const id =
                        String(
                            item?._id ||
                            ""
                        ).toLowerCase();


                    const status =
                        getStatus(item);


                    const matchesSearch =
                        !query ||
                        name.includes(query) ||
                        owner.includes(query) ||
                        email.includes(query) ||
                        category.includes(query) ||
                        id.includes(query);


                    const matchesStatus =
                        statusFilter === "all" ||
                        status === statusFilter;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            equipment,
            search,
            statusFilter
        ]);


    /* =====================================================
       DISPLAY LIMIT
    ===================================================== */

    const displayedEquipment =
        showAll
            ? filteredEquipment
            : filteredEquipment.slice(
                0,
                8
            );


    /* =====================================================
       VIEW EQUIPMENT
    ===================================================== */

    const handleViewEquipment =
        (item) => {

            navigate(
                `/admin/equipment/${item._id}`
            );

        };


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <div className="min-h-screen bg-[#f7f7f5]">

            <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="mb-10">

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        RentVerse Administration
                    </p>


                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mt-2">

                        <div>

                            <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34]">
                                Equipment Management
                            </h1>

                            <p className="text-gray-500 mt-2 max-w-xl">
                                Monitor marketplace equipment,
                                availability and ownership across
                                RentVerse.
                            </p>

                        </div>


                        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm min-w-[180px]">

                            <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                Total Equipment
                            </p>

                            <p className="font-display text-4xl text-[#0b1b34] mt-1">
                                {stats.total}
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

                        <p className="text-sm font-medium text-red-700">
                            {error}
                        </p>

                    </div>

                )}


                {/* =================================================
                    1. EQUIPMENT OVERVIEW
                ================================================= */}

                <section className="mb-10">

                    <SectionHeader
                        eyebrow="Equipment Overview"
                        title="Marketplace activity"
                        description="A quick overview of the equipment available on the platform."
                    />


                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 md:p-6">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                            <StatItem
                                label="Total"
                                value={stats.total}
                                description="All listed equipment"
                                type="total"
                            />


                            <StatItem
                                label="Available"
                                value={stats.available}
                                description="Currently available"
                                type="available"
                            />


                            <StatItem
                                label="Rented"
                                value={stats.rented}
                                description="Currently rented"
                                type="rented"
                            />


                            <StatItem
                                label="Pending"
                                value={stats.pending}
                                description="Awaiting approval"
                                type="pending"
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    2. EQUIPMENT DIRECTORY
                ================================================= */}

                <section>

                    <SectionHeader
                        eyebrow="Equipment Directory"
                        title="All equipment"
                        description="Search and review equipment listed across the marketplace."
                    />


                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">


                        {/* SEARCH */}

                        <div className="p-5 md:p-6 border-b border-gray-100">

                            <div className="flex flex-col lg:flex-row gap-3">


                                {/* Search */}

                                <div className="relative flex-1">

                                    <svg
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >

                                        <circle
                                            cx="11"
                                            cy="11"
                                            r="7"
                                        />

                                        <path d="m20 20-4-4" />

                                    </svg>


                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Search equipment, owner, category or ID..."
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-700 outline-none focus:border-[#0b1b34] focus:bg-white transition"
                                    />

                                </div>


                                {/* Status */}

                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(
                                            e.target.value
                                        )
                                    }
                                    className="lg:w-52 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-700 outline-none focus:border-[#0b1b34] focus:bg-white"
                                >

                                    <option value="all">
                                        All statuses
                                    </option>

                                    <option value="available">
                                        Available
                                    </option>

                                    <option value="rented">
                                        Rented
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* RESULT COUNT */}

                            <div className="flex items-center justify-between mt-4">

                                <p className="text-xs text-gray-400">

                                    Showing{" "}

                                    <span className="font-medium text-gray-600">
                                        {displayedEquipment.length}
                                    </span>

                                    {" "}of{" "}

                                    <span className="font-medium text-gray-600">
                                        {filteredEquipment.length}
                                    </span>

                                    {" "}equipment

                                </p>


                                {(search ||
                                    statusFilter !== "all") && (

                                    <button
                                        onClick={() => {

                                            setSearch("");

                                            setStatusFilter(
                                                "all"
                                            );

                                        }}
                                        className="text-xs font-medium text-gray-500 hover:text-[#0b1b34]"
                                    >
                                        Clear filters
                                    </button>

                                )}

                            </div>

                        </div>


                        {/* TABLE HEADER */}

                        {displayedEquipment.length > 0 && (

                            <div className="hidden lg:grid grid-cols-[1.4fr_1.2fr_1fr_0.9fr_auto] gap-4 px-5 md:px-6 py-3 bg-gray-50/70 border-b border-gray-100">

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Equipment
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Owner
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Category
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Status
                                </p>

                                <span />

                            </div>

                        )}


                        {/* LOADING */}

                        {loading &&
                            equipment.length === 0 && (

                                <div className="p-12 text-center">

                                    <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0b1b34] rounded-full animate-spin mx-auto" />

                                    <p className="text-sm text-gray-400 mt-4">
                                        Loading equipment...
                                    </p>

                                </div>

                            )}


                        {/* EMPTY */}

                        {!loading &&
                            displayedEquipment.length === 0 && (

                                <div className="p-12 text-center">

                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400">

                                        <span className="font-semibold">
                                            E
                                        </span>

                                    </div>


                                    <h3 className="font-display text-xl text-[#0b1b34] mt-4">
                                        No equipment found
                                    </h3>


                                    <p className="text-sm text-gray-400 mt-1">
                                        Try changing your search or status filter.
                                    </p>

                                </div>

                            )}


                        {/* EQUIPMENT ROWS */}

                        {displayedEquipment.map(
                            (item) => (

                                <EquipmentRow
                                    key={
                                        item._id
                                    }
                                    item={item}
                                    onView={
                                        handleViewEquipment
                                    }
                                />

                            )
                        )}


                        {/* SEE ALL */}

                        {filteredEquipment.length > 8 && (

                            <div className="px-5 md:px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">

                                <button
                                    onClick={() =>
                                        setShowAll(
                                            (prev) =>
                                                !prev
                                        )
                                    }
                                    className="px-5 py-2.5 rounded-xl bg-[#0b1b34] text-white text-sm font-medium hover:bg-[#142944] transition"
                                >

                                    {showAll
                                        ? "Show Less"
                                        : `See All ${filteredEquipment.length} Equipment →`}

                                </button>

                            </div>

                        )}

                    </div>

                </section>

            </div>

        

            <Footer />
</div>
    );
};


export default AdminEquipment;