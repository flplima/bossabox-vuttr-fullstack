import React from "react";
import { useDispatch } from "react-redux";

import { Main, Title, Subtitle, ButtonLogout } from "./styles";
import { logout } from "../../store/actions";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <Main>
      <span>
        <Title>VUTTR</Title>
        <Subtitle>Very Useful Tools to Remember</Subtitle>
      </span>
      <ButtonLogout onClick={onClickLogout}>Logout</ButtonLogout>
    </Main>
  );
};

export default Header;
