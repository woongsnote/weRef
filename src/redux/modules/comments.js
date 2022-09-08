import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentsAPI } from "../../shared/api";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

/**Create Comment */
export const addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    try {
      const data = await commentsAPI.addComment(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Read Comments */
export const getComments = createAsyncThunk(
  "getComments",
  async (args, thunkAPI) => {
    try {
      const { data } = await commentsAPI.getComments(args);
      console.log(data);
      // return thunkAPI.fulfillWithValue(data);
      return thunkAPI.fulfillWithValue(data.data.commentlist); // server
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
      const { data } = await commentsAPI.editComment(args);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Delete Comment */
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (args, thunkAPI) => {
    try {
      const { data } = await commentsAPI.deleteComment(args);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "commentList",
  initialState,
  reducers: {},
  extraReducers: {
    [addComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.commentList.push(action.payload);
    },
    [addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.commentList = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.commentList = action.payload;
    },
    [updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
