import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsClipboardData, BsShareFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IViewProps, IPathProps } from '../../shared/type/Interface';
import { IoIosArrowForward } from 'react-icons/io';
import jwtDecode from 'jwt-decode';
import { getCookie } from '../../shared/cookie';
import { ITokenProps } from '../../shared/type/Interface';

const Sidebar = (props: IViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 토큰 payload에 담겨오는 정보를 바탕으로 사이드바 유저 정보 노출
  const [isAccount, setIsAccount] = useState<string>('');
  const [isEmail, setIsEmail] = useState<string>('');
  useEffect(() => {
    const accessToken = getCookie('Authorization');
    let authority: ITokenProps;

    if (accessToken) {
      authority = jwtDecode(accessToken);
      setIsAccount(authority.sub);
      setIsEmail(authority.email);
    }
  }, []);

  return (
    <Wrap open_side_bar={props.open_side_bar}>
      <Title onClick={() => navigate('/scautr/dashboard')}>
        <img src="/images/side_bar_logo_white_big.png" alt="스카우터 로고" />
      </Title>
      <Navbar>
        <div
          className="info-wrap"
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <div className="info-wrap-left">
            <img src="/images/sidebar_profile.png" alt="프로필 이미지" />
            <div className="info">
              <p className="info-left-title">{isAccount}</p>
              <p className="info-left-email">{isEmail}</p>
            </div>
          </div>
          <div className="info-wrap-right">
            <IoIosArrowForward />
          </div>
        </div>
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
  .info-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #393f5c;
    border-radius: 8px;
    height: 58px;
    padding: 8px;
    &:hover {
      cursor: pointer;
      background-color: #fff;
      .info-left-title {
        color: #000 !important;
      }
      svg {
        color: #000 !important;
      }
    }

    .info-wrap-left {
      display: flex;
      gap: 8px;
      img {
        width: 40px;
        height: 40px;
      }
      .info {
        .info-left-title {
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        }
        .info-left-email {
          color: #9497a8;
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
    .info-wrap-right {
      svg {
        color: #fff;
      }
    }

    margin-bottom: 20px;
  }
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
        props.location === '/scautr/board/inquiry' ||
        props.location.indexOf('/progix/detail') === 20 ||
        props.location.indexOf('/inquiry/detail') === 13
          ? 'white'
          : '#899dbf'};
    }
  }
`;
