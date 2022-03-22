import React from 'react';
import styled from 'styled-components';

const Button = ({text, handleSubmit}) => {
  return (
    <ButtonSubmit type="submit" onClick={()=>handleSubmit()}>
      {text}
    </ButtonSubmit>
  )
}

const ButtonSubmit = styled.button`
    width: 200px;
    height: 40px;
    background-color: #6b7375;
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 1.2rem;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #494f50;
    }
`

export default Button
