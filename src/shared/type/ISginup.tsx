export interface FormValues {
  id: string;
  password: string;
  password_check: string;

  name: string;
  phone1: number;
  phone2: number;
  phone3: number;
  email: string;
  mailCode: string;

  companyCode: string;
  company: string;
  representative: string;
  registrationNumber1: string;
  registrationNumber2: string;
  registrationNumber3: string;

  companyPhone1: number;
  companyPhone2: number;
  companyPhone3: number;
}

export interface IStyleProps {
  isInvalid: boolean;
}
