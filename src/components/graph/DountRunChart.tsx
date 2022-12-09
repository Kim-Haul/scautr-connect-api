import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';

const DountRunChart = () => {
  // 실시간 가동현황 조회 api
  const getTotalStatus = async () => {
    try {
      const res = await apis.getTotalStatus();
      return res;
    } catch (err) {
      console.log('실시간 가동현황 조회 실패');
    }
  };

  // 실시간 가동현황 조회 쿼리
  const { data: totalStatusQueryData } = useQuery(
    ['loadTotalStatusQuery'],
    getTotalStatus,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('실시간 가동현황 조회 실패');
      },
    }
  );

  const on: number = totalStatusQueryData?.data.result[0].on;
  const off: number = totalStatusQueryData?.data.result[0].off;
  const unregistered: number =
    totalStatusQueryData?.data.result[0].unregistered;
  const total: number = on / (on + off + unregistered);

  const state: any = {
    series: [on, off, unregistered],
    options: {
      chart: {
        type: 'donut',
      },
      colors: ['#00C875', '#B4B8BD', '#D5D9DF'],
      legend: {
        position: 'bottom',
      },
      labels: ['가동', '비가동', '미등록'],
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
        <div className="content_content">{Math.ceil(total * 100)}%</div>
      </div>
    </Wrap>
  );
};
export default DountRunChart;

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
