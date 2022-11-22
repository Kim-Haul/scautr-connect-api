import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../shared/type/ISginup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Signup = () => {
  const navigate = useNavigate();
  const [is_pw_show, setIsPwShow] = useState<string>('password');
  const [click_slave, setClickSlave] = useState<boolean>(true);
  const [idOk, setIdOk] = useState<boolean>(false);
  const [emailOk, setEmailOk] = useState<boolean>(false);

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
          <Line style={{ marginTop: '4rem' }}>
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
            <label htmlFor="inputPhone">휴대전화</label>
            <div className="phone">
              <Input
                type="text"
                autoComplete="off"
                placeholder="010"
                isInvalid={!!errors.phone1}
                maxLength={3}
                id="inputPhone"
                {...register('phone1', {
                  required: true,
                })}
              />
              <span>-</span>
              <Input
                type="text"
                autoComplete="off"
                placeholder="1234"
                isInvalid={!!errors.phone2}
                maxLength={4}
                {...register('phone2', {
                  required: true,
                })}
              />
              <span>-</span>
              <Input
                type="text"
                autoComplete="off"
                placeholder="5678"
                isInvalid={!!errors.phone3}
                maxLength={4}
                {...register('phone3', {
                  required: true,
                })}
              />
            </div>
            {(errors.phone1 || errors.phone2 || errors.phone3) && (
              <>
                <div className="err">휴대전화를 입력해주세요.</div>
              </>
            )}
          </Line>
          <Line>
            <div className="overlap">
              <label htmlFor="inputEmail">이메일</label>
              <div
                className="overlap check"
                onClick={() => {
                  setEmailOk(!emailOk);
                }}
              >
                인증코드
              </div>
            </div>
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
          </Line>
          {emailOk ? (
            <Line>
              <label htmlFor="inputMailCode">인증코드</label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="인증코드를 입력해주세요"
                isInvalid={!!errors.mailCode}
                id="inputMailCode"
                {...register('mailCode', {
                  required: '인증코드를 입력해주세요.',
                })}
              />
              {errors.mailCode && (
                <div className="err">{errors.mailCode.message}</div>
              )}
            </Line>
          ) : null}

          {/*  ----------- 기업 / 개인 선택버튼 ----------- */}
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
          {/*  ----------- 세번째 INFO ----------- */}
          {click_slave ? (
            <Line style={{ marginTop: '2.5rem' }}>
              <label htmlFor="inputCompanyCode">회사코드</label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="회사코드를 입력해주세요"
                isInvalid={!!errors.companyCode}
                id="inputCompanyCode"
                {...register('companyCode', {
                  required: '회사코드를 입력해주세요.',
                })}
              />
              {errors.companyCode && (
                <div className="err">{errors.companyCode.message}</div>
              )}
            </Line>
          ) : (
            <React.Fragment>
              <Line style={{ marginTop: '2.5rem' }}>
                <label htmlFor="inputCompanyName">회사명</label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="회사명을 입력해주세요"
                  isInvalid={!!errors.company}
                  id="inputCompanyName"
                  {...register('company', {
                    required: '회사명을 입력해주세요.',
                  })}
                />
                {errors.company && (
                  <div className="err">{errors.company.message}</div>
                )}
              </Line>
              <Line>
                <label htmlFor="inputRepresentative">대표자명</label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="대표자명을 입력해주세요"
                  isInvalid={!!errors.representative}
                  id="inputRepresentative"
                  {...register('representative', {
                    required: '대표자명을 입력해주세요.',
                  })}
                />
                {errors.representative && (
                  <div className="err">{errors.representative.message}</div>
                )}
              </Line>
              <Line>
                <label htmlFor="inputRegistrationNumber">사업자 등록번호</label>
                <div className="registrationNumber">
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="012"
                    isInvalid={!!errors.registrationNumber1}
                    maxLength={3}
                    id="inputRegistrationNumber"
                    {...register('registrationNumber1', {
                      required: true,
                    })}
                  />
                  {errors.registrationNumber1 && (
                    <div className="err">
                      {errors.registrationNumber1.message}
                    </div>
                  )}
                  <span>-</span>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="34"
                    isInvalid={!!errors.registrationNumber2}
                    maxLength={2}
                    {...register('registrationNumber2', {
                      required: true,
                    })}
                  />
                  {errors.registrationNumber2 && (
                    <div className="err">
                      {errors.registrationNumber2.message}
                    </div>
                  )}
                  <span>-</span>
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="56789"
                    isInvalid={!!errors.registrationNumber3}
                    maxLength={5}
                    {...register('registrationNumber3', {
                      required: true,
                    })}
                  />
                  {errors.registrationNumber3 && (
                    <div className="err">
                      {errors.registrationNumber3.message}
                    </div>
                  )}
                </div>
                {(errors.registrationNumber1 ||
                  errors.registrationNumber2 ||
                  errors.registrationNumber3) && (
                  <>
                    <div className="err">사업자 등록번호를 입력해주세요.</div>
                  </>
                )}
              </Line>
            </React.Fragment>
          )}
          <button type="submit" className="btn-login">
            가입하기
          </button>
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
    .btn-login {
      width: 100%;
      height: 4.8rem;
      font-size: 1.6rem;
      margin-top: 2.2rem;
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
  .phone {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 28%;
      text-align: center;
    }
  }
  .registrationNumber {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 28%;
      text-align: center;
    }
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
