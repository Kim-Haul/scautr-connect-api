import React from 'react';
import styled from 'styled-components';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';
import { IoIosRefresh } from 'react-icons/io';
import { IParamsProps } from '../../shared/type/Interface';

const DetailState = (props: IParamsProps) => {
  // 실시간 알람 호출 api
  const getRunningAlarm = async () => {
    try {
      const res = await apis.getRunningAlarm(props.view);
      return res;
    } catch (err) {
      console.log('실시간 알람 현황을 불러오는데 실패했습니다.');
    }
  };

  // 실시간 알람 호출 쿼리
  const { data: RunningAlarmQuery } = useQuery(
    ['loadRunningAlarm', props.view],
    getRunningAlarm,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.log('실시간 알람 현황을 불러오는데 실패했습니다.');
      },
    }
  );

  // 실시간 에러 호출 api
  const getRunningError = async () => {
    try {
      const res = await apis.getRunningError(props.view);
      return res;
    } catch (err) {
      console.log('실시간 에러 현황을 불러오는데 실패했습니다.');
    }
  };

  // 실시간 에러 호출 쿼리
  const { data: RunningErrorQuery } = useQuery(
    ['loadRunningError', props.view],
    getRunningError,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.log('실시간 에러 현황을 불러오는데 실패했습니다.');
      },
    }
  );

  // 현재 시간 출력
  const time = new Date();
  let hours = ('0' + time.getHours()).slice(-2);
  let minutes = ('0' + time.getMinutes()).slice(-2);
  let seconds = ('0' + time.getSeconds()).slice(-2);

  return (
    <Wrap>
      {/* -------------- 실시간 알람 -------------- */}
      <div className="item input_data">
        <div className="title">
          <div className="top_left">
            <img src="/images/alarm.svg" alt="알람 아이콘" />
            <span>실시간 알람</span>
          </div>
          <div className="top_right">
            <span>
              <IoIosRefresh
                onClick={() => {
                  window.location.reload();
                }}
              />
            </span>
            <span>
              최근 업데이트 : {hours}:{minutes}:{seconds}
            </span>
          </div>
        </div>
        <div className="input_data_table">
          <table>
            <thead>
              <tr>
                <th className="th0">발생일자</th>
                <th className="th1">내역</th>
              </tr>
            </thead>
            <tbody>
              {RunningAlarmQuery?.data.result.map((v: any, i: number) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{v.ts}</td>
                      <td className="value_hover">{v.name}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {RunningAlarmQuery?.data.result.length === 0 ? (
            <span className="exist_desc">현재 발생중인 알람이 없습니다.</span>
          ) : null}
        </div>
      </div>
      {/* -------------- 실시간 에러 -------------- */}
      <div className="item output_data">
        <div className="title">
          <div className="top_left">
            <img src="/images/error.svg" alt="에러 아이콘" />
            <span>실시간 에러</span>
          </div>
        </div>
        <div className="output_data_table">
          <table>
            <thead>
              <tr>
                <th className="th0">발생일자</th>
                <th className="th1">내역</th>
              </tr>
            </thead>
            <tbody>
              {RunningErrorQuery?.data.result.map((v: any, i: number) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{v.ts}</td>
                      <td className="value_hover">{v.name}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {RunningErrorQuery?.data.result.length === 0 ? (
            <span className="exist_desc">현재 발생중인 에러가 없습니다.</span>
          ) : null}
        </div>
      </div>
    </Wrap>
  );
};

export default DetailState;
const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(49%, auto));
  column-gap: 2rem;
  row-gap: 2rem;
  // parameter 값이 중간 item이라 위아래 마진을 줬었는데, 이 컴포넌트가 추가되면서 아래 마진 추가
  margin-bottom: 2rem;
  .item {
    /* position: relative; */
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    &:hover {
      border: 1px solid #35a3dc;
    }
    padding: 20px;
    // 데이터양에 따른 사이즈 조절 및 스크롤 설정
    max-height: 400px;
    overflow-y: auto;
    .title {
      display: flex;
      justify-content: space-between;
      .top_left {
        font-weight: 600;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        img {
          width: 30px;
          margin-right: 5px;
          &:hover {
            filter: brightness(90%);
          }
        }
      }
      .top_right {
        display: flex;
        align-items: center;
        color: #35a3dc;
        svg {
          margin-top: 5px;
          margin-right: 5px;
          cursor: pointer;
        }
        span {
          @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
            font-size: 1.2rem;
          }
        }
      }
    }
    table {
      @media (max-width: 1400px) {
        display: none;
      }
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }
    th {
      padding: 10px;
      background-color: #fff;
      border: 1px solid #ced4da;
    }
    td {
      padding: 10px;
      border: 1px solid #ced4da;
      text-align: center;
    }
    .value_hover {
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
      }
    }
    .th0 {
      width: 12rem;
      min-width: 80px;
    }
    .th1 {
      width: 24rem;
      min-width: 160px;
    }
    .exist_desc {
      color: blue;
      font-size: 1.4rem;
    }
  }
`;
