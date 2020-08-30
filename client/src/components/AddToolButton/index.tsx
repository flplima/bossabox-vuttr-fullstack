import React from "react";
import { Card, Button } from "../../styles";
import { useSetRecoilState } from "recoil";
import { modalAddIsOpenState } from "../../store";

const AddToolButton: React.FC = () => {
  const setModalAddIsOpen = useSetRecoilState(modalAddIsOpenState);
  const onClickButton = () => {
    setModalAddIsOpen(true);
  };

  return <Button onClick={onClickButton}>+ Add</Button>;
};

export default AddToolButton;
