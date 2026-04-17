import api from "./axios";


export const getProductsApi = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductApi = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProductApi = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};


export const updateProductApi = async ({ id, data }) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProductApi = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};