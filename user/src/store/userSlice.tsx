import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserAPI } from "../api/User";

export interface UserState {
  data: string;
  token: string;
  isLoggedIn: boolean;
  error: boolean;
}

interface LoginResponse {
  data: {
    data: {
      accessToken: string;
    };
  };
}

export const login = createAsyncThunk(
  "login",
  async (userData: Promise<any>) => {
    try {
      const response = await UserAPI.login(userData);
      console.log(response?.data);
      localStorage.setItem(
        "userLogin",
        JSON.stringify(response?.data?.data)
      );
      localStorage.setItem("token", response.data.accessToken);
      return response;
    } catch (error) {
      throw error; // Throwing error so that it can be handled in the rejected action
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    token: "",
    isLoggedIn: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state: any, action: PayloadAction<LoginResponse>) => {
        console.log("xem action >>>>>", action.payload);
        state.data = action.payload.data.data;
        state.token = action.payload.data.data.accessToken;
        state.isLoggedIn = true;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
