import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const getDashboardData = async (req, res) => {
    try {
        const ownerId = req.auth.userId;

        const rooms = await Room.find({ owner: ownerId });
        const roomIds = rooms.map(room => room._id);

        const bookings = await Booking.find({ room: { $in: roomIds } }).populate('user', 'username');

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        const recentBookings = bookings.slice(0, 5);

        res.status(200).json({
            totalBookings,
            totalRevenue,
            recentBookings
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
