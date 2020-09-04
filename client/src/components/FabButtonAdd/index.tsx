import React from "react";
import { PaddingToButton, FabButton } from "./styles";
import { useSetRecoilState } from "recoil";
import { modalAddIsOpenState } from "../../store/atoms";

const FabButtonAdd: React.FC = () => {
  const setModalAddIsOpen = useSetRecoilState(modalAddIsOpenState);
  const onClick = () => setModalAddIsOpen(true);

  return (
    <PaddingToButton>
      <FabButton onClick={onClick}>+</FabButton>
    </PaddingToButton>
  );
};

export default FabButtonAdd;
