import { Dispatch, SetStateAction } from 'react';

// 헤더 마이페이지 모달창 토글
export interface IToggleProps {
  toggleOn: boolean;
}

export interface IScrollYProps {
  // ScrollY에 ?를 붙여주면 왜 안될까?
  // props.ScrollY로 쓰면서 삼항연산자를 달고 있어서 그런것 같긴함.
  ScrollY: number;
  setOpenSideBar?: Dispatch<SetStateAction<string>>;
}
