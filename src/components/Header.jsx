import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderStyled>  
      <h1>Tabela de Permissões</h1>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
    width: 100%;
    height: 100px;
    display:flex;
    align-items:center;
    padding:0 46px ;
    
    h1{
      font-size:26px;
    }


`

export default Header
