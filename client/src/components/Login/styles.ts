import styled from "styled-components";
import { Button, Container } from "../../styles";

export const Main = styled(Container)`
  max-width: 400px;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 64px;
  margin-bottom: 16px;
  font-size: 42px;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 24px;
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  margin-bottom: 32px;
  button {
    color: #365df0;
  }
`;
