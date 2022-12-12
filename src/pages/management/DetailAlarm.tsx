import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Pagination5 from '../../components/pagination/Pagination5';
import { useQuery } from '@tanstack/react-query';
import { IParamsProps } from '../../shared/type/Interface';
import apis from '../../shared/apis';

const DetailAlarm = (props: IParamsProps) => {
  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 날짜 검색을 위한 3개월 이전 날짜 지정(디폴트값)
  const date = new Date();
  // 1,2월달 일 때, -2를 하면 음수로 날짜 오류 뜨는 걸 방지하기 위해 임시 날짜 형성
  const lastMonthCal = new Date();
  lastMonthCal.setMonth(lastMonthCal.getMonth() - 2);

  const year = date.getFullYear();
  const lastMonth = ('0' + lastMonthCal.getMonth()).slice(-2);
  const currentMonth = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  // type='date' input 창을 통해 날짜 핸들링
  const lastRef = useRef<HTMLInputElement | any>();
  const currentRef = useRef<HTMLInputElement | any>();

  const [lastDate, setLastDate] = useState(`${year}-${lastMonth}-${day}`);
  const [curDate, setCurDate] = useState(`${year}-${currentMonth}-${day}`);
  const [clickBtnAlarm, setClickBtnAlarm] = useState(false);

  // 알람 히스토리 호출 api
  const getAlarmHistoryData = async () => {
    try {
      const res = await apis.getAlarmHistoryData(
        props.view,
        currentPage,
        lastDate,
        curDate
      );
      return res;
    } catch (err) {
      console.log('알람 히스토리 조회에 실패했습니다.');
    }
  };

  // 알람 히스토리 호출 쿼리
  const { data: AlarmHistoryDataQuery } = useQuery(
    ['loadAlarmHistoryData', currentPage, props.view, clickBtnAlarm],
    getAlarmHistoryData,
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      staleTime: 0,
      onSuccess: () => {},
      onError: () => {
        console.error('알람 히스토리 조회에 실패했습니다.');
      },
    }
  );

  // 페이지네이션 처리를 위한 토탈값
  const total: number = AlarmHistoryDataQuery?.data.count;

  return (
    <Wrap>
      <div className="item">
        <div className="title">
          <div className="top_left">알람내역</div>
          <div className="top_right">
            <input
              type="date"
              ref={lastRef}
              onChange={() => {
                setLastDate(lastRef.current.value);
              }}
              defaultValue={lastDate}
            ></input>
            <input
              type="date"
              ref={currentRef}
              onChange={() => {
                setCurDate(currentRef.current.value);
              }}
              defaultValue={curDate}
            ></input>
            <button
              onClick={() => {
                setStartPage(1);
                setActive('1');
                setCurrentPage(1);
                setClickBtnAlarm(!clickBtnAlarm);
              }}
            >
              조회
            </button>
          </div>
        </div>
        <div className="alarm_table">
          <table>
            <thead>
              <tr>
                <th className="th0">발생일자</th>
                <th className="th1">종료여부</th>
                <th className="th2">알람내역</th>
              </tr>
            </thead>
            <tbody>
              {AlarmHistoryDataQuery?.data.result.map((v: any, i: number) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{v.ts}</td>
                      <td>{v.tf}</td>
                      <td className="value_hover">{v.name}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination5
          total={total}
          setCurrentPage={setCurrentPage}
          startPage={startPage}
          setStartPage={setStartPage}
          active={active}
          setActive={setActive}
        />
      </div>
    </Wrap>
  );
};

export default DetailAlarm;

const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  .item {
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    padding: 20px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .top_left {
        font-weight: 600;
        font-size: 1.8rem;
      }
      .top_right {
        display: flex;
        @media (max-width: 1400px) {
          display: none;
        }
        input {
          width: 120px;
          margin-right: 8px;
          padding: 5px;
        }
        button {
          font-size: 1.6rem;
          background-color: ${(props) => props.theme.color.PastelBlue};
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
    width: 12rem;
    min-width: 80px;
  }
  .th2 {
    width: 45rem;
    min-width: 350px;
  }
`;
