import { AxiosResponse } from "axios";
import { Role } from "../../types/roleTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../axiosConfig";
import {
  setAllRoles,
  setIsDeleteRoleSuccess,
  setIsLoading,
  setIsUpdateRoleSuccess,
  setRoles,
} from "./roleSlice";
import { toast } from "react-toastify";
import { PayloadAction } from "@reduxjs/toolkit";
import { ResponsePage } from "../../types/paginationTypes";

function* getRoles(
  action: PayloadAction<ResponsePage<Role>>
): Generator<unknown, void, AxiosResponse<ResponsePage<Role>>> {
  try {
    yield put(setIsLoading(false));
    const response: AxiosResponse<ResponsePage<Role>> = yield call(
      axiosInstance.get,
      "roles",
      {
        params: action.payload,
      }
    );
    yield put(setRoles(response.data));
  } catch (error: any) {
    toast.error(error?.response?.data?.errorMessage || "An error occurred");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* getAllRoles(): Generator<unknown, void, AxiosResponse<Role[]>> {
  try {
    const response: AxiosResponse<Role[]> = yield call(
      axiosInstance.get,
      "roles/without-pagination"
    );

    yield put(setAllRoles(response.data));
  } catch (error: any) {
    console.log("Error: ", error);
    toast.error(error?.response?.data?.errorMessage || "An error occurred!");
  }
}

function* deleteRole(
  action: PayloadAction<number>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield call(axiosInstance.delete, `roles/${action.payload}`);
    yield put(setIsDeleteRoleSuccess(true));
  } catch (error: any) {
    yield put(setIsDeleteRoleSuccess(false));
    toast.error(
      error?.response?.data?.errorMessage ||
        "An error occurred while deleting department."
    );
  } finally {
    yield put(setIsDeleteRoleSuccess(null));
  }
}

function* updateRole(
  action: PayloadAction<Role>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield call(axiosInstance.put, `roles/${action.payload.id}`, action.payload);
    yield put(setIsUpdateRoleSuccess(true));
  } catch (error: any) {
    yield put(setIsUpdateRoleSuccess(false));
    toast.error(error?.response?.data?.errorMessage || "An error occured");
  } finally {
    yield put(setIsUpdateRoleSuccess(null));
  }
}

function* roleSaga() {
  yield takeEvery(RoleSagaTypes.GET_ALL_ROLES_WITHOUT_PAGINATION, getAllRoles);
  yield takeEvery(RoleSagaTypes.GET_ALL, getRoles);
  yield takeEvery(RoleSagaTypes.DELETE, deleteRole);
  yield takeEvery(RoleSagaTypes.UPDATE, updateRole);
}

export const RoleSagaTypes = {
  GET_ALL_ROLES_WITHOUT_PAGINATION: "GET_ALL_ROLES_WITHOUT_PAGINATION",
  GET_ALL: "GET_ALL_ROLES",
  DELETE: "DELETE_ROLE",
  UPDATE: "UPDATE_ROLE",
};

export default roleSaga;
