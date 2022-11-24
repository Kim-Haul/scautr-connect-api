import React from 'react';
import styled from 'styled-components';

const DetailParameterHistoryTable = () => {
  return (
    <Tbody>
      <tr>
        <td>1번 히터 온도</td>
        <td>D02</td>
        <td>515</td>
        <td>℃</td>
      </tr>
      <tr>
        <td>1번 히터 온도</td>
        <td>D02</td>
        <td>515</td>
        <td>℃</td>
      </tr>
      <tr>
        <td>1번 히터 온도</td>
        <td>D02</td>
        <td>515</td>
        <td>℃</td>
      </tr>
      <tr>
        <td>1번 히터 온도</td>
        <td>D02</td>
        <td>515</td>
        <td>℃</td>
      </tr>
      <tr>
        <td>1번 히터 온도</td>
        <td>D02</td>
        <td>515</td>
        <td>℃</td>
      </tr>
    </Tbody>
  );
};

export default DetailParameterHistoryTable;

const Tbody = styled.tbody`
  // 좌측 기계 세팅값 테이블을 따로 분리하지는 않아서
  // td값을 다른 페이지네이션 테이블 컴포넌트와는 다르게 부모 컴포넌트에서 지정
`;
