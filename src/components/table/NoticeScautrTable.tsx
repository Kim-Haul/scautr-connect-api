import React from 'react';
import styled from 'styled-components';

const NoticeScautrTable = () => {
  const registration_query = new Array(3).fill(1);
  return (
    <Tbody>
      {registration_query.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <tr>
              <td>{i}</td>
              <td>공지사항</td>
              <td>스카우터 서버 정기 점검 안내</td>
              <td>VITCON</td>
              <td>2022-11-12</td>
            </tr>
          </React.Fragment>
        );
      })}
    </Tbody>
  );
};

export default NoticeScautrTable;

const Tbody = styled.tbody`
  td {
    padding: 10px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: #e9e9e9;
    }
  }
`;
