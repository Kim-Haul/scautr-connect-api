import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';

const CompanyInfo = () => {
  const navigate = useNavigate();

  // 회사 정보 호출 api
  const myPageGetCompanyInfo = async () => {
    try {
      const res = await apis.myPageGetCompanyInfo();
      return res;
    } catch (err) {
      console.log('회사 정보를 불러오는데 실패했습니다.');
    }
  };

  // 회사 정보 호출 쿼리
  const { data: myPageGetCompanyInfoQuery } = useQuery(
    ['loadMyPageCompanyInfo'],
    myPageGetCompanyInfo,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('회사 정보를 불러오는데 실패했습니다.');
      },
    }
  );

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
              {myPageGetCompanyInfoQuery?.data.result[0].name}의 회사코드는{' '}
              <span>
                {myPageGetCompanyInfoQuery?.data.result[0].supplierCode}
              </span>
              입니다.
            </div>
          </div>
          <ul>
            <li>
              <div>
                <div className="division">회사명</div>
                <div className="content">
                  {myPageGetCompanyInfoQuery?.data.result[0].name}
                </div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">연락처</div>
                <div className="content">
                  {myPageGetCompanyInfoQuery?.data.result[0].phone}
                </div>
              </div>
            </li>
            <li>
              <div>
                <div className="division">사업자 번호</div>
                {myPageGetCompanyInfoQuery?.data.result[0].registrationNumber}
              </div>
            </li>
            <li>
              <div>
                <div className="division">대표자명</div>
                {myPageGetCompanyInfoQuery?.data.result[0].representative}
              </div>
            </li>
            <li>
              <div>
                <div className="division">회사 관리자 계정</div>
                {myPageGetCompanyInfoQuery?.data.result[0].user.account}
              </div>
            </li>
          </ul>
        </Menu>
        <Footer>
          <div>
            <ul>
              <li>주식회사 엣지크로스</li>
              <li>스카우터</li>
              <li>사업자등록번호 119-87-05616</li>
            </ul>
          </div>
          <div className="copyright">
            <div>Copyright © EdgeCross Inc. All Rights Reserved.</div>
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
