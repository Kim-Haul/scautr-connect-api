import React from 'react';
import styled from 'styled-components';

const ManagementTable = () => {
  const registration_query = new Array(3).fill(1);
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
              <td>2022-11-10</td>
              <td>하나에프비엔비</td>
              <td>한우물 VSP-5000</td>
              <td>GP460M</td>
              <td>ON</td>
              <td>서울 금천구 가산디지털1로 165</td>
              <td>사용</td>
            </tr>
            <tr></tr>
          </React.Fragment>
        );
      })}
    </Tbody>
  );
};

export default ManagementTable;

const Tbody = styled.tbody`
  td {
    padding: 10px;
    border: 1px solid #e9edf3;
    text-align: center;
  }
`;
