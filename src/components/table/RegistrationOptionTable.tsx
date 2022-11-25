import React from 'react';
import styled from 'styled-components';

const RegistrationOptionTable = () => {
  const registration_query = new Array(7).fill(1);
  return (
    <Tbody>
      {registration_query.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <tr>
              <td>
                <input type="checkbox" id={String(i)} readOnly />
              </td>
              <td>{i}</td>
              <td>-</td>
              <td>라벨러</td>
              <td>TF107</td>
              <td>5년 2개월</td>
              <td>옵션</td>
              <td>-</td>
              <td>2022-11-22</td>
            </tr>
          </React.Fragment>
        );
      })}
    </Tbody>
  );
};

export default RegistrationOptionTable;

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
