import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';

const DountLinkChart = () => {
  // 스마트 모드링크 연동현황 조회
  const getModlinkConnection = async () => {
    try {
      const res = await apis.getModlinkConnection();
      return res;
    } catch (err) {
      console.log('스마트 모드링크 연동현황 조회 실패');
    }
  };

  // 스마트 모드링크 연동현황 조회 쿼리
  const { data: ModlinkConnectionQueryData } = useQuery(
    ['loadModlinkConnectionQuery'],
    getModlinkConnection,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('스마트 모드링크 연동현황 조회 실패');
      },
    }
  );

  const connected: number = ModlinkConnectionQueryData?.data.result[0].connected
  const unconnected: number = ModlinkConnectionQueryData?.data.result[0].unconnected
  const total: number =  connected / (connected + unconnected);

  const state: any = {
    series: [connected, unconnected],
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
        <div className="content_content">{Math.ceil(total * 100)}%</div>
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
