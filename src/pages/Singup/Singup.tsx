import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuthentication } from "../../types/userAuthentication";
import { schema } from "./validation";
import { Navigate, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, isUserAuthenticated } from "../../utils/auth";

import useSignUp from "../../hooks/useSingUp";
import styles from "./Singup.module.css";

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserAuthentication>({ resolver: zodResolver(schema) });
  const { mutate, error } = useSignUp();

  const onSubmit = async (form: FieldValues) => {
    mutate({ email: form.email, password: form.password });
  };

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" />;
  }

  if (isUserAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.goBackButton}>
        <button className={styles.buttonConfirm} onClick={() => navigate("/")}>
          Sign In
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h2 className={styles.title}>Create an Account</h2>
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
        <div className={styles.signUpButton}>
          <button type="submit" className={styles.buttonConfirm}>
            Confirm
          </button>
          {error && <p className={styles.errorMessage}>{"An error occured"}</p>}
        </div>
      </form>
    </div>
  );
};
