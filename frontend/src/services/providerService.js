import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getProviderBookings = async () => {
    const response = await axios.get(`${API}/provider/bookings`);
    return response.data;
};

export const acceptBooking = async (bookingId) => {
    const response = await axios.put(
        `${API}/provider/accept/${bookingId}`
    );

    return response.data;
};