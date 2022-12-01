import React from 'react';
import styled from 'styled-components';

const SkeletonDetailTable = () => {
  return (
    <Wrap>
      <div className="table">
        <div className="skeleton_title"></div>
        <div className="skeleton_content"></div>
      </div>
      <div className="table margin">
        <div className="skeleton_title"></div>
        <div className="skeleton_content"></div>
      </div>
      <div className="table margin">
        <div className="skeleton_title"></div>
        <div className="skeleton_content"></div>
      </div>
    </Wrap>
  );
};

export default SkeletonDetailTable;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  .table {
    .skeleton_title {
      width: 200px;
      height: 40px;
      background-color: #f5f7fa;
      animation: skeleton-gradient 1.8s infinite ease-in-out;
      margin-bottom: 10px;
    }
    .skeleton_content {
      width: 100%;
      height: 160px;
      background-color: #f5f7fa;
      animation: skeleton-gradient 1.8s infinite ease-in-out;
    }
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
  }
  .table.margin {
    margin-top: 10px;
  }
`;
