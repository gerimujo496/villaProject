import { useMutation } from "@tanstack/react-query";
import { UserAuthentication } from "../types/userAuthentication";
import { SuccesfulSingUp } from "../types/succesfulSingUp";
import { singUp } from "../services/auth";

const useSignUp = () => {
  return useMutation<SuccesfulSingUp, Error, UserAuthentication>({
    mutationFn: singUp,
    onSuccess: (newUser, variables) => {
      localStorage.setItem("token", newUser.idToken);
      if (variables.email.includes("admin")) {
        localStorage.setItem("userType", "Admin");
      } else {
        localStorage.setItem("userType", "User");
      }
      return newUser;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useSignUp;
