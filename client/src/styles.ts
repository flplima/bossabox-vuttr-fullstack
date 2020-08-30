import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #eee;
  }
  body html #root {
    height: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Input = styled.input<{ error?: boolean }>`
  background: #f5f4f6 0% 0% no-repeat padding-box;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  width: 400px;
  height: 50px;
  text-align: left;
  font: normal normal normal 20px/25px Source Sans Pro;
  letter-spacing: 0px;
  color: #170c3a;
  padding: 22px;
  transition: background-color 0.1s;

  ${(props) =>
    props.error
      ? css`
          background: #feefee 0% 0% no-repeat padding-box;
          border: 1px solid #f95e5a;
          border-radius: 5px;
          text-align: left;
          font: normal normal normal 20px/26px Source Sans Pro;
          letter-spacing: 0.4px;
          color: #f95e5a;
        `
      : css`
          :focus {
            background: #ebeaed 0% 0% no-repeat padding-box;
            border: 1px solid #dedce1;
          }
        `}
`;

export const Button = styled.button`
  background-color: #365df0;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  padding: 14px 24px;
  border: none;
  width: auto;
  overflow: visible;
  transition: background-color 0.2s;
  :hover {
    background-color: #2f55cc;
  }
  :active {
    background-color: #244aa8;
  }
`;

export const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 5px 7px #0000000d;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  padding: 12px;
`;