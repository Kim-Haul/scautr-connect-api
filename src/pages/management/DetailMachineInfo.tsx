import React from 'react';
import styled from 'styled-components';

const DetailMachineInfo = () => {
  return (
    <MachineInfo>
      <div className="machine_info_title">
        <div className="top_left">기계 정보</div>
      </div>
      <div className="machine_info_table">
        <table>
          <thead>
            <tr>
              <th className="th0"></th>
              <th className="th1"></th>
              <th className="th2"></th>
              <th className="th3"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table_title">장비</td>
              <td className="table_content">자동열성형포장기 (GP260)</td>
              <td className="table_title"> 장비 S/N</td>
              <td className="table_content">FEM110MEKR</td>
            </tr>
            <tr>
              <td className="table_title">옵션</td>
              <td className="table_content">프린터 (AA-D324)</td>
              <td className="table_title">옵션 S/N</td>
              <td className="table_content">EAD7745DN</td>
            </tr>
            <tr>
              <td className="table_title">스마트머신</td>
              <td className="table_content">연동</td>
              <td className="table_title">MAC</td>
              <td className="table_content">405033C394920</td>
            </tr>
            <tr>
              <td className="table_title">머신케어</td>
              <td className="table_content">사용</td>
              <td className="table_title">가동상태</td>
              <td className="table_content">가동 (ON)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MachineInfo>
  );
};

export default DetailMachineInfo;

const MachineInfo = styled.div`
  // 화면 축소시 테이블 column 깨지는거 방지
  @media (max-width: 1400px) {
    display: none;
  }
  .machine_info_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .top_left {
      font-weight: 600;
      font-size: 1.8rem;
    }
  }
`;
