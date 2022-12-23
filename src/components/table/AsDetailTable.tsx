import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import apis from '../../shared/apis';
// import { Viewer } from '@toast-ui/react-editor';
import AsRegistrationModal from '../modal/as/AsRegistrationModal';

const AsDetailTable = (props: {
  setDetailClick: Dispatch<SetStateAction<boolean>>;
  postId: string;
  view: string | undefined;
  setpostRepairDate: Dispatch<SetStateAction<string>>;
}) => {
  // A/S 수정 모달창
  const [is_open, setIsOpen] = useState<boolean>(false);
  // edit을 위한 기존 정보값 담아놓기
  const [content, setContent] = useState<object>({});

  // A/S 이력 상세 내용 호출 api
  const getAsDetail = async () => {
    try {
      const res = await apis.getAsDetail(props.view, props.postId);
      return res;
    } catch (err) {
      console.error('A/S 상세 내용을 불러오는데 실패했습니다.');
    }
  };

  // A/S 이력 상세 내용 호출 쿼리
  const { data: AsDetailQuery } = useQuery(
    ['loadAsDetail', props.postId],
    getAsDetail,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('A/S 상세 내용을 불러오는데 실패했습니다.');
      },
    }
  );

  //  A/S 이력 상세 내용 삭제 api
  const deleteAsHistory = async () => {
    const data = {
      repairId: [props.postId],
    };
    try {
      const res = await apis.deleteAsHistory(props.view, data);
      props.setDetailClick(false);
      return res;
    } catch (e: any) {
      alert(
        '삭제에 실패했습니다. 관련 문제가 지속되면 관리자에게 문의 바랍니다.'
      );
    }
  };

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  //  A/S 이력 상세 내용 삭제 쿼리
  const { mutate: deleteAsHistoryMutate } = useMutation(deleteAsHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['loadAsDetail'],
      });
    },
  });

  // 삭제 재확인 comfirm창
  const checkDeleteAsHistoryMutate = () => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      deleteAsHistoryMutate();
    } else {
      return false;
    }
  };

  useEffect(() => {
    props.setpostRepairDate(
      `${AsDetailQuery?.data.result[0].repairDate} ${AsDetailQuery?.data.result[0].repairTime}`
    );
    setContent({
      title: AsDetailQuery?.data.result[0].title,
      content: AsDetailQuery?.data.result[0].content,
      classificationId: AsDetailQuery?.data.result[0].classificationId,
      name: AsDetailQuery?.data.result[0].name,
      repairDate: AsDetailQuery?.data.result[0].repairDate,
      repairTime: AsDetailQuery?.data.result[0].repairTime,
    });
  }, [AsDetailQuery?.data.result, props]);

  return (
    <Wrap>
      <div className="title">
        <strong>{AsDetailQuery?.data.result[0].title}</strong>
      </div>
      <div className="content">
        {/* // viewer는  queryClient.invalidateQueries를 먹여도 왜 갱신이 제대로 안될까? */}
        {/* <Viewer initialValue={AsDetailQuery?.data.result[0].content} /> */}

        {/* DB 저장시, \n과 함께 저장이 되는데 React.js에서는 이 취약점을 원천차단하기 위하여 무조건 텍스트형태로만 렌더링하게 설정. */}
        {/* 불러 올때 \n을 처리 안 해주기 때문에, \n을 기준으로 split 처리를 하여 <br/> 태그를 삽입하는 식으로 일단 처리. */}
        {AsDetailQuery?.data.result[0].content.split('\n').map((v: any) => {
          return (
            <span>
              {v}
              <br />
            </span>
          );
        })}
      </div>
      <div className="bottom">
        <div className="bottom_left">
          <button
            className="btn_left"
            onClick={() => {
              props.setDetailClick(false);
            }}
          >
            목록
          </button>
        </div>
        <div className="bottom_right">
          <button
            className="btn_left"
            onClick={() => {
              checkDeleteAsHistoryMutate();
            }}
          >
            삭제
          </button>
          <button
            className="btn_right"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            수정
          </button>
        </div>
      </div>
      {/* A/S 이력 모달창 */}
      <AsRegistrationModal
        open={is_open}
        setIsOpen={setIsOpen}
        header="A/S 이력 수정"
        view={props.view}
        postId={props.postId}
        content={content}
      />
    </Wrap>
  );
};

export default AsDetailTable;

const Wrap = styled.div`
  .title {
    padding: 10px;
    text-align: center;
    background-color: #f6f7fb;
    border: 1px solid #e9edf3;
    margin-top: 20px;
  }
  .content {
    border: 1px solid #e9edf3;
    border-top: none;
    min-height: 300px;
    padding: 10px;
  }
  .bottom {
    margin-top: 16px;
    button {
      width: 80px;
      height: 35px;
    }
    display: flex;
    justify-content: space-between;
    .bottom_right {
      display: flex;
      gap: 10px;
    }
    .btn_left {
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
      color: #9497a8;
    }
    .btn_right {
      background-color: ${(props) => props.theme.color.PastelBlue};
    }
  }
`;
