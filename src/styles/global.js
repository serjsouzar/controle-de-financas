import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }

  body{
    font-family: 'Poppins', sans-serif;
    background-color: #f2f2f2;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
  }

` 