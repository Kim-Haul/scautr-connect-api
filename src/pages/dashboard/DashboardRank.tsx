import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardRankTable from '../../components/table/DashboardRankTable';

const DashboardRank = () => {
  const [view_point, setViewPoint] = useState<string>('error');
  return (
    <Wrap>
      <div className="title">
        {view_point === 'error' ? (
          <>
            <div>Top5 에러현황 랭킹</div>
            <div>
              <img
                src="/images/Ellipse_blue.png"
                alt="에러현황"
                className="left_ellipse_img"
              />
              <img
                src="/images/Ellipse_white.png"
                alt="알람현황"
                onClick={() => {
                  setViewPoint('alarm');
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>Top5 알람현황 랭킹</div>
            <div>
              <img
                src="/images/Ellipse_white.png"
                alt="에러현황"
                className="left_ellipse_img"
                onClick={() => {
                  setViewPoint('error');
                }}
              />
              <img src="/images/Ellipse_blue.png" alt="알람현황" />
            </div>
          </>
        )}
      </div>
      <DashboardRankTable view_point={view_point} />
    </Wrap>
  );
};

export default DashboardRank;
const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  .title {
    display: flex;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
    .left_ellipse_img {
      margin-right: 5px;
    }
  }
`;
