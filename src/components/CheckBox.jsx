import React from "react";
import styled from "styled-components";

const CheckBox = ({ id, name, handleChange, state }) => {


  return (
    <CheckBoxStyled
      type="checkbox"
      id={id}
      name={name}
      checked={state}
      onChange={(event) => handleChange(event)}
    ></CheckBoxStyled>
  );
};

const CheckBoxStyled = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #6b7375;
`;
export default CheckBox;
