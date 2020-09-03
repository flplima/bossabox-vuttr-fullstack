import styled from "styled-components";
import CreatableSelect from "react-select/creatable";

export const Select = styled(CreatableSelect)`
  .select__control {
    background: #f5f4f6 0% 0% no-repeat padding-box;
    border: 1px solid #ebeaed;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    text-align: left;
    letter-spacing: 0px;
    color: #170c3a;
    transition: background-color 0.1s;
  }
  .select__control--is-focused {
    box-shadow: none !important;
    background: #ebeaed 0% 0% no-repeat padding-box;
    border: 1px solid #dedce1 !important;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__multi-value {
    background-color: #fff;
    border: 1px solid #ebeaed;
  }
`;
