import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/adminSlice";

const AdminUsers = () => {
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector(
        (state) => state.admin
    );

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // --------------------------------
    // Statistics
    // --------------------------------

    const statistics = useMemo(() => {
        const total = users.length;

        const normalUsers = users.filter(
            (user) => user.role === "user"
        ).length;

        const deliveryAgents = users.filter(
            (user) => user.role === "delivery_agent"
        ).length;

        const admins = users.filter(
            (user) => user.role === "admin"
        ).length;

        return {
            total,
            normalUsers,
            deliveryAgents,
            admins,
        };
    }, [users]);

    // --------------------------------
    // Filter Users
    // --------------------------------

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                user.username
                    ?.toLowerCase()
                    .includes(searchValue) ||
                user.email
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesRole =
                roleFilter === "all" ||
                user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    // --------------------------------
    // Helpers
    // --------------------------------

    const getInitials = (username) => {
        if (!username) return "U";

        return username
            .slice(0, 2)
            .toUpperCase();
    };

    const getRoleName = (role) => {
        if (role === "delivery_agent") {
            return "Delivery Agent";
        }

        if (role === "admin") {
            return "Admin";
        }

        return "User";
    };

    const getRoleStyles = (role) => {
        if (role === "admin") {
            return {
                badge: "bg-purple-50 text-purple-700 border-purple-100",
                dot: "bg-purple-500",
            };
        }

        if (role === "delivery_agent") {
            return {
                badge: "bg-orange-50 text-orange-700 border-orange-100",
                dot: "bg-orange-500",
            };
        }

        return {
            badge: "bg-blue-50 text-blue-700 border-blue-100",
            dot: "bg-blue-500",
        };
    };

    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">

                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-blue-400/20 blur-[90px]" />
                    <div className="absolute top-[35%] right-[20%] w-[420px] h-[420px] rounded-full bg-indigo-400/15 blur-[90px]" />
                    <div className="absolute bottom-[-150px] left-[15%] w-[500px] h-[400px] rounded-full bg-purple-400/15 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">

                    <div className="animate-pulse">

                        <div className="h-3 w-32 bg-gray-200 rounded-full mb-4" />
                        <div className="h-10 w-64 bg-gray-200 rounded-xl mb-3" />
                        <div className="h-4 w-96 bg-gray-200 rounded-full mb-12" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-36 bg-white border border-gray-100 rounded-3xl shadow-sm"
                                />
                            ))}
                        </div>

                        <div className="h-[500px] bg-white border border-gray-100 rounded-3xl shadow-sm" />

                    </div>
                </div>
            </div>
        );
    }

    // --------------------------------
    // Error
    // --------------------------------

    if (error) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-red-400/10 blur-[90px]" />
                </div>

                <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

                    <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl shadow-gray-200/40">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                            <span className="text-red-500 text-2xl font-bold">
                                !
                            </span>
                        </div>

                        <p className="text-xs tracking-[0.2em] text-red-400 uppercase mb-3">
                            Something went wrong
                        </p>

                        <h2 className="font-display text-3xl text-[#0b1b34]">
                            Unable to load users
                        </h2>

                        <p className="text-gray-500 mt-3 leading-relaxed">
                            {error}
                        </p>

                        <button
                            onClick={() => dispatch(getAllUsers())}
                            className="mt-7 px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
                        >
                            Try Again
                        </button>

                    </div>

                </div>
            </div>
        );
    }

    // --------------------------------
    // Main UI
    // --------------------------------

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">

            {/* =========================================
                BACKGROUND
            ========================================= */}

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full bg-blue-400/20 blur-[80px]" />

                <div className="absolute top-[30%] right-[22%] w-[420px] h-[420px] rounded-full bg-indigo-400/15 blur-[85px]" />

                <div className="absolute top-[18%] right-[2%] w-[300px] h-[300px] rounded-full bg-pink-400/15 blur-[70px]" />

                <div className="absolute top-[45%] left-[-100px] w-[300px] h-[300px] rounded-full bg-orange-300/10 blur-[75px]" />

                <div className="absolute bottom-[-120px] right-[35%] w-[500px] h-[400px] rounded-full bg-blue-400/15 blur-[90px]" />

            </div>


            <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-20">

                {/* =========================================
                    HEADER
                ========================================= */}

                <section className="mb-12">

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                        <div>

                            <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-4">
                                RENTVERSE ADMINISTRATION
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-[#0b1b34]">
                                Manage your
                                <br />
                                <span className="text-gray-400">
                                    community.
                                </span>
                            </h1>

                            <p className="font-sans max-w-xl mt-5 text-base md:text-lg text-gray-500 leading-relaxed">
                                Manage users, monitor account activity,
                                and keep your RentVerse marketplace organized.
                            </p>

                        </div>


                        {/* Account count */}

                        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">

                            <div className="w-11 h-11 rounded-xl bg-[#0b1b34] text-white flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    {statistics.total}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider">
                                    Total Accounts
                                </p>

                                <p className="text-sm font-semibold text-[#0b1b34] mt-0.5">
                                    Registered users
                                </p>
                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    STATISTICS
                ========================================= */}

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

                    {/* Total */}

                    <div className="group bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                    Total Users
                                </p>

                                <h2 className="font-display text-4xl text-[#0b1b34] mt-3">
                                    {statistics.total}
                                </h2>
                            </div>

                            <div className="w-11 h-11 rounded-2xl bg-[#0b1b34] text-white flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    U
                                </span>
                            </div>

                        </div>

                        <div className="mt-7 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                All registered accounts
                            </p>
                        </div>

                    </div>


                    {/* Customers */}

                    <div className="group bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                    Customers
                                </p>

                                <h2 className="font-display text-4xl text-[#0b1b34] mt-3">
                                    {statistics.normalUsers}
                                </h2>
                            </div>

                            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    C
                                </span>
                            </div>

                        </div>

                        <div className="mt-7 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Regular RentVerse users
                            </p>
                        </div>

                    </div>


                    {/* Delivery Agents */}

                    <div className="group bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                    Delivery Agents
                                </p>

                                <h2 className="font-display text-4xl text-[#0b1b34] mt-3">
                                    {statistics.deliveryAgents}
                                </h2>
                            </div>

                            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    D
                                </span>
                            </div>

                        </div>

                        <div className="mt-7 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Registered delivery agents
                            </p>
                        </div>

                    </div>


                    {/* Admins */}

                    <div className="group bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                    Administrators
                                </p>

                                <h2 className="font-display text-4xl text-[#0b1b34] mt-3">
                                    {statistics.admins}
                                </h2>
                            </div>

                            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    A
                                </span>
                            </div>

                        </div>

                        <div className="mt-7 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Platform administrators
                            </p>
                        </div>

                    </div>

                </section>


                {/* =========================================
                    USERS
                ========================================= */}

                <section>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">

                        <div>

                            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
                                ACCOUNT DIRECTORY
                            </p>

                            <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                                All Users
                            </h2>

                        </div>

                        <p className="text-sm text-gray-400">
                            Showing{" "}
                            <span className="text-[#0b1b34] font-semibold">
                                {filteredUsers.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-[#0b1b34] font-semibold">
                                {users.length}
                            </span>
                        </p>

                    </div>


                    {/* =========================================
                        SEARCH + FILTER BAR
                    ========================================= */}

                    <div className="bg-white/85 backdrop-blur-md border border-gray-200 rounded-3xl p-5 md:p-6 shadow-sm mb-5">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* Search */}

                            <div className="relative w-full lg:w-[360px]">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search by name or email..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#0b1b34]/30 focus:ring-4 focus:ring-[#0b1b34]/5 transition"
                                />

                            </div>


                            {/* Filters */}

                            <div className="flex flex-wrap items-center gap-2">

                                {[
                                    ["all", "All"],
                                    ["user", "Customers"],
                                    ["delivery_agent", "Delivery Agents"],
                                    ["admin", "Admins"],
                                ].map(([value, label]) => (

                                    <button
                                        key={value}
                                        onClick={() => setRoleFilter(value)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            roleFilter === value
                                                ? "bg-[#0b1b34] text-white shadow-sm"
                                                : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-[#0b1b34]"
                                        }`}
                                    >
                                        {label}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* =========================================
                        TABLE
                    ========================================= */}

                    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px]">

                                <thead>

                                    <tr className="border-b border-gray-100 bg-gray-50/70">

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            User
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Email
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Address
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Role
                                        </th>

                                        <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                            Joined
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {filteredUsers.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="px-6 py-20 text-center"
                                            >

                                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">

                                                    <span className="text-gray-300 text-xl">
                                                        U
                                                    </span>

                                                </div>

                                                <h3 className="font-display text-2xl text-[#0b1b34]">
                                                    No users found
                                                </h3>

                                                <p className="text-sm text-gray-400 mt-2">
                                                    Try changing your search or filter.
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredUsers.map((user) => {

                                            const roleStyles =
                                                getRoleStyles(user.role);

                                            return (
                                                <tr
                                                    key={user._id}
                                                    className="group hover:bg-gray-50/70 transition-colors"
                                                >

                                                    {/* User */}

                                                    <td className="px-6 py-5">

                                                        <div className="flex items-center gap-3.5">

                                                            <div className="w-11 h-11 shrink-0 rounded-2xl bg-[#0b1b34] text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                                                                {getInitials(
                                                                    user.username
                                                                )}
                                                            </div>

                                                            <div className="min-w-0">

                                                                <p className="font-semibold text-[#0b1b34] truncate">
                                                                    {user.username}
                                                                </p>

                                                                <p className="text-[11px] text-gray-400 mt-1">
                                                                    ID:{" "}
                                                                    {user._id.slice(
                                                                        -8
                                                                    )}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* Email */}

                                                    <td className="px-6 py-5">

                                                        <span className="text-sm text-gray-600">
                                                            {user.email}
                                                        </span>

                                                    </td>


                                                    {/* Address */}

                                                    <td className="px-6 py-5">

                                                        <span className="text-sm text-gray-500">
                                                            {user.address ||
                                                                "Not provided"}
                                                        </span>

                                                    </td>


                                                    {/* Role */}

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${roleStyles.badge}`}
                                                        >

                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${roleStyles.dot}`}
                                                            />

                                                            {getRoleName(
                                                                user.role
                                                            )}

                                                        </span>

                                                    </td>


                                                    {/* Joined */}

                                                    <td className="px-6 py-5">

                                                        <span className="text-sm text-gray-500">

                                                            {user.createdAt
                                                                ? new Date(
                                                                      user.createdAt
                                                                  ).toLocaleDateString(
                                                                      "en-IN",
                                                                      {
                                                                          day: "2-digit",
                                                                          month: "short",
                                                                          year: "numeric",
                                                                      }
                                                                  )
                                                                : "—"}

                                                        </span>

                                                    </td>

                                                </tr>
                                            );
                                        })
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};


export default AdminUsers;

