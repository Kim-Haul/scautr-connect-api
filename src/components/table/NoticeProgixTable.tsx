import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NoticeProgixTable = () => {
  const registration_query = [
    {
      id: '4',
      classification: '공지사항',
      title: '냉각기 쿨러 모델 교체',
      author_name: '최예랑',
      author_id: 'cyr****',
      date: '2022-11-21',
    },
    {
      id: '3',
      classification: '공지사항',
      title: '고객센터 휴무 안내',
      author_name: '고민지',
      author_id: 'koh****',
      date: '2022-11-19',
    },
    {
      id: '2',
      classification: '이벤트',
      title: 'TF-303 모델 출시 이벤트',
      author_name: '최예랑',
      author_id: 'cyr****',
      date: '2022-11-14',
    },
    {
      id: '1',
      classification: '공지사항',
      title: '고객센터 휴무 안내',
      author_name: '최예랑',
      author_id: 'cyr****',
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
                navigate('/scautr/board/notice/progix/detail/172');
              }}
            >
              <td>{v.id}</td>
              <td>{v.classification}</td>
              <td>{v.title}</td>
              <td>
                <div className="writer">
                  <div className="writer_wrap">
                    <img src="/images/board_profile.png" alt="프로필 이미지" />
                    <span>
                      {v.author_name}({v.author_id})
                    </span>
                  </div>
                </div>
              </td>
              <td>{v.date}</td>
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
    .writer_wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        margin-right: 5px;
        width: 20px;
        // img가 글자보다 살짝 위로 있는 느낌이 들어서 margin-top
        margin-top: 3px;
      }
    }
  }
  tr {
    cursor: pointer;
    &:hover {
      background-color: #e9e9e9;
    }
  }
`;
