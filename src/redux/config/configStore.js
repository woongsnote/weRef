import users from "../modules/users";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    users,

  },
});

export default store;


