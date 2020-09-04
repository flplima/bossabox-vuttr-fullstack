import styled from "styled-components";
import { Card } from "../../styles";

export const ToolItem = styled(Card)`
  margin: 16px 0px;
  padding: 18px;
  position: relative;
`;

export const ToolDescription = styled.p`
  margin-top: 6px;
  margin-bottom: 12px;
`;

export const ButtonRemove = styled.a`
  cursor: pointer;
  position: absolute;
  color: #170c3a;
  padding: 10px;
  top: 8px;
  right: 10px;
  span {
    margin-left: 4px;
  }
  :hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

export const TagLink = styled.a`
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
  :hover {
    text-decoration: underline;
  }
`;

export const ToolTitle = styled.h2`
  @media (max-width: 768px) {
    width: calc(100vw - 120px);
  }
`;
