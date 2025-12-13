import express from "express";
import multer from "multer";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByOwner,
} from "../controllers/roomController.js";
import { clerkMiddleware } from "@clerk/express";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", clerkMiddleware(), upload.array("images"), createRoom);
router.get("/", getAllRooms);
router.get("/owner", clerkMiddleware(), getRoomsByOwner);
router.get("/:id", getRoomById);
router.put("/:id", clerkMiddleware(), upload.array("images"), updateRoom);
router.delete("/:id", clerkMiddleware(), deleteRoom);

export default router;
