import React from "react";
import { Input } from "../../styles";
import { Main, Label, ErrorMessage } from "./styles";

interface Props {
  label: string;
  name?: string;
  error?: string;
  customInput?: any;
}

const FormField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, customInput }, ref) => {
    return (
      <Main>
        <Label>{label}</Label>
        {customInput || <Input ref={ref} error={!!error} name={name} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Main>
    );
  }
);

export default FormField;
