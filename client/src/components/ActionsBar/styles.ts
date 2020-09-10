import styled from "styled-components";
import { Input, Button } from "../../styles";

export const Main = styled.div`
  display: flex;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-grow: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.div`
  position: relative;
  button {
    padding: 10px;
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
  }
  ${Input} {
    padding-left: 48px;
  }
`;

export const SearchIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 18px;
`;

export const ButtonAdd = styled(Button)`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;
