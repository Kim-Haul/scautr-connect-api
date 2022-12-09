import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Pagination10 from '../pagination/Pagination10';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';
import {
  IRegistrationMachineTableProps,
  IRegistrationMachineProps,
} from '../../shared/type/Interface';
import RegistrationMachineModal from '../modal/RegistrationMachineModal';

const RegistrationMachineTable = (props: IRegistrationMachineProps) => {
  const navigate = useNavigate();

  // 현재 페이지 상태값 및 시작 & 엑티브 페이지 상태값 저장
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  // 내용 수정을 위한 현재값 저장
  const [info, setInfo] = useState<any>({});
  // 수정 모달창 토글
  const [is_open_edit, setIsOpenEdit] = useState<boolean>(false);

  // 등록된 설비 목록 호출 api
  const getRegistrationModel = async () => {
    try {
      const res = await apis.getRegistrationModel(
        currentPage,
        props.searchTypeUrl,
        props.searchInputUrl
      );
      return res;
    } catch (err) {
      console.log('등록된 설비 목록을 불러오는데 실패했습니다.');
    }
  };

  // 등록된 설비 목록 호출 쿼리
  const { data: registrationModelQuery } = useQuery(
    [
      'loadRegistrationModel',
      currentPage,
      props.searchTypeUrl,
      props.searchInputUrl,
    ],
    getRegistrationModel,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('등록된 설비 목록을 불러오는데 실패했습니다.');
      },
    }
  );

  // 검색, 초기화시 Pagination10 컴포넌트 상태 초기화
  useEffect(() => {
    setCurrentPage(1);
    setStartPage(1);
    setActive('1');
  }, [props.searchInputUrl]);

  // 페이지네이션 처리를 위한 토탈값
  const total = registrationModelQuery?.data.count;

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0"></th>
            <th className="th1"></th>
            <th className="th2">그룹</th>
            <th className="th3">기계명</th>
            <th className="th4">모델명</th>
            <th className="th5">권장사용기간</th>
            <th className="th6">사용</th>
            <th className="th7">파일첨부</th>
            <th className="th8">등록일</th>
          </tr>
        </thead>
        <tbody>
          {registrationModelQuery?.data.result.map(
            (v: IRegistrationMachineTableProps, i: number) => {
              return (
                <React.Fragment key={i}>
                  <tr
                    onClick={() => {
                      setInfo({
                        assignedName: v.assignedName,
                        model: v.model,
                        modelId: v.modelId,
                        color: v.color,
                        lifeSpan: v.lifeSpan,
                        note: v.note,
                        templateId: v.templateId,
                        multipartFile: v.files[0]?.name,
                        delfiles: v.files[0]?.fileId,
                      });
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        id={String(v.modelId)}
                        checked={props.checkBoxArr.includes(Number(v.modelId))}
                        onClick={(e) => {
                          props.clickCheckBox(e);
                        }}
                        readOnly
                      />
                    </td>
                    <td>{v.no}</td>
                    <td>{v.template}</td>
                    <td
                      className="preview_color_td"
                      onClick={() => {
                        setIsOpenEdit(true);
                      }}
                    >
                      {v.assignedName}
                      <div
                        className="circle"
                        style={{ backgroundColor: v.color }}
                      ></div>
                    </td>
                    <td
                      className="nav_model"
                      onClick={() => {
                        if (v.equipmentCnt! > 0) {
                          navigate(
                            `/scautr/management?search=${v.model}&searchType=all`
                          );
                        }
                      }}
                    >
                      {v.model}
                    </td>
                    <td>{v.lifeSpan}개월</td>
                    <td>{v.equipmentCnt}대</td>
                    <td
                      className="file_download"
                      onClick={() => {
                        if (v.files[0]?.name === undefined) {
                          return;
                        } else {
                          window.open(
                            `${process.env.REACT_APP_S3_FILE_UPLOAD}/${v.files[0]?.saveName}`
                          );
                        }
                      }}
                    >
                      {v.files[0]?.name.length >= 27
                        ? v.files[0]?.name.substr(0, 28) + '...'
                        : v.files[0]?.name}
                    </td>
                    <td>{v.regdate}</td>
                  </tr>
                </React.Fragment>
              );
            }
          )}
        </tbody>
      </table>

      {/* 수정모달 */}
      <RegistrationMachineModal
        open={is_open_edit}
        setIsOpen={setIsOpenEdit}
        info={info}
        header="기기 정보 수정"
      />

      <Pagination10
        total={total}
        setCurrentPage={setCurrentPage}
        startPage={startPage}
        setStartPage={setStartPage}
        active={active}
        setActive={setActive}
      />
    </Wrap>
  );
};

export default RegistrationMachineTable;

const Wrap = styled.div`
  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
    // 화면 축소시 테이블 column 깨지는거 방지
    @media (max-width: 1400px) {
      display: none;
    }
    th {
      padding: 10px;
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
    }
    .th0 {
      width: 5rem;
    }
    .th1 {
      width: 5rem;
    }
    .th2 {
      width: 10rem;
    }
    .th3 {
      width: 30rem;
    }
    .th4 {
      width: 30rem;
    }
    .th5 {
      width: 15rem;
    }
    .th6 {
      width: 10rem;
    }
    .th7 {
      width: 30rem;
    }
    .th8 {
      width: 15rem;
    }
  }
  td {
    padding: 10px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
    .file_download {
      color: #bbbbbb;
      &:hover {
        color: #35a3dc;
        text-decoration: underline;
        text-underline-position: under;
      }
    }
    .preview_color_td {
      // td에 클래스명을 주니 기존에 td에 부여된 border가 중복으로 보이는 현상 핸들링
      border: none;
      border-bottom: 1px solid #e9edf3;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: gray;
        margin-top: 2px;
        margin-left: 8px;
      }
      &:hover {
        color: #35a3dc;
      }
    }
    .nav_model {
      &:hover {
        color: #35a3dc;
      }
    }
  }
`;
