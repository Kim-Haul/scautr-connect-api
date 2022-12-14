import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import apis from '../../shared/apis';
import { Viewer } from '@toast-ui/react-editor';
import jwtDecode from 'jwt-decode';
import { getCookie } from '../../shared/cookie';
import { ITokenProps } from '../../shared/type/Interface';

const ScautrDetail = () => {
  const [open_modal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  // url에 id값 받아오기
  const view = useParams();

  // 토큰 payload에 담겨오는 정보를 바탕으로 답변 수정&삭제 버튼 노출 검증
  const [isAuth, setIsAuth] = useState<string>('');
  useEffect(() => {
    const accessToken = getCookie('Authorization');
    let authority: ITokenProps;

    if (accessToken) {
      authority = jwtDecode(accessToken);
      setIsAuth(authority.sub);
    }
  }, []);

  // 스카우터 공지 세부사항 호출 api
  const getNoticeScautrDetail = async () => {
    try {
      const res = await apis.getNoticeScautrDetail(view.idx);
      return res;
    } catch (err) {
      console.log('스카우터 공지 세부사항을 불러오는데 실패했습니다.');
    }
  };

  // 스카우터 공지 세부사항 호출 쿼리
  const { data: NoticeScautrDetailQuery } = useQuery(
    ['loadNoticeScautrDetail', view.idx],
    getNoticeScautrDetail,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('스카우터 공지 세부사항을 불러오는데 실패했습니다.');
      },
    }
  );

  // 기계사 해당 공지사항 삭제 api
  const deleteNoticeScautr = async (id: string) => {
    try {
      const res = await apis.deleteNoticeScautr(id);
      alert('삭제가 완료되었습니다.');
      navigate('/scautr/board/notice/scautr');
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

  // 기계사 해당 공지사항 삭제 쿼리
  const { mutate: deleteNoticeScautrMutate } = useMutation(deleteNoticeScautr, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadNoticeScautrDetail'] });
    },
  });

  // 삭제 재확인 comfirm창
  const checkDeleteNoticeScautr = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      deleteNoticeScautrMutate(id);
    }
  };

  return (
    <React.Fragment>
      <Content>
        <div className="row title">
          {NoticeScautrDetailQuery?.data.result[0].title}
        </div>
        <div className="row info">
          <div className="div">
            {NoticeScautrDetailQuery?.data.result[0].name}
          </div>
          <div className="div regdate">
            {NoticeScautrDetailQuery?.data.result[0].regdate}
          </div>
          {/* 권한 여부 검사 후 수정&삭제 버튼 노출 */}
          {isAuth === 'scautr' ? (
            <BiDotsVerticalRounded
              onClick={() => {
                setOpenModal(!open_modal);
              }}
            />
          ) : null}
          {open_modal ? (
            <Modal>
              <ul>
                <li
                  onClick={() => {
                    navigate('/scautr/board/notice/scautr/post', {
                      state: {
                        classificationId:
                          NoticeScautrDetailQuery?.data.result[0]
                            .classificationId,
                        title: NoticeScautrDetailQuery?.data.result[0].title,
                        top: NoticeScautrDetailQuery?.data.result[0].top,
                        content:
                          NoticeScautrDetailQuery?.data.result[0].content,
                        noticeId:
                          NoticeScautrDetailQuery?.data.result[0].noticeId,
                      },
                    });
                  }}
                >
                  수정하기
                </li>
                <li
                  onClick={() => {
                    checkDeleteNoticeScautr(
                      NoticeScautrDetailQuery?.data.result[0].noticeId
                    );
                  }}
                >
                  삭제하기
                </li>
              </ul>
            </Modal>
          ) : null}
        </div>
        <div className="row content">
          <Viewer
            initialValue={NoticeScautrDetailQuery?.data.result[0].content}
          />
        </div>
      </Content>
      {/* 기획안 수정으로 인한 해당 섹션 잠시 보류 */}
      {/* <Bottom>
        <div className="column">▾ 이전글</div>
        <div className="column">고객센터 휴무안내</div>
        <div className="column">정지영</div>
        <div className="column">2022-11-01</div>
      </Bottom> */}
    </React.Fragment>
  );
};

export default ScautrDetail;

const Content = styled.div`
  width: 100%;
  border: 1px solid #ced4da;
  .row.title {
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f7fb;
    height: 51px;
    border-bottom: 1px solid #ced4da;
  }
  .row.info {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px 20px;
    font-size: 1.4rem;
    gap: 0.5rem;
    border-bottom: 1px solid #ced4da;
    svg {
      font-size: 2.5rem;
      cursor: pointer;
      color: gray;
      border-radius: 6px;
      margin-left: 0.3rem;
    }
    .div {
      &::after {
        content: '｜';
        margin-left: 0.7rem;
      }
      &:nth-child(2)::after {
        content: '';
        margin: 0rem;
      }
    }
    .div.regdate {
      color: #979797;
    }
  }
  .row.content {
    padding: 10px;
    @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
      font-size: 1.3rem;
    }
  }
`;

// const Bottom = styled.div`
//   @media (max-width: 1200px) {
//     display: none;
//   }
//   display: grid;
//   grid-template-columns: 150px 1fr 150px 200px;
//   .column {
//     padding: 10px;
//     border: 1px solid #ced4da;
//     border-top: none;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &:first-child,
//     &:nth-child(2),
//     &:nth-child(3) {
//       border-right: none;
//     }
//   }
// `;

const Modal = styled.div`
  position: absolute;
  font-size: 1.5rem;
  // 부모 요소인 .row.info에 font-weight가 있어서 별도로 지정
  font-weight: 400;
  top: 4rem;
  right: 5;
  width: 12rem;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.PastelBlue};
  box-shadow: 1px 1px 5px 1px #d4d4d4;
  color: #000;
  ul {
    list-style: none;
    li {
      display: flex;
      justify-content: center;
      padding: 10px;
      cursor: pointer;
      &:first-child {
        border-bottom: 1px solid #d4d4d4;
      }
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
      }
    }
  }
`;
