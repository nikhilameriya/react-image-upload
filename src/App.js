import React from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter as Router} from 'react-router-dom';
import AppIndex from './containers/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#008bcf'
    },
    secondary:{
      light:'#008bcf',
      main:'#008bcf',
      contrastText: '#008bcf'
    },
    grey:{
      color:'#666'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <AppIndex />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
