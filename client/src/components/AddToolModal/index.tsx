import React from "react";
import { useRecoilState } from "recoil";

import ModalBase from "../ModalBase";
import { Input, Button } from "../../styles";
import { modalAddIsOpenState } from "../../store";

const AddToolModal: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalAddIsOpenState);

  return (
    <ModalBase show={isOpen} onHide={() => setIsOpen(false)}>
      <h2>Add new tool</h2>
      <div>
        Tool name
        <Input />
      </div>
      <div>
        Tool link
        <Input />
      </div>
      <div>
        Tool description
        <Input />
      </div>
      <div>
        Tags
        <Input />
      </div>
      <Button>Add tool</Button>
    </ModalBase>
  );
};

export default AddToolModal;
