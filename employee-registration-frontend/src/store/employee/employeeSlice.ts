import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../types/employeeTypes";
import { ResponsePage } from "../../types/paginationTypes";

interface EmployeeState {
  responseGetEmployees: ResponsePage<Employee> | null;
  isLoading: boolean;
  isDeleteEmployeeSuccess: boolean | null;
  isCreateEmployeeSuccess: boolean | null;
  isCreateEmployeeLoading: boolean | null;
  selectedEmployee: Employee | null;
  responseEmployeeById: Employee | null;
  isUpdateEmployeeSuccess: boolean | null;
}

const initialState: EmployeeState = {
  responseGetEmployees: null,
  isLoading: false,
  isDeleteEmployeeSuccess: false,
  isCreateEmployeeSuccess: false,
  isCreateEmployeeLoading: false,
  selectedEmployee: null,
  responseEmployeeById: null,
  isUpdateEmployeeSuccess: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<ResponsePage<Employee>>) => {
      state.responseGetEmployees = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsDeleteEmployeeSuccess: (
      state,
      action: PayloadAction<boolean | null>
    ) => {
      state.isDeleteEmployeeSuccess = action.payload;
    },
    setIsCreateEmployeeSuccess: (
      state,
      action: PayloadAction<boolean | null>
    ) => {
      state.isCreateEmployeeSuccess = action.payload;
    },
    setIsCreateEmployeeLoading: (
      state,
      actio: PayloadAction<boolean | null>
    ) => {
      state.isCreateEmployeeLoading = actio.payload;
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee>) => {
      state.selectedEmployee = action.payload;
    },
    setEmployeeById: (state, action: PayloadAction<Employee | null>) => {
      state.responseEmployeeById = action.payload;
    },
    setIsUpdateEmployeeSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.isUpdateEmployeeSuccess = action.payload;
    }
  },
});

export const {
  setEmployees,
  setIsLoading,
  setIsDeleteEmployeeSuccess,
  setIsCreateEmployeeLoading,
  setIsCreateEmployeeSuccess,
  setSelectedEmployee,
  setEmployeeById,
  setIsUpdateEmployeeSuccess,
} = employeeSlice.actions;

export default employeeSlice.reducer;
