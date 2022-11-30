import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination10 from '../pagination/Pagination10';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';
import {
  IRegistrationMachineTableProps,
  IRegistrationMachineProps,
} from '../../shared/type/Interface';

const RegistrationMachineTable = (props: IRegistrationMachineProps) => {
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 등록된 설비 목록 호출 api
  const getRegistrationModel = async () => {
    try {
      const res = await apis.getRegistrationModel(
        currentPage,
        props.searchTypeUrl,
        props.searchInputUrl
      );
      return res;
    } catch (err) {
      console.log('등록된 설비 목록을 불러오는데 실패했습니다.');
    }
  };

  // 등록된 설비 목록 호출 쿼리
  const { data: registrationModelQuery } = useQuery(
    [
      'loadRegistrationModel',
      currentPage,
      props.searchTypeUrl,
      props.searchInputUrl,
    ],
    getRegistrationModel,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('등록된 설비 목록을 불러오는데 실패했습니다.');
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
  const total = registrationModelQuery?.data.count;

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0"></th>
            <th className="th1"></th>
            <th className="th2">그룹</th>
            <th className="th3">기계명</th>
            <th className="th4">모델명</th>
            <th className="th5">권장사용기간</th>
            <th className="th6">분류</th>
            <th className="th7">파일첨부</th>
            <th className="th8">등록일</th>
          </tr>
        </thead>
        <tbody>
          {registrationModelQuery?.data.result.map(
            (v: IRegistrationMachineTableProps, i: number) => {
              return (
                <React.Fragment key={i}>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        id={String(v.modelId)}
                        checked={props.checkBoxArr.includes(Number(v.modelId))}
                        onClick={(e) => {
                          props.clickCheckBox(e);
                        }}
                        readOnly
                      />
                    </td>
                    <td>{v.no}</td>
                    <td>{v.template}</td>
                    <td>{v.assignedName}</td>
                    <td>{v.model}</td>
                    <td>{v.lifeSpan}</td>
                    <td>기계</td>
                    <td
                      className="file_download"
                      onClick={() => {
                        if (v.files[0]?.name === undefined) {
                          return;
                        } else {
                          window.open(
                            `${process.env.REACT_APP_S3_FILE_UPLOAD}/${v.files[0]?.saveName}`
                          );
                        }
                      }}
                    >
                      {v.files[0]?.name.length >= 27
                        ? v.files[0]?.name.substr(0, 28) + '...'
                        : v.files[0]?.name}
                    </td>
                    <td>{v.regdate}</td>
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

export default RegistrationMachineTable;

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
      width: 5rem;
    }
    .th2 {
      width: 10rem;
    }
    .th3 {
      width: 30rem;
    }
    .th4 {
      width: 30rem;
    }
    .th5 {
      width: 15rem;
    }
    .th6 {
      width: 10rem;
    }
    .th7 {
      width: 30rem;
    }
    .th8 {
      width: 15rem;
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
      background-color: #e9e9e9;
    }
    .file_download {
      color: #bbbbbb;
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
        text-decoration: underline;
        text-underline-position: under;
      }
    }
  }
`;
