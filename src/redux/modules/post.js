import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { apis } from "../../shared/api";

const initialState = {
  post: {},
=======
import axios from "axios";

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  posts: [],
>>>>>>> a0e4a8e105ed309021cf6b56443417dd2f3dda7c
  isLoading: false,
  error: null,
};

<<<<<<< HEAD
export const getPost = createAsyncThunk("getPost", async (args, thunkAPI) => {
  try {
    const { data } = await apis.post(args);
    return thunkAPI.fulfillWithValue(data.data); //서버 통신
    // return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postSlice = createSlice({
  name: "post",
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
=======

const baseURL = "http://localhost:3001/data"
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

// [GET - 특정ID를 가진 데이터만 조회]
export const eachPosts = createAsyncThunk(
  "EACH_POSTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/${payload}`
      );
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
      const {data} = await axios.post(
        `${baseURL}`,payload
      );
      console.log('data',data);
      return thunkAPI.fulfillWithValue(data)
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer)
    }
  }
)

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
      const response = await axios.put(
        `${baseURL}/${payload.id}`,
        payload
      );
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
  // reducers
  reducers: {},
  //extraReducers
  extraReducers: {
    /* Pending */
    [getPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [eachPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    
    /* Fulfilled */
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [eachPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = [action.payload];
    },
    [deletePosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((item) => item.id !== action.payload);
    },
    [updatePosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map((item) =>
        item.id === action.id
          ? { ...item, title: action.title, content: action.content }
          : item
      );
    },
    /* Rejected */
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [eachPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deletePosts.rejected]: (state, action) => {
>>>>>>> a0e4a8e105ed309021cf6b56443417dd2f3dda7c
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

<<<<<<< HEAD
export default postSlice.reducer;
=======
/* export */
export const {} = postsSlice.actions;
export default postsSlice.reducer;
>>>>>>> a0e4a8e105ed309021cf6b56443417dd2f3dda7c
