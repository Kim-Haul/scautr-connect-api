import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  IModalProps,
  FormValues,
  IStyleProps,
} from '../../shared/type/Interface';
import { useForm } from 'react-hook-form';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { RiPaintFill } from 'react-icons/ri';
import ColorModal from './ColorModal';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from '../../shared/cookie';
import apis from '../../shared/apis';

const RegistrationMachineModal = (props: IModalProps) => {
  // 컬러 모달창 토글
  const [color_open, setColorOpen] = useState<boolean>(false);
  // 컬러 모달창 색 담아오기
  const [color, setColor] = useState<string>('#e1e1e1');
  // 비고 input 내용 담기
  const noteRef = useRef<HTMLInputElement | any>(null);
  // select 선택 값 담기
  const selectRef = useRef<HTMLSelectElement | any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    try {
      // 파일 업로드를 위한 개별 content-Type 설정
      const accessToken = getCookie('Authorization');
      // 추가 or 수정 여부에 따른 axios 요청 조건부 렌더링
      const formData = new FormData();
      formData.append('assignedName', data.assignedName);
      formData.append('model', data.model);
      formData.append('color', color);
      formData.append('multipartFile', fileObjectRef.current.files[0]);
      formData.append('lifeSpan', data.duration);
      formData.append('note', noteRef.current.value);
      formData.append('templateId', selectRef.current.value);
      if (props.info !== undefined) {
        // 수정
        await axios.post(
          `${process.env.REACT_APP_BACKEND_TEMP_ADDRESS}/model/${props.info?.modelId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (delFile && props.info?.delfiles != null) {
          await apis.deleteRegistrationModelFiles([props.info?.delfiles]);
        }
      } else {
        // 추가
        await axios.post(
          `${process.env.REACT_APP_BACKEND_TEMP_ADDRESS}/model`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      reset();
      setColor('#e1e1e1');
      setDelFile(false);
      setColorOpen(false);
      props.setIsOpen(false);
      // 등록 후, 기본 조회 쿼리 재호출
      queryClient.invalidateQueries({ queryKey: ['loadRegistrationModel'] });
    } catch (e) {
      alert('실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
    }
  };

  // file 객체를 담기위한 type='file'
  const fileObjectRef = useRef<HTMLInputElement | any>(null);
  // 첨부파일 제목 미리보기 표시
  const fileRef = useRef<HTMLInputElement | any>(null);
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileRef.current.value = e.target.value;
  };

  // 수정시 컬러 색깔 담아오기
  useEffect(() => {
    if (props.info?.color !== undefined) {
      setColor(props.info?.color);
    }
  }, [props.info?.color, props.open]);

  // 수정시 기존 첨부파일 삭제 여부 확인
  const [delFile, setDelFile] = useState<boolean>(false);

  return (
    <Wrap>
      <div className={props.open ? 'openModal modal' : 'modal'}>
        {props.open ? (
          <section>
            <header>
              <span>{props.header}</span>
              <button
                className="close"
                onClick={() => {
                  reset();
                  setColor('#e1e1e1');
                  setDelFile(false);
                  setColorOpen(false);
                  props.setIsOpen(false);
                }}
              >
                &times;
              </button>
            </header>
            <main>
              <PostForm onSubmit={handleSubmit(onSubmit)}>
                {/* -------------------- 1 --------------------  */}
                <Line>
                  <label>그룹 선택</label>
                  <select
                    ref={selectRef}
                    defaultValue={
                      props.info?.templateId !== undefined
                        ? props.info?.templateId
                        : 'default'
                    }
                  >
                    <option value="default" disabled hidden>
                      선택
                    </option>
                    <option value="7">검사기</option>
                    <option value="2">검출기</option>
                    <option value="4">계량기</option>
                    <option value="3">선별기</option>
                    <option value="5">충전기</option>
                    <option value="1">포장기</option>
                    <option value="6">기타</option>
                  </select>
                </Line>
                {/* -------------------- 2 --------------------  */}
                <Line className="color_modal_parents">
                  <label htmlFor="inputAssignedName">
                    <div>기계명</div>
                    <div
                      className="circle"
                      style={{ backgroundColor: color }}
                    ></div>
                  </label>
                  <div className="assignedNameBox">
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="자동열성형진공포장기"
                      className="assigned-name"
                      isInvalid={!!errors.assignedName}
                      id="inputAssignedName"
                      defaultValue={props.info?.assignedName}
                      {...register('assignedName', {
                        required: '기계명을 입력해주세요.',
                      })}
                    />
                    <div
                      onClick={() => {
                        setColorOpen(!color_open);
                      }}
                    >
                      {/* 컬러 모델 선택창에서 가져오는 색을 바로 배경색으로 뿌려주기 */}
                      <RiPaintFill style={{ backgroundColor: color }} />
                    </div>
                  </div>
                  <ColorModal
                    open={color_open}
                    setIsOpen={setColorOpen}
                    setColor={setColor}
                  />
                  {errors.assignedName && (
                    <div className="err">{errors.assignedName.message}</div>
                  )}
                </Line>
                {/* -------------------- 3 --------------------  */}
                <Line>
                  <label htmlFor="inputModel">모델명</label>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="GP250"
                    isInvalid={!!errors.model}
                    id="inputModel"
                    defaultValue={props.info?.model}
                    {...register('model', {
                      required: '모델명을 입력해주세요.',
                    })}
                  />
                  {errors.model && (
                    <div className="err">{errors.model.message}</div>
                  )}
                </Line>
                {/* -------------------- 4 --------------------  */}
                <Line>
                  <label htmlFor="inputDuration">권장 사용기간(개월)</label>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="숫자만 입력해주세요. (ex: 24)"
                    isInvalid={!!errors.duration}
                    id="inputDuration"
                    defaultValue={props.info?.lifeSpan}
                    {...register('duration', {
                      required: '권장 사용기간을 입력해주세요.',
                    })}
                  />
                  {errors.duration && (
                    <div className="err">{errors.duration.message}</div>
                  )}
                </Line>
                {/* -------------------- 5 --------------------  */}
                {/* 첨부파일 */}
                <Line>
                  <div className="filebox">
                    <label htmlFor="inputAttach">첨부파일</label>
                    {/* input 커스마이징 껍데기 */}
                    <div className="upload-name-div">
                      <input
                        className="upload-name"
                        ref={fileRef}
                        defaultValue={props.info?.multipartFile}
                        readOnly
                      />
                      <label htmlFor="inputAttach">
                        <AiOutlinePaperClip />
                      </label>
                    </div>

                    <input
                      type="file"
                      autoComplete="off"
                      id="inputAttach"
                      onChange={(e) => {
                        changeFile(e);
                        setDelFile(true);
                      }}
                      ref={fileObjectRef}
                    />
                  </div>
                  {props.info?.multipartFile && delFile === false ? (
                    <div
                      className="attach"
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => {
                        fileRef.current.value = '';
                        setDelFile(true);
                      }}
                    >
                      기존 첨부파일 삭제
                    </div>
                  ) : null}
                  <div className="attach">하나의 파일만 선택이 가능합니다.</div>
                </Line>
                {/* -------------------- 6 --------------------  */}
                <Line>
                  <label htmlFor="inputTextarea">비고</label>
                  <textarea
                    autoComplete="off"
                    id="inputTextarea"
                    defaultValue={props.info?.note}
                    ref={noteRef}
                  />
                </Line>
                <div className="check">
                  <button className="close">확인</button>
                </div>
              </PostForm>
            </main>
          </section>
        ) : null}
      </div>
    </Wrap>
  );
};

export default RegistrationMachineModal;

const Wrap = styled.div`
  .openModal.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: modal-bg-show 0.3s;
  }

  section {
    width: 450px;
    @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
      width: 360px;
    }
    max-height: 90%;
    background-color: #fff;
    // 모달이 스르륵 열리는 효과인데, input이 깨지는 효과가 있어서 잠시 보류
    // animation: modal-show 0.3s;
    overflow-y: auto;
    header {
      background-color: #f6f7fb;
      font-weight: 700;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        font-size: 21px;
        padding: 0;
        color: #999;
        background-color: transparent;
      }
    }

    main {
      padding: 16px;
      border-top: 1px solid #dee2e6;
      // 하단 버튼을 감싸고 있는 div
      .check {
        margin-top: 20px;
        display: flex;
        justify-content: end;
      }
      button {
        padding: 1rem;
        width: 120px;
        color: #fff;
        background-color: ${(props) => props.theme.color.PastelBlue};
        border-radius: 5px;
        font-size: 1.6rem;
      }
    }
    @keyframes modal-show {
      from {
        opacity: 0;
        margin-top: -50px;
      }
      to {
        opacity: 1;
        margin-top: 0;
      }
    }
    @keyframes modal-bg-show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const PostForm = styled.form`
  label {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  select {
    border: 1px solid #ced4da;
    padding: 10px;
    width: 146px;
    height: 40px;
    font-size: 1.5rem;
  }
  // 컬러 모달창 상대 위치 부모 요소 지정
  .color_modal_parents {
    position: relative;
    label {
      display: flex;
      align-items: center;
      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: gray;
        margin-top: 2px;
        margin-left: 8px;
      }
    }
  }
`;

const Line = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  .err {
    color: red;
    font-size: 1.4rem;
    margin-top: 0.2rem;
  }
  // 첨부파일 desc
  .attach {
    color: gray;
    font-size: 1.4rem;
    margin-top: 0.2rem;
  }
  // file input을 감싸는 div
  .filebox {
    label {
      cursor: pointer;
    }
    // 첨부파일 input를 감싼 div태그
    .upload-name-div {
      height: 40px;
      border: 1px solid #ced4da;
      width: 100%;
      color: #999999;
      // label에 부여한 margin-bottom: 0.5rem 속성이 안먹혀서 따로 지정
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      // 첨부파일 input
      .upload-name {
        height: 100%;
        width: 90%;
        padding: 1rem;
        color: gray;
        font-size: 1.4rem;
        border: none;
        &:focus {
          border: 2px solid rgb(0, 123, 255);
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: none;
        }
      }
      label {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        // label이 relative 준거처럼 살짝 위쪽으로 떠있어서 강제로 margin줌.
        margin-top: 5px;
        svg {
          font-size: 2rem;
        }
      }
    }
    // file 속성의 input 기본 속성 없애기
    input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
  textarea {
    border: 1px solid #ced4da;
    height: 8rem;
    padding: 1rem;
    font-size: 1.5rem;
    font-family: 'Noto Sans KR', sans-serif;
    resize: none;
    &:focus {
      border: 2px solid rgb(0, 123, 255);
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      outline: none;
    }
  }
  // 색상 선택을 위해 나누는 기계명 input 라인 div
  .assignedNameBox {
    display: flex;
    border: 1px solid #ced4da;
    align-items: center;
    // Input이 밑에 정의되어 있는데도, css 우선순위에 따라 class 스타일 적용
    input {
      width: 90%;
      border: none;
    }
    div {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 3rem;
        padding: 5px;
        color: #fff;
        border-radius: 5px;
        background-color: #c1c1c1;
        cursor: pointer;
        @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
          font-size: 2.5rem;
        }
      }
    }
  }
`;

const Input = styled.input`
  border: 1px solid #ced4da;
  outline: ${(props: IStyleProps) => props.isInvalid && 'none'};
  border: ${(props: IStyleProps) => props.isInvalid && '1px solid red'};
  border-color: ${(props: IStyleProps) => props.isInvalid && '#fa5963'};
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  padding: 1rem;
  height: 45px;
  font-size: 1.5rem;
  &:focus {
    border: 2px solid rgb(0, 123, 255);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
