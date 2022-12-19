import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const AsDetailTable = (props: {
  setDetailClick: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Wrap>
      <div className="title">
        <strong>파워 연결선 교체</strong>
      </div>
      <div className="content">전원 접합부 불량으로 인한 파워 연결선 교체</div>
      <div className="bottom">
        <div className="bottom_left">
          <button
            className="btn_left"
            onClick={() => {
              props.setDetailClick(false);
            }}
          >
            목록
          </button>
        </div>
        <div className="bottom_right">
          <button className="btn_left">삭제</button>
          <button className="btn_right">수정</button>
        </div>
      </div>
    </Wrap>
  );
};

export default AsDetailTable;

const Wrap = styled.div`
  .title {
    padding: 10px;
    text-align: center;
    background-color: #f6f7fb;
    border: 1px solid #e9edf3;
    margin-top: 20px;
  }
  .content {
    border: 1px solid #e9edf3;
    border-top: none;
    min-height: 300px;
    padding: 10px;
  }
  .bottom {
    margin-top: 16px;
    button {
      width: 80px;
      height: 35px;
    }
    display: flex;
    justify-content: space-between;
    .bottom_right {
      display: flex;
      gap: 10px;
    }
    .btn_left {
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
      color: #9497a8;
    }
    .btn_right {
      background-color: ${(props) => props.theme.color.PastelBlue};
    }
  }
`;
