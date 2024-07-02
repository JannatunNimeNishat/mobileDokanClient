import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export type TUser = {
  userName?: string;
  userEmail?: string;
  userRole?:string;
  imageURL?: string;
  iat?:number;
  exp?:number;
};

type TInitialState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const currentUserToken = (state:RootState) => state.auth.token;
export const currentUserData = (state:RootState) => state.auth.user;
