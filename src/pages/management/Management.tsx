import React, { useState, useRef, Suspense } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
// import Mobile from '../../components/exception/Mobile';
import { useSearchParams } from 'react-router-dom';
import ManagementTable from '../../components/table/ManagementTable';
import SkeletonTable from '../../components/suspense/SkeletonTable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from './../../shared/apis';

const Management = () => {
  const navigate = useNavigate();
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
  const deleteManagement = async () => {
    const list = {
      equipmentId: checkBoxArr,
    };
    try {
      const res = await apis.deleteManagement(list);
      setCheckBoxArr([]);
      return res;
    } catch (e: any) {
      if (e.response?.data.message === 'DEMO_NOTALLOWED_ERR') {
        alert('데모계정은 일부 기능이 제한됩니다.');
      } else {
        alert('실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
      }
    }
  };

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  // 기계 모델 선택 삭제 쿼리
  const { mutate: deleteManagementMutate } = useMutation(deleteManagement, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadManagementListQuery'] });
    },
  });

  // 삭제 재확인 comfirm창
  const checkDeleteManagement = () => {
    if (checkBoxArr.length === 0) {
      alert('삭제할 설비를 먼저 선택해주세요.');
    } else {
      if (window.confirm('정말 삭제하시겠습니까?') === true) {
        deleteManagementMutate();
      } else {
        return false;
      }
    }
  };

  // 처음 마운트 될 때 파라미터 초기화 시켜주기 위함.
  // useEffect(() => {
  //   setSearchParams('');
  // }, []);

  return (
    <Wrap>
      <Title>
        <div className="main">설비관리</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>설비관리</span>
        </div>
      </Title>
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
              <option value="companyName">거래처명</option>
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
              className="btn_left"
              onClick={() => {
                navigate('/scautr/management/submit');
              }}
            >
              등록하기
            </button>
            <button
              className="btn_right"
              onClick={() => {
                checkDeleteManagement();
              }}
            >
              선택삭제
            </button>
          </div>
        </Top>
        <Content>
          {/* -------- 설비등록 테이블 -------- */}
          <Suspense fallback={<SkeletonTable />}>
            <ManagementTable
              searchTypeUrl={searchTypeUrl}
              searchInputUrl={searchInputUrl}
              checkBoxArr={checkBoxArr}
              clickCheckBox={clickCheckBox}
            />
          </Suspense>
          {/* <Mobile /> */}
        </Content>
      </Container>
    </Wrap>
  );
};

export default Management;

const Wrap = styled.div`
  width: 98.5%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .main {
    color: #495057;
    font-weight: 600;
    font-size: 2rem;
  }
  .sub {
    color: #495057;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    svg {
      margin: 0 0.3rem;
    }
  }
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
    display: flex;
    @media (max-width: 1300px) {
      //1100px보다 작아지면 display none;
      display: none;
    }
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
  .btn_right {
    background-color: #f6f7fb;
    border: 1px solid #e9edf3;
    color: #9497a8;
  }
`;

const Content = styled.div``;
