import React from "react";

import { Main, Text, ExclusionIcon } from "./styles";
import exclusionIcon from "../../assets/exclusion.svg";
import closeIcon from "../../assets/close-white.svg";

interface Props {
  text: string;
  onClose: () => void;
}

const ErrorBanner: React.FC<Props> = ({ text, onClose }) => {
  return (
    <Main>
      <ExclusionIcon src={exclusionIcon} alt="warning" />
      <Text>{text}</Text>
      <button onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </button>
    </Main>
  );
};

export default ErrorBanner;
