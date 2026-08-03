import api from "./api";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getProviderBookings = async () => {

    const response = await api.get(
        "/provider/bookings",
        authHeader()
    );

    return response.data;
};

export const acceptBooking = async (bookingId) => {

    const response = await api.put(
        `/provider/accept/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;
};

export const rejectBooking = async (bookingId) => {

    const response = await api.put(
        `/provider/reject/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;
};

export const onTheWayBooking = async (bookingId) => {

    const response = await api.put(
        `/provider/on-the-way/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;
};

export const completeBooking = async (bookingId) => {

    const response = await api.put(
        `/provider/complete/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;
};