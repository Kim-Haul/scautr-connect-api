import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../../shared/type/Interface';
import apis from '../../shared/apis';
import {
  getCookie,
  setCookieToken,
  setCookieRefreshToken,
} from '../../shared/cookie';
import { FallingSnow } from '../../components/etc/Snowflake';

const Login = () => {
  const navigate = useNavigate();
  const [save_id, SetSaveId] = useState<boolean>(false);
  const [capslock, setCapsLock] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  // 로그인 동작
  const onSubmit = async (data: FormValues) => {
    const info = {
      account: data.id,
      password: data.password,
    };
    // 아이디 저장 여부 확인
    if (save_id) {
      document.cookie = `ID=${data.id}; max-age=604800; path=/`;
    } else {
      document.cookie = `ID=${data.id}; max-age=1; path=/`;
    }
    // 로그인 로직
    try {
      const res = await apis.login(info);
      setCookieToken(res.data.result[0].accessToken);
      setCookieRefreshToken(res.data.result[0].refreshToken);
      window.location.reload();
    } catch (e: any) {
      if (e.response?.data.message === 'ACCOUNT_UNAPPROVED_ERR') {
        alert('승인 대기중인 계정입니다.');
      } else if (e.response?.data.message === 'ACCOUNT_NOTFOUND_ERR') {
        alert('등록되지 않은 아이디입니다.');
      } else if (
        e.response?.data.message === 'PASSWORD_DISCREPANCY_ERR' ||
        e.response?.data.message === 'PASSWORD_FORMAT_ERR'
      ) {
        alert('올바른 비밀번호를 입력해주세요.');
      } else if (e.response?.data.message === 'ACCOUNT_LOCKED_ERR') {
        alert('비밀번호를 5회 이상 잘못 입력하여 잠긴 계정입니다.');
      } else {
        alert('아이디 혹은 비밀번호를 다시 확인해주세요.');
      }
    }
  };

  // 데모 체험용 계정 로그인 동작
  const DemoOnSumit = async () => {
    // 0~5 난수 생성
    const lastNum = Math.floor(Math.random() * 81) + 10;
    const info = {
      account: `demo${lastNum}`,
      password: 'demo000!',
    };
    // 로그인 로직
    try {
      const res = await apis.login(info);
      setCookieToken(res.data.result[0].accessToken);
      setCookieRefreshToken(res.data.result[0].refreshToken);
      window.location.reload();
    } catch (e: any) {
      if (
        e.response?.data.message === 'ACCOUNT_UNAPPROVED_ERR' ||
        e.response?.data.message === 'COMPANY_UNAPPROVED_ERR'
      ) {
        alert('승인 대기중인 계정입니다.');
      } else if (e.response?.data.message === 'ACCOUNT_NOTFOUND_ERR') {
        alert('등록되지 않은 아이디입니다.');
      } else if (
        e.response?.data.message === 'PASSWORD_DISCREPANCY_ERR' ||
        e.response?.data.message === 'PASSWORD_FORMAT_ERR'
      ) {
        alert('올바른 비밀번호를 입력해주세요.');
      } else if (e.response?.data.message === 'ACCOUNT_LOCKED_ERR') {
        alert('비밀번호를 5회 이상 잘못 입력하여 잠긴 계정입니다.');
      } else {
        alert('아이디 혹은 비밀번호를 다시 확인해주세요.');
      }
    }
  };

  // 아이디 저장 체크박스 여부 검증
  useEffect(() => {
    if (getCookie('ID')) {
      SetSaveId(true);
    }
  }, []);

  return (
    <Wrap>
      <PostForm onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="logo">
            <img
              src="/images/scautr_dark.svg"
              alt="스카우터 로고"
              onClick={() => {
                window.location.reload();
              }}
            />
          </div>
          <Line>
            <label htmlFor="inputId">ID</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="아이디를 입력해주세요"
              isInvalid={!!errors.id}
              defaultValue={getCookie('ID')}
              id="inputId"
              {...register('id', {
                required: '아이디를 입력해주세요.',
              })}
            />
            {errors.id && <div className="err">{errors.id.message}</div>}
          </Line>
          <Line>
            <label htmlFor="inputPassword">PASSWORD</label>
            <Input
              type="password"
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요"
              isInvalid={!!errors.password}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.getModifierState('CapsLock')) {
                  setCapsLock(true);
                } else {
                  setCapsLock(false);
                }
              }}
              id="inputPassword"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password && (
              <div className="err">{errors.password.message}</div>
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
          </Line>
          <div className="toolbox">
            <div className="save">
              <input
                type="checkbox"
                checked={save_id}
                onClick={() => SetSaveId(!save_id)}
                readOnly
              />
              <div>아이디 저장</div>
            </div>
            <div
              className="find_pw"
              onClick={() => {
                navigate('/find_pw');
              }}
            >
              비밀번호 찾기
            </div>
          </div>
          <button className="btn-login">로그인</button>
          <button
            className="btn-login-demo"
            onClick={(e) => {
              e.preventDefault();
              DemoOnSumit();
            }}
          >
            데모 체험용 로그인
          </button>
          <div className="link-agree">
            <span
              onClick={() => {
                navigate('/agree');
              }}
            >
              회원가입
            </span>
          </div>
        </div>
        <FallingSnow />
      </PostForm>
      <Footer>
        <div>
          <ul>
            <li>주식회사 엣지크로스</li>
            <li>스카우터</li>
            <li>사업자등록번호 119-87-05616</li>
          </ul>
        </div>
        <div className="copyright">
          <div>Copyright © EdgeCross Inc. All Rights Reserved.</div>
        </div>
      </Footer>
    </Wrap>
  );
};

export default Login;

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
  // 눈내리는 날 애니메이션 효과 relative
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
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
    .toolbox {
      display: flex;
      justify-content: space-between;
      font-size: 1.3rem;
      .save {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          margin-right: 5px;
        }
      }
      .find_pw {
        cursor: pointer;
      }
    }
    button {
      width: 100%;
      height: 5rem;
      margin: 1.2rem 0;
      font-size: 1.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-login-demo {
      background-color: #108af9;
    }
    .link-agree {
      font-size: 1.3rem;
      color: gray;
      text-align: end;
      span {
        cursor: pointer;
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
  margin: 4rem 0;
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
