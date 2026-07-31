import api from "./api";

export const createBooking = (data) => {
    return api.post("/bookings", data);
};

export const getBookings = () => {
    return api.get("/bookings");
};

export const cancelBooking = (id) => {
    return api.put(`/bookings/cancel/${id}`);
};