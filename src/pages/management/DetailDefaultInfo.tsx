import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apis from '../../shared/apis';
import { IParamsProps } from '../../shared/type/Interface';
import AsHistoryModal from '../../components/modal/as/AsHistoryModal';

const DetailDefaultInfo = (props: IParamsProps) => {
  // 등록 모달창 토글
  const [is_open, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // 디테일 페이지 기계 기본 정보 호출 api
  const getDetailMachineInfo = async () => {
    try {
      const res = await apis.getDetailMachineInfo(props.view);
      return res;
    } catch (err) {
      console.log('설비 상세정보를 불러오는데 실패했습니다.');
    }
  };

  // 디테일 페이지 기계 기본 정보 호출 쿼리
  const { data: detailMachineInfoQuery } = useQuery(
    ['loadDetailMachineInfo', props.view],
    getDetailMachineInfo,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('설비 상세정보를 불러오는데 실패했습니다.');
      },
    }
  );


  return (
    <Wrap>
      <CustomerInfo>
        <div className="customer_info_title">
          <div className="top_left">거래처 정보</div>
          <div className="top_right">
            <button
              className="btn_left"
              onClick={() => {
                navigate('/scautr/management/edit', {
                  state: {
                    // 수정 페이지 defaultValue값 설정을 위해 state로 넘겨주기
                    installedDate: detailMachineInfoQuery?.data.result[0].installedDate,
                    equipmentId: detailMachineInfoQuery?.data.result[0].equipmentId,

                    registrationNumber: detailMachineInfoQuery?.data.result[0].registrationNumber,
                    // 기계명이랑 옵션을 그대로 edit로 넘겨서 select의 default 값으로 설정 고려사항
                    assignedName: detailMachineInfoQuery?.data.result[0].assignedName,
                    option: detailMachineInfoQuery?.data.result[0].option,
                    serialNumber: detailMachineInfoQuery?.data.result[0].serialNumber,
                    macAddress: detailMachineInfoQuery?.data.result[0].macAddress,
                    modelId: detailMachineInfoQuery?.data.result[0].modelId,
                    modelIndex: detailMachineInfoQuery?.data.result[0].modelIndex,
                    options: detailMachineInfoQuery?.data.result[0].options,
                    optionIndex: detailMachineInfoQuery?.data.result[0].optionIndex,

                    companyName: detailMachineInfoQuery?.data.result[0].companyName,
                    companyAddress: detailMachineInfoQuery?.data.result[0].companyAddress,
                    companyPhone: detailMachineInfoQuery?.data.result[0].companyPhone,
                    companyEmail: detailMachineInfoQuery?.data.result[0].companyEmail,
                    customerName: detailMachineInfoQuery?.data.result[0].customerName,
                    customerPhone: detailMachineInfoQuery?.data.result[0].customerPhone,
                    customerEmail: detailMachineInfoQuery?.data.result[0].customerEmail,
                    customerDepartment: detailMachineInfoQuery?.data.result[0].customerDepartment,
                    customerId: detailMachineInfoQuery?.data.result[0].customerId,

                    supplierName: detailMachineInfoQuery?.data.result[0].supplierName,
                    note: detailMachineInfoQuery?.data.result[0].note,
                    supplierDepartment: detailMachineInfoQuery?.data.result[0].supplierDepartment,
                    supplierPhone: detailMachineInfoQuery?.data.result[0].supplierPhone,
                    supplierEmail: detailMachineInfoQuery?.data.result[0].supplierEmail,

                    latitude: detailMachineInfoQuery?.data.result[0].latitude,
                    longitude: detailMachineInfoQuery?.data.result[0].longitude,
                  },
                });
              }}
            >
              수정하기
            </button>
            <button className="btn_left"
              onClick={() => {
                setIsOpen(true);
              }}>A/S 이력</button>
            <button className="btn_right">알림전송</button>
          </div>
        </div>
        <div className="customer_info_table">
          <table>
            <thead>
              <tr>
                <th className="th0"></th>
                <th className="th1"></th>
                <th className="th2"></th>
                <th className="th3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table_title">업체명</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].companyName}
                </td>
                <td className="table_title"> 출고날짜</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].installedDate}
                </td>
              </tr>
              <tr>
                <td className="table_title">회사 주소</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].companyAddress}
                </td>
                <td className="table_title">회사 연락처</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].companyPhone}
                </td>
              </tr>
              <tr>
                <td className="table_title">담당자</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].customerName}
                </td>
                <td className="table_title">담당자 연락처</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].customerPhone}
                </td>
              </tr>
              <tr>
                <td className="table_title">담당자 이메일</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].customerEmail}
                </td>
                <td className="table_title">회사 이메일</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].companyEmail}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CustomerInfo>

      <MachineInfo>
        <div className="machine_info_title">
          <div className="top_left">기계 정보</div>
        </div>
        <div className="machine_info_table">
          <table>
            <thead>
              <tr>
                <th className="th0"></th>
                <th className="th1"></th>
                <th className="th2"></th>
                <th className="th3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table_title">장비</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].assignedName}(
                  {detailMachineInfoQuery?.data.result[0].model})
                </td>
                <td className="table_title"> 장비 S/N</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].serialNumber}
                </td>
              </tr>
              <tr>
                <td className="table_title">옵션</td>
                <td colSpan={3} className="table_content">
                  {detailMachineInfoQuery?.data.result[0].option}
                </td>
              </tr>
              <tr>
                <td className="table_title">모드링크</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].macAddress !== null
                    ? '연동'
                    : '미연동'}
                </td>
                <td className="table_title">MAC</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].macAddress !== null
                    ? detailMachineInfoQuery?.data.result[0].macAddress
                    : '미연동'}
                </td>
              </tr>
              <tr>
                <td className="table_title">프로직스</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].customerCode !== null
                    ? '연동'
                    : '미연동'}
                </td>
                <td className="table_title">가동상태</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].operation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </MachineInfo>

      <ManagementInfo>
        <div className="machine_info_title">
          <div className="top_left">관리자 정보</div>
        </div>
        <div className="machine_info_table">
          <table>
            <thead>
              <tr>
                <th className="th0"></th>
                <th className="th1"></th>
                <th className="th2"></th>
                <th className="th3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table_title">관리자</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].supplierName}
                </td>
                <td className="table_title">관리자 이메일</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].supplierEmail}
                </td>
              </tr>
              <tr>
                <td className="table_title">소속</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].supplierDepartment}
                </td>
                <td className="table_title">관리자 연락처</td>
                <td className="table_content">
                  {detailMachineInfoQuery?.data.result[0].supplierPhone}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ManagementInfo>

    {/* A/S 이력 모달창 */}
      <AsHistoryModal
        open={is_open}
        setIsOpen={setIsOpen}
        header="A/S 이력"
        model={detailMachineInfoQuery?.data.result[0].model}
        view={props.view}
      />
    </Wrap>
  );
};

export default DetailDefaultInfo;

const Wrap = styled.div``;
const CustomerInfo = styled.div`
  // 화면 축소시 테이블 column 깨지는거 방지
  @media (max-width: 1400px) {
    display: none;
  }
  .customer_info_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_left {
      font-weight: 600;
      font-size: 1.8rem;
    }
    .top_right {
      display: flex;
      button {
        width: 106.1px;
        height: 40px;
        font-weight: 700;
        font-size: 1.6rem;
        @media (max-width: 1100px) {
          width: 23%;
        }
      }
      .btn_left {
        background-color: #fff;
        border: 1px solid #ced4da;
        color: ${(props) => props.theme.color.PastelBlue};
        margin-right: 7px;
      }
      .btn_right {
        background-color: ${(props) => props.theme.color.PastelBlue};
        color: #f5f7fa;
      }
    }
  }
`;

const MachineInfo = styled.div`
  // 화면 축소시 테이블 column 깨지는거 방지
  @media (max-width: 1400px) {
    display: none;
  }
  .machine_info_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .top_left {
      font-weight: 600;
      font-size: 1.8rem;
    }
  }
`;

const ManagementInfo = styled.div`
  // 화면 축소시 테이블 column 깨지는거 방지
  @media (max-width: 1400px) {
    display: none;
  }
  .machine_info_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .top_left {
      font-weight: 600;
      font-size: 1.8rem;
    }
  }
`;
