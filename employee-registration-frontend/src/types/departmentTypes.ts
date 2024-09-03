export interface Department {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestCreateDepartment {
  name: string;
  description: string;
}

export interface RequestUpdateDepartment {
  name: string;
  description: string;
}
