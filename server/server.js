import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import equipmentRouter from "./routes/equipmentRoutes.js";
import rentalRouter from "./routes/rentalRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/equipments", equipmentRouter);
app.use("/api/v1/rental", rentalRouter);
app.use("/api/v1/payment", paymentRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();