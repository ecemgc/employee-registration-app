import { AxiosResponse } from "axios";
import { RequestPage, ResponsePage } from "../../types/paginationTypes";
import {
  Department,
  RequestCreateDepartment,
  RequestUpdateDepartment,
} from "../../types/departmentTypes";
import {
  setAllDepartments,
  setDepartments,
  setIsCreateDepartmentLoading,
  setIsCreateDepartmentSuccess,
  setIsDeleteDepartmentSuccess,
  setIsLoading,
  setIsUpdateDepartmentSuccess,
} from "./departmentSlice";
import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../axiosConfig";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import moment from "moment";

function* getDepartments(
  action: PayloadAction<RequestPage>
): Generator<unknown, void, AxiosResponse<ResponsePage<Department>>> {
  try {
    yield put(setIsLoading(true));
    const response: AxiosResponse<ResponsePage<Department>> = yield call(
      axiosInstance.get,
      "departments",
      {
        params: action.payload,
      }
    );

    const departments = response.data.content.map((department: Department) => ({
      id: department.id,
      name: department.name,
      description: department.description,
      createdAt: moment(department.createdAt).format("MMM Do YY"),
      updatedAt: moment(department.updatedAt).format("MMM Do YY"),
    }));

    yield put(setDepartments({ ...response.data, content: departments }));
  } catch (error: any) {
    console.log("Error: ", error);
    toast.error(error?.response?.data?.errorMessage || "An error occurred!");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* getAllDepartments(): Generator<unknown, void, AxiosResponse<Department[]>> {
  try {
    yield put(setIsLoading(true));
    const response: AxiosResponse<Department[]> = yield call(
      axiosInstance.get,
      "departments/without-pagination",
    );

    const departments = response.data.map((department: Department) => ({
      id: department.id,
      name: department.name,
      description: department.description,
      createdAt: moment(department.createdAt).format("MMM Do YY"),
      updatedAt: moment(department.updatedAt).format("MMM Do YY"),
    }));

    yield put(setAllDepartments(departments));
  } catch (error: any) {
    console.log("Error: ", error);
    toast.error(error?.response?.data?.errorMessage || "An error occurred!");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* saveDepartment(
  action: PayloadAction<RequestCreateDepartment>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield put(setIsCreateDepartmentLoading(true));

    yield call(axiosInstance.post, "departments", action.payload);
    yield put(setIsCreateDepartmentSuccess(true));
    toast.success("Departments saved successfully.");
  } catch (err: any) {
    yield put(setIsCreateDepartmentSuccess(false));
    toast.error(
      err?.response?.data?.errorMessage || "An error occurred while saving."
    );
  } finally {
    yield put(setIsCreateDepartmentLoading(false));
  }
}

function* deleteDepartment(
  action: PayloadAction<number>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield call(axiosInstance.delete, `departments/${action.payload}`);
    yield put(setIsDeleteDepartmentSuccess(true));
    toast.success("Department deleted successfully.");
  } catch (err: any) {
    yield put(setIsDeleteDepartmentSuccess(false));
    toast.error(
      err?.response?.data?.errorMessage ||
        "An error occurred while deleting department."
    );
  } finally {
    yield put(setIsDeleteDepartmentSuccess(null));
  }
}

function* updateDepartment(action: PayloadAction<{id:number; data:RequestUpdateDepartment;}>): Generator<unknown, void, AxiosResponse<void>> {
  try{
    yield call(axiosInstance.put, `departments/${action.payload.id}`, action.payload.data);
    yield put(setIsUpdateDepartmentSuccess(true));
    toast.success("Department updated successfully");
  }catch(error:any){
    yield put(setIsUpdateDepartmentSuccess(false));
    toast.error(
      error?.response?.data?.errorMessage ||
        "An error occurred while updating department."
    );
  }
}

function* departmentSaga() {
  yield takeEvery(DepartmentSagaTypes.GET_ALL, getDepartments);
  yield takeEvery(DepartmentSagaTypes.SAVE, saveDepartment);
  yield takeEvery(DepartmentSagaTypes.DELETE, deleteDepartment);
  yield takeEvery(DepartmentSagaTypes.GET_ALL_WITHOUT_PAGINATION, getAllDepartments);
  yield takeEvery(DepartmentSagaTypes.UPDATE, updateDepartment);
}

export const DepartmentSagaTypes = {
  GET_ALL: "GET_ALL_DEPARTMENTS",
  SAVE: "CREATE_DEPARTMENT",
  DELETE: "DELETE_DEPARTMENT",
  GET_ALL_WITHOUT_PAGINATION: "GET_ALL_WITHOUT_PAGINATION",
  UPDATE: "UPDATE_DEPARTMENT",
};

export default departmentSaga;
