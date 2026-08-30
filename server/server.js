import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import equipmentRouter from "./routes/equipmentRoutes.js";
import rentalRouter from "./routes/rentalRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import deliveryRouter from "./routes/deliveryRoutes.js";

import rentalCompletionJob from "./jobs/rentalCompletionJob.js";


dotenv.config();

const app = express();

// ==================== MIDDLEWARE CONFIGURATION ====================

// Allows requests from different origins
app.use(cors());

// Parses incoming JSON request bodies
app.use(express.json());



// Health check route
app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/equipments", equipmentRouter);
app.use("/api/v1/rental", rentalRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/deliveries", deliveryRouter);


// ==================== SERVER ====================

const PORT = process.env.PORT || 5000;


// Connect to database and start server
const startServer = async () => {

    try {
        await connectDB();
        rentalCompletionJob();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Failed to start server:", error);

        process.exit(1);
    }
};


startServer();