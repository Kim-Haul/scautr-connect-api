import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsClipboardData } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IViewProps } from '../../shared/type/ISidebar';

const Sidebar = (props: IViewProps) => {
  const navigate = useNavigate();

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
        <ul>
          <li>
            <NavLink to="/scautr/dashboard">
              <div>
                <AiOutlineHome />
                <span>대시보드</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/management">
              <div>
                <BsClipboardData />
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
        </ul>
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
  ul {
    list-style: none;
    li {
      font-size: 1.5rem;
      padding: 1.4rem;
      svg {
        margin-right: 1rem;
      }
      a {
        &.active {
          color: white;
        }
      }
    }
  }
`;
