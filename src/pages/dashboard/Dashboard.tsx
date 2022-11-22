import React from 'react';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <Wrap>
      <Title></Title>
      <Container>
        <LeftContainer></LeftContainer>
        <RightContainer></RightContainer>
      </Container>
    </Wrap>
  );
};

export default Dashboard;

const Wrap = styled.div``;
const Title = styled.div``;
const Container = styled.div`
  display: grid;
  width: 98.5%;
  grid-template-columns: 1fr 2fr;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.Desktop}) {
    grid-template-columns: 100%;
  }
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;
