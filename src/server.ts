import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// =======================================================================
// AUTHENTICATION FLOW ROUTES
// =======================================================================

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}!`))