import { useQuery } from "@tanstack/react-query";
import { getUserCartApi } from "../api/cartApi";

export const useCart = (userId) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getUserCartApi(userId),
    enabled: !!userId,
  });
};