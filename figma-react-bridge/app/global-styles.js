import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  span,
  button,
  label {
    font-family: 'Inter', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
    margin-bottom: 0;
  }
`;

export default GlobalStyle;
