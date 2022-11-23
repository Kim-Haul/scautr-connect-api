import React from 'react';
import styled from 'styled-components';

const DetailManagementInfo = () => {
  return (
    <ManagementInfo>
      <div className="machine_info_title">
        <div className="top_left">관리자 정보</div>
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
              <td className="table_title">관리자</td>
              <td className="table_content">최예랑 (010-1234-5678)</td>
              <td className="table_title">비고</td>
              <td className="table_content">구모델 프린터 옵션 연결</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ManagementInfo>
  );
};

export default DetailManagementInfo;

const ManagementInfo = styled.div`
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
