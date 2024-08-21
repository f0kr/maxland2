import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, googleLogin as googleLoginApi } from "./apiAuth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (res) => {
      console.log(res);
      if (res.status === "failed") {
        toast.error("Incorrect email or password , please try again");
      } else if (res.status === "success") {
        toast.success("login successfully!");
        queryClient.setQueryData(["user"], res.data.user);
        navigate("/", { replace: true });
      }
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  const { mutate: googleLogin, isLoading: isGoogleLoginLoading } = useMutation({
    mutationFn: ({ id_token }) => googleLoginApi({ id_token }),
    onSuccess: (res) => {
      toast.success("Google login successfully!");
      queryClient.setQueryData(["user"], res.data.user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(
        "There was a problem logging in, try again or make a new account"
      );
    },
  });

  const isLoading = isLoginLoading || isGoogleLoginLoading;
  return { login, googleLogin, isLoading };
}
