import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apis from '../../shared/apis';

import { IMonitoringCardProps } from '../../shared/type/Interface';

const MonitoringCard = () => {
  const navigate = useNavigate();
  // 모델별 가동현황 조회 api
  const getModelCardList = async () => {
    try {
      const res = await apis.getModelCardList();
      return res;
    } catch (err) {
      console.log('모델별 상태 카드를 불러오는데 실패했습니다.');
    }
  };

  // 모델별 가동현황 조회 쿼리
  const { data: ModelCardListQueryData } = useQuery(
    ['loadModelCardListQuery'],
    getModelCardList,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('모델별 상태 카드를 불러오는데 실패했습니다.');
      },
    }
  );

  // 모델별 가동사항 즐겨찾기
  const queryClient = useQueryClient();
  const toogleBookmark = async (id: number) => {
    try {
      const res = await apis.toogleBookmark(id);
      return res;
    } catch (err) {
      console.log('호출에러');
      alert(
        '즐겨찾기 등록에 실패했습니다. 관련 문제가 지속되면 관리자에게 문의 바랍니다.'
      );
    }
  };

  const { mutate: toogleBookmarkMutation } = useMutation(toogleBookmark, {
    onSuccess: () => {
      alert('즐겨찾기로 등록/해제 되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['loadModelCardListQuery'] });
    },
  });

  return (
    <Wrap>
      <Card>
        {ModelCardListQueryData?.data.result.map(
          (v: IMonitoringCardProps, i: number) => {
            return (
              <React.Fragment key={i}>
                <div className="wrap">
                  <div className="top">
                    <div className="top_left">
                      <div
                        className="top_left_title"
                        onClick={() => {
                          navigate(
                            `/scautr/management?search=${v.model}&searchType=all`
                          );
                        }}
                      >
                        {v.model}
                      </div>
                      <div className="top_left_sub">{v.assignedName}</div>
                    </div>
                    <div className="top_right">
                      {v.boardMark === 1 ? (
                        <img
                          src="/images/exclamation-thick-fill.png"
                          alt="즐겨찾기"
                          onClick={() => {
                            toogleBookmarkMutation(v.modelId);
                          }}
                        />
                      ) : (
                        <img
                          src="/images/exclamation-thick.png"
                          alt="즐겨찾기"
                          onClick={() => {
                            toogleBookmarkMutation(v.modelId);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="middle">
                    <div className="middle_left">
                      <div className="middle_left_title">장비수량</div>
                      <div className="middle_left_sub">{v.equipmentCnt}개</div>
                    </div>
                    <div className="middle_right">
                      <button
                        className="alarm"
                        onClick={() => {
                          navigate(
                            `/scautr/management?search=${v.model}&searchType=all`
                          );
                        }}
                      >
                        <span className="alarm_title">알람</span>
                        <span className="alarm_content">{v.alarm}</span>
                      </button>
                      <button
                        className="error"
                        onClick={() => {
                          navigate(
                            `/scautr/management?search=${v.model}&searchType=all`
                          );
                        }}
                      >
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
                      <div className="bottom_sub">{v.on}</div>
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
                      <div className="bottom_sub">{v.unregistered}</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          }
        )}
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
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  column-gap: 1rem;
  row-gap: 1rem;
  // 1800px 디스플레이 이상에서 카드를 4개씩
  @media (min-width: 1800px) {
    // 남은 공간을 자동으로 채워주는 auto-fit은 살짝 어색해서 auto-fill으로
    // grid-template-columns: repeat(auto-fit, minmax(20%, auto));
    grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  }
  // 950px 디스플레이 이하에서 카드를 2개씩
  @media (max-width: 950px) {
    grid-template-columns: repeat(auto-fill, minmax(40%, auto));
  }
  .wrap {
    background-color: #fff;
    border: 1px solid #e1e1e1;
    min-height: 260px;
    display: grid;
    grid-template-rows: min-height(70px) min-height(120px) 1fr;
    .top {
      min-height: 70px;
      padding: 10px;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top_left_title {
        font-weight: 700;
        font-size: 2.08rem;
        &:hover {
          color: #35a3dc;
          cursor: pointer;
        }
      }
      .top_right {
        img {
          cursor: pointer;
        }
      }
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
      }
    }
    .middle {
      min-height: 120px;
      padding: 10px;
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
          // 백앤드 설계 문제로 인하여 버튼 hover 효과 및 cursor 임시 보류
          /* cursor: default;
          &:hover {
            filter: none;
          } */
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
      min-height: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
