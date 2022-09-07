import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateJWTToken } from "../../utils/JWT";
import { useNavigate } from "react-router-dom";


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
      // const data = await axios.post("http://localhost:3001/users", newUser);
      const data = await axios.post("http://13.125.246.47:8080/api/member/signup", newUser);
      console.log(data)
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
        axios.post("http://13.125.246.47:8080/api/member/login", userInfo)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("accessToken", response.headers["authorization"]);
            localStorage.setItem("refreshToken", response.headers["refresh-token"]);
          } else if (response.status !== 200) {
            alert("서버와 연결에 실패했습니다.");
          } else {
            alert("이메일과 비밀번호를 확인해주세요.");
          }
        });
      console.log(userInfo);
      console.log(data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

// const onLogin = () => {
//   axios
//     .post("http://3.34.48.111/api/member/login", {
//       email: email.current.value,
//       password: password.current.value,
//     })
//     .then((response) => {
//       if (response.data.success) {
//         localStorage.setItem("accessToken", response.headers["authorization"]);
//         localStorage.setItem("refreshToken", response.headers["refresh-token"]);
//         navigate("/");
//       } else if (response.status !== 200) {
//         alert("서버와 연결에 실패했습니다.");
//       } else {
//         alert("이메일과 비밀번호를 확인해주세요.");
//       }
//     });
// };


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
