import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineBars } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { FcSpeaker } from 'react-icons/fc';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IToggleProps, IScrollYProps } from '../../shared/type/IHeader';

const Header = (props: IScrollYProps) => {
  const [is_mypage, setIsMypage] = useState<boolean>(false);

  // 모달 영역 밖 클릭시 닫기
  const modalEl = useRef<HTMLDivElement>(null);

  return (
    <Wrap ScrollY={props.ScrollY}>
      <ResponsiveHeader>
        <div
          className="bar"
          onClick={() => {
            alert('준비중인 기능입니다.');
          }}
        >
          <AiOutlineBars />
        </div>
        <img
          className="logo"
          src="/images/scautr-blue.png"
          alt="스카우터 로고"
        />
        <div className="logout">
          <BiLogOut />
        </div>
      </ResponsiveHeader>
      <Navbar>
        <NavLeft>
          <div className="notice">
            <div>
              <FcSpeaker style={{ marginRight: '10px' }} />
            </div>
            <div className="notice content">
              [공지] 정기적으로 서비스 안정화 작업이 진행중입니다.
            </div>
          </div>
        </NavLeft>
        <NavRight ref={modalEl}>
          {is_mypage ? (
            <>
              <Profile onClick={() => setIsMypage(!is_mypage)}>
                <div>
                  <img
                    src="/images/profile.jpeg"
                    alt="프로필 이미지"
                    style={{ outline: '3px solid #007bff' }}
                  />
                </div>
                <div>
                  <IoIosArrowUp />
                </div>
              </Profile>
              <Modal toggleOn={is_mypage}>
                <ul>
                  <li>계정설정</li>
                  <li>로그아웃</li>
                </ul>
              </Modal>
            </>
          ) : (
            <>
              <Profile onClick={() => setIsMypage(!is_mypage)}>
                <div>
                  <img
                    src="/images/profile.jpeg"
                    alt="프로필 이미지"
                    style={{ outline: '2px solid #e1e1e1' }}
                  />
                </div>
                <div>
                  <IoIosArrowDown />
                </div>
              </Profile>
            </>
          )}
        </NavRight>
      </Navbar>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    // 1200px 이상 화면에서는 display:none;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
  position: fixed;
  width: 100%;
  height: 7.2rem;
  z-index: 1;
  padding-left: 27.2rem;
  border-bottom: 1px solid #e1e1e1;
  transition: all 0.5s ease-in-out;
  font-size: 1.6rem;
  background-color: ${(props: IScrollYProps) =>
    props.ScrollY > 700 ? '#222a3e' : '#f5f7fa'};
  color: ${(props: IScrollYProps) => (props.ScrollY > 700 ? '#fff' : '#000')};
`;

const ResponsiveHeader = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    // 1200px 이상 화면에서는 display:none;
    display: none;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 2.4rem;

  .bar,
  .logo,
  .logout {
    cursor: pointer;
  }

  img {
    width: 20rem;
  }
`;

const Navbar = styled.nav`
  height: 100%;
  width: 100%;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    // 1200px 이하 화면에서는 display:none;
    display: none;
  }
`;

const NavLeft = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  .notice {
    display: flex;
    align-items: center;
    .notice.content {
      padding-bottom: 4px;
    }
  }
`;
const NavRight = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

// NavRight 안쪽에 있는 div태그
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6.4rem;
  cursor: pointer;
  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 7.2rem;
  right: 3.5rem;
  width: 16rem;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  box-shadow: 1px 1px 5px 1px #d4d4d4;
  color: #000;
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    // 1200px 이하 화면에서는 display:none;
    display: ${(props: IToggleProps) => props.toggleOn && 'none'};
  }
  ul {
    list-style: none;
    li {
      display: flex;
      justify-content: center;
      padding: 10px;
      cursor: pointer;
      &:first-child {
        border-bottom: 1px solid #d4d4d4;
      }
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
      }
    }
  }
`;
