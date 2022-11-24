import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';
import { BsBoxArrowInLeft } from 'react-icons/bs';

const CompanyInfo = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Container>
        <div className="title">
          <h1>회사 정보</h1>
          <BsBoxArrowInLeft onClick={() => navigate(-1)} />
        </div>
        <Menu>
          <div className="desc">
            <RiErrorWarningFill />
            <div>
              빛컨의 회사코드는 <span>1001</span> 입니다.
            </div>
          </div>
          <ul>
            <li>
              <div>
                <div className="division">회사명</div>
                <div className="content">빛컨</div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">사업자 번호</div>
                <div className="content">119-87-05616</div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">대표자명</div>
                <div className="content">김민규</div>
              </div>
            </li>
          </ul>
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

const Menu = styled.div`
  .desc {
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
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
      &:hover {
        background-color: #e9e9e9;
        border-radius: 3px;
      }
    }
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
