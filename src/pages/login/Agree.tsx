import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ICheckStateProps } from '../../shared/type/Interface';

const Agree = () => {
  const navigate = useNavigate();

  const [check, setCheck] = useState<ICheckStateProps>({
    first: false,
    second: false,
    third: false,
    all: false,
  });

  const allCheck: boolean = check.first && check.second && check.third;

  return (
    <Wrap>
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
        <form>
          <ul>
            <li>
              <div className="title">
                <input
                  type="checkbox"
                  id="inputFirst"
                  checked={check.first}
                  onClick={() => setCheck({ ...check, first: !check.first })}
                  readOnly
                />
                <label htmlFor="inputFirst">개인정보 취급방침</label>
              </div>

              <div className="desc">
                <p>
                  ㈜빛컨(이하 '회사')은 정보통신망 이용촉진 및 정보보호 등에
                  관한 법률, 개인정보보호법 등 관련법령에 의거한
                  개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고
                  있습니다.
                </p>
                <br />
                <p>
                  제1조(개인정보의 처리목적) 회사는 다음의 목적을 위하여
                  개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적
                  이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
                  개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한
                  조치를 이행할 예정입니다. 1. 홈페이지 회원 가입 및 관리 회원
                  가입의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증,
                  회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인,
                  서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시
                  법정대리인의 동의여부 확인, 각종 고지․통지, 고충처리 등을
                  목적으로 개인정보를 처리합니다. 2. 재화 또는 서비스 제공
                  물품배송, 서비스 제공, 계약서․청구서 발송, 콘텐츠 제공,
                  맞춤서비스 제공, 본인인증, 연령인증, 요금결제․정산, 채권추심
                  등을 목적으로 개인정보를 처리합니다. 3. 고충처리 민원인의 신원
                  확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리결과 통보
                  등의 목적으로 개인정보를 처리합니다.
                </p>
              </div>
            </li>
            <li>
              <div className="title">
                <input
                  type="checkbox"
                  id="inputSecond"
                  checked={check.second}
                  onClick={() => setCheck({ ...check, second: !check.second })}
                  readOnly
                />
                <label htmlFor="inputSecond">온라인 이용약관</label>
              </div>
              <div className="desc">
                <p>
                  온라인이용약관과 업무처리규칙 및 서비스수준협약(이하 “약관”)은
                  ㈜빛컨(이하 “빛컨”)이 제공하는 제품, 소프트웨어, 인적 서비스,
                  기능 등(이하 “서비스”)을 빛컨의 서비스 웹사이트(이하 “서비스
                  웹사이트”) 상에서 이용하고자 본 약관에 동의하는 주체(“고객”)
                  간 의무와 권리 및 책임사항을 정하고 있습니다. 본 약관에
                  동의하는 경우 ‘동의합니다’ 에 체크하십시오.
                </p>
              </div>
            </li>
            <li>
              <div className="title">
                <input
                  type="checkbox"
                  id="inputThird"
                  checked={check.third}
                  onClick={() => setCheck({ ...check, third: !check.third })}
                  readOnly
                />
                <label htmlFor="inputThird">서비스 수준 협약</label>
              </div>
              <div className="desc">
                <p>
                  계약기간 본 계약은 서비스 개시일로부터 효력이 발생하며 고객은
                  계약시 정한 주기 동안 유효하다. 다만 빛컨은 고객에게 계약기간
                  만료 전까지 계약기간 만료 일 계약종료 의사표시 계약의
                  자동연장에 관한 사항 등을 알려야 하고 고객이 다른 의사표시를
                  하지 않으면 같은 조건으로 종래 계약기간 동안 자동 연장된다.
                </p>
                <br />
                <p>
                  요금 및 지급방법 서비스 제공에 대한 대금 산정 및 대금지급
                  방법에 관하여는 이용약관에서 정한 바에 따른다.
                </p>
              </div>
            </li>
            <li>
              <div className="title">
                <input
                  type="checkbox"
                  id="inputAll"
                  checked={allCheck}
                  onClick={() =>
                    setCheck({
                      ...check,
                      first: !check.all,
                      second: !check.all,
                      third: !check.all,
                      all: !check.all,
                    })
                  }
                  readOnly
                />
                <label htmlFor="inputAll">
                  <strong>약관 전체 동의</strong>
                </label>
              </div>
            </li>
          </ul>
          <div className="btn">
            <button
              className="btn-cancel"
              onClick={() => {
                navigate('/');
              }}
            >
              취소
            </button>
            <button
              className="btn-login"
              onClick={() => {
                navigate('/signup');
              }}
              disabled={!allCheck}
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </Wrap>
  );
};

export default Agree;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    width: 46rem;
    .logo {
      margin-bottom: 3rem;
      img {
        width: 20rem;
        cursor: pointer;
      }
    }
    ul {
      list-style: none;
      li {
        margin-bottom: 15px;
        .title {
          input {
            margin-right: 3px;
            width: 1.6rem;
          }
          margin-bottom: 5px;
        }
        .desc {
          width: 46rem;
          height: 8.8rem;
          overflow-y: scroll;
          border: 1px solid #dadada;
          padding: 12px;
          font-size: 1.44rem;
          @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
            width: 36rem;
          }
        }
      }
    }
    .btn {
      display: flex;
      justify-content: space-between;
      button {
        width: 22.5rem;
        height: 4.8rem;
        font-size: 1.6rem;
        @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
          width: 17.6rem;
        }
      }
      .btn-cancel {
        background: #8e8e8e;
      }
    }
  }
`;
