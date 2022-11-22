import React from 'react';
import styled from 'styled-components';

const Mobile = () => {
  return (
    <Alarm>
      <img src="/images/mobile.gif" alt="모바일" />
      <div className="mention">모바일 화면은 준비중입니다!</div>
      <div className="sub_mention">
        표형식의 데이터는 1400px 이상의 디스플레이에서 확인 가능합니다.
      </div>
    </Alarm>
  );
};

export default Mobile;

const Alarm = styled.div`
  @media (min-width: 1400px) {
    // 1400px 보다 클때는 display none
    display: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0;
  .mention {
    color: red;
  }
  .sub_mention {
    color: gray;
    font-size: 1.4rem;
  }
`;
