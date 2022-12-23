import React, { useRef } from 'react';
import styled from 'styled-components';
import { IModalProps, IStyleProps } from '../../../shared/type/Interface';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../shared/type/Interface';
import apis from '../../../shared/apis';
import { useQueryClient } from '@tanstack/react-query';

const AsRegistrationModal = (props: IModalProps) => {
  // 비고 input 내용 담기
  const noteRef = useRef<HTMLInputElement | any>(null);
  // select 선택 값 담기
  const selectRef = useRef<HTMLSelectElement | any>(null);
  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = async (data: any) => {
    const content = {
      title: data.title,
      content: noteRef.current.value,
      name: data.manager,
      repairDate: data.date,
      repairTime: data.time,
      classificationId: selectRef.current.value,
    };

    if (props.content) {
      // 수정
      try {
        await apis.editAsHistory(props.view, props.postId, content);
        props.setIsOpen(false);
        reset();
        queryClient.removeQueries({ queryKey: ['loadAsDetail'] });
      } catch (e: any) {
        alert('조치유형을 선택해주세요.');
      }
    } else {
      // 추가
      try {
        await apis.addAsHistory(props.view, content);
        props.setIsOpen(false);
        reset();
        queryClient.invalidateQueries({ queryKey: ['loadAsHistory'] });
      } catch (e: any) {
        alert('조치유형을 선택해주세요.');
      }
    }
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
                  props.setIsOpen(false);
                  reset();
                }}
              >
                &times;
              </button>
            </header>
            <main>
              <PostForm onSubmit={handleSubmit(onSubmit)}>
                {/* -------------------- 1 --------------------  */}
                <Line>
                  <label htmlFor="inputDate">날짜</label>
                  <Input
                    type="date"
                    autoComplete="off"
                    isInvalid={!!errors.date}
                    id="inputDate"
                    defaultValue={props.content?.repairDate}
                    {...register('date', {
                      required: '날짜를 입력해주세요.',
                    })}
                  />
                  {errors.date && (
                    <div className="err">{errors.date.message}</div>
                  )}
                </Line>
                {/* -------------------- 2 --------------------  */}
                <Line>
                  <label htmlFor="inputTime">시간</label>
                  <Input
                    type="time"
                    autoComplete="off"
                    isInvalid={!!errors.time}
                    id="inputTime"
                    defaultValue={props.content?.repairTime}
                    {...register('time', {
                      required: '시간을 입력해주세요.',
                    })}
                  />
                  {errors.time && (
                    <div className="err">{errors.time.message}</div>
                  )}
                </Line>
                {/* -------------------- 3 --------------------  */}
                <Line>
                  <label htmlFor="inputManager">담당자</label>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="홍길동"
                    isInvalid={!!errors.manager}
                    id="inputManager"
                    defaultValue={props.content?.name}
                    {...register('manager', {
                      required: '담당자를 입력해주세요.',
                    })}
                  />
                  {errors.manager && (
                    <div className="err">{errors.manager.message}</div>
                  )}
                </Line>
                {/* -------------------- 4 --------------------  */}
                <Line>
                  <label htmlFor="inputTitle">제목</label>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="파워 연결선 교체"
                    isInvalid={!!errors.title}
                    id="inputTitle"
                    defaultValue={props.content?.title}
                    {...register('title', {
                      required: '모델명을 입력해주세요.',
                    })}
                  />
                  {errors.title && (
                    <div className="err">{errors.title.message}</div>
                  )}
                </Line>
                {/* -------------------- 5 --------------------  */}
                <Line>
                  <label>조치 유형</label>
                  <select
                    ref={selectRef}
                    defaultValue={
                      props.content?.classificationId
                        ? props.content?.classificationId
                        : 'default'
                    }
                  >
                    <option value="default" disabled hidden>
                      선택
                    </option>
                    <option value="1">일반점검</option>
                    <option value="2">고장수리</option>
                    <option value="3">소모품교체</option>
                  </select>
                </Line>
                {/* -------------------- 6 --------------------  */}
                <Line>
                  <label htmlFor="inputTextarea">내용</label>
                  <textarea
                    autoComplete="off"
                    id="inputTextarea"
                    ref={noteRef}
                    defaultValue={props.content?.content}
                  />
                </Line>
                <div className="check">
                  <button>{props.content ? '수정' : '등록'}</button>
                </div>
              </PostForm>
            </main>
          </section>
        ) : null}
      </div>
    </Wrap>
  );
};

export default AsRegistrationModal;

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
    width: 600px;
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
  .check {
    display: flex;
    justify-content: end;
    button {
      width: 80px;
      height: 35px;
      background-color: ${(props) => props.theme.color.PastelBlue};
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
  textarea {
    border: 1px solid #ced4da;
    height: 15rem;
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
