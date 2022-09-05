import { configureStore } from "@reduxjs/toolkit";
import users from "./modules/users";
import comments from "./modules/comments";
import post from "./modules/post"

const store = configureStore({
  reducer: { 
      users,
      // comments,
      post
   },
  //   devTools: process.env.NODE_ENV !== "production",
});

export default store;
