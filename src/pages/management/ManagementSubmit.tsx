import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import {
  FormValues,
  IStyleProps,
  ISelectOptionProps,
  IRegistrationOptionTableProps,
  IRegistrationMachineTableProps,
} from '../../shared/type/Interface';
import Select from 'react-select';
import Switch from '../../components/etc/Switch';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';
import GoogleGeocode from '../../components/graph/GoogleGeocode';

const ManagementSubmit = () => {
  const navigate = useNavigate();
  // 비고 input 내용 담기
  const noteRef = useRef<HTMLInputElement | any>(null);

  // select 설비 선택 호출 api
  const getSelectModel = async () => {
    try {
      const res = await apis.getSelectModel();
      return res;
    } catch (err) {
      console.log('select 박스 설비 목록을 불러오는데 실패했습니다.');
    }
  };

  // select 설비 선택 호출 쿼리
  const { data: getSelectModelQuery } = useQuery(
    ['loadSelectModel'],
    getSelectModel,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('select 박스 설비 목록을 불러오는데 실패했습니다.');
      },
    }
  );

  // select 옵션 선택 호출 api
  const getSelectOption = async () => {
    try {
      const res = await apis.getSelectOption();
      return res;
    } catch (err) {
      console.log('select 박스 옵션 목록을 불러오는데 실패했습니다.');
    }
  };

  // select 옵션 선택 호출 쿼리
  const { data: getSelectOptionQuery } = useQuery(
    ['loadSelectOption'],
    getSelectOption,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('select 박스 옵션 목록을 불러오는데 실패했습니다.');
      },
    }
  );

  // react-select 라이브러리 기본 옵션 및 스타일 적용
  const SelectModel = [
    getSelectModelQuery?.data.result.map(
      (v: IRegistrationMachineTableProps, i: number) => {
        return { value: v.modelId, label: v.assignedName };
      }
    ),
  ];

  const SelectOptions = [
    getSelectOptionQuery?.data.result.map(
      (v: IRegistrationOptionTableProps, i: number) => {
        return { value: v.optionId, label: v.option };
      }
    ),
  ];

  const colourStyles = {
    control: (style: any) => ({
      ...style,
      fontSize: '1.5rem',
      width: '100%',
      minHeight: '5rem',
    }),
  };

  // select로 선택된 값 가져오기
  const [selectModelState, setSelectModelState] = useState<number>();
  const [selectOptionState, setSelectOptionState] = useState<string>();

  // 폼 작성 로직
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  // 모드링크 맥주소 인증
  const [modlink_click, setModlinkClick] = useState<boolean>(false);
  const [macCheckOk, setMacCheckOk] = useState<boolean>(false);
  let currentMac = watch('mac_address');
  const macCheck = async () => {
    try {
      await apis.macCheck(currentMac);
      alert('인증되었습니다.');
      setMacCheckOk(true);
      clearErrors('mac_address');
    } catch (e) {
      setMacCheckOk(false);
      setError('mac_address', { message: '유효하지 않은 맥주소입니다.' });
    }
  };

  // 스위치 토글에 따라 렌더링 되는 input창 토글마다 초기화
  useEffect(() => {
    reset({ mac_address: '' });
    setMacCheckOk(false);
  }, [modlink_click, reset]);

  const onSubmit = async (data: FormValues) => {
    const content = {
      installedDate: data.date,

      macAddress: data.mac_address,
      modelId: selectModelState,
      serialNumber: data.machine_serial_number,
      options: selectOptionState,
      deliveryAddress: data.deliveryAddress,

      registrationNumber: data.registrationNumber,
      companyName: data.company_name,
      companyAddress: data.comapny_address,
      companyPhone: data.company_contact,
      companyEmail: data.comapny_email,
      customerName: data.customer_manager,
      customerDepartment: data.customer_department,
      customerPhone: data.customer_contact,
      customerEmail: data.customer_email,

      supplierName: data.company_manager,
      supplierDepartment: data.manager_department,
      supplierPhone: data.manager_phone,
      supplierEmail: data.manager_email,
      note: noteRef.current.value,

      latitude: geom?.lat,
      longitude: geom?.lng,
    };

    try {
      await apis.addManagement(content);
      navigate('/scautr/management');
    } catch (e) {
      alert('등록에 실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
    }
  };

  // 입력한 주소로부터 위도, 경도 받아오기
  const [geom, setGeom] = useState<any>(null);
  const currentAdress = watch('deliveryAddress');
  const handlelocation = async () => {
    if (currentAdress) {
      const { lat, lng } = await GoogleGeocode(currentAdress);
      setGeom({ lat: lat, lng: lng });
    }
  };

  const temp = async () => {
    const info = {
      modelId: 81,
      serialNumber: 'OTM500-3535',
      macAddress: '',
      installedDate: '2022-09-05',
      deliveryAddress: '서울특별시 구로구 디지털로31길 12',
      latitude: null,
      longitude: null,
      companyName: '아리따움',
      companyAddress: '서울특별시 구로구 아리길3',
      companyPhone: '010-2345-2345',
      companyEmail: 'arittaum@naver.com',
      registrationNumber: '111-1111-111',
      customerName: '인아리',
      customerDepartment: '영업부',
      customerPhone: '010-2314-1321',
      customerEmail: 'inari@naver.com',
    };
    try {
      await apis.addManagement(info);
      navigate('/scautr/management');
    } catch (e) {
      alert('등록에 실패하였습니다. 문제가 지속되면 담당부서로 연락바랍니다.');
    }
  };

  return (
    <Wrap>
      <div
        onClick={() => {
          temp();
        }}
      >
        전송
      </div>
      <Title>
        <div className="main">신규 거래 등록</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>설비관리</span>
          <IoIosArrowForward /> <span>등록하기</span>
        </div>
      </Title>
      <Container>
        <PostForm onSubmit={handleSubmit(onSubmit)}>
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
                <label> 스마트머신(MODLINK) 연동</label>
                <Switch
                  modlink_click={modlink_click}
                  setModlinkClick={setModlinkClick}
                />
              </div>
              <div className="content_right">
                {modlink_click ? (
                  <React.Fragment>
                    <label htmlFor="inputMacAddress">MAC</label>
                    <div className="macAddressbox">
                      <Input
                        type="text"
                        autoComplete="off"
                        isInvalid={!!errors.mac_address}
                        id="inputMacAddress"
                        disabled={macCheckOk}
                        {...register('mac_address', {
                          validate: () =>
                            macCheckOk ||
                            '유효한 모드링크인지 인증확인이 필요합니다.',
                          required: '모드링크 MAC을 입력해주세요.',
                        })}
                      />
                      <div>
                        <span
                          onClick={() => {
                            macCheck();
                          }}
                        >
                          인증확인
                        </span>
                      </div>
                    </div>

                    {errors.mac_address && (
                      <div className="err">{errors.mac_address.message}</div>
                    )}
                    {macCheckOk ? (
                      <div className="mac_address_err_resolve">
                        인증되었습니다.
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : null}
              </div>
            </div>
            {/* -------------------- 2-2 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label>설비 선택</label>
                <Select
                  options={SelectModel[0]}
                  styles={colourStyles}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) => {
                    setSelectModelState(e.value);
                  }}
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
            {/* -------------------- 2-3 --------------------  */}
            <div className="content full_width">
              <label>옵션 선택</label>
              <Select
                options={SelectOptions[0]}
                styles={colourStyles}
                isMulti
                onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) => {
                  setSelectOptionState(
                    e.map((v: ISelectOptionProps) => {
                      return v.value;
                    })
                  );
                }}
              />
            </div>
            {/* -------------------- 2-4 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputDeliveryAddress">기계 출고 위치</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.deliveryAddress}
                  id="inputDeliveryAddress"
                  {...register('deliveryAddress', {
                    required: '기계 출고 위치를 등록해주세요.',
                  })}
                  onBlur={() => {
                    handlelocation();
                  }}
                />
                {errors.deliveryAddress && (
                  <div className="err">{errors.deliveryAddress.message}</div>
                )}
              </div>
            </div>
          </Line>

          {/* -------------------- 3 --------------------  */}
          <Line>
            <div className="title">거래처 정보</div>
            <hr />
            {/* -------------------- 3-1 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputRegistrationNumber">사업자등록번호</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.date}
                  id="inputRegistrationNumber"
                  {...register('registrationNumber', {
                    required: '사업자등록번호를 입력해주세요.',
                  })}
                />
                {errors.registrationNumber && (
                  <div className="err">{errors.registrationNumber.message}</div>
                )}
              </div>
            </div>
            {/* -------------------- 3-2 --------------------  */}
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
            {/* -------------------- 3-3 --------------------  */}
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
            {/* -------------------- 3-4 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputCustomerManager">담당자</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.customer_manager}
                  id="inputCustomerManager"
                  {...register('customer_manager', {
                    required: '해당 거래처 담당자를 입력해주세요.',
                  })}
                />
                {errors.customer_manager && (
                  <div className="err">{errors.customer_manager.message}</div>
                )}
              </div>
              <div className="content_right">
                <label htmlFor="inputCustomerDepartment">소속</label>
                <Input
                  type="text"
                  autoComplete="off"
                  isInvalid={!!errors.customer_department}
                  id="inputCustomerDepartment"
                  {...register('customer_department', {
                    required: '소속을 입력해주세요.',
                  })}
                />
                {errors.customer_department && (
                  <div className="err">
                    {errors.customer_department.message}
                  </div>
                )}
              </div>
            </div>
            {/* -------------------- 3-5 --------------------  */}
            <div className="content">
              <div className="content_left">
                <label htmlFor="inputCustomerContact">담당자 연락처</label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="-를 포함하여 입력해주세요"
                  isInvalid={!!errors.company_contact}
                  id="inputCustomerContact"
                  {...register('customer_contact', {
                    required: '해당 거래처 담당자 연락처를 입력해주세요.',
                  })}
                />
                {errors.customer_contact && (
                  <div className="err">{errors.customer_contact.message}</div>
                )}
              </div>
              <div className="content_right">
                <label htmlFor="inputCustomerEmail">담당자 이메일</label>
                <Input
                  type="email"
                  autoComplete="off"
                  isInvalid={!!errors.customer_email}
                  id="inputCustomerEmail"
                  {...register('customer_email', {
                    required: '이메일을 입력해주세요.',
                  })}
                />
                {errors.customer_email && (
                  <div className="err">{errors.customer_email.message}</div>
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
                    required: '자사 거래처 관리자를 입력해주세요.',
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
                    required: '자사 관리자 연락처를 입력해주세요.',
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
                    required: '자사 관리자 이메일을 입력해주세요.',
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
              <Input type="text" autoComplete="off" ref={noteRef} />
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
  .macAddressbox {
    display: flex;
    border: 1px solid #ced4da;
    align-items: center;
    background-color: #fff;
    height: 5rem;
    input {
      width: 90%;
      height: 100%;
      border: none;
    }
    div {
      height: 100%;
      width: 10%;
      min-width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        cursor: pointer;
        padding: 5px;
        background-color: #35a3dc;
        border-radius: 8px;
        color: #fff;
      }
    }
  }
  .mac_address_err_resolve {
    color: #08a600;
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
