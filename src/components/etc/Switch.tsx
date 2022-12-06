import React from 'react';
import styled from 'styled-components';
import { ISwitchProps } from '../../shared/type/Interface';

// ManagementSubmit에서 사용하는 MAC input창 조건부 렌더링을 위해 props 전달 &
// 기계사 공지사항 작성시 대표글 작성여부 체크를 위한 props 전달
const Switch = (props: ISwitchProps) => {
  return (
    <Wrap>
      <input
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
        onClick={() => {
          props._setClick!(!props._click);
        }}
      />
      <label className="react-switch-label" htmlFor="react-switch-new">
        <span className="react-switch-button" />
      </label>
    </Wrap>
  );
};

export default Switch;

const Wrap = styled.div`
  .react-switch-checkbox {
    height: 0;
    width: 0;
    display: none;
  }

  .react-switch-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 55px;
    height: 30px;
    background: grey;
    border-radius: 100px;
    position: relative;
    transition: background-color 0.2s;
    .react-switch-button {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 25px;
      height: 25px;
      border-radius: 45px;
      transition: 0.2s;
      background: #fff;
    }
  }

  .react-switch-checkbox:checked + .react-switch-label {
    background-color: #00c875;
    .react-switch-button {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }
`;
