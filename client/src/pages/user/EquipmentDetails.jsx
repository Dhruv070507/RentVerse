import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";


const EquipmentDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();


  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get(`/equipments/${id}`);

        setEquipment(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load equipment.");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading equipment...</p>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          {error || "Equipment not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to equipment
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Image */}
          <div className="w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden">
            {equipment.images?.length > 0 && (
              <img
                src={equipment.images[0]}
                alt={equipment.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Information */}
          <div>

            <p className="text-sm uppercase tracking-[0.1em] text-gray-400 mb-4">
              {equipment.category?.name || "Equipment"}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-5">
              {equipment.name}
            </h1>

            <p className="text-sm text-gray-500 mb-6">
              📍 {equipment.location}
            </p>

            <p className="text-gray-500 leading-relaxed max-w-xl mb-8">
              {equipment.description}
            </p>

            {/* Price */}
            <div className="border-t border-b border-gray-100 py-6 mb-8">
              <p className="text-sm text-gray-400 mb-1">
                Rental price
              </p>

              <p className="text-3xl font-semibold text-gray-900">
                ₹{equipment.rentalPrice}
                <span className="text-base font-normal text-gray-400">
                  {" "}
                  / day
                </span>
              </p>
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Availability
                </p>

                <p className="font-medium text-gray-900">
                  {equipment.availability
                    ? `${equipment.quantity} available`
                    : "Currently unavailable"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Owner
                </p>

                <p className="font-medium text-gray-900">
                  {equipment.owner?.username || "Unknown"}
                </p>
              </div>

            </div>

            {/* Rent */}
            <button
            onClick={() => navigate(`/equipment/${equipment._id}/rent`)}
            className="font-sans px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition"
        >
            Rent Now
        </button>

          </div>
        </div>

        {/* Details */}
        <section className="mt-20 border-t border-gray-100 pt-10">

          <h2 className="font-serif text-3xl text-gray-900 mb-8">
            Equipment Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                Category
              </p>

              <p className="font-medium">
                {equipment.category?.name || "—"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                Location
              </p>

              <p className="font-medium">
                {equipment.location || "—"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                Quantity
              </p>

              <p className="font-medium">
                {equipment.quantity}
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default EquipmentDetails;