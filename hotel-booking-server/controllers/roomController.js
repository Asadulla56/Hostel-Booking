import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const createRoom = async (req, res) => {
  try {
    const { name, description, price, capacity, amenities } = req.body;
    const owner = req.auth.userId;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image." });
    }

    const imageUrls = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file);
      imageUrls.push(result.secure_url);
    }

    const newRoom = new Room({
      name,
      description,
      price,
      capacity,
      amenities: amenities.split(','),
      images: imageUrls,
      owner,
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("owner", "username");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("owner", "username");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { name, description, price, capacity, amenities } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.owner.toString() !== req.auth.userId) {
        return res.status(403).json({ message: "You are not authorized to update this room." });
    }

    room.name = name || room.name;
    room.description = description || room.description;
    room.price = price || room.price;
    room.capacity = capacity || room.capacity;
    room.amenities = amenities ? amenities.split(',') : room.amenities;

    if (req.files && req.files.length > 0) {
        const imageUrls = [];
        for (const file of req.files) {
          const result = await uploadToCloudinary(file);
          imageUrls.push(result.secure_url);
        }
        room.images = imageUrls;
    }

    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRoomsByOwner = async (req, res) => {
  try {
    const ownerId = req.auth.userId;
    const rooms = await Room.find({ owner: ownerId }).populate("owner", "username");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.owner.toString() !== req.auth.userId) {
        return res.status(403).json({ message: "You are not authorized to delete this room." });
    }

    await room.deleteOne();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
