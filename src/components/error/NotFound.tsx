import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <img src="/images/logo.svg" alt="로고 이미지" />
      <div className="title">404 Not Found</div>
      <div className="content">요청하신 페이지를 찾을 수 없습니다.</div>
      <div className="content">주소를 확인해주세요.</div>
      <button
        onClick={() => {
          navigate('/');
          window.location.reload();
        }}
      >
        돌아가기
      </button>
    </Wrap>
  );
};

export default NotFound;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 1.6rem;

  .title {
    color: red;
    font-size: 2rem;
  }
  .content {
    color: gray;
    font-size: 1.4rem;
  }

  img {
    width: 5rem;
    margin-bottom: 1.6rem;
  }

  button {
    width: 14rem;
    height: 4.8rem;
    font-size: 1.6rem;
    margin-top: 1.6rem;
  }
`;
