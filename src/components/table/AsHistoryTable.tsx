import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const AsHistoryTable = (props: {
  setDetailClick: Dispatch<SetStateAction<boolean>>;
}) => {
  const temp_api = {
    data: {
      result: [
        {
          title: '부품이 고장나서 교체함',
          manager: '2',
          date: '22-11-04',
        },
      ],
    },
  };

  return (
    <Wrap>
      <table>
        <thead>
          <tr>
            <th className="th0">내용</th>
            <th className="th1">일자</th>
          </tr>
        </thead>
        <tbody>
          {temp_api?.data.result.map((v: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <tr
                  onClick={() => {
                    props.setDetailClick(true);
                  }}
                >
                  <td>{v.title}</td>
                  <td>{v.date}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </Wrap>
  );
};

export default AsHistoryTable;

const Wrap = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      padding: 10px;
      background-color: #f6f7fb;
      border: 1px solid #e9edf3;
    }
    .th0 {
      // 상위 컴포넌트에서 지정해준 min-width 때문에 width가 안 먹고 있었던 것.
      width: 70% !important;
      min-width: 0px !important;
    }
    .th1 {
      width: 30% !important;
      min-width: 0px !important;
    }
    td {
      padding: 10px;
      border: 1px solid #e9edf3 !important;
      text-align: center;
      // 상위 컴포넌트에서 td에 지정해준 background-color: #fff때문에, 바로 아래 tr에서 hover 효과가 안먹히는 이슈.
      background-color: inherit !important;
    }
    tr {
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
      }
    }
  }
`;
