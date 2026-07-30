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

export const rejectBooking = async (bookingId) => {

    const response = await axios.put(
        `${API}/provider/reject/${bookingId}`
    );

    return response.data;

};


export const onTheWayBooking = async (bookingId) => {

    const response = await axios.put(
        `${API}/provider/on-the-way/${bookingId}`
    );

    return response.data;

};


export const completeBooking = async (bookingId) => {

    const response = await axios.put(
        `${API}/provider/complete/${bookingId}`
    );

    return response.data;

};