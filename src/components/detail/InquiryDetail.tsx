import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import apis from '../../shared/apis';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import jwtDecode from 'jwt-decode';
import { Viewer } from '@toast-ui/react-editor';
import { getCookie } from '../../shared/cookie';
import { ITokenProps } from '../../shared/type/Interface';

const InquiryDetail = () => {
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

  // 수정 여부 토글
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 문의사항 세부사항 호출 api
  const getNoticeInquiryDetail = async () => {
    try {
      const res = await apis.getNoticeInquiryDetail(view.idx);
      return res;
    } catch (err) {
      console.log('문의사항 세부내용을 불러오는데 실패했습니다.');
    }
  };

  // 문의사항 세부사항 호출 쿼리
  const { data: NoticeInquiryDetailQuery } = useQuery(
    ['loadNoticeInquiryDetail', view.idx],
    getNoticeInquiryDetail,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('문의사항 세부내용을 불러오는데 실패했습니다.');
      },
    }
  );

  // 문의 세부사항 답변 삭제 api
  const deleteNoticeInquiry = async (id: string) => {
    try {
      const res = await apis.deleteNoticeInquiry(id);
      alert('삭제가 완료되었습니다.');
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

  // 문의 세부사항 답변 삭제 쿼리
  const { mutate: deleteNoticeInquiryMutate } = useMutation(
    deleteNoticeInquiry,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['loadNoticeInquiryDetail'],
        });
      },
    }
  );

  // 삭제 재확인 comfirm창
  const checkDeleteNoticeInquiry = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      deleteNoticeInquiryMutate(id);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | any>(null);
  // 문의 세부사항 답변 등록 api
  const addNoticeInquiry = async (id: string) => {
    const content = {
      inquiryId: id,
      answer: textareaRef.current.value,
    };
    try {
      const res = await apis.addNoticeInquiry(content);
      return res;
    } catch (e: any) {
      if (e.response?.data.message === 'DEMO_NOTALLOWED_ERR') {
        alert('데모계정은 일부 기능이 제한됩니다.');
      } else {
        alert('실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
      }
    }
  };

  // 문의 세부사항 답변 등록 쿼리
  const { mutate: addNoticeInquiryMutate } = useMutation(addNoticeInquiry, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadNoticeInquiryDetail'] });
    },
  });

  // 문의 세부사항 답변 수정 api
  const editNoticeInquiry = async (id: string) => {
    const content = {
      inquiryId: id,
      answer: textareaRef.current.value,
    };
    try {
      const res = await apis.editNoticeInquiry(content);
      setIsEdit(false);
      return res;
    } catch (e: any) {
      if (e.response?.data.message === 'DEMO_NOTALLOWED_ERR') {
        alert('데모계정은 일부 기능이 제한됩니다.');
      } else {
        alert('실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
      }
    }
  };

  // 문의 세부사항 답변 수정 쿼리
  const { mutate: editNoticeInquiryMutate } = useMutation(editNoticeInquiry, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadNoticeInquiryDetail'] });
    },
  });

  // 등록 재확인 comfirm창
  const addNoticeInquiryCheck = (id: string) => {
    if (window.confirm('답변을 작성하시겠습니까?') === true) {
      if (isEdit) {
        editNoticeInquiryMutate(id);
      } else {
        addNoticeInquiryMutate(id);
      }
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <Content>
        <div className="row title">
          {NoticeInquiryDetailQuery?.data.result[0].title}
        </div>
        <div className="row info">
          <div className="div">
            {NoticeInquiryDetailQuery?.data.result[0].customerCompany}
          </div>
          <div className="div">
            {NoticeInquiryDetailQuery?.data.result[0].customerName}(
            {NoticeInquiryDetailQuery?.data.result[0].customerAccount})
          </div>
          <div className="div regdate">
            {NoticeInquiryDetailQuery?.data.result[0].questionRegdate}
          </div>
        </div>
        <div className="row content">
          <Viewer
            initialValue={NoticeInquiryDetailQuery?.data.result[0].question}
          />
        </div>
      </Content>
      <Answer>
        {NoticeInquiryDetailQuery?.data.result[0].status === '답변 완료' ? (
          // 답변 완료 상태일때 답변이 뜨면서, 권한이 있으면 수정&삭제 버튼이 활성화 되는데
          // 1. 답변 완료 상태를 한번 체크하고, 2. 수정 버튼을 클릭하였나를 한번 더 체크
          isEdit ? (
            <React.Fragment>
              <div className="answer_title">
                <span>답변</span> <IoIosArrowDown />
              </div>
              <hr />
              <div className="answer_textarea">
                <textarea
                  placeholder="내용을 입력해주세요."
                  defaultValue={NoticeInquiryDetailQuery?.data.result[0].answer}
                  ref={textareaRef}
                />
                <div className="edit_btn_box">
                  <button
                    onClick={() => {
                      addNoticeInquiryCheck(
                        NoticeInquiryDetailQuery?.data.result[0].inquiryId
                      );
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    취소
                  </button>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="answer_title">
                <span className="answer_title_left">답변</span>
                <span>
                  {NoticeInquiryDetailQuery?.data.result[0].supplierName}(
                  {NoticeInquiryDetailQuery?.data.result[0].supplierAccount})
                </span>
              </div>
              <div className="answer_content">
                {/* <div className="answer_content_title"></div> */}
                <div className="answer_content_detail">
                  <Viewer
                    initialValue={
                      NoticeInquiryDetailQuery?.data.result[0].answer
                    }
                  />
                </div>
                {isAuth ===
                NoticeInquiryDetailQuery?.data.result[0].supplierAccount ? (
                  <React.Fragment>
                    <div className="answer_content_edit">
                      <span className="left_svg">
                        <BsPencilSquare
                          onClick={() => {
                            setIsEdit(true);
                          }}
                        />
                      </span>
                      <span className="right_svg">
                        <AiFillCloseSquare
                          onClick={() => {
                            checkDeleteNoticeInquiry(
                              NoticeInquiryDetailQuery?.data.result[0].inquiryId
                            );
                          }}
                        />
                      </span>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            <div className="answer_title">
              <span>답변</span> <IoIosArrowDown />
            </div>
            <hr />
            <div className="answer_textarea">
              <textarea placeholder="내용을 입력해주세요." ref={textareaRef} />
              <button
                onClick={() => {
                  addNoticeInquiryCheck(
                    NoticeInquiryDetailQuery?.data.result[0].inquiryId
                  );
                }}
              >
                답변작성
              </button>
            </div>
          </React.Fragment>
        )}
      </Answer>
      {/* 기획안 수정으로 인한 해당 섹션 잠시 보류 */}
      {/* <Bottom>
        <div className="column">▾ 이전글</div>
        <div className="column">배송문의</div>
        <div className="column writer">
          <span className="inquiry_writer_company">이랜드몰</span>
          <span className="inquiry_writer_name"> 정지영(jyy****)</span>
        </div>
        <div className="column">2022-11-01</div>
      </Bottom> */}
    </React.Fragment>
  );
};

export default InquiryDetail;

const Content = styled.div`
  width: 100%;
  border: 1px solid #ced4da;
  border-bottom: none;
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
    .div {
      &::after {
        content: '｜';
        margin-left: 0.7rem;
      }
      &:last-child::after {
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

const Answer = styled.div`
  border: 1px solid #ced4da;
  padding: 10px;
  hr {
    margin: 1rem 0;
    background: #ced4da;
    height: 1px;
    outline: none;
    border: none;
  }
  .answer_title {
    font-weight: 700;
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
    .answer_title_left {
      background-color: #35a3dc;
      color: #fff;
      padding: 2px;
      width: 40px;
      border-radius: 5px;
      font-weight: 500;
      text-align: center;
      margin-right: 10px;
    }
  }
  .answer_content {
    margin-top: 5px;
    .answer_content_title {
      color: #35a3dc;
      font-weight: 500;
    }
    .answer_content_detail {
      word-break: break-all;
    }
    .answer_content_edit {
      margin-top: 5px;
      svg {
        color: gray;
        cursor: pointer;
      }
      .left_svg {
        margin-right: 5px;
        svg {
          width: 13px;
        }
      }
    }
  }
  .answer_textarea {
    display: grid;
    grid-template-columns: 1fr 120px;
    column-gap: 1rem;
    height: 120px;
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      border: 1px solid #ced4da;
      padding: 10px;
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 1.5rem;
    }
    button {
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.theme.color.PastelBlue};
      font-size: 1.5rem;
    }
    .edit_btn_box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      button {
        height: 45%;
        font-size: 1.6rem;
      }
      .cancel {
        background-color: #f6f7fb;
        border: 1px solid #e9edf3;
        color: #9497a8;
      }
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
//     padding: 3.6px;
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
//   .column.writer {
//     display: flex;
//     flex-direction: column;
//     font-size: 1.5rem;
//     .inquiry_writer_company {
//       margin-bottom: -5px;
//       font-weight: 600;
//     }
//     .inquiry_writer_name {
//     }
//   }
// `;
