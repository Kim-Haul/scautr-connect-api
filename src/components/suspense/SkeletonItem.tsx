import React from 'react';
import styled from 'styled-components';

const SkeletonItem = () => {
  return (
    <Wrap>
      <div className="left_table"></div>
      <div className="right_table"></div>
    </Wrap>
  );
};

export default SkeletonItem;

const Wrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(49%, auto));
  column-gap: 2rem;
  row-gap: 2rem;
  margin-bottom: 2rem;
  .left_table,
  .right_table {
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    width: 100%;
    height: 400px;
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
  }
`;
