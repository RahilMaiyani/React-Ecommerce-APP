import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};