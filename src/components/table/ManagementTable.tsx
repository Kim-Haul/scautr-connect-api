import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';
import {
  IManagementProps,
  IManagementTableProps,
} from '../../shared/type/Interface';
import Pagination10 from '../pagination/Pagination10';

const ManagementTable = (props: IManagementProps) => {
  const navigate = useNavigate();

  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 등록된 설비관리 목록 호출 api
  const getManagementList = async () => {
    try {
      const res = await apis.getManagementList(
        currentPage,
        props.searchTypeUrl,
        props.searchInputUrl
      );
      return res;
    } catch (err) {
      console.log('등록된 설비관리 목록을 불러오는데 실패했습니다.');
    }
  };

  // 등록된 설비관리 목록 호출 쿼리
  const { data: ManagementListQuery } = useQuery(
    [
      'loadManagementListQuery',
      currentPage,
      props.searchTypeUrl,
      props.searchInputUrl,
    ],
    getManagementList,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('등록된 설비관리 목록을 불러오는데 실패했습니다.');
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
  const total = ManagementListQuery?.data.count;

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0"></th>
            <th className="th1"></th>
            <th className="th2">출고일</th>
            <th className="th3">거래처명</th>
            <th className="th4">기계명</th>
            <th className="th5">모델명</th>
            <th className="th6">기계상태</th>
            <th className="th7">출력</th>
            <th className="th8">S/N</th>
            <th className="th9">PROGIX</th>
          </tr>
        </thead>
        <tbody>
          {ManagementListQuery?.data.result.map(
            (v: IManagementTableProps, i: number) => {
              return (
                <React.Fragment key={i}>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        id={String(v.equipmentId)}
                        checked={props.checkBoxArr.includes(
                          Number(v.equipmentId)
                        )}
                        onClick={(e) => {
                          props.clickCheckBox(e);
                        }}
                        readOnly
                      />
                    </td>
                    <td>{v.no}</td>
                    <td>{v.installedDate}</td>
                    <td
                      onClick={() => {
                        navigate(`/scautr/management/detail/${v.equipmentId}`);
                      }}
                      className="nav_companyName"
                    >
                      {v.companyName}
                    </td>
                    {/* 설비등록시 기계명에 설정한 color를 backgroundColor로 뿌려주기 */}
                    <td style={{ backgroundColor: v.color, color: 'white' }}>
                      {v.assignedName}
                    </td>
                    <td>{v.model}</td>
                    {/* 기계상태 */}
                    <td
                      style={{
                        backgroundColor:
                          v.operation === 'ON' ? '#00C875' : 'transparent',
                        color: v.operation === 'ON' ? '#fff' : 'inherit',
                      }}
                    >
                      {v.operation === 'ON' ? (
                        <div className="operation_on">{v.operation}</div>
                      ) : (
                        <div className="operation_etc">{v.operation}</div>
                      )}
                    </td>
                    {/* 출력 */}
                    <td>
                      <div className="mark">
                        {v.alarm === true ? (
                          <div className="mark_alarm">알람</div>
                        ) : null}
                        {v.error === true ? (
                          <div className="mark_error">에러</div>
                        ) : null}
                      </div>
                    </td>
                    <td>{v.serialNumber}</td>
                    <td>{v.customerCode === null ? '미사용' : '사용'}</td>
                  </tr>
                </React.Fragment>
              );
            }
          )}
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

export default ManagementTable;

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
    td {
      padding: 10px;
      border: 1px solid #e9edf3;
      text-align: center;
      .mark {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .mark_alarm {
          border: 1px solid #ffc6c9;
          background-color: #ffe3e4;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          color: #ff4e59;
        }
        .mark_error {
          border: 1px solid #ffc6c9;
          background-color: #ffe3e4;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          color: #ff4e59;
        }
      }
    }
    .th0 {
      width: 5rem;
    }
    .th1 {
      width: 5rem;
    }
    .th2 {
      width: 15rem;
    }
    .th3 {
      width: 25rem;
    }
    .th4 {
      width: 25rem;
    }
    .th5 {
      width: 20rem;
    }
    .th6 {
      width: 10rem;
    }
    .th7 {
      width: 10rem;
    }
    .th8 {
      width: 20rem;
    }
    .th9 {
      width: 10rem;
    }
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
    .nav_companyName {
      &:hover {
        color: #35a3dc;
      }
    }
  }
`;
