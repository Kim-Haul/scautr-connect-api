import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination5 from '../../components/pagination/Pagination5';
import DetailAlarmTable from '../../components/table/DetailAlarmTable';

const DetailAlarm = () => {
  const [parameterCurrentPage, setParameterCurrentPage] = useState<number>(1);
  const parameterHistoryTotal: number = 78;
  return (
    <Wrap>
      <div className="item">
        <div className="title">
          <div className="top_left">알람내역</div>
          <div className="top_right">
            <input type="date"></input>
            <input type="date"></input>
            <button>조회</button>
          </div>
        </div>
        <div className="alarm_table">
          <table>
            <thead>
              <tr>
                <th className="th0">발생일자</th>
                <th className="th1">종료일자</th>
                <th className="th2">알람내역</th>
              </tr>
            </thead>
            <DetailAlarmTable />
          </table>
        </div>
        <Pagination5
          total={parameterHistoryTotal}
          setCurrentPage={setParameterCurrentPage}
        />
      </div>
    </Wrap>
  );
};

export default DetailAlarm;

const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  .item {
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    padding: 20px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .top_left {
        font-weight: 600;
        font-size: 1.8rem;
      }
      .top_right {
        display: flex;
        @media (max-width: 1400px) {
          display: none;
        }
        input {
          width: 120px;
          margin-right: 8px;
          padding: 5px;
        }
        button {
          font-size: 1.6rem;
          background-color: ${(props) => props.theme.color.PastelBlue};
        }
      }
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
    border: 1px solid #ced4da;
  }
  .th0 {
    width: 12rem;
    min-width: 80px;
  }
  .th1 {
    width: 12rem;
    min-width: 80px;
  }
  .th2 {
    width: 45rem;
    min-width: 350px;
  }
`;
