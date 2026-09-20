import {Link} from "react-router-dom";

const EquipmentCard = ({ equipment }) => {

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

            {/* Equipment image */}
            <div className="h-56 bg-gray-100">

                {equipment.images?.[0] && (
                    <img
                        src={equipment.images[0]}
                        alt={equipment.name}
                        className="w-full h-full object-cover"
                    />
                )}

            </div>


            {/* Equipment information */}
            <div className="p-5">

                <h2 className="font-display text-xl text-[#0b1b34]">
                    {equipment.name}
                </h2>

                <p className="font-sans text-sm text-gray-500 mt-2 line-clamp-2">
                    {equipment.description}
                </p>


                <div className="flex items-center justify-between mt-5">

                    <p className="font-sans text-sm text-[#0b1b34]">
                        ₹{equipment.rentalPrice} / day
                    </p>

                    <Link
                        to={`/equipment/${equipment._id}`}
                        className="font-sans text-sm px-4 py-2 rounded-full bg-[#0b1b34] text-white hover:bg-[#142944] transition"
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </div>
    );
};


export default EquipmentCard;