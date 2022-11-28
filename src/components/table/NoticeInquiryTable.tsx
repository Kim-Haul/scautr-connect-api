import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NoticeInquiryTable = () => {
  const registration_query = [
    {
      id: '4',
      classification: '공지사항',
      state: '답변대기',
      title: 'Wifi-Link의 TCP, AP 관련 문의',
      company: '이랜드몰',
      author_name: '정지영',
      author_id: 'jyy****',
      date: '2022-11-24',
    },
    {
      id: '3',
      classification: '공지사항',
      state: '답변대기',
      title: '배송문의',
      company: '신선식품',
      author_name: '고민지',
      author_id: 'koh****',
      date: '2022-11-11',
    },
    {
      id: '2',
      classification: '공지사항',
      state: '답변완료',
      title: '이더넷 케이블 연장선 추가 주문',
      company: '이랜드몰',
      author_name: '정지영',
      author_id: 'jyy****',
      date: '2022-11-03',
    },
    {
      id: '1',
      classification: '공지사항',
      state: '답변대기',
      title: '무선 인터넷 연결 문의',
      company: '한바다',
      author_name: '김도영',
      author_id: 'kim****',
      date: '2022-11-02',
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
                navigate('/scautr/board/inquiry/detail/172');
              }}
            >
              <td>{v.id}</td>
              <td>{v.classification}</td>
              <td>{v.state}</td>
              <td>{v.title}</td>
              <td>
                <div className="writer">
                  <img src="/images/board_profile.png" alt="프로필 이미지" />
                  <div className="writer_detail">
                    <span className="writer_detail_company">{v.company}</span>
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

export default NoticeInquiryTable;

const Tbody = styled.tbody`
  td {
    // 표형식 기본 padding을 10px로 주고 있었는데 여기는
    // 작성자칸 크기 때문에 살짝 다름
    padding: 3.6px;
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
    }
    .writer_detail {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: 1.5rem;
      .writer_detail_company {
        margin-bottom: -5px;
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
