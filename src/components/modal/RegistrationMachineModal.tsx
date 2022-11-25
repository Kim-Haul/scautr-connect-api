import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  IModalProps,
  FormValues,
  IStyleProps,
} from '../../shared/type/IRegistration';
import { useForm } from 'react-hook-form';
import { AiOutlinePaperClip } from 'react-icons/ai';

const RegistrationMachineModal = (props: IModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = async () => {};

  // 첨부파일 제목 미리보기 표시
  const fileRef = useRef<HTMLInputElement | any>(null);
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileRef.current.value = e.target.value;
  };

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
                  <select>
                    <option selected disabled hidden>
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
                <Line>
                  <label htmlFor="inputAssignedName">기계명</label>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="자동열성형진공포장기"
                    isInvalid={!!errors.assignedName}
                    id="inputAssignedName"
                    {...register('assignedName', {
                      required: '기계명을 입력해주세요.',
                    })}
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
                  <label htmlFor="inputDuration">권장 사용기간</label>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="2년 3개월"
                    isInvalid={!!errors.duration}
                    id="inputDuration"
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
                    <div className="upload-name-div">
                      <input
                        className="upload-name"
                        value=""
                        ref={fileRef}
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
                      }}
                    />
                  </div>
                  <div className="attach">하나의 파일만 선택이 가능합니다.</div>
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
    animation: modal-show 0.3s;
    overflow-y: auto;
    header {
      background-color: #f1f1f1;
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
        height: 100%;
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
