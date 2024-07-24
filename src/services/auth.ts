import axios from "axios";
import { UserAuthentication } from "../types/userAuthentication";
import { SuccesfulSingUp } from "../types/succesfulSingUp";
import { SuccesfulSingIn } from "../types/succesfulSingIn";

export const singUp = async (form: UserAuthentication) => {
  try {
    const response = await axios.post<SuccesfulSingUp>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ",
      form
    );
    return response.data;
  } catch (Error) {
    throw (Error as Error).message;
  }
};


export const singIn = async (form: UserAuthentication) => {
    try {
      const response = await axios.post<SuccesfulSingIn>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ",
        form
      );
      return response.data;
    } catch (Error) {
      throw (Error as Error).message;
    }
  };
  