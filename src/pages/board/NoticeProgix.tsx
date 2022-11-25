import React from 'react';
import styled from 'styled-components';
import Mobile from '../../components/exception/Mobile';
import NoticeProgixTable from '../../components/table/NoticeProgixTable';

const NoticeProgix = () => {
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
            <button className="btn_left">
              <span>글쓰기</span>
            </button>
          </div>
        </Top>
        <Content>
          {/* -------- 프로직스 공지사항 -------- */}
          <table>
            <thead>
              <tr>
                <th className="th0">NO</th>
                <th className="th1">분류</th>
                <th className="th2">제목</th>
                <th className="th3">작성자</th>
                <th className="th4">작성일</th>
              </tr>
            </thead>
            <NoticeProgixTable />
          </table>
          <Mobile />
        </Content>
      </Container>
    </Wrap>
  );
};

export default NoticeProgix;

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
      width: 10rem;
    }
    .th2 {
      width: 43rem;
    }
    .th3 {
      width: 11rem;
    }
    .th4 {
      width: 10rem;
    }
  }
`;
