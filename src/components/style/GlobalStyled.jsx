import { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
    @font-face {
        font-family: "Roboto", sans-serif;
        src: url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
    }

    *{
        margin:0 ;
        padding:0 ;
        box-sizing: border-box ;
        /* background-color:#E5E5E5; */
        font-family:Roboto, sans-serif;
    }

    main{
        width:100%;
        display:flex;
        flex-direction:column;
    }

    .container{
        width:100% ;
        padding: 0 3%
    }

    a, a:hover{
        color:black;
        text-decoration:none;
    }

`