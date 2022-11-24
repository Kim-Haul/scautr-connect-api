import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowInLeft, BsFillCameraFill } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';

const CompanyInfo = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Container>
        <div className="title">
          <h1>계정 설정</h1>
          <BsBoxArrowInLeft onClick={() => navigate(-1)} />
        </div>
        <Info>
          <div className="profile_img">
            <img src="/images/profile.jpeg" alt="프로필 이미지" />
            <div
              className="upload_img"
              onClick={() => {
                alert('준비 중인 기능입니다.');
              }}
            >
              <BsFillCameraFill />
            </div>
          </div>
        </Info>
        <Menu>
          <ul>
            <li>
              <div>
                <div className="division">사용자이름</div>
                <div className="content">전인호</div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">아이디</div>
                <div className="content">scautr_master</div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">이메일</div>
                <div className="content">soma@vitcon.co.kr</div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">연락처</div>
                <div className="content">010-8790-6840</div>
              </div>
            </li>
            <li
              onClick={() => {
                navigate('/mypage/setting/change_pw');
              }}
            >
              <div>
                <div className="division">비밀번호</div>
                <div className="content">••••••••</div>
              </div>
              <AiOutlineRight />
            </li>
          </ul>
          <div className="withdrawal">계정탈퇴</div>
        </Menu>
        <Footer>
          <div>
            <ul>
              <li>주식회사 빛컨</li>
              <li>스카우터</li>
              <li>사업자등록번호 119-87-05616</li>
            </ul>
          </div>
          <div className="copyright">
            <div>Copyright © VITCON Corp. All Rights Reserved.</div>
          </div>
        </Footer>
      </Container>
    </Wrap>
  );
};

export default CompanyInfo;

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
  .profile_img {
    display: flex;
    justify-content: center;
    position: relative;

    img {
      width: 9.6rem;
      height: 9.6rem;
      border-radius: 100px;
      outline: 1px solid #e1e1e1;
    }

    .upload_img {
      position: absolute;
      bottom: 0.5rem;
      right: 41%;
      @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
        right: 36%;
      }
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      outline: 1px solid #e1e1e1;
      cursor: pointer;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const Menu = styled.div`
  .desc {
    background-color: #f2f2f2;
    padding: 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.3rem;
    }
    span {
      color: red;
    }
  }
  ul {
    margin: 2rem 0;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      cursor: pointer;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 1rem;
      .division {
        font-size: 1.5rem;
        color: gray;
      }
      .content {
        font-size: 1.6rem;
      }
      svg {
        color: gray;
      }
      &:hover {
        background-color: #e9e9e9;
        border-radius: 3px;
      }
    }
  }
  .withdrawal {
    cursor: pointer;
    font-size: 1.44rem;
    color: gray;
    text-align: right;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.34rem;
  margin-top: 4rem;

  .copyright {
    margin-top: 0.3rem;
    color: #888888;
  }

  ul {
    list-style: none;
    display: flex;

    li {
      color: gray;
      &::after {
        content: '｜';
        margin: 0.2rem;
      }
      &:last-child::after {
        content: '';
        margin: 0rem;
      }
    }
  }
`;
