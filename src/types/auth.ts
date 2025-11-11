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
  contactPersonName?: string;
  phone?: string;
  industry?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  website?: string;
  companySize?: string;
  description?: string;
  // Additional fields returned from backend on login/profile
  id?: string;
  createdAt?: string;
  jobs?: any[];
}

export interface login {
  email: string;
  password: string;
}
