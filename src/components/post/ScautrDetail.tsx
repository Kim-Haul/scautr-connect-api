import React from 'react';
import styled from 'styled-components';
import { IToggleProps } from '../../shared/type/Interface';

const ScautrDetail = () => {
  return (
    <React.Fragment>
      <Content>
        <div className="row title">스카우터 서버 정기 점검 안내</div>
        <div className="row content">
          <br />
          정기적으로 서비스 안정화 작업이 진행중입니다.
          <br />
          관련 문의는 담당 부서로 연락바랍니다.
          <br />
          <br />
        </div>
      </Content>
      <Bottom>
        <div className="column">▾ 이전글</div>
        <div className="column">(이벤트)제상기능 업데이트 안내</div>
      </Bottom>
    </React.Fragment>
  );
};

export default ScautrDetail;

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
  .row.content {
    padding: 10px;
  }
`;

const Bottom = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
  display: grid;
  grid-template-columns: 150px 1fr;
  .column {
    padding: 10px;
    border: 1px solid #ced4da;
    border-top: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      border-right: none;
    }
  }
`;
