import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  hearts: [],
  isLoading: false,
  error: null,
};


const baseURL = "http://localhost:3001/data"
const baseHeartURL = "http://localhost:3001/heart"
/* Thunk function */


// [POST]
export const addHeart = createAsyncThunk(
  "POST_HEART",
  async (payload, thunkAPI) => {
    try {
      const {data} = await axios.post(
        `${baseHeartURL}`,
            payload
      );
      console.log('data',data);
      return thunkAPI.fulfillWithValue(data)
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer)
    }
  }
)

// [DELETE]
export const deleteHeart = createAsyncThunk(
  "DELETE_HEART",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${baseHeartURL}/${payload}`);
    //   'http://localhost:3001/heart/${postId}'
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
    [addHeart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteHeart.pending]: (state, action) => {
      state.isLoading = true;
    },

    
    /* Fulfilled */
    [addHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hearts = state.hearts.filter((item) => item.id !== action.payload);
    },
    [deleteHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hearts = state.hearts.filter((item) => item.id !== action.payload);
    },

    /* Rejected */

    [addHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

/* export */
export const {} = heartSlice.actions;
export default heartSlice.reducer;