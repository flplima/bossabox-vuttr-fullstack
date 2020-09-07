import React from "react";
import FormField from "../FormField";
import { Button } from "../../styles";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions";

interface FormLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const form = useForm<FormLogin>();

  const onSubmitForm = async (data: FormLogin) => {
    const res = await api.post("auth/login", data);
    dispatch(login(res.data.user));
  };

  return (
    <div>
      <h1>VUTTR</h1>
      <h3>Very Useful Tools to Remember</h3>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <FormField
          label="E-mail"
          name="email"
          ref={form.register({ required: true })}
          error={form.errors.email && "Type your e-mail here"}
        />
        <FormField
          label="Password"
          name="password"
          ref={form.register({ required: true })}
          error={form.errors.email && "Type your password here"}
        />
        <Button type="submit">LOGIN</Button>
      </form>
    </div>
  );
};

export default Login;
