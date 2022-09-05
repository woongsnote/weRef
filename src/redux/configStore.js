import { configureStore } from "@reduxjs/toolkit";
import { commentsSlice } from "./modules/comments";

const store = configureStore({
  reducer: { comment: commentsSlice.reducer },
  //   devTools: process.env.NODE_ENV !== "production",
});

export default store;
