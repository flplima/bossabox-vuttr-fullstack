import React from "react";
import { Backdrop, ModalBase } from "./styles";

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
      <div>{children}</div>
    </ModalBase>
  );
};

export default Modal;
