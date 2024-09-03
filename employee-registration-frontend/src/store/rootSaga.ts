import { all } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import departmentSaga from "./department/departmentSaga";
import employeeSaga from "./employee/employeeSaga";
import roleSaga from "./role/roleSaga";
export default function* rootSaga() {
  yield all([authSaga(), departmentSaga(), employeeSaga(), roleSaga()]);
}
