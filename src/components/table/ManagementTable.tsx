import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ManagementTable = () => {
  const navigate = useNavigate();
  const registration_query = [
    {
      id: '6',
      date: '2022-11-24',
      company: '그랜드벨',
      machine: '자동열성형진공포장기',
      color: '#9AC3FD',
      model: 'GP260',
      state: 'ON',
      location: '경기도 광주시 곤지암읍 경충대로 417-11',
      progix: '사용',
    },
    {
      id: '5',
      date: '2022-11-22',
      company: '이지컴프레셔',
      machine: '스크류콤프레샤',
      color: '#FFACAC',
      model: 'ESS15',
      state: 'ON',
      location: '경상남도 김해시 진영읍 김해대로 748',
      progix: '사용',
    },
    {
      id: '4',
      date: '2022-11-19',
      company: '그랜드벨',
      machine: '자동열성형진공포장기',
      color: '#9AC3FD',
      model: 'GP460',
      state: 'ON',
      location: '경기도 광주시 곤지암읍 경충대로 417-11',
      progix: '사용',
    },
    {
      id: '3',
      date: '2022-11-02',
      company: 'GMS',
      machine: '의료용냉장고',
      color: '#FECD8B',
      model: 'CBR-150-1430',
      state: 'ON',
      location: '경기도 양주시 은현면 검준2길 201-22',
      progix: '사용',
    },
    {
      id: '2',
      date: '2022-11-02',
      company: '이지컴프레셔',
      machine: '스크류콤프레샤',
      color: '#FFACAC',
      model: 'ESS30',
      state: 'ON',
      location: '경상남도 김해시 진영읍 김해대로 748',
      progix: '사용',
    },
    {
      id: '1',
      date: '2022-10-17',
      company: 'GMS',
      machine: '의료용냉장고',
      color: '#FECD8B',
      model: 'CBR-150-182',
      state: 'ON',
      location: '경기도 양주시 은현면 검준2길 201-22',
      progix: '사용',
    },
  ];

  return (
    <Tbody>
      {registration_query.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <tr
              onClick={() => {
                navigate('/scautr/management/detail/172');
              }}
            >
              <td>
                <input type="checkbox" id={String(i)} readOnly />
              </td>
              <td>{v.id}</td>
              <td>{v.date}</td>
              <td>{v.company}</td>
              {/* <td style={{ backgroundColor: v.color, color: 'white' }}>
                {v.machine}
              </td> */}
              <td>{v.machine}</td>
              <td>{v.model}</td>
              <td>{v.state}</td>
              <td>{v.location.substr(0, 15)} ...</td>
              <td>{v.progix}</td>
            </tr>
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

  tr {
    cursor: pointer;
    &:hover {
      background-color: #e9e9e9;
    }
  }
`;
