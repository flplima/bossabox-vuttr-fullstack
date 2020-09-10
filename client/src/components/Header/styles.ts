import styled from "styled-components";

export const Main = styled.header`
  padding: 32px 0px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 768px) {
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  margin: 8px 0px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Subtitle = styled.span`
  font-size: 20px;
`;

export const ButtonLogout = styled.button`
  color: #365df0;
  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;
