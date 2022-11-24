import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const Dount = () => {
  const on: number = 32;
  const off: number = 11;
  const unconnection: number = 2;
  const run: number = on / (on + off + unconnection);

  const state: any = {
    series: [on, off, unconnection],
    options: {
      chart: {
        type: 'donut',
      },
      colors: ['#00C875', '#B4B8BD', '#D5D9DF'],
      legend: {
        position: 'bottom',
      },
      labels: ['가동', '비가동', '에러'],
    },
  };

  return (
    <Wrap>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width="100%"
        height="400px"
      />
      <div className="content">
        <div className="content_title">가동현황</div>
        <div className="content_content">{Math.ceil(run * 100)}%</div>
      </div>
    </Wrap>
  );
};
export default Dount;

const Wrap = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 2.5rem;

  .content {
    position: absolute;
    top: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content_title {
      font-size: 1.8rem;
    }
    .content_content {
      font-weight: 700;
      font-size: 2.2rem;
    }
  }
`;
