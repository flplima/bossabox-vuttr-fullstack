import React from "react";
import { Main, Text, ExclusionIcon } from "./styles";

interface Props {
  text: string;
  onClose: () => void;
}

const ErrorBanner: React.FC<Props> = ({ text, onClose }) => {
  return (
    <Main>
      <ExclusionIcon src="/exclusion.svg" />
      <Text>{text}</Text>
      <button onClick={onClose}>
        <img src="/close-white.svg" alt="close" />
      </button>
    </Main>
  );
};

export default ErrorBanner;
