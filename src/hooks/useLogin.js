import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};