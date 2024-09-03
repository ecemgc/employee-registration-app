import { ResponsePage } from "../../types/paginationTypes";
import { Role } from "../../types/roleTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RoleState {
  allRoles: Role[] | null;
  responseGetRoles: ResponsePage<Role> | null;
  isLoading: boolean;
  isDeleteRoleSuccess: boolean | null;
  selectedRole: Role | null;
  isUpdateRoleSuccess: boolean | null;
}
const initialState: RoleState = {
  allRoles: null,
  responseGetRoles: null,
  isLoading: false,
  isDeleteRoleSuccess: false,
  selectedRole: null,
  isUpdateRoleSuccess: false,
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<ResponsePage<Role>>) => {
      state.responseGetRoles = action.payload;
    },
    setAllRoles: (state, action: PayloadAction<Role[]>) => {
      state.allRoles = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsDeleteRoleSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.isDeleteRoleSuccess = action.payload;
    },
    setIsUpdateRoleSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.isUpdateRoleSuccess = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<Role>) => {
      state.selectedRole = action.payload;
    },
  },
});

export const {
  setAllRoles,
  setRoles,
  setIsLoading,
  setIsDeleteRoleSuccess,
  setIsUpdateRoleSuccess,
  setSelectedRole,
} = roleSlice.actions;

export default roleSlice.reducer;
