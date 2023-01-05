import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { INoticeProps } from '../../shared/type/Interface';
import Pagination10 from '../pagination/Pagination10';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';
import { FcSpeaker } from 'react-icons/fc';

const NoticeProgixTable = (props: INoticeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 기계사 공지사항 목록 호출 api
  const getNoticeProgix = async () => {
    try {
      const res = await apis.getNoticeProgix(
        currentPage,
        props.searchTypeUrl,
        props.searchInputUrl
      );
      return res;
    } catch (err) {
      console.log('기계사 공지사항 목록을 불러오는데 실패했습니다.');
    }
  };

  // 기계사 공지사항 목록 호출 쿼리
  const { data: noticeProgixQuery } = useQuery(
    [
      'loadNoticeProgix',
      currentPage,
      props.searchTypeUrl,
      props.searchInputUrl,
      // 상위탭으로 컴포넌트 이동시 기존 캐시 데이터가 보이는 현상 방지
      location.pathname,
    ],
    getNoticeProgix,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('기계사 공지사항 목록을 불러오는데 실패했습니다.');
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
  const total = noticeProgixQuery?.data.count;

  // list 첫번째 요소에 대표글 여부 확인하기
  useEffect(() => {
    props.setExistTop(noticeProgixQuery?.data.result[0]?.top);
  }, [props, noticeProgixQuery?.data.result]);

  return (
    <React.Fragment>
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
            {noticeProgixQuery?.data.result.map((v: any, i: number) => {
              return (
                <React.Fragment key={i}>
                  {/* 대표글 설정 여부 검사 */}
                  {v.top === true ? (
                    <tr
                      onClick={() => {
                        navigate(
                          `/scautr/board/notice/progix/detail/${v.noticeId}`
                        );
                      }}
                    >
                      <td>
                        <div className="td_notice_svg">
                          <FcSpeaker />
                        </div>
                      </td>
                      <td style={{ color: '#000', fontWeight: '700' }}>
                        {v.classification}
                      </td>
                      <td style={{ color: '#000', fontWeight: '700' }}>
                        [공지] {v.title}
                      </td>
                      <td>
                        {v.name}({v.account})
                      </td>
                      <td>{v.regdate}</td>
                    </tr>
                  ) : (
                    <tr
                      onClick={() => {
                        navigate(
                          `/scautr/board/notice/progix/detail/${v.noticeId}`
                        );
                      }}
                    >
                      <td>{v.no}</td>
                      <td>{v.classification}</td>
                      <td>{v.title}</td>
                      <td>
                        <div className="writer">
                          <div className="writer_wrap">
                            {/* <img
                            src="/images/board_profile.png"
                            alt="프로필 이미지"
                          /> */}
                            <span>
                              {v.name}({v.account})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{v.regdate}</td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </Wrap>
      <Pagination10
        total={total}
        setCurrentPage={setCurrentPage}
        startPage={startPage}
        setStartPage={setStartPage}
        active={active}
        setActive={setActive}
      />
    </React.Fragment>
  );
};

export default NoticeProgixTable;

const Wrap = styled.div`
  @media (max-width: 1400px) {
    overflow-x: auto;
  }
  table {
    @media (max-width: 1400px) {
      width: 1200px;
    }
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
    // 화면 축소시 테이블 column 깨지는거 방지
    /* @media (max-width: 1400px) {
      display: none;
    } */
    th {
      padding: 10px;
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
    }
    .th0 {
      width: 8%;
    }
    .th1 {
      width: 8%;
    }
    .th2 {
      width: 60%;
    }
    .th3 {
      width: 14%;
    }
    .th4 {
      width: 10%;
    }
  }
  td {
    padding: 10px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
  .writer {
    display: flex;
    align-items: center;
    // td 내부에서 작성자 왼쪽 정렬 통일성을 위한 마진 추가
    justify-content: left;

    .writer_wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      /* img {
        margin-right: 5px;
        width: 20px;
        // img가 글자보다 살짝 위로 있는 느낌이 들어서 margin-top
        margin-top: 3px;
      } */
    }
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }
  .td_notice_svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
