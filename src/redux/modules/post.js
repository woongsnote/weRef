import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localAPI, postAPI } from "../../shared/api";

const initialState = {
  post: {},
  isLoading: false,
  error: null,
};

export const getPost = createAsyncThunk("getPost", async (args, thunkAPI) => {
  try {
    const { data } = await postAPI.post(args);
    return thunkAPI.fulfillWithValue(data.data); //서버 통신
    // return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/* createSlice */
export const postSlice = createSlice({
  // 모듈 이름
  name: "posts",
  // 초기 상태값
  initialState,
  reducers: {},
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default postSlice.reducer;
