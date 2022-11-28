import React from 'react';
import styled from 'styled-components';

const RegistrationOptionTable = () => {
  const registration_query = [
    {
      id: '6',
      date: '2022-11-28',
      option: '라벨러',
      model: 'TF107',
      duration: '2년',
      sort: '옵션',
    },
    {
      id: '5',
      date: '2022-11-21',
      option: '라벨러',
      model: 'TF112',
      duration: '3년',
      sort: '옵션',
    },
    {
      id: '4',
      date: '2022-11-18',
      option: '라벨러',
      model: 'TF130',
      duration: '3년',
      sort: '옵션',
    },
    {
      id: '3',
      date: '2022-10-28',
      option: '라벨러',
      model: 'TF133',
      duration: '3년',
      sort: '옵션',
    },
    {
      id: '2',
      date: '2022-10-23',
      option: '라벨러',
      model: 'TF201',
      duration: '5년',
      sort: '옵션',
    },
    {
      id: '1',
      date: '2022-10-11',
      option: '라벨러',
      model: 'TF304',
      duration: '5년',
      sort: '옵션',
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
              <td>-</td>
              <td>{v.option}</td>
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
