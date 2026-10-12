import api from "./api";

export const getAllBookings = async () => {
    const response = await api.get("/admin/bookings");
    return response.data;
};

export const getProviders = async () => {
    const response = await api.get("/admin/providers");

    console.log("PROVIDERS API RESPONSE:", response.data);

    return response.data;
};

export const assignProvider = async (bookingId, providerId) => {
    const response = await api.put(
        `/admin/assign-provider/${bookingId}`,
        {
            provider_id: providerId
        }
    );

    return response.data;
};