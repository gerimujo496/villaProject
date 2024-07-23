import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuthentication } from "../../types/userAuthentication";
import { schema } from "./validation";
import {  Navigate, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, isUserAuthenticated } from "../../utils/auth";

import useSignIn from "../../hooks/useSingIn";
import styles from "./SingIn.module.css";


export const SignIn = () => {
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthentication>({ resolver: zodResolver(schema) });

  const { mutate, error } = useSignIn();
  const onSubmit = async (form: FieldValues) => {
    mutate({ email: form.email, password: form.password });
  };


  if(isAdminAuthenticated()){
    return <Navigate to="/admin"/>
  }

if(isUserAuthenticated()){
return <Navigate to="/"/>
}

  return (
    <div className={styles.signInContainer}>
      <div className={styles.goBackButton}>
        <button
          className={styles.buttonConfirm}
          onClick={() => navigate("/signup")}
        >
          Sing Up
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h2 className={styles.title}>Welcome Back</h2>
        <div className={styles.inputForms}>
          <div className={styles.inputGroup}>
            <input
              {...register("email")}
              placeholder="Email"
              className={styles.inputForm}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className={styles.inputForm}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className={styles.signInButton}>
          <button type="submit" className={styles.buttonConfirm}>
            Sing in
          </button>
          {error && (
            <p className={styles.errorMessage}>
              {"Credentials are not correct"}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
