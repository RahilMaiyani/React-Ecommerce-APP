import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });
};