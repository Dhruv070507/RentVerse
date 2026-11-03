import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/adminNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconAlert, IconDocument } from "../../components/Icons.jsx";
import api from "../../services/api";
import {
    createCategory,
    fetchCategories,
    updateCategory,
    deleteCategory,
} from "../../features/categorySlice";

const AdminCategories = () => {
    const dispatch = useDispatch();

    const { categories, loading, error } = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [showRequests, setShowRequests] = useState(false);
    const [requests, setRequests] = useState([]);
    const [requestsLoading, setRequestsLoading] = useState(false);
    const [requestError, setRequestError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        const result = await dispatch(
            createCategory({
                name: name.trim(),
                description: description.trim(),
            })
        );

        if (createCategory.fulfilled.match(result)) {
            setName("");
            setDescription("");
        }
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setEditName(category.name);
        setEditDescription(category.description || "");
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName("");
        setEditDescription("");
    };

    const handleUpdate = async (id) => {
        if (!editName.trim()) return;

        const result = await dispatch(
            updateCategory({
                categoryId: id,
                updateData: {
                    name: editName.trim(),
                    description: editDescription.trim(),
                },
            })
        );

        if (updateCategory.fulfilled.match(result)) {
            handleCancelEdit();
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category? All equipment associated with it might be affected."
        );

        if (!confirmed) return;

        await dispatch(deleteCategory(id));
    };

    const handleFetchRequests = async () => {
        if (showRequests) {
            setShowRequests(false);
            return;
        }

        setShowRequests(true);
        setRequestsLoading(true);
        setRequestError("");

        try {
            const response = await api.get("/category-requests/admin", {
                params: { status: "pending" },
            });

            setRequests(response.data.data || []);
        } catch (error) {
            setRequestError(
                error.response?.data?.message || "Failed to fetch category requests."
            );
        } finally {
            setRequestsLoading(false);
        }
    };

    const handleRequestAction = async (id, action) => {
        setProcessingId(id);
        setRequestError("");

        try {
            if (action === "approve") {
                await api.patch(`/category-requests/admin/${id}/approve`);
            } else {
                await api.patch(`/category-requests/admin/${id}/reject`);
            }

            setRequests((prev) =>
                prev.filter((request) => request._id !== id)
            );

            if (action === "approve") {
                dispatch(fetchCategories());
            }
        } catch (error) {
            setRequestError(
                error.response?.data?.message || `Failed to ${action} request.`
            );
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                            Inventory Taxonomy
                        </span>

                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                            Equipment Categories
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                            Define, modify, and organize the equipment classifications across RentVerse.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleFetchRequests}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                        >
                            {showRequests ? "Hide Requests" : "Incoming Requests"}
                        </button>

                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />

                            <span className="text-xs font-bold text-slate-700">
                                {categories.length} Total Categories
                            </span>
                        </div>
                    </div>
                </div>

                {/* Incoming Category Requests */}
                {showRequests && (
                    <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display font-bold text-xl text-slate-900">
                                Incoming Category Requests
                            </h2>

                            <span className="text-xs text-slate-500">
                                {requests.length} Pending
                            </span>
                        </div>

                        {requestError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs">
                                {requestError}
                            </div>
                        )}

                        {requestsLoading ? (
                            <p className="text-sm text-slate-500 py-6 text-center">
                                Loading requests...
                            </p>
                        ) : requests.length === 0 ? (
                            <p className="text-sm text-slate-500 py-6 text-center">
                                No pending category requests.
                            </p>
                        ) : (
                            <div className="space-y-5">
                                {requests.map((request) => (
                                    <div
                                        key={request._id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 last:border-0 last:pb-0"
                                    >
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-sm text-slate-900">
                                                {request.name}
                                            </h3>

                                            <p className="text-xs text-slate-500 mt-1">
                                                {request.description || "No description provided."}
                                            </p>

                                            <p className="text-xs text-slate-400 mt-2">
                                                Requested by:{" "}
                                                {request.requestedBy?.name || "Unknown user"}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                disabled={processingId === request._id}
                                                onClick={() =>
                                                    handleRequestAction(request._id, "approve")
                                                }
                                                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition cursor-pointer"
                                            >
                                                {processingId === request._id
                                                    ? "Processing..."
                                                    : "Approve"}
                                            </button>

                                            <button
                                                type="button"
                                                disabled={processingId === request._id}
                                                onClick={() =>
                                                    handleRequestAction(request._id, "reject")
                                                }
                                                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-50 transition cursor-pointer"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* Add Category Section */}
                <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-10">
                    <div className="mb-6">
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            Add New Category
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            New categories immediately become available in equipment listing forms and search filters.
                        </p>
                    </div>

                    <form
                        onSubmit={handleAddCategory}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
                    >
                        <div className="md:col-span-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Photography & Video"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="md:col-span-6">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Description
                            </label>

                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief description of included equipment..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-sm disabled:opacity-50 transition cursor-pointer"
                            >
                                {loading ? "Adding..." : "+ Create Category"}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2">
                        <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Categories List */}
                <section>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-display font-bold text-xl text-slate-900">
                            Existing Categories
                        </h2>

                        <span className="text-xs text-slate-400">
                            Manage name and descriptions
                        </span>
                    </div>

                    {loading && categories.length === 0 ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200">
                            <p className="text-xs text-slate-500 font-medium">
                                Loading categories...
                            </p>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                            <IconDocument className="w-8 h-8 text-slate-300 mx-auto mb-2" />

                            <p className="font-display font-bold text-lg text-slate-900">
                                No categories yet
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Create your first equipment category above.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category._id}
                                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {editingId === category._id ? (
                                        /* Edit Mode */
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                                    Category Name
                                                </label>

                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 outline-none focus:border-blue-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                                    Description
                                                </label>

                                                <input
                                                    type="text"
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 outline-none focus:border-blue-600"
                                                />
                                            </div>

                                            <div className="flex items-center gap-2 pt-2">
                                                <button
                                                    onClick={() => handleUpdate(category._id)}
                                                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
                                                >
                                                    Save Changes
                                                </button>

                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Normal Mode */
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />

                                                    <h3 className="font-display font-bold text-base text-slate-900 truncate">
                                                        {category.name}
                                                    </h3>
                                                </div>

                                                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                                    {category.description || "No description provided."}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdminCategories;