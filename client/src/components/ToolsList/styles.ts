import styled from "styled-components";
import { Card } from "../../styles";

export const ToolItem = styled(Card)`
  margin: 16px 0px;
  position: relative;
`;

export const ButtonRemove = styled.a`
  cursor: pointer;
  position: absolute;
  padding: 10px;
  top: 20px;
  right: 20px;
  svg {
    margin-right: 4px;
  }
`;
