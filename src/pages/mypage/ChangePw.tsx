import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../../shared/type/Interface';

const ChangePw = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = () => {};

  const [capslock, setCapsLock] = useState<boolean>(false);
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
  const passwordRef = useRef<string>();
  passwordRef.current = watch('new_password');

  return (
    <Wrap>
      <Container>
        <div className="title">
          <h1>비밀번호 변경</h1>
          <BsBoxArrowInLeft onClick={() => navigate(-1)} />
        </div>
        <PostForm onSubmit={handleSubmit(onSubmit)}>
          <Line>
            <label>현재 비밀번호</label>
            <Input
              type="password"
              autoComplete="off"
              placeholder="현재 비밀번호를 입력해주세요"
              isInvalid={!!errors.password}
              autoFocus
              {...register('password', {
                required: '현재 비밀번호를 입력해주세요',
              })}
            />
            {errors.password && (
              <div className="err">{errors.password.message}</div>
            )}
          </Line>
          <Line>
            <label>새 비밀번호</label>
            <Input
              type="password"
              autoComplete="off"
              placeholder="새 비밀번호를 입력해주세요"
              isInvalid={!!errors.new_password}
              onKeyPress={(e) => {
                if (e.getModifierState('CapsLock')) {
                  setCapsLock(true);
                } else {
                  setCapsLock(false);
                }
              }}
              {...register('new_password', {
                required: '새 비밀번호를 입력해주세요.',
                pattern: {
                  value: passwordRegEx,
                  message: '비밀번호 형식에 맞지 않습니다.',
                },
              })}
            />
            {errors.new_password && (
              <div className="err">{errors.new_password.message}</div>
            )}
            {capslock ? (
              <div
                style={{
                  color: 'blue',
                  fontSize: '1.29rem',
                  marginTop: '0.2rem',
                }}
              >
                CapsLock이 켜져 있습니다.
              </div>
            ) : null}
            <div
              style={{
                color: 'gray',
                fontSize: '1.29rem',
              }}
            >
              비밀번호는 영문자,숫자,특수문자(!@#$%^&*)를 1개 이상 조합하여
              8~16자로 입력해주세요.
            </div>
          </Line>
          <Line>
            <label>새 비밀번호 확인</label>
            <Input
              type="password"
              autoComplete="off"
              placeholder="새 비밀번호를 확인해주세요"
              isInvalid={!!errors.new_password_check}
              {...register('new_password_check', {
                required: '새 비밀번호를 확인해주세요.',
                validate: (value) =>
                  value === passwordRef.current ||
                  '비밀번호가 동일하지 않습니다.',
              })}
            />
            {errors.new_password_check && (
              <div className="err">{errors.new_password_check.message}</div>
            )}
          </Line>
          <div className="btn">
            <button
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              취소
            </button>
            <button className="submit">확인</button>
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
      </Container>
    </Wrap>
  );
};

export default ChangePw;

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

const Container = styled.div`
  width: 55rem;
  @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
    width: 35rem;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      font-size: 1.92rem;
      cursor: pointer;
    }
    margin-bottom: 8rem;
  }
`;

const PostForm = styled.form`
  .btn {
    display: flex;
    justify-content: end;
    margin-top: 3rem;
    @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
      display: flex;
      justify-content: space-between;
    }

    button {
      width: 13.5rem;
      height: 4.8rem;
      font-size: 1.6rem;
    }

    .cancel {
      margin-right: 1rem;
      background: #fff;
      color: #00c7ae;
      border: 1px solid #e1e1e1;
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
    font-size: 1.29rem;
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
  font-size: 1.34rem;
  margin-top: 4rem;
  .copyright {
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
