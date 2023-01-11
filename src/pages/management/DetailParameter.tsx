import React, { Suspense, useState, useRef } from 'react';
import styled from 'styled-components';
import DetailParameterHistoryTable from '../../components/table/DetailParameterHistoryTable';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';
import { IParamsProps } from '../../shared/type/Interface';
import SkeletonItemSingleSm from '../../components/suspense/SkeletonItemSingleSm';
import { AiOutlineClose } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';

const DetailParameter = (props: IParamsProps) => {
  // plc 입력, 출력 검색 키워드 핸들링
  const [searchParameter, setSearchParameter] = useState<string>('');
  const [search, setSearch] = useState<boolean>(false);

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();
  // plc 입력, 출력 검색창 핸들링
  const invalidateCashParameter = () => {
    setSearch(!search);
    queryClient.removeQueries({
      queryKey: ['loadParameterData'],
    });
  };

  const parameterEl = useRef<HTMLInputElement>(null);

  // 기계 세팅 값 호출 api
  const getParameterData = async () => {
    try {
      const res = await apis.getParameterData(props.view, searchParameter);
      return res;
    } catch (err) {
      console.log('기계 세팅 값을 불러오는데 실패했습니다.');
    }
  };

  // 기계 세팅 값 호출 쿼리
  const { data: ParameterDataQuery } = useQuery(
    ['loadParameterData', props.view, search],
    getParameterData,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('기계 세팅 값을 불러오는데 실패했습니다.');
      },
    }
  );

  return (
    <Wrap>
      {/* -------------- 기계 세팅 값 -------------- */}
      <div className="item parameter_data">
        <div className="title">
          <div className="top_left">기계 세팅 값</div>
          <div className="top_right">
            <div className="input_wrap">
              <input
                type="text"
                placeholder="검색"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchParameter(e.target.value);
                }}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    invalidateCashParameter();
                  }
                }}
                ref={parameterEl}
              />
              {searchParameter.length > 0 ? (
                <AiOutlineClose
                  onClick={() => {
                    setSearchParameter('');
                    setSearch(!search);
                    if (parameterEl.current) {
                      parameterEl.current.value = '';
                    }
                  }}
                />
              ) : null}
            </div>
            <button
              onClick={() => {
                invalidateCashParameter();
              }}
            >
              검색
            </button>
          </div>
        </div>
        <div className="input_data_table">
          <table>
            <thead>
              <tr>
                <th className="th0">동작</th>
                <th className="th1">IO</th>
                <th className="th2">상태</th>
                <th className="th3">단위</th>
              </tr>
            </thead>
            <tbody>
              {ParameterDataQuery?.data.result.map((v: any, i: number) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{v.name}</td>
                      <td>{v.uid}</td>
                      <td className="value_hover">{v.value}</td>
                      <td>{v.unit}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* -------------- 세팅 값 변경 이력 -------------- */}
      <Suspense fallback={<SkeletonItemSingleSm />}>
        <DetailParameterHistoryTable view={props.view} />
      </Suspense>
    </Wrap>
  );
};

export default DetailParameter;
const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(49%, auto));
  column-gap: 2rem;
  row-gap: 2rem;
  // 파라미터 컴포넌트의 item이 중간에 위치하니, 위아래 마진 주기
  margin: 2rem 0;
  .item {
    /* position: relative; */
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    &:hover {
      border: 1px solid #35a3dc;
    }
    padding: 20px;
    // 데이터양에 따른 사이즈 조절 및 스크롤 설정
    max-height: 410px;
    overflow-y: auto;
    .title {
      display: flex;
      justify-content: space-between;
      .top_left {
        font-weight: 600;
        font-size: 1.8rem;
      }
      .top_right {
        display: flex;
        gap: 10px;
        .input_wrap {
          border: 1px solid #e9edf3;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 170px;
          input {
            border: none;
            font-size: 1.4rem;
            &:focus {
              outline: none;
            }
            &:focus::placeholder {
              color: transparent;
            }
            width: 80%;
            height: 100%;
          }
          svg {
            cursor: pointer;
          }
        }

        button {
          background-color: #35a3dc;
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
      width: 25rem;
      min-width: 160px;
    }
    .th1 {
      width: 10rem;
      min-width: 80px;
    }
    .th2 {
      width: 25rem;
      min-width: 160px;
    }
    .th3 {
      width: 10rem;
      min-width: 80px;
    }
    .th4 {
      width: 25rem;
      min-width: 170px;
    }
    .th5 {
      width: 25rem;
      min-width: 170px;
    }
    .th6 {
      width: 10rem;
      min-width: 80px;
    }
    .th7 {
      width: 10rem;
      min-width: 80px;
    }
  }
`;
