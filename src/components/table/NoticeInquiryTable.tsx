import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NoticeInquiryTable = () => {
  const registration_query = new Array(3).fill(1);
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
              <td>{i}</td>
              <td>공지사항</td>
              <td>답변대기</td>
              <td>Wifi-Link의 TCP, AP 관련 문의</td>
              <td>
                <div className="writer">
                  <img src="/images/board_profile.png" alt="프로필 이미지" />
                  <div className="writer_detail">
                    <span className="writer_detail_company">LG화학</span>
                    <span>최예랑(cyr****)</span>
                  </div>
                </div>
              </td>
              <td>2022-11-25</td>
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
