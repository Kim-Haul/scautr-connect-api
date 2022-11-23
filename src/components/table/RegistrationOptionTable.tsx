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
              <td>포장기</td>
              <td>자동열성형진공포장기</td>
              <td>한우물 VSP-5000</td>
              <td>5년 2개월</td>
              <td>기계</td>
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
`;
