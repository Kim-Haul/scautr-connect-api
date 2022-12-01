import React, { useState } from 'react';
import styled from 'styled-components';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';
import { IParamsProps } from '../../shared/type/Interface';
import Pagination5 from '../pagination/Pagination5';

const DetailParameterHistoryTable = (props: IParamsProps) => {
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 기계 세팅값 히스토리 호출 api
  const getParameterHistoryData = async () => {
    try {
      const res = await apis.getParameterHistoryData(props.view, currentPage);
      return res;
    } catch (err) {
      console.log('기계 세팅 값 히스토리 조회에 실패했습니다.');
    }
  };

  // 기계 세팅값 히스토리 호출 쿼리
  const { data: ParameterHistoryDataQuery } = useQuery(
    ['loadParameterHistoryData', currentPage, props.view],
    getParameterHistoryData,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('기계 세팅 값 히스토리 조회에 실패했습니다.');
      },
    }
  );

  // 페이지네이션 처리를 위한 토탈값
  const total: number = ParameterHistoryDataQuery?.data.count;

  return (
    <Wrap>
      <div className="item parameter_history_data">
        <div className="title">
          <div className="top_left">세팅 값 변경 이력</div>
        </div>
        <div className="output_data_table">
          <table>
            <thead>
              <tr>
                <th className="th4">날짜</th>
                <th className="th5">동작</th>
                <th className="th6">변경값</th>
                <th className="th7">단위</th>
              </tr>
            </thead>
            <tbody>
              {ParameterHistoryDataQuery?.data.result.map(
                (v: any, i: number) => {
                  return (
                    <React.Fragment key={i}>
                      <tr>
                        <td>{v.tsAsiaSeoulDatetime}</td>
                        <td>{v.name}</td>
                        <td>{v.value}</td>
                        <td>{v.unit}</td>
                      </tr>
                    </React.Fragment>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <Pagination5
          total={total}
          setCurrentPage={setCurrentPage}
          startPage={startPage}
          setStartPage={setStartPage}
          active={active}
          setActive={setActive}
        />
      </div>
    </Wrap>
  );
};

export default DetailParameterHistoryTable;

const Wrap = styled.div``;
// 좌측 기계 세팅값 테이블을 따로 분리하지는 않아서
// 스타일(td)값을 다른 페이지네이션 테이블 컴포넌트와는 다르게 부모 컴포넌트에서 지정
