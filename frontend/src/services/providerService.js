import api from "./api";

// const API = "http://127.0.0.1:8000";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getProviderBookings = async () => {

    const response = await api.get(`${API}/provider/bookings`,
        authHeader()
    );

    return response.data;

};

export const acceptBooking = async (bookingId) => {

    const response = await api.put(`${API}/provider/accept/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;

};

export const rejectBooking = async (bookingId) => {

    const response = await api.put(`${API}/provider/reject/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;

};

export const onTheWayBooking = async (bookingId) => {

    const response = await api.put(`${API}/provider/on-the-way/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;

};

export const completeBooking = async (bookingId) => {

    const response = await api.put(`${API}/provider/complete/${bookingId}`,
        {},
        authHeader()
    );

    return response.data;

};