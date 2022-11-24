import { Dispatch, SetStateAction } from 'react';

export interface IPageProps {
  total: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}
