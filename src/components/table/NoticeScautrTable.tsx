import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { INoticeProps } from '../../shared/type/Interface';
import Pagination10 from '../pagination/Pagination10';

const NoticeScautrTable = (props: INoticeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  const registration_query = [
    {
      id: '5',
      classification: '공지사항',
      title: '스카우터 서버 정기 점검 안내',
      author: 'VITCON',
      date: '2022-11-28',
    },
    {
      id: '4',
      classification: '업데이트',
      title: '펌웨어 디바이스 업데이트',
      author: 'VITCON',
      date: '2022-11-21',
    },
    {
      id: '3',
      classification: '공지사항',
      title: '11월 4주차 고객센터 휴무 안내',
      author: 'VITCON',
      date: '2022-11-16',
    },
    {
      id: '2',
      classification: '공지사항',
      title: '모듈 센서 추가 견적서 안내',
      author: 'VITCON',
      date: '2022-11-13',
    },
    {
      id: '1',
      classification: '공지사항',
      title: '스카우터 데이터 연동 메뉴얼',
      author: 'VITCON',
      date: '2022-11-09',
    },
  ];

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
          {registration_query.map((v, i) => {
            return (
              <React.Fragment key={i}>
                <tr
                  onClick={() => {
                    navigate('/scautr/board/notice/scautr/detail/172');
                  }}
                >
                  <td>{v.id}</td>
                  <td>{v.classification}</td>
                  <td>{v.title}</td>
                  <td>{v.author}</td>
                  <td>{v.date}</td>
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
