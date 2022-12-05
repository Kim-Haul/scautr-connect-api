import React, { Component } from 'react';
import styled from 'styled-components';

class PartialError extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log('error is', error);
    console.log('error info is', info);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Wrap>
          <div className="title">모드링크를 연결해주세요.</div>
          <div className="content">
            서버로부터 정보를 불러오지 못했습니다.
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              새로고침
            </button>
          </div>
        </Wrap>
      );
    }
    return this.props.children;
  }
}

export default PartialError;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #007bff;
  background-color: rgba(0, 123, 255, 0.1);
  padding: 8rem;
  margin-bottom: 2rem;
  .title {
    color: red;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 10rem;
      height: 4rem;
      font-size: 1.6rem;
      margin-top: 1rem;
    }
  }
`;
