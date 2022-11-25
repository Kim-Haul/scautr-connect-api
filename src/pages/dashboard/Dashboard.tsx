import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import MonitoringCard from '../../components/etc/MonitoringCard';
import Dount from '../../components/graph/Dount';
import DashboardRank from './DashboardRank';

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
          <div className="item">
            <div className="title">실시간 가동현황</div>
            <Dount />
          </div>
          <div className="item middle">2</div>
          <div className="item rank">
            <DashboardRank />
          </div>
        </LeftContainer>
        <RightContainer>
          <div className="item">
            <MonitoringCard />
          </div>
          <div className="item lower"></div>
        </RightContainer>
      </Container>
    </Wrap>
  );
};

export default Dashboard;

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
    // min-wdith 설정시 모바일 크기에서 가로 스크롤이 생겨 일단 삭제
    height: 400px;
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    padding: 1rem;
  }
  .item.middle {
    margin: 2rem 0;
  }
  .title {
    font-weight: 700;
    font-size: 1.8rem;
  }
  .item.rank {
    @media (max-width: 1500px) {
      height: auto;
    }
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
