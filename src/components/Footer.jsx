import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterStyled>
      <a href="https://eryktavares-portifolio.netlify.app/" target="_blank" rel="noreferrer"><h6>copyright ErykTavares © 2022</h6></a>


    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  width:100% ;
  height:50px ;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:auto;
  background-color: #707979;

  a{
    transition: .5s ;
  }
  
  a:hover{
    color:#780206;
  }

`
export default Footer
