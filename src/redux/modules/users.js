import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateJWTToken } from "../../utils/JWT";

// const API_USERS_URL = "https://everytodo.herokuapp.com/users";
const API_USERS_URL = "https://localhost:3001/users";
// const data = await axios.post("http://localhost:3001/comments");

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const createUserThunk = createAsyncThunk(
  "users/createUserThunk",
  async (newUser, thunkAPI) => {
    try {
      const data = await axios.post("https://localhost:3001/users", newUser);
      // const token = generateJWTToken(newUser.email);
      // setCookie("access_token", token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/findUser",
  async (userInfo, thunk) => {
    console.log("test");
    try {
      const { data } =
        await // axios.post('http://localhost:3001/user/login', userInfo)
        axios.post("http://52.79.235.129/api/member/login", userInfo);

      console.log(userInfo);
      console.log(data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [createUserThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    },
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
