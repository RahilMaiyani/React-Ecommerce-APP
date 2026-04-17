import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartApi } from "../api/cartApi";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["cart", variables.userId]);
    },
  });
};