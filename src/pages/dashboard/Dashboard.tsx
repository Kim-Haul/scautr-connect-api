import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import MonitoringCard from '../../components/etc/MonitoringCard';

const Dashboard = () => {
  return (
    <Wrap>
      <Title>
        <div className="main">대시보드</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>대시보드</span>
        </div>
      </Title>
      <Container>
        <LeftContainer>
          <div className="item">1</div>
          <div className="item middle">2</div>
          <div className="item">3</div>
        </LeftContainer>
        <RightContainer>
          <div className="item">
            <MonitoringCard />
          </div>
          <div className="item lower">2</div>
        </RightContainer>
      </Container>
    </Wrap>
  );
};

export default Dashboard;

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

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 2fr;
  column-gap: 2rem;
  row-gap: 1.5rem;
  // 1500px 디스플레이 이하에서 우측 컨테이너 내부 카드 찌그러짐 방지를 위해 wrap
  @media (max-width: 1500px) {
    grid-template-columns: 100%;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .item {
    min-width: 400px;
    height: 400px;
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
  }
  .item.middle {
    margin: 2rem 0;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  .item.lower {
    height: 400px;
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    margin: 2rem 0;
  }
`;
