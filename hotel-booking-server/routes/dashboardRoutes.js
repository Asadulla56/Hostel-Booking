import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { clerkMiddleware } from "@clerk/express";

const router = express.Router();

router.get("/", clerkMiddleware(), getDashboardData);

export default router;
