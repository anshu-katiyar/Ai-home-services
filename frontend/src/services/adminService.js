import api from "./api";

const API = "http://127.0.0.1:8000";

export const getAllBookings = async () => {
    const response = await api.get(`${API}/admin/bookings`);
    return response.data;
};

export const getProviders = async () => {

    const response = await api.get(
        `${API}/admin/providers`
    );

    return response.data;

};

export const assignProvider = async (
    bookingId,
    providerId
) => {

    const response = await api.put(

        `${API}/admin/assign-provider/${bookingId}`,

        {
            provider_id: providerId
        }

    );

    return response.data;

};