import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import {removeCookie, setCookie} from "../../shared/Cookie";
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
    "users/createUser",
    async (newUser, thunk) => {
        try {
            await axios.post(API_USERS_URL, newUser);
            const token = generateJWTToken(newUser.email);
            // setCookie("access_token", token);
            return thunk.fulfillWithValue("Signup succeeded.");
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
);

export const loginUserThunk = createAsyncThunk(
  "users/findUser",
  async (userInfo, thunk) => {
      try {
          const { data } = await axios.get(
              // `${API_USERS_URL}?email=${userInfo.email}`
              `${API_USERS_URL}/${userInfo}`,
            console.log(`${API_USERS_URL}/${userInfo}`),
            console.log(`${userInfo}`)

              );
          const user = data[0];
          if (user) {
              if (user.password === userInfo.password) {
                  const token = generateJWTToken(user.email);
                  // setCookie("access_token", token);
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

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(createUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUserThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
});

export default userSlice.reducer;
