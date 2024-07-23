import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuthentication } from "../../types/userAuthentication";
import { schema } from "./validation";

import useSignUp from "../../hooks/useSingUp";
import styles from "./Singup.module.css";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserAuthentication>({ resolver: zodResolver(schema) });
  const { mutate, error } = useSignUp();


  const onSubmit = async (form: FieldValues) => {
    mutate({ email: form.email, password: form.password });

    if (localStorage.getItem("userType") === "Admin") {
      // navigate("/adminPanel");
      return;
    }
    // navigate("/userPanel");
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.goBackButton}>
        <button className={styles.buttonConfirm}>Go back</button>
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
          {error && (
            <p className={styles.errorMessage}>{"We can not create the user"}</p>
          )}
        </div>
      </form>
    </div>
  );
};
