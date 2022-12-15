import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import apis from '../../shared/apis';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Approve = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  // 계정 목록 조회 api
  const getCompanyAccountList = async () => {
    try {
      const res = await apis.getCompanyAccountList();
      return res;
    } catch (err) {
      console.log('계정 목록을 불러오는데 실패했습니다.');
    }
  };

  // 계정 목록 조회 쿼리
  const { data: CompanyAccountListQuery } = useQuery(
    ['loadCompanyAccountList'],
    getCompanyAccountList,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('계정 목록을 불러오는데 실패했습니다.');
      },
    }
  );

  // 요청 거부
  const rejectRequest = async (id: string) => {
    try {
      const res = await apis.rejectRequest(id);
      alert('권한요청을 거절하였습니다.');
      return res;
    } catch (err) {
      alert(
        '요청거부에 실패하셨습니다. 문제가 지속되면 담당부서로 연락바랍니다.'
      );
    }
  };

  const queryClient = useQueryClient();
  const { mutate: rejectRequestMutate } = useMutation(rejectRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadCompanyAccountList'] });
    },
  });

  // 요청 승인
  const approveRequest = async (id: string) => {
    try {
      const res = await apis.approveRequest(id);
      console.log('승인완료');
      alert('정상적으로 승인되었습니다.');
      return res;
    } catch (err) {
      alert(
        '요청승인에 실패하셨습니다. 문제가 지속되면 담당부서로 연락바랍니다.'
      );
    }
  };

  const { mutate: approveRequestMutate } = useMutation(approveRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadCompanyAccountList'] });
    },
  });

  const approveRequestCheck = (id: string) => {
    if (window.confirm('권한요청을 승인하시겠습니까?') === true) {
      approveRequestMutate(id);
    } else {
      return false;
    }
  };

  const rejectRequestCheck = (id: string) => {
    if (window.confirm('권한요청을 거절하시겠습니까?') === true) {
      rejectRequestMutate(id);
    } else {
      return false;
    }
  };

  return (
    <Wrap>
      <Container>
        <div className="title">
          <h1>계정 권한 관리</h1>
          <BsBoxArrowInLeft onClick={() => navigate(-1)} />
        </div>
        <Menu>
          <div className="desc">
            <RiErrorWarningFill />
            <div>
              추가 계정은 <span>결제</span> 후 이용하실 수 있습니다.
            </div>
          </div>
          <ul>
            <li className="list">
              <div className="left">
                <div className="account_box">
                  <div className="column">계정</div>
                  <div>{state.account}</div>
                </div>
                <div>
                  <div className="column">이름</div>
                  <div>{state.name}</div>
                </div>
              </div>
              <div className="right">
                <div className="tag">관리자</div>
                <button className="accept_complete">승인관리</button>
              </div>
            </li>
            {/* 요청 들어오는 계정관리 */}
            {CompanyAccountListQuery?.data.result.map((v: any, i: number) => {
              return (
                <li className="list" key={i}>
                  <div className="left">
                    <div className="account_box">
                      <div className="column">계정</div>
                      <div>{v.account}</div>
                    </div>
                    <div>
                      <div className="column">이름</div>
                      <div>{v.name}</div>
                    </div>
                  </div>
                  <div className="right">
                    {v.approvalId === 1 ? (
                      <div className="request">
                        <button
                          className="request_accept"
                          onClick={() => {
                            approveRequestCheck(v.account);
                          }}
                        >
                          승인
                        </button>
                        <button
                          className="request_reject"
                          onClick={() => {
                            rejectRequestCheck(v.account);
                          }}
                        >
                          거절
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button>승인완료</button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
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

export default Approve;

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
    margin-bottom: 2rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    svg {
      margin-right: 0.3rem;
    }
    span {
      color: blue;
    }
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e9edf3;
    .left {
      display: flex;
      .account_box {
        width: 10rem;
      }
      .column {
        color: gray;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .tag {
        margin-right: 1rem;
        padding: 0.32rem;
        background-color: #00c7ae;
        color: #fff;
        font-size: 1.4rem;
      }
      button {
        background-color: #e1e1e1;
        border: 1px solid #e1e1e1;
        border-radius: 0px;
        width: 11rem;
        height: 26.38px;
      }
      .request {
        width: 11rem;
        display: flex;
        justify-content: space-between;
        button {
          width: 5.2rem;
        }
        .request_accept {
          background-color: #00c875;
          border: 1px solid #00c875;
        }
        .request_reject {
          background-color: #fc5c7d;
          border: 1px solid #fc5c7d;
        }
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
