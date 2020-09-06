import React from "react";
import { useDispatch } from "react-redux";

import { PaddingToButton, FabButton, IconAdd } from "./styles";
import { openModalAdd } from "../../store/actions";

const FabButtonAdd: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(openModalAdd());
  };

  return (
    <PaddingToButton>
      <FabButton onClick={onClick}>
        <IconAdd src="/add.svg" />
      </FabButton>
    </PaddingToButton>
  );
};

export default FabButtonAdd;
