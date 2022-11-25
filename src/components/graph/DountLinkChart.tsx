import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const DountLinkChart = () => {
  const on: number = 48;
  const off: number = 5;
  const run: number = on / (on + off);

  const state: any = {
    series: [on, off],
    options: {
      chart: {
        type: 'donut',
      },
      colors: ['#579BFC', '#ABCDFE'],
      legend: {
        position: 'bottom',
      },
      labels: ['연동', '비연동'],
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
        <div className="content_title">연동현황</div>
        <div className="content_content">{Math.ceil(run * 100)}%</div>
      </div>
    </Wrap>
  );
};
export default DountLinkChart;

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
