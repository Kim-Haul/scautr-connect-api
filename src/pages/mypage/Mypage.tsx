import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRight, AiFillHome } from 'react-icons/ai';

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Container>
        <div className="title">
          <h1>마이페이지</h1>
          <AiFillHome onClick={() => navigate(-1)} />
        </div>
        <Info
          onClick={() => {
            navigate('/mypage/setting');
          }}
        >
          <div className="info_left">
            <img src="/images/profile.jpeg" alt="프로필 이미지" />
            <div className="user_info">
              <div className="user_info_name">전인호 고객님</div>
              <div className="user_info_email">soma@vitcon.co.kr</div>
            </div>
          </div>
          <div className="info_right">
            <button>계정설정</button>
          </div>
        </Info>
        <Menu>
          <ul>
            <li
              className="click_possible"
              onClick={() => {
                navigate('/mypage/company_info');
              }}
            >
              <span>회사 정보</span>
              <AiOutlineRight />
            </li>
            <li
              onClick={() => {
                alert('권한이 없습니다. 관리자에게 문의 바랍니다.');
              }}
            >
              <span>계정 권한 관리</span>
              <AiOutlineRight />
            </li>
            <li
              onClick={() => {
                alert('준비 중인 기능입니다.');
              }}
            >
              <span>서비스 결제</span>
              <AiOutlineRight />
            </li>
          </ul>
        </Menu>
      </Container>
    </Wrap>
  );
};

export default Mypage;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 1.6rem;
`;

const Container = styled.div`
  width: 55rem;
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    width: 35rem;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      font-size: 1.92rem;
      cursor: pointer;
    }
    margin-bottom: 8rem;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;
  padding: 2rem 1rem;
  .info_left {
    display: flex;
    align-items: center;
    img {
      width: 6.4rem;
      border-radius: 10px;
      outline: 1px solid #e1e1e1;
      margin-right: 2rem;
    }
    .user_info {
      .user_info_name {
        font-weight: 700;
      }
      .user_info_email {
        color: gray;
        font-size: 1.44rem;
      }
    }
  }
  .info_right {
    button {
      border: 1px solid #e1e1e1;
      border-radius: 20px;
      padding: 0.48rem;
      color: gray;
      font-weight: 700;
      font-size: 1.2rem;
      background-color: #e9e9e9;
    }
  }
  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    border-bottom: 1px solid #e9e9e9;
    border-radius: 5px;
    button {
      background-color: #fff;
    }
    .user_info_name {
      color: #35a3dc;
    }
  }
`;

const Menu = styled.div`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    font-size: 1.7rem;
    margin-top: 1rem;
    cursor: pointer;
    svg {
      color: gray;
    }
    &:hover {
      background-color: #e9e9e9;
      border-radius: 3px;
    }
  }
  .click_possible {
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
      color: #35a3dc;
      svg {
        color: inherit;
      }
    }
  }
`;
