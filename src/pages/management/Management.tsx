import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import Mobile from '../../components/exception/Mobile';
import ManagementTable from '../../components/table/ManagementTable';

const Management = () => {
  return (
    <Wrap>
      <Title>
        <div className="main">설비관리</div>
        <div className="sub">
          <span>SCAUTR</span> <IoIosArrowForward /> <span>설비관리</span>
        </div>
      </Title>
      <Container>
        <Top>
          <div className="top_left">
            <select>
              <option value="all">All</option>
              <option value="assignedName">기계명</option>
              <option value="model">모델명</option>
            </select>
            <input type="text" placeholder="검색" />
            <button className="btn_left">검색</button>
            <button className="btn_right">초기화</button>
          </div>
          <div className="top_right">
            <button className="btn_left">등록하기</button>
            <button className="btn_right">선택삭제</button>
          </div>
        </Top>
        <Content>
          {/* -------- 설비등록 테이블 -------- */}
          <table>
            <thead>
              <tr>
                <th className="th0"></th>
                <th className="th1"></th>
                <th className="th2">출고일</th>
                <th className="th3">거래처명</th>
                <th className="th4">기계명</th>
                <th className="th5">모델명</th>
                <th className="th6">기계상태</th>
                <th className="th7">위치</th>
                <th className="th8">PROGIX</th>
              </tr>
            </thead>
            <ManagementTable />
          </table>
          <Mobile />
        </Content>
      </Container>
    </Wrap>
  );
};

export default Management;

const Wrap = styled.div`
  width: 98.5%;
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
  border: 1px solid #e9edf3;
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  .top_left {
    @media (max-width: 1100px) {
      width: 100%;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    select {
      margin-right: 20px;
      padding: 10px;
      width: 146px;
      height: 40px;
      border: 1px solid #e9edf3;
      font-size: 1.6rem;
      @media (max-width: 1100px) {
        width: 24%;
        margin-right: 10px;
      }
    }
    input {
      margin-right: 20px;
      padding: 10px;
      width: 292px;
      height: 40px;
      border: 1px solid #e9edf3;
      font-size: 1.6rem;
      &:focus::placeholder {
        color: transparent;
      }
      @media (max-width: 1100px) {
        width: 36%;
        margin-right: 10px;
      }
    }
  }
  .top_right {
    @media (max-width: 1300px) {
      //1100px보다 작아지면 display none;
      display: none;
    }
  }
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
    margin-right: 7px;
    background-color: ${(props) => props.theme.color.PastelBlue};
  }
  .btn_right {
    background-color: #f6f7fb;
    border: 1px solid #e9edf3;
    color: #9497a8;
  }
`;

const Content = styled.div`
  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
    // 화면 축소시 테이블 column 깨지는거 방지
    @media (max-width: 1400px) {
      display: none;
    }
    th {
      padding: 10px;
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
    }
    td {
      padding: 10px;
      border: 1px solid #e9edf3;
      text-align: center;
    }
    .th0 {
      width: 5rem;
    }
    .th1 {
      width: 5rem;
    }
    .th2 {
      width: 15rem;
    }
    .th3 {
      width: 25rem;
    }
    .th4 {
      width: 25rem;
    }
    .th5 {
      width: 20rem;
    }
    .th6 {
      width: 10rem;
    }
    .th7 {
      width: 30rem;
    }
    .th8 {
      width: 10rem;
    }
  }
`;
