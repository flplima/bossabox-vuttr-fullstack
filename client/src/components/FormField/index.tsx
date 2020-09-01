import React from "react";
import { Input } from "../../styles";

interface Props {
  label: string;
  name: string;
  error?: string;
}

const FormField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, error }, ref) => {
    return (
      <div>
        <span>{label}</span>
        <Input ref={ref} name={name} />
        {error && <span>{error}</span>}
      </div>
    );
  }
);

export default FormField;
