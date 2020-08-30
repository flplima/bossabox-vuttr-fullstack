import React from "react";
import { Backdrop, Modal } from "./styles";

interface Props {
  show: boolean;
  onHide?: () => void;
}

const ModalBase: React.FC<Props> = ({ children, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      renderBackdrop={(props: any) => <Backdrop {...props} />}
    >
      <div>{children}</div>
    </Modal>
  );
};

export default ModalBase;
