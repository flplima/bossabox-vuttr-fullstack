import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  position: relative;
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin-left: 12px;
  margin-right: 6px;
  background: #f5f4f6;
  border: 1px solid #dedce1;
  border-radius: 2px;
  appearance: none;
  outline: 0;
  transition: background-color 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 1px;
    left: 5px;
    width: 4px;
    height: 10px;
    border-style: solid;
    border-color: #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: #fff;
    border: 0px;
    background: #365df0;
    &::before {
      opacity: 1;
    }
  }
`;

export const Label = styled.label`
  cursor: pointer;
`;
