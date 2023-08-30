import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "../../services";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userData: {},
  error: false || "",
};

export const reloadInfo = createAsyncThunk(
  "user/reloadInfo",
  async (_, thunkApi) => {
    const userData = thunkApi.getState().user.userData;
    const res = await userServices.getUserById(userData.id);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, payload) => {
      const payloadDoc = payload.payload;
      state.isLoggedIn = true;
      state.userData = { ...payloadDoc };
    },
    toggleLogin: (state, payload) => {
      const payloadDoc = payload.payload;
      state.userData = state.isLoggedIn == true ? {} : { ...payloadDoc };
      state.isLoggedIn = !state.isLoggedIn;
    },
    reload: (state, payload) => {
      const payloadDoc = payload.payload;
      state.userData = state.isLoggedIn !== true ? {} : { ...payloadDoc };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reloadInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reloadInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = {
          id: action.payload.id,
          email: action.payload.email,
          type: action.payload.type,
          phone: action.payload.phone,
          address: action.payload.address,
          gender: action.payload.sex == 0 ? "male" : "female",
          fullName: action.payload.fullName,
          age: action.payload.age,
          isVerifyEmail: action.payload.isVerifyEmail,
        };
      })
      .addCase(reloadInfo.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch user data.";
      });
  },
});

export default userSlice;
