import React from "react";
import { Input, TextArea } from "../../styles";
import { Main, Label, ErrorMessage } from "./styles";

interface Props {
  label: string;
  type?: string;
  name?: string;
  error?: string;
  multiline?: boolean;
  customInput?: any;
}

const FormField = React.forwardRef<any, Props>(
  ({ label, type, name, error, customInput, multiline }, ref) => {
    return (
      <Main>
        <Label>{label}</Label>
        {customInput ? (
          customInput
        ) : multiline ? (
          <TextArea ref={ref} name={name} />
        ) : (
          <Input ref={ref} type={type} error={!!error} name={name} />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Main>
    );
  }
);

export default FormField;
