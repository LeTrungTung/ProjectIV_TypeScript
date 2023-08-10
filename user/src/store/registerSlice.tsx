import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserAPI } from "../api/User"; // Make sure to import the correct UserData type

interface RegisterState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const register = createAsyncThunk(
  "register",
  async (userData: Promise<any>) => {
    try {
      const response = await UserAPI.register(userData);
      // Xử lý phản hồi từ máy chủ và trả về dữ liệu
      return response.data;
    } catch (error: any) {
      // Xử lý lỗi và trả về thông báo lỗi
      throw new Error(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(
        register.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.successMessage = "Đăng ký thành công!";
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload
            ? action.payload.message
            : "Có lỗi xảy ra";
        }
      );
  },
});

export default registerSlice.reducer;
