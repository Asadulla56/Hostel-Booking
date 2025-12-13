import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests } = req.body;
    const userId = req.auth.userId;

    if (!roomId || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const totalPrice = numberOfNights * room.price;

    const newBooking = new Booking({
      room: roomId,
      user: userId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const bookings = await Booking.find({ user: userId }).populate({
      path: 'room',
      populate: {
        path: 'owner',
        select: 'username image'
      }
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
