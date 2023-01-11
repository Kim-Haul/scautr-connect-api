import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../../shared/type/Interface';
import apis from '../../shared/apis';
import { useTranslation } from 'react-i18next';

const FindPw = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  // 비밀번호 찾기 동작
  const onSubmit = async (data: FormValues) => {
    const info = {
      name: data.name,
      email: data.email,
      account: data.id,
    };
    try {
      await apis.findPw(info);
      alert('등록하신 이메일로 임시 비밀번호를 발송합니다!');
      navigate('/');
    } catch (e) {
      alert('올바른 회원정보를 입력해주세요.');
    }
  };

  const darkModeLogo = localStorage.getItem('darkMode');
  return (
    <Wrap>
      <PostForm onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="logo">
            {darkModeLogo === 'on' ? (
              <img
                src="/images/scautr_light.svg"
                alt="스카우터 로고"
                onClick={() => {
                  window.location.reload();
                }}
              />
            ) : (
              <img
                src="/images/scautr_dark.svg"
                alt="스카우터 로고"
                onClick={() => {
                  window.location.reload();
                }}
              />
            )}
          </div>
          <Line>
            <label htmlFor="inputId">{t('findPw.id')}</label>
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
            <label htmlFor="inputName">{t('findPw.name')}</label>
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
            <label htmlFor="inputEmail">{t('findPw.email')}</label>
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
              {t('findPw.cancel')}
            </button>
            <button className="btn-login">{t('findPw.check')}</button>
          </div>
        </div>
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

export default FindPw;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.darkMode.backgroundColor};
  color: ${(props) => props.theme.darkMode.fontColor};
  font-size: 1.6rem;
`;

const PostForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.darkMode.backgroundColor};
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
  background-color: ${(props) => props.theme.darkMode.inputBg};
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
  color: ${(props) => props.theme.darkMode.descColor};
  .copyright {
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
  }
  ul {
    list-style: none;
    display: flex;
    li {
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
