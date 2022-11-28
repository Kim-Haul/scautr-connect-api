import React from 'react';
import styled from 'styled-components';

const RegistrationMachineTable = () => {
  const registration_query = [
    {
      id: '3',
      date: '2022-11-26',
      group: '포장기',
      machine: '자동열성형진공포장기',
      model: '한우물 VSP-5000',
      duration: '5년',
      sort: '기계',
    },
    {
      id: '2',
      date: '2022-11-19',
      group: '기타',
      machine: '컴프레셔',
      model: 'ESS30',
      duration: '10년',
      sort: '기계',
    },
    {
      id: '1',
      date: '2022-11-07',
      group: '기타',
      machine: '의료용냉장고',
      model: 'CBR-150-182',
      duration: '7년',
      sort: '기계',
    },
  ];

  return (
    <Tbody>
      {registration_query.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <tr>
              <td>
                <input type="checkbox" id={String(i)} readOnly />
              </td>
              <td>{v.id}</td>
              <td>{v.group}</td>
              <td>{v.machine}</td>
              <td>{v.model}</td>
              <td>{v.duration}</td>
              <td>{v.sort}</td>
              <td>-</td>
              <td>{v.date}</td>
            </tr>
          </React.Fragment>
        );
      })}
    </Tbody>
  );
};

export default RegistrationMachineTable;

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
