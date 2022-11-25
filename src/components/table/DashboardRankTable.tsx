import React from 'react';
import styled from 'styled-components';
import { IRankProps } from '../../shared/type/IDasboardRank';

const DashboardRankTable = (props: IRankProps) => {
  const error = [
    { index: '01', name: '신선식품', machine: '진공포장기', run: '32' },
    { index: '02', name: '신선식품', machine: '금속검출기', run: '14' },
    { index: '03', name: '건강식품', machine: '진공포장기', run: '12' },
    {
      index: '04',
      name: '신선식품',
      machine: '자동열성형진공포장기',
      run: '6',
    },
    { index: '05', name: '건강식품', machine: '진공포장기', run: '2' },
  ];

  const alarm = [
    { index: '01', name: '신선식품', machine: '진공포장기', run: '22' },
    { index: '02', name: '신선식품', machine: '진공포장기', run: '19' },
    { index: '03', name: '하나에프엔드엘', machine: '금속검출기', run: '14' },
    { index: '04', name: '신선식품', machine: '진공포장기', run: '8' },
    { index: '05', name: '건강식품', machine: '진공포장기', run: '6' },
  ];

  return (
    <Wrap>
      {props.view_point === 'error' ? (
        <table>
          <thead>
            <tr>
              <th className="th0"></th>
              <th className="th1">거래처명</th>
              <th className="th2">장비명</th>
              <th className="th3">발생량</th>
            </tr>
          </thead>
          <tbody>
            {error.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <tr>
                    <td>{v.index}</td>
                    <td>{v.name}</td>
                    <td>{v.machine}</td>
                    <td>{v.run}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="th0"></th>
              <th className="th1">거래처명</th>
              <th className="th2">장비명</th>
              <th className="th3">발생량</th>
            </tr>
          </thead>
          <tbody>
            {alarm.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <tr>
                    <td>{v.index}</td>
                    <td>{v.name}</td>
                    <td>{v.machine}</td>
                    <td>{v.run}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </Wrap>
  );
};

export default DashboardRankTable;

const Wrap = styled.div`
  width: 100%;
  margin-top: 5rem;
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      padding: 10px;
    }
    tbody {
      tr {
        cursor: pointer;
        :hover {
          background-color: #e1e1e1;
        }
      }
    }
    td {
      text-align: center;
      padding: 10px;
      border-top: 1px solid #ced4da;
      /* border-top: 1px solid #d4d4d4; */
    }
    .th0 {
      width: 1rem;
    }
    .th1 {
      width: 19rem;
    }
    .th2 {
      width: 20rem;
    }
    .th3 {
      width: 8rem;
    }
  }
`;
