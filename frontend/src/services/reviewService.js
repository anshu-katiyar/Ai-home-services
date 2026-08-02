import api from "./api";

export const addReview = async (data) => {

    return await api.post(
        "/reviews",
        data
    );

};

export const getReviews = async (providerId)=>{

    const res = await api.get(
        `/reviews/${providerId}`
    );

    return res.data;

}