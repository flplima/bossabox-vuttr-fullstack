import React from "react";
import { Main, CheckboxInput, Label } from "./styles";

interface Props {
  label: string;
  checked?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Checkbox: React.FC<Props> = ({ label, checked, onClick }) => {
  return (
    <Main onClick={onClick}>
      <Label>{label}</Label>
      <CheckboxInput type="checkbox" checked={checked} />
    </Main>
  );
};

export default Checkbox;
