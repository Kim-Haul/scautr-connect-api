import React from 'react';
import { IoIosColorFill } from 'react-icons/io';
import styled from 'styled-components';
import { IModalProps } from '../../shared/type/IRegistration';

const ColorModal = (props: IModalProps) => {
  const colorList: string[] = [
    '#66A988',
    '#66DEAC',
    '#C4E5A3',
    '#DFD38D',
    '#FFE066',
    '#FECD8B',
    '#FFCECE',
    '#FFACAC',
    '#EE8F9D',
    '#FF73B9',
    '#FF9CDC',
    '#FFC7FC',
    '#A25DDC',
    '#AE8DE3',
    '#B289B9',
    '#8C73BF',
    '#999BEC',
    '#7A96BD',
    '#9AC3FD',
    '#66B6D9',
    '#95E0DD',
    '#A3E0FF',
    '#A4C7D7',
    '#C2CED7',
    '#DCDCDC',
    '#B3B3B3',
    '#858585',
    '#B29891',
    '#E8ACD0',
    '#CEC0AF',
    '#D7B3A8',
    '#80ADEF',
    '#749CA1',
    '#D7CBFB',
    '#CBD8F3',
  ];
  return (
    <Wrap>
      <div className={props.open ? 'openColorModal modal' : 'modal'}>
        {props.open ? (
          <div className="color_card_box">
            {colorList.map((color, i) => {
              return (
                <ColorCard
                  color={color}
                  key={i}
                  onClick={() => {
                    props.setIsOpen(false);
                    props.setColor!(color);
                  }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </Wrap>
  );
};

export default ColorModal;

const Wrap = styled.div`
  // 기존에 컴포넌트 재활용시, .openModal.modal 라는 클래스명이
  // 부모랑 겹쳐서 예상치 못한 css 적용으로 인한 오류 발생 fix.
  .openColorModal.modal {
    position: absolute;
    top: 80px;
    right: 0;
    width: 184px;
    height: 248px;
    background: #ffffff;
    border: 1px solid #ced4da;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 16px;
    z-index: 4;
  }
  .color_card_box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const ColorCard = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;
