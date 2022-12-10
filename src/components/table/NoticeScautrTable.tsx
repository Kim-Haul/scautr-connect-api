import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { INoticeProps } from '../../shared/type/Interface';
import Pagination10 from '../pagination/Pagination10';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';

const NoticeScautrTable = (props: INoticeProps) => {
  const navigate = useNavigate();
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 공지사항 목록 호출 api
  const getNoticeScautr = async () => {
    try {
      const res = await apis.getNoticeScautr(
        currentPage,
        props.searchTypeUrl,
        props.searchInputUrl
      );
      return res;
    } catch (err) {
      console.log('공지사항 목록을 불러오는데 실패했습니다.');
    }
  };

  // 공지사항 목록 호출 쿼리
  const { data: NoticeScautrQuery } = useQuery(
    [
      'loadNoticeScautr',
      currentPage,
      props.searchTypeUrl,
      props.searchInputUrl,
    ],
    getNoticeScautr,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('공지사항 목록을 불러오는데 실패했습니다.');
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
  const total = 10;

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0">NO</th>
            <th className="th1">분류</th>
            <th className="th2">제목</th>
            <th className="th3">작성자</th>
            <th className="th4">작성일</th>
          </tr>
        </thead>
        <tbody>
          {NoticeScautrQuery?.data.result.map((v: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <tr
                  onClick={() => {
                    navigate(
                      `/scautr/board/notice/scautr/detail/${v.noticeId}`
                    );
                  }}
                >
                  <td>{v.no}</td>
                  <td>{v.classification}</td>
                  <td>{v.title}</td>
                  <td>{v.name}</td>
                  <td>{v.regdate}</td>
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

export default NoticeScautrTable;

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
      width: 43rem;
    }
    .th3 {
      width: 11rem;
    }
    .th4 {
      width: 10rem;
    }
  }
  td {
    padding: 10px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }
`;
