import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, ResponseAuth } from "../../types/employeeTypes";
import  CryptoJS  from 'crypto-js';

interface AuthState {
  token: string | null;
  employee: Employee | null;
  isLoginLoaded: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  employee: null,
  isLoginLoaded: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<ResponseAuth>) => {
      const { employee, token } = action.payload;
      state.employee = employee;
      state.token = token;
      state.isLoggedIn = true;
      const encryptedToken = CryptoJS.AES.encrypt(token, import.meta.env.VITE_SECRET_KEY!).toString();
      localStorage.setItem("auth", JSON.stringify({ token: encryptedToken, employee }));
      window.location.href = "/";
    },
    setIsLoginLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoginLoaded = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("auth");
      state = initialState;
      window.location.href = "/login";
    },
  },
});

export const { setLogin, setIsLoginLoaded, setLogout } = authSlice.actions;

export default authSlice.reducer;
