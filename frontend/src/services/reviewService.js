import api from "./api";

export const addReview = async (data) => {

    return await api.post(
        "/reviews",
        data
    );

};