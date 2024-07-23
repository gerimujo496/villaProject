import { useMutation } from "@tanstack/react-query";
import { UserAuthentication } from "../types/userAuthentication";

import { singIn } from "../services/auth";
import { SuccesfulSingIn } from "../types/succesfulSingIn";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation<SuccesfulSingIn, Error, UserAuthentication>({
    mutationFn: singIn,
    onSuccess: (newUser, variables) => {
      localStorage.setItem("token", newUser.idToken);
     
      if (variables.email.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      return newUser;
    },
  });
};

export default useSignIn;
