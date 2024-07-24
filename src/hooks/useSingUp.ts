import { useMutation } from "@tanstack/react-query";
import { UserAuthentication } from "../types/userAuthentication";
import { SuccesfulSingUp } from "../types/succesfulSingUp";
import { singUp } from "../services/auth";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation<SuccesfulSingUp, Error, UserAuthentication>({
    mutationFn: singUp,
    onSuccess: (newUser, variables) => {
      localStorage.setItem("token", newUser.idToken);
      if (variables.email.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      return newUser;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useSignUp;
