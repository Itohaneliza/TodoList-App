import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/TodoSlice"; // Update the path accordingly

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
