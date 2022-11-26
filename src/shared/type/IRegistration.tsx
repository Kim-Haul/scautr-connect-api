import { Dispatch, SetStateAction } from 'react';

export interface ITabProps {
  click_tab: boolean;
}

export interface IModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  header?: string;
  setColor?: Dispatch<SetStateAction<string>>;
}

export interface FormValues {
  assignedName: string;
  model: string;
  duration: string;
}

export interface IStyleProps {
  isInvalid: boolean;
}
