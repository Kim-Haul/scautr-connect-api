import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

const InquiryDetail = () => {
  return (
    <React.Fragment>
      <Content>
        <div className="row title">Wifi-Link의 TCP,AP 관련 문의</div>
        <div className="row info">
          <div className="div">신선식품</div>
          <div className="div">최예랑(cyr****)</div>
          <div className="div">2022-11-25</div>
        </div>
        <div className="row content">
          TF303 모델에 wifi 연결이 가능한가요?
          <br />
          가능하다면 해당 모델 추가 견적 문의 드립니다.
          <br />
          <br />
        </div>
      </Content>
      <Answer>
        <div className="answer_title">
          <span>답변</span> <IoIosArrowDown />
        </div>
        <hr />
        <div className="answer_textarea">
          <textarea placeholder="내용을 입력해주세요." />
          <button>답글작성</button>
        </div>
      </Answer>
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
  border-bottom: none;
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
    .div {
      &::after {
        content: '｜';
        margin-left: 0.7rem;
      }
      &:last-child::after {
        content: '';
        margin: 0rem;
      }
    }
  }
  .row.content {
    padding: 10px;
    @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
      font-size: 1.3rem;
    }
  }
`;

const Answer = styled.div`
  border: 1px solid #ced4da;
  padding: 10px;
  hr {
    margin: 1rem 0;
    background: #ced4da;
    height: 1px;
    outline: none;
    border: none;
  }
  .answer_title {
    font-weight: 700;
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
  .answer_textarea {
    display: grid;
    grid-template-columns: 1fr 120px;
    column-gap: 1rem;
    height: 120px;
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      border: 1px solid #ced4da;
      padding: 10px;
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 1.5rem;
    }
    button {
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.theme.color.PastelBlue};
      font-size: 1.5rem;
    }
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
