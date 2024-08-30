import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import cors from "cors"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

// =======================================================================
// AUTHENTICATION FLOW ROUTES
// =======================================================================

app.use("/api/auth", authRoutes);

// =======================================================================
// EVENT MANAGEMENT FLOW ROUTES
// =======================================================================

app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}!`));
