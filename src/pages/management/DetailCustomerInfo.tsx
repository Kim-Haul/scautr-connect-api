import React from 'react';
import styled from 'styled-components';

const DetailCustomerInfo = () => {
  return (
    <CustomerInfo>
      <div className="customer_info_title">
        <div className="top_left">거래처 정보</div>
        <div className="top_right">
          <button className="btn_left">수정하기</button>
          <button className="btn_left">A/S 이력</button>
          <button className="btn_right">알림전송</button>
        </div>
      </div>
      <div className="customer_info_table">
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
              <td className="table_title">업체명</td>
              <td className="table_content">고성종의원</td>
              <td className="table_title"> 출고날짜</td>
              <td className="table_content">2021-03-24</td>
            </tr>
            <tr>
              <td className="table_title">주소</td>
              <td className="table_content">서울특별시 금천구</td>
              <td className="table_title">대표번호</td>
              <td className="table_content">010-1234-1234</td>
            </tr>
            <tr>
              <td className="table_title">담당자</td>
              <td className="table_content">고민지</td>
              <td className="table_title">연락처</td>
              <td className="table_content">010-1234-1234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CustomerInfo>
  );
};

export default DetailCustomerInfo;

const CustomerInfo = styled.div`
  // 화면 축소시 테이블 column 깨지는거 방지
  @media (max-width: 1400px) {
    display: none;
  }
  .customer_info_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_left {
      font-weight: 600;
      font-size: 1.8rem;
    }
    .top_right {
      display: flex;
      button {
        width: 106.1px;
        height: 40px;
        font-weight: 700;
        font-size: 1.6rem;
        @media (max-width: 1100px) {
          width: 23%;
        }
      }
      .btn_left {
        background-color: #fff;
        border: 1px solid #ced4da;
        color: ${(props) => props.theme.color.PastelBlue};
        margin-right: 7px;
      }
      .btn_right {
        background-color: ${(props) => props.theme.color.PastelBlue};
        color: #f5f7fa;
      }
    }
  }
`;
