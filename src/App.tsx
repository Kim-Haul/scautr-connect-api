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
import Detail from './pages/management/Detail';
import Registration from './pages/registration/Registration';
import Mypage from './pages/mypage/Mypage';
import Setting from './pages/mypage/Setting';
import CompanyInfo from './pages/mypage/CompanyInfo';
import ChangePw from './pages/mypage/ChangePw';
import NoticeLayout from './pages/board/NoticeLayout';
import NoticeScautr from './pages/board/NoticeScautr';
import NoticeProgix from './pages/board/NoticeProgix';
import NoticeInquiry from './pages/board/NoticeInquiry';

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
            <Route path="/scautr/management/detail/:idx" element={<Detail />} />
            <Route path="/scautr/management/registration" element={<Registration />}
            />
            <Route path="/scautr/board" element={<NoticeLayout />}>
              <Route path="/scautr/board/notice/scautr" element={<NoticeScautr />} />
              <Route path="/scautr/board/notice/progix" element={<NoticeProgix />} />
              <Route path="/scautr/board/inquiry"element={<NoticeInquiry />} />
            </Route>
          </Route>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/company_info" element={<CompanyInfo />} />
          <Route path="/mypage/setting" element={<Setting />} />
          <Route path="/mypage/setting/change_pw" element={<ChangePw />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
