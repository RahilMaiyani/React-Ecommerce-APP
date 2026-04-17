import { useQuery } from "@tanstack/react-query";
import { getProductApi } from "../api/productApi";

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductApi(id),
    enabled: !!id,
  });
};