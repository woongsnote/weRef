import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accessToken, refreshToken } from "../../utils/tokens";

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  hearts: [],
  isLoading: false,
  error: null,
};

const baseURL = "http://13.125.246.47:8080/data";
const baseHeartURL = "http://13.125.246.47:8080/api/auth/heart";
//   'http://localhost:3001/heart/${postId}' delete URL
/* Thunk function */




export const heartCheck = createAsyncThunk(
  "GET_HEART_CHECK",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios({
        url: `${baseHeartURL}/${payload}`,
        method: "GET",
        headers: {
          "Content-Type": "applycation/json",
          "Authorization": accessToken(),
          "Refresh-Token": refreshToken(),
        },
        withCredentials: true,
      });
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

// [POST]
export const addDelHeart = createAsyncThunk(
  "POST_HEART",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios({
        url: `${baseHeartURL}/${payload.id}`,
        method: "POST",
        headers: {
          "Content-Type": "applycation/json",
          "Authorization": accessToken(),
          "Refresh-Token": refreshToken(),
        },
        withCredentials: true,
      });
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

// [UPDATE]
export const updateHeart = createAsyncThunk(
  "UPDATAE_HEART",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        url: `${baseHeartURL}`,
        method: "PUT",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": accessToken(),
          "Refresh-Token": refreshToken(),
        },
        withCredentials: true,
      });
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [DELETE]
export const deleteHeart = createAsyncThunk(
  "DELETE_HEART",
  async (payload, thunkAPI) => {
    try {
      await axios({
        url: `${baseHeartURL}/${payload.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "applycation/json",
          Authorization: accessToken(),
          "Refresh-Token": refreshToken(),
        },
        withCredentials: true,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* createSlice */
export const heartSlice = createSlice({
  // 모듈 이름
  name: "hearts",
  // 초기 상태값
  initialState,
  // reducers
  reducers: {},
  //extraReducers
  extraReducers: {
    /* Pending */
    [heartCheck.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addDelHeart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteHeart.pending]: (state, action) => {
      state.isLoading = true;
    },

    /* Fulfilled */
    [heartCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hearts = state.hearts.filter((item) => item.id !== action.payload);
    },
    [addDelHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hearts = state.hearts.filter((item) => item.id !== action.payload);
    },
    [deleteHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hearts = state.hearts.filter((item) => item.id !== action.payload);
    },
    [updateHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map((item) =>
        item.id === action.id
          ? { ...item, title: action.title, content: action.content }
          : item
      );
    },
    /* Rejected */

    [heartCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addDelHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

/* export */
export const {} = heartSlice.actions;
export default heartSlice.reducer;
