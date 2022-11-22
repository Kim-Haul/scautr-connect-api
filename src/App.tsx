import React from 'react';
import { GlobalStyles } from './shared/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './shared/styles/Theme';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import FindPw from './pages/login/FindPw';
import Agree from './pages/login/Agree';
import Signup from './pages/login/Signup';
import Layout from './components/common/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Management from './pages/management/Management';
import Registration from './pages/registration/Registration';

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
          <Route path="/scautr" element={<Layout />}>
            <Route path="/scautr/dashboard" element={<Dashboard />} />
            <Route path="/scautr/management" element={<Management />} />
            <Route
              path="/scautr/management/registration"
              element={<Registration />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
