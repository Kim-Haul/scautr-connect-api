import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';
import { IPageProps } from '../../shared/type/IPagination';

const Pagination = (props: IPageProps) => {
  let lastPage = Math.ceil(props.total / 5);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');

  const onClickPage = (e: React.MouseEvent<HTMLLIElement>) => {
    setActive(e.currentTarget.id);
    props.setCurrentPage?.(Number(e.currentTarget.id));
  };

  const onClickPrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStartPage(startPage - 10);
    setActive(e.currentTarget.id);
    props.setCurrentPage?.(Number(e.currentTarget.id));
  };

  const onClickNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStartPage(startPage + 10);
    setActive(e.currentTarget.id);
    props.setCurrentPage?.(Number(e.currentTarget.id));
  };

  return (
    <Wrap>
      <button
        className="left"
        disabled={startPage === 1}
        onClick={onClickPrevPage}
        id={String(startPage - 10)}
      >
        <AiOutlineArrowLeft />
      </button>
      <Page>
        {new Array(10).fill(1).map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i + startPage <= lastPage ? (
                <ul>
                  <li
                    style={{
                      color:
                        active === String(i + startPage) ? 'black' : '#d4d4d4',
                    }}
                    onClick={onClickPage}
                    id={String(i + startPage)}
                  >
                    {i + startPage}
                  </li>
                </ul>
              ) : null}
            </React.Fragment>
          );
        })}
      </Page>
      <button
        className="right"
        disabled={startPage + 10 > lastPage}
        onClick={onClickNextPage}
        id={String(startPage + 10)}
      >
        <AiOutlineArrowRight />
      </button>
    </Wrap>
  );
};

export default Pagination;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 1400px) {
    display: none;
  }
  button {
    border: 1px solid #d4d4d4;
    color: #d4d4d4;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border-radius: 0px;
    // globalstyle에서 padding을 1rem으로 지정해주었기 때문에 상쇄.
    padding: 0rem;
  }
  .left {
    margin-right: 1rem;
  }
  .right {
    margin-left: 1rem;
  }
`;

const Page = styled.div`
  display: flex;
  cursor: pointer;
  ul {
    list-style: none;
    li {
      border: 1px solid #d4d4d4;
      width: 25px;
      height: 25px;
      color: #d4d4d4;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
