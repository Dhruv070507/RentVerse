import ApiError from "../utils/ApiError.js";
import Delivery from "../models/deliveryModel.js"
import Rental from "../models/rentalModel.js"
import User from "../models/userModel.js"
import generateOtp from "../utils/generateOtp.js";


const createDeliveryService = async (rentalId) => {

    const rental = await Rental.findById(rentalId);

    if (!rental)
        throw new ApiError(
            404,
            "Rental doesn't exist"
        );

    // Prevent multiple deliveries for the same rental
    const existingDelivery = await Delivery.findOne({
        rental: rentalId
    });

    if (existingDelivery)
        throw new ApiError(
            400,
            "Delivery already exists for this rental"
        );

    const returnStartDate = new Date(rental.rentalEndDate);

    const returnDeadline = new Date(rental.rentalEndDate);

    /* the return of the equipment should be done within 5 days after the 
    end date of the rental
    */
    returnDeadline.setDate(
        returnDeadline.getDate() + 5
    );

    const delivery = await Delivery.create({
        rental: rentalId,
        deliveryAddress: rental.address,
        returnStartDate,
        returnDeadline
    });

    return delivery;
};


const getDeliveryByIdService = async(deliveryId, userId) =>{

    const delivery = await Delivery.findById(deliveryId)
                    .populate(
                        "rental",
                        "renter owner equipment rentalStartDate rentalEndDate status"
                        )
                    .populate(
                        "deliveryAgent",
                        "username profileImage"
                    );

    if(!delivery)
        throw new ApiError(404, "Delivery doesn't exist");

    isRenter = delivery.rental.renter.equals(userId);
    isOwner = delivery.rental.owner.equals(userId);

    isDeliveryAgent = delivery.deliveryAgent && delivery.deliveryAgent.equals(userId);

    if(!isRenter && !isOwner && !isDeliveryAgent)
        throw new ApiError(403, "You are not authorized to view this delivery");

    return delivery;
}


const getMyDeliveriesService = async(userId) => {

    // get rentals where user is either renter or owner 
    const rentals = await Rental.find({
        $or: [
            {renter: userId},
            {owner: userId}
        ]
    }).select("_id");


    const rentalIds = rentals.map(
        rental => rental._id
    )


    // getting all deliveries related to those rentals
    // or assigned directly to the user as a deliverAgent
    const deliveries = await Delivery.find({
        $or: [
            {renter: {$in: rentalIds}},
            {deliveryAgent: userId}
        ]
    }).populate({
    path: "rental",
    select: "renter owner equipment rentalStartDate rentalEndDate status",
    populate: {
        path: "equipment",
        select: "name images pricePerDay"
    }
    })
    .populate(
        "deliveryAgent",
        "username profileImage"
    )
    .sort({ createdAt: -1 });

    return deliveries;
} 


const assignDeliveryAgentService = async(deliveryId, agentId) => {

    const delivery = await Delivery.findById(deliveryId);


    if(!delivery)
        throw new ApiError(404, "Delivery doesn't exist");

    if(delivery.deliveryStatus !== "pending")
        throw new ApiError(400, "Delivery cannot be assigned in current state");

    if(delivery.deliveryAgent)
        throw new ApiError(400, "Delivery agent is already assigned");

    

    const deliveryAgent = await User.findById(agentId);


    if(!deliveryAgent)
        throw new ApiError(404, "DeliveryAgent doesn't exist");


    if(deliveryAgent.role !== "delivery_agent")
        throw new ApiError(400, "User is not a deliveryAgent");


    delivery.deliveryAgent = agentId;
    await delivery.save();

    const updatedDelivery = await Delivery.findById(
        delivery._id
    ).populate(
        "deliveryAgent",
        "username profileImage"
    );

    return updatedDelivery;
}


const startDeliveryService = async(deliveryId, deliveryAgentId) => {

    const delivery = await Delivery.findById(deliveryAgentId);

    if(!delivery)
        throw new ApiError(404, "DeliveryAgent doesn't exist");


    if(!delivery.deliveryAgent)
        throw new ApiError(400, "DeliveryAgent is not assigned")


    if(!delivery.deliveryAgent.equals(deliveryAgentId))
        throw new ApiError(403, "You are not assigned to this delivery");


    if(delivery.deliveryStatus !== "pending")
        throw new ApiError(400, "Delivery cannot be started in this state");

    delivery.deliveryStatus = "out_for_delivery";
    delivery.deliveryDate = new Date();

    await delivery.save();
    return delivery;
}


const generateDeliveryOtpService = async (deliveryId, userId) => {

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery)
        throw new ApiError(
            404,
            "Delivery doesn't exist"
        );

    if (!delivery.deliveryAgent)
        throw new ApiError(
            400,
            "No delivery agent has been assigned"
        );

    if (!delivery.deliveryAgent.equals(userId))
        throw new ApiError(
            403,
            "You are not assigned to this delivery"
        );

    if (delivery.deliveryStatus !== "out_for_delivery")
        throw new ApiError(
            400,
            "Delivery OTP cannot be generated in this state"
        );

    const otp = generateOtp();

    delivery.deliveryOtp = otp;

    await delivery.save();

    // Notify the renter about the delivery OTP
    await createNotificationService({
        receiver: delivery.rental.renter,
        type: "delivery_otp",
        message: `Your delivery OTP is ${otp}. Share it with the delivery agent.`,
        rental: delivery.rental._id
    });

    return otp;
};


const completeDeliveryService = async(deliveryId, userId, otp) => {
    
    const delivery = await Delivery.findById(deliveryId);

    if(!delivery)
        throw new ApiError(404, "Delivery doesn't exist");

    if(!delivery.deliveryAgent)
        throw new ApiError(400, "No deliveryAgent has been assigned");

    if(!delivery.deliveryAgent.equals(userId))
        throw new ApiError(403, "You are not assigned to this delivery");


    // delivery must be in the out_for_delivery to be verified
    if(delivery.deliveryStatus !== "out_for_delivery")
        throw new ApiError(400, "Delivery cannot be verified in this state");

    if(!otp)
        throw new ApiError(400, "otp is required");

    if(delivery.deliveryOtp !== otp)
        throw new ApiError(400, "Invalid delivery otp");


    delivery.deliveryStatus = "delivered";
    delivery.deliveredAt = new Date();

    delivery.deliveryOtp = "";
    await delivery.save();

    const verifiedDelivery = await Delivery.findById(deliveryId)
                            .select("-deliveryOtp -returnOtp")

    return verifiedDelivery;
}


const startReturnService = async (deliveryId, userId) => {

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery)
        throw new ApiError(
            404,
            "Delivery doesn't exist"
        );

    if (!delivery.deliveryAgent)
        throw new ApiError(
            400,
            "No delivery agent has been assigned"
        );

    if (!delivery.deliveryAgent.equals(userId))
        throw new ApiError(
            403,
            "You are not assigned to this delivery"
        );

    if (delivery.deliveryStatus !== "delivered")
        throw new ApiError(
            400,
            "Return cannot be started in this state"
        );

    if (new Date() < delivery.returnStartDate)
        throw new ApiError(
            400,
            "Return window has not started yet"
        );

    if (new Date() > delivery.returnDeadline)
        throw new ApiError(
            400,
            "Return deadline has passed"
        );

    delivery.deliveryStatus = "out_for_return";

    await delivery.save();

    const startedReturn = await Delivery.findById(deliveryId)
        .select("-deliveryOtp -returnOtp");

    return startedReturn;
};


const generateReturnOtpService = async (deliveryId, userId) => {

    const delivery = await Delivery.findById(deliveryId)
        .populate("rental", "renter");

    if (!delivery)
        throw new ApiError(
            404,
            "Delivery doesn't exist"
        );

    if (!delivery.deliveryAgent)
        throw new ApiError(
            400,
            "No delivery agent has been assigned"
        );

    if (!delivery.deliveryAgent.equals(userId))
        throw new ApiError(
            403,
            "You are not assigned to this delivery"
        );

    if (delivery.deliveryStatus !== "out_for_return")
        throw new ApiError(
            400,
            "Return OTP cannot be generated in this state"
        );

    const otp = generateOtp();

    delivery.returnOtp = otp;

    await delivery.save();

    // Notify the renter about the return OTP
    await createNotificationService({
        receiver: delivery.rental.renter,
        type: "return_otp",
        message: `Your return OTP is ${otp}. Share it with the delivery agent.`,
        rental: delivery.rental._id
    });

    return otp;
};


const completeReturnService = async (deliveryId, userId, otp) => {

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery)
        throw new ApiError(
            404,
            "Delivery doesn't exist"
        );

    if (!delivery.deliveryAgent)
        throw new ApiError(
            400,
            "No delivery agent has been assigned"
        );

    if (!delivery.deliveryAgent.equals(userId))
        throw new ApiError(
            403,
            "You are not assigned to this delivery"
        );

    if (delivery.deliveryStatus !== "out_for_return")
        throw new ApiError(
            400,
            "Return cannot be completed in this state"
        );

    if (!otp)
        throw new ApiError(
            400,
            "Return OTP is required"
        );

    if (delivery.returnOtp !== otp)
        throw new ApiError(
            400,
            "Invalid return OTP"
        );

    delivery.deliveryStatus = "returned";
    delivery.returnedAt = new Date();

    delivery.returnOtp = "";

    await delivery.save();

    const completedReturn = await Delivery.findById(
        deliveryId
    ).select("-deliveryOtp -returnOtp");

    return completedReturn;
};


export {
    createDeliveryService,
    getDeliveryByIdService,
    getMyDeliveriesService,
    assignDeliveryAgentService,
    startDeliveryService,
    generateDeliveryOtpService,
    completeDeliveryService,
    startReturnService,
    generateReturnOtpService,
    completeReturnService,
}