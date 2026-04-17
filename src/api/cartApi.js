import api from "./axios";


export const getUserCartApi = async (userId) => {
  const res = await api.get(`/carts/user/${userId}`);
  return res.data;
};



export const addToCartApi = async (data) => {
  const res = await api.post("/carts", data);
  console.log("Item added to cart : ", data)
  return res.data;
};