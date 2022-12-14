import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Switch from '../../components/etc/Switch';
import ScautrToastEditor from '../../components/detail/ScautrToastEditor';
import apis from '../../shared/apis';
import { useQueryClient } from '@tanstack/react-query';

const NoticeScautrPost = () => {
  const navigate = useNavigate();
  // 제목 가져오기
  const titleRef = useRef<HTMLInputElement | any>(null);
  // select로 선택된 값 가져오기
  const [selectSort, setSelectSort] = useState<number | undefined>(1);
  // 대표글 설정 상태 가져오기
  const [_click, _setClick] = useState<boolean>(false);
  // toastEditor content 내용 가져오기
  const editorRef = useRef<any>();
  // 이미지 가로채기
  const [imgList, SetImgList] = useState<string[]>([]);
  // 수정 클릭시 기존 state값 받아오기
  const location = useLocation();
  const state = location.state;

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  // 게시글 작성 요청
  const onSubmit = async () => {
    const content = {
      classificationId: selectSort,
      title: titleRef.current.value,
      content: editorRef.current?.getInstance().getHTML(),
      top: _click,
      images: imgList,
    };

    if (state?.title === undefined) {
      try {
        // 추가
        await apis.addNoticeScautr(content);
        navigate('/scautr/board/notice/scautr');
      } catch (e) {
        alert(
          '등록에 실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.'
        );
      }
    } else {
      try {
        // 수정
        await apis.editNoticeScautr(content, state.noticeId);
        // 수정을 해도 캐시데이터가 뿌려지는 것 상쇄
        queryClient.removeQueries({ queryKey: ['loadNoticeScautrDetail'] });
        navigate(`/scautr/board/notice/scautr/detail/${state.noticeId}`);
      } catch (e: any) {
        alert(
          '수정에 실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.'
        );
      }
    }
  };

  // 수정시 기존 분류값 가져오기
  useEffect(() => {
    if (state?.classificationId !== undefined) {
      setSelectSort(state.classificationId);
    }
  }, [state?.classificationId]);

  // 기존 대표글 인지 확인
  useEffect(() => {
    if (state?.top === true) {
      _setClick(true);
    }
  }, [state?.top]);

  return (
    <Wrap>
      <Container>
        <Top>
          <div className="top_left">
            <button
              className="btn_left"
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </button>
          </div>
          <div className="top_right">
            <button
              className="btn_left"
              onClick={() => {
                navigate('/scautr/board/notice/scautr');
              }}
            >
              목록
            </button>
            <button
              className="btn_right"
              onClick={() => {
                onSubmit();
              }}
            >
              작성완료
            </button>
          </div>
        </Top>
        <Content>
          <div className="row title">스카우터 공지사항 작성</div>
          <div className="row grid">
            <div className="grid_left">분류</div>
            <div className="grid_right">
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) => {
                  setSelectSort(e.target.value);
                }}
                defaultValue={state?.classificationId}
              >
                <option value="1">공지사항</option>
                <option value="2">이벤트</option>
                <option value="3">업데이트</option>
                <option value="4">점검</option>
                <option value="5">기타</option>
              </select>
            </div>
          </div>
          <div className="row grid">
            <div className="grid_left">제목</div>
            <div className="grid_right">
              <input type="text" defaultValue={state?.title} ref={titleRef} />
            </div>
          </div>
          <div className="row grid">
            <div className="grid_left">대표글 설정</div>
            <div className="grid_right">
              <Switch _click={_click} _setClick={_setClick} />
            </div>
          </div>
          <div className="row editor">
            <ScautrToastEditor
              editorRef={editorRef}
              SetImgList={SetImgList}
              defaultValue={state?.content}
            />
          </div>
        </Content>
      </Container>
    </Wrap>
  );
};

export default NoticeScautrPost;

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  border: 1px solid #e9edf3;
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  button {
    width: 106.1px;
    height: 40px;
    font-weight: 700;
    font-size: 1.6rem;
  }
  .top_left {
    .btn_left {
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.color.PastelBlue};
      color: ${(props) => props.theme.color.PastelBlue};
    }
  }
  .top_right {
    display: flex;
    .btn_left {
      margin-right: 7px;
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.color.PastelBlue};
      color: ${(props) => props.theme.color.PastelBlue};
      width: 75px;
      @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
        display: none;
      }
    }
    .btn_right {
      background-color: ${(props) => props.theme.color.PastelBlue};
    }
  }
`;

const Content = styled.div`
  width: 100%;
  border: 1px solid #e9edf3;
  padding: 10px;
  .row {
    height: 60px;
    border: 1px solid #ced4da;
    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      border-bottom: none;
    }
  }
  .row.title {
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f7fb;
  }
  .row.grid {
    display: grid;
    grid-template-columns: 120px 1fr;
    .grid_left {
      display: flex;
      align-items: center;
      justify-content: left;
      font-weight: 700;
      padding: 10px;
      background-color: #f6f7fb;
      border-right: 1px solid #ced4da;
    }
    .grid_right {
      display: flex;
      align-items: center;
      justify-content: left;
      padding: 10px;
      select,
      input {
        height: 100%;
        width: 150px;
        padding: 5px;
        border: 1px solid #e9edf3;
        font-size: 1.5rem;
      }
      select {
        @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
          width: 100%;
        }
      }
      input {
        width: 100%;
      }
    }
  }
  .row.editor {
    height: auto;
  }
`;
