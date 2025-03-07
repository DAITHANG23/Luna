import { UserLogin } from "@/@types/models/account";
import apiService from "@/pages/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";

interface AuthState {
  user: UserLogin;
  accessToken: string;
}

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await apiService.account.logout();
    }
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common.Authorization;
    Router.push("/login");
  }
});

const initialState: AuthState = {
  user: {
    firstName: "",
    lastName: "",
    numberPhone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
  },
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<{ user: UserLogin }>) => {
      state.user = action.payload.user;
    },
    accessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { userInfo, accessToken } = authSlice.actions;
export default authSlice.reducer;
