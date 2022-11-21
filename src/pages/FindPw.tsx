import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../shared/type/IFindPw';

const FindPw = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit = async () => {};

  return (
    <Wrap>
      <PostForm onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="logo">
            <img
              src="/images/scautr_dark.svg"
              alt="스카우터 로고"
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
          <Line>
            <label htmlFor="inputId">아이디</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="아이디를 입력해주세요"
              isInvalid={!!errors.id}
              id="inputId"
              {...register('id', {
                required: '아이디를 입력해주세요.',
              })}
            />
            {errors.id && <div className="err">{errors.id.message}</div>}
          </Line>

          <Line>
            <label htmlFor="inputName">이름</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="이름을 입력해주세요"
              isInvalid={!!errors.name}
              id="inputName"
              {...register('name', {
                required: '이름을 입력해주세요.',
              })}
            />
            {errors.name && <div className="err">{errors.name.message}</div>}
          </Line>

          <Line>
            <label htmlFor="inputEmail">이메일</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="이메일을 입력해주세요"
              isInvalid={!!errors.email}
              id="inputEmail"
              {...register('email', {
                required: '이메일을 입력해주세요.',
              })}
            />
            {errors.email && <div className="err">{errors.email.message}</div>}
            <div
              style={{
                color: 'gray',
                fontSize: '1.29rem',
              }}
            >
              비밀번호 발송을 위해 반드시 정확한 이메일을 입력해주세요.
            </div>
          </Line>

          <div className="btn">
            <button
              className="btn-cancel"
              onClick={() => {
                navigate('/');
              }}
            >
              취소
            </button>

            <button className="btn-login">발송</button>
          </div>
        </div>
      </PostForm>
      <Footer>
        <div>
          <ul>
            <li>주식회사 빛컨</li>
            <li>스카우터</li>
            <li>사업자등록번호 119-87-05616</li>
          </ul>
        </div>
        <div className="copyright">
          <div>Copyright © VITCON Corp. All Rights Reserved.</div>
        </div>
      </Footer>
    </Wrap>
  );
};

export default FindPw;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 1.6rem;
`;

const PostForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #fff;

  padding: 5rem;
  width: 40rem;

  @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
    border: none;
    width: 38rem;
  }

  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;

    img {
      width: 20rem;
      cursor: pointer;
    }
  }

  .container {
    width: 32rem;

    .btn {
      display: flex;
      justify-content: space-between;
      margin-top: 3rem;

      button {
        width: 15.8rem;
        height: 4.8rem;
        font-size: 1.6rem;
      }

      .btn-cancel {
        background: #8e8e8e;
      }
    }
  }
`;

const Line = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .err {
    color: red;
    font-size: 1.2rem;
    margin-top: 0.2rem;
  }
`;

const Input = styled.input`
  border: 1px solid #e1e1e1;
  outline: ${(props: IStyleProps) => props.isInvalid && 'none'};
  border: ${(props: IStyleProps) => props.isInvalid && '1px solid red'};
  border-color: ${(props: IStyleProps) => props.isInvalid && '#fa5963'};
  width: 100%;
  border-radius: 3px;
  height: 5rem;

  &:focus {
    border: 2px solid rgb(0, 123, 255);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }

  &:focus::placeholder {
    color: transparent;
  }

  padding: 1rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 2rem;

  .copyright {
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
    color: #888888;
  }

  ul {
    list-style: none;
    display: flex;

    li {
      color: gray;

      &::after {
        content: '｜';
        margin: 0.2rem;
      }

      &:last-child::after {
        content: '';
        margin: 0rem;
      }
    }
  }
`;
