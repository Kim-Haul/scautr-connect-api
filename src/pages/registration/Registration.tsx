import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import RegistrationMachine from './RegistrationMachine';
import RegistrationOption from './RegistrationOption';
import { ITabProps } from '../../shared/type/Interface';

const Registration = () => {
  const [click_tab, setClickTab] = useState<boolean>(true);
  return (
    <Wrap>
      <Title>
        <div className="main">설비등록</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>설비관리</span>
          <IoIosArrowForward /> <span>설비등록</span>
        </div>
      </Title>
      <Toggle click_tab={click_tab}>
        <ul>
          <li
            className="machine_tab"
            onClick={() => {
              setClickTab(true);
            }}
          >
            <div>기계</div>
          </li>
          <li
            className="option_tab"
            onClick={() => {
              setClickTab(false);
            }}
          >
            <div>옵션</div>
          </li>
        </ul>
      </Toggle>
      {click_tab ? (
        <RegistrationMachine click_tab={click_tab} />
      ) : (
        <RegistrationOption />
      )}
    </Wrap>
  );
};

export default Registration;

const Wrap = styled.div`
  width: 98.5%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .main {
    color: #495057;
    font-weight: 600;
    font-size: 2rem;
  }
  .sub {
    color: #495057;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    svg {
      margin: 0 0.3rem;
    }
  }
`;

const Toggle = styled.div`
  width: 200px;
  ul {
    list-style: none;
    display: flex;
    li {
      border: 1px solid #e9edf3;
      border-bottom: none;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 10px;
      cursor: pointer;
      &:first-child {
        border-right: none;
      }
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
      }
    }
  }
  .machine_tab {
    color: ${(props: ITabProps) => props.click_tab === true && '#35a3dc'};
    font-weight: ${(props: ITabProps) => props.click_tab === true && '700'};
    border-top: ${(props: ITabProps) =>
      props.click_tab === true && '3px solid #35a3dc'};
  }
  .option_tab {
    color: ${(props: ITabProps) => props.click_tab === false && '#35a3dc'};
    font-weight: ${(props: ITabProps) => props.click_tab === false && '700'};
    border-top: ${(props: ITabProps) =>
      props.click_tab === false && '3px solid #35a3dc'};
  }
`;
