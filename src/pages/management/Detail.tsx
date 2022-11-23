import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import DetailCustomerInfo from '../../components/table/DetailCustomerInfo';
import DetailMachineInfo from '../../components/table/DetailMachineInfo';
import DetailManagementInfo from '../../components/table/DetailManagementInfo';
import Mobile from '../../components/exception/Mobile';
import IoTable from '../../components/table/IoTable';
import ParameterTable from '../../components/table/ParameterTable';

const Detail = () => {
  return (
    <Wrap>
      <Title>
        <div className="main">설비관리</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>설비관리</span>
          <IoIosArrowForward /> <span>상세보기</span>
        </div>
      </Title>
      <Container>
        <Top>
          <DetailCustomerInfo />
          <DetailMachineInfo />
          <DetailManagementInfo />
          <Mobile />
        </Top>
        <div className="contour">
          <div>실시간 데이터 모니터링</div>
        </div>
        <Content>
          <IoTable />
          <ParameterTable />
        </Content>
      </Container>
    </Wrap>
  );
};

export default Detail;

const Wrap = styled.div`
  width: 98.5%;
  font-size: 1.6rem;
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

const Container = styled.div`
  .contour {
    background-color: #222a3e;
    border-radius: 5px;
    width: 100%;
    height: 6rem;
    font-size: 2rem;
    margin: 2rem 0;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;
const Top = styled.div`
  width: 100%;
  background-color: #f5f7fa;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  padding: 20px;
  // 모바일 사이즈에 보여줄 gif 배경이 흰색이라 일단은 조건부 렌더링
  @media (max-width: 1400px) {
    background-color: #fff;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    td {
      padding: 10px;
      border: 1px solid #ced4da;
      background-color: #fff;
    }
    .table_title {
      text-align: center;
      font-weight: 600;
    }
    .table_content {
      padding-left: 20px;
      color: #747a80;
    }

    .th0 {
      width: 20rem;
      min-width: 100px;
    }
    .th1 {
      width: 60rem;
      min-width: 300px;
    }
    .th2 {
      width: 20rem;
      min-width: 100px;
    }
    .th3 {
      width: 60rem;
      min-width: 300px;
    }
  }
`;
const Content = styled.div``;
