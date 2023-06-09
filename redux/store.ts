import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user-slice"
import roleReducer from "./role-slice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
