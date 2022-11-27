import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsClipboardData, BsShareFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IViewProps, IPathProps } from '../../shared/type/ISidebar';

const Sidebar = (props: IViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrap open_side_bar={props.open_side_bar}>
      <Title onClick={() => navigate('/scautr/dashboard')}>
        <img src="/images/side_bar_logo_white_big.png" alt="스카우터 로고" />
      </Title>
      <Navbar>
        <div className="sidebar-title">
          <span>MENU</span>
          <BiLogOut
            onClick={() => {
              props.setOpenSideBar!('none');
            }}
          />
        </div>
        <Ul location={location.pathname}>
          <li>
            <NavLink to="/scautr/dashboard">
              <div>
                <AiOutlineHome />
                <span>대시보드</span>
              </div>
            </NavLink>
          </li>
          <li className="board">
            <NavLink to="/scautr/board/notice/scautr">
              <div>
                <BsClipboardData />
                <span>게시판</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/board/notice/progix">
              <div style={{ marginLeft: '26px' }}>
                <span>기계사 공지사항</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/board/inquiry">
              <div style={{ marginLeft: '26px' }}>
                <span>문의하기</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/management">
              <div>
                <BsShareFill />
                <span>설비관리</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/management/registration">
              <div style={{ marginLeft: '26px' }}>
                <span>설비등록</span>
              </div>
            </NavLink>
          </li>
        </Ul>
      </Navbar>
    </Wrap>
  );
};

export default Sidebar;

const Wrap = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    display: ${(props: IViewProps) => props.open_side_bar};
  }
  position: fixed;
  width: 24rem;
  height: 100%;
  background-color: #222a3e;
  z-index: 2;
  color: #899dbf;
  font-size: 1.6rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7.2rem;
  cursor: pointer;
  img {
    width: 14.4rem;
  }
`;
const Navbar = styled.nav`
  padding: 1.2rem;
  .sidebar-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      color: white;
      font-size: 2rem;
      cursor: pointer;
      @media (min-width: ${(props) => props.theme.breakpoints.TabletMin}) {
        display: none;
      }
    }
  }
`;

const Ul = styled.ul`
  list-style: none;
  li {
    font-size: 1.5rem;
    padding: 1.4rem;
    div {
      display: flex;
      align-items: center;
      svg {
        margin-right: 1rem;
      }
    }

    a {
      &.active {
        color: white;
      }
    }
  }
  // ul태그 안에, 해당 클래스명을 가진 li태그 안에, a 효과주기
  .board {
    a {
      color: ${(props: IPathProps) =>
        props.location === '/scautr/board/notice/progix' ||
        props.location === '/scautr/board/notice/progix/post' ||
        props.location === '/scautr/board/inquiry'
          ? 'white'
          : '#899dbf'};
    }
  }
`;
