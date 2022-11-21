import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }


  html {
        font-size: 10px;
        /* @media (max-width: 1280px) {
            font-size: 8px;
        }
        @media (max-width: 1024px) {
            font-size: 10px;
        } */
    }


  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
    padding: 1rem;

    transition: all 0.2s ease-in-out;
    &:hover {
      filter: brightness(90%);
    }
    
    font-weight: 600;
    background: #00c7ae;
    color: #fff;
    border-radius: 3px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }




`;
