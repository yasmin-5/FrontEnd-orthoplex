import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../slice/userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});


export default store;
