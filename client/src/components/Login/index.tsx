import React, { useState } from "react";
import FormField from "../FormField";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions";
import ErrorBanner from "../ErrorBanner";
import { Main, ButtonSubmit, Title, Footer, Subtitle } from "./styles";
import Collapse from "../Collapse";

interface FormLogin {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const form = useForm<FormLogin>();

  const [errorMessage, setErrorMessage] = useState<string | null>();
  const clearErrorMessage = () => setErrorMessage(null);

  const [registering, setRegistering] = useState(false);
  const setFormRegister = () => setRegistering(true);
  const setFormLogin = () => setRegistering(false);

  const validatePasswordConfirm = (value: string) => {
    return value === form.watch("password");
  };

  const validateEmail = (value: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
  };

  const onSubmitForm = async (data: FormLogin) => {
    setErrorMessage(null);
    try {
      const url = registering ? "auth/register" : "auth/login";
      const res = await api.post(url, data);
      localStorage.setItem("token", res.data.token);
      dispatch(login());
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "There was a problem. Please try later"
      );
    }
  };

  return (
    <Main>
      <Title>VUTTR</Title>
      <Subtitle>Very Useful Tools to Remember</Subtitle>

      <Collapse show={!!errorMessage}>
        <ErrorBanner text={errorMessage || ""} onClose={clearErrorMessage} />
      </Collapse>

      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <Collapse show={registering}>
          <FormField
            label="Name"
            name="name"
            ref={form.register({ required: true })}
            error={form.errors.name && "Enter your name here"}
          />
        </Collapse>

        <FormField
          label="E-mail"
          name="email"
          ref={form.register({ required: true, validate: validateEmail })}
          error={form.errors.email && "Enter a valid e-mail address"}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          ref={form.register({
            required: "Enter your password here",
            minLength: registering
              ? { value: 4, message: "Must be at least 4 digits" }
              : undefined,
          })}
          error={form.errors.password?.message}
        />

        <Collapse show={registering}>
          <FormField
            label="Confirm password"
            name="passwordConfirm"
            type="password"
            ref={form.register({
              required: true,
              validate: validatePasswordConfirm,
            })}
            error={form.errors.passwordConfirm && "Passwords must match"}
          />
        </Collapse>

        <ButtonSubmit type="submit">
          {registering ? "Sign Up" : "Login"}
        </ButtonSubmit>
      </form>

      {registering ? (
        <Footer>
          Already have an account? <button onClick={setFormLogin}>Login</button>
        </Footer>
      ) : (
        <Footer>
          Don't have an account?{" "}
          <button onClick={setFormRegister}>Sign up</button>
        </Footer>
      )}
    </Main>
  );
};

export default Login;
