import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NoticeScautrTable = () => {
  const registration_query = [
    {
      id: '5',
      classification: '공지사항',
      title: '스카우터 서버 정기 점검 안내',
      author: 'VITCON',
      date: '2022-11-28',
    },
    {
      id: '4',
      classification: '업데이트',
      title: '펌웨어 디바이스 업데이트',
      author: 'VITCON',
      date: '2022-11-21',
    },
    {
      id: '3',
      classification: '공지사항',
      title: '11월 4주차 고객센터 휴무 안내',
      author: 'VITCON',
      date: '2022-11-16',
    },
    {
      id: '2',
      classification: '공지사항',
      title: '모듈 센서 추가 견적서 안내',
      author: 'VITCON',
      date: '2022-11-13',
    },
    {
      id: '1',
      classification: '공지사항',
      title: '스카우터 데이터 연동 메뉴얼',
      author: 'VITCON',
      date: '2022-11-09',
    },
  ];
  const navigate = useNavigate();
  return (
    <Tbody>
      {registration_query.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <tr
              onClick={() => {
                navigate('/scautr/board/notice/scautr/detail/172');
              }}
            >
              <td>{v.id}</td>
              <td>{v.classification}</td>
              <td>{v.title}</td>
              <td>{v.author}</td>
              <td>{v.date}</td>
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
