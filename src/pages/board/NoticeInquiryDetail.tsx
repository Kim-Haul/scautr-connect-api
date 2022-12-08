import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InquiryDetail from '../../components/detail/InquiryDetail';

const NoticeInquiryDetail = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Container>
        <Top>
          <div className="top_left">
            <button
              className="btn_left"
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </button>
          </div>
          <div className="top_right">
            <button
              className="btn_right"
              onClick={() => {
                navigate(-1);
              }}
            >
              목록
            </button>
          </div>
        </Top>
        <InquiryDetail />
      </Container>
    </Wrap>
  );
};

export default NoticeInquiryDetail;

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  border: 1px solid #e9edf3;
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  button {
    width: 106.1px;
    height: 40px;
    font-weight: 700;
    font-size: 1.6rem;
  }
  .top_left {
    .btn_left {
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.color.PastelBlue};
      color: ${(props) => props.theme.color.PastelBlue};
    }
  }
  .top_right {
    .btn_right {
      width: 75px;
      background-color: ${(props) => props.theme.color.PastelBlue};
    }
  }
`;
