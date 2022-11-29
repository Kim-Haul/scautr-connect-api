import { Dispatch, SetStateAction } from 'react';

// ------------------------ App.tsx
export interface ITokenProps {
  auth: string;
  authority: string;
  exp: number;
  sub: string;
  type: string;
}

// ------------------------ apis.tsx
export interface ILoginApiProps {
  account: string | undefined;
  password: string | undefined;
}
export interface IFindPwApiProps {
  name: string | undefined;
  email: string | undefined;
  account: string | undefined;
}

// ------------------------ Sidebar.tsx
export interface IViewProps {
  open_side_bar?: string;
  setOpenSideBar?: Dispatch<SetStateAction<string>>;
}
export interface IPathProps {
  location: string;
}

// ------------------------ Signup.tsx
export interface FormValues {
  id?: string;
  password?: string;
  password_check?: string;

  name?: string;
  phone1?: number;
  phone2?: number;
  phone3?: number;
  email?: string;
  mailCode?: string;

  companyCode?: number;
  company?: string;
  representative?: string;
  registrationNumber1?: string;
  registrationNumber2?: string;
  registrationNumber3?: string;

  companyPhone1?: number;
  companyPhone2?: number;
  companyPhone3?: number;
}
export interface IStyleProps {
  isInvalid?: boolean;
}

// ------------------------ Registration.tsx
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
  assignedName?: string;
  model?: string;
  duration?: string;
}
export interface IStyleProps {
  isInvalid?: boolean;
}

// ------------------------ Pagination.tsx
export interface IPageProps {
  total: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}

// ------------------------ Management.tsx
export interface FormValues {
  date?: string;

  company_name?: string;
  comapny_address?: string;
  company_contact?: string;
  comapny_email?: string;

  company_manager?: string;
  manager_department?: string;
  manager_phone?: string;
  manager_email?: string;

  machine_serial_number?: string;
}
export interface IStyleProps {
  isInvalid?: boolean;
}

// ------------------------ Login.tsx
export interface FormValues {
  id?: string;
  password?: string;
}
export interface IStyleProps {
  isInvalid?: boolean;
}

// ------------------------ Header.tsx
export interface IToggleProps {
  toggleOn: boolean;
}
export interface IScrollYProps {
  // ScrollY에 ?를 붙여주면 왜 안될까?
  // props.ScrollY로 쓰면서 삼항연산자를 달고 있어서 그런것 같긴함.
  ScrollY: number;
  setOpenSideBar?: Dispatch<SetStateAction<string>>;
}

// ------------------------ FindPw.tsx
export interface FormValues {
  id?: string;
  name?: string;
  email?: string;
}
export interface IStyleProps {
  isInvalid?: boolean;
}

// ------------------------ DashboardRank.tsx
export interface IRankProps {
  view_point: string;
}

// ------------------------ ChangePw.tsx
export interface FormValues {
  password?: string;
  new_password?: string;
  new_password_check?: string;
}
export interface IStyleProps {
  isInvalid?: boolean;
}

// ------------------------ Board.tsx
export interface IToggleProps {
  toggleOn: boolean;
}

// ------------------------ Agree.tsx
export interface ICheckStateProps {
  first: boolean;
  second: boolean;
  third: boolean;
  all: boolean;
}