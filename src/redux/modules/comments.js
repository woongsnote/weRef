import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

/**Create Comment */
export const addComment = createAsyncThunk(
  "addComment",
  async (args, thunkAPI) => {
    try {
    } catch {}
  }
);

/**Read Comments */
export const getComments = createAsyncThunk(
  "getComments",
  async (args, thunkAPI) => {
    try {
      const { data } = await apis.get("/comments", args);
      console.log(data);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Update Comment */
export const updateComment = createAsyncThunk(
  "updateComment",
  async (args, thunkAPI) => {
    try {
    } catch {}
  }
);

/**Delete Comment */
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (args, thunkAPI) => {
    try {
    } catch {}
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
