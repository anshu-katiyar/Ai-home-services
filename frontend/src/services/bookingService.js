import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const createBooking = (data) => {

  const token = localStorage.getItem("token");

  return API.post(
    "/bookings",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


export const getBookings = () => {

  const token = localStorage.getItem("token");

  return API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const cancelBooking = (id) => {

    const token = localStorage.getItem("token");

    return API.put(
        `/bookings/cancel/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

};