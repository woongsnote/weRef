import users from "../modules/users";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: users,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
});

export default store;


