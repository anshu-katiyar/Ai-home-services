import api from "./api";

export const createOrder = async (amount) => {

    const response = await api.post(
        "/payment/create-order",
        {
            amount
        }
    );

    return response.data;
};