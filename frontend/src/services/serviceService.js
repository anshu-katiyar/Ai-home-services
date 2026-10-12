
import api from "./api";

export const getServices = async () => {
    const response = await api.get("/services/");
    return response.data;
};

export const getServiceById = async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
};

export const createService = async (data) => {
    const response = await api.post("/services/", data);
    return response.data;
};

export const updateService = async (id, data) => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
};

export const updateServiceAvailability = async (id, is_available) => {
    const response = await api.patch(
        `/services/${id}/availability`,
        { is_available }
    );
    return response.data;
};
