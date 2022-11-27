import React from 'react';
import styled from 'styled-components';

const InquiryDetail = () => {
  return (
    <React.Fragment>
      <Content>
        <div className="row title">Wifi-Link의 TCP,AP 관련 문의</div>
        <div className="row info">
          <div>LG화학</div>
          <div>｜</div>
          <div>최예랑(cyr****)</div>
          <div>｜</div>
          <div>2022-11-25</div>
        </div>
        <div className="row content">
          TF303 모델에 wifi 연결이 가능한가요?
          <br />
          <br />
        </div>
      </Content>
      <Bottom>
        <div className="column">▾ 이전글</div>
        <div className="column">배송문의</div>
        <div className="column writer">
          <span className="inquiry_writer_company">이랜드몰</span>
          <span className="inquiry_writer_name"> 정지영(jyy****)</span>
        </div>
        <div className="column">2022-11-01</div>
      </Bottom>
    </React.Fragment>
  );
};

export default InquiryDetail;

const Content = styled.div`
  width: 100%;
  border: 1px solid #ced4da;
  .row.title {
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f7fb;
    height: 51px;
    border-bottom: 1px solid #ced4da;
  }
  .row.info {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px;
    font-size: 1.3rem;
    gap: 0.5rem;
    font-weight: 500;
  }
  .row.content {
    padding: 10px;
  }
`;

const Bottom = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
  display: grid;
  grid-template-columns: 150px 1fr 150px 200px;
  .column {
    padding: 3.6px;
    border: 1px solid #ced4da;
    border-top: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child,
    &:nth-child(2),
    &:nth-child(3) {
      border-right: none;
    }
  }
  .column.writer {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    .inquiry_writer_company {
      margin-bottom: -5px;
      font-weight: 600;
    }
    .inquiry_writer_name {
    }
  }
`;
