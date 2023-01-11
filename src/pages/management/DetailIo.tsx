import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';
import { IParamsProps } from '../../shared/type/Interface';
import { useQueryClient } from '@tanstack/react-query';
import { AiOutlineClose } from 'react-icons/ai';

const DetailIo = (props: IParamsProps) => {
  // plc 입력, 출력 검색 키워드 핸들링
  const [searchInputKeyword, setSearchInputKeyword] = useState<string>('');
  const [searchOutputKeyword, setSearchOutputKeyword] = useState<string>('');
  const [searchInput, setSearchInput] = useState<boolean>(false);
  const [searchOutput, setSearchOutput] = useState<boolean>(false);

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();
  // plc 입력, 출력 검색창 핸들링
  const invalidateCashInput = () => {
    setSearchInput(!searchInput);
    queryClient.removeQueries({ queryKey: ['loadPlcInputData'] });
  };

  const invalidateCashOutput = () => {
    setSearchOutput(!searchOutput);
    queryClient.removeQueries({ queryKey: ['loadPlcOutputData'] });
  };

  const inputEl = useRef<HTMLInputElement>(null);
  const outputEl = useRef<HTMLInputElement>(null);

  // plc 입력 호출 api
  const plcInputData = async () => {
    try {
      const res = await apis.plcInputData(props.view, searchInputKeyword);
      return res;
    } catch (err) {
      console.log('설비 입력값을 불러오는데 실패했습니다.');
    }
  };

  // plc 입력 호출 쿼리
  const { data: plcInputDataQuery } = useQuery(
    ['loadPlcInputData', props.view, searchInput],
    plcInputData,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('설비 입력값을 불러오는데 실패했습니다.');
      },
    }
  );

  // plc 출력 호출 api
  const plcOutputData = async () => {
    try {
      const res = await apis.plcOutputData(props.view, searchOutputKeyword);
      return res;
    } catch (err) {
      console.log('설비 출력값을 불러오는데 실패했습니다.');
    }
  };

  // plc 출력 호출 쿼리
  const { data: plcOutputDataQuery } = useQuery(
    ['loadPlcOutputData', props.view, searchOutput],
    plcOutputData,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('설비 출력값을 불러오는데 실패했습니다.');
      },
    }
  );

  return (
    <Wrap>
      {/* -------------- 입력값 -------------- */}
      <div className="item input_data">
        <div className="title">
          <div className="top_left">입력값</div>
          <div className="top_right">
            <div className="input_wrap">
              <input
                type="text"
                placeholder="검색"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchInputKeyword(e.target.value);
                }}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    invalidateCashInput();
                  }
                }}
                ref={inputEl}
              />
              {searchInputKeyword.length > 0 ? (
                <AiOutlineClose
                  onClick={() => {
                    setSearchInputKeyword('');
                    setSearchInput(!searchInput);
                    if (inputEl.current) {
                      inputEl.current.value = '';
                    }
                  }}
                />
              ) : null}
            </div>
            <button
              onClick={() => {
                invalidateCashInput();
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
              {plcInputDataQuery?.data.result.map((v: any, i: number) => {
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
      {/* -------------- 출력값 -------------- */}
      <div className="item output_data">
        <div className="title">
          <div className="top_left">출력값</div>
          <div className="top_right">
            <div className="input_wrap">
              <input
                type="text"
                placeholder="검색"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchOutputKeyword(e.target.value);
                }}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    invalidateCashOutput();
                  }
                }}
                ref={outputEl}
              />
              {searchOutputKeyword.length > 0 ? (
                <AiOutlineClose
                  onClick={() => {
                    setSearchOutputKeyword('');
                    setSearchOutput(!searchOutput);
                    if (outputEl.current) {
                      outputEl.current.value = '';
                    }
                  }}
                />
              ) : null}
            </div>
            <button
              onClick={() => {
                invalidateCashOutput();
              }}
            >
              검색
            </button>
          </div>
        </div>
        <div className="output_data_table">
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
              {plcOutputDataQuery?.data.result.map((v: any, i: number) => {
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
    </Wrap>
  );
};

export default DetailIo;
const Wrap = styled.div`
  width: 100%;
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(49%, auto));
  column-gap: 2rem;
  row-gap: 2rem;
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
  }
`;
