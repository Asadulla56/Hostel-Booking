import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


connectDB()
const app = express();
app.use(cors());

// middleware 
app.use(express.json());


// Api to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks);

// Room routes
app.use("/api/rooms", roomRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => res.send("API is working"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
