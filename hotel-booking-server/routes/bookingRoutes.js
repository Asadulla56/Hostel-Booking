import express from "express";
import { createBooking, getMyBookings } from "../controllers/bookingController.js";
import { clerkMiddleware } from "@clerk/express";

const router = express.Router();

router.post("/", clerkMiddleware(), createBooking);
router.get("/my-bookings", clerkMiddleware(), getMyBookings);

export default router;
