import React from 'react';
import styled from 'styled-components';

const MonitoringCard = () => {
  const registration_query = [
    {
      machine: '자동열성형진공포장기',
      model: 'GP260',
      total: 36,
      alarm: 122,
      error: 3,
      run: 34,
      off: 0,
      unconnected: 2,
    },
    {
      machine: '자동열성형진공포장기',
      model: 'GP460',
      total: 59,
      alarm: 211,
      error: 3,
      run: 54,
      off: 5,
      unconnected: 0,
    },
    {
      machine: '스크류콤프레샤',
      model: 'ESS30',
      total: 72,
      alarm: 44,
      error: 2,
      run: 70,
      off: 1,
      unconnected: 1,
    },
    {
      machine: '의료용냉장고',
      model: 'CBR-150-1430',
      total: 321,
      alarm: 552,
      error: 11,
      run: 318,
      off: 3,
      unconnected: 0,
    },
    {
      machine: '스크류콤프레샤',
      model: 'ESS50',
      total: 88,
      alarm: 89,
      error: 4,
      run: 88,
      off: 0,
      unconnected: 0,
    },
    {
      machine: '의료용냉장고',
      model: 'CBR-110-15-0',
      total: 321,
      alarm: 552,
      error: 11,
      run: 318,
      off: 3,
      unconnected: 0,
    },
    {
      machine: '자동열성형진공포장기',
      model: 'GP260',
      total: 36,
      alarm: 122,
      error: 3,
      run: 34,
      off: 0,
      unconnected: 2,
    },
    {
      machine: '자동열성형진공포장기',
      model: 'GP460',
      total: 59,
      alarm: 211,
      error: 3,
      run: 54,
      off: 5,
      unconnected: 0,
    },
    {
      machine: '스크류콤프레샤',
      model: 'ESS30',
      total: 72,
      alarm: 44,
      error: 2,
      run: 70,
      off: 1,
      unconnected: 1,
    },
    {
      machine: '의료용냉장고',
      model: 'CBR-150-1430',
      total: 321,
      alarm: 552,
      error: 11,
      run: 318,
      off: 3,
      unconnected: 0,
    },
    {
      machine: '스크류콤프레샤',
      model: 'ESS50',
      total: 88,
      alarm: 89,
      error: 4,
      run: 88,
      off: 0,
      unconnected: 0,
    },
    {
      machine: '의료용냉장고',
      model: 'CBR-110-15-0',
      total: 321,
      alarm: 552,
      error: 11,
      run: 318,
      off: 3,
      unconnected: 0,
    },
    {
      machine: '자동열성형진공포장기',
      model: 'GP460',
      total: 59,
      alarm: 211,
      error: 3,
      run: 54,
      off: 5,
      unconnected: 0,
    },
    {
      machine: '스크류콤프레샤',
      model: 'ESS30',
      total: 72,
      alarm: 44,
      error: 2,
      run: 70,
      off: 1,
      unconnected: 1,
    },
    {
      machine: '의료용냉장고',
      model: 'CBR-150-1430',
      total: 321,
      alarm: 552,
      error: 11,
      run: 318,
      off: 3,
      unconnected: 0,
    },
  ];

  return (
    <Wrap>
      <Card>
        {registration_query.map((v, i) => {
          return (
            <React.Fragment key={i}>
              <div className="wrap">
                <div className="top">
                  <div className="top_left">
                    <div className="top_left_title">{v.model}</div>
                    <div className="top_left_sub">{v.machine}</div>
                  </div>
                  <div className="top_right">
                    <img src="/images/exclamation-thick.png" alt="즐겨찾기" />
                  </div>
                </div>
                <div className="middle">
                  <div className="middle_left">
                    <div className="middle_left_title">장비수량</div>
                    <div className="middle_left_sub">{v.total}개</div>
                  </div>
                  <div className="middle_right">
                    <button className="alarm">
                      <span className="alarm_title">알람</span>
                      <span className="alarm_content">{v.alarm}</span>
                    </button>
                    <button className="error">
                      <span className="error_title">에러</span>
                      <span className="error_content">{v.error}</span>
                    </button>
                  </div>
                </div>
                <div className="bottom">
                  <div className="run">
                    <div className="bottom_title">
                      <div className="img">
                        <img src="/images/green_circle.png" alt="즐겨찾기" />
                      </div>
                      <span>가동</span>
                    </div>
                    <div className="bottom_sub">{v.run}</div>
                  </div>
                  <div className="stop">
                    <div className="bottom_title">
                      <div className="img">
                        <img src="/images/gray_circle.png" alt="즐겨찾기" />
                      </div>
                      <span>비가동</span>
                    </div>
                    <div className="bottom_sub">{v.off}</div>
                  </div>
                  <div className="unconnect">
                    <div className="bottom_title">
                      <div className="img">
                        <img src="/images/orange_circle.png" alt="즐겨찾기" />
                      </div>
                      <span>미등록</span>
                    </div>
                    <div className="bottom_sub">{v.unconnected}</div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </Card>
    </Wrap>
  );
};

export default MonitoringCard;

const Wrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
  display: grid;
  // 기본 디스플레이에서 카드를 3개씩
  grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  column-gap: 2rem;
  row-gap: 2rem;

  // 1800px 디스플레이 이상에서 카드를 4개씩
  @media (min-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  }

  // 950px 디스플레이 이하에서 카드를 2개씩
  @media (max-width: 950px) {
    grid-template-columns: repeat(auto-fit, minmax(40%, auto));
    column-gap: 1.5rem;
    row-gap: 1.5rem;
  }
  .wrap {
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    .top {
      padding: 10px;
      // 화면을 줄였을 때, div 밖으로 튀어나오 방지 || 유동적인 크기를 위해 height 안줌
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top_left_title {
        font-weight: 700;
        font-size: 2.08rem;
      }
      .top_right {
        img {
          cursor: pointer;
        }
      }
    }
    .middle {
      padding: 10px;
      height: 100px;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .middle_left_sub {
        font-weight: 700;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
      }
      .middle_right {
        display: flex;
        flex-direction: column;
        button {
          border-radius: 16px;
          padding: 5px;
          // 유동적인 크기를 위해 width 안줌
        }
        .alarm {
          border: 1px solid #a25ddc;
          background-color: #f6effc;
          margin-bottom: 4px;
          .alarm_title {
            color: #a25ddc;
            font-weight: 500;
            margin-right: 5px;
            font-family: 'Noto Sans KR';
          }
          .alarm_content {
            color: #a25ddc;
            font-weight: 700;
            font-family: 'Noto Sans KR';
          }
        }
        .error {
          border: 1px solid #e2445c;
          background-color: #fdeaed;
          .error_title {
            color: #e2445c;
            font-weight: 500;
            margin-right: 5px;
            font-family: 'Noto Sans KR';
          }
          .error_content {
            color: #e2445c;
            font-weight: 700;
            font-family: 'Noto Sans KR';
          }
        }
      }
    }
    .bottom {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      height: 50px;
      .run,
      .stop {
        border-right: 1px solid #e1e1e1;
      }
      .run,
      .stop,
      .unconnect {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bottom_title {
          color: #6a6e7f;
          font-size: 1.22rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .img {
            margin-right: 3px;
            display: flex;
          }
        }
        .bottom_sub {
          margin-top: -3px;
          font-weight: 700;
        }
      }
    }
  }
`;
