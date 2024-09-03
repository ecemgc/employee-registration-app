import { Department } from "./departmentTypes";
import { Role } from "./roleTypes";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  imageUrl: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  department: Department;
  roles: Role[];
}

export interface ResponseAuth {
  token: string;
  employee: Employee;
}

export interface RequestCreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  imageUrl?: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  department: Department;
  roles: Role[];
}

export interface RequestUpdateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  imageUrl?: string;
  endDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  isActive: boolean;
  department: Department;
  roles: Role[];
}
