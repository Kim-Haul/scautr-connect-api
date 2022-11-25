import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const NoticeLayout = () => {
  return (
    <Wrap>
      <Title>
        <div className="main">게시판</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>게시판</span>
        </div>
      </Title>
      <Toggle>
        <ul>
          <li>
            <NavLink to="/scautr/board/notice/scautr">
              <div>스카우터 공지사항</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/board/notice/progix">
              <div>기계사 공지사항</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scautr/board/inquiry">
              <div>문의하기</div>
            </NavLink>
          </li>
        </ul>
      </Toggle>
      <Outlet />
    </Wrap>
  );
};

export default NoticeLayout;

const Wrap = styled.div`
  width: 98.5%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .main {
    color: #495057;
    font-weight: 600;
    font-size: 2rem;
  }
  .sub {
    color: #495057;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    svg {
      margin: 0 0.3rem;
    }
  }
`;

const Toggle = styled.div`
  width: 430px;
  ul {
    list-style: none;
    display: flex;
    li {
      border: 1px solid #e9edf3;
      border-bottom: none;
      width: 100%;
      display: flex;
      cursor: pointer;
      &:first-child,
      &:nth-child(2) {
        border-right: none;
      }
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
      }
      a {
        // registration 페이지와는 다르게 레이아웃을 구성했기에
        // padding을 li태그가 아니라 a태그에 줌. display 속성으로 가운데 정렬 역시 추가.
        padding: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          border-top: 3px solid #35a3dc;
          color: #35a3dc;
          font-weight: 700;
        }
      }
    }
  }
`;
