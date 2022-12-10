import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { INoticeProps } from '../../shared/type/Interface';
import Pagination10 from '../pagination/Pagination10';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';

const NoticeInquiryTable = (props: INoticeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 문의사항 목록 호출 api
  const getNoticeInquiry = async () => {
    try {
      const res = await apis.getNoticeInquiry(
        currentPage,
        props.searchTypeUrl,
        props.searchInputUrl
      );
      return res;
    } catch (err) {
      console.log('문의사항 목록을 불러오는데 실패했습니다.');
    }
  };

  // 문의사항 목록 호출 쿼리
  const { data: noticeInquiryQuery } = useQuery(
    [
      'loadNoticeProgix',
      currentPage,
      props.searchTypeUrl,
      props.searchInputUrl,
      // 상위탭으로 컴포넌트 이동시 기존 캐시 데이터가 보이는 현상 방지
      location.pathname,
    ],
    getNoticeInquiry,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('문의사항 목록을 불러오는데 실패했습니다.');
      },
    }
  );

  // 검색, 초기화시 Pagination10 컴포넌트 상태 초기화
  useEffect(() => {
    setCurrentPage(1);
    setStartPage(1);
    setActive('1');
  }, [props.searchInputUrl]);

  // 페이지네이션 처리를 위한 토탈값
  const total = noticeInquiryQuery?.data.count;

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0">NO</th>
            <th className="th1">분류</th>
            <th className="th2">답변상태</th>
            <th className="th3">제목</th>
            <th className="th4">작성자</th>
            <th className="th5">작성일</th>
          </tr>
        </thead>
        <tbody>
          {noticeInquiryQuery?.data.result.map((v: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <tr
                  onClick={() => {
                    navigate(`/scautr/board/inquiry/detail/${v.inquiryId}`);
                  }}
                >
                  <td>{v.inquiryId}</td>
                  <td>{v.classification}</td>
                  {v.status === '답변 대기' ? (
                    <td style={{ backgroundColor: '#E2445C', color: '#fff' }}>
                      {v.status}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: '#00C875', color: '#fff' }}>
                      {v.status}
                    </td>
                  )}
                  <td>{v.title}</td>
                  <td>
                    <div className="writer">
                      <div className="writer_detail">
                        <span className="writer_detail_company">
                          {v.customerCompany}
                        </span>
                        <span>
                          {v.customerName}(
                          {v.customerAccount.substr(0, 3) + '***'})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{v.questionRegdate}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <Pagination10
        total={total}
        setCurrentPage={setCurrentPage}
        startPage={startPage}
        setStartPage={setStartPage}
        active={active}
        setActive={setActive}
      />
    </Wrap>
  );
};

export default NoticeInquiryTable;

const Wrap = styled.div`
  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
    // 화면 축소시 테이블 column 깨지는거 방지
    @media (max-width: 1400px) {
      display: none;
    }
    th {
      padding: 10px;
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
    }

    .th0 {
      width: 5rem;
    }
    .th1 {
      width: 10rem;
    }
    .th2 {
      width: 10rem;
    }
    .th3 {
      width: 33rem;
    }
    .th4 {
      width: 11rem;
    }
    .th5 {
      width: 10rem;
    }
  }
  td {
    // 표형식 기본 padding을 10px로 주고 있었는데 여기는
    // 작성자칸 크기 때문에 살짝 다름
    padding: 3.6px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
  .writer {
    display: flex;
    justify-content: center;
    // td 내부에서 작성자 왼쪽 정렬 통일성을 위한 마진 추가
    /* justify-content: left;
    margin-left: 20px; */
    /* img {
      margin-right: 5px;
      width: 20px;
    } */
    .writer_detail {
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      .writer_detail_company {
        margin-bottom: -5px;
        font-weight: bold;
      }
    }
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }
`;
