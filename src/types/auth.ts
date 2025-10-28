export interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  university: string;
  major: string;
  graduationYear: string;
}

export interface CompanyData {
  companyName: string;
  industry: string;
  email: string;
  password: string;
  confirmPassword: string;
  website: string;
  companySize: string;
  description: string;
}

export interface login {
  email: string;
  password: string;
}
