import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../components/pagination/Pagination';
import DetailParameterHistoryTable from '../../components/table/DetailParameterHistoryTable';

const DetailParameter = () => {
  const [parameterCurrentPage, setParameterCurrentPage] = useState<number>(1);
  const parameterHistoryTotal: number = 78;
  return (
    <Wrap>
      {/* -------------- 기계 세팅 값 -------------- */}
      <div className="item parameter_data">
        <div className="title">
          <div className="top_left">기계 세팅 값</div>
        </div>
        <div className="input_data_table">
          <table>
            <thead>
              <tr>
                <th className="th0">동작</th>
                <th className="th1">IO</th>
                <th className="th2">상태</th>
                <th className="th3">단위</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>현재 비가동 시간</td>
                <td>D18</td>
                <td>09:03:49:28</td>
                <td>Time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* -------------- 세팅 값 변경 이력 -------------- */}
      <div className="item parameter_history_data">
        <div className="title">
          <div className="top_left">세팅 값 변경 이력</div>
        </div>
        <div className="output_data_table">
          <table>
            <thead>
              <tr>
                <th className="th0">동작</th>
                <th className="th1">IO</th>
                <th className="th2">상태</th>
                <th className="th3">단위</th>
              </tr>
            </thead>
            <DetailParameterHistoryTable />
          </table>
        </div>
        <Pagination
          total={parameterHistoryTotal}
          setCurrentPage={setParameterCurrentPage}
        />
      </div>
    </Wrap>
  );
};

export default DetailParameter;
const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(49%, auto));
  column-gap: 2rem;
  row-gap: 2rem;
  // 파라미터 컴포넌트의 item이 중간에 위치하니, 위아래 마진 주기
  margin: 2rem 0;
  .item {
    /* position: relative; */
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    padding: 20px;
    // 데이터양에 따른 사이즈 조절 및 스크롤 설정
    max-height: 410px;
    overflow-y: auto;
    .title {
      display: flex;
      justify-content: space-between;
      .top_left {
        font-weight: 600;
        font-size: 1.8rem;
      }
    }
    table {
      @media (max-width: 1400px) {
        display: none;
      }
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }
    th {
      padding: 10px;
      background-color: #fff;
      border: 1px solid #e9edf3;
    }
    td {
      padding: 10px;
      border: 1px solid #e9edf3;
      text-align: center;
    }
    .th0 {
      width: 25rem;
      min-width: 160px;
    }
    .th1 {
      width: 10rem;
      min-width: 80px;
    }
    .th2 {
      width: 25rem;
      min-width: 160px;
    }
    .th3 {
      width: 10rem;
      min-width: 80px;
    }
  }
`;
