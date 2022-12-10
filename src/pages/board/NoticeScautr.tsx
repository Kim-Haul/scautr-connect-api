import React, { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Mobile from '../../components/exception/Mobile';
import NoticeScautrTable from '../../components/table/NoticeScautrTable';
import SkeletonTable from '../../components/suspense/SkeletonTable';

const NoticeScautr = () => {
  // 검색 input, 조건 select 상태관리
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('all');
  // 검색 초기화시 input, select 초기화
  const inputRef = useRef<HTMLInputElement | any>(null);
  const selectRef = useRef<HTMLSelectElement | any>(null);
  // 클라이언트단 url parameter 설정
  const [searchParams, setSearchParams] = useSearchParams('');
  const searchTypeUrl = searchParams.get('searchType') || 'all';
  const searchInputUrl = searchParams.get('search') || '';

  return (
    <Wrap>
      <Container>
        <Top>
          <div className="top_left">
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSearchType(e.target.value);
              }}
              ref={selectRef}
            >
              <option value="all">All</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="classification">분류</option>
            </select>
            <input
              type="text"
              placeholder="검색"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement> | any) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setSearchParams(
                    `search=${e.target.value}&searchType=${searchType}`
                  );
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchInput(e.target.value);
              }}
              ref={inputRef}
            />
            <button
              className="btn_left"
              onClick={() => {
                setSearchParams(
                  `search=${searchInput}&searchType=${searchType}`
                );
              }}
            >
              검색
            </button>
            <button
              className="btn_right"
              onClick={() => {
                setSearchParams('');
                inputRef.current.value = '';
                selectRef.current.value = 'all';
                setSearchInput('');
                setSearchType('');
              }}
            >
              초기화
            </button>
          </div>
        </Top>
        <Content>
          {/* -------- 스카우터 공지사항 -------- */}
          <Suspense fallback={<SkeletonTable />}>
            <NoticeScautrTable
              searchTypeUrl={searchTypeUrl}
              searchInputUrl={searchInputUrl}
            />
          </Suspense>
          <Mobile />
        </Content>
      </Container>
    </Wrap>
  );
};

export default NoticeScautr;

const Wrap = styled.div`
  width: 100%;
`;

const Container = styled.div`
  border: 1px solid #e9edf3;
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  .top_left {
    @media (max-width: 1100px) {
      width: 100%;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    select {
      margin-right: 20px;
      padding: 10px;
      width: 146px;
      height: 40px;
      border: 1px solid #e9edf3;
      font-size: 1.6rem;
      @media (max-width: 1100px) {
        width: 24%;
        margin-right: 10px;
      }
    }
    input {
      margin-right: 20px;
      padding: 10px;
      width: 292px;
      height: 40px;
      border: 1px solid #e9edf3;
      font-size: 1.6rem;
      &:focus::placeholder {
        color: transparent;
      }
      @media (max-width: 1100px) {
        width: 36%;
        margin-right: 10px;
      }
    }
  }

  button {
    width: 106.1px;
    height: 40px;
    font-weight: 700;
    font-size: 1.6rem;
    @media (max-width: 1100px) {
      width: 23%;
    }
  }
  .btn_left {
    margin-right: 7px;
    background-color: ${(props) => props.theme.color.PastelBlue};
  }

  .btn_right {
    background-color: #f6f7fb;
    border: 1px solid #e9edf3;
    color: #9497a8;
  }
`;

const Content = styled.div``;
