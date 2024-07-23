import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuthentication } from "../../types/userAuthentication";
import { schema } from "./validation";

import useSignIn from "../../hooks/useSingIn";
import styles from "./SingIn.module.css";


export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthentication>({ resolver: zodResolver(schema) });

  const { mutate, error } = useSignIn();
  const onSubmit = async (form: FieldValues) => {
    mutate({ email: form.email, password: form.password });

    if (localStorage.getItem("userType") === "Admin") {
      // navigate("/adminPanel");
      return;
    }
    // navigate("/userPanel");
  };


  return (
    <div className={styles.signInContainer}>
      <div className={styles.goBackButton}>
        <button className={styles.buttonConfirm}>Sing Up</button>
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
            Sign in
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
