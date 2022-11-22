import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [ScrollY, setScrollY] = useState<number>(0); // window 의 pageYOffset값을 저장
  function handleScroll() {
    setScrollY(window.pageYOffset);
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <>
      <Header ScrollY={ScrollY} />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
const Main = styled.main`
  max-width: 980px;
  margin: 0 auto;
  padding: 72px 5px 30px;
`;
