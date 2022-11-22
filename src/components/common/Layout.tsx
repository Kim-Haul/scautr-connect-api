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

  // 모바일 사이드바 컨트롤
  const [open_side_bar, setOpenSideBar] = useState<string>('none');

  return (
    <>
      <Header ScrollY={ScrollY} setOpenSideBar={setOpenSideBar} />
      <Sidebar open_side_bar={open_side_bar} setOpenSideBar={setOpenSideBar} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
const Main = styled.main`
  padding-left: 262px;
  padding-top: 95px;
  width: 100%;
  height: 100%;
  font-size: 1.6rem; // 기본 1rem이 10px로 지정되어있기 때문에, Outlet을 감싸주면서 font-size를 1.6rem 지정해주기
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-top: 95px;
  }
`;
