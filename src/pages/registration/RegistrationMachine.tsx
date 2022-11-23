import React from 'react';
import styled from 'styled-components';
import Mobile from '../../components/exception/Mobile';
import RegistrationMachineTable from '../../components/table/RegistrationMachineTable';

const RegistrationMachine = () => {
  return (
    <Wrap>
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
            <button className="btn_left btn_desc">
              <span>등록하기</span>
              <div className="desc">버튼을 클릭하여 설비를 등록해주세요.</div>
            </button>
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
                <th className="th2">그룹</th>
                <th className="th3">기계명</th>
                <th className="th4">모델명</th>
                <th className="th5">권장사용기간</th>
                <th className="th6">기계</th>
                <th className="th7">파일첨부</th>
                <th className="th8">등록일</th>
              </tr>
            </thead>
            <RegistrationMachineTable />
          </table>
          <Mobile />
        </Content>
      </Container>
    </Wrap>
  );
};

export default RegistrationMachine;

const Wrap = styled.div`
  width: 100%;
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
    display: flex;
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
  .btn_left.btn_desc {
    position: relative;
    .desc {
      display: none;
      font-size: 1.4rem;
      position: absolute;
      width: 260px;
      padding: 8px;
      top: 55px;
      left: -120px;
      border-radius: 8px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      background: #333;
      color: #fff;
    }
    .desc:after {
      position: absolute;
      bottom: 100%;
      right: 30%;
      width: 0;
      height: 0;
      border: solid transparent;
      border-color: rgba(51, 51, 51, 0);
      border-bottom-color: #333;
      border-width: 10px;
      pointer-events: none;
      content: ' ';
    }
    &:hover {
      .desc {
        display: block;
      }
    }
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

    .th0 {
      width: 5rem;
    }
    .th1 {
      width: 5rem;
    }
    .th2 {
      width: 10rem;
    }
    .th3 {
      width: 30rem;
    }
    .th4 {
      width: 30rem;
    }
    .th5 {
      width: 15rem;
    }
    .th6 {
      width: 10rem;
    }
    .th7 {
      width: 30rem;
    }
    .th8 {
      width: 15rem;
    }
  }
`;
