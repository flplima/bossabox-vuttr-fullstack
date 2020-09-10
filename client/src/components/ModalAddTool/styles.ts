import styled from "styled-components";
import { Button } from "../../styles";

export const Scrollable = styled.div`
  @media (max-height: 650px) {
    max-height: calc(100vh - 300px);
    overflow-y: scroll;
  }
`;

export const ButtonAdd = styled(Button)`
  margin-top: 8px;
`;
