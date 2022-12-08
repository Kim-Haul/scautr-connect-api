import React, { Suspense } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import MonitoringCard from '../../components/etc/MonitoringCard';
import DountRunChart from '../../components/graph/DountRunChart';
import DountLinkChart from '../../components/graph/DountLinkChart';
import GoogleMap from '../../components/graph/GoogleMap';
import SkeletonDount from '../../components/suspense/SkeletonDount';
import SkeletonCard from '../../components/suspense/SkeletonCard';

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
            <Suspense fallback={<SkeletonDount />}>
              <DountRunChart />
            </Suspense>
          </div>
          <div className="item middle">
            <div className="title">스마트 모드링크 연동현황</div>
            <Suspense fallback={<SkeletonDount />}>
              <DountLinkChart />
            </Suspense>
          </div>
          {/* 백앤드 설계 문제로 인해 해당 컴포넌트 잠시 보류 */}
          {/* <div className="item rank">
            <DashboardRank />
          </div> */}
        </LeftContainer>
        <RightContainer>
          <div className="item upper">
            <Suspense fallback={<SkeletonCard />}>
              <MonitoringCard />
            </Suspense>
          </div>
          <div className="item lower">
            <GoogleMap />
          </div>
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
  // 우측 컨테이터가 좌측 컨테이너보다 높이가 작을 때 임시 여백 설정 및 제거
  margin-bottom: 2rem;
  @media (max-width: 1500px) {
    margin-bottom: 0;
  }
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
  .item.upper {
    background-color: #f5f7fa;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    min-height: 820px;
  }
  .item.lower {
    height: 400px;
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    margin: 2rem 0;
    position: relative;
  }
`;
