import React, { useState } from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IToggleProps } from '../../shared/type/IBoard';

const ProgixDetail = () => {
  const [open_modal, setOpenModal] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Content>
        <div className="row title">신규 진공포장기 출시</div>
        <div className="row info">
          <div>정지영(jyy****)</div>
          <div>｜</div>
          <div>2022-11-25</div>
          <BiDotsVerticalRounded
            onClick={() => {
              setOpenModal(!open_modal);
            }}
          />
          {open_modal ? (
            <Modal toggleOn={open_modal}>
              <ul>
                <li>수정하기</li>
                <li>삭제하기</li>
              </ul>
            </Modal>
          ) : null}
        </div>
        <div className="row content">
          자동열성형 진공포장기가 신규 출시 되었습니다.
          <br />
          기존 BP-500 모델에서 고성능 쿨러 추가와 소비 전력을 보다 효율적으로
          컨트롤 가능합니다.
          <br />
          <br />
          자세한 사항은 문의 바랍니다.
          <br />
          <br />
        </div>
      </Content>
      <Bottom>
        <div className="column">▾ 이전글</div>
        <div className="column">(이벤트)제상기능 업데이트 안내</div>
        <div className="column">정지영</div>
        <div className="column">2022-11-01</div>
      </Bottom>
    </React.Fragment>
  );
};

export default ProgixDetail;

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
    svg {
      background-color: #f6f7fb;
      border: 1px solid #ced4da;
      font-size: 2.5rem;
      cursor: pointer;
      color: gray;
      border-radius: 6px;
      margin-left: 0.3rem;
    }
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
    padding: 10px;
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
`;

const Modal = styled.div`
  position: absolute;
  font-size: 1.5rem;
  // 부모 요소인 .row.info에 font-weight가 있어서 별도로 지정
  font-weight: 400;
  top: 4rem;
  right: 5;
  width: 12rem;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.PastelBlue};
  box-shadow: 1px 1px 5px 1px #d4d4d4;
  color: #000;
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    // 1200px 이하 화면에서는 display:none;
    display: ${(props: IToggleProps) => props.toggleOn && 'none'};
  }
  ul {
    list-style: none;
    li {
      display: flex;
      justify-content: center;
      padding: 10px;
      cursor: pointer;
      &:first-child {
        border-bottom: 1px solid #d4d4d4;
      }
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
      }
    }
  }
`;
