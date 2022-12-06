import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Switch from '../../components/etc/Switch';
import ProgixToastEditor from '../../components/post/ProgixToastEditor';
import apis from '../../shared/apis';

const NoticeProgixPost = () => {
  const navigate = useNavigate();
  // 제목 가져오기
  const titleRef = useRef<HTMLInputElement | any>(null);
  // select로 선택된 값 가져오기
  const [selectSort, setSelectSort] = useState<string | undefined>('all');
  // 대표글 설정 상태 가져오기
  const [_click, _setClick] = useState<boolean>(false);
  // toastEditor content 내용 가져오기
  const editorRef = useRef<any>();
  // 이미지 가로채기
  const [imgList, SetImgList] = useState<string[]>([]);

  // 게시글 작성 요청
  const onSubmit = async () => {
    const content = {
      classificationId: Number(selectSort),
      title: titleRef.current.value,
      content: editorRef.current?.getInstance().getHTML(),
      top: _click,
      images: imgList,
    };
    try {
      await apis.addNoticeProgix(content);
      navigate('/scautr/board/notice/progix');
    } catch (e) {
      alert('등록에 실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
    }
  };

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
                navigate(-1);
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
          <div className="row title">기계사 공지사항 작성</div>
          <div className="row grid">
            <div className="grid_left">분류</div>
            <div className="grid_right">
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) => {
                  setSelectSort(e.target.value);
                }}
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
              <input type="text" ref={titleRef} />
            </div>
          </div>
          <div className="row grid">
            <div className="grid_left">대표글 설정</div>
            <div className="grid_right">
              <Switch _click={_click} _setClick={_setClick} />
            </div>
          </div>
          <div className="row editor">
            <ProgixToastEditor editorRef={editorRef} SetImgList={SetImgList} />
          </div>
        </Content>
      </Container>
    </Wrap>
  );
};

export default NoticeProgixPost;

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
