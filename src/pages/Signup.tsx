import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../shared/type/ISginup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Signup = () => {
  const navigate = useNavigate();
  const [is_pw_show, setIsPwShow] = useState<string>('password');
  const [click_slave, setClickSlave] = useState<boolean>(false);
  const [idOk, setIdOk] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = async () => {};

  // id, pw 정규식
  const idRegEx = /^[a-z]+[a-z0-9]{5,14}$/g;
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  // 아이디 변경시(onChange 핸들러)
  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdOk(false);
  };

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

          {/*  ----------- 첫번째 INFO ----------- */}
          <Line>
            <div className="overlap">
              <label htmlFor="inputId">아이디</label>
              <div className="overlap check">중복확인</div>
            </div>

            <Input
              type="text"
              autoComplete="off"
              placeholder="아이디를 입력해주세요"
              isInvalid={!!errors.id}
              id="inputId"
              {...register('id', {
                required: '사용하실 아이디를 입력해주세요.',
                onChange: onIdChange,
                validate: () => idOk || '중복확인이 필요합니다.',
                pattern: {
                  value: idRegEx,
                  message:
                    '영문자로 시작하는 6~15자를 입력해주세요. (소문자, 숫자)',
                },
              })}
            />
            {errors.id && <div className="err">{errors.id.message}</div>}
          </Line>

          <Line>
            <div className="overlap">
              <label htmlFor="inputPassword">비밀번호</label>
              {is_pw_show === 'password' ? (
                <div
                  className="pw_show"
                  onClick={() => {
                    setIsPwShow('text');
                  }}
                >
                  <AiOutlineEyeInvisible />
                </div>
              ) : (
                <div
                  className="pw_show"
                  onClick={() => {
                    setIsPwShow('password');
                  }}
                >
                  <AiOutlineEye />
                </div>
              )}
            </div>

            <Input
              type={is_pw_show}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                [' '].includes(e.key) && e.preventDefault()
              }
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요"
              isInvalid={!!errors.password}
              id="inputPassword"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password && (
              <div className="err">{errors.password.message}</div>
            )}
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
            <label htmlFor="inputPasswordCheck">비밀번호 재확인</label>
            <Input
              type="password"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                [' '].includes(e.key) && e.preventDefault()
              }
              autoComplete="off"
              placeholder="비밀번호를 확인해주세요"
              isInvalid={!!errors.password_check}
              id="inputPasswordCheck"
              {...register('password_check', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password_check && (
              <div className="err">{errors.password_check.message}</div>
            )}
          </Line>

          {/*  ----------- 두번째 INFO ----------- */}

          <Line style={{ marginTop: '3.2rem' }}>
            <label htmlFor="inputName">이름</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="이름을 입력해주세요"
              isInvalid={!!errors.password_check}
              id="inputName"
              {...register('name', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password_check && (
              <div className="err">{errors.password_check.message}</div>
            )}
          </Line>

          <div className="btn">
            <button
              className="btn-slave"
              onClick={(e) => {
                e.preventDefault();
                setClickSlave(true);
              }}
              style={{
                backgroundColor: click_slave ? '' : 'rgba(0, 199, 174, 0.3)',
              }}
            >
              개인
            </button>

            <button
              className="btn-master"
              onClick={(e) => {
                e.preventDefault();
                setClickSlave(false);
              }}
              style={{
                backgroundColor: click_slave ? 'rgba(253, 171, 61, 0.3)' : '',
              }}
            >
              기업
            </button>
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

export default Signup;

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

      .btn-slave {
        background-color: ${(props) => props.theme.color.Green};
      }

      .btn-master {
        background-color: ${(props) => props.theme.color.Orange};
      }
    }
  }
`;

const Line = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;

  .overlap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .overlap.check {
    color: gray;
    font-size: 1.3rem;
    cursor: pointer;
  }

  .pw_show {
    color: gray;
    cursor: pointer;
  }

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
