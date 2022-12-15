import React from 'react';
import styled from 'styled-components';

const Snowflake = (props: any) => {
  return <Snow style={props.style}>{'\u2745'}</Snow>;
};

const makeSnowFlakes = () => {
  let animationDelay = '0s'; // 기본 값은 0초
  let fontSize = '14px'; // 기본 폰트사이즈는 14px
  const arr = Array.from('Merry Christmas'); // length가 15인 array

  // arr의 length 만큼의 <SnowFlake />를 반환
  return arr.map((el, i) => {
    animationDelay = `${(Math.random() * 16).toFixed(2)}s`; // 0~16 사이에서 소수점 2번째 자리수까지의 랜덤숫자
    fontSize = `${Math.floor(Math.random() * 10) + 10}px`; // 10~20 사이의 정수
    const style = {
      animationDelay,
      fontSize,
    };
    return <Snowflake key={i} style={style} />;
  });
};

export const FallingSnow = () => (
  <SnowContainer>{makeSnowFlakes()}</SnowContainer>
);

const Snow = styled.p`
  /* color: #007bff; */
  color: #fff;
  animation: fall 15s linear infinite;
  visibility: hidden;
  @keyframes fall {
    0% {
      opacity: 0;
    }
    3% {
      opacity: 0.3;
      visibility: visible;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
      transform: translate(0, 900px);
    }
  }
`;

const SnowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 22rem;
  left: 1rem;
  top: 0;
`;
