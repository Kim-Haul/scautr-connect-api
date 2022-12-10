import React from 'react';
import styled from 'styled-components';
import FadeLoader from 'react-spinners/FadeLoader';

const SkeletonTable = () => {
  return (
    <Wrap>
      <Table>
        <FadeLoader color="#00c7ae" />
      </Table>
    </Wrap>
  );
};

export default SkeletonTable;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Table = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  // 해당 UI에서는 스켈레톤 UI보다 로딩 스피너를 사용하는게 더욱 사용자경험이 좋을 것으로 예상.
  /* background-color: #f5f7fa;
  animation: skeleton-gradient 1.8s infinite ease-in-out;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  } */
`;
