import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Department } from "../../types/departmentTypes";
import { ResponsePage } from "../../types/paginationTypes";

interface DepartmentState {
  responseGetDepartmens: ResponsePage<Department> | null;
  isLoading: boolean;
  isCreateDepartmentLoading: boolean;
  isCreateDepartmentSuccess: boolean | null;
  isDeleteDepartmentSuccess: boolean | null;
  allDepartments: Department[] | null;
  selectedDepartment: Department | null;
  isUpdateDepartmentSuccess: boolean | null;
}

const initialState: DepartmentState = {
  responseGetDepartmens: null,
  isLoading: false,
  isCreateDepartmentLoading: false,
  isCreateDepartmentSuccess: false,
  isDeleteDepartmentSuccess: false,
  allDepartments: null,
  selectedDepartment: null,
  isUpdateDepartmentSuccess: false,
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setDepartments: (
      state,
      action: PayloadAction<ResponsePage<Department>>
    ) => {
      state.responseGetDepartmens = action.payload;
    },
    setAllDepartments: (state, action: PayloadAction<Department[]>) => {
      state.allDepartments = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsCreateDepartmentLoading: (state, action: PayloadAction<boolean>) => {
      state.isCreateDepartmentLoading = action.payload;
    },
    setIsCreateDepartmentSuccess: (
      state,
      action: PayloadAction<boolean | null>
    ) => {
      state.isCreateDepartmentSuccess = action.payload;
    },
    setIsDeleteDepartmentSuccess: (
      state,
      action: PayloadAction<boolean | null>
    ) => {
      state.isDeleteDepartmentSuccess = action.payload;
    },
    setIsUpdateDepartmentSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.isUpdateDepartmentSuccess = action.payload;
    },
    setSelectedDepartment: (state, action: PayloadAction<Department>) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export const {
  setDepartments,
  setIsLoading,
  setIsCreateDepartmentLoading,
  setIsCreateDepartmentSuccess,
  setIsDeleteDepartmentSuccess,
  setAllDepartments,
  setIsUpdateDepartmentSuccess,
  setSelectedDepartment,
} = departmentSlice.actions;
export default departmentSlice.reducer;
