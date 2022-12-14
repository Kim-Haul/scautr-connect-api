import React, { useState, useRef, useEffect, Suspense } from 'react';
import styled from 'styled-components';
// import Mobile from '../../components/exception/Mobile';
import RegistrationMachineTable from '../../components/table/RegistrationMachineTable';
import RegistrationMachineModal from './../../components/modal/RegistrationMachineModal';
import SkeletonTable from '../../components/suspense/SkeletonTable';
import { useSearchParams } from 'react-router-dom';
import { IRegistrationProps } from '../../shared/type/Interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from '../../shared/apis';

const RegistrationMachine = (props: IRegistrationProps) => {
  // 등록 모달창 토글
  const [is_open, setIsOpen] = useState<boolean>(false);

  // 검색 input, 조건 select 상태관리
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('all');
  // 검색 초기화시 input, select 초기화
  const inputRef = useRef<HTMLInputElement | any>(null);
  const selectRef = useRef<HTMLSelectElement | any>(null);
  // 클라이언트단 url parameter 설정
  const [searchParams, setSearchParams] = useSearchParams('');
  const searchTypeUrl = searchParams.get('searchType') || 'all';
  const searchInputUrl = searchParams.get('search') || '';

  // 체크박스 컨트롤
  const [checkBoxArr, setCheckBoxArr] = useState<number[]>([]);
  const clickCheckBox = (e: React.MouseEvent<HTMLInputElement> | any) => {
    checkBoxArr.includes(Number(e.target.id))
      ? setCheckBoxArr(checkBoxArr.filter((v) => v !== Number(e.target.id)))
      : setCheckBoxArr([...checkBoxArr, Number(e.target.id)]);
  };

  // 기계 모델 선택 삭제 api
  const deleteRegistrationModel = async () => {
    const list = {
      modelId: checkBoxArr,
    };

    try {
      const res = await apis.deleteRegistrationModel(list);
      setCheckBoxArr([]);
      return res;
    } catch (e: any) {
      if (e.response.data.message === 'EQUIPMENT_FOUND_ERR') {
        alert(
          '기존에 등록되어 있는 기기입니다.\n설비관리 탭에서 관련 기기들을 먼저 삭제 후 다시 진행해 주세요.'
        );
      } else if (e.response?.data.message === 'DEMO_NOTALLOWED_ERR') {
        alert('데모계정은 일부 기능이 제한됩니다.');
      } else {
        alert(
          '삭제에 실패했습니다. 관련 문제가 지속되면 관리자에게 문의 바랍니다.'
        );
      }
    }
  };

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  // 기계 모델 선택 삭제 쿼리
  const { mutate: deleteRegistrationModelMutate } = useMutation(
    deleteRegistrationModel,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['loadRegistrationModel'] });
      },
    }
  );

  // 삭제 재확인 comfirm창
  const checkDeleteRegistrationModel = () => {
    if (checkBoxArr.length === 0) {
      alert('삭제할 설비를 먼저 선택해주세요.');
    } else {
      if (window.confirm('정말 삭제하시겠습니까?') === true) {
        deleteRegistrationModelMutate();
      } else {
        return false;
      }
    }
  };

  // 상위탭으로 이동시, setSearchParmas로 설정한 값은 초기화 안되는 상황 핸들링
  useEffect(() => {
    setSearchParams('');
    // useEffect의 missing dependency 문제 임시 block 설정
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.click_tab]);

  return (
    <Wrap>
      <Container>
        <Top>
          <div className="top_left">
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSearchType(e.target.value);
              }}
              ref={selectRef}
            >
              <option value="all">All</option>
              <option value="assignedName">기계명</option>
              <option value="model">모델명</option>
            </select>
            <input
              type="text"
              placeholder="검색"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement> | any) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setCheckBoxArr([]);
                  setSearchParams(
                    `search=${e.target.value}&searchType=${searchType}`
                  );
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchInput(e.target.value);
              }}
              ref={inputRef}
            />
            <button
              className="btn_left"
              onClick={() => {
                setCheckBoxArr([]);
                setSearchParams(
                  `search=${searchInput}&searchType=${searchType}`
                );
              }}
            >
              검색
            </button>
            <button
              className="btn_right"
              onClick={() => {
                setSearchParams('');
                setCheckBoxArr([]);
                inputRef.current.value = '';
                selectRef.current.value = 'all';
                setSearchInput('');
                setSearchType('');
              }}
            >
              초기화
            </button>
          </div>
          <div className="top_right">
            <button
              className="btn_left btn_desc"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <span>등록하기</span>
              <div className="desc">버튼을 클릭하여 설비를 등록해주세요.</div>
            </button>
            <button
              className="btn_right"
              onClick={() => {
                checkDeleteRegistrationModel();
              }}
            >
              선택삭제
            </button>
          </div>
        </Top>
        <Content>
          {/* -------- 설비등록 테이블 -------- */}
          <Suspense fallback={<SkeletonTable />}>
            <RegistrationMachineTable
              searchTypeUrl={searchTypeUrl}
              searchInputUrl={searchInputUrl}
              checkBoxArr={checkBoxArr}
              clickCheckBox={clickCheckBox}
            />
          </Suspense>
          {/* <Mobile /> */}
        </Content>
      </Container>
      <RegistrationMachineModal
        open={is_open}
        setIsOpen={setIsOpen}
        header="신규 기계 등록"
      />
    </Wrap>
  );
};

export default RegistrationMachine;

const Wrap = styled.div`
  width: 100%;
`;

const Container = styled.div`
  border: 1px solid #e9edf3;
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  .top_left {
    @media (max-width: 1100px) {
      width: 100%;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    select {
      margin-right: 20px;
      padding: 10px;
      width: 146px;
      height: 40px;
      border: 1px solid #e9edf3;
      font-size: 1.6rem;
      @media (max-width: 1100px) {
        width: 24%;
        margin-right: 10px;
      }
    }
    input {
      margin-right: 20px;
      padding: 10px;
      width: 292px;
      height: 40px;
      border: 1px solid #e9edf3;
      font-size: 1.6rem;
      &:focus::placeholder {
        color: transparent;
      }
      @media (max-width: 1100px) {
        width: 36%;
        margin-right: 10px;
      }
    }
  }
  .top_right {
    @media (max-width: 1300px) {
      //1100px보다 작아지면 display none;
      display: none;
    }
    display: flex;
  }
  button {
    width: 106.1px;
    height: 40px;
    font-weight: 700;
    font-size: 1.6rem;
    @media (max-width: 1100px) {
      width: 23%;
    }
  }
  .btn_left {
    margin-right: 7px;
    background-color: ${(props) => props.theme.color.PastelBlue};
  }
  .btn_left.btn_desc {
    position: relative;
    .desc {
      display: none;
      font-size: 1.4rem;
      position: absolute;
      width: 260px;
      padding: 8px;
      top: 55px;
      left: -120px;
      border-radius: 8px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      background: #333;
      color: #fff;
    }
    .desc:after {
      position: absolute;
      bottom: 100%;
      right: 30%;
      width: 0;
      height: 0;
      border: solid transparent;
      border-color: rgba(51, 51, 51, 0);
      border-bottom-color: #333;
      border-width: 10px;
      pointer-events: none;
      content: ' ';
    }
    &:hover {
      .desc {
        display: block;
      }
    }
  }
  .btn_right {
    background-color: #f6f7fb;
    border: 1px solid #e9edf3;
    color: #9497a8;
  }
`;

const Content = styled.div``;
