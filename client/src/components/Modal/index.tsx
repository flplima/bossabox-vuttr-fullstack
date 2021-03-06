import React from "react";

import { Backdrop, ModalBase, ModalContent, CloseButton } from "./styles";
import closeIcon from "../../assets/close.svg";

interface Props {
  show: boolean;
  onHide?: () => void;
}

const Modal: React.FC<Props> = ({ children, show, onHide }) => {
  const renderBackdrop = (props: any) => <Backdrop {...props} />;
  return (
    <ModalBase show={show} onHide={onHide} renderBackdrop={renderBackdrop}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {children}
        <CloseButton onClick={onHide}>
          <img src={closeIcon} alt="close" />
        </CloseButton>
      </ModalContent>
    </ModalBase>
  );
};

export default Modal;
