import { configureStore } from "@reduxjs/toolkit";
import newsApiReducer from "./state/newsApiSlice";
import userReducer from "./state/userSlice";

export const store = configureStore({
    reducer: {
        newsApi: newsApiReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
