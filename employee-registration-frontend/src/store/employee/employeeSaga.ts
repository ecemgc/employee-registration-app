import { PayloadAction } from "@reduxjs/toolkit";
import { RequestPage, ResponsePage } from "../../types/paginationTypes";
import { AxiosResponse } from "axios";
import { Employee, RequestCreateEmployee, RequestUpdateEmployee } from "../../types/employeeTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  setEmployeeById,
  setEmployees,
  setIsCreateEmployeeLoading,
  setIsCreateEmployeeSuccess,
  setIsDeleteEmployeeSuccess,
  setIsLoading,
  setIsUpdateEmployeeSuccess,
} from "./employeeSlice";
import axiosInstance from "../axiosConfig";
import moment from "moment";
import { toast } from "react-toastify";

function* getAllEmployees(
  action: PayloadAction<RequestPage>
): Generator<unknown, void, AxiosResponse<ResponsePage<Employee>>> {
  try {
    yield put(setIsLoading(true));
    const response: AxiosResponse<ResponsePage<Employee>> = yield call(
      axiosInstance.get,
      "employees",
      {
        params: action.payload,
      }
    );
    const employees = response.data.content.map((employee: Employee) => ({
      ...employee,
      startDate: moment(employee.startDate).format("MMM Do YY"),
      endDate: moment(employee.endDate).format("MMM Do YY"),
      createdAt: moment(employee.createdAt).format("MMM Do YY"),
      updatedAt: moment(employee.updatedAt).format("MMM Do YY"),
    }));
    yield put(setEmployees({ ...response.data, content: employees }));
  } catch (error: any) {
    console.log("Error: ", error);
    toast.error(error?.response?.data?.errorMessage || "An error occurred!");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* deleteEmployee(
  action: PayloadAction<number>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield call(axiosInstance.delete, `employees/${action.payload}`);
    yield put(setIsDeleteEmployeeSuccess(true));
    toast.success("Employees deleted successfully");
  } catch (error: any) {
    yield put(setIsDeleteEmployeeSuccess(false));
    toast.error(
      error?.response?.data?.errorMessage ||
        "An error occured while deleting employee."
    );
  } finally {
    yield put(setIsDeleteEmployeeSuccess(null));
  }
}

function* saveEmployee(
  action: PayloadAction<RequestCreateEmployee>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield put(setIsCreateEmployeeLoading(true));
    yield call(axiosInstance.post, "employees", action.payload);
    yield put(setIsCreateEmployeeSuccess(true));
    toast.success("Employees saved successfully");
  } catch (error: any) {
    yield put(setIsCreateEmployeeSuccess(false));
    toast.error(
      error?.response?.data?.errorMessage || "An error occurred while saving."
    );
  } finally {
    yield put(setIsCreateEmployeeLoading(false));
  }
}

function* getEmployeeById(
  action: PayloadAction<number>
): Generator<unknown, void, AxiosResponse<Employee>> {
  try {
    const response = yield call(
      axiosInstance.get,
      `employees/${action.payload}`
    );
    yield put(setEmployeeById(response.data));
  } catch (error: any) {
    toast.error(
      error?.response?.data?.errorMessage ||
        "An error occurred while loading selected employee."
    );
  }
}

function* updateEmployee(
  action: PayloadAction<{id: number; data:RequestUpdateEmployee}>
): Generator<unknown, void, AxiosResponse<void>> {
  try {
    yield call(axiosInstance.put, `employees/${action.payload.id}`, action.payload.data);
    yield put(setIsUpdateEmployeeSuccess(true));
    toast.success("Employees updated successfully");
  } catch (error: any) {
    yield put(setIsUpdateEmployeeSuccess(false));
    toast.error(
      error?.response?.data?.errorMessage || "An error occurred while saving."
    );
  }
}

function* employeeSaga() {
  yield takeEvery(EmployeeSagaTypes.GET_ALL, getAllEmployees);
  yield takeEvery(EmployeeSagaTypes.DELETE, deleteEmployee);
  yield takeEvery(EmployeeSagaTypes.SAVE, saveEmployee);
  yield takeEvery(EmployeeSagaTypes.GET_BY_ID, getEmployeeById);
  yield takeEvery(EmployeeSagaTypes.UPDATE, updateEmployee);
}

export const EmployeeSagaTypes = {
  GET_ALL: "GET_ALL_EMPLOYEES",
  DELETE: "DELETE_EMPLOYEE",
  SAVE: "SAVE_EMPLOYEE",
  GET_BY_ID: "GET_BY_ID",
  UPDATE: "UPDATE_EMPLOYEE",
};

export default employeeSaga;
