import styled from "styled-components";
import { Button } from "../../styles";

export const PaddingToButton = styled.div`
  margin-top: 80px;
  @media (min-width: 769px) {
    margin-top: 0px;
  }
`;

export const FabButton = styled(Button)`
  position: fixed;
  background-color: #365df0;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  bottom: 25px;
  right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 1000;
  svg {
    margin: 0px;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

export const IconAdd = styled.img`
  width: 25px;
`;
