import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../../shared/cookie';

const ErrorComponent = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <img src="/images/logo.svg" alt="로고 이미지" />
      <div className="title">서버에서 해당 정보를 불러 올 수 없습니다.</div>
      <div className="content">
        잠시 후 다시 시도해주세요. <br />
        관련 문제가 지속되면 담당 부서로 연락바랍니다.
      </div>
      <button
        onClick={() => {
          navigate('/');
          window.location.reload();
        }}
      >
        돌아가기
      </button>
      <button
        onClick={() => {
          deleteCookie('Authorization');
          deleteCookie('RefreshToken');
          navigate('/');
        }}
        style={{ background: '#FDAB3D' }}
      >
        처음으로
      </button>
    </Wrap>
  );
};

export default ErrorComponent;

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
    font-size: 1.8rem;
    margin-bottom: 0.2rem;
  }
  .content {
    color: gray;
    text-align: center;
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
