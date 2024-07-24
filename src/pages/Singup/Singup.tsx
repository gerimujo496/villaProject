import { FieldValues, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuthentication } from "../../types/userAuthentication";
import { schema } from "./validation";
import { Navigate, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, isUserAuthenticated } from "../../utils/auth";
import useSignUp from "../../hooks/useSingUp";
import { Button, Input, Form, Typography, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./Singup.module.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, error } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthentication>({ resolver: zodResolver(schema) });

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
      <Button
        type="link"
        className={styles.goBackButton}
        onClick={() => navigate("/")}
      >
        Sign In
      </Button>

      <Form
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.formContainer}
      >
        <Typography.Title level={2} className={styles.title}>
          Create an Account
        </Typography.Title>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            )}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className={styles.buttonConfirm}>
            Confirm
          </Button>
          {error && (
            <Alert
              message="An error occurred"
              type="error"
              className={styles.errorMessage}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
