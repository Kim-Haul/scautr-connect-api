import { Dispatch, SetStateAction } from 'react';

export interface IViewProps {
  open_side_bar?: string;
  setOpenSideBar?: Dispatch<SetStateAction<string>>;
}

export interface IPathProps {
  location: string;
}
