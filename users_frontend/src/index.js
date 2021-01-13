import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blueGrey, green } from '@material-ui/core/colors';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: green
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);