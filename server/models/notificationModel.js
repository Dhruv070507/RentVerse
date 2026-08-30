import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        receiver : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        type : {
            type : String,
            enum : [
                "rental_request",
                "rental_approved",
                "rental_rejected",
                "rental_cancelled",
                "payment_completed",
                "payment_failed",
                "rental_completed",
                "delivery_otp",
                "return_otp",
            ],
            required : true
        },
        message : {
            type : String,
            required : true,
            trim : true
        },
        rental : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Rental",
            default : null
        },
        payment : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: null
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Notification", notificationSchema)