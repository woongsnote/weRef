import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateJWTToken } from "../../utils/JWT";

// const API_USERS_URL = "https://everytodo.herokuapp.com/users";
const API_USERS_URL = "https://localhost:3001/users";
// const data = await axios.post("http://localhost:3001/comments");



const initialState = {
    users: [],
    isLoading: false,
    error: null
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
      console.log("test")
      try {
          const { data } = await 
          axios.get('http://localhost:3001/user', userInfo)
          const user = data[0];
          console.log(data)
          if (user) {
              if (user.password === userInfo.password) {
                  const token = generateJWTToken(user.email);
                  return thunk.fulfillWithValue("Login succeeded.");
              } else {
                  return thunk.rejectWithValue("Incorrect password.");
              }
          } else {
              return thunk.rejectWithValue("No such user.");
          }
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
