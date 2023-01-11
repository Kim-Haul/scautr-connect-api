import React, { useLayoutEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const DerkModeSwitch = (props: {
  inputCheck: boolean;
  SetInputCheck: Dispatch<SetStateAction<boolean>>;
}) => {
  const darkModeCheck = () => {
    if (localStorage.getItem('darkMode') === 'on') {
      localStorage.setItem('darkMode', 'off');
      props.SetInputCheck(false);
    } else {
      localStorage.setItem('darkMode', 'on');
      props.SetInputCheck(true);
    }
  };

  // useEffect 는 컴포넌트들이 render와 paint 된 이후 실행. paint 된 이후 실행되기 때문에 useEffect 내부에 dom 에 영향을 주는 코드가 있으면 화면 깜빡임.
  // useLayoutEffecr 는 컴포넌트들이 render 된 이후 실행. 그리고 그 이후에 paint 되기 때문에, 깜빡임이 없음.
  useLayoutEffect(() => {
    if (localStorage.getItem('darkMode') === 'on') {
      props.SetInputCheck(true);
    } else {
      props.SetInputCheck(false);
    }
  }, [props]);

  return (
    <Wrap>
      <input
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
        onClick={() => {
          darkModeCheck();
        }}
        checked={props.inputCheck}
        readOnly
      />
      <label className="react-switch-label" htmlFor="react-switch-new">
        <span className="react-switch-button" />
      </label>
    </Wrap>
  );
};

export default DerkModeSwitch;

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
    background-color: #00c875;
    border-radius: 100px;
    position: relative;
    transition: background-color 0.2s;
    .react-switch-button {
      position: absolute;
      top: 2.2px;
      left: 2px;
      width: 25px;
      height: 25px;
      border-radius: 45px;
      transition: 0.2s;
      background: #fff;
    }
  }

  .react-switch-checkbox:checked + .react-switch-label {
    background-color: gray;
    .react-switch-button {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }
`;
