import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getAllBookings = async () => {
    const response = await axios.get(`${API}/admin/bookings`);
    return response.data;
};