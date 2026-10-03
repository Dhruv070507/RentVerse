import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminNavbar from "../../components/adminNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import {
    createCategory,
    fetchCategories,
    updateCategory,
    deleteCategory
} from "../../features/categorySlice";


const AdminCategories = () => {

    const dispatch = useDispatch();

    const {
        categories,
        loading,
        error
    } = useSelector((state) => state.category);


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");


    // Fetch categories when page loads
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    // Add category
    const handleAddCategory = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        const result = await dispatch(
            createCategory({
                name: name.trim(),
                description: description.trim()
            })
        );

        if (createCategory.fulfilled.match(result)) {
            setName("");
            setDescription("");
        }
    };


    // Start editing
    const handleEdit = (category) => {

        setEditingId(category._id);
        setEditName(category.name);
        setEditDescription(category.description || "");
    };


    // Cancel editing
    const handleCancelEdit = () => {

        setEditingId(null);
        setEditName("");
        setEditDescription("");
    };


    // Update category
    const handleUpdate = async (id) => {

        if (!editName.trim()) {
            return;
        }

        const result = await dispatch(
            updateCategory({
                categoryId: id,
                updateData: {
                    name: editName.trim(),
                    description: editDescription.trim()
                }
            })
        );

        if (updateCategory.fulfilled.match(result)) {
            handleCancelEdit();
        }
    };


    // Delete category
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        await dispatch(deleteCategory(id));
    };


    return (
        <div className="min-h-screen bg-white">

            <AdminNavbar />

            <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">

                {/* Heading */}
                <div className="mb-12">

                    <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                        ADMINISTRATION
                    </p>

                    <h1 className="font-display text-5xl text-[#0b1b34]">
                        Manage Categories
                    </h1>

                    <p className="font-sans mt-4 text-sm text-gray-500">
                        Create and manage the categories available for equipment.
                    </p>

                </div>


                {/* Add Category */}
                <section className="border border-gray-200 rounded-2xl p-6 mb-10">

                    <div className="mb-6">

                        <h2 className="font-sans text-lg font-semibold text-[#0b1b34]">
                            Add Category
                        </h2>

                        <p className="font-sans text-sm text-gray-500 mt-1">
                            Add a new equipment category.
                        </p>

                    </div>


                    <form
                        onSubmit={handleAddCategory}
                        className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4"
                    >

                        {/* Name */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category name"
                            className="
                                w-full
                                px-4 py-3
                                rounded-xl
                                border border-gray-200
                                text-sm
                                outline-none
                                focus:border-[#0b1b34]
                            "
                            required
                        />


                        {/* Description */}
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="
                                w-full
                                px-4 py-3
                                rounded-xl
                                border border-gray-200
                                text-sm
                                outline-none
                                focus:border-[#0b1b34]
                            "
                        />


                        {/* Add Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                px-6 py-3
                                rounded-xl
                                bg-black
                                text-white
                                text-sm
                                font-medium
                                hover:bg-gray-800
                                transition
                                disabled:opacity-50
                            "
                        >
                            {loading ? "Adding..." : "Add Category"}
                        </button>

                    </form>

                </section>


                {/* Error */}
                {error && (
                    <div className="
                        mb-6
                        px-4 py-3
                        rounded-xl
                        bg-red-50
                        border border-red-100
                        text-sm
                        text-red-500
                    ">
                        {error}
                    </div>
                )}


                {/* Categories */}
                <section>

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="font-sans text-lg font-semibold text-[#0b1b34]">
                            Categories
                        </h2>

                        <span className="font-sans text-sm text-gray-400">
                            {categories.length} categories
                        </span>

                    </div>


                    {loading && categories.length === 0 ? (

                        <div className="py-12 text-center">
                            <p className="font-sans text-sm text-gray-500">
                                Loading categories...
                            </p>
                        </div>

                    ) : categories.length === 0 ? (

                        <div className="
                            border border-dashed
                            border-gray-200
                            rounded-2xl
                            py-16
                            text-center
                        ">
                            <p className="font-sans text-sm text-gray-500">
                                No categories available.
                            </p>
                        </div>

                    ) : (

                        <div className="border border-gray-200 rounded-2xl overflow-hidden">

                            {categories.map((category) => (

                                <div
                                    key={category._id}
                                    className="
                                        px-6 py-5
                                        border-b border-gray-100
                                        last:border-b-0
                                    "
                                >

                                    {editingId === category._id ? (

                                        /* Edit Mode */
                                        <div className="flex flex-col md:flex-row gap-3">

                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) =>
                                                    setEditName(e.target.value)
                                                }
                                                className="
                                                    flex-1
                                                    px-4 py-2.5
                                                    rounded-lg
                                                    border border-gray-200
                                                    text-sm
                                                    outline-none
                                                    focus:border-[#0b1b34]
                                                "
                                            />

                                            <input
                                                type="text"
                                                value={editDescription}
                                                onChange={(e) =>
                                                    setEditDescription(e.target.value)
                                                }
                                                placeholder="Description"
                                                className="
                                                    flex-1
                                                    px-4 py-2.5
                                                    rounded-lg
                                                    border border-gray-200
                                                    text-sm
                                                    outline-none
                                                    focus:border-[#0b1b34]
                                                "
                                            />

                                            <button
                                                onClick={() =>
                                                    handleUpdate(category._id)
                                                }
                                                className="
                                                    px-4 py-2.5
                                                    rounded-lg
                                                    bg-black
                                                    text-white
                                                    text-sm
                                                "
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={handleCancelEdit}
                                                className="
                                                    px-4 py-2.5
                                                    rounded-lg
                                                    border border-gray-200
                                                    text-gray-600
                                                    text-sm
                                                "
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    ) : (

                                        /* Normal Mode */
                                        <div className="flex items-center justify-between gap-6">

                                            <div className="min-w-0">

                                                <h3 className="
                                                    font-sans
                                                    text-sm
                                                    font-semibold
                                                    text-[#0b1b34]
                                                ">
                                                    {category.name}
                                                </h3>

                                                {category.description && (
                                                    <p className="
                                                        font-sans
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">
                                                        {category.description}
                                                    </p>
                                                )}

                                            </div>


                                            <div className="flex items-center gap-2 shrink-0">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                    className="
                                                        px-4 py-2
                                                        rounded-lg
                                                        border border-gray-200
                                                        text-sm
                                                        text-gray-600
                                                        hover:border-gray-400
                                                        hover:text-black
                                                        transition
                                                    "
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(category._id)
                                                    }
                                                    className="
                                                        px-4 py-2
                                                        rounded-lg
                                                        border border-red-100
                                                        text-sm
                                                        text-red-500
                                                        hover:bg-red-50
                                                        transition
                                                    "
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