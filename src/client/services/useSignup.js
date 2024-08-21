import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signup as signupApi,
  googleSignup as googleSignupApi,
} from "./apiAuth.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signup, isLoading: isSignupLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (res) => {
      if (res.statusCode === 200) {
        toast.error(
          "User with this account already exists , use another account or try login in"
        );
      } else if (res.statusCode === 201) {
        toast.success("Account successfully created!");
        navigate("/");
      }
    },
    onError: () => {
      toast.error("Signup failed");
    },
  });

  const { mutate: googleSignup, isLoading: isGoogleSignupLoading } =
    useMutation({
      mutationFn: googleSignupApi,
      onSuccess: (res) => {
        if (res.statusCode === 201) {
          toast.success("Google signup successful. Please set your password.");
          navigate("/signup/set-password", {
            state: { googleId: res.data.user.googleId },
          });
        } else if (res.statusCode === 200) {
          toast.success("Google login successfully!");
          queryClient.setQueryData(["user"], res.data.user);
          navigate("/");
        }
      },
      onError: () => {
        toast.error("Google signup failed");
      },
    });

  const isLoading = isSignupLoading || isGoogleSignupLoading;

  return { signup, googleSignup, isLoading };
}
