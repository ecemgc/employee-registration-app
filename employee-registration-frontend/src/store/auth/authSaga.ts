// src/sagas/counterSaga.ts
import { takeEvery, put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import axiosInstance from "../axiosConfig";
import { ResponseAuth } from "../../types/employeeTypes";
import { setIsLoginLoaded, setLogin } from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

function* login(
  action: PayloadAction<{ email: string; password: string }>
): Generator<unknown, void, AxiosResponse<ResponseAuth>> {
  try {
    yield put(setIsLoginLoaded(true));
    const response = yield call(
      axiosInstance.post,
      "auth/login",
      action.payload
    );
    yield put(setLogin(response.data));
    toast.success("Login successful, redirecting to homepage");
  } catch (error: any) {
    console.error("Error when login:", error);
    toast.error("Username or password incorrect");
  } finally {
    yield put(setIsLoginLoaded(false));
  }
}

function* authSaga() {
  yield takeEvery(AuthSagaTypes.LOGIN, login);
}

export const AuthSagaTypes = {
  LOGIN: "LOGIN",
};

export default authSaga;
