import React from 'react';
import { GlobalStyles } from './shared/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './shared/styles/Theme';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import FindPw from './pages/login/FindPw';
import Agree from './pages/login/Agree';
import Signup from './pages/login/Signup';
import Layout from './components/common/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Management from './pages/management/Management';
import ManagementSubmit from './pages/management/ManagementSubmit';
import Detail from './pages/management/Detail';
import Registration from './pages/registration/Registration';
import Mypage from './pages/mypage/Mypage';
import Setting from './pages/mypage/Setting';
import CompanyInfo from './pages/mypage/CompanyInfo';
import ChangePw from './pages/mypage/ChangePw';
import NoticeLayout from './pages/board/NoticeLayout';
import NoticeScautr from './pages/board/NoticeScautr';
import NoticeScautrDetail from './pages/board/NoticeScautrDetail';
import NoticeProgix from './pages/board/NoticeProgix';
import NoticeProgixDetail from './pages/board/NoticeProgixDetail';
import NoticeProgixPost from './pages/board/NoticeProgixPost';
import NoticeInquiry from './pages/board/NoticeInquiry';
import NoticeInquiryDetail from './pages/board/NoticeInquiryDetail';
import { ITokenProps } from './shared/type/Interface';

// 토큰 payload에 담겨오는 정보를 바탕으로 로그인 권한 검증
import jwtDecode from 'jwt-decode';
import { getCookie } from './shared/cookie';

function App() {
  const accessToken = getCookie('Authorization');
  let authority: ITokenProps;
  let isAuth: boolean | undefined;
  if (accessToken) {
    authority = jwtDecode(accessToken);
    isAuth =
      authority.authority === 'ROLE_SYSTEM_ADMIN' ||
      authority.authority === 'ROLE_SYSTEM_USER' ||
      authority.authority === 'ROLE_SUPPLIER_ADMIN' ||
      authority.authority === 'ROLE_SUPPLIER_USER';
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to="/scautr/dashboard" /> : <Login />} />
          <Route path="/find_pw" element={isAuth ? <Navigate to="/scautr/dashboard" /> : <FindPw />} />
          <Route path="/agree" element={isAuth ? <Navigate to="/scautr/dashboard" /> : <Agree />} />
          <Route path="/signup" element={isAuth ? <Navigate to="/scautr/dashboard" /> : <Signup />} />
          <Route path="/scautr" element={isAuth ? <Layout /> : <Navigate to="/" />}>
            <Route path="/scautr/dashboard" element={<Dashboard />} />
            <Route path="/scautr/management" element={<Management />} />
            <Route path="/scautr/management/submit" element={<ManagementSubmit />} />
            <Route path="/scautr/management/detail/:idx" element={<Detail />} />
            <Route path="/scautr/management/registration" element={<Registration />}
            />
            <Route path="/scautr/board" element={<NoticeLayout />}>
              <Route path="/scautr/board/notice/scautr" element={<NoticeScautr />} />
              <Route path="/scautr/board/notice/scautr/detail/:idx" element={<NoticeScautrDetail />} />
              <Route path="/scautr/board/notice/progix" element={<NoticeProgix />} />
              <Route path="/scautr/board/notice/progix/detail/:idx" element={<NoticeProgixDetail />} />
              <Route path="/scautr/board/notice/progix/post" element={<NoticeProgixPost />} />
              <Route path="/scautr/board/inquiry"element={<NoticeInquiry />} />
              <Route path="/scautr/board/inquiry/detail/:idx"element={<NoticeInquiryDetail />} />
            </Route>
          </Route>
          <Route path="/mypage" element={isAuth ? <Mypage /> : <Navigate to="/" />} />
          <Route path="/mypage/company_info" element={isAuth ? <CompanyInfo /> : <Navigate to="/" />} />
          <Route path="/mypage/setting" element={isAuth ? <Setting /> : <Navigate to="/" />} />
          <Route path="/mypage/setting/change_pw" element={isAuth ? <ChangePw /> : <Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
