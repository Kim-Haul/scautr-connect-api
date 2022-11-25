import React from 'react';
import styled from 'styled-components';

const NoticeProgixTable = () => {
  const registration_query = new Array(3).fill(1);
  return (
    <Tbody>
      {registration_query.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <tr>
              <td>{i}</td>
              <td>공지사항</td>
              <td>신규 진공포장기 출시</td>
              <td>
                <div className="writer">
                  <img src="/images/board_profile.png" alt="프로필 이미지" />
                  <span>정지영(jyy****)</span>
                </div>
              </td>
              <td>2022-11-25</td>
            </tr>
          </React.Fragment>
        );
      })}
    </Tbody>
  );
};

export default NoticeProgixTable;

const Tbody = styled.tbody`
  td {
    padding: 10px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
  .writer {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 5px;
      width: 20px;
      // img가 글자보다 살짝 위로 있는 느낌이 들어서 margin-top
      margin-top: 3px;
    }
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: #e9e9e9;
    }
  }
`;
