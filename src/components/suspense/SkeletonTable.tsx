import React from 'react';
import styled from 'styled-components';

const SkeletonTable = () => {
  return (
    <Wrap>
      <Table></Table>
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
  background-color: #f5f7fa;
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
  }
`;
