import { Link } from "react-router-dom";

const EquipmentCard = ({ equipment }) => {
    return (
        <article className="group flex flex-col bg-[#ECECEC] overflow-hidden">

            {/* Equipment Image */}
            <div className="relative h-64 w-full overflow-hidden bg-[#E5E3E0]">
                {equipment.images?.[0] ? (
                    <img
                        src={equipment.images[0]}
                        alt={equipment.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/30">
                        <span className="text-xs">No image available</span>
                    </div>
                )}
            </div>

            {/* Equipment Details */}
            <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                    <h2 className="font-serif text-xl text-black truncate">
                        {equipment.name}
                    </h2>

                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="font-sans text-4xl font-semibold tracking-[-0.04em]">
                            ₹{equipment.rentalPrice}
                        </span>
                        <span className="text-xs text-black/45">
                            / day
                        </span>
                    </div>
                </div>

                <Link
                    to={`/equipment/${equipment._id}`}
                    className="shrink-0 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 text-xs font-medium hover:bg-black/80 transition-colors"
                >
                    Details
                </Link>
            </div>
        </article>
    );
};

export default EquipmentCard;