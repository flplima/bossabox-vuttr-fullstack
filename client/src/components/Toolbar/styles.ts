import styled from "styled-components";
import { Input } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Main = styled.div`
  display: flex;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const SearchInput = styled.div`
  position: relative;
  a {
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

export const InputIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 16px;
  left: 16px;
`;
