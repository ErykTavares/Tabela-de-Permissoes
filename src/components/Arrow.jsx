import React from "react";
import { ReactComponent as Shalft } from "./assets/arrow-down-svgrepo-com.svg";
import styled from "styled-components";

const Arrow = ({ name, handleClickArrow, collapsed }) => {
  return (
    <ButtonArrow type="button" onClick={() => handleClickArrow(name)}>
      <Shalft className={collapsed[name] ? "" : "Invert"} />
    </ButtonArrow>
  );
};
const ButtonArrow = styled.button`
  width: 30px;
  background-color: transparent;
  border: none;
  padding-left: 12px;
  padding-top: 4px;
  cursor: pointer;
`;
export default Arrow;
