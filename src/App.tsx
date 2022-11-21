import React from 'react';
import { GlobalStyles } from './shared/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './shared/styles/Theme';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import FindPw from './pages/FindPw';
import Agree from './pages/Agree';
import Signup from './pages/Signup';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/find_pw" element={<FindPw />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
