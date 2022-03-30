import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }

  header {
  display: flex;  
  align-items: center;
  gap: 10px;
  height: 38px;
  border: 1px solid black;
  padding: 0 10px;
  position: relative;
  }

  main {
    margin: 10px;
    margin-bottom: 78px;
    overflow-y: auto;
  }

  body {
    display: grid;
    grid-template-rows: 38px auto 48px;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
    font-size: 112.5%;
  }
  input, label, button, textarea {
    font-size: 1em;
  }
`;
