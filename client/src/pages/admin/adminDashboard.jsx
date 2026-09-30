import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAdminDashboard
} from "../../features/adminSlice";


const AdminDashboard = () => {

    const dispatch = useDispatch();

    const {
        dashboard,
        loading,
        error
    } = useSelector(
        (state) => state.admin
    );


    useEffect(() => {

        dispatch(getAdminDashboard());

    }, [dispatch]);


    if (loading) {
        return (
            <div className="p-6">
                <p>Loading dashboard...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }


    if (!dashboard) {
        return null;
    }


    return (
        <div className="p-6">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Overview of RentVerse
                </p>

            </div>


            {/* Main Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                {/* Users */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Users
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.users.total}
                    </h2>

                </div>


                {/* Equipment */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Equipment
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.equipment.total}
                    </h2>

                </div>


                {/* Rentals */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Rentals
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.rentals.total}
                    </h2>

                </div>


                {/* Deliveries */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Deliveries
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.deliveries.total}
                    </h2>

                </div>

            </div>


            {/* Rental Overview */}

            <div className="mt-8">

                <h2 className="text-xl font-semibold mb-4">
                    Rental Overview
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Pending
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.rentals.pending}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Approved
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.rentals.approved}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Completed
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.rentals.completed}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Rejected
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.rentals.rejected}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Cancelled
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.rentals.cancelled}
                        </p>

                    </div>

                </div>

            </div>


            {/* Delivery Overview */}

            <div className="mt-8">

                <h2 className="text-xl font-semibold mb-4">
                    Delivery Overview
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Pending
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.deliveries.pending}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Out for Delivery
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.deliveries.outForDelivery}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Delivered
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.deliveries.delivered}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow p-5">

                        <p className="text-gray-500">
                            Returned
                        </p>

                        <p className="text-2xl font-bold mt-2">
                            {dashboard.deliveries.returned}
                        </p>

                    </div>

                </div>

            </div>


            {/* Equipment / Agent Overview */}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">


                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold">
                        Equipment
                    </h2>

                    <div className="flex justify-between mt-6">

                        <div>

                            <p className="text-gray-500">
                                Total
                            </p>

                            <p className="text-2xl font-bold">
                                {dashboard.equipment.total}
                            </p>

                        </div>


                        <div>

                            <p className="text-gray-500">
                                Available
                            </p>

                            <p className="text-2xl font-bold">
                                {dashboard.equipment.available}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold">
                        Delivery Agents
                    </h2>

                    <p className="text-3xl font-bold mt-6">
                        {dashboard.users.deliveryAgents}
                    </p>

                    <p className="text-gray-500 mt-1">
                        Registered delivery agents
                    </p>

                </div>

            </div>

        </div>
    );
};


export default AdminDashboard;