import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import Pagination10 from '../pagination/Pagination10';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';

const AlarmTransferHistroyTable = (props: {
  setDetailClick: Dispatch<SetStateAction<boolean>>;
  setPostId: Dispatch<SetStateAction<string>>;
  view: string | undefined;
}) => {
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 알림 전송 이력 목록 호출 api
  const getMessageHistory = async () => {
    try {
      const res = await apis.getMessageHistory(props.view, currentPage);
      return res;
    } catch (err) {
      console.error('알림 전송 이력 목록을 불러오는데 실패했습니다.');
    }
  };

  // 알림 전송 이력 목록 호출 쿼리
  const { data: MessageHistoryQuery } = useQuery(
    ['loadMessageHistory', currentPage, props.view],
    getMessageHistory,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('알림 전송 이력 목록을 불러오는데 실패했습니다.');
      },
    }
  );

  // 페이지네이션 처리를 위한 토탈값
  const total = MessageHistoryQuery?.data.count;

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0">내용</th>
            <th className="th1">발송자</th>
            <th className="th2">일자</th>
          </tr>
        </thead>
        <tbody>
          {MessageHistoryQuery?.data.result.map((v: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <tr
                  onClick={() => {
                    props.setDetailClick(true);
                    props.setPostId(v.messageId);
                  }}
                >
                  <td>{v.title}</td>
                  <td className="none">{v.sender}</td>
                  <td>{v.regdate.substr(2, 8)}</td>
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

export default AlarmTransferHistroyTable;

const Wrap = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      padding: 10px;
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
    }
    .th0 {
      // 상위 컴포넌트에서 지정해준 min-width 때문에 width가 안 먹고 있었던 것.
      width: 60% !important;
      min-width: 0px !important;
    }
    .th1 {
      width: 15% !important;
      min-width: 0px !important;
      // 모바일 사이즈 고려를 위해 잠시 모바일 사이즈에서는 담당자 컬럼 임시 none 처리
      @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
        display: none;
      }
    }
    .th2 {
      width: 25% !important;
      min-width: 0px !important;
      @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
        width: 30%;
      }
    }
    td {
      padding: 10px;
      border: 1px solid #e9edf3 !important;
      text-align: center;
      // 상위 컴포넌트에서 td에 지정해준 background-color: #fff때문에, 바로 아래 tr에서 hover 효과가 안먹히는 이슈.
      background-color: inherit !important;
    }
    tr {
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
      }
    }
    .none {
      // 모바일 사이즈 고려를 위해 잠시 모바일 사이즈에서는 담당자 컬럼 임시 none 처리
      @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
        display: none;
      }
    }
  }
`;
