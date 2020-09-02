import React from "react";
import { Backdrop, ModalBase, ModalContent, CloseButton } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  show: boolean;
  onHide?: () => void;
}

const Modal: React.FC<Props> = ({ children, show, onHide }) => {
  return (
    <ModalBase
      show={show}
      onHide={onHide}
      renderBackdrop={(props: any) => <Backdrop {...props} />}
    >
      <ModalContent>
        {children}
        <CloseButton onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
      </ModalContent>
    </ModalBase>
  );
};

export default Modal;
