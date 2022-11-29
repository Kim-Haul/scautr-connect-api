import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';
import { IPageProps } from '../../shared/type/Interface';

const Pagination10 = (props: IPageProps) => {
  const lastPage = Math.ceil(props.total / 10);

  const onClickPage = (e: React.MouseEvent<HTMLLIElement>) => {
    props.setActive!(e.currentTarget.id);
    props.setCurrentPage?.(Number(e.currentTarget.id));
  };

  const onClickPrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.setStartPage!(props.startPage! - 10);
    props.setActive!(e.currentTarget.id);
    props.setCurrentPage?.(Number(e.currentTarget.id));
  };

  const onClickNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.setStartPage!(props.startPage! + 10);
    props.setActive!(e.currentTarget.id);
    props.setCurrentPage?.(Number(e.currentTarget.id));
  };

  return (
    <Wrap>
      <button
        className="left"
        disabled={props.startPage === 1}
        onClick={onClickPrevPage}
        id={String(props.startPage! - 10)}
      >
        <AiOutlineArrowLeft />
      </button>
      <Page>
        {new Array(10).fill(1).map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i + props.startPage! <= lastPage ? (
                <ul>
                  <li
                    style={{
                      color:
                        props.active === String(i + props.startPage!)
                          ? 'black'
                          : '#d4d4d4',
                    }}
                    onClick={onClickPage}
                    id={String(i + props.startPage!)}
                  >
                    {i + props.startPage!}
                  </li>
                </ul>
              ) : null}
            </React.Fragment>
          );
        })}
      </Page>
      <button
        className="right"
        disabled={props.startPage! + 10 > lastPage}
        onClick={onClickNextPage}
        id={String(props.startPage! + 10)}
      >
        <AiOutlineArrowRight />
      </button>
    </Wrap>
  );
};

export default Pagination10;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 1400px) {
    display: none;
  }
  // props.total / 15인 페이지네이션 컴포넌트 하단부 마진 추가
  margin-bottom: 10px;
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
