import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsClipboardData } from 'react-icons/bs';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Title onClick={() => navigate('/scautr/dashboard')}>
        <img src="/images/side_bar_logo_white_big.png" alt="스카우터 로고" />
      </Title>
      <Navbar>
        <div className="sidebar-title">MENU</div>
        <ul>
          <li>
            <NavLink to="/scautr/dashboard">
              <div>
                <AiOutlineHome />
                <span>Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/management">
              <div>
                <BsClipboardData />
                <span>Management</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/management/registration">
              <div style={{ marginLeft: '26px' }}>
                <span>Registration</span>
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
    display: none;
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
