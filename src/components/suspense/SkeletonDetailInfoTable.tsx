import React from 'react';
import styled from 'styled-components';

const SkeletonDetailInfoTable = () => {
  return (
    <Wrap>
      <div className="table">
        <div className="skeleton_title"></div>
        <div className="skeleton_content first"></div>
      </div>
      <div className="table">
        <div className="skeleton_title margin"></div>
        <div className="skeleton_content second"></div>
      </div>
      <div className="table">
        <div className="skeleton_title margin"></div>
        <div className="skeleton_content third"></div>
      </div>
    </Wrap>
  );
};

export default SkeletonDetailInfoTable;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .table {
    .skeleton_title {
      width: 200px;
      height: 40px;
      background-color: #f5f7fa;
      animation: skeleton-gradient 1.8s infinite ease-in-out;
      margin-bottom: 10px;
    }
    .skeleton_title.margin {
      margin-top: 20px;
    }
    .skeleton_content {
      width: 100%;
      background-color: #f5f7fa;
      animation: skeleton-gradient 1.8s infinite ease-in-out;
    }
    .first {
      height: 135px;
    }
    .second {
      height: 180px;
    }
    .third {
      height: 90px;
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
`;
