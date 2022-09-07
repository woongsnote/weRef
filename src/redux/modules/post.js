import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";

const initialState = {
  post: {},
  isLoading: false,
  error: null,
};

const baseURL = "http://localhost:3001/data";
/* Thunk function */
// [GET - 데이터 전체 조회]
export const getPosts = createAsyncThunk(
  "GET_ALL_POSTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(baseURL);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPost = createAsyncThunk("getPost", async (args, thunkAPI) => {
  try {
    const { data } = await apis.post(args);
    return thunkAPI.fulfillWithValue(data.data); //서버 통신
    // return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// [GET - 특정ID를 가진 데이터만 조회]
export const eachPosts = createAsyncThunk(
  "EACH_POSTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${baseURL}/${payload}`);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [POST]
export const postPosts = createAsyncThunk(
  "POST_POSTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${teamBaseLogedURL}`, payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

// [DELETE]
export const deletePosts = createAsyncThunk(
  "DELETE_POSTS",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${baseURL}/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [UPDATE]
export const updatePosts = createAsyncThunk(
  "UPDATAE_POSTS",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`${baseURL}/${payload.id}`, payload);
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* createSlice */
export const postsSlice = createSlice({
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
    [updatePosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
