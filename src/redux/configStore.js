import { configureStore } from "@reduxjs/toolkit";
import users from "./modules/users";
import comments from "./modules/comments";
import posts from "./modules/posts";
import heart from "./modules/heart";
import post from "./modules/post";

const store = configureStore({
  reducer: {
    users,
    comments,
    posts,
    post,
  },
  //   devTools: process.env.NODE_ENV !== "production",
});

export default store;
