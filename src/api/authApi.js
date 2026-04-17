import api from "./axios";

export const loginApi = async (data) => {
    console.log("Logging with data : ", data)
    const res = await api.post("/auth/login", data);
    console.log("Retured response : ", res.data)
    return res.data;
};

export const registerApi = async (data) => {
    console.log("Registering with data : ", data)
    const res = await api.post("/users", data);
    console.log("Retured response : ", res.data)
    return res.data;
};