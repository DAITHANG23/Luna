import { UserLogin } from "@/@types/models/account";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserLogin;
  accessToken: string;
}

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
