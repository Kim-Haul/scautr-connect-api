import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import apis from '../../shared/apis';
import { Viewer } from '@toast-ui/react-editor';

const ScautrDetail = () => {
  // url에 id값 받아오기
  const view = useParams();

  // 스카우터 공지 세부사항 호출 api
  const getNoticeScautrDetail = async () => {
    try {
      const res = await apis.getNoticeScautrDetail(view.idx);
      return res;
    } catch (err) {
      console.log('스카우터 공지 세부사항을 불러오는데 실패했습니다.');
    }
  };

  // 스카우터 공지 세부사항 호출 쿼리
  const { data: NoticeScautrDetailQuery } = useQuery(
    ['loadNoticeScautrDetail', view.idx],
    getNoticeScautrDetail,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('스카우터 공지 세부사항을 불러오는데 실패했습니다.');
      },
    }
  );

  return (
    <React.Fragment>
      <Content>
        <div className="row title">
          {NoticeScautrDetailQuery?.data.result[0].title}
        </div>
        <div className="row content">
          <Viewer
            initialValue={NoticeScautrDetailQuery?.data.result[0].content}
          />
        </div>
      </Content>
      {/* 기획안 수정으로 인한 해당 섹션 잠시 보류 */}
      {/* <Bottom>
        <div className="column">▾ 이전글</div>
        <div className="column">(이벤트)제상기능 업데이트 안내</div>
      </Bottom> */}
    </React.Fragment>
  );
};

export default ScautrDetail;

const Content = styled.div`
  width: 100%;
  border: 1px solid #ced4da;
  .row.title {
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f7fb;
    height: 51px;
    border-bottom: 1px solid #ced4da;
  }
  .row.content {
    padding: 10px;
  }
`;

// const Bottom = styled.div`
//   @media (max-width: 1200px) {
//     display: none;
//   }
//   display: grid;
//   grid-template-columns: 150px 1fr;
//   .column {
//     padding: 10px;
//     border: 1px solid #ced4da;
//     border-top: none;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &:first-child {
//       border-right: none;
//     }
//   }
// `;
