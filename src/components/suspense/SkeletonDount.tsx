import React from 'react';
import styled from 'styled-components';

const SkeletonDount = () => {
  return (
    <Wrap>
      <Circle></Circle>
    </Wrap>
  );
};

export default SkeletonDount;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 240px;
  height: 240px;
  margin-bottom: 40px;
  border-radius: 50%;
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
