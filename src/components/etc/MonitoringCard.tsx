import React from 'react';
import styled from 'styled-components';

const MonitoringCard = () => {
  const registration_query = new Array(7).fill(1);
  return (
    <Wrap>
      <Card>
        {registration_query.map((v, i) => {
          return (
            <React.Fragment>
              <div>아아</div>
            </React.Fragment>
          );
        })}
      </Card>
    </Wrap>
  );
};

export default MonitoringCard;

const Wrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
`;
