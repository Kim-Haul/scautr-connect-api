import React from 'react';
import styled from 'styled-components';
import FadeLoader from 'react-spinners/FadeLoader';

const DefaultLoading = () => {
  return (
    <>
      <LoadingSpinner>
        <FadeLoader color="#00c7ae" />
      </LoadingSpinner>
    </>
  );
};

export default DefaultLoading;

const LoadingSpinner = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
