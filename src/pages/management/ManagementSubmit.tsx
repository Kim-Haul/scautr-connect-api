import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { FormValues, IStyleProps } from '../../shared/type/IManagement';
import Select from 'react-select';

const ManagementSubmit = () => {
  const navigate = useNavigate();

  // react-select 라이브러리 기본 옵션 및 스타일 적용
  const MachineNameOptions = [
    { value: '자동열성형포장기', label: '자동열성형포장기' },
    { value: '금속검출기', label: '금속검출기' },
    { value: '엑스레이식품검사기', label: '엑스레이식품검사기' },
  ];

  const MachineOptions = [
    { value: '자동정량충전기', label: '자동정량충전기' },
    { value: '라벨러', label: '라벨러' },
    { value: '파워케이블연장', label: '파워케이블연장' },
  ];

  const colourStyles = {
    control: (style: any) => ({
      ...style,
      fontSize: '1.5rem',
      width: '100%',
      minHeight: '5rem',
    }),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = async () => {};

  return (
    <Wrap>
      <Title>
        <div className="main">신규 거래 등록</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>설비관리</span>
          <IoIosArrowForward /> <span>등록하기</span>
        </div>
      </Title>
      <Container>
        <PostForm onSubmit={handleSubmit(onSubmit)}>
          {/* -------------------- 1 --------------------  */}
          <Line>
            <div className="title">출고일</div>
            <hr />
            <div className="content">
              <Input
                type="date"
                autoComplete="off"
                isInvalid={!!errors.date}
                id="inputDate"
                {...register('date', {
                  required: '출고날짜를 입력해주세요.',
                })}
              />
            </div>
          </Line>
          {/* -------------------- 2 --------------------  */}
          <Line>
            <div className="title">기계 정보</div>
            <hr />
            {/* -------------------- 2-1 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label>설비 선택</label>
                <Select
                  options={MachineNameOptions}
                  defaultValue={MachineNameOptions[0]}
                  styles={colourStyles}
                />
              </div>
              <div className="content_right">
                <label htmlFor="inputMachineSerialNumber">S/N</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.machine_serial_number}
                  id="inputMachineSerialNumber"
                  {...register('machine_serial_number', {
                    required: '시리얼 번호를 입력해주세요.',
                  })}
                />
                {errors.machine_serial_number && (
                  <div className="err">
                    {errors.machine_serial_number.message}
                  </div>
                )}
              </div>
            </div>
            {/* -------------------- 2-2 --------------------  */}
            <div className="content full_width">
              <label>옵션 선택</label>
              <Select
                options={MachineOptions}
                defaultValue={MachineOptions[0]}
                styles={colourStyles}
                isMulti
              />
            </div>
          </Line>

          {/* -------------------- 3 --------------------  */}
          <Line>
            <div className="title">거래처 정보</div>
            <hr />
            {/* -------------------- 3-1 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputCompanyName">거래처명</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.company_name}
                  id="inputCompanyName"
                  {...register('company_name', {
                    required: '거래처명을 입력해주세요.',
                  })}
                />
                {errors.company_name && (
                  <div className="err">{errors.company_name.message}</div>
                )}
              </div>
              <div className="content_right">
                <label htmlFor="inputCompanyAddress">주소</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.comapny_address}
                  id="inputCompanyAddress"
                  {...register('comapny_address', {
                    required: '주소를 입력해주세요.',
                  })}
                />
                {errors.comapny_address && (
                  <div className="err">{errors.comapny_address.message}</div>
                )}
              </div>
            </div>
            {/* -------------------- 3-2 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputCompanyContact">회사 연락처</label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="-를 포함하여 입력해주세요"
                  isInvalid={!!errors.company_contact}
                  id="inputCompanyContact"
                  {...register('company_contact', {
                    required: '회사 연락처를 입력해주세요.',
                  })}
                />
                {errors.company_contact && (
                  <div className="err">{errors.company_contact.message}</div>
                )}
              </div>
              <div className="content_right">
                <label htmlFor="inputCompanyEmail">회사 이메일</label>
                <Input
                  type="email"
                  autoComplete="off"
                  isInvalid={!!errors.comapny_email}
                  id="inputCompanyEmail"
                  {...register('comapny_email', {
                    required: '회사 이메일을 입력해주세요.',
                  })}
                />
                {errors.comapny_email && (
                  <div className="err">{errors.comapny_email.message}</div>
                )}
              </div>
            </div>
          </Line>
          {/* -------------------- 4 --------------------  */}
          <Line>
            <div className="title">거래처 관리자</div>
            <hr />
            {/* -------------------- 4-1 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputCompanyManager">관리자</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.company_manager}
                  id="inputCompanyManager"
                  {...register('company_manager', {
                    required: '거래처 관리자를 입력해주세요.',
                  })}
                />
                {errors.company_manager && (
                  <div className="err">{errors.company_manager.message}</div>
                )}
              </div>
              <div className="content_right">
                <label htmlFor="inputManagerDepartment">소속</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.manager_department}
                  id="inputManagerDepartment"
                  {...register('manager_department', {
                    required: '소속을 입력해주세요.',
                  })}
                />
                {errors.manager_department && (
                  <div className="err">{errors.manager_department.message}</div>
                )}
              </div>
            </div>
            {/* -------------------- 4-2 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputManagerPhone">관리자 연락처</label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="-를 포함하여 입력해주세요"
                  isInvalid={!!errors.manager_phone}
                  id="inputManagerPhone"
                  {...register('manager_phone', {
                    required: '관리자 연락처를 입력해주세요.',
                  })}
                />
                {errors.manager_phone && (
                  <div className="err">{errors.manager_phone.message}</div>
                )}
              </div>
              <div className="content_right">
                <label htmlFor="inputManagerEmail">관리자 이메일</label>
                <Input
                  type="email"
                  autoComplete="off"
                  isInvalid={!!errors.manager_email}
                  id="inputManagerEmail"
                  {...register('manager_email', {
                    required: '관리자 이메일을 입력해주세요.',
                  })}
                />
                {errors.manager_email && (
                  <div className="err">{errors.manager_email.message}</div>
                )}
              </div>
            </div>
          </Line>
          {/* -------------------- 5 --------------------  */}
          <Line>
            <div className="title">비고</div>
            <hr />
            <div className="content full_width">
              <Input type="text" autoComplete="off" />
            </div>
          </Line>
          {/* -------------------- 버튼 --------------------  */}
          <Line>
            <div className="btn_box">
              <button
                className="btn_left"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                취소
              </button>
              <button className="btn_right">등록</button>
            </div>
          </Line>
        </PostForm>
      </Container>
    </Wrap>
  );
};

export default ManagementSubmit;

const Wrap = styled.div`
  width: 98.5%;
  font-size: 1.6rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .main {
    color: #495057;
    font-weight: 600;
    font-size: 2rem;
  }
  .sub {
    color: #495057;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    svg {
      margin: 0 0.3rem;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid #e9edf3;
  padding: 1.6rem;
  background: #f6f7fb;
`;

const PostForm = styled.form``;

const Line = styled.div`
  margin-bottom: 2rem;
  .title {
    font-weight: 700;
    font-size: 18px;
  }
  hr {
    margin-top: 2rem;
    background: #323338;
    height: 2px;
    outline: none;
    border: none;
  }
  .content {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    margin-top: 2rem;
    .err {
      color: red;
      font-size: 1.3rem;
      margin-top: 0.5rem;
    }
    label {
      margin-bottom: 1rem;
    }
    .content_left {
      display: flex;
      flex-direction: column;
    }
    .content_right {
      display: flex;
      flex-direction: column;
    }
  }
  .content.full_width {
    grid-template-columns: 1fr;
  }
  .btn_box {
    button {
      width: 160px;
      height: 45px;
      font-weight: 700;
      font-size: 1.6rem;
      @media (max-width: 1100px) {
        width: 40%;
      }
    }
    // 수정할때 삭제버튼을 위해 잠시 남겨둠
    .btn_left {
      margin-right: 7px;
      background-color: #fff;
      border: 1px solid #e9edf3;
      color: #9497a8;
    }
    .btn_right {
      background-color: ${(props) => props.theme.color.PastelBlue};
    }
    display: flex;
    justify-content: center;
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
  font-size: 1.5rem;
  font-family: 'Noto Sans KR', sans-serif;
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
