import api from "./api";

export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

export const signupUser = (data) => {
    return api.post("/auth/signup", data);
};